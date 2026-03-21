import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['Frontend', 'Backend', 'Tools', 'Other'], {
    message: 'Invalid category',
  }),
  iconUrl: z.string().url('Invalid icon URL').optional().or(z.literal('')),
  proficiency: z.number().min(0).max(100).optional(),
});

export const validateSkill = (data) => skillSchema.parse(data);
