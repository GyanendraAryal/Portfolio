import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Tools', 'Other'],
  },
  iconUrl: {
    type: String,
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true,
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
