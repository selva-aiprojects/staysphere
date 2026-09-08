import { z } from 'zod';

export const SearchHotelsQuerySchema = z.object({
  city: z.string().optional(),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  radiusKm: z.coerce.number().min(1).max(100).default(15),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
  guestCount: z.coerce.number().int().min(1).default(1),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  category: z.enum([
    'HOTEL',
    'RESORT',
    'SERVICED_APARTMENT',
    'APARTMENT_RENTAL',
    'VILLA',
    'BOUTIQUE_STAY',
    'HOMESTAY',
  ]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const CreateStayBookingSchema = z.object({
  propertyId: z.string().uuid(),
  roomTypeId: z.string().uuid(),
  ratePlanId: z.string().uuid(),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guestCount: z.number().int().min(1),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(7),
  specialRequests: z.string().max(500).optional(),
});

export type SearchHotelsQuery = z.infer<typeof SearchHotelsQuerySchema>;
export type CreateStayBookingInput = z.infer<typeof CreateStayBookingSchema>;
