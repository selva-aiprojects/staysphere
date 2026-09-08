'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  Car,
  Hotel,
  Lock,
  MessageSquare,
  X,
  CheckCircle2,
  Send,
} from 'lucide-react';

interface ProactiveResolveSentinelProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  journeyReference?: string;
}

export function ProactiveResolveSentinel({
  isOpen,
  onClose,
  defaultCategory = 'TRANSIT_DELAY',
  journeyReference = 'JN-SS-2026-9041',
}: ProactiveResolveSentinelProps) {
  const [category, setCategory] = useState<string>(defaultCategory);
  const [description, setDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<'NORMAL' | 'URGENT_P1' | 'CRITICAL_P0'>('URGENT_P1');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdTicketId, setCreatedTicketId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNum = `TKT-SLA-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedTicketId(ticketNum);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#001E36] border border-[#FF8A3D]/50 rounded-3xl w-full max-w-xl p-6 md:p-8 shadow-2xl animate-scale-up space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A3D] animate-ping" />
              <h3 className="text-lg font-bold text-white tracking-wide">Proactive Resolution Sentinel</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Journey Ref: <strong className="text-white font-mono">{journeyReference}</strong> • 15-Minute Guaranteed SLA Response
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-white">Resolution Ticket Dispatched!</h4>
            <div className="p-4 rounded-2xl bg-[#001020] border border-white/15 max-w-md mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Ticket Number:</span>
                <span className="font-mono font-bold text-[#FFC857]">{createdTicketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Sentinel:</span>
                <strong className="text-white">Priya Sharma (Senior Relationship Manager)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guaranteed Response Clock:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 15:00 Mins (Ticking)
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our operations lead has received your telemetry and is coordinating directly with the property and chauffeur.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428] font-black text-xs shadow-lg"
              >
                Return to Live Journey
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quick Category Selector */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Select Concern Category
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'TRANSIT_DELAY', label: 'Transit & Flight Adjustment', icon: Car },
                  { id: 'ROOM_HYGIENE', label: 'Suite & In-Stay Preferences', icon: Hotel },
                  { id: 'BILLING_DISPUTE', label: 'Escrow Vault & Payout Support', icon: Lock },
                  { id: 'GENERAL_INQUIRY', label: 'Direct RM & Concierge Line', icon: MessageSquare },
                ].map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition ${
                        category === cat.id
                          ? 'bg-[#002B4D] border-[#FF8A3D] text-white font-bold shadow'
                          : 'bg-[#001428] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#FF8A3D] shrink-0" />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity Picker */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Urgency Level
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'NORMAL', label: 'Standard (30 Min)' },
                  { id: 'URGENT_P1', label: 'Urgent P1 (15 Min)' },
                  { id: 'CRITICAL_P0', label: 'Critical P0 (Immediate)' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setUrgency(lvl.id as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      urgency === lvl.id
                        ? 'bg-[#FF8A3D] text-[#001428] border-[#FF8A3D]'
                        : 'bg-[#001428] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Describe Adjustment or Issue
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Flight was rerouted to Gate 08 / Need luggage assistance at airport curb / Please set suite AC to 20°C prior to arrival."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#001020] border border-white/15 text-white text-xs outline-none focus:border-[#FF8A3D] resize-none"
              />
            </div>

            {/* SLA Guarantee Banner */}
            <div className="p-3.5 rounded-xl bg-[#001428] border border-white/10 text-xs text-slate-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#3CCF91] shrink-0 mt-0.5" />
              <p>
                <strong>15-Minute Guaranteed SLA:</strong> StaySphere Sentinel automatically escalates unacknowledged requests to the Managing Director and freezes escrow payouts if issues remain unresolved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/20 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Resolution Sentinel</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
