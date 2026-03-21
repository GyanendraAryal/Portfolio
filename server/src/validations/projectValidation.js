import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  techStack: z.array(z.string()).min(1, 'At least one tech stack item is required'),
  imageUrl: z.string().url('Invalid image URL'),
  githubLink: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  liveLink: z.string().url('Invalid live link URL').optional().or(z.literal('')),
});

export const validateProject = (data) => projectSchema.parse(data);
