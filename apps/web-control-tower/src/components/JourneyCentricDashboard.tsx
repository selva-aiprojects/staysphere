import React, { useState } from 'react';
import {
  Compass,
  Car,
  Hotel,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  PhoneCall,
  KeyRound,
  SlidersHorizontal,
  Search,
  Eye,
  Zap,
  DollarSign,
  Radio,
  X,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { JourneyEntity } from '@staysphere/domain-types';

interface JourneyCentricDashboardProps {
  onSelectJourney?: (journey: JourneyEntity) => void;
  onOpenResolveDesk?: (ticketId?: string) => void;
}

const MOCK_JOURNEYS: JourneyEntity[] = [
  {
    id: 'jrn-001',
    journeyReference: 'JN-SS-2026-9041',
    guestId: 'gst-8801',
    guestName: 'Vikramaditya Singhania',
    guestEmail: 'vikram.singhania@corp.in',
    guestPhone: '+91 98200 11223',
    vipTier: 'SOVEREIGN_PLATINUM',
    status: 'IN_TRANSIT_PICKUP',
    currentStage: 'AIRPORT_PICKUP_TRANSIT',
    binding: {
      stayBookingId: 'BK-STAY-8492',
      bookingReference: 'STAY-AZURA-402',
      propertyName: 'Azura Cliff Luxury Estates, Goa',
      roomType: 'Presidential Ocean Panoramic Suite 402',
      checkInDate: '2026-09-08',
      checkOutDate: '2026-09-11',
      nights: 3,
      stayAmount: 84000,
      transitBookingId: 'BK-MOVE-3912',
      transitReference: 'TRANS-MAYBACH-01',
      pickupLocation: 'Goa Dabolim Airport (GOI) Terminal 1',
      dropLocation: 'Azura Cliff Villa, Sinquerim',
      transitVehicle: 'Mercedes-Maybach S-Class (GA-07-EA-9901)',
      transitAmount: 9000,
      totalJourneyAmount: 127680,
      escrowLockedAmount: 127680,
      escrowReleaseScheduledAt: '2026-09-12T12:00:00Z',
    },
    timeline: [
      {
        id: 'ev-1',
        stage: 'PRE_ARRIVAL_FLIGHT',
        title: 'Flight Tracking & Gate Allocation',
        subtitle: 'Flight 6E-241 landing Goa (GOI) on-time @ 14:15. Gate 4 assigned.',
        timestamp: '14:15',
        status: 'COMPLETED',
        telemetryData: {
          flightNumber: '6E-241',
          flightStatus: 'LANDED',
          gate: 'Gate 4',
        },
      },
      {
        id: 'ev-2',
        stage: 'AIRPORT_PICKUP_TRANSIT',
        title: 'Chauffeur Executive Pickup & Transit',
        subtitle: 'Chauffeur Devendra Singh in Maybach S-Class en route to Villa.',
        timestamp: '14:30',
        status: 'IN_PROGRESS',
        telemetryData: {
          driverName: 'Devendra Singh',
          driverPhone: '+91 98200 44321',
          vehicleModel: 'Mercedes-Maybach S-Class',
          licensePlate: 'GA-07-EA-9901',
          etaMinutes: 18,
          currentCoords: { lat: 15.4989, lng: 73.8278 },
        },
      },
      {
        id: 'ev-3',
        stage: 'SUITE_CHECK_IN',
        title: 'Suite Keycard Dispense & Welcome',
        subtitle: 'Ocean Suite 402 prepared. Smart keycode armed.',
        timestamp: '15:00',
        status: 'UPCOMING',
        telemetryData: {
          roomNumber: 'Suite 402',
          keycardStatus: 'ARMED',
        },
      },
      {
        id: 'ev-4',
        stage: 'IN_STAY_EXPERIENCE',
        title: 'Curated Sightseeing Excursions',
        subtitle: 'Private Sunset Speedboat Cruise scheduled for 16:30.',
        timestamp: '16:30',
        status: 'UPCOMING',
      },
      {
        id: 'ev-5',
        stage: 'ESCROW_SETTLEMENT',
        title: 'Airport Drop & Escrow Settlement',
        subtitle: 'Scheduled departure to GOI airport & partner dual-disbursement.',
        timestamp: 'Sep 11',
        status: 'UPCOMING',
        telemetryData: {
          escrowStatus: 'LOCKED',
        },
      },
    ],
    openTickets: [],
    createdAt: '2026-09-08T08:00:00Z',
    updatedAt: '2026-09-08T08:45:00Z',
  },
  {
    id: 'jrn-002',
    journeyReference: 'JN-SS-2026-7720',
    guestId: 'gst-4421',
    guestName: 'Ananya Deshmukh',
    guestEmail: 'ananya.deshmukh@venturecap.com',
    guestPhone: '+91 99300 77889',
    vipTier: 'SOVEREIGN_PLATINUM',
    status: 'IN_STAY',
    currentStage: 'SUITE_CHECK_IN',
    binding: {
      stayBookingId: 'BK-STAY-6631',
      bookingReference: 'STAY-MEWAR-101',
      propertyName: 'Royal Lake Palace, Udaipur',
      roomType: 'Maharaja Heritage Lake Suite 101',
      checkInDate: '2026-09-08',
      checkOutDate: '2026-09-10',
      nights: 2,
      stayAmount: 140000,
      transitBookingId: 'BK-MOVE-1184',
      transitReference: 'TRANS-DEFENDER-02',
      pickupLocation: 'Maharana Pratap Airport (UDR)',
      dropLocation: 'Royal Lake Palace, Pichola',
      transitVehicle: 'Land Rover Defender 110 (RJ-27-UB-4402)',
      transitAmount: 12000,
      totalJourneyAmount: 184500,
      escrowLockedAmount: 184500,
      escrowReleaseScheduledAt: '2026-09-11T12:00:00Z',
    },
    timeline: [
      {
        id: 'ev-21',
        stage: 'PRE_ARRIVAL_FLIGHT',
        title: 'Flight Tracking & Gate Allocation',
        subtitle: 'Flight AI-631 landed Udaipur (UDR) on-time @ 11:30.',
        timestamp: '11:30',
        status: 'COMPLETED',
      },
      {
        id: 'ev-22',
        stage: 'AIRPORT_PICKUP_TRANSIT',
        title: 'Chauffeur Executive Pickup',
        subtitle: 'Completed transfer via Land Rover Defender 110.',
        timestamp: '12:15',
        status: 'COMPLETED',
      },
      {
        id: 'ev-23',
        stage: 'SUITE_CHECK_IN',
        title: 'Suite Keycard Dispense & Welcome',
        subtitle: 'Checked in. Digital NFC Pass armed and verified.',
        timestamp: '12:30',
        status: 'IN_PROGRESS',
        telemetryData: {
          roomNumber: 'Suite 101',
          keycardStatus: 'ARMED',
        },
      },
    ],
    openTickets: [],
    createdAt: '2026-09-08T06:00:00Z',
    updatedAt: '2026-09-08T07:15:00Z',
  },
  {
    id: 'jrn-003',
    journeyReference: 'JN-SS-2026-5541',
    guestId: 'gst-9012',
    guestName: 'Rohan & Tara Mehta',
    guestEmail: 'rohan.mehta@techscale.io',
    guestPhone: '+91 97110 55442',
    vipTier: 'GOLD_EXECUTIVE',
    status: 'IN_TRANSIT_PICKUP',
    currentStage: 'AIRPORT_PICKUP_TRANSIT',
    binding: {
      stayBookingId: 'BK-STAY-9012',
      bookingReference: 'STAY-SOLANG-301',
      propertyName: 'Solang Valley Pine Chalet, Manali',
      roomType: 'Cedar Wooden Loft Suite 301',
      checkInDate: '2026-09-08',
      checkOutDate: '2026-09-12',
      nights: 4,
      stayAmount: 76000,
      transitBookingId: 'BK-MOVE-8821',
      transitReference: 'TRANS-PRADO-04',
      pickupLocation: 'Bhuntar Airport (KUU)',
      dropLocation: 'Solang Valley Pine Chalet, Manali',
      transitVehicle: 'Toyota Land Cruiser Prado (HP-01-EA-5512)',
      transitAmount: 14000,
      totalJourneyAmount: 112000,
      escrowLockedAmount: 112000,
      escrowReleaseScheduledAt: '2026-09-13T12:00:00Z',
    },
    timeline: [
      {
        id: 'ev-31',
        stage: 'PRE_ARRIVAL_FLIGHT',
        title: 'Flight Tracking & Gate Allocation',
        subtitle: 'Flight UK-822 landed Bhuntar (KUU) with 20 mins delay.',
        timestamp: '07:20',
        status: 'COMPLETED',
      },
      {
        id: 'ev-32',
        stage: 'AIRPORT_PICKUP_TRANSIT',
        title: 'Chauffeur Executive Pickup & Transit',
        subtitle: 'Chauffeur delayed by Bhuntar valley landslide detour. ETA 52 mins.',
        timestamp: '07:45',
        status: 'ALERT',
        telemetryData: {
          driverName: 'Tenzing Norbu',
          driverPhone: '+91 98160 33211',
          vehicleModel: 'Toyota Land Cruiser Prado',
          licensePlate: 'HP-01-EA-5512',
          etaMinutes: 52,
        },
      },
    ],
    openTickets: [
      {
        id: 'TICK-SLA-902',
        ticketNumber: 'TICK-SLA-902',
        category: 'TRANSIT_DELAY',
        severity: 'P1_HIGH',
        status: 'IN_TRIAGE',
        subject: 'Chauffeur delayed by Bhuntar valley landslide detour',
        slaTargetMinutes: 15,
        elapsedMinutes: 6,
        assignedAgent: 'Siddharth Rao (Lead Transit RM)',
        slaBreachDeadline: '2026-09-08T08:00:00Z',
        isBreached: false,
      },
    ],
    createdAt: '2026-09-08T07:00:00Z',
    updatedAt: '2026-09-08T07:35:00Z',
  },
];

export const JourneyCentricDashboard: React.FC<JourneyCentricDashboardProps> = ({
  onSelectJourney,
  onOpenResolveDesk,
}) => {
  const [journeys, setJourneys] = useState<JourneyEntity[]>(MOCK_JOURNEYS);
  const [filterStage, setFilterStage] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDrilldown, setSelectedDrilldown] = useState<JourneyEntity | null>(null);
  const [cascadeModalJourney, setCascadeModalJourney] = useState<JourneyEntity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAdvanceStage = (journeyId: string) => {
    const stageFlow = [
      { status: 'ACTIVE_PRE_ARRIVAL', stage: 'PRE_ARRIVAL_FLIGHT', title: 'Pre-Arrival & Flight Tracking' },
      { status: 'IN_TRANSIT_PICKUP', stage: 'AIRPORT_PICKUP_TRANSIT', title: 'Airport Chauffeur Transit' },
      { status: 'CHECKED_IN', stage: 'SUITE_CHECK_IN', title: 'Suite Check-In & Handshake' },
      { status: 'IN_STAY', stage: 'IN_STAY_EXPERIENCE', title: 'In-Stay Services & Sightseeing' },
      { status: 'IN_TRANSIT_DROP', stage: 'DEPARTURE_DROP', title: 'Departure Chauffeur Transit' },
      { status: 'COMPLETED', stage: 'ESCROW_SETTLEMENT', title: 'Escrow Settlement & 360 Feedback' },
    ];

    setJourneys((prev) =>
      prev.map((j) => {
        if (j.id !== journeyId) return j;
        const currentIdx = stageFlow.findIndex((s) => s.status === j.status);
        const nextIdx = currentIdx < stageFlow.length - 1 ? currentIdx + 1 : currentIdx;
        const next = stageFlow[nextIdx];

        return {
          ...j,
          status: next.status as any,
          currentStage: next.stage as any,
          timeline: j.timeline.map((t, tIdx) => {
            if (tIdx < nextIdx) return { ...t, status: 'COMPLETED' as const };
            if (tIdx === nextIdx) return { ...t, status: 'IN_PROGRESS' as const };
            return { ...t, status: 'UPCOMING' as const };
          }),
        };
      })
    );

    showToast(`Journey ${journeyId} advanced to next lifecycle stage.`);
  };

  const handleCreateAtomicJourney = () => {
    const newJrn: JourneyEntity = {
      id: `jrn-${Date.now().toString().slice(-4)}`,
      journeyReference: `JN-SS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      guestId: 'gst-9912',
      guestName: 'Devika & Aditya Singhania',
      guestEmail: 'aditya.singhania@centurion.in',
      guestPhone: '+91 98330 22114',
      vipTier: 'SOVEREIGN_PLATINUM',
      status: 'ACTIVE_PRE_ARRIVAL',
      currentStage: 'PRE_ARRIVAL_FLIGHT',
      binding: {
        stayBookingId: 'BK-STAY-9901',
        bookingReference: 'STAY-PICHOLA-ROYAL',
        propertyName: 'Maharaja Pichola Heritage Palace, Udaipur',
        roomType: 'Maharani Lakeview Royal Pavilion',
        checkInDate: '2026-09-10',
        checkOutDate: '2026-09-14',
        nights: 4,
        stayAmount: 240000,
        transitBookingId: 'BK-MOVE-4410',
        transitReference: 'TRANS-SOLAR-BOAT-01',
        pickupLocation: 'Udaipur Maharana Pratap Airport (UDR)',
        dropLocation: 'Pichola Palace Lake Jetty',
        transitVehicle: 'BMW i7 Electric Sedan & Solar Royal Boat',
        transitAmount: 18500,
        totalJourneyAmount: 285000,
        escrowLockedAmount: 285000,
        escrowReleaseScheduledAt: '2026-09-15T10:00:00Z',
      },
      timeline: [
        {
          id: 'ev-1',
          stage: 'PRE_ARRIVAL_FLIGHT',
          title: 'Aviation Radar Synchronization',
          subtitle: 'Flight 6E-651 (BOM → UDR) telemetry linked. Chauffeur staged.',
          timestamp: '15:10',
          status: 'IN_PROGRESS',
        },
        {
          id: 'ev-2',
          stage: 'AIRPORT_PICKUP_TRANSIT',
          title: 'Executive Chauffeur Transit',
          subtitle: 'VIP BMW i7 transfer to Lake Jetty.',
          timestamp: '15:40',
          status: 'UPCOMING',
        },
        {
          id: 'ev-3',
          stage: 'SUITE_CHECK_IN',
          title: 'Palace Solar Boat Arrival & Check-In',
          subtitle: 'Regal water arrival and royal suite check-in.',
          timestamp: '16:15',
          status: 'UPCOMING',
        },
        {
          id: 'ev-4',
          stage: 'IN_STAY_EXPERIENCE',
          title: 'Bespoke Lake Excursion',
          subtitle: 'Private Heritage Sunset Cruise booked.',
          timestamp: 'Sep 11',
          status: 'UPCOMING',
        },
        {
          id: 'ev-5',
          stage: 'ESCROW_SETTLEMENT',
          title: 'Departure Drop & Final Settlement',
          subtitle: 'Return airport transit & dual-party escrow release.',
          timestamp: 'Sep 14',
          status: 'UPCOMING',
        },
      ],
      openTickets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setJourneys([newJrn, ...journeys]);
    showToast(`Atomic 3-in-1 Journey created! Room + Flight Transfer + Solar Boat locked in escrow.`);
  };

  const handleCascadeCancel = (journeyId: string, cascadeAll: boolean) => {
    setJourneys((prev) =>
      prev.map((j) => {
        if (j.id !== journeyId) return j;
        return {
          ...j,
          status: 'CANCELLED' as any,
          binding: {
            ...j.binding,
            escrowLockedAmount: 0,
          },
          timeline: j.timeline.map((t) => ({ ...t, status: 'ALERT' as const })),
        };
      })
    );

    setCascadeModalJourney(null);
    if (cascadeAll) {
      showToast(`Journey ${journeyId} & all linked components (Stay + Chauffeur + Tour) cancelled atomically with 100% refund from Escrow.`);
    } else {
      showToast(`Stay cancelled for ${journeyId}. Airport Chauffeur transfer retained for alternate accommodation.`);
    }
  };

  const handleSovereignReDispatch = (journeyId: string) => {
    setJourneys((prev) =>
      prev.map((j) => {
        if (j.id !== journeyId) return j;
        return {
          ...j,
          binding: {
            ...j.binding,
            transitVehicle: 'Standby Sovereign Fleet (Maybach S680 Replacement)',
          },
        };
      })
    );
    showToast(`Sovereign standby backup vehicle auto-dispatched for ${journeyId} (<8 mins dispatch guarantee, zero guest fee).`);
  };

  const filteredJourneys = journeys.filter((jrn) => {
    if (filterStage !== 'ALL') {
      if (filterStage === 'SLA_ALERT' && jrn.openTickets.length === 0) return false;
      if (filterStage === 'IN_TRANSIT' && jrn.status !== 'IN_TRANSIT_PICKUP') return false;
      if (filterStage === 'AT_PROPERTY' && jrn.status !== 'IN_STAY') return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        jrn.journeyReference.toLowerCase().includes(q) ||
        jrn.guestName.toLowerCase().includes(q) ||
        jrn.binding.propertyName.toLowerCase().includes(q) ||
        (jrn.binding.transitVehicle && jrn.binding.transitVehicle.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002B4D] border border-[#3CCF91] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#3CCF91]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#001830] via-[#002B4D] to-[#0A4D68] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#00A9A5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A5]/20 border border-[#00A9A5]/40 text-[#00A9A5] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              Central Sovereign Journey Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Journey Orchestration & Live Radar Control
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Real-time synchronization of Stay Bookings, Luxury Chauffeurs, Curated Excursions, and Dual-Party Escrow Ledger under unified Journey entities.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCreateAtomicJourney}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-black font-black text-xs shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer transition"
              >
                <Plus className="w-4 h-4" />
                <span>+ Atomic 3-in-1 Journey Booking</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar with Successful Journey Rate */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block whitespace-nowrap">Active Journeys</span>
              <strong className="text-xl font-black text-white whitespace-nowrap">{journeys.length} Live</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#00A9A5]/10 border border-[#00A9A5]/30">
              <span className="text-[10px] text-[#00A9A5] font-bold uppercase tracking-wider block whitespace-nowrap">Move / Telematics</span>
              <strong className="text-xl font-black text-[#00A9A5] whitespace-nowrap">4 GPS Live</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#3CCF91]/10 border border-[#3CCF91]/30">
              <span className="text-[10px] text-[#3CCF91] font-bold uppercase tracking-wider block whitespace-nowrap">Journey SJR Rate</span>
              <strong className="text-xl font-black text-[#3CCF91] whitespace-nowrap">98.6% SJR</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#FFC857]/10 border border-[#FFC857]/30">
              <span className="text-[10px] text-[#FFC857] font-bold uppercase tracking-wider block whitespace-nowrap">Resolve SLA Engine</span>
              <strong className="text-xl font-black text-[#FFC857] whitespace-nowrap">4.8m Avg</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#001E36] border border-white/10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-2 whitespace-nowrap shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" /> Filter by Stage:
          </span>
          {[
            { id: 'ALL', label: 'All Active' },
            { id: 'IN_TRANSIT', label: '🚗 In Transit' },
            { id: 'AT_PROPERTY', label: '🏨 At Property' },
            { id: 'SLA_ALERT', label: '⚠️ SLA Alerts (P1/P0)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterStage(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                filterStage === f.id
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Journey ref, guest, villa, chauffeur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9A5]"
          />
        </div>
      </div>

      {/* Journey Master Cards Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredJourneys.map((journey) => {
          const hasSlaAlert = journey.openTickets.length > 0;
          return (
            <div
              key={journey.id}
              className={`p-6 rounded-2xl border transition-all ${
                hasSlaAlert
                  ? 'bg-[#2A0E14]/70 border-rose-500/40 hover:border-rose-400 shadow-xl shadow-rose-950/20'
                  : 'bg-[#001D33] border-white/10 hover:border-[#00A9A5]/50 shadow-lg'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-white/10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] flex items-center justify-center text-white font-black shadow-md shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-black text-white whitespace-nowrap">{journey.journeyReference}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/10 text-slate-200 border border-white/15 whitespace-nowrap shrink-0">
                        {journey.vipTier}
                      </span>
                      {hasSlaAlert ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1 animate-pulse whitespace-nowrap shrink-0">
                          <AlertTriangle className="w-3 h-3 shrink-0" /> SLA Escalation Active ({journey.openTickets[0]?.severity})
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#3CCF91]/20 text-[#3CCF91] border border-[#3CCF91]/40 flex items-center gap-1 whitespace-nowrap shrink-0">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> Nominal Sovereign Flow
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Guest: <strong className="text-white">{journey.guestName}</strong> • Phone: <span className="font-mono">{journey.guestPhone}</span>
                    </p>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <button
                    onClick={() => handleAdvanceStage(journey.id)}
                    className="px-3 py-2 rounded-xl bg-[#3CCF91]/20 hover:bg-[#3CCF91]/30 text-[#3CCF91] border border-[#3CCF91]/40 text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                    title="Advance to next lifecycle stage"
                  >
                    <span>Advance Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setCascadeModalJourney(journey)}
                    className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                    title="Test cascading cancellation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Cascade Cancel</span>
                  </button>

                  <button
                    onClick={() => handleSovereignReDispatch(journey.id)}
                    className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                    title="Dispatch emergency standby fleet"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Sovereign Standby</span>
                  </button>

                  {hasSlaAlert && (
                    <button
                      onClick={() => onOpenResolveDesk?.(journey.openTickets[0]?.id)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/40 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Resolve Sentinel ({journey.openTickets[0]?.elapsedMinutes}m)</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedDrilldown(journey);
                      onSelectJourney?.(journey);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#002B4D] hover:bg-[#003B6D] text-white border border-[#00A9A5]/40 text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#00A9A5] shrink-0" />
                    <span>Drilldown</span>
                  </button>
                </div>
              </div>

              {/* Coupled Stay + Move + Excursions Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
                {/* Stay Binding */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-blue-400 whitespace-nowrap shrink-0">
                      <Hotel className="w-4 h-4 shrink-0" /> Luxury Stay Binding
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap shrink-0">{journey.binding.stayBookingId}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{journey.binding.propertyName}</h4>
                  <p className="text-xs text-slate-300 leading-snug">{journey.binding.roomType}</p>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
                    <span className="whitespace-nowrap">Stay Subtotal: <strong className="text-[#3CCF91] font-mono whitespace-nowrap">₹{journey.binding.stayAmount.toLocaleString()}</strong></span>
                    <span className="whitespace-nowrap shrink-0">{journey.binding.nights} Nights</span>
                  </div>
                </div>

                {/* Move & Chauffeur Binding */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-amber-400 whitespace-nowrap shrink-0">
                      <Car className="w-4 h-4 shrink-0" /> Move & Chauffeur
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap shrink-0">{journey.binding.transitReference || 'IN_TRANSIT'}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{journey.binding.transitVehicle || 'Executive Luxury Chauffeur'}</h4>
                  <p className="text-xs text-slate-300 leading-snug">Route: {journey.binding.pickupLocation} → {journey.binding.dropLocation}</p>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1 text-[#3CCF91] whitespace-nowrap">
                      <Radio className="w-3 h-3 animate-ping shrink-0" /> Transit Cost: ₹{journey.binding.transitAmount?.toLocaleString() || '0'}
                    </span>
                    <span className="font-bold text-white whitespace-nowrap shrink-0">Status: {journey.status}</span>
                  </div>
                </div>

                {/* Escrow Custody & Settlement */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-[#3CCF91] whitespace-nowrap shrink-0">
                      <ShieldCheck className="w-4 h-4 shrink-0" /> Safe Escrow Ledger
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3CCF91]/20 text-[#3CCF91] whitespace-nowrap shrink-0">
                      ESCROW_PROTECTED
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-slate-300 whitespace-nowrap">Locked Value:</span>
                    <strong className="text-lg font-black text-white whitespace-nowrap">₹{journey.binding.escrowLockedAmount.toLocaleString()}</strong>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Dual release: Hotel (₹{journey.binding.stayAmount.toLocaleString()}) + Fleet (₹{(journey.binding.transitAmount || 0).toLocaleString()})
                  </p>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5 truncate">
                    Release ETA: <span className="text-[#FFC857]">{journey.binding.escrowReleaseScheduledAt}</span>
                  </div>
                </div>
              </div>

              {/* Progress Stage Bar */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {journey.timeline.map((stg, sIdx) => {
                    const isDone = stg.status === 'COMPLETED';
                    const isCurrent = stg.status === 'IN_PROGRESS' || stg.status === 'ALERT';
                    return (
                      <div key={stg.id || sIdx} className="space-y-1">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            isDone ? 'bg-[#3CCF91]' : isCurrent ? 'bg-[#00A9A5] animate-pulse' : 'bg-white/10'
                          }`}
                        />
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                            {sIdx + 1}. {stg.title.split(' ')[0]}
                          </span>
                          {isDone && <CheckCircle2 className="w-3 h-3 text-[#3CCF91]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 360° Guest Journey Drill-Down Modal */}
      {selectedDrilldown && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#001D33] border border-white/20 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setSelectedDrilldown(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#00A9A5]/20 text-[#00A9A5] border border-[#00A9A5]/40 font-mono">
                  {selectedDrilldown.journeyReference}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-white/10 text-white border border-white/20">
                  {selectedDrilldown.vipTier}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">
                360° Sovereign Journey Matrix — {selectedDrilldown.guestName}
              </h2>
              <p className="text-xs text-slate-300">
                Direct Operational Telemetry, Escrow Release Controls & Multi-Partner Relationship Management.
              </p>
            </div>

            {/* 5-Stage Synchronized Timeline Detailed View */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#00A9A5]" />
                Synchronized Execution Stream
              </h3>
              <div className="space-y-3">
                {selectedDrilldown.timeline.map((stg, idx) => (
                  <div
                    key={stg.id || idx}
                    className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${
                      stg.status === 'COMPLETED'
                        ? 'bg-[#3CCF91]/5 border-[#3CCF91]/20'
                        : stg.status === 'IN_PROGRESS' || stg.status === 'ALERT'
                        ? 'bg-[#00A9A5]/10 border-[#00A9A5]/40 shadow-md'
                        : 'bg-black/20 border-white/5 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                        stg.status === 'COMPLETED'
                          ? 'bg-[#3CCF91] text-black'
                          : stg.status === 'IN_PROGRESS' || stg.status === 'ALERT'
                          ? 'bg-[#00A9A5] text-white animate-pulse'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{stg.title}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            stg.status === 'COMPLETED'
                              ? 'bg-[#3CCF91]/20 text-[#3CCF91]'
                              : stg.status === 'IN_PROGRESS' || stg.status === 'ALERT'
                              ? 'bg-[#00A9A5]/20 text-[#00A9A5]'
                              : 'bg-white/10 text-slate-400'
                          }`}
                        >
                          {stg.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{stg.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Telemetry & Dispatch Override Console */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-[#00A9A5]" /> Live Chauffeur Telemetry & Driver Overrides
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <strong className="text-white">{selectedDrilldown.binding.transitVehicle || 'Executive Fleet'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pickup:</span>
                    <strong className="text-white">{selectedDrilldown.binding.pickupLocation}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Drop:</span>
                    <strong className="text-white">{selectedDrilldown.binding.dropLocation}</strong>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => showToast(`Direct dial initiated to Fleet Dispatch for ${selectedDrilldown.binding.transitReference}`)}
                    className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#3CCF91]" /> Call Fleet Lead
                  </button>
                  <button
                    onClick={() => showToast('Backup Executive Chauffeur notified & standing by')}
                    className="flex-1 py-2 rounded-xl bg-[#00A9A5]/20 hover:bg-[#00A9A5]/30 text-[#00A9A5] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#00A9A5]/40"
                  >
                    <Zap className="w-3.5 h-3.5" /> Dispatch Backup
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Hotel className="w-4 h-4 text-[#FFC857]" /> Property & Digital Key Control
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resort Estate:</span>
                    <strong className="text-white">{selectedDrilldown.binding.propertyName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Room Suite:</span>
                    <strong className="text-[#3CCF91] font-mono font-black">{selectedDrilldown.binding.roomType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Check-in Window:</span>
                    <strong className="text-white">{selectedDrilldown.binding.checkInDate} – {selectedDrilldown.binding.checkOutDate}</strong>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => showToast('Digital NFC Pass re-broadcasted to guest device')}
                    className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-[#FFC857]" /> Re-issue NFC Pass
                  </button>
                  <button
                    onClick={() => showToast('Instant ₹5,000 Goodwill Escrow Adjustment credited')}
                    className="flex-1 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-500/40"
                  >
                    <DollarSign className="w-3.5 h-3.5" /> Goodwill Credit
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDrilldown(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs"
              >
                Close Drilldown
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cascading Cancellation Policy Dialog (Gap 5) */}
      {cascadeModalJourney && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001830] border border-rose-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-up">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Cascading Cancellation Engine
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  Cancel Stay Reservation for {cascadeModalJourney.guestName}?
                </h3>
              </div>
              <button
                onClick={() => setCascadeModalJourney(null)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This Journey contains coupled multi-party bookings held in Escrow (
              <strong className="text-white">₹{cascadeModalJourney.binding.totalJourneyAmount.toLocaleString('en-IN')}</strong>).
              Choose how you want to handle linked components per StaySphere policy:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleCascadeCancel(cascadeModalJourney.id, true)}
                className="w-full p-4 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-left transition cursor-pointer space-y-1 group"
              >
                <div className="text-xs font-black text-rose-300 group-hover:text-rose-200 flex items-center justify-between">
                  <span>Option A: Cancel Entire Coupled Journey (Recommended)</span>
                  <RotateCcw className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-slate-300">
                  Cancels Hotel + Airport Chauffeur ({cascadeModalJourney.binding.transitVehicle}) + Excursion. 100% of escrow funds released back to customer card with zero partner penalty.
                </p>
              </button>

              <button
                onClick={() => handleCascadeCancel(cascadeModalJourney.id, false)}
                className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition cursor-pointer space-y-1 group"
              >
                <div className="text-xs font-black text-white group-hover:text-cyan-300 flex items-center justify-between">
                  <span>Option B: Cancel Stay Only (Retain Chauffeur Transfer)</span>
                  <Car className="w-4 h-4 text-[#FF8A3D]" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Cancels Room reservation only. Keeps the airport transfer active so guest can still be chauffeured to alternate accommodation.
                </p>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCascadeModalJourney(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
