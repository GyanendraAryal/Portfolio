import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { validateLogin, validateRegister } from '../validations/authValidation.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = validateLogin(req.body);
  
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public (Should be protected or disabled in production)
export const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password } = validateRegister(req.body);
  
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const user = await User.create({ username, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
