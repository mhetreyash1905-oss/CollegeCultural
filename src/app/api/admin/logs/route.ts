import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AuditLog } from '@/models/AuditLog';

export async function GET(req: Request) {
  try {
    const role = req.headers.get('x-admin-role');
    if (role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
