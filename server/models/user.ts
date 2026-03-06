import mongoose from 'mongoose';
import { profile } from 'node:console';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  school: {
    type: String,
  },
  grade: {
    type: Number,
  },
  bio: {
    type: String,
    max: 200,
  },
  role: {
    type: String,
    default: 'user',
  },
  profileImageName: {
    type: String,
    default: 'default-profile-pic.png.png',
  },
});

export default mongoose.model('User', userSchema);
