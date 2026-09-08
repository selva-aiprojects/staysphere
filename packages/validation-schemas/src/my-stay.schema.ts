import { z } from 'zod';

export const CreateServiceRequestSchema = z.object({
  stayBookingId: z.string().uuid(),
  roomNumber: z.string().min(1),
  category: z.enum([
    'HOUSEKEEPING',
    'ROOM_DINING',
    'MAINTENANCE',
    'SPA_WELLNESS',
    'BELL_DESK',
    'FRONT_DESK',
  ]),
  title: z.string().min(3).max(100),
  details: z.string().min(3).max(500),
  quantity: z.number().int().min(1).default(1),
});

export const UpdateServiceRequestStatusSchema = z.object({
  status: z.enum(['ACKNOWLEDGED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED', 'ESCALATED']),
  assignedStaffId: z.string().uuid().optional(),
  resolutionNotes: z.string().max(300).optional(),
});

export type CreateServiceRequestInput = z.infer<typeof CreateServiceRequestSchema>;
export type UpdateServiceRequestStatusInput = z.infer<typeof UpdateServiceRequestStatusSchema>;
