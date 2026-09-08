export type PropertyCategory =
  | 'HOTEL'
  | 'RESORT'
  | 'SERVICED_APARTMENT'
  | 'APARTMENT_RENTAL'
  | 'VILLA'
  | 'BOUTIQUE_STAY'
  | 'HOMESTAY';

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'DISPUTED';

export interface Amenity {
  id: string;
  name: string;
  category: 'GENERAL' | 'ROOM' | 'WELLNESS' | 'DINING' | 'BUSINESS';
  iconName: string;
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  category: PropertyCategory;
  description: string;
  starRating?: number;
  trustScore: number;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  featuredImages: string[];
  amenities: Amenity[];
  checkInTime: string;
  checkOutTime: string;
  isVerified: boolean;
  isActive: boolean;
  hotelPartnerId: string;
}

export interface RoomType {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  baseCapacity: number;
  maxCapacity: number;
  bedConfiguration: string;
  roomSizeSqFt?: number;
  images: string[];
  totalInventory: number;
}

export interface RatePlan {
  id: string;
  roomTypeId: string;
  name: string;
  isBreakfastIncluded: boolean;
  isFreeCancellation: boolean;
  cancellationCutoffHours: number;
  baseNightlyRate: number;
  currency: string;
}

export interface StayBooking {
  id: string;
  bookingReference: string;
  guestId: string;
  propertyId: string;
  roomTypeId: string;
  ratePlanId: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  guestCount: number;
  status: BookingStatus;
  baseAmount: number;
  taxAmount: number;
  platformFeeAmount: number;
  totalAmount: number;
  currency: string;
  specialRequests?: string;
  createdAt: string;
}
