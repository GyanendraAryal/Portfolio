import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Should ideally be disabled in production after setup

export default router;
