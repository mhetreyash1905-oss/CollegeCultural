import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { AdminUser } from '../src/models/AdminUser';

dotenv.config({ path: '.env.local' });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    // Check if default admin exists
    const existing = await AdminUser.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin user already exists! Username: admin');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin1234', salt);

    await AdminUser.create({
      username: 'admin',
      name: 'System Administrator',
      passwordHash,
      role: 'superadmin',
      isActive: true,
    });

    console.log('Successfully created default superadmin!');
    console.log('Username: admin');
    console.log('Password: admin1234');
    
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
