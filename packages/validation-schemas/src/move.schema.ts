import { z } from 'zod';

export const RequestTransitQuoteSchema = z.object({
  serviceType: z.enum([
    'AIRPORT_TRANSFER',
    'RAILWAY_TRANSFER',
    'LOCAL_CITY_CAB',
    'FULL_DAY_RENTAL',
    'OUTSTATION',
  ]),
  vehicleClass: z.enum([
    'SEDAN',
    'SUV',
    'LUXURY_SEDAN',
    'TEMPO_TRAVELLER',
    'ELECTRIC_CAB',
  ]),
  pickupAddress: z.string().min(3),
  pickupLatitude: z.number().min(-90).max(90),
  pickupLongitude: z.number().min(-180).max(180),
  dropAddress: z.string().min(3),
  dropLatitude: z.number().min(-90).max(90),
  dropLongitude: z.number().min(-180).max(180),
  scheduledPickupTime: z.string().datetime(),
  passengers: z.number().int().min(1).default(1),
  flightNumber: z.string().optional(),
});

export const CreateTransitBookingSchema = RequestTransitQuoteSchema.extend({
  stayBookingId: z.string().uuid().optional(),
  notesForDriver: z.string().max(300).optional(),
});

export const UpdateDriverLocationSchema = z.object({
  driverId: z.string().uuid(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  heading: z.number().min(0).max(360).optional(),
  speedKmh: z.number().min(0).optional(),
});

export type RequestTransitQuote = z.infer<typeof RequestTransitQuoteSchema>;
export type CreateTransitBookingInput = z.infer<typeof CreateTransitBookingSchema>;
export type UpdateDriverLocationInput = z.infer<typeof UpdateDriverLocationSchema>;
