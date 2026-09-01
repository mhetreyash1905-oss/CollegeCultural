import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';

export async function GET() {
  try {
    await dbConnect();
    const gallery = await GalleryImage.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: gallery });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch gallery';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
