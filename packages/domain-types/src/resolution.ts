export type TicketCategory =
  | 'TRANSIT_NO_SHOW'
  | 'TRANSIT_DELAY'
  | 'ROOM_UNAVAILABLE'
  | 'ROOM_HYGIENE'
  | 'AMENITY_DEFECT'
  | 'BILLING_DISPUTE'
  | 'SAFETY_SECURITY'
  | 'GENERAL_INQUIRY';

export type TicketPriority = 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';

export type TicketStatus =
  | 'OPEN'
  | 'TRIAGED'
  | 'PARTNER_CONTACTED'
  | 'IN_PROGRESS'
  | 'RESOLUTION_PROPOSED'
  | 'CUSTOMER_CONFIRMED'
  | 'CLOSED'
  | 'REOPENED'
  | 'ESCALATED';

export interface TicketEvidence {
  id: string;
  ticketId: string;
  uploadedByUserId: string;
  fileUrl: string;
  fileType: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT';
  description?: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  creatorUserId: string;
  relatedStayBookingId?: string;
  relatedTransitBookingId?: string;
  assignedAgentId?: string;
  initialResponseSlaMinutes: number;
  resolutionTargetMinutes: number;
  slaBreachDeadline: string;
  isSlaBreached: boolean;
  proposedResolution?: string;
  serviceRecoveryType?: 'ROOM_UPGRADE' | 'REPLACEMENT_VEHICLE' | 'REFUND' | 'PLATFORM_CREDIT' | 'PENALTY';
  serviceRecoveryAmount?: number;
  evidence: TicketEvidence[];
  createdAt: string;
  updatedAt: string;
}
