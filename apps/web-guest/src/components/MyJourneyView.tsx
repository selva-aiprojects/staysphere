'use client';

import { useState } from 'react';
import {
  Plane,
  Car,
  Hotel,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Navigation,
  Compass,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Lock,
  Crown,
  User,
} from 'lucide-react';
import { CustomerUser } from './CustomerAuthModal';

interface MyJourneyViewProps {
  onOpenResolve: (defaultCategory?: string) => void;
  theme?: 'dark' | 'pearl';
  currentUser?: CustomerUser | null;
}

export function MyJourneyView({ onOpenResolve, theme = 'pearl', currentUser }: MyJourneyViewProps) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(1); // Step 2: In-Transit Chauffeur Pickup
  const [guestRating, setGuestRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Seamless Transit', 'Spotless Suite']);
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  const isPearl = theme === 'pearl';

  const guestName = currentUser?.fullName || 'Dr. Selva Murugan';
  const loyaltyTier = currentUser?.loyaltyTier || 'Platinum Sovereign';
  const membershipId = currentUser?.membershipId || 'SS-SOV-8802';

  const TIMELINE_STAGES = [
    {
      id: 'stage-1',
      stageNumber: 1,
      title: 'Flight Telemetry & Pre-Arrival Sync',
      subtitle: 'Flight 6E-204 from Delhi (DEL) → Goa MOPA (GOX)',
      time: '13:45 PM',
      status: 'COMPLETED' as const,
      badge: 'FLIGHT LANDED (ON-TIME)',
      badgeColor: isPearl
        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      icon: Plane,
      details: {
        flightNumber: '6E-204',
        departureCity: 'Indira Gandhi Intl (DEL T3)',
        arrivalCity: 'Manohar Intl Airport (GOX T1)',
        gate: 'Terminal 1 Gate 04',
        baggageBelt: 'Carousel 03 (Luggage tagged for VIP Chauffeur transfer)',
      },
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      title: 'Airport Chauffeur Transit Leg',
      subtitle: 'Executive Pickup to The Grand Vagator Bay Resort',
      time: '14:02 PM',
      status: 'IN_PROGRESS' as const,
      badge: 'CHAUFFEUR EN ROUTE (ETA 6 MINS)',
      badgeColor: isPearl
        ? 'bg-amber-100 text-amber-800 border-amber-300'
        : 'bg-[#FFC857]/20 text-[#FFC857] border-[#FFC857]/40',
      icon: Car,
      details: {
        driverName: 'Gurpreet Singh',
        driverRating: '4.98 ★ (420 Sovereign Trips)',
        driverPhone: '+91 98111 22334',
        vehicleModel: currentUser?.preferredVehicle === 'maybach' ? 'Mercedes-Maybach S680 (GA-03-XX-0001)' : 'Comfort MPV Executive (GA-03-XX-8821)',
        liveCoords: '15.7538° N, 73.8697° E (Airport VIP Lane)',
        amenities: 'Chilled Sparkling Mineral Water, High-Speed 5G Wi-Fi, Fresh Cold Towels',
      },
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      title: 'Seamless Suite Check-In & Smart Keycard',
      subtitle: 'Horizon Oceanfront Private Pool Villa (Villa 101)',
      time: '14:30 PM (Pre-Checked In)',
      status: 'UPCOMING' as const,
      badge: 'SUITE INSPECTED (84/84 AUDIT PASSED)',
      badgeColor: isPearl
        ? 'bg-teal-100 text-teal-800 border-teal-300'
        : 'bg-[#00D2C4]/20 text-[#00D2C4] border-[#00D2C4]/40',
      icon: Hotel,
      details: {
        suiteName: 'Villa 101 — Horizon Clifftop Ocean Villa',
        property: 'The Grand Vagator Bay Resort & Oceanfront Villas',
        checkInTime: '14:00 (Pre-arrival Express Pass Active)',
        keycardStatus: 'AES-256 Armed & Ready for BLE Mobile Tap',
        butlerName: 'Chef Raghav (Executive Butler On-Standby)',
      },
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      title: 'In-Stay Mobility & Speedboat Safari',
      subtitle: 'Private Sunset Speedboat & Regional Curated Itinerary',
      time: '17:00 PM',
      status: 'UPCOMING' as const,
      badge: 'EXPERIENCE CONFIRMED',
      badgeColor: isPearl
        ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
        : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
      icon: Compass,
      details: {
        tourName: 'Private 32ft Sunset Speedboat Cruise & Beach Tour',
        pickupLocation: 'Sinquerim Jetty (Chauffeur Standby)',
        inclusions: 'Sunset Champagne & Seafood Platter, Dedicated Master Guide',
      },
    },
    {
      id: 'stage-5',
      stageNumber: 5,
      title: 'Departure Transfer & Escrow Settlement',
      subtitle: 'Return Airport Transfer to GOX & Automated Escrow Disbursement',
      time: '15 Sep, 11:00 AM',
      status: 'UPCOMING' as const,
      badge: 'ESCROW PROTECTED',
      badgeColor: isPearl
        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      icon: ShieldCheck,
      details: {
        returnFlight: 'Air India AI-678 to Delhi',
        returnChauffeur: 'Scheduled 3 hours prior to departure',
        escrowSettlement: '₹1,30,500 automatically disbursed post-stay with zero fee friction',
      },
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Sovereign Journey Master Header Card */}
      <div
        className={`p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden border ${
          isPearl
            ? 'glass-panel-luxury border-[#D4AF37]/35 text-[#001E3D]'
            : 'glass-panel-luxury border-[#E5B869]/40 text-slate-100'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,184,105,0.12),transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-slate-200 dark:border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 border ${
                  isPearl
                    ? 'bg-[#002B4D] text-white border-[#0B3D91]'
                    : 'bg-[#002B4D]/90 text-[#00D2C4] border-[#00D2C4]/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#00D2C4] animate-pulse" />
                Live Orchestrated Journey
              </span>
              <span
                className={`font-mono text-xs px-3 py-1 rounded-lg border whitespace-nowrap shrink-0 ${
                  isPearl
                    ? 'bg-slate-100 text-[#001E3D] border-slate-300 font-bold'
                    : 'bg-[#020B18]/90 text-[#F3CA7E] border-[#E5B869]/30'
                }`}
              >
                Ref: <strong>JN-SS-2026-9041</strong>
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold border whitespace-nowrap shrink-0 ${
                  isPearl
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-[#FFC857]/20 text-[#FFC857] border-[#FFC857]/30'
                }`}
              >
                {loyaltyTier}
              </span>
            </div>
            <h1
              className={`text-2xl md:text-3xl font-serif-luxury font-bold tracking-tight ${
                isPearl ? 'text-[#001E3D]' : 'text-white'
              }`}
            >
              Goa Clifftop Retreat & Coastal Transit
            </h1>
            <p className={`text-xs md:text-sm flex flex-wrap items-center gap-2 font-light ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
              <span className="whitespace-nowrap">Guest: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{guestName}</strong> ({membershipId})</span>
              <span className="text-slate-400">•</span>
              <span className="whitespace-nowrap">12 Sep – 15 Sep 2026 (3 Nights)</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#10B981] font-bold whitespace-nowrap">Payment Custody Protected (₹1,30,500)</span>
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenResolve('GENERAL_INQUIRY')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#E5B869] hover:brightness-110 text-[#001428] text-xs font-black shadow-lg shadow-[#FF8A3D]/25 transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Proactive Resolve (15-Min SLA)</span>
            </button>
          </div>
        </div>

        {/* Live Journey Telemetry Ticker */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-2xl border space-y-1 ${
              isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#020B18]/90 border-white/10'
            }`}
          >
            <span className={`text-[10px] uppercase font-bold flex items-center gap-1.5 ${isPearl ? 'text-[#0B3D91]' : 'text-[#F3CA7E]'}`}>
              <Plane className="w-3.5 h-3.5 text-[#00A9A5]" /> Flight Telemetry
            </span>
            <div className={`text-xs font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>IndiGo 6E-204 (DEL → GOX)</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Landed on-time (Gate 04)
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border space-y-1 ${
              isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#020B18]/90 border-white/10'
            }`}
          >
            <span className={`text-[10px] uppercase font-bold flex items-center gap-1.5 ${isPearl ? 'text-[#0B3D91]' : 'text-[#F3CA7E]'}`}>
              <Car className="w-3.5 h-3.5 text-[#FF8A3D]" /> Chauffeur Transit
            </span>
            <div className={`text-xs font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Gurpreet Singh (Maybach S680)</div>
            <div className="text-[11px] text-amber-600 dark:text-[#FFC857] font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 animate-spin" /> Arriving in 6 mins (Airport Curb)
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border space-y-1 ${
              isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#020B18]/90 border-white/10'
            }`}
          >
            <span className={`text-[10px] uppercase font-bold flex items-center gap-1.5 ${isPearl ? 'text-[#0B3D91]' : 'text-[#F3CA7E]'}`}>
              <Hotel className="w-3.5 h-3.5 text-[#00A9A5]" /> Suite Readiness
            </span>
            <div className={`text-xs font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Villa 101 • Private Pool Villa</div>
            <div className="text-[11px] text-teal-600 dark:text-[#00D2C4] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ready & Pre-Inspected (21°C)
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border space-y-1 ${
              isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#020B18]/90 border-white/10'
            }`}
          >
            <span className={`text-[10px] uppercase font-bold flex items-center gap-1.5 ${isPearl ? 'text-[#0B3D91]' : 'text-[#F3CA7E]'}`}>
              <Lock className="w-3.5 h-3.5 text-[#10B981]" /> Escrow Protection
            </span>
            <div className={`text-xs font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>₹1,30,500 Sovereign Vault</div>
            <div className={`text-[11px] ${isPearl ? 'text-slate-500' : 'text-slate-300'}`}>
              Disburses 2 hrs post check-in
            </div>
          </div>
        </div>
      </div>

      {/* Main Journey Grid: Interactive Multi-Stage Timeline + Coupled Binding */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Connected Multi-Stage Journey Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div
            className={`rounded-3xl p-6 md:p-8 shadow-xl space-y-6 border ${
              isPearl ? 'glass-panel border-slate-200' : 'glass-panel border-white/10'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-white/10">
              <div>
                <h2 className={`text-lg font-bold flex items-center gap-2 ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                  <Navigation className="w-5 h-5 text-[#00A9A5]" />
                  <span>Synchronized Journey Timeline</span>
                </h2>
                <p className={`text-xs mt-0.5 ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
                  Real-time telemetry tracking every stage of your journey from flight touchdown to departure.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-[#3CCF91] px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                Stage 2 of 5 Active
              </span>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
              {TIMELINE_STAGES.map((stage, idx) => {
                const isSelected = activeStageIndex === idx;
                const IconComponent = stage.icon;
                const isDone = stage.status === 'COMPLETED';
                const isCurrent = stage.status === 'IN_PROGRESS';

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`relative pl-12 transition-all cursor-pointer group ${
                      isSelected ? 'opacity-100 scale-[1.01]' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    {/* Step Marker Dot */}
                    <div
                      className={`absolute left-2.5 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shadow-lg transition-all ${
                        isDone
                          ? 'bg-[#3CCF91] text-[#001428] ring-4 ring-[#3CCF91]/20'
                          : isCurrent
                          ? 'bg-[#FFC857] text-[#001428] ring-4 ring-[#FFC857]/30 animate-pulse'
                          : isPearl
                          ? 'bg-slate-200 border border-slate-300 text-slate-600'
                          : 'bg-[#001428] border border-white/30 text-slate-400'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : stage.stageNumber}
                    </div>

                    {/* Step Card Container */}
                    <div
                      className={`p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? isPearl
                            ? 'bg-blue-50/80 border-[#0B3D91] shadow-md'
                            : 'bg-[#002444] border-[#00A9A5] shadow-lg'
                          : isPearl
                          ? 'bg-white border-slate-200 hover:border-slate-300'
                          : 'bg-[#001428] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-[#00A9A5] shrink-0" />
                          <h3 className={`text-sm font-bold ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>{stage.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${stage.badgeColor}`}>
                            {stage.badge}
                          </span>
                          <span className={`text-xs font-mono whitespace-nowrap ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>{stage.time}</span>
                        </div>
                      </div>

                      <p className={`text-xs mt-1 ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>{stage.subtitle}</p>

                      {/* Detailed Expanded Info for Selected Step */}
                      {isSelected && (
                        <div
                          className={`mt-4 pt-4 border-t space-y-2.5 text-xs p-4 rounded-xl ${
                            isPearl
                              ? 'bg-white border-blue-100 text-slate-700 shadow-sm'
                              : 'bg-black/30 border-white/10 text-slate-300'
                          }`}
                        >
                          {stage.details.flightNumber && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>Flight: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.flightNumber}</strong></div>
                              <div>Gate: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.gate}</strong></div>
                              <div className={`sm:col-span-2 ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>{stage.details.baggageBelt}</div>
                            </div>
                          )}

                          {stage.details.driverName && (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Chauffeur: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.driverName}</strong> ({stage.details.driverRating})</span>
                                <a href={`tel:${stage.details.driverPhone}`} className="text-[#00A9A5] font-bold flex items-center gap-1 hover:underline">
                                  <PhoneCall className="w-3 h-3" /> Call Driver
                                </a>
                              </div>
                              <div>Vehicle: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.vehicleModel}</strong></div>
                              <div>Telemetry: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{stage.details.liveCoords}</strong></div>
                              <div className={isPearl ? 'text-slate-500' : 'text-slate-400'}>In-Car Inclusions: {stage.details.amenities}</div>
                            </div>
                          )}

                          {stage.details.suiteName && (
                            <div className="space-y-2">
                              <div>Assigned Suite: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.suiteName}</strong></div>
                              <div>Property: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.property}</strong></div>
                              <div className="flex items-center gap-2 pt-1">
                                <span className="px-2 py-0.5 rounded bg-[#3CCF91]/20 text-emerald-700 dark:text-[#3CCF91] font-bold text-[10px]">
                                  {stage.details.keycardStatus}
                                </span>
                                <span className={isPearl ? 'text-slate-500' : 'text-slate-400'}>• Butler: {stage.details.butlerName}</span>
                              </div>
                            </div>
                          )}

                          {stage.details.tourName && (
                            <div className="space-y-1">
                              <div>Tour Package: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.tourName}</strong></div>
                              <div className={isPearl ? 'text-slate-500' : 'text-slate-400'}>Inclusions: {stage.details.inclusions}</div>
                            </div>
                          )}

                          {stage.details.returnFlight && (
                            <div className="space-y-1">
                              <div>Return Flight: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>{stage.details.returnFlight}</strong></div>
                              <div className="text-emerald-600 dark:text-emerald-400 font-bold">{stage.details.escrowSettlement}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Coupled Binding Card & Digital BLE Keycard */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coupled Booking & Transport Binding Card */}
          <div
            className={`border rounded-3xl p-6 shadow-xl space-y-5 ${
              isPearl
                ? 'bg-white border-teal-200/80 text-[#001E3D]'
                : 'bg-[#001E36] border-[#00A9A5]/40 text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-white/10">
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                <ShieldCheck className="w-4 h-4 text-[#00A9A5] shrink-0" />
                <span>Coupled Journey Contract</span>
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#00A9A5]/15 text-[#00A9A5] border border-[#00A9A5]/30 whitespace-nowrap shrink-0">
                1 SINGLE ITINERARY
              </span>
            </div>

            <p className={`text-xs leading-relaxed ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
              Your stay and airport transit are operationally linked under one synchronized contract. If your flight is delayed, your chauffeur and villa check-in automatically adjust with zero penalty.
            </p>

            <div className="divide-y divide-slate-200 dark:divide-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden text-xs">
              <div className={`p-3.5 flex justify-between items-center gap-3 ${isPearl ? 'bg-slate-50' : 'bg-[#001428]'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <Hotel className="w-4 h-4 text-[#00A9A5] shrink-0" />
                  <div className="min-w-0">
                    <strong className={`block ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Stay Reservation</strong>
                    <span className={`text-[11px] block truncate ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>The Grand Vagator Bay (Villa 101)</span>
                  </div>
                </div>
                <span className={`font-mono font-bold shrink-0 whitespace-nowrap ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>BK-STAY-4012</span>
              </div>

              <div className={`p-3.5 flex justify-between items-center gap-3 ${isPearl ? 'bg-slate-50' : 'bg-[#001428]'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <Car className="w-4 h-4 text-[#FF8A3D] shrink-0" />
                  <div className="min-w-0">
                    <strong className={`block ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Chauffeur Transit</strong>
                    <span className={`text-[11px] block truncate ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>Airport MOPA ↔ Vagator Bay</span>
                  </div>
                </div>
                <span className={`font-mono font-bold shrink-0 whitespace-nowrap ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>TRIP-MOV-8821</span>
              </div>
            </div>
          </div>

          {/* Digital Smart Keycard */}
          <div
            className={`border rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden ${
              isPearl
                ? 'bg-gradient-to-br from-amber-50/90 to-white border-[#D4AF37]/40 text-[#001E3D]'
                : 'bg-gradient-to-br from-[#002B4D] to-[#001428] border-[#FFC857]/30 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-wider">Digital NFC & BLE Keycard</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                Armed & Ready
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Hold phone near Villa 101 smart lock</div>
              <div className="text-lg font-bold font-mono text-[#00A9A5]">TAP TO UNLOCK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
