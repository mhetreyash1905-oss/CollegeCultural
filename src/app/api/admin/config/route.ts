import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { SiteConfig } from '@/models/SiteConfig';
import { logAdminAction } from '@/lib/auditLogger';

export async function GET() {
  try {
    await dbConnect();
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create({}); // Create default
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create(data);
    } else {
      config = await SiteConfig.findOneAndUpdate({}, data, { new: true });
    }

    if (config) {
      await logAdminAction(req as any, 'UPDATE', 'SiteConfig', config._id.toString(), 'Updated site configuration');
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
