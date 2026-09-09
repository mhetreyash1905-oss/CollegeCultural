import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    await dbConnect();
    // Only fetch events that are not older than 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const events = await Event.find({ date: { $gte: threeDaysAgo } }).sort({ date: 1 }).lean();
    return NextResponse.json({ success: true, data: events });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
