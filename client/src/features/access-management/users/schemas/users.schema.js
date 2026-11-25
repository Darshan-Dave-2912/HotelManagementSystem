import { z } from 'zod'

const roleId = z.string().min(1, 'Role is required')

const userName = z
  .string()
  .trim()
  .min(1, 'User name is required')
  .min(3, 'User name must be at least 3 characters')
  .max(50, 'User name cannot exceed 50 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores are allowed')

const email = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .max(150, 'Email cannot exceed 150 characters')
  .email('Please enter a valid email address')

const phone = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .max(15, 'Phone number cannot exceed 15 characters')
  .regex(/^\+?[0-9]{7,15}$/, 'Enter a valid mobile number')

const password = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password cannot exceed 72 characters')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[a-z]/, 'Include at least one lowercase letter')
  .regex(/[0-9]/, 'Include at least one number')
  .regex(/[^A-Za-z0-9]/, 'Include at least one special character')

export const userCreateSchema = z.object({
  roleId,
  userName,
  email,
  phone,
  password,
  isActive: z.boolean(),
})

// Edit form me password nahi hai (backend PATCH password support nahi karta)
export const userUpdateSchema = z.object({
  roleId,
  userName,
  email,
  phone,
  isActive: z.boolean(),
})