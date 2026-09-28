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
  Maximize2,
  CheckCircle2,
  MapPin,
  Activity,
  Wifi,
  Star,
  Car,
  ChevronRight
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

  const milestoneIndex =
    currentMilestone === 'EN_ROUTE_AIRPORT'
      ? 0
      : currentMilestone === 'ARRIVED_CURB'
      ? 1
      : currentMilestone === 'GUEST_BOARDED' || currentMilestone === 'IN_TRANSIT'
      ? 2
      : 3;

  return (
    <div className="space-y-6">
      {/* Top Banner / Device Frame Switcher */}
      <div className="tower-header-bar p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        {/* Ambient radial glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#00D2C4]/15 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A9A5]/30 to-[#0B3D91]/40 border border-[#00A9A5]/50 flex items-center justify-center text-[#00D2C4] shadow-[0_0_20px_rgba(0,210,196,0.3)]">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tower-text-primary flex items-center gap-2.5 tower-title">
              StaySphere Chauffeur PWA Cockpit
              <span className="tower-badge tower-badge-emerald shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PWA Active
              </span>
            </h2>
            <p className="text-xs tower-text-muted mt-0.5">
              Mobile-first driver operational cockpit with curb handshake, live flight radar & escrow unlock telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 ${
              deviceFrame ? 'tower-btn-primary' : 'tower-btn-secondary'
            }`}
          >
            {deviceFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{deviceFrame ? 'Device Frame Mode' : 'Full Canvas Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex justify-center">
        <div
          className={`transition-all duration-300 ${
            deviceFrame
              ? 'tower-phone-chassis'
              : 'w-full tower-card p-6 shadow-2xl'
          }`}
        >
          {/* Mobile Speaker / Camera Notch if deviceFrame */}
          {deviceFrame && (
            <div className="w-full flex justify-center mb-3">
              <div className="w-28 h-4 bg-slate-950/90 rounded-full flex items-center justify-center gap-2 border border-white/10 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-slate-800 ring-1 ring-blue-500/40" />
                <div className="w-8 h-1 bg-slate-800 rounded-full" />
              </div>
            </div>
          )}

          {/* Phone Status Bar */}
          <div className="flex items-center justify-between text-[11px] tower-text-muted px-2 mb-3">
            <span className="font-bold tower-text-primary font-mono tracking-tight">14:04</span>
            <div className="flex items-center gap-2.5">
              <span className="tower-badge tower-badge-emerald font-mono flex items-center gap-1 text-[10px]">
                <Wifi className="w-3 h-3" />
                5G LTE
              </span>
              <span className="font-semibold tower-text-secondary font-mono flex items-center gap-1">
                ⚡ {batteryLevel}%
              </span>
            </div>
          </div>

          {/* Toast Alert */}
          {toastMessage && (
            <div className="mb-3.5 tower-badge tower-badge-emerald p-3 rounded-xl text-xs font-medium flex items-center gap-2.5 shadow-xl w-full animate-slide-in">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span className="leading-snug">{toastMessage}</span>
            </div>
          )}

          {/* Chauffeur Identity Bar */}
          <div className="tower-card p-4 mb-3.5 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full tower-badge-amber border-2 border-amber-400/50 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(255,200,87,0.25)] shrink-0">
                GS
              </div>
              <div>
                <h4 className="text-sm font-bold tower-text-primary leading-tight tower-title">Gurpreet Singh</h4>
                <p className="text-[11px] tower-text-muted flex items-center gap-1.5 mt-0.5">
                  <span className="font-medium tower-text-secondary flex items-center gap-1">
                    <Car className="w-3 h-3 text-[#00A9A5]" />
                    Mercedes-Maybach S680
                  </span>
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500" /> 4.96
                  </span>
                </p>
                <span className="inline-block mt-1 text-[10px] font-mono tower-badge tower-badge-cyan font-bold tracking-wider">
                  GA-03-XX-0001
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="tower-badge tower-badge-emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE ASSIGNMENT
              </span>
              <p className="text-[10px] tower-text-muted mt-1 font-mono font-semibold">Trip: #MOV-8821</p>
            </div>
          </div>

          {/* Flight Telemetry Radar Card */}
          <div className="tower-card-elevated p-4 mb-3.5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold tower-text-primary font-mono tracking-wide">
                <div className="w-5 h-5 rounded-full bg-[#00A9A5]/20 flex items-center justify-center">
                  <Plane className="w-3.5 h-3.5 text-[#00D2C4] transform -rotate-45" />
                </div>
                <span>LIVE FLIGHT RADAR</span>
              </div>
              <span className="tower-badge tower-badge-emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {flightStatus === 'LANDED' ? 'LANDED (ON_TIME)' : 'IN AIR'}
              </span>
            </div>

            <div className="tower-subcard p-3 mb-2.5 flex items-center justify-between">
              <div>
                <p className="text-[10px] tower-text-muted font-medium uppercase tracking-wider">Flight Number</p>
                <p className="text-xs font-bold tower-text-primary font-mono tracking-wide">IndiGo 6E-204</p>
                <p className="text-[10px] tower-text-muted font-medium">DEL ➔ MOPA (GOX)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] tower-text-muted font-medium uppercase tracking-wider">Pickup Curb Gate</p>
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
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                    flightStatus === 'LANDED' ? 'tower-btn-emerald shadow-sm' : 'tower-btn-secondary'
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
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                    flightStatus === 'DELAYED_35' ? 'tower-btn-emerald shadow-sm' : 'tower-btn-secondary'
                  }`}
                >
                  +35m Delay
                </button>
              </div>
            </div>
          </div>

          {/* Guest VIP Contact Card */}
          <div className="tower-card-luxury p-4 mb-3.5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-semibold tower-text-muted uppercase tracking-wider">VIP Guest Passenger</span>
              <span className="tower-badge tower-badge-gold">
                ★ SOVEREIGN PLATINUM
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold tower-text-primary tower-title">Vikram Malhotra</h3>
                <p className="text-[11px] tower-text-secondary mt-0.5">2 Adults • 2 Luggage Pieces</p>
                <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3" /> Prefers cabin temp at 21°C & quiet drive
                </p>
              </div>
              <div className="w-10 h-10 rounded-full tower-badge tower-badge-cyan flex items-center justify-center text-xs font-bold shadow-md shrink-0">
                VM
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast('Calling Guest Vikram Malhotra (+91 98200 12345)...')}
                className="tower-btn-secondary py-2.5 px-3 text-xs font-bold w-full shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#00A9A5]" />
                <span>Call Passenger</span>
              </button>
              <button
                onClick={() => showToast('Opening WhatsApp VIP Concierge thread...')}
                className="tower-btn-emerald py-2.5 px-3 text-xs font-bold w-full shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Guest</span>
              </button>
            </div>
          </div>

          {/* Navigation & Curb Handshake Radar */}
          <div className="tower-card p-4 mb-3.5 shadow-lg">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold tower-text-primary">
                <Navigation className="w-3.5 h-3.5 text-[#00A9A5]" />
                <span>Destination & Telemetry</span>
              </div>
              <span className="text-[10px] font-mono tower-text-muted flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#00D2C4]" />
                Speed: {gpsSpeed} km/h
              </span>
            </div>

            <div className="tower-subcard p-3 mb-3 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 shrink-0 ring-4 ring-emerald-500/10">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] tower-text-muted font-medium uppercase tracking-wider">Pickup</p>
                  <p className="text-xs font-semibold tower-text-primary">MOPA Airport Terminal 1 Gate 04</p>
                </div>
              </div>
              <div className="border-l-2 border-dashed border-[#00A9A5]/40 ml-2.5 h-3.5" />
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#00A9A5]/20 flex items-center justify-center mt-0.5 shrink-0 ring-4 ring-[#00D2C4]/10">
                  <MapPin className="w-3 h-3 text-[#00D2C4]" />
                </div>
                <div>
                  <p className="text-[10px] tower-text-muted font-medium uppercase tracking-wider">Drop-off Destination</p>
                  <p className="text-xs font-semibold tower-text-primary tower-title">
                    The Grand Vagator Bay Resort & Oceanfront Villas
                  </p>
                  <p className="text-[10px] tower-text-muted">VIP Villa 101 Private Driveway</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1.5 tower-text-muted text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#00A9A5]" />
                <span>ETA to Resort:</span>
                <span className="font-bold tower-text-primary font-mono">{etaMinutes} mins</span>
              </div>
              <div className="text-[10px] font-mono tower-text-muted">
                GPS: {coords.lat}, {coords.lng}
              </div>
            </div>
          </div>

          {/* Action Center: Big One-Tap Driver Milestones */}
          <div className="space-y-2.5 mb-2">
            <div className="flex items-center justify-between px-1">
              <h5 className="tower-label">
                Trip Milestone Progression
              </h5>
              <span className="text-[10px] font-mono tower-text-muted">
                Step {milestoneIndex + 1} of 4
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-4 gap-1.5 px-0.5 mb-2">
              {['Dispatched', 'At Curb', 'Boarded', 'Valet Done'].map((step, idx) => (
                <div key={step} className="text-center">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx <= milestoneIndex
                        ? 'bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] shadow-[0_0_8px_rgba(60,207,145,0.4)]'
                        : 'bg-white/10'
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono block mt-1 ${
                      idx <= milestoneIndex ? 'tower-text-primary font-bold' : 'tower-text-muted'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {currentMilestone === 'EN_ROUTE_AIRPORT' && (
              <button
                onClick={() => handleMilestoneAdvance('ARRIVED_CURB', 'At Airport Pickup Curb')}
                className="w-full py-3.5 tower-btn-primary text-sm shadow-[0_10px_25px_rgba(0,169,165,0.35)] flex items-center justify-center gap-2 group"
              >
                <Navigation className="w-4 h-4" />
                <span>Tap When Arrived at Airport Curb</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {currentMilestone === 'ARRIVED_CURB' && (
              <div className="space-y-2.5">
                <div className="tower-badge tower-badge-emerald p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold w-full shadow-md">
                  <span className="flex items-center gap-2 font-medium">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    Holding at Gate 04 (Frontdesk Notified)
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded font-bold shadow-sm">
                    SYNCED
                  </span>
                </div>

                <button
                  onClick={() => handleMilestoneAdvance('GUEST_BOARDED', 'Guest Boarded & Stowed')}
                  className="w-full py-3.5 tower-btn-emerald text-sm shadow-[0_10px_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Guest Boarded — Start Journey to Resort</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {currentMilestone === 'GUEST_BOARDED' && (
              <button
                onClick={() => handleMilestoneAdvance('COMPLETED', 'Trip Completed at Hotel Valet')}
                className="w-full py-3.5 tower-btn-primary text-sm shadow-[0_10px_25px_rgba(0,169,165,0.35)] flex items-center justify-center gap-2 group"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Arrived at Resort Valet — Complete Trip</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {currentMilestone === 'COMPLETED' && (
              <div className="tower-subcard p-3.5 text-center space-y-1.5 shadow-md">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-emerald-500">Transit Completed Successfully</p>
                <p className="text-[11px] tower-text-secondary">
                  Curbside Handshake verified. 30% Escrow disbursed (₹1,350 net).
                </p>
                <button
                  onClick={() => setCurrentMilestone('EN_ROUTE_AIRPORT')}
                  className="mt-2 text-[11px] tower-btn-subtle px-3 py-1.5 mx-auto font-semibold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Demo Simulator
                </button>
              </div>
            )}
          </div>

          {/* Emergency Standby / SOS Alert Button */}
          <div className="pt-2.5 border-t border-slate-300/30">
            <button
              onClick={() => {
                showToast('🚨 SOS Sentinel Triggered: Standby vehicle re-dispatch requested.');
                if (onNotifyProperty) {
                  onNotifyProperty('EMERGENCY SOS: Chauffeur reported transit bottleneck. Standby car assigned.');
                }
              }}
              className="w-full py-2.5 tower-btn-danger text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
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
