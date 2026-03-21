import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.post('/upload', protect, upload.single('image'), (req, res) => {
  res.json({
    message: 'Image uploaded successfully',
    url: req.file.path,
  });
});

router.route('/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
