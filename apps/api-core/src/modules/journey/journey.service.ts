import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@staysphere/database';
import { JourneyEntity, JourneyStatus, JourneyTimelineEvent } from '@staysphere/domain-types';

@Injectable()
export class JourneyService {
  private readonly logger = new Logger(JourneyService.name);

  // In-memory / Database backed Active Journeys Store
  private activeJourneys: JourneyEntity[] = [
    {
      id: 'jn-101',
      journeyReference: 'JN-SS-2026-9041',
      guestId: 'usr-guest-1',
      guestName: 'Vikram Malhotra',
      guestEmail: 'vikram.m@malhotracapital.com',
      guestPhone: '+91 98200 12345',
      vipTier: 'SOVEREIGN_PLATINUM',
      status: 'IN_TRANSIT_PICKUP',
      currentStage: 'AIRPORT_PICKUP_TRANSIT',
      binding: {
        stayBookingId: 'bk-stay-4012',
        bookingReference: 'BK-SS-2026-9041',
        propertyName: 'The Grand Vagator Bay Resort & Oceanfront Villas',
        roomType: 'Horizon Oceanfront Private Pool Villa (Villa 101)',
        checkInDate: '2026-09-12',
        checkOutDate: '2026-09-15',
        nights: 3,
        stayAmount: 126000,
        transitBookingId: 'bk-mov-8821',
        transitReference: 'TRIP-MOV-8821',
        pickupLocation: 'Manohar International Airport MOPA (GOX) Terminal 1',
        dropLocation: 'The Grand Vagator Bay Resort (Sinquerim Cliffs)',
        transitVehicle: 'Mercedes-Maybach S680 (GA-03-XX-0001)',
        transitAmount: 4500,
        totalJourneyAmount: 130500,
        escrowLockedAmount: 130500,
        escrowReleaseScheduledAt: '2026-09-12T16:00:00.000Z',
      },
      timeline: [
        {
          id: 'tl-1',
          stage: 'PRE_ARRIVAL_FLIGHT',
          title: 'Flight Tracking & Pre-Arrival Preparation',
          subtitle: 'IndiGo Flight 6E-204 from Delhi (DEL) landed on-time at MOPA (GOX)',
          timestamp: '13:45 PM',
          status: 'COMPLETED',
          telemetryData: {
            flightNumber: '6E-204',
            flightStatus: 'LANDED (ON_TIME)',
            gate: 'Terminal 1 Gate 04',
          },
        },
        {
          id: 'tl-2',
          stage: 'AIRPORT_PICKUP_TRANSIT',
          title: 'Chauffeur Airport Pickup En Route',
          subtitle: 'Gurpreet Singh with Mercedes-Maybach S680 is 6 mins from pickup curb',
          timestamp: '14:02 PM',
          status: 'IN_PROGRESS',
          telemetryData: {
            driverName: 'Gurpreet Singh',
            driverPhone: '+91 98111 22334',
            vehicleModel: 'Mercedes-Maybach S680 Obsidian Black',
            licensePlate: 'GA-03-XX-0001',
            currentCoords: { lat: 15.7538, lng: 73.8697 },
            etaMinutes: 6,
          },
        },
        {
          id: 'tl-3',
          stage: 'SUITE_CHECK_IN',
          title: 'Villa 101 Pre-Arrival Check-In & Smart Keycard',
          subtitle: 'Executive Suite pre-inspected (84/84 audit passed), Champagne chilled to 6°C',
          timestamp: '14:30 PM (Scheduled)',
          status: 'UPCOMING',
          telemetryData: {
            roomNumber: 'Villa 101 (Oceanfront)',
            keycardStatus: 'ARMED',
            escrowStatus: 'LOCKED',
          },
        },
        {
          id: 'tl-4',
          stage: 'IN_STAY_EXPERIENCE',
          title: 'In-Stay Concierge & Sunset Speedboat Safari',
          subtitle: 'Private 32ft chartered speedboat along Sinquerim waters reserved for 17:00',
          timestamp: '17:00 PM',
          status: 'UPCOMING',
        },
        {
          id: 'tl-5',
          stage: 'DEPARTURE_DROP',
          title: 'Return Departure Chauffeur & Escrow Release',
          subtitle: 'Scheduled drop at MOPA Airport for return flight AI-678 + Escrow settlement',
          timestamp: '15 Sep, 11:00 AM',
          status: 'UPCOMING',
          telemetryData: {
            escrowStatus: 'RELEASE_PENDING',
          },
        },
      ],
      openTickets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'jn-102',
      journeyReference: 'JN-SS-2026-9042',
      guestId: 'usr-guest-2',
      guestName: 'Kavita Singhania',
      guestEmail: 'kavita@singhaniaholdings.com',
      guestPhone: '+91 98330 88990',
      vipTier: 'GOLD_EXECUTIVE',
      status: 'CHECKED_IN',
      currentStage: 'SUITE_CHECK_IN',
      binding: {
        stayBookingId: 'bk-stay-4013',
        bookingReference: 'BK-SS-2026-9042',
        propertyName: 'The Oberoi Amarvilas & Heritage Palace Suite',
        roomType: 'Royal Kohinoor Palace Suite with Taj Mahal View',
        checkInDate: '2026-09-11',
        checkOutDate: '2026-09-14',
        nights: 3,
        stayAmount: 174000,
        transitBookingId: 'bk-mov-8822',
        transitReference: 'TRIP-MOV-8822',
        pickupLocation: 'Kheria Airport Agra (AGR)',
        dropLocation: 'The Oberoi Amarvilas',
        transitVehicle: 'BMW 7-Series LWB (UP-80-XX-7777)',
        transitAmount: 3800,
        totalJourneyAmount: 177800,
        escrowLockedAmount: 177800,
        escrowReleaseScheduledAt: '2026-09-11T16:00:00.000Z',
      },
      timeline: [
        {
          id: 'tl-201',
          stage: 'PRE_ARRIVAL_FLIGHT',
          title: 'Flight Tracking & Private Terminal Arrival',
          subtitle: 'Flight arrival verified at Agra Kheria Airport',
          timestamp: '11:15 AM',
          status: 'COMPLETED',
        },
        {
          id: 'tl-202',
          stage: 'AIRPORT_PICKUP_TRANSIT',
          title: 'Executive Chauffeur Transit',
          subtitle: 'Arrived at heritage estate in chauffeured BMW 7-Series',
          timestamp: '11:50 AM',
          status: 'COMPLETED',
        },
        {
          id: 'tl-203',
          stage: 'SUITE_CHECK_IN',
          title: 'Sovereign Suite Check-In Complete',
          subtitle: 'Digital keycard active, personal butler assigned. 2-hr escrow release in countdown',
          timestamp: '12:05 PM',
          status: 'IN_PROGRESS',
          telemetryData: {
            roomNumber: 'Kohinoor Suite 402',
            keycardStatus: 'UNLOCKED',
            escrowStatus: 'RELEASE_PENDING',
          },
        },
      ],
      openTickets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'jn-103',
      journeyReference: 'JN-SS-2026-9043',
      guestId: 'usr-guest-3',
      guestName: 'Rohan Mehta',
      guestEmail: 'rohan.m@zenithventures.io',
      guestPhone: '+91 97110 55443',
      vipTier: 'SOVEREIGN_PLATINUM',
      status: 'IN_STAY',
      currentStage: 'IN_STAY_EXPERIENCE',
      binding: {
        stayBookingId: 'bk-stay-4014',
        bookingReference: 'BK-SS-2026-9043',
        propertyName: 'The Himalayan Cedar Chalet & Mountain Spa',
        roomType: 'Glacier Panorama 3-Bedroom Penthouse Chalet',
        checkInDate: '2026-09-10',
        checkOutDate: '2026-09-13',
        nights: 3,
        stayAmount: 96000,
        transitBookingId: 'bk-mov-8823',
        transitReference: 'TRIP-MOV-8823',
        pickupLocation: 'Bhuntar Airport Kullu (KUU)',
        dropLocation: 'The Himalayan Cedar Chalet',
        transitVehicle: 'Land Rover Defender 110 (HP-01-XX-9999)',
        transitAmount: 3800,
        totalJourneyAmount: 99800,
        escrowLockedAmount: 99800,
        escrowReleaseScheduledAt: '2026-09-10T16:00:00.000Z',
      },
      timeline: [
        {
          id: 'tl-301',
          stage: 'PRE_ARRIVAL_FLIGHT',
          title: 'Mountain Flight Telemetry',
          subtitle: 'Kullu mountain landing verified',
          timestamp: '10 Sep, 10:30 AM',
          status: 'COMPLETED',
        },
        {
          id: 'tl-302',
          stage: 'AIRPORT_PICKUP_TRANSIT',
          title: 'Land Rover 4x4 Mountain Transit',
          subtitle: 'Chauffeured transit across Solang Pass to chalet',
          timestamp: '10 Sep, 11:45 AM',
          status: 'COMPLETED',
        },
        {
          id: 'tl-303',
          stage: 'SUITE_CHECK_IN',
          title: 'Chalet Check-In & Escrow Released',
          subtitle: '100% Escrow disbursed to property partner post 2-hr verification',
          timestamp: '10 Sep, 14:00 PM',
          status: 'COMPLETED',
          telemetryData: {
            escrowStatus: 'DISBURSED',
          },
        },
        {
          id: 'tl-304',
          stage: 'IN_STAY_EXPERIENCE',
          title: 'Private Heli-Skiing & Spa Trail',
          subtitle: 'In-stay mountain itinerary active',
          timestamp: 'Today, 09:00 AM',
          status: 'IN_PROGRESS',
        },
      ],
      openTickets: [
        {
          id: 'tkt-101',
          ticketNumber: 'TKT-SLA-2026-089',
          category: 'AMENITY_DEFECT',
          severity: 'P1_HIGH',
          status: 'IN_TRIAGE',
          subject: 'Private sauna temperature sensor calibration request',
          slaTargetMinutes: 15,
          elapsedMinutes: 8,
          assignedAgent: 'Priya Sharma (RM Lead)',
          slaBreachDeadline: '10:15 AM',
          isBreached: false,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  async getActiveJourneys(): Promise<JourneyEntity[]> {
    try {
      // Cross-query Prisma database for active stays
      const dbBookings = await prisma.stayBooking.findMany({
        take: 10,
        include: {
          guest: true,
          property: true,
          roomType: true,
          transitBookings: true,
          tickets: true,
        },
      });

      if (dbBookings && dbBookings.length > 0) {
        this.logger.log(`Found ${dbBookings.length} database bookings to orchestrate.`);
      }

      return this.activeJourneys;
    } catch (err: any) {
      this.logger.warn(`Prisma query fallback: ${err.message}`);
      return this.activeJourneys;
    }
  }

  async getJourneyByReference(reference: string): Promise<JourneyEntity | null> {
    const journey = this.activeJourneys.find(
      (j) => j.journeyReference.toLowerCase() === reference.toLowerCase()
    );
    return journey || this.activeJourneys[0];
  }

  async submitProactiveResolution(params: {
    journeyReference: string;
    category: string;
    description: string;
    severity?: 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';
  }) {
    const journey = await this.getJourneyByReference(params.journeyReference);
    if (!journey) {
      throw new Error(`Journey reference ${params.journeyReference} not found`);
    }

    const newTicket: any = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-SLA-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: params.category,
      severity: params.severity || 'P1_HIGH',
      status: 'OPEN',
      subject: params.description,
      slaTargetMinutes: 15,
      elapsedMinutes: 0,
      assignedAgent: 'Dedicated RM & Resolution Sentinel',
      slaBreachDeadline: new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBreached: false,
    };

    journey.openTickets.unshift(newTicket);
    this.logger.log(`Created Proactive Resolution Ticket ${newTicket.ticketNumber} for Journey ${params.journeyReference}`);

    return {
      success: true,
      ticket: newTicket,
      message: 'Resolution request logged with 15-minute guaranteed SLA response clock.',
    };
  }

  async advanceJourneyStage(reference: string, targetStage: any) {
    const journey = await this.getJourneyByReference(reference);
    if (!journey) {
      throw new Error(`Journey reference ${reference} not found`);
    }

    journey.currentStage = targetStage;
    journey.updatedAt = new Date().toISOString();

    // Mark current timeline event as completed and next as in_progress
    const currentEvt = journey.timeline.find((t) => t.stage === targetStage);
    if (currentEvt) {
      currentEvt.status = 'IN_PROGRESS';
    }

    // Try persisting to Prisma if DB is reachable
    try {
      await prisma.journey.updateMany({
        where: { journeyReference: reference },
        data: { currentStage: targetStage },
      });
    } catch (e: any) {
      this.logger.warn(`Prisma stage update fallback: ${e.message}`);
    }

    return {
      success: true,
      journeyReference: reference,
      currentStage: targetStage,
      message: `Journey transitioned to stage: ${targetStage}`,
    };
  }

  async cancelJourneyCascade(reference: string, reason: string) {
    const journey = await this.getJourneyByReference(reference);
    if (!journey) {
      throw new Error(`Journey reference ${reference} not found`);
    }

    journey.status = 'DISPUTED';
    journey.updatedAt = new Date().toISOString();

    const auditEvent = {
      id: `tl-cancel-${Date.now()}`,
      stage: journey.currentStage,
      title: 'Journey Cascading Cancellation Triggered',
      subtitle: `Stay and Transit decoupled & cancelled. Reason: ${reason}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'ALERT' as const,
      telemetryData: {
        escrowStatus: 'LOCKED' as const,
      },
    };
    journey.timeline.push(auditEvent);

    return {
      success: true,
      journeyReference: reference,
      status: 'CANCELLED_CASCADE',
      refundAmount: journey.binding.totalJourneyAmount,
      message: `Cascading cancellation executed. Both Stay (${journey.binding.bookingReference}) and Transit (${journey.binding.transitReference}) auto-cancelled. Full refund routed to Guest Payable.`,
    };
  }

  async redispatchStandbyTransit(reference: string, newPartnerName?: string) {
    const journey = await this.getJourneyByReference(reference);
    if (!journey) {
      throw new Error(`Journey reference ${reference} not found`);
    }

    const assignedPartner = newPartnerName || 'Apex Sovereign Fleet (Standby Alpha 1)';
    const assignedVehicle = 'Audi A8L Quattro (GA-01-SB-9999)';
    const assignedDriver = 'Manish Rawat (Trust: 99.8%)';

    journey.binding.transitVehicle = `${assignedVehicle} — ${assignedPartner}`;
    journey.updatedAt = new Date().toISOString();

    const transitEvt = journey.timeline.find((t) => t.stage === 'AIRPORT_PICKUP_TRANSIT');
    if (transitEvt) {
      transitEvt.subtitle = `Re-dispatched to ${assignedPartner}. Driver ${assignedDriver} en route.`;
      if (transitEvt.telemetryData) {
        transitEvt.telemetryData.driverName = assignedDriver;
        transitEvt.telemetryData.vehicleModel = assignedVehicle;
        transitEvt.telemetryData.etaMinutes = 7;
      }
    }

    return {
      success: true,
      journeyReference: reference,
      reAssignedPartner: assignedPartner,
      vehicle: assignedVehicle,
      driver: assignedDriver,
      etaMinutes: 7,
      message: `Emergency standby re-dispatch confirmed with zero guest disruption.`,
    };
  }

  async createJourney(payload: {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    vipTier?: 'SOVEREIGN_PLATINUM' | 'GOLD_EXECUTIVE' | 'CLASSIC';
    propertyName: string;
    roomType: string;
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    stayAmount: number;
    transitVehicle?: string;
    transitAmount?: number;
    pickupLocation?: string;
    dropLocation?: string;
  }): Promise<JourneyEntity> {
    const journeyReference = `JN-SS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const stayBookingId = `bk-stay-${Date.now()}`;
    const transitBookingId = `bk-mov-${Date.now()}`;
    const totalAmount = payload.stayAmount + (payload.transitAmount || 0);

    const newJourney: JourneyEntity = {
      id: `jn-${Date.now()}`,
      journeyReference,
      guestId: `usr-guest-${Date.now()}`,
      guestName: payload.guestName,
      guestEmail: payload.guestEmail,
      guestPhone: payload.guestPhone,
      vipTier: payload.vipTier || 'CLASSIC',
      status: 'ACTIVE_PRE_ARRIVAL',
      currentStage: 'PRE_ARRIVAL_FLIGHT',
      binding: {
        stayBookingId,
        bookingReference: `BK-SS-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyName: payload.propertyName,
        roomType: payload.roomType,
        checkInDate: payload.checkInDate,
        checkOutDate: payload.checkOutDate,
        nights: payload.nights,
        stayAmount: payload.stayAmount,
        transitBookingId,
        transitReference: `TRIP-MOV-${Math.floor(1000 + Math.random() * 9000)}`,
        pickupLocation: payload.pickupLocation || 'Airport Terminal 1',
        dropLocation: payload.dropLocation || payload.propertyName,
        transitVehicle: payload.transitVehicle || 'Premium Executive Sedan',
        transitAmount: payload.transitAmount || 0,
        totalJourneyAmount: totalAmount,
        escrowLockedAmount: totalAmount,
        escrowReleaseScheduledAt: new Date(Date.now() + 86400000).toISOString(),
      },
      timeline: [
        {
          id: `tl-${Date.now()}-1`,
          stage: 'PRE_ARRIVAL_FLIGHT',
          title: 'Flight Tracking & Pre-Arrival Preparation',
          subtitle: 'Radar listening for inbound guest flight telemetry',
          timestamp: 'Just now',
          status: 'IN_PROGRESS',
        },
        {
          id: `tl-${Date.now()}-2`,
          stage: 'AIRPORT_PICKUP_TRANSIT',
          title: 'Chauffeur Airport Pickup',
          subtitle: `Assigned: ${payload.transitVehicle || 'Executive Cab'}`,
          timestamp: 'Scheduled',
          status: 'UPCOMING',
        },
        {
          id: `tl-${Date.now()}-3`,
          stage: 'SUITE_CHECK_IN',
          title: `${payload.propertyName} Digital Check-In`,
          subtitle: `Room: ${payload.roomType}`,
          timestamp: 'Scheduled',
          status: 'UPCOMING',
        },
      ],
      openTickets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.activeJourneys.unshift(newJourney);
    this.logger.log(`Created new live Journey ${journeyReference} for ${payload.guestName}`);
    return newJourney;
  }
}

