import { z } from 'zod';

export const LoginRequestSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const RegisterRequestSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().optional(),
  role: z.enum([
    'GUEST',
    'HOTEL_MANAGER',
    'HOTEL_STAFF',
    'TRAVEL_PARTNER',
    'DRIVER',
    'CHANNEL_PARTNER',
  ]).default('GUEST'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
