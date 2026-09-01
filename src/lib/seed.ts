import mongoose from 'mongoose';
import dbConnect from './mongodb';
import Society from '../models/Society';
import Event from '../models/Event';
import BlogPost from '../models/BlogPost';
import GalleryImage from '../models/GalleryImage';
import CouncilMember from '../models/CouncilMember';

const societies = [
  {
    name: 'Nritya',
    description: 'The official dance society of IIIT Allahabad. We provide a platform for students to express themselves through various dance forms including classical, contemporary, and hip-hop.',
    tag: 'Dance',
    accentColor: '#FF4D6D',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600'
  },
  {
    name: 'Dhwani',
    description: 'Dhwani is the music society of IIITA, bringing together vocalists, instrumentalists, and music enthusiasts. We organize jam sessions, musical nights, and represent the college in various fests.',
    tag: 'Music',
    accentColor: '#FFC93C',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600'
  },
  {
    name: 'Rang Manch',
    description: 'The dramatics society dedicated to the art of theatre. We perform stage plays, street plays (Nukkad Natak), and mime, raising awareness on social issues and entertaining the masses.',
    tag: 'Theatre',
    accentColor: '#7B2FF7',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600'
  },
  {
    name: 'Kalakriti',
    description: 'Kalakriti is the fine arts society of IIIT Allahabad. We celebrate creativity through sketching, painting, digital art, and craft, turning blank canvases into masterpieces.',
    tag: 'Art',
    accentColor: '#00B4A6',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600'
  },
  {
    name: 'Abhivyakti',
    description: 'The literary society of our college, focusing on debating, poetry, and creative writing. We foster a culture of intellectual discourse and literary appreciation among students.',
    tag: 'Literary',
    accentColor: '#FF8C42',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600'
  },
  {
    name: 'Pixel',
    description: 'Pixel is the photography and videography society. We capture the essence of college life, document events, and conduct workshops for aspiring photographers.',
    tag: 'Photography',
    accentColor: '#E91E63',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600'
  }
];

const events = [
  {
    title: 'Alankar',
    description: 'The annual cultural festival of IIIT Allahabad. Three days of non-stop entertainment, competitions, and pro-nights featuring renowned artists.',
    startDate: new Date('2026-10-15T00:00:00Z'),
    endDate: new Date('2026-10-17T23:59:59Z'),
    location: 'Main Campus',
    type: 'Cultural Fest'
  },
  {
    title: 'Sangeet Sandhya',
    description: 'A magical night dedicated to classical and contemporary music. Join us for mesmerizing performances by Dhwani members.',
    startDate: new Date('2026-10-28T18:00:00Z'),
    endDate: new Date('2026-10-28T22:00:00Z'),
    location: 'Auditorium',
    type: 'Music Night'
  },
  {
    title: 'Natya Utsav',
    description: 'An inter-college theatre festival hosted by Rang Manch. Experience powerful storytelling through stage plays and street performances.',
    startDate: new Date('2026-11-12T10:00:00Z'),
    endDate: new Date('2026-11-12T21:00:00Z'),
    location: 'Open Air Theatre',
    type: 'Theatre Festival'
  },
  {
    title: 'Canvas',
    description: 'An art exhibition showcasing the best works from Kalakriti. Explore diverse art forms and creative installations.',
    startDate: new Date('2026-11-25T10:00:00Z'),
    endDate: new Date('2026-11-25T18:00:00Z'),
    location: 'Student Activity Centre',
    type: 'Art Exhibition'
  },
  {
    title: 'Lit Fest',
    description: 'A celebration of literature featuring debates, slam poetry, and author talks. Organized by Abhivyakti for all word enthusiasts.',
    startDate: new Date('2026-12-10T10:00:00Z'),
    endDate: new Date('2026-12-10T20:00:00Z'),
    location: 'CC3',
    type: 'Literary Festival'
  },
  {
    title: 'Groove',
    description: 'The ultimate dance competition of the semester. Watch top dance crews battle it out for the championship title.',
    startDate: new Date('2027-01-20T17:00:00Z'),
    endDate: new Date('2027-01-20T22:00:00Z'),
    location: 'Main Ground',
    type: 'Dance Competition'
  },
  {
    title: 'Shutterbugs',
    description: 'A photo walk around the campus and nearby heritage sites. Learn photography techniques from Pixel seniors.',
    startDate: new Date('2027-02-05T06:30:00Z'),
    endDate: new Date('2027-02-05T12:00:00Z'),
    location: 'Campus Main Gate',
    type: 'Photo Walk'
  },
  {
    title: 'Rang Barse',
    description: 'The official Holi celebration of IIITA. Enjoy colors, music, and festive delicacies with the entire college community.',
    startDate: new Date('2027-03-14T10:00:00Z'),
    endDate: new Date('2027-03-14T15:00:00Z'),
    location: 'Sports Ground',
    type: 'Holi Celebration'
  }
];

const posts = [
  {
    title: 'Alankar 2026: A Preview of What Awaits',
    slug: 'alankar-2026-preview',
    publishedAt: new Date('2026-09-01T10:00:00Z'),
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
    excerpt: 'Get ready for the biggest cultural extravaganza of the year. From star nights to thrilling competitions, Alankar 2026 promises to be unforgettable.',
    content: 'Alankar, the annual cultural festival of IIIT Allahabad, is back and bigger than ever. Scheduled for October 15-17, 2026, this three-day fiesta will feature a perfect blend of music, dance, art, and drama.\n\nThis year, the organizing committee has planned an array of new flagship events, including an inter-college battle of bands and a massive fashion show. Students from all across the country are expected to participate, making it a true celebration of youth and culture.\n\nStay tuned for the pro-night artist reveal! You won\'t want to miss what we have in store. Start preparing your teams and get ready to witness the magic of Alankar.'
  },
  {
    title: 'Behind the Scenes: Preparing for Natya Utsav',
    slug: 'behind-scenes-natya-utsav',
    publishedAt: new Date('2026-08-25T10:00:00Z'),
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1456950275990-7d7b1401f11a?w=600',
    excerpt: 'Take a sneak peek into the rigorous practice sessions and creative processes of Rang Manch as they prepare for the upcoming theatre festival.',
    content: 'The stage is set, the scripts are finalized, and the actors are putting their heart and soul into every dialogue. Rang Manch is leaving no stone unturned in their preparation for Natya Utsav, the much-awaited theatre festival.\n\nLate-night rehearsals have become the norm at the open-air theatre. From perfecting expressions to coordinating light and sound, every detail is being meticulously planned. The dedication of the team is truly inspiring.\n\nJoin us on November 12th to witness the culmination of months of hard work and passion. Support our talented actors as they bring diverse stories to life on stage.'
  },
  {
    title: 'Why Every Student Should Join a Cultural Society',
    slug: 'why-join-cultural-society',
    publishedAt: new Date('2026-08-15T10:00:00Z'),
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1523580494112-071d50c95874?w=600',
    excerpt: 'Explore the numerous benefits of being part of a cultural society in college. It\'s not just about extracurriculars; it\'s about holistic development.',
    content: 'College life is about much more than academics. Joining a cultural society offers a unique opportunity to pursue your passions, discover hidden talents, and build lasting friendships.\n\nBeyond honing your artistic skills, these societies help develop crucial life skills such as leadership, teamwork, and time management. Organizing events and managing diverse teams provide practical experiences that are invaluable in any career path.\n\nSo step out of your comfort zone, attend those inductions, and find your tribe. The memories you make in these societies will be some of the most cherished ones from your college days.'
  },
  {
    title: 'Interview with the Music Society President',
    slug: 'music-society-president-interview',
    publishedAt: new Date('2026-08-05T10:00:00Z'),
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1516280440502-863378370164?w=600',
    excerpt: 'We sit down with the President of Dhwani to discuss their vision for the year, upcoming projects, and the thriving music culture at IIITA.',
    content: 'In this exclusive interview, we had the pleasure of speaking with the President of Dhwani, the music society. They shared insightful perspectives on the society\'s goals for the academic year and the exciting projects in the pipeline.\n\nThe focus this year is on encouraging original compositions and increasing collaborations with other societies. There are plans to host regular open mic nights to discover new talent and provide a platform for budding musicians.\n\nThe vibrant music culture at IIITA is a testament to the dedication of Dhwani members. We can\'t wait to see what musical marvels they have in store for us.'
  },
  {
    title: 'The Art of Expression: A Photo Essay',
    slug: 'art-of-expression-photo-essay',
    publishedAt: new Date('2026-07-20T10:00:00Z'),
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
    excerpt: 'A visual journey through the diverse forms of artistic expression on campus, curated in collaboration with Pixel and Kalakriti.',
    content: 'This photo essay is a collaborative effort between Pixel and Kalakriti, showcasing the vibrant artistic expressions found across our campus. From captivating murals to intense dance routines, art is everywhere.\n\nThe photographs capture the raw emotion and dedication of students immersed in their creative pursuits. Each image tells a unique story, highlighting the diverse talents that enrich our college community.\n\nWe hope this visual journey inspires you to appreciate the beauty of art in everyday life and encourages you to explore your own creative side.'
  }
];

const galleries = [
  { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600', title: 'Festive Crowd', category: 'Events' },
  { url: 'https://images.unsplash.com/photo-1540039155732-61ee48b998af?w=600', title: 'Classical Dance', category: 'Dance' },
  { url: 'https://images.unsplash.com/photo-1520872024865-3ff2805d8bb3?w=600', title: 'Live Concert', category: 'Music' },
  { url: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600', title: 'Art Exhibition', category: 'Art' },
  { url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600', title: 'Drama Performance', category: 'Theatre' },
  { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600', title: 'Acoustic Session', category: 'Music' },
  { url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600', title: 'Photography Walk', category: 'Photography' },
  { url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600', title: 'Cultural Fest Colors', category: 'Events' },
  { url: 'https://images.unsplash.com/photo-1545987796-200677ee1011?w=600', title: 'Tech Meets Culture', category: 'Events' },
  { url: 'https://images.unsplash.com/photo-1493225457124-a1a2c10a30b5?w=600', title: 'Literary Debate', category: 'Literary' },
  { url: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?w=600', title: 'Hip Hop Crew', category: 'Dance' },
  { url: 'https://images.unsplash.com/photo-1533174000255-a63e80dcb865?w=600', title: 'Stage Preparation', category: 'Theatre' }
];

const members = [
  { name: 'Arjun Mehta', position: 'President', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600' },
  { name: 'Priya Sharma', position: 'Vice President', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600' },
  { name: 'Rohan Gupta', position: 'General Secretary', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600' },
  { name: 'Ananya Singh', position: 'Treasurer', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600' },
  { name: 'Vikram Patel', position: 'Events Coordinator', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600' },
  { name: 'Sneha Reddy', position: 'PR & Media Head', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600' },
  { name: 'Aditya Kumar', position: 'Technical Coordinator', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600' },
  { name: 'Ishita Verma', position: 'Creative Head', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600' }
];

async function seed() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB.');

    // Clear existing data
    await Society.deleteMany({});
    await Event.deleteMany({});
    await BlogPost.deleteMany({});
    await GalleryImage.deleteMany({});
    await CouncilMember.deleteMany({});
    console.log('Cleared existing collections.');

    // Insert new data
    await Society.insertMany(societies);
    console.log(`Inserted ${societies.length} societies.`);
    
    await Event.insertMany(events);
    console.log(`Inserted ${events.length} events.`);
    
    await BlogPost.insertMany(posts);
    console.log(`Inserted ${posts.length} blog posts.`);
    
    await GalleryImage.insertMany(galleries);
    console.log(`Inserted ${galleries.length} gallery images.`);
    
    await CouncilMember.insertMany(members);
    console.log(`Inserted ${members.length} council members.`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
}

seed();
