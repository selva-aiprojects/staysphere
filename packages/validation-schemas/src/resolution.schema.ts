import { z } from 'zod';

export const CreateTicketSchema = z.object({
  category: z.enum([
    'TRANSIT_NO_SHOW',
    'TRANSIT_DELAY',
    'ROOM_UNAVAILABLE',
    'ROOM_HYGIENE',
    'AMENITY_DEFECT',
    'BILLING_DISPUTE',
    'SAFETY_SECURITY',
    'GENERAL_INQUIRY',
  ]),
  priority: z.enum(['P0_CRITICAL', 'P1_HIGH', 'P2_MEDIUM', 'P3_LOW']).default('P2_MEDIUM'),
  subject: z.string().min(5).max(150),
  description: z.string().min(10).max(2000),
  relatedStayBookingId: z.string().uuid().optional(),
  relatedTransitBookingId: z.string().uuid().optional(),
});

export const UpdateTicketStatusSchema = z.object({
  status: z.enum([
    'TRIAGED',
    'PARTNER_CONTACTED',
    'IN_PROGRESS',
    'RESOLUTION_PROPOSED',
    'CUSTOMER_CONFIRMED',
    'CLOSED',
    'REOPENED',
    'ESCALATED',
  ]),
  assignedAgentId: z.string().uuid().optional(),
  proposedResolution: z.string().max(1000).optional(),
  serviceRecoveryType: z
    .enum(['ROOM_UPGRADE', 'REPLACEMENT_VEHICLE', 'REFUND', 'PLATFORM_CREDIT', 'PENALTY'])
    .optional(),
  serviceRecoveryAmount: z.number().min(0).optional(),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketStatusInput = z.infer<typeof UpdateTicketStatusSchema>;
