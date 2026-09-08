export type JourneyStatus =
  | 'PLANNED'
  | 'ACTIVE_PRE_ARRIVAL'
  | 'IN_TRANSIT_PICKUP'
  | 'CHECKED_IN'
  | 'IN_STAY'
  | 'IN_TRANSIT_MOBILITY'
  | 'IN_TRANSIT_DROP'
  | 'COMPLETED'
  | 'DISPUTED';

export type JourneyStageType =
  | 'PRE_ARRIVAL_FLIGHT'
  | 'AIRPORT_PICKUP_TRANSIT'
  | 'SUITE_CHECK_IN'
  | 'IN_STAY_EXPERIENCE'
  | 'LOCAL_MOBILITY'
  | 'DEPARTURE_DROP'
  | 'ESCROW_SETTLEMENT';

export interface JourneyTimelineEvent {
  id: string;
  stage: JourneyStageType;
  title: string;
  subtitle: string;
  timestamp: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING' | 'ALERT';
  telemetryData?: {
    flightNumber?: string;
    flightStatus?: string;
    gate?: string;
    driverName?: string;
    driverPhone?: string;
    vehicleModel?: string;
    licensePlate?: string;
    currentCoords?: { lat: number; lng: number };
    etaMinutes?: number;
    roomNumber?: string;
    keycardStatus?: 'ARMED' | 'UNLOCKED' | 'PENDING';
    escrowStatus?: 'LOCKED' | 'RELEASE_PENDING' | 'DISBURSED';
  };
}

export interface CoupledBookingBinding {
  stayBookingId: string;
  bookingReference: string;
  propertyName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  stayAmount: number;
  
  transitBookingId?: string;
  transitReference?: string;
  pickupLocation?: string;
  dropLocation?: string;
  transitVehicle?: string;
  transitAmount?: number;
  
  totalJourneyAmount: number;
  escrowLockedAmount: number;
  escrowReleaseScheduledAt: string;
}

export interface ProactiveResolutionTicket {
  id: string;
  ticketNumber: string;
  category: string;
  severity: 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';
  status: 'OPEN' | 'IN_TRIAGE' | 'RESOLVED';
  subject: string;
  slaTargetMinutes: number;
  elapsedMinutes: number;
  assignedAgent: string;
  slaBreachDeadline: string;
  isBreached: boolean;
}

export interface JourneyEntity {
  id: string;
  journeyReference: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  vipTier: 'SOVEREIGN_PLATINUM' | 'GOLD_EXECUTIVE' | 'CLASSIC';
  status: JourneyStatus;
  currentStage: JourneyStageType;
  binding: CoupledBookingBinding;
  timeline: JourneyTimelineEvent[];
  openTickets: ProactiveResolutionTicket[];
  createdAt: string;
  updatedAt: string;
}
