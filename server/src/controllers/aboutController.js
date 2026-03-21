import asyncHandler from 'express-async-handler';
import About from '../models/About.js';
import { validateAbout } from '../validations/aboutValidation.js';

// @desc    Get about information
// @route   GET /api/about
// @access  Public
export const getAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    // Create default if not exists
    about = await About.create({
      content: 'I am a passionate developer.',
      email: 'contact@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
    });
  }
  res.json(about);
});

// @desc    Update about information
// @route   PUT /api/about
// @access  Private/Admin
export const updateAbout = asyncHandler(async (req, res) => {
  const validatedData = validateAbout(req.body);
  let about = await About.findOne();
  
  if (about) {
    Object.assign(about, validatedData);
    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } else {
    about = new About(validatedData);
    const createdAbout = await about.save();
    res.status(201).json(createdAbout);
  }
});
