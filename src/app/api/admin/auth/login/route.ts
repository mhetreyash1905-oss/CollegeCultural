import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { AdminUser } from '@/models/AdminUser';
import { AuditLog } from '@/models/AuditLog';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const user = await AdminUser.findOne({ username: username.toLowerCase() });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Invalid credentials or inactive account' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT
    const token = await createToken({
      userId: user._id.toString(),
      username: user.username,
      name: user.name,
      role: user.role as 'admin' | 'superadmin',
    });

    // Create Audit Log
    await AuditLog.create({
      adminId: user._id,
      adminName: user.name,
      action: 'LOGIN',
      entityType: 'System',
      details: 'User logged into the admin portal',
    });

    // Set HTTP-only cookie
    (await cookies()).set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ success: true, redirect: '/portal/dashboard' });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
