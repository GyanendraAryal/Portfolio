import asyncHandler from 'express-async-handler';
import Experience from '../models/Experience.js';
import { validateExperience } from '../validations/experienceValidation.js';

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
export const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({}).sort({ createdAt: -1 });
  res.json(experiences);
});

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private/Admin
export const createExperience = asyncHandler(async (req, res) => {
  const validatedData = validateExperience(req.body);
  const experience = new Experience(validatedData);
  const createdExperience = await experience.save();
  res.status(201).json(createdExperience);
});

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
export const updateExperience = asyncHandler(async (req, res) => {
  const validatedData = validateExperience(req.body);
  const experience = await Experience.findById(req.params.id);

  if (experience) {
    Object.assign(experience, validatedData);
    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
export const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (experience) {
    await experience.deleteOne();
    res.json({ message: 'Experience removed' });
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});
