import { z } from 'zod';

export const experienceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  startDate: z.string().min(3, 'Start date is required'),
  endDate: z.string().min(3, 'End date is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export const validateExperience = (data) => experienceSchema.parse(data);
