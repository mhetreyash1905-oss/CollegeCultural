import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CouncilMember from '@/models/CouncilMember';

export async function GET() {
  try {
    await dbConnect();
    const members = await CouncilMember.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: members });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch members';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
