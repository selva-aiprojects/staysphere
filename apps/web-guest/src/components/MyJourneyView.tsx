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
} from 'lucide-react';

interface MyJourneyViewProps {
  onOpenResolve: (defaultCategory?: string) => void;
}

export function MyJourneyView({ onOpenResolve }: MyJourneyViewProps) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(1); // Step 2: In-Transit Chauffeur Pickup

  const TIMELINE_STAGES = [
    {
      id: 'stage-1',
      stageNumber: 1,
      title: 'Flight Telemetry & Pre-Arrival Sync',
      subtitle: 'Flight 6E-204 from Delhi (DEL) → Goa MOPA (GOX)',
      time: '13:45 PM',
      status: 'COMPLETED' as const,
      badge: 'FLIGHT LANDED (ON-TIME)',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
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
      badgeColor: 'bg-[#FFC857]/20 text-[#FFC857] border-[#FFC857]/40',
      icon: Car,
      details: {
        driverName: 'Gurpreet Singh',
        driverRating: '4.98 ★ (420 Sovereign Trips)',
        driverPhone: '+91 98111 22334',
        vehicleModel: 'Mercedes-Maybach S680 (GA-03-XX-0001)',
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
      badgeColor: 'bg-[#00D2C4]/20 text-[#00D2C4] border-[#00D2C4]/40',
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
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
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
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
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
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#001E36] via-[#002B4D] to-[#001830] border border-[#00A9A5]/50 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#00A9A5]/20 text-[#00D2C4] border border-[#00A9A5]/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00D2C4] animate-pulse" />
                Live Orchestrated Journey
              </span>
              <span className="font-mono text-xs text-slate-300 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                Ref: <strong>JN-SS-2026-9041</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#FFC857]/20 text-[#FFC857] text-xs font-bold">
                Sovereign Platinum Guest
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Goa Clifftop Retreat & Coastal Transit
            </h1>
            <p className="text-xs md:text-sm text-slate-300 flex items-center gap-2">
              <span>Guest: <strong>Vikram Malhotra</strong></span>
              <span className="text-slate-500">•</span>
              <span>12 Sep – 15 Sep 2026 (3 Nights)</span>
              <span className="text-slate-500">•</span>
              <span className="text-[#3CCF91] font-bold">100% Escrow Protected (₹1,30,500)</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenResolve('GENERAL_INQUIRY')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] text-xs font-black shadow-lg shadow-[#FF8A3D]/25 transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Proactive Resolve (15-Min SLA)</span>
            </button>
          </div>
        </div>

        {/* Live Journey Telemetry Ticker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#001428]/80 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#00D2C4]" /> Flight Telemetry
            </span>
            <div className="text-xs font-black text-white">IndiGo 6E-204 (DEL → GOX)</div>
            <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Landed on-time (Gate 04)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#001428]/80 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-[#FF8A3D]" /> Chauffeur Transit
            </span>
            <div className="text-xs font-black text-white">Gurpreet Singh (Maybach S680)</div>
            <div className="text-[11px] text-[#FFC857] font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 animate-spin" /> Arriving in 6 mins (Airport Curb)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#001428]/80 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-[#FFC857]" /> Suite Readiness
            </span>
            <div className="text-xs font-black text-white">Villa 101 • Private Pool Villa</div>
            <div className="text-[11px] text-[#00D2C4] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ready & Pre-Inspected (22°C)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#001428]/80 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#3CCF91]" /> Escrow Protection
            </span>
            <div className="text-xs font-black text-white">₹1,30,500 Sovereign Vault</div>
            <div className="text-[11px] text-slate-300">
              Disburses 2 hrs post check-in
            </div>
          </div>
        </div>
      </div>

      {/* Main Journey Grid: Interactive Multi-Stage Timeline + Coupled Binding */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Connected Multi-Stage Journey Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#00A9A5]" />
                  <span>Synchronized Journey Timeline</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time telemetry tracking every stage of your journey from flight touchdown to departure.
                </p>
              </div>
              <span className="text-xs font-bold text-[#3CCF91] px-3 py-1 rounded-full bg-[#3CCF91]/10 border border-[#3CCF91]/30">
                Stage 2 of 5 Active
              </span>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
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
                          : 'bg-[#001428] border border-white/30 text-slate-400'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : stage.stageNumber}
                    </div>

                    {/* Step Card Container */}
                    <div
                      className={`p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#002444] border-[#00A9A5] shadow-lg'
                          : 'bg-[#001428] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-[#00A9A5]" />
                          <h3 className="text-sm font-bold text-white">{stage.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${stage.badgeColor}`}>
                            {stage.badge}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{stage.time}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 mt-1">{stage.subtitle}</p>

                      {/* Detailed Expanded Info for Selected Step */}
                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-300 bg-black/30 p-4 rounded-xl">
                          {stage.details.flightNumber && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>Flight: <strong className="text-white">{stage.details.flightNumber}</strong></div>
                              <div>Gate: <strong className="text-white">{stage.details.gate}</strong></div>
                              <div className="sm:col-span-2 text-slate-400">{stage.details.baggageBelt}</div>
                            </div>
                          )}

                          {stage.details.driverName && (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Chauffeur: <strong className="text-white">{stage.details.driverName}</strong> ({stage.details.driverRating})</span>
                                <a href={`tel:${stage.details.driverPhone}`} className="text-[#00D2C4] font-bold flex items-center gap-1 hover:underline">
                                  <PhoneCall className="w-3 h-3" /> Call Driver
                                </a>
                              </div>
                              <div>Vehicle: <strong className="text-white">{stage.details.vehicleModel}</strong></div>
                              <div>Telemetry: <strong className="text-emerald-400 font-mono">{stage.details.liveCoords}</strong></div>
                              <div className="text-slate-400">In-Car Inclusions: {stage.details.amenities}</div>
                            </div>
                          )}

                          {stage.details.suiteName && (
                            <div className="space-y-2">
                              <div>Assigned Suite: <strong className="text-white">{stage.details.suiteName}</strong></div>
                              <div>Property: <strong className="text-white">{stage.details.property}</strong></div>
                              <div className="flex items-center gap-2 pt-1">
                                <span className="px-2 py-0.5 rounded bg-[#3CCF91]/20 text-[#3CCF91] font-bold text-[10px]">
                                  {stage.details.keycardStatus}
                                </span>
                                <span className="text-slate-400">• Butler: {stage.details.butlerName}</span>
                              </div>
                            </div>
                          )}

                          {stage.details.tourName && (
                            <div className="space-y-1">
                              <div>Tour Package: <strong className="text-white">{stage.details.tourName}</strong></div>
                              <div className="text-slate-400">Inclusions: {stage.details.inclusions}</div>
                            </div>
                          )}

                          {stage.details.returnFlight && (
                            <div className="space-y-1">
                              <div>Return Flight: <strong className="text-white">{stage.details.returnFlight}</strong></div>
                              <div className="text-emerald-400 font-bold">{stage.details.escrowSettlement}</div>
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

        {/* Right Column (5 cols): Coupled Binding Card & Proactive Resolve Desk */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coupled Booking & Transport Binding Card */}
          <div className="bg-[#001E36] border border-[#00A9A5]/40 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3CCF91]" />
                <span>Coupled Journey Contract</span>
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00D2C4] border border-[#00A9A5]/30">
                1 SINGLE ITINERARY
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your stay and airport transit are operationally linked under one synchronized contract. If your flight is delayed, your chauffeur and villa check-in automatically adjust with zero penalty.
            </p>

            <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden text-xs">
              <div className="p-3.5 bg-[#001428] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-[#00A9A5]" />
                  <div>
                    <strong className="text-white block">Stay Reservation</strong>
                    <span className="text-slate-400 text-[11px]">The Grand Vagator Bay (Villa 101)</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">BK-STAY-4012</span>
              </div>

              <div className="p-3.5 bg-[#001428] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#FF8A3D]" />
                  <div>
                    <strong className="text-white block">Chauffeur Transit</strong>
                    <span className="text-slate-400 text-[11px]">Airport MOPA ↔ Vagator Bay</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">TRIP-MOV-8821</span>
              </div>

              <div className="p-3.5 bg-[#001428] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#3CCF91]" />
                  <div>
                    <strong className="text-white block">Smart Escrow Vault</strong>
                    <span className="text-slate-400 text-[11px]">Automated 2-Hr Post-Checkin</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#3CCF91]">₹1,30,500</span>
              </div>
            </div>

            {/* Smart Digital Keycard Pass */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00284D] to-[#001428] border border-[#00A9A5]/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A9A5]/20 text-[#00D2C4] flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Digital Suite Keycard Pass</h4>
                  <p className="text-[11px] text-slate-300">Tap against Villa 101 lock sensor on arrival</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                ARMED & READY
              </span>
            </div>
          </div>

          {/* Proactive "Resolve" Sentinel Box */}
          <div className="bg-gradient-to-br from-[#001E36] via-[#002244] to-[#001428] border border-[#FF8A3D]/40 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A3D] animate-ping" />
                <h3 className="text-sm font-bold text-white">Proactive Resolution Sentinel</h3>
              </div>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#FF8A3D]/20 text-[#FFC857] border border-[#FF8A3D]/40">
                15-MIN SLA GUARANTEE
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              We resolve issues before you have to ask. If you experience any transit delay, room mismatch, or preference adjustment, tap below for immediate executive intervention.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenResolve('TRANSIT_DELAY')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs text-slate-200 transition"
              >
                <Car className="w-3.5 h-3.5 text-[#FF8A3D] mb-1" />
                <strong className="block text-white">Transit Delay</strong>
                <span className="text-[10px] text-slate-400">Reroute / Alternate Cab</span>
              </button>

              <button
                onClick={() => onOpenResolve('ROOM_HYGIENE')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs text-slate-200 transition"
              >
                <Hotel className="w-3.5 h-3.5 text-[#00D2C4] mb-1" />
                <strong className="block text-white">Room Preference</strong>
                <span className="text-[10px] text-slate-400">Climate / Suite Audit</span>
              </button>

              <button
                onClick={() => onOpenResolve('BILLING_DISPUTE')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs text-slate-200 transition"
              >
                <Lock className="w-3.5 h-3.5 text-[#3CCF91] mb-1" />
                <strong className="block text-white">Escrow Support</strong>
                <span className="text-[10px] text-slate-400">Hold Payout / Refund</span>
              </button>

              <button
                onClick={() => onOpenResolve('GENERAL_INQUIRY')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs text-slate-200 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FFC857] mb-1" />
                <strong className="block text-white">Direct RM Line</strong>
                <span className="text-[10px] text-slate-400">Priya Sharma (RM)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
