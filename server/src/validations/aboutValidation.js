import { z } from 'zod';

export const aboutSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
  resumeUrl: z.string().url('Invalid resume URL').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  socialLinks: z.object({
    github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
  }).optional(),
});

export const validateAbout = (data) => aboutSchema.parse(data);
