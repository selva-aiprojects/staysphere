import React, { useState } from 'react';
import {
  Plane,
  Car,
  Hotel,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RotateCcw,
  Radio,
  Smartphone,
} from 'lucide-react';

export interface CascadeEvent {
  id: string;
  time: string;
  source: 'AVIATION' | 'SENTINEL_ENGINE' | 'CHAUFFEUR_DISPATCH' | 'PROPERTY_DESK' | 'GUEST_PUSH';
  message: string;
  status: 'SUCCESS' | 'WARNING' | 'CRITICAL' | 'INFO';
}

export const TelemetryCascadeController: React.FC = () => {
  const [selectedFlight, setSelectedFlight] = useState('6E-204');
  const [currentDelay, setCurrentDelay] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [cascadeEvents, setCascadeEvents] = useState<CascadeEvent[]>([
    {
      id: 'evt-1',
      time: '13:42 PM',
      source: 'AVIATION',
      message: 'IndiGo Flight 6E-204 ADS-B ping received: Airborne cruising at 34,000 ft over Bhopal corridor.',
      status: 'INFO',
    },
    {
      id: 'evt-2',
      time: '13:45 PM',
      source: 'PROPERTY_DESK',
      message: 'Villa 101 pre-arrival inspection confirmed (84/84 check passed). Awaiting arrival radar pickup trigger.',
      status: 'SUCCESS',
    },
  ]);

  const handleInjectDelay = (delayMinutes: number, alertLabel: string) => {
    setIsSimulating(true);
    setCurrentDelay(delayMinutes);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setTimeout(() => {
      // Step 1: Aviation Telemetry Drift
      const ev1: CascadeEvent = {
        id: `ev-${Date.now()}-1`,
        time: now,
        source: 'AVIATION',
        message: `Global Aviation Feed: ${selectedFlight} updated with ${delayMinutes > 0 ? `+${delayMinutes} mins delay` : `${delayMinutes} mins early touchdown`} (${alertLabel}).`,
        status: delayMinutes > 45 ? 'CRITICAL' : delayMinutes > 0 ? 'WARNING' : 'SUCCESS',
      };

      // Step 2: Sentinel Engine Calculation
      const ev2: CascadeEvent = {
        id: `ev-${Date.now()}-2`,
        time: now,
        source: 'SENTINEL_ENGINE',
        message: `Sentinel Delay Cascade Engine: Recalculated pickup at MOPA Airport to ${delayMinutes > 0 ? `+${delayMinutes} mins` : '15 mins early'}. No guest intervention required.`,
        status: 'INFO',
      };

      // Step 3: Chauffeur Auto-Rescheduling
      const ev3: CascadeEvent = {
        id: `ev-${Date.now()}-3`,
        time: now,
        source: 'CHAUFFEUR_DISPATCH',
        message: `Maybach S680 Chauffeur (Gurpreet Singh) staging window shifted automatically. Staging in VIP Bay at updated touchdown time.`,
        status: 'SUCCESS',
      };

      // Step 4: Hotel Arrival Radar Sync
      const ev4: CascadeEvent = {
        id: `ev-${Date.now()}-4`,
        time: now,
        source: 'PROPERTY_DESK',
        message: `The Vana Azure Front Desk Arrival Radar updated: Late check-in window registered for Villa 101. Welcome team notified to delay champagne chill.`,
        status: 'INFO',
      };

      // Step 5: Guest App Push Notification
      const ev5: CascadeEvent = {
        id: `ev-${Date.now()}-5`,
        time: now,
        source: 'GUEST_PUSH',
        message: `Push Notification sent to Vikram Malhotra: "We noticed your flight was delayed by ${delayMinutes}m. Your chauffeur has automatically adjusted your pickup time."`,
        status: 'SUCCESS',
      };

      setCascadeEvents([ev5, ev4, ev3, ev2, ev1, ...cascadeEvents]);
      setIsSimulating(false);
    }, 700);
  };

  const handleResetSimulation = () => {
    setCurrentDelay(0);
    setCascadeEvents([
      {
        id: `ev-reset-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        source: 'AVIATION',
        message: `Telemetry reset: ${selectedFlight} restored to scheduled timetable (On-Time).`,
        status: 'SUCCESS',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001D3A] via-[#002D54] to-[#00417A] border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FF8A3D]/20 text-[#FF8A3D] border border-[#FF8A3D]/30 uppercase tracking-wider">
              Autonomous Disruption Healing
            </span>
            <span className="text-xs text-slate-400 font-mono">Telemetry Cascade Engine • § 7.1 Protocol</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-wide">
            Live Aviation Telemetry & Delay Cascading Controller
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Simulate airline drift, ATC holding patterns, and highway detours. Watch how StaySphere automatically synchronizes chauffeurs, front desk arrivals, and guest push alerts without human panic.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetSimulation}
            className="py-2.5 px-4 rounded-2xl bg-[#001830] hover:bg-[#002244] border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00D2C4]" />
            <span>Reset Timetable</span>
          </button>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Controller Panel */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-[#001830] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                Active Flight Tracked
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00A9A5]/20 text-[#00D2C4] border border-[#00D2C4]/30">
                ADS-B FEED ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#002244] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#FFC857]" />
                  <select
                    value={selectedFlight}
                    onChange={(e) => setSelectedFlight(e.target.value)}
                    className="bg-[#001830] border border-white/15 rounded-lg px-2 py-1 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="6E-204">6E-204 (DEL → GOX)</option>
                    <option value="AI-802">AI-802 (BOM → GOX)</option>
                    <option value="EK-512">EK-512 (DXB → DEL)</option>
                  </select>
                </div>
                <span className="text-xs font-mono text-slate-300">AviationStack Ingest</span>
              </div>
              <div className="text-xs text-slate-300">
                Passenger: <strong className="text-white">Vikram Malhotra</strong> (Villa 101)
              </div>
              <div className="text-xs text-slate-300">
                Assigned Chauffeur: <strong className="text-white">Gurpreet Singh</strong> (Maybach S680)
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400">
                Status: {currentDelay === 0 ? 'On-Time (Scheduled 14:00)' : `Delayed by +${currentDelay} mins`}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Simulate Disruption Event
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleInjectDelay(0, 'Timetable Normal')}
                  disabled={isSimulating}
                  className="p-3 rounded-2xl bg-[#002244] hover:bg-[#002E5C] border border-white/10 text-left transition cursor-pointer"
                >
                  <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    On-Time
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Normal landing at 13:45</div>
                </button>

                <button
                  onClick={() => handleInjectDelay(-15, 'Tailwind Acceleration')}
                  disabled={isSimulating}
                  className="p-3 rounded-2xl bg-[#002244] hover:bg-[#002E5C] border border-white/10 text-left transition cursor-pointer"
                >
                  <div className="text-xs font-black text-[#00D2C4] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Early -15m
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Advance chauffeur pickup</div>
                </button>

                <button
                  onClick={() => handleInjectDelay(30, 'Runway Congestion at DEL')}
                  disabled={isSimulating}
                  className="p-3 rounded-2xl bg-[#002244] hover:bg-[#002E5C] border border-amber-500/30 text-left transition cursor-pointer"
                >
                  <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Delay +30m
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Air traffic holding pattern</div>
                </button>

                <button
                  onClick={() => handleInjectDelay(75, 'Monsoon Weather Detour')}
                  disabled={isSimulating}
                  className="p-3 rounded-2xl bg-[#002244] hover:bg-[#002E5C] border border-rose-500/40 text-left transition cursor-pointer"
                >
                  <div className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Severe +75m
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Trigger Sentinel Protocol P1</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Event Stream */}
        <div className="md:col-span-7">
          <div className="p-5 rounded-3xl bg-[#001830] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#FF8A3D] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                  Live Delay Cascade Event Stream
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Zero-Friction Invariant</span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 divide-y divide-white/5">
              {cascadeEvents.map((evt) => {
                const icon =
                  evt.source === 'AVIATION' ? (
                    <Plane className="w-3.5 h-3.5 text-[#00D2C4]" />
                  ) : evt.source === 'SENTINEL_ENGINE' ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-[#FFC857]" />
                  ) : evt.source === 'CHAUFFEUR_DISPATCH' ? (
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                  ) : evt.source === 'PROPERTY_DESK' ? (
                    <Hotel className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  );

                return (
                  <div key={evt.id} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-300">
                        {icon}
                        <span>{evt.source.replace(/_/g, ' ')}</span>
                      </div>
                      <span className="font-mono text-slate-400">{evt.time}</span>
                    </div>
                    <p className="text-xs text-slate-200 pl-5 leading-relaxed">{evt.message}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
