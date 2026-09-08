import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  DollarSign,
  UserCheck,
  Zap,
  Car
} from 'lucide-react';
import { ProactiveResolutionTicket } from '@staysphere/domain-types';

interface IncidentItem extends ProactiveResolutionTicket {
  guestName: string;
  guestPhone: string;
  journeyReference: string;
  property: string;
  vehicle: string;
  escrowHold: number;
  description: string;
  compensationCredited?: number;
}

const INITIAL_INCIDENTS: IncidentItem[] = [
  {
    id: 'TICK-SLA-902',
    ticketNumber: 'TICK-SLA-902',
    journeyReference: 'JN-SS-2026-5541',
    category: 'TRANSIT_DELAY',
    subject: 'Chauffeur delayed by Bhuntar valley landslide detour',
    description: 'Guest Rohan Mehta awaiting airport pickup. Vehicle rerouted via Pandoh bypass. Delay is +22 mins.',
    severity: 'P1_HIGH',
    status: 'IN_TRIAGE',
    slaTargetMinutes: 15,
    elapsedMinutes: 6,
    assignedAgent: 'Siddharth Rao (Lead Transit RM)',
    slaBreachDeadline: '2026-09-08T08:00:00Z',
    isBreached: false,
    compensationCredited: 3000,
    guestName: 'Rohan & Tara Mehta',
    guestPhone: '+91 97110 55442',
    property: 'Solang Valley Pine Chalet, Manali',
    vehicle: 'Toyota Land Cruiser Prado (HP-01-EA-5512)',
    escrowHold: 112000,
  },
  {
    id: 'TICK-SLA-905',
    ticketNumber: 'TICK-SLA-905',
    journeyReference: 'JN-SS-2026-9041',
    category: 'ROOM_PREPARATION',
    subject: 'NFC Digital Pass re-sync requested for Ocean Suite 402',
    description: 'Guest requested secondary NFC badge access for family member on iOS device.',
    severity: 'P2_MEDIUM',
    status: 'OPEN',
    slaTargetMinutes: 15,
    elapsedMinutes: 3,
    assignedAgent: 'Kavita Nair (Goa Property Desk)',
    slaBreachDeadline: '2026-09-08T15:15:00Z',
    isBreached: false,
    compensationCredited: 0,
    guestName: 'Vikramaditya Singhania',
    guestPhone: '+91 98200 11223',
    property: 'Azura Cliff Villa, Sinquerim',
    vehicle: 'Maybach S-Class (GA-07-EA-9901)',
    escrowHold: 127680,
  },
  {
    id: 'TICK-SLA-881',
    ticketNumber: 'TICK-SLA-881',
    journeyReference: 'JN-SS-2026-4412',
    category: 'ESCROW_ADJUSTMENT',
    subject: 'Excursion Weather Cancellation Partial Refund',
    description: 'High monsoon tides prompted safety postponement of speedboat tour. Escrow refund triggered.',
    severity: 'P1_HIGH',
    status: 'RESOLVED',
    slaTargetMinutes: 15,
    elapsedMinutes: 8,
    assignedAgent: 'Amitabh Sen (Head of Escrow Desk)',
    slaBreachDeadline: '2026-09-08T11:00:00Z',
    isBreached: false,
    compensationCredited: 6000,
    guestName: 'Devika Singhal',
    guestPhone: '+91 98330 11445',
    property: 'Royal Lake Palace, Udaipur',
    vehicle: 'Defender 110 (RJ-27-UB-4402)',
    escrowHold: 95000,
  },
];

export const SlaResolutionMonitoring: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentItem[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem | null>(INITIAL_INCIDENTS[0]);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // SLA ticker increment simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setIncidents((prev) =>
        prev.map((item) => {
          if (item.status === 'IN_TRIAGE' || item.status === 'OPEN') {
            return { ...item, elapsedMinutes: Math.min(item.elapsedMinutes + 1, 20) };
          }
          return item;
        })
      );
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleResolve = (id: string) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'RESOLVED' as const } : item
      )
    );
    showToast(`Ticket ${id} marked as RESOLVED within Sovereign 15m SLA guarantee`);
  };

  const handleApplyCompensation = (id: string, amount: number) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              compensationCredited: (item.compensationCredited || 0) + amount,
            }
          : item
      )
    );
    showToast(`Instant ₹${amount.toLocaleString()} Escrow compensation released to guest wallet`);
  };

  const filtered = incidents.filter((inc) => {
    if (filterSeverity === 'P0' && inc.severity !== 'P0_CRITICAL') return false;
    if (filterSeverity === 'P1' && inc.severity !== 'P1_HIGH') return false;
    if (filterSeverity === 'P2' && inc.severity !== 'P2_MEDIUM') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002B4D] border border-[#3CCF91] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#3CCF91]" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#200A10] via-[#002B4D] to-[#0A4D68] border border-rose-500/20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              Proactive Resolution Sentinel & SLA Guard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              15-Minute Guaranteed SLA & Escrow Protection Desk
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Real-time issue triage before the guest experiences friction. Automatic compensatory escrow payouts upon milestone delay.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block whitespace-nowrap">Average Resolution</span>
              <strong className="text-xl font-black text-[#3CCF91] whitespace-nowrap">4.8 Mins</strong>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
              <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider block whitespace-nowrap">Active Incidents</span>
              <strong className="text-xl font-black text-rose-300 whitespace-nowrap">
                {incidents.filter((i) => i.status !== 'RESOLVED').length} Open
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-[#00A9A5]/10 border border-[#00A9A5]/30">
              <span className="text-[10px] text-[#00A9A5] font-bold uppercase tracking-wider block whitespace-nowrap">Auto-Compensations</span>
              <strong className="text-xl font-black text-[#00A9A5] whitespace-nowrap">₹9,000 Today</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main SLA Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Incidents Queue */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#001D33] border border-white/10">
            <span className="text-xs font-bold text-slate-300 whitespace-nowrap">Filter Severity:</span>
            <div className="flex gap-1.5 shrink-0">
              {['ALL', 'P0', 'P1', 'P2'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filterSeverity === sev
                      ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((item) => {
              const remaining = item.slaTargetMinutes - item.elapsedMinutes;
              const isBreachRisk = remaining <= 5 && item.status !== 'RESOLVED';
              const isSelected = selectedIncident?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIncident(item)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg shadow-[#00A9A5]/10'
                      : 'bg-[#001D33] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase whitespace-nowrap shrink-0 ${
                          item.severity === 'P0_CRITICAL'
                            ? 'bg-rose-600 text-white animate-pulse'
                            : item.severity === 'P1_HIGH'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}
                      >
                        {item.severity.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-300 whitespace-nowrap">{item.ticketNumber}</span>
                    </div>

                    {item.status === 'RESOLVED' ? (
                      <span className="text-[10px] font-bold text-[#3CCF91] flex items-center gap-1 whitespace-nowrap shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Resolved
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 whitespace-nowrap shrink-0 ${
                          isBreachRisk ? 'bg-rose-500 text-white animate-ping' : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        <Clock className="w-3 h-3 shrink-0" /> {remaining > 0 ? `${remaining}m SLA Left` : 'SLA Breach (Escalated)'}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-white text-sm mt-2 line-clamp-1">{item.subject}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-3 border-t border-white/5 gap-2">
                    <span className="truncate">Guest: <strong className="text-slate-200">{item.guestName}</strong></span>
                    <span className="whitespace-nowrap shrink-0">Ref: <strong className="text-slate-200 font-mono">{item.journeyReference}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Incident Triage & Escrow Release Console */}
        <div className="lg:col-span-7 space-y-5">
          {selectedIncident ? (
            <div className="p-6 rounded-2xl bg-[#001D33] border border-white/10 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 whitespace-nowrap shrink-0">
                      {selectedIncident.severity.replace(/_/g, ' ')} SLA INCIDENT
                    </span>
                    <span className="text-xs font-mono text-slate-400 whitespace-nowrap">{selectedIncident.ticketNumber}</span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-1 leading-snug">{selectedIncident.subject}</h3>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block whitespace-nowrap">15-Min Guaranteed Timer</span>
                  <strong className="text-2xl font-mono font-black text-[#FFC857] whitespace-nowrap">
                    {Math.max(0, selectedIncident.slaTargetMinutes - selectedIncident.elapsedMinutes)}:00 Left
                  </strong>
                </div>
              </div>

              {/* Journey & Stakeholder Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2 text-xs">
                  <div className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-blue-400 whitespace-nowrap">
                    <UserCheck className="w-3.5 h-3.5 shrink-0" /> Guest & Journey Entity
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400 whitespace-nowrap">Guest Name:</span>
                    <strong className="text-white truncate text-right">{selectedIncident.guestName}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400 whitespace-nowrap">Phone:</span>
                    <strong className="text-white font-mono whitespace-nowrap">{selectedIncident.guestPhone}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400 whitespace-nowrap">Journey Code:</span>
                    <strong className="text-[#00A9A5] font-mono whitespace-nowrap">{selectedIncident.journeyReference}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2 text-xs">
                  <div className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-400 whitespace-nowrap">
                    <Car className="w-3.5 h-3.5 shrink-0" /> Chauffeur & Estate
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400 whitespace-nowrap">Vehicle:</span>
                    <strong className="text-white truncate max-w-[170px] text-right">{selectedIncident.vehicle}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400 whitespace-nowrap">Property:</span>
                    <strong className="text-white truncate max-w-[170px] text-right">{selectedIncident.property}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400 whitespace-nowrap">Assigned RM:</span>
                    <strong className="text-[#3CCF91] truncate text-right">{selectedIncident.assignedAgent}</strong>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Incident Telemetry Log</span>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedIncident.description}</p>
              </div>

              {/* Instant Resolution & Escrow Action Bar */}
              <div className="p-5 rounded-2xl bg-[#002844] border border-[#00A9A5]/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#00A9A5] shrink-0" />
                    <h4 className="text-sm font-black text-white">Sovereign Proactive Actions & Compensation</h4>
                  </div>
                  <span className="text-xs text-slate-300 whitespace-nowrap">
                    Escrow Protected: <strong className="text-[#3CCF91]">₹{selectedIncident.escrowHold.toLocaleString()}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleApplyCompensation(selectedIncident.id, 3000)}
                    className="py-2.5 px-3 rounded-xl bg-[#3CCF91]/20 hover:bg-[#3CCF91]/30 text-[#3CCF91] font-bold text-xs border border-[#3CCF91]/40 flex items-center justify-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <DollarSign className="w-4 h-4 shrink-0" /> <span>Credit ₹3,000 Auto-SLA</span>
                  </button>
                  <button
                    onClick={() => showToast(`Emergency Chauffeur dispatch pinged for ${selectedIncident.journeyReference}`)}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center justify-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <Zap className="w-4 h-4 shrink-0" /> <span>Dispatch Backup Car</span>
                  </button>
                  <button
                    onClick={() => handleResolve(selectedIncident.id)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all whitespace-nowrap cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#3CCF91] shrink-0" /> <span>Close & Resolve (SLA Met)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#001D33] border border-white/10 text-center text-slate-400">
              Select an incident from the queue to review real-time telematics and issue resolution actions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
