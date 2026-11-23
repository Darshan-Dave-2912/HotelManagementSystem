import { z } from 'zod'

export const roleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Role name is required')
    .max(30, 'Role name cannot exceed 30 characters'),
  code: z
    .string()
    .trim()
    .min(1, 'Role code is required')
    .max(6, 'Role code cannot exceed 6 characters')
    .regex(/^[A-Za-z0-9_]+$/, 'Only letters, numbers and underscores are allowed'),
  description: z.string().trim().max(2000, 'Description cannot exceed 2000 characters'),
  isActive: z.boolean(),
})