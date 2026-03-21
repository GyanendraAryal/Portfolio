import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import { validateProject } from '../validations/projectValidation.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.json(projects);
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  const validatedData = validateProject(req.body);
  const project = new Project(validatedData);
  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  const validatedData = validateProject(req.body);
  const project = await Project.findById(req.params.id);

  if (project) {
    Object.assign(project, validatedData);
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});
