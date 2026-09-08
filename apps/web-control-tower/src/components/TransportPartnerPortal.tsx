import React, { useState } from 'react';
import {
  Car,
  Navigation,
  Clock,
  CheckCircle2,
  Users,
  CreditCard,
  RefreshCw,
  Sparkles,
  Plane,
  TrendingUp,
  ChevronRight,
  PhoneCall,
  Download,
  Eye,
  Zap,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface TransportPartnerPortalProps {
  onSwitchToControlTower?: () => void;
  onOpenTickets?: () => void;
}

export type TripLifecycleStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DRIVER_ASSIGNED'
  | 'EN_ROUTE'
  | 'ARRIVED_PICKUP'
  | 'PASSENGER_ONBOARD'
  | 'IN_TRANSIT'
  | 'COMPLETED';

export const TransportPartnerPortal: React.FC<TransportPartnerPortalProps> = ({
  onSwitchToControlTower,
  onOpenTickets,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'trips' | 'flight-sync' | 'fleet' | 'drivers' | 'settlements'
  >('dashboard');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Live Trips State with Full Lifecycle Progression
  const [trips, setTrips] = useState([
    {
      id: 'trp-01',
      tripCode: 'TRV-GOA-481',
      guestName: 'Vikram Malhotra & Family',
      pickupLocation: 'Mopa Goa International (GOX) VIP Bay 4',
      dropLocation: 'The Vana Azure Ocean Villa & Estate (Villa 101)',
      vehicle: 'Mercedes-Maybach S680 (GA-03-X-0001)',
      driver: 'Gurpreet Singh',
      driverPhone: '+91 98201 44892',
      status: 'IN_TRANSIT' as TripLifecycleStatus,
      fare: 8500,
      flightNumber: '6E-204',
      flightStatus: 'Landed at 13:42 (18m early)',
      syncNote: 'Pickup advanced by 18m. Estate concierge alerted for early cocktail arrival.',
      etaMinutes: 24,
    },
    {
      id: 'trp-02',
      tripCode: 'TRV-GOA-482',
      guestName: 'Ananya & Kabir Roy',
      pickupLocation: 'Mopa GOX Terminal VIP Chauffeur Hub',
      dropLocation: 'The Vana Azure Ocean Villa & Estate (Suite 204)',
      vehicle: 'Land Rover Defender 110 (GA-03-Z-9999)',
      driver: 'Manpreet Rathore',
      driverPhone: '+91 98112 55301',
      status: 'DRIVER_ASSIGNED' as TripLifecycleStatus,
      fare: 6500,
      flightNumber: 'AI-802',
      flightStatus: 'En Route (BOM → GOX) ETA 15:15',
      syncNote: 'Vehicle parked at VIP Bay. Chauffeur awaiting flight touchdown.',
      etaMinutes: 45,
    },
    {
      id: 'trp-03',
      tripCode: 'TRV-GOA-483',
      guestName: 'Dr. Siddharth Sen',
      pickupLocation: 'Dabolim Airport (GOI) Terminal 1',
      dropLocation: 'Maharaja Pichola Palace, Udaipur (Intercity)',
      vehicle: 'BMW i7 Electric Sedan (GA-01-E-7777)',
      driver: 'Tariq Mansoor',
      driverPhone: '+91 97664 12890',
      status: 'REQUESTED' as TripLifecycleStatus,
      fare: 14500,
      flightNumber: 'UK-851',
      flightStatus: 'Scheduled 17:45',
      syncNote: 'Requires VIP chauffeur confirmation within 15 minutes.',
      etaMinutes: 180,
    },
  ]);

  // Fleet Roster
  const [vehicles] = useState([
    {
      id: 'veh-1',
      model: 'Mercedes-Maybach S680',
      regNumber: 'GA-03-X-0001',
      category: 'Ultra-Luxury VIP Sedan',
      assignedDriver: 'Gurpreet Singh',
      telematicsStatus: 'LIVE_ACTIVE',
      speed: '58 km/h',
      fuelBattery: '88% Fuel',
      amenities: ['Chilled San Pellegrino', 'Eucalyptus Towels', 'Rear Executive Recline', 'AES-256 Wi-Fi'],
      hygieneScore: '100% Certified Clean',
    },
    {
      id: 'veh-2',
      model: 'Land Rover Defender 110',
      regNumber: 'GA-03-Z-9999',
      category: 'First-Class Luxury SUV',
      assignedDriver: 'Manpreet Rathore',
      telematicsStatus: 'STANDBY_VIP_BAY',
      speed: '0 km/h (Parked)',
      fuelBattery: '95% Fuel',
      amenities: ['Air Suspension', 'Champagne Chiller', 'Panoramic Sky Roof'],
      hygieneScore: '100% Certified Clean',
    },
    {
      id: 'veh-3',
      model: 'BMW i7 xDrive60 Electric',
      regNumber: 'GA-01-E-7777',
      category: 'Executive Green Luxury',
      assignedDriver: 'Tariq Mansoor',
      telematicsStatus: 'CHARGING_READY',
      speed: '0 km/h (Hub)',
      fuelBattery: '100% Battery (540 km range)',
      amenities: ['31.3" 8K Theater Screen', 'Bowers & Wilkins 4D Diamond Audio'],
      hygieneScore: '100% Certified Clean',
    },
  ]);

  // Advance Trip Lifecycle
  const advanceTripStatus = (tripId: string) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;

        const nextStateMap: Record<TripLifecycleStatus, TripLifecycleStatus> = {
          REQUESTED: 'ACCEPTED',
          ACCEPTED: 'DRIVER_ASSIGNED',
          DRIVER_ASSIGNED: 'EN_ROUTE',
          EN_ROUTE: 'ARRIVED_PICKUP',
          ARRIVED_PICKUP: 'PASSENGER_ONBOARD',
          PASSENGER_ONBOARD: 'IN_TRANSIT',
          IN_TRANSIT: 'COMPLETED',
          COMPLETED: 'COMPLETED',
        };

        const nextStatus = nextStateMap[t.status];
        return { ...t, status: nextStatus };
      })
    );
    showToast('Trip lifecycle status advanced.');
  };

  // Simulate Move + Stay Flight Delay Coupling
  const [flightDelaySimulation, setFlightDelaySimulation] = useState({
    simulated: false,
    delayMinutes: 35,
    originalTime: '15:15',
    adjustedTime: '15:50',
    propertyNotified: false,
  });

  const handleTriggerFlightDelay = () => {
    setFlightDelaySimulation({
      simulated: true,
      delayMinutes: 35,
      originalTime: '15:15',
      adjustedTime: '15:50',
      propertyNotified: true,
    });

    setTrips((prev) =>
      prev.map((t) =>
        t.id === 'trp-02'
          ? {
              ...t,
              flightStatus: 'DELAYED: Air Traffic Holding (+35m)',
              syncNote: 'Chauffeur pickup rescheduled to 15:50. The Vana Azure Frontdesk notified to delay check-in welcome.',
            }
          : t
      )
    );

    showToast('Move + Stay Delay Sentinel: Chauffeur & Hotel frontdesk auto-synchronized!');
  };

  return (
    <div className="min-h-screen bg-[#001020] text-slate-100 flex flex-col font-sans selection:bg-[#FF8A3D] selection:text-[#001020]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#FF8A3D] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#FF8A3D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Transport Partner Portal Dedicated Top Bar */}
      <div className="bg-[#001830] border-b border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF8A3D] to-[#FFC857] text-[#001428] shadow-md">
            <Car className="w-5 h-5 font-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-wide">StaySphere Transport Partner Portal</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                TIER 1 CHAUFFEUR FLEET • 99.2% SLA
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Apex Sovereign Chauffeur Fleet Operations • Direct Mobility & Telematics Hub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#002544] border border-white/10 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telematics Radar: 12 Vehicles Active</span>
          </div>

          {onOpenTickets && (
            <button
              onClick={onOpenTickets}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#002B4D] border border-orange-500/30 text-orange-300 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Support Desk</span>
            </button>
          )}

          {onSwitchToControlTower && (
            <button
              onClick={onSwitchToControlTower}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-slate-200 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF8A3D]" />
              <span>Control Tower View ↗</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#001428] border-b border-white/10 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'trips', label: 'Trips & Assignment Lifecycle', icon: Navigation, badge: '3 Active' },
            { id: 'flight-sync', label: 'Move + Stay Flight Coupling', icon: Plane, badge: 'Live Sync' },
            { id: 'fleet', label: 'Fleet & Telematics', icon: Car },
            { id: 'drivers', label: 'Chauffeurs & Roster', icon: Users },
            { id: 'settlements', label: 'Earnings & Settlements', icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF8A3D] to-[#E5B869] text-[#001428] shadow-lg font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#001428]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#001428] text-white">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD                                                          */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1C1400] via-[#2A1D05] to-[#3B2908] border border-[#FF8A3D]/30 shadow-2xl flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FF8A3D]/20 text-[#FF8A3D] border border-[#FF8A3D]/30 uppercase">
                    Chauffeur Operations Command
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Partner Code: PRT-TRV-APEX</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-wide">
                  Apex Sovereign Chauffeur Fleet Operations
                </h1>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Goa Airport Hubs (GOX / GOI) & Luxury Estate Transit Corridors • Managed by Fleet Director Vikas Rathore.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-black text-[#FFC857] font-mono">₹1,42,500</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Today's Gross Bookings</div>
                </div>
                <button
                  onClick={() => setActiveTab('settlements')}
                  className="p-3 rounded-2xl bg-[#FF8A3D]/20 border border-[#FF8A3D]/40 text-[#FF8A3D] hover:bg-[#FF8A3D]/30 transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 4 Transport Core KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Fleet Utilization</span>
                  <span className="text-emerald-400">Peak Demand</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">88.2%</div>
                <div className="text-[11px] text-slate-400">15 of 17 Chauffeur Vehicles in Transit</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>On-Time Pickup Rate</span>
                  <span className="text-emerald-400">SLA Guaranteed</span>
                </div>
                <div className="text-3xl font-black text-[#3CCF91] font-mono">99.2%</div>
                <div className="text-[11px] text-slate-400">0 Airport Wait Penalty Breaches</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Trips Today</span>
                  <span className="text-[#FFC857]">Active Queue</span>
                </div>
                <div className="text-3xl font-black text-[#FFC857] font-mono">38 Trips</div>
                <div className="text-[11px] text-slate-400">35 Completed • 3 In Progress</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Guest Transit Rating</span>
                  <span className="text-amber-400">5.00 ★</span>
                </div>
                <div className="text-3xl font-black text-white font-mono">4.98 / 5.0</div>
                <div className="text-[11px] text-slate-400">Chauffeur etiquette & vehicle comfort</div>
              </div>
            </div>

            {/* Quick Actions & Live Assignment Preview */}
            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#FF8A3D]" />
                  <span>Immediate Transit Queue</span>
                </h3>
                <button
                  onClick={() => setActiveTab('trips')}
                  className="text-xs text-[#FF8A3D] font-bold hover:underline cursor-pointer"
                >
                  Manage All Trips →
                </button>
              </div>

              <div className="space-y-3">
                {trips.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl bg-[#001428] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{t.guestName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-mono">
                          {t.vehicle}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {t.pickupLocation} → <strong className="text-slate-300">{t.dropLocation}</strong>
                      </div>
                      <div className="text-[11px] text-[#FFC857] font-mono mt-1">
                        ● Flight {t.flightNumber}: {t.flightStatus}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg bg-[#FF8A3D]/20 text-[#FF8A3D] font-black text-[11px]">
                        {t.status.replace(/_/g, ' ')}
                      </span>
                      <button
                        onClick={() => advanceTripStatus(t.id)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] text-xs font-black shadow hover:brightness-110 cursor-pointer flex items-center gap-1"
                      >
                        <span>Advance Stage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TRIPS & ASSIGNMENT LIFECYCLE                                       */}
        {/* ========================================================================= */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Chauffeur Transit Lifecycle Engine</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Full 8-stage state machine: Request → Accept → Assign Driver → En Route → Arrived Pickup → Onboard → In Transit → Completed.
                </p>
              </div>
              <button
                onClick={() => showToast('Syncing GPS coordinates from vehicle telematics units')}
                className="px-4 py-2 rounded-xl bg-[#002B4D] border border-[#FF8A3D]/40 text-[#FF8A3D] text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Sync Vehicle GPS</span>
              </button>
            </div>

            <div className="space-y-4">
              {trips.map((trip) => {
                const stages: TripLifecycleStatus[] = [
                  'REQUESTED',
                  'ACCEPTED',
                  'DRIVER_ASSIGNED',
                  'EN_ROUTE',
                  'ARRIVED_PICKUP',
                  'PASSENGER_ONBOARD',
                  'IN_TRANSIT',
                  'COMPLETED',
                ];
                const currentIndex = stages.indexOf(trip.status);

                return (
                  <div
                    key={trip.id}
                    className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-white">{trip.guestName}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300">
                            {trip.tripCode}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          Vehicle: <strong className="text-white">{trip.vehicle}</strong> • Driver: {trip.driver} ({trip.driverPhone})
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Route: <span className="text-slate-300">{trip.pickupLocation}</span> → <span className="text-white font-medium">{trip.dropLocation}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-[#FFC857] font-mono">₹{trip.fare.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-slate-400">Escrow Reserved (12% commission)</div>
                      </div>
                    </div>

                    {/* Visual 8-Stage Progress Tracker */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Stage: <strong className="text-[#FF8A3D]">{trip.status.replace(/_/g, ' ')}</strong>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-[10px] font-bold">
                        {stages.map((stage, idx) => {
                          const isPassed = idx <= currentIndex;
                          const isCurrent = idx === currentIndex;
                          return (
                            <div
                              key={stage}
                              className={`p-2 rounded-lg text-center transition ${
                                isCurrent
                                  ? 'bg-[#FF8A3D] text-[#001428] shadow-md font-black'
                                  : isPassed
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-[#001428] text-slate-500'
                              }`}
                            >
                              {stage.split('_')[0]}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Operational Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                      <div className="text-xs text-cyan-300 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>ETA to destination: ~{trip.etaMinutes} mins</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {trip.status !== 'COMPLETED' ? (
                          <button
                            onClick={() => advanceTripStatus(trip.id)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] text-xs font-black shadow hover:brightness-110 flex items-center gap-2 cursor-pointer"
                          >
                            <span>Advance to Next Stage</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Trip Completed & Escrow Release Armed</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MOVE + STAY FLIGHT DELAY COUPLING                                  */}
        {/* ========================================================================= */}
        {activeTab === 'flight-sync' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#002B4D] via-[#0B3D91] to-[#00A9A5] border border-white/15 shadow-2xl space-y-4">
              <div className="flex items-center gap-2.5">
                <Plane className="w-6 h-6 text-[#FFC857]" />
                <h2 className="text-xl font-black text-white">Move + Stay Coupling Sentinel</h2>
              </div>
              <p className="text-xs text-slate-200 max-w-3xl leading-relaxed">
                StaySphere's signature architectural capability: Flight delays automatically recalculate transport pickup times, notify chauffeurs in real time, and adjust hotel check-in / room lock arming without requiring manual human calls.
              </p>
            </div>

            {/* Interactive Simulation Panel */}
            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FF8A3D]" />
                    <span>Flight Delay Trigger Simulation (Flight AI-802)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Simulate an airline air traffic control delay of 35 minutes on Air India 802 (Mumbai → Goa).
                  </p>
                </div>

                <button
                  onClick={handleTriggerFlightDelay}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] text-xs font-black shadow hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <Plane className="w-4 h-4" />
                  <span>Simulate +35m Flight Delay</span>
                </button>
              </div>

              {/* Coupling Cascade Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border ${flightDelaySimulation.simulated ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-[#001428] border-white/10 text-slate-400'}`}>
                  <div className="text-[10px] uppercase font-bold tracking-wider">1. Airline Telematics</div>
                  <div className="text-sm font-bold text-white mt-1">AI-802 Holding Pattern</div>
                  <div className="text-xs mt-1">
                    {flightDelaySimulation.simulated ? '+35 Mins ATC Delay detected' : 'On Schedule (15:15)'}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${flightDelaySimulation.simulated ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'bg-[#001428] border-white/10 text-slate-400'}`}>
                  <div className="text-[10px] uppercase font-bold tracking-wider">2. Chauffeur Dispatch</div>
                  <div className="text-sm font-bold text-white mt-1">Pickup Time Adjusted</div>
                  <div className="text-xs mt-1">
                    {flightDelaySimulation.simulated ? 'Rescheduled: 15:50 (Bay VIP 2)' : 'Scheduled: 15:15'}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${flightDelaySimulation.simulated ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-[#001428] border-white/10 text-slate-400'}`}>
                  <div className="text-[10px] uppercase font-bold tracking-wider">3. Hotel Frontdesk</div>
                  <div className="text-sm font-bold text-white mt-1">The Vana Azure Ocean Estate</div>
                  <div className="text-xs mt-1">
                    {flightDelaySimulation.simulated ? 'Key arming held until 16:45' : 'Key armed for 16:00'}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${flightDelaySimulation.simulated ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-[#001428] border-white/10 text-slate-400'}`}>
                  <div className="text-[10px] uppercase font-bold tracking-wider">4. Guest Timeline</div>
                  <div className="text-sm font-bold text-white mt-1">Zero Anxiety Push</div>
                  <div className="text-xs mt-1">
                    {flightDelaySimulation.simulated ? 'Push sent: "Driver aware, waiting"' : 'Standing by'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FLEET & TELEMATICS                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Chauffeur Fleet & Telematics Directory</h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time OBD-II vehicle telemetry, cabin hygiene audit logs, and premium amenities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vehicles.map((veh) => (
                <div
                  key={veh.id}
                  className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-[#FFC857]">
                        {veh.regNumber}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <Activity className="w-3 h-3 animate-pulse" /> {veh.telematicsStatus}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{veh.model}</h3>
                      <div className="text-xs text-slate-400">{veh.category}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#001428] border border-white/5 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Assigned Driver:</span>
                        <strong className="text-white">{veh.assignedDriver}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Current Speed:</span>
                        <span className="text-cyan-300 font-mono">{veh.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fuel / Battery:</span>
                        <span className="text-emerald-400 font-mono">{veh.fuelBattery}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-slate-400">Cabin Amenities:</div>
                      <div className="flex flex-wrap gap-1">
                        {veh.amenities.map((a, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold">{veh.hygieneScore}</span>
                    <button
                      onClick={() => showToast(`Telematics diagnostics pinged for ${veh.model}`)}
                      className="text-cyan-400 hover:underline font-bold cursor-pointer"
                    >
                      Diagnostics →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DRIVERS & ROSTER                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'drivers' && (
          <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Chauffeur Roster & Compliance Verification</h2>
              <p className="text-xs text-slate-400 mt-1">
                100% Background-verified, English-fluent luxury chauffeurs with defensive driving certification.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: 'Gurpreet Singh',
                  vehicle: 'Mercedes-Maybach S680',
                  experience: '9 Years Luxury Chauffeur',
                  rating: '4.99 ★',
                  status: 'ON_DUTY_IN_TRANSIT',
                  badges: ['Police Verified', 'First Aid Certified', 'VIP Concierge Trained'],
                },
                {
                  name: 'Manpreet Rathore',
                  vehicle: 'Defender 110',
                  experience: '6 Years Offroad & VIP Escort',
                  rating: '4.97 ★',
                  status: 'STANDBY_VIP_BAY',
                  badges: ['Police Verified', 'Anti-Kidnap Security', 'Spoken French & Hindi'],
                },
                {
                  name: 'Tariq Mansoor',
                  vehicle: 'BMW i7',
                  experience: '8 Years Executive EV Specialist',
                  rating: '4.98 ★',
                  status: 'READY_AT_HUB',
                  badges: ['Police Verified', 'EV Fast-Charge Master', 'Sommelier Basics'],
                },
              ].map((driver, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-sm">{driver.name}</span>
                      <span className="text-xs text-amber-400 font-bold">{driver.rating}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                        {driver.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Assigned: <strong className="text-slate-200">{driver.vehicle}</strong> • {driver.experience}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {driver.badges.map((b, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Calling ${driver.name} via encrypted bridge`)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Driver</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SETTLEMENTS & EARNINGS                                             */}
        {/* ========================================================================= */}
        {activeTab === 'settlements' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-white">Chauffeur Fleet Settlements & Net Payout</h2>
                <p className="text-xs text-slate-400 mt-1">
                  12% standard platform commission. Instant release upon trip completion milestone.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-[#FFC857] font-mono">₹74,800</div>
                <div className="text-[11px] text-slate-400">Net Pending Settlement Available for Withdrawal</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white">Recent Completed Mobility Trips</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#001428] text-slate-400 font-bold font-sans border-b border-white/10">
                    <tr>
                      <th className="p-3">Trip Ref</th>
                      <th className="p-3 font-sans">Route & Vehicle</th>
                      <th className="p-3">Gross Fare</th>
                      <th className="p-3">Platform Fee (12%)</th>
                      <th className="p-3">Net Partner Payout</th>
                      <th className="p-3 font-sans">Settlement Status</th>
                      <th className="p-3 font-sans">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="p-3 text-cyan-300 font-bold">TRV-GOA-479</td>
                      <td className="p-3 font-sans text-white">GOX Airport → Vana Azure Estate (Maybach S680)</td>
                      <td className="p-3">₹8,500</td>
                      <td className="p-3 text-rose-300">-₹1,020</td>
                      <td className="p-3 text-[#3CCF91] font-bold">₹7,480</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          SETTLED
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <button
                          onClick={() => showToast('Downloading Mobility Receipt #TRV-479.pdf')}
                          className="flex items-center gap-1 text-cyan-400 hover:underline text-[11px] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-cyan-300 font-bold">TRV-GOA-480</td>
                      <td className="p-3 font-sans text-white">Dabolim → Heritage Sunset Suite (BMW i7)</td>
                      <td className="p-3">₹14,500</td>
                      <td className="p-3 text-rose-300">-₹1,740</td>
                      <td className="p-3 text-[#3CCF91] font-bold">₹12,760</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          SETTLED
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <button
                          onClick={() => showToast('Downloading Mobility Receipt #TRV-480.pdf')}
                          className="flex items-center gap-1 text-cyan-400 hover:underline text-[11px] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
