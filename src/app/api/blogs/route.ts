import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = request.nextUrl;
    const featured = searchParams.get('featured');
    
    let query = {};
    if (featured === 'true') {
      query = { featured: true };
    }
    
    const blogs = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch blogs';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
