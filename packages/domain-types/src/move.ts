export type TransitServiceType =
  | 'AIRPORT_TRANSFER'
  | 'RAILWAY_TRANSFER'
  | 'LOCAL_CITY_CAB'
  | 'FULL_DAY_RENTAL'
  | 'OUTSTATION';

export type VehicleClass =
  | 'SEDAN'
  | 'SUV'
  | 'LUXURY_SEDAN'
  | 'TEMPO_TRAVELLER'
  | 'ELECTRIC_CAB';

export type TripStatus =
  | 'REQUESTED'
  | 'SEARCHING'
  | 'PARTNER_ACCEPTED'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_EN_ROUTE'
  | 'DRIVER_ARRIVED'
  | 'TRIP_STARTED'
  | 'TRIP_COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'
  | 'DISPUTED';

export interface Vehicle {
  id: string;
  travelPartnerId: string;
  vehicleClass: VehicleClass;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  registrationNumber: string;
  passengerCapacity: number;
  luggageCapacity: number;
  isInsured: boolean;
  isVerified: boolean;
}

export interface Driver {
  id: string;
  userId: string;
  travelPartnerId: string;
  commercialLicenseNumber: string;
  licenseExpiryDate: string;
  assignedVehicleId?: string;
  currentLatitude?: number;
  currentLongitude?: number;
  isAvailable: boolean;
  trustRating: number;
  totalTripsCompleted: number;
}

export interface TransitBooking {
  id: string;
  bookingReference: string;
  guestId: string;
  stayBookingId?: string;
  serviceType: TransitServiceType;
  vehicleClass: VehicleClass;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  dropAddress: string;
  dropLatitude: number;
  dropLongitude: number;
  scheduledPickupTime: string;
  flightNumber?: string;
  status: TripStatus;
  travelPartnerId?: string;
  driverId?: string;
  vehicleId?: string;
  totalDistanceKm?: number;
  estimatedDurationMins?: number;
  baseFare: number;
  taxAmount: number;
  totalFare: number;
  currency: string;
  createdAt: string;
}
