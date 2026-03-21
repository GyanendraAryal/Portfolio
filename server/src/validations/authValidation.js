import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  // Add registration specific fields if any
});

export const validateLogin = (data) => loginSchema.parse(data);
export const validateRegister = (data) => registerSchema.parse(data);
