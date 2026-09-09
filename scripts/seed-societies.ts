import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Society from '../src/models/Society';

dotenv.config({ path: '.env.local' });

const societies = [
  {
    name: 'AMS',
    tag: 'Acoustics & Media',
    description: 'Acoustics and Media Society. Handles photography, videography, auditorium console, and media coverage.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    accentColor: '#FFC93C',
    order: 1
  },
  {
    name: 'Nirmiti',
    tag: 'Fine Arts',
    description: 'The fine arts society of IIIT Allahabad, dedicated to sketching, painting, crafts, and visual arts.',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    accentColor: '#00B4A6',
    order: 2
  },
  {
    name: 'GeneticX',
    tag: 'Dance',
    description: 'The official dance society. Brings energy to the campus with hip-hop, contemporary, and classical performances.',
    imageUrl: 'https://images.unsplash.com/photo-1504609774579-cb14777eeab6?w=800&q=80',
    accentColor: '#FF4D6D',
    order: 3
  },
  {
    name: 'Rangtarangini',
    tag: 'Drama',
    description: 'The dramatics society, capturing emotions through stage plays, street plays (nukkad natak), and acting.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d0330a158b45?w=800&q=80',
    accentColor: '#7B2FF7',
    order: 4
  },
  {
    name: 'Virtousi',
    tag: 'Music',
    description: 'The music society that harmonizes the campus with instrumental, classical, and modern music performances.',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    accentColor: '#FFC93C',
    order: 5
  },
  {
    name: 'Saraswa',
    tag: 'Literature',
    description: 'The literary society focusing on poetry, debates, open mics, and creative writing.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=800&q=80',
    accentColor: '#00B4A6',
    order: 6
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    await Society.deleteMany({});
    await Society.insertMany(societies);
    console.log('Seeded societies successfully!');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
