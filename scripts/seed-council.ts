import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import CouncilMember from '../src/models/CouncilMember';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to DB');

    await CouncilMember.deleteMany({});
    console.log('Cleared existing council members');

    const members = [
      {
        name: 'John Doe',
        role: 'President',
        tier: 'leadership',
        imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',
        order: 1
      },
      {
        name: 'Jane Smith',
        role: 'General Secretary',
        tier: 'leadership',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
        order: 2
      },
      {
        name: 'Alex Johnson',
        role: 'Treasurer',
        tier: 'leadership',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
        order: 3
      },
      ...Array.from({ length: 8 }).map((_, i) => ({
        name: `Member ${i + 1}`,
        role: 'Member',
        tier: 'core',
        imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80',
        order: 4 + i
      }))
    ];

    await CouncilMember.insertMany(members);
    console.log('Inserted new council members');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
