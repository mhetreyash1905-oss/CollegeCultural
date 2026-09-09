import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AdminUser } from '@/models/AdminUser';
import { logAdminAction } from '@/lib/auditLogger';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const role = req.headers.get('x-admin-role');
    if (role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    
    await dbConnect();
    const data = await req.json();

    const user = await AdminUser.findByIdAndUpdate(id, data, { new: true }).select('-passwordHash');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await logAdminAction(req as any, 'REVOKE', 'AdminUser', user._id.toString(), `Updated status of user ${user.username}`);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
