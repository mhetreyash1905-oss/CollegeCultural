import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Society from '@/models/Society';
import { logAdminAction } from '@/lib/auditLogger';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const data = await req.json();
    const item = await Society.findByIdAndUpdate(id, data, { new: true });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    await logAdminAction(req as any, 'UPDATE', 'Society', id, `Updated Society`);
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const item = await Society.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    await logAdminAction(req as any, 'DELETE', 'Society', id, `Deleted Society`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
