import express from 'express';
import { createMessage, getMessages, markAsRead, deleteMessage } from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createMessage) // Public
  .get(protect, getMessages); // Admin only

router.route('/:id')
  .put(protect, markAsRead)
  .delete(protect, deleteMessage);

export default router;
