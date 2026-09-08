export type ServiceCategory =
  | 'HOUSEKEEPING'
  | 'ROOM_DINING'
  | 'MAINTENANCE'
  | 'SPA_WELLNESS'
  | 'BELL_DESK'
  | 'FRONT_DESK';

export type ServiceRequestStatus =
  | 'PENDING'
  | 'ACKNOWLEDGED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'ESCALATED';

export interface ServiceRequest {
  id: string;
  stayBookingId: string;
  propertyId: string;
  guestId: string;
  roomNumber: string;
  category: ServiceCategory;
  title: string;
  details: string;
  quantity?: number;
  status: ServiceRequestStatus;
  slaTargetMinutes: number;
  assignedStaffId?: string;
  requestedAt: string;
  acknowledgedAt?: string;
  completedAt?: string;
}
