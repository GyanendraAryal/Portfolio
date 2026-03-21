import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import connectDB from './src/config/db.js';

dotenv.config();

const createAdmin = async () => {
  const mongoUri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
  try {
    await mongoose.connect(mongoUri);
    console.log('Database Connected Successfully');
  } catch (err) {
    console.error('Database Connection Failed:', err.message);
    process.exit(1);
  }

  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.log('Usage: node createAdmin.js <username> <password>');
    process.exit(1);
  }

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      console.log('Admin already exists');
      process.exit(1);
    }

    const user = await User.create({ username, password });

    if (user) {
      console.log(`Admin created successfully: ${username}`);
    } else {
      console.log('Error creating admin');
    }
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
