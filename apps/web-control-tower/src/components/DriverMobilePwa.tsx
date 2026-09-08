import React, { useState, useEffect } from 'react';
import {
  Navigation,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Plane,
  Sparkles,
  RefreshCw,
  UserCheck,
  Smartphone,
  Maximize2
} from 'lucide-react';

interface DriverMobilePwaProps {
  onNotifyProperty?: (msg: string) => void;
  onAdvanceMilestone?: (milestone: string) => void;
}

export const DriverMobilePwa: React.FC<DriverMobilePwaProps> = ({
  onNotifyProperty,
  onAdvanceMilestone,
}) => {
  // Mobile device viewport frame toggle for desktop viewing
  const [deviceFrame, setDeviceFrame] = useState<boolean>(true);

  // Driver state
  const [currentMilestone, setCurrentMilestone] = useState<
    'EN_ROUTE_AIRPORT' | 'ARRIVED_CURB' | 'GUEST_BOARDED' | 'IN_TRANSIT' | 'COMPLETED'
  >('ARRIVED_CURB');

  // Flight delay simulation
  const [flightStatus, setFlightStatus] = useState<'ON_TIME' | 'DELAYED_35' | 'LANDED'>('LANDED');
  const [etaMinutes, setEtaMinutes] = useState<number>(6);
  const [gpsSpeed, setGpsSpeed] = useState<number>(42);
  const [, setHandshakeSent] = useState<boolean>(true);
  const [batteryLevel] = useState<number>(94);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Coordinates
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 15.7538,
    lng: 73.8697,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Milestone progression handler
  const handleMilestoneAdvance = (
    nextState: 'EN_ROUTE_AIRPORT' | 'ARRIVED_CURB' | 'GUEST_BOARDED' | 'IN_TRANSIT' | 'COMPLETED',
    label: string,
  ) => {
    setCurrentMilestone(nextState);
    showToast(`Milestone Confirmed: ${label}`);
    if (onAdvanceMilestone) {
      onAdvanceMilestone(label);
    }
    if (nextState === 'ARRIVED_CURB' && onNotifyProperty) {
      onNotifyProperty('Chauffeur Gurpreet Singh has arrived at Airport Pickup Curb (T1 Gate 04).');
      setHandshakeSent(true);
    }
    if (nextState === 'GUEST_BOARDED') {
      setEtaMinutes(34);
      setGpsSpeed(58);
      if (onNotifyProperty) {
        onNotifyProperty('Guest Vikram Malhotra has boarded. Transit to resort is en-route (ETA: 34 mins).');
      }
    }
  };

  // Periodic GPS jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords((prev) => ({
        lat: Number((prev.lat + (Math.random() - 0.5) * 0.0008).toFixed(5)),
        lng: Number((prev.lng + (Math.random() - 0.5) * 0.0008).toFixed(5)),
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner / Device Frame Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              StaySphere Chauffeur PWA Cockpit
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30">
                PWA Active
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Mobile-first driver operational cockpit with curb handshake, live flight radar & escrow unlock telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              deviceFrame
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            {deviceFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {deviceFrame ? 'Device Frame Mode' : 'Full Canvas Mode'}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex justify-center">
        <div
          className={`w-full transition-all duration-300 ${
            deviceFrame
              ? 'max-w-md bg-slate-950 border-4 border-slate-800 rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden'
              : 'w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6'
          }`}
        >
          {/* Mobile Speaker / Camera Notch if deviceFrame */}
          {deviceFrame && (
            <div className="w-full flex justify-center mb-3">
              <div className="w-36 h-4 bg-slate-900 rounded-b-xl flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Phone Status Bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 mb-3">
            <span className="font-semibold text-white">14:04</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-mono">5G LTE</span>
              <span>⚡ {batteryLevel}%</span>
            </div>
          </div>

          {/* Toast Alert */}
          {toastMessage && (
            <div className="mb-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Chauffeur Identity Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 mb-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
                GS
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Gurpreet Singh</h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span>Mercedes-Maybach S680</span>
                  <span className="text-amber-400 font-semibold">★ 4.96</span>
                </p>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  GA-03-XX-0001
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30">
                ACTIVE ASSIGNMENT
              </span>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">Trip: #MOV-8821</p>
            </div>
          </div>

          {/* Flight Telemetry Radar Card */}
          <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/40 rounded-2xl p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                <Plane className="w-3.5 h-3.5 text-indigo-400 transform -rotate-45" />
                <span>Flight Inbound Radar</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {flightStatus === 'LANDED' ? 'LANDED (ON_TIME)' : 'IN AIR'}
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 mb-2">
              <div>
                <p className="text-[10px] text-slate-400">Flight Number</p>
                <p className="text-xs font-bold text-white font-mono">IndiGo 6E-204</p>
                <p className="text-[10px] text-slate-400">DEL ➔ MOPA (GOX)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">Pickup Curb Gate</p>
                <p className="text-xs font-bold text-emerald-400">Terminal 1, Pillar C4</p>
                <p className="text-[10px] text-slate-400">Baggage Belt 03</p>
              </div>
            </div>

            {/* Flight Delay Simulator Dropdown */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400">Simulate Telemetry:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setFlightStatus('LANDED');
                    showToast('Telemetry updated: Flight Landed On-Time');
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    flightStatus === 'LANDED'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  On-Time Landed
                </button>
                <button
                  onClick={() => {
                    setFlightStatus('DELAYED_35');
                    showToast('Telemetry Alert: +35 min delay broadcasted to Hotel Frontdesk');
                    if (onNotifyProperty) {
                      onNotifyProperty('Inbound Flight 6E-204 delayed by 35 mins. Chauffeur curb holding pattern activated.');
                    }
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    flightStatus === 'DELAYED_35'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  +35m Delay
                </button>
              </div>
            </div>
          </div>

          {/* Guest VIP Contact Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">VIP Guest Passenger</span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 font-bold rounded-full border border-amber-500/30">
                SOVEREIGN PLATINUM
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Vikram Malhotra</h3>
                <p className="text-[11px] text-slate-400">2 Adults • 2 Luggage Pieces</p>
                <p className="text-[10px] text-emerald-400">Prefers cabin temp at 21°C & quiet drive</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
                VM
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast('Calling Guest Vikram Malhotra (+91 98200 12345)...')}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Passenger</span>
              </button>
              <button
                onClick={() => showToast('Opening WhatsApp VIP Concierge thread...')}
                className="py-2 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-xl text-xs font-medium border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Guest</span>
              </button>
            </div>
          </div>

          {/* Navigation & Curb Handshake Radar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Navigation className="w-3.5 h-3.5 text-indigo-400" />
                <span>Destination & Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Speed: {gpsSpeed} km/h
              </span>
            </div>

            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80 mb-3 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] text-slate-400">Pickup</p>
                  <p className="text-xs font-semibold text-white">MOPA Airport Terminal 1 Gate 04</p>
                </div>
              </div>
              <div className="border-l border-dashed border-slate-700 ml-1 h-3"></div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] text-slate-400">Drop-off Destination</p>
                  <p className="text-xs font-semibold text-white">
                    The Grand Vagator Bay Resort & Oceanfront Villas
                  </p>
                  <p className="text-[10px] text-slate-400">VIP Villa 101 Private Driveway</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>ETA to Resort:</span>
                <span className="font-bold text-white font-mono">{etaMinutes} mins</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                GPS: {coords.lat}, {coords.lng}
              </div>
            </div>
          </div>

          {/* Action Center: Big One-Tap Driver Milestones */}
          <div className="space-y-2 mb-2">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Trip Milestone Handshake
            </h5>

            {currentMilestone === 'EN_ROUTE_AIRPORT' && (
              <button
                onClick={() => handleMilestoneAdvance('ARRIVED_CURB', 'At Airport Pickup Curb')}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Tap When Arrived at Airport Curb</span>
              </button>
            )}

            {currentMilestone === 'ARRIVED_CURB' && (
              <div className="space-y-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    Holding at Gate 04 (Frontdesk Notified)
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded">SYNCED</span>
                </div>

                <button
                  onClick={() => handleMilestoneAdvance('GUEST_BOARDED', 'Guest Boarded & Stowed')}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Guest Boarded — Start Journey to Resort</span>
                </button>
              </div>
            )}

            {currentMilestone === 'GUEST_BOARDED' && (
              <button
                onClick={() => handleMilestoneAdvance('COMPLETED', 'Trip Completed at Hotel Valet')}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Arrived at Resort Valet — Complete Trip</span>
              </button>
            )}

            {currentMilestone === 'COMPLETED' && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3 text-center space-y-1">
                <p className="text-xs font-bold text-emerald-300">Transit Completed Successfully</p>
                <p className="text-[11px] text-slate-300">
                  Curbside Handshake verified. 30% Escrow disbursed (₹1,350 net).
                </p>
                <button
                  onClick={() => setCurrentMilestone('EN_ROUTE_AIRPORT')}
                  className="mt-2 text-[11px] text-indigo-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Demo Simulator
                </button>
              </div>
            )}
          </div>

          {/* Emergency Standby / SOS Alert Button */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                showToast('🚨 SOS Sentinel Triggered: Standby vehicle re-dispatch requested.');
                if (onNotifyProperty) {
                  onNotifyProperty('EMERGENCY SOS: Chauffeur reported transit bottleneck. Standby car assigned.');
                }
              }}
              className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium rounded-xl border border-rose-500/30 flex items-center justify-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Chauffeur SOS / Request Standby Car</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
