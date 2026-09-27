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
      <div className="bg-gradient-to-r from-[#001830] via-[#002B4D] to-[#0A4D68] border border-[#00A9A5]/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00A9A5]/15 border border-[#00A9A5]/30 flex items-center justify-center text-[#00D2C4]">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-serif-luxury tracking-tight">
              StaySphere Chauffeur PWA Cockpit
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 dark:text-emerald-400 font-semibold border border-emerald-500/30">
                PWA Active
              </span>
            </h2>
            <p className="text-xs text-slate-300 dark:text-slate-400">
              Mobile-first driver operational cockpit with curb handshake, live flight radar & escrow unlock telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-sm ${
              deviceFrame
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white border-[#00D2C4]/50'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
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
              ? 'max-w-md bg-[#001428] border-4 border-slate-700/80 rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden'
              : 'w-full bg-[#001E36] border border-white/10 rounded-2xl p-6 shadow-xl'
          }`}
        >
          {/* Mobile Speaker / Camera Notch if deviceFrame */}
          {deviceFrame && (
            <div className="w-full flex justify-center mb-3">
              <div className="w-36 h-4 bg-slate-900 rounded-b-xl flex items-center justify-center gap-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Phone Status Bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-2 mb-3">
            <span className="font-semibold text-slate-900 dark:text-white">14:04</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">5G LTE</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">⚡ {batteryLevel}%</span>
            </div>
          </div>

          {/* Toast Alert */}
          {toastMessage && (
            <div className="mb-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 shadow-lg">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Chauffeur Identity Bar */}
          <div className="bg-[#001E36] border border-white/10 rounded-2xl p-3.5 mb-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
                GS
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight font-serif-luxury">Gurpreet Singh</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className="font-medium text-slate-800 dark:text-slate-300">Mercedes-Maybach S680</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">★ 4.96</span>
                </p>
                <span className="inline-block mt-1 text-[10px] font-mono text-[#0B3D91] dark:text-[#00D2C4] bg-[#0B3D91]/10 dark:bg-[#00A9A5]/15 px-1.5 py-0.5 rounded border border-[#0B3D91]/20 dark:border-[#00A9A5]/30 font-semibold">
                  GA-03-XX-0001
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2 py-0.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30">
                ACTIVE ASSIGNMENT
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">Trip: #MOV-8821</p>
            </div>
          </div>

          {/* Flight Telemetry Radar Card */}
          <div className="bg-[#002444] border border-white/10 rounded-2xl p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B3D91] dark:text-[#00D2C4]">
                <Plane className="w-3.5 h-3.5 text-[#00A9A5] dark:text-[#00D2C4] transform -rotate-45" />
                <span>Flight Inbound Radar</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                {flightStatus === 'LANDED' ? 'LANDED (ON_TIME)' : 'IN AIR'}
              </span>
            </div>

            <div className="flex items-center justify-between bg-[#001428] rounded-xl p-2.5 border border-white/10 mb-2">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Flight Number</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">IndiGo 6E-204</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">DEL ➔ MOPA (GOX)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium">Pickup Curb Gate</p>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Terminal 1, Pillar C4</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Baggage Belt 03</p>
              </div>
            </div>

            {/* Flight Delay Simulator Dropdown */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Simulate Telemetry:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setFlightStatus('LANDED');
                    showToast('Telemetry updated: Flight Landed On-Time');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    flightStatus === 'LANDED'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-white/10 hover:bg-white/15 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/10'
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
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    flightStatus === 'DELAYED_35'
                      ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                      : 'bg-white/10 hover:bg-white/15 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/10'
                  }`}
                >
                  +35m Delay
                </button>
              </div>
            </div>
          </div>

          {/* Guest VIP Contact Card */}
          <div className="bg-[#001E36] border border-white/10 rounded-2xl p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">VIP Guest Passenger</span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold rounded-full border border-amber-500/30">
                SOVEREIGN PLATINUM
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-serif-luxury">Vikram Malhotra</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">2 Adults • 2 Luggage Pieces</p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Prefers cabin temp at 21°C & quiet drive</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#0B3D91]/15 dark:bg-[#00A9A5]/20 text-[#0B3D91] dark:text-[#00D2C4] font-bold flex items-center justify-center text-xs border border-[#0B3D91]/30 dark:border-[#00A9A5]/30">
                VM
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast('Calling Guest Vikram Malhotra (+91 98200 12345)...')}
                className="py-2 px-3 bg-[#002B4D] hover:bg-[#003866] text-white rounded-xl text-xs font-semibold border border-[#00A9A5]/40 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#00D2C4]" />
                <span>Call Passenger</span>
              </button>
              <button
                onClick={() => showToast('Opening WhatsApp VIP Concierge thread...')}
                className="py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold border border-emerald-400/40 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp Guest</span>
              </button>
            </div>
          </div>

          {/* Navigation & Curb Handshake Radar */}
          <div className="bg-[#001E36] border border-white/10 rounded-2xl p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <Navigation className="w-3.5 h-3.5 text-[#00A9A5] dark:text-[#00D2C4]" />
                <span>Destination & Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Speed: {gpsSpeed} km/h
              </span>
            </div>

            <div className="bg-[#001428] rounded-xl p-3 border border-white/10 mb-3 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Pickup</p>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">MOPA Airport Terminal 1 Gate 04</p>
                </div>
              </div>
              <div className="border-l border-dashed border-slate-400 dark:border-slate-700 ml-1 h-3"></div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00D2C4] mt-1 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Drop-off Destination</p>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white font-serif-luxury">
                    The Grand Vagator Bay Resort & Oceanfront Villas
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">VIP Villa 101 Private Driveway</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px]">
                <Clock className="w-3 h-3 text-[#00A9A5] dark:text-[#00D2C4]" />
                <span>ETA to Resort:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{etaMinutes} mins</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                GPS: {coords.lat}, {coords.lng}
              </div>
            </div>
          </div>

          {/* Action Center: Big One-Tap Driver Milestones */}
          <div className="space-y-2 mb-2">
            <h5 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
              Trip Milestone Handshake
            </h5>

            {currentMilestone === 'EN_ROUTE_AIRPORT' && (
              <button
                onClick={() => handleMilestoneAdvance('ARRIVED_CURB', 'At Airport Pickup Curb')}
                className="w-full py-3.5 bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 border border-[#00D2C4]/40"
              >
                <Navigation className="w-4 h-4" />
                <span>Tap When Arrived at Airport Curb</span>
              </button>
            )}

            {currentMilestone === 'ARRIVED_CURB' && (
              <div className="space-y-2">
                <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                  <span className="flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Holding at Gate 04 (Frontdesk Notified)
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">SYNCED</span>
                </div>

                <button
                  onClick={() => handleMilestoneAdvance('GUEST_BOARDED', 'Guest Boarded & Stowed')}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 border border-emerald-400/40"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Guest Boarded — Start Journey to Resort</span>
                </button>
              </div>
            )}

            {currentMilestone === 'GUEST_BOARDED' && (
              <button
                onClick={() => handleMilestoneAdvance('COMPLETED', 'Trip Completed at Hotel Valet')}
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#FF8A3D] to-[#B45309] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 border border-[#FFC857]/40"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Arrived at Resort Valet — Complete Trip</span>
              </button>
            )}

            {currentMilestone === 'COMPLETED' && (
              <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-xl p-3 text-center space-y-1">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Transit Completed Successfully</p>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                  Curbside Handshake verified. 30% Escrow disbursed (₹1,350 net).
                </p>
                <button
                  onClick={() => setCurrentMilestone('EN_ROUTE_AIRPORT')}
                  className="mt-2 text-[11px] text-[#0B3D91] dark:text-[#00D2C4] font-semibold hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Demo Simulator
                </button>
              </div>
            )}
          </div>

          {/* Emergency Standby / SOS Alert Button */}
          <div className="pt-2 border-t border-slate-300 dark:border-white/10">
            <button
              onClick={() => {
                showToast('🚨 SOS Sentinel Triggered: Standby vehicle re-dispatch requested.');
                if (onNotifyProperty) {
                  onNotifyProperty('EMERGENCY SOS: Chauffeur reported transit bottleneck. Standby car assigned.');
                }
              }}
              className="w-full py-2.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-xl border border-rose-500/40 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
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
