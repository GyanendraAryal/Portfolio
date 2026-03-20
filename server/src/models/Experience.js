import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: String, // e.g., 'Jan 2021'
    required: true,
  },
  endDate: {
    type: String, // e.g., 'Present'
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
