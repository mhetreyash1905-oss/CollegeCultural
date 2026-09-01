import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().sort({ date: 1 }).lean();
    return NextResponse.json({ success: true, data: events });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
