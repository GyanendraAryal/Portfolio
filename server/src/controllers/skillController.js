import asyncHandler from 'express-async-handler';
import Skill from '../models/Skill.js';
import { validateSkill } from '../validations/skillValidation.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({}).sort({ createdAt: -1 });
  res.json(skills);
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = asyncHandler(async (req, res) => {
  const validatedData = validateSkill(req.body);
  const skill = new Skill(validatedData);
  const createdSkill = await skill.save();
  res.status(201).json(createdSkill);
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = asyncHandler(async (req, res) => {
  const validatedData = validateSkill(req.body);
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    Object.assign(skill, validatedData);
    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    await skill.deleteOne();
    res.json({ message: 'Skill removed' });
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});
