import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const submission = await ContactSubmission.create({ name, email, message });

    return NextResponse.json(
      { success: true, data: { id: submission._id } },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to submit contact form';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
