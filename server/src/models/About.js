import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  resumeUrl: {
    type: String,
  },
  email: {
    type: String,
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
  }
}, {
  timestamps: true,
});

const About = mongoose.model('About', aboutSchema);
export default About;
