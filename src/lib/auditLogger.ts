import { AuditLog } from '@/models/AuditLog';
import dbConnect from '@/lib/mongodb';
import { NextRequest } from 'next/server';

import { verifyAuth } from '@/lib/auth';

export async function logAdminAction(
  req: NextRequest,
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'REVOKE',
  entityType: string,
  entityId?: string,
  details?: string
) {
  try {
    let adminId = req.headers.get('x-admin-id');
    let adminName = req.headers.get('x-admin-name');

    if (!adminId || !adminName) {
      const token = req.cookies.get('admin_token')?.value;
      if (token) {
        try {
          const verified = await verifyAuth(token);
          adminId = verified.userId;
          adminName = verified.name;
        } catch {
          // ignore
        }
      }
    }

    if (!adminId || !adminName) {
      console.warn('Could not log action: Admin headers missing from request.');
      return;
    }

    await dbConnect();
    await AuditLog.create({
      adminId,
      adminName,
      action,
      entityType,
      entityId,
      details,
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
