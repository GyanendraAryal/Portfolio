import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import { validateMessage } from '../validations/messageValidation.js';

// @desc    Create a message
// @route   POST /api/messages
// @access  Public
export const createMessage = asyncHandler(async (req, res) => {
  const validatedData = validateMessage(req.body);
  const message = new Message(validatedData);
  const createdMessage = await message.save();
  res.status(201).json(createdMessage);
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
export const markAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    message.isRead = true;
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    await message.deleteOne();
    res.json({ message: 'Message removed' });
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});
