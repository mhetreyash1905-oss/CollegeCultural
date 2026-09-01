import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Society from '@/models/Society';

export async function GET() {
  try {
    await dbConnect();
    const societies = await Society.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: societies });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch societies';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
