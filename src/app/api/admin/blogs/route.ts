import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { logAdminAction } from '@/lib/auditLogger';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const items = await BlogPost.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newItem = await BlogPost.create(data);
    await logAdminAction(req as any, 'CREATE', 'BlogPost', newItem._id.toString(), `Created new BlogPost`);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
