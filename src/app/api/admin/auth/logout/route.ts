import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { AuditLog } from '@/models/AuditLog';

export async function POST(req: Request) {
  try {
    // If we have headers populated by middleware, we can log the logout action
    const adminId = req.headers.get('x-admin-id');
    const adminName = req.headers.get('x-admin-name');
    
    if (adminId && adminName) {
      await dbConnect();
      await AuditLog.create({
        adminId,
        adminName,
        action: 'LOGOUT',
        entityType: 'System',
        details: 'User logged out',
      });
    }
  } catch (error) {
    console.error('Logout logging error:', error);
  }

  // Clear cookie
  (await cookies()).delete('admin_token');

  return NextResponse.json({ success: true });
}
