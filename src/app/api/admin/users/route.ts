import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AdminUser } from '@/models/AdminUser';
import bcrypt from 'bcryptjs';
import { logAdminAction } from '@/lib/auditLogger';

export async function GET(req: Request) {
  try {
    const role = req.headers.get('x-admin-role');
    if (role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const users = await AdminUser.find().select('-passwordHash').sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const roleHeader = req.headers.get('x-admin-role');
    if (roleHeader !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const { username, name, password, role } = await req.json();

    if (!username || !name || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existing = await AdminUser.findOne({ username: username.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await AdminUser.create({
      username: username.toLowerCase(),
      name,
      passwordHash,
      role: role === 'superadmin' ? 'superadmin' : 'admin',
      isActive: true,
    });

    await logAdminAction(req as any, 'CREATE', 'AdminUser', newUser._id.toString(), `Created user ${username}`);

    const userObj = newUser.toObject();
    // @ts-ignore
    delete userObj.passwordHash;

    return NextResponse.json(userObj, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
