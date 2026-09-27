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
      <div className="tower-header-bar p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00A9A5]/15 border border-[#00A9A5]/30 flex items-center justify-center text-[#00D2C4]">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tower-text-primary flex items-center gap-2 tower-title">
              StaySphere Chauffeur PWA Cockpit
              <span className="tower-badge tower-badge-emerald">
                PWA Active
              </span>
            </h2>
            <p className="text-xs tower-text-muted">
              Mobile-first driver operational cockpit with curb handshake, live flight radar & escrow unlock telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className={`px-3 py-1.5 text-xs ${deviceFrame ? 'tower-btn-primary' : 'tower-btn-secondary'}`}
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
              ? 'max-w-md tower-canvas border-4 border-slate-700/80 rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden'
              : 'w-full tower-card p-6'
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
          <div className="flex items-center justify-between text-[11px] tower-text-muted px-2 mb-3">
            <span className="font-semibold tower-text-primary">14:04</span>
            <div className="flex items-center gap-2">
              <span className="tower-badge tower-badge-emerald font-mono">5G LTE</span>
              <span className="font-medium tower-text-secondary">⚡ {batteryLevel}%</span>
            </div>
          </div>

          {/* Toast Alert */}
          {toastMessage && (
            <div className="mb-3 tower-badge tower-badge-emerald p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 shadow-lg w-full">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Chauffeur Identity Bar */}
          <div className="tower-card p-3.5 mb-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full tower-badge tower-badge-amber flex items-center justify-center font-bold text-sm">
                GS
              </div>
              <div>
                <h4 className="text-sm font-bold tower-text-primary leading-tight tower-title">Gurpreet Singh</h4>
                <p className="text-[11px] tower-text-muted flex items-center gap-1.5 mt-0.5">
                  <span className="font-medium tower-text-secondary">Mercedes-Maybach S680</span>
                  <span className="text-amber-500 font-semibold">★ 4.96</span>
                </p>
                <span className="inline-block mt-1 text-[10px] font-mono tower-badge tower-badge-cyan">
                  GA-03-XX-0001
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="tower-badge tower-badge-emerald">
                ACTIVE ASSIGNMENT
              </span>
              <p className="text-[10px] tower-text-muted mt-1 font-mono">Trip: #MOV-8821</p>
            </div>
          </div>

          {/* Flight Telemetry Radar Card */}
          <div className="tower-card-elevated p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold tower-text-primary">
                <Plane className="w-3.5 h-3.5 text-[#00A9A5] transform -rotate-45" />
                <span>Flight Inbound Radar</span>
              </div>
              <span className="tower-badge tower-badge-emerald">
                {flightStatus === 'LANDED' ? 'LANDED (ON_TIME)' : 'IN AIR'}
              </span>
            </div>

            <div className="tower-subcard p-2.5 mb-2 flex items-center justify-between">
              <div>
                <p className="text-[10px] tower-text-muted font-medium">Flight Number</p>
                <p className="text-xs font-bold tower-text-primary font-mono">IndiGo 6E-204</p>
                <p className="text-[10px] tower-text-muted">DEL ➔ MOPA (GOX)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] tower-text-muted font-medium">Pickup Curb Gate</p>
                <p className="text-xs font-bold text-emerald-500">Terminal 1, Pillar C4</p>
                <p className="text-[10px] tower-text-muted">Baggage Belt 03</p>
              </div>
            </div>

            {/* Flight Delay Simulator Dropdown */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="tower-text-muted font-medium">Simulate Telemetry:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setFlightStatus('LANDED');
                    showToast('Telemetry updated: Flight Landed On-Time');
                  }}
                  className={`px-2.5 py-1 text-[10px] ${
                    flightStatus === 'LANDED' ? 'tower-btn-emerald' : 'tower-btn-secondary'
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
                  className={`px-2.5 py-1 text-[10px] ${
                    flightStatus === 'DELAYED_35' ? 'tower-btn-emerald' : 'tower-btn-secondary'
                  }`}
                >
                  +35m Delay
                </button>
              </div>
            </div>
          </div>

          {/* Guest VIP Contact Card */}
          <div className="tower-card p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold tower-text-muted">VIP Guest Passenger</span>
              <span className="tower-badge tower-badge-gold">
                SOVEREIGN PLATINUM
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold tower-text-primary tower-title">Vikram Malhotra</h3>
                <p className="text-[11px] tower-text-secondary">2 Adults • 2 Luggage Pieces</p>
                <p className="text-[10px] text-emerald-500 font-medium">Prefers cabin temp at 21°C & quiet drive</p>
              </div>
              <div className="w-9 h-9 rounded-full tower-badge tower-badge-cyan flex items-center justify-center text-xs font-bold">
                VM
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast('Calling Guest Vikram Malhotra (+91 98200 12345)...')}
                className="tower-btn-secondary py-2 px-3 text-xs w-full"
              >
                <Phone className="w-3.5 h-3.5 text-[#00A9A5]" />
                <span>Call Passenger</span>
              </button>
              <button
                onClick={() => showToast('Opening WhatsApp VIP Concierge thread...')}
                className="tower-btn-emerald py-2 px-3 text-xs w-full"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Guest</span>
              </button>
            </div>
          </div>

          {/* Navigation & Curb Handshake Radar */}
          <div className="tower-card p-3.5 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold tower-text-primary">
                <Navigation className="w-3.5 h-3.5 text-[#00A9A5]" />
                <span>Destination & Telemetry</span>
              </div>
              <span className="text-[10px] font-mono tower-text-muted">
                Speed: {gpsSpeed} km/h
              </span>
            </div>

            <div className="tower-subcard p-3 mb-3 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] tower-text-muted font-medium">Pickup</p>
                  <p className="text-xs font-semibold tower-text-primary">MOPA Airport Terminal 1 Gate 04</p>
                </div>
              </div>
              <div className="border-l border-dashed border-slate-400/40 ml-1 h-3"></div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00D2C4] mt-1 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] tower-text-muted font-medium">Drop-off Destination</p>
                  <p className="text-xs font-semibold tower-text-primary tower-title">
                    The Grand Vagator Bay Resort & Oceanfront Villas
                  </p>
                  <p className="text-[10px] tower-text-muted">VIP Villa 101 Private Driveway</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1 tower-text-muted text-[11px]">
                <Clock className="w-3 h-3 text-[#00A9A5]" />
                <span>ETA to Resort:</span>
                <span className="font-bold tower-text-primary font-mono">{etaMinutes} mins</span>
              </div>
              <div className="text-[10px] font-mono tower-text-muted">
                GPS: {coords.lat}, {coords.lng}
              </div>
            </div>
          </div>

          {/* Action Center: Big One-Tap Driver Milestones */}
          <div className="space-y-2 mb-2">
            <h5 className="tower-label px-1">
              Trip Milestone Handshake
            </h5>

            {currentMilestone === 'EN_ROUTE_AIRPORT' && (
              <button
                onClick={() => handleMilestoneAdvance('ARRIVED_CURB', 'At Airport Pickup Curb')}
                className="w-full py-3.5 tower-btn-primary text-sm shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Tap When Arrived at Airport Curb</span>
              </button>
            )}

            {currentMilestone === 'ARRIVED_CURB' && (
              <div className="space-y-2">
                <div className="tower-badge tower-badge-emerald p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold w-full">
                  <span className="flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-4 h-4" />
                    Holding at Gate 04 (Frontdesk Notified)
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">SYNCED</span>
                </div>

                <button
                  onClick={() => handleMilestoneAdvance('GUEST_BOARDED', 'Guest Boarded & Stowed')}
                  className="w-full py-3.5 tower-btn-emerald text-sm shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Guest Boarded — Start Journey to Resort</span>
                </button>
              </div>
            )}

            {currentMilestone === 'GUEST_BOARDED' && (
              <button
                onClick={() => handleMilestoneAdvance('COMPLETED', 'Trip Completed at Hotel Valet')}
                className="w-full py-3.5 tower-btn-primary text-sm shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Arrived at Resort Valet — Complete Trip</span>
              </button>
            )}

            {currentMilestone === 'COMPLETED' && (
              <div className="tower-subcard p-3 text-center space-y-1">
                <p className="text-xs font-bold text-emerald-500">Transit Completed Successfully</p>
                <p className="text-[11px] tower-text-secondary">
                  Curbside Handshake verified. 30% Escrow disbursed (₹1,350 net).
                </p>
                <button
                  onClick={() => setCurrentMilestone('EN_ROUTE_AIRPORT')}
                  className="mt-2 text-[11px] tower-btn-subtle px-3 py-1.5 mx-auto font-semibold"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Demo Simulator
                </button>
              </div>
            )}
          </div>

          {/* Emergency Standby / SOS Alert Button */}
          <div className="pt-2 border-t border-slate-300/30">
            <button
              onClick={() => {
                showToast('🚨 SOS Sentinel Triggered: Standby vehicle re-dispatch requested.');
                if (onNotifyProperty) {
                  onNotifyProperty('EMERGENCY SOS: Chauffeur reported transit bottleneck. Standby car assigned.');
                }
              }}
              className="w-full py-2.5 tower-btn-danger text-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
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
