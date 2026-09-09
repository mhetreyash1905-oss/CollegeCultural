import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { AdminUser } from '../src/models/AdminUser';
import readline from 'readline';

// Load env vars
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected.');

    const username = await question('Enter superadmin username (e.g., admin): ');
    
    // Check if exists
    const existing = await AdminUser.findOne({ username: username.toLowerCase() });
    if (existing) {
      console.log('User already exists!');
      process.exit(0);
    }

    const name = await question('Enter superadmin full name: ');
    
    let password = '';
    while (password.length < 8) {
      password = await question('Enter superadmin password (min 8 chars): ');
      if (password.length < 8) console.log('Password too short.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await AdminUser.create({
      username: username.toLowerCase(),
      name,
      passwordHash,
      role: 'superadmin',
      isActive: true,
    });

    console.log('\n✅ Superadmin account created successfully!');
    console.log(`Username: ${username}`);
    
  } catch (error) {
    console.error('Error creating superadmin:', error);
  } finally {
    mongoose.disconnect();
    rl.close();
  }
}

main();
