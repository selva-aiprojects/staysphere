import { useState } from 'react';
import {
  Car,
  Plane,
  CheckCircle2,
  ShieldCheck,
  Plus,
  Navigation,
  DollarSign,
  MessageSquare,
} from 'lucide-react';

export interface FleetVehicle {
  id: string;
  driverName: string;
  driverPhone: string;
  vehicleModel: string;
  licensePlate: string;
  vehicleTier: 'MAYBACH_FIRST_CLASS' | 'DEFENDER_EXPEDITION' | 'AIRBUS_CHOPPER';
  assignedGuest: string;
  guestFlightCode: string;
  route: string;
  telematicsStatus: 'LANDED_EN_ROUTE' | 'BOARDING_TERMINAL' | 'IN_TRANSIT' | 'ARRIVED_AT_ESTATE' | 'STANDBY';
  etaMinutes: number;
  onTimeScore: number;
  tripPayout: number;
  payoutStatus: 'ESCROW_RELEASED' | 'ESCROW_LOCKED';
}

export const INITIAL_FLEET: FleetVehicle[] = [
  {
    id: 'flt-1',
    driverName: 'Gurpreet Singh',
    driverPhone: '+91 98201 44552',
    vehicleModel: 'Mercedes-Maybach S680 (Obsidian Black)',
    licensePlate: 'GA-03-MB-0001',
    vehicleTier: 'MAYBACH_FIRST_CLASS',
    assignedGuest: 'Vikram Malhotra & Family',
    guestFlightCode: '6E-204 (DEL -> GOI)',
    route: 'Mopa International (GOX) -> The Vana Azure Estate',
    telematicsStatus: 'LANDED_EN_ROUTE',
    etaMinutes: 24,
    onTimeScore: 99.8,
    tripPayout: 8500,
    payoutStatus: 'ESCROW_LOCKED',
  },
  {
    id: 'flt-2',
    driverName: 'Rameshwar Sharma',
    driverPhone: '+91 99112 88341',
    vehicleModel: 'Land Rover Defender 110 (Santorini Black)',
    licensePlate: 'RJ-27-DF-9999',
    vehicleTier: 'DEFENDER_EXPEDITION',
    assignedGuest: 'Dr. Siddharth & Rhea Singhania',
    guestFlightCode: 'AI-471 (BOM -> UDR)',
    route: 'Maharana Pratap Airport (UDR) -> Maharaja Pichola Palace',
    telematicsStatus: 'ARRIVED_AT_ESTATE',
    etaMinutes: 0,
    onTimeScore: 100.0,
    tripPayout: 6200,
    payoutStatus: 'ESCROW_RELEASED',
  },
  {
    id: 'flt-3',
    driverName: 'Capt. Arjan Dev',
    driverPhone: '+91 97110 33419',
    vehicleModel: 'Airbus H130 Executive Helicopter',
    licensePlate: 'VT-SS-HELI',
    vehicleTier: 'AIRBUS_CHOPPER',
    assignedGuest: 'Elena Rostova (Executive Retinue)',
    guestFlightCode: 'Private Hangar 4 (BOM)',
    route: 'Juhu Helipad -> Mumbai Sky Penthouse Rooftop',
    telematicsStatus: 'STANDBY',
    etaMinutes: 10,
    onTimeScore: 99.4,
    tripPayout: 45000,
    payoutStatus: 'ESCROW_LOCKED',
  },
];

interface TravelDeskWorkflowProps {
  onOpenTicketsModal: () => void;
  showToast: (msg: string) => void;
}

export function TravelDeskWorkflow({ onOpenTicketsModal, showToast }: TravelDeskWorkflowProps) {
  const [fleet, setFleet] = useState<FleetVehicle[]>(INITIAL_FLEET);
  const [isFleetOnboardingOpen, setIsFleetOnboardingOpen] = useState<boolean>(false);

  // New Fleet Form
  const [newFleetForm, setNewFleetForm] = useState({
    driverName: '',
    driverPhone: '',
    vehicleModel: 'Mercedes-Maybach S680',
    licensePlate: '',
    vehicleTier: 'MAYBACH_FIRST_CLASS' as FleetVehicle['vehicleTier'],
  });

  // Action: Advance Telematics status
  const handleUpdateStatus = (vehicleId: string, nextStatus: FleetVehicle['telematicsStatus']) => {
    setFleet((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          const isArrived = nextStatus === 'ARRIVED_AT_ESTATE';
          return {
            ...v,
            telematicsStatus: nextStatus,
            payoutStatus: isArrived ? 'ESCROW_RELEASED' : v.payoutStatus,
            etaMinutes: isArrived ? 0 : Math.max(5, v.etaMinutes - 10),
          };
        }
        return v;
      })
    );
    showToast(`Chauffeur telematics updated: ${nextStatus.replace(/_/g, ' ')}`);
  };

  const handleOnboardVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFleetForm.driverName.trim() || !newFleetForm.licensePlate.trim()) return;

    const newRecord: FleetVehicle = {
      id: `flt-${Date.now()}`,
      driverName: newFleetForm.driverName,
      driverPhone: newFleetForm.driverPhone || '+91 98000 00000',
      vehicleModel: newFleetForm.vehicleModel,
      licensePlate: newFleetForm.licensePlate,
      vehicleTier: newFleetForm.vehicleTier,
      assignedGuest: 'Unassigned (Available on Standby)',
      guestFlightCode: 'Flight API Synced',
      route: 'Airport Priority Chauffeur Bay',
      telematicsStatus: 'STANDBY',
      etaMinutes: 15,
      onTimeScore: 100.0,
      tripPayout: 7500,
      payoutStatus: 'ESCROW_LOCKED',
    };

    setFleet([newRecord, ...fleet]);
    setIsFleetOnboardingOpen(false);
    setNewFleetForm({ driverName: '', driverPhone: '', vehicleModel: 'Mercedes-Maybach S680', licensePlate: '', vehicleTier: 'MAYBACH_FIRST_CLASS' });
    showToast(`Luxury vehicle "${newRecord.vehicleModel}" onboarded to fleet!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white tracking-wide">Travel Desk & Luxury Fleet Telemetry</h1>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Live Flight & Chauffeur Radar
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Real-time synchronization between Mercedes-Maybach chauffeurs, private charters, flight radars, and hotel frontdesks.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTicketsModal}
            className="px-4 py-2.5 rounded-2xl bg-[#002B4D] hover:bg-[#003866] border border-amber-500/40 text-white text-xs font-bold transition-all shadow flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Driver & Transit Tickets (2 Active)</span>
          </button>

          <button
            onClick={() => setIsFleetOnboardingOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#3CCF91] text-white text-xs font-bold transition-all shadow-lg hover:brightness-110 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Onboard Fleet Vehicle</span>
          </button>
        </div>
      </div>

      {/* Fleet Telemetry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">Active Fleet Vehicles</div>
            <div className="text-2xl font-black text-white whitespace-nowrap">{fleet.length} Chauffeurs</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A9A5]/20 to-[#00A9A5]/40 text-[#00A9A5] flex items-center justify-center shrink-0">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">Flight Radar Sync</div>
            <div className="text-2xl font-black text-white whitespace-nowrap">100% On-Time</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3CCF91]/20 to-[#3CCF91]/40 text-[#3CCF91] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">On-Time Performance</div>
            <div className="text-2xl font-black text-white whitespace-nowrap">99.8% OTP</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">Transit Escrow Pool</div>
            <div className="text-2xl font-black text-white whitespace-nowrap">₹59,700</div>
          </div>
        </div>
      </div>

      {/* Live Transit & Dispatch Feed */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Active VIP Airport Transits & Driver Telematics</span>
          </h3>
          <span className="text-xs text-slate-400 whitespace-nowrap shrink-0">Live GPS Polling • 30s Interval</span>
        </div>

        <div className="space-y-4">
          {fleet.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#001428] border border-white/10 hover:border-amber-500/40 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#002B4D] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">{item.vehicleModel}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 font-bold whitespace-nowrap shrink-0">
                      {item.licensePlate}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                    <span className="whitespace-nowrap">
                      Chauffeur: <strong className="text-slate-200">{item.driverName}</strong> ({item.driverPhone})
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="whitespace-nowrap">
                      Guest: <strong className="text-[#3CCF91]">{item.assignedGuest}</strong>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-cyan-300 font-mono font-bold whitespace-nowrap shrink-0">{item.guestFlightCode}</span>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0">
                <div className="text-left lg:text-right">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.telematicsStatus === 'ARRIVED_AT_ESTATE'
                          ? 'bg-emerald-400'
                          : 'bg-amber-400 animate-ping'
                      }`}
                    />
                    <span className="text-xs font-bold text-white whitespace-nowrap">{item.telematicsStatus.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 whitespace-nowrap">
                    {item.etaMinutes > 0 ? `ETA: ~${item.etaMinutes} mins` : 'Arrived at Villa Doorstep'}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.telematicsStatus === 'LANDED_EN_ROUTE' && (
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'BOARDING_TERMINAL')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Mark Guest Boarded
                    </button>
                  )}

                  {item.telematicsStatus === 'BOARDING_TERMINAL' && (
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'IN_TRANSIT')}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Depart to Villa
                    </button>
                  )}

                  {item.telematicsStatus === 'IN_TRANSIT' && (
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'ARRIVED_AT_ESTATE')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Confirm Arrival & Settle ₹{item.tripPayout}
                    </button>
                  )}

                  {item.telematicsStatus === 'ARRIVED_AT_ESTATE' && (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1 whitespace-nowrap shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Payout Settled
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Fleet Modal */}
      {isFleetOnboardingOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001E36] border border-amber-500/50 rounded-3xl w-full max-w-xl p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Onboard Chauffeur & Luxury Vehicle</h3>
                <p className="text-xs text-slate-400">Add to StaySphere VIP Airport Transit Fleet</p>
              </div>
              <button
                onClick={() => setIsFleetOnboardingOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOnboardVehicleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Chauffeur Full Name</label>
                  <input
                    type="text"
                    value={newFleetForm.driverName}
                    onChange={(e) => setNewFleetForm({ ...newFleetForm, driverName: e.target.value })}
                    placeholder="e.g. Jaswinder Singh"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile / Direct Phone</label>
                  <input
                    type="tel"
                    value={newFleetForm.driverPhone}
                    onChange={(e) => setNewFleetForm({ ...newFleetForm, driverPhone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Vehicle Model</label>
                  <input
                    type="text"
                    value={newFleetForm.vehicleModel}
                    onChange={(e) => setNewFleetForm({ ...newFleetForm, vehicleModel: e.target.value })}
                    placeholder="e.g. Mercedes-Maybach S680"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Registration / Plate No.</label>
                  <input
                    type="text"
                    value={newFleetForm.licensePlate}
                    onChange={(e) => setNewFleetForm({ ...newFleetForm, licensePlate: e.target.value })}
                    placeholder="e.g. DL-01-AB-1234"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>5-Star Luxury Chauffeur Compliance Checklist:</span>
                </div>
                <p>✓ Police background clearance verified</p>
                <p>✓ In-vehicle San Pellegrino & chilled towel protocol active</p>
                <p>✓ GPS OBD-II telematics paired with StaySphere Central Radar</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFleetOnboardingOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110"
                >
                  Authorize Chauffeur & Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
