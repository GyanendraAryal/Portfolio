import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const check = async () => {
  const mongoUri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
  await mongoose.connect(mongoUri);
  const users = await User.find({});
  console.log('Existing Users:', users.map(u => u.username));
  process.exit();
};

check();
