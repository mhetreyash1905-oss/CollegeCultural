import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CouncilMember from '@/models/CouncilMember';
import { logAdminAction } from '@/lib/auditLogger';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const items = await CouncilMember.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newItem = await CouncilMember.create(data);
    await logAdminAction(req as any, 'CREATE', 'CouncilMember', newItem._id.toString(), `Created new CouncilMember`);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
