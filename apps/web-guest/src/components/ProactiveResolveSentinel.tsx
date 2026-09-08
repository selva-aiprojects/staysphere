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
  theme?: 'dark' | 'pearl';
}

export function ProactiveResolveSentinel({
  isOpen,
  onClose,
  defaultCategory = 'TRANSIT_DELAY',
  journeyReference = 'JN-SS-2026-9041',
  theme = 'pearl',
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

  const isPearl = theme === 'pearl';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl transition-all border my-8 animate-scale-up space-y-6 ${
          isPearl
            ? 'bg-white/95 text-[#001E3D] border-[#D4AF37]/35 shadow-[0_25px_60px_-15px_rgba(11,61,145,0.12)]'
            : 'bg-[#001E36] text-slate-100 border-[#FF8A3D]/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b pb-4 border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A3D] animate-ping shrink-0" />
              <h3 className={`text-lg font-bold tracking-wide ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                Proactive Resolution Sentinel
              </h3>
            </div>
            <p className={`text-xs mt-1 ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
              Journey Ref: <strong className={isPearl ? 'text-[#001E3D]' : 'text-white font-mono'}>{journeyReference}</strong> • 15-Minute Guaranteed SLA Response
            </p>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPearl ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className={`text-xl font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
              Resolution Ticket Dispatched!
            </h4>
            <div
              className={`p-4 rounded-2xl border max-w-md mx-auto text-xs text-left space-y-2 ${
                isPearl ? 'bg-slate-50 border-slate-200 text-[#001E3D]' : 'bg-[#001020] border-white/15 text-slate-200'
              }`}
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Ticket Number:</span>
                <span className="font-mono font-bold text-[#FF8A3D] shrink-0">{createdTicketId}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Assigned Sentinel:</span>
                <strong className="text-right">Priya Sharma (Senior Relationship Manager)</strong>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Guaranteed Response Clock:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 shrink-0" /> 15:00 Mins (Ticking)
                </span>
              </div>
            </div>
            <p className={`text-xs max-w-sm mx-auto ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
              Our operations lead has received your telemetry and is coordinating directly with the property and chauffeur.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className={`px-6 py-2.5 rounded-xl font-black text-xs shadow-lg cursor-pointer whitespace-nowrap ${
                  isPearl
                    ? 'bg-[#0B3D91] hover:bg-[#002B4D] text-white'
                    : 'bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428]'
                }`}
              >
                Return to Live Journey
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quick Category Selector */}
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${isPearl ? 'text-[#001E3D]' : 'text-slate-300'}`}>
                Select Concern Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                        category === cat.id
                          ? isPearl
                            ? 'bg-amber-50 border-[#FF8A3D] text-[#001E3D] font-bold shadow-sm'
                            : 'bg-[#FF8A3D]/20 border-[#FF8A3D] text-white font-bold'
                          : isPearl
                          ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          : 'bg-[#001428] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${category === cat.id ? 'text-[#FF8A3D]' : 'text-slate-400'}`} />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${isPearl ? 'text-[#001E3D]' : 'text-slate-300'}`}>
                Severity & Urgency
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'NORMAL', label: 'Standard Note', color: 'text-slate-500' },
                  { id: 'URGENT_P1', label: 'Urgent (15-Min)', color: 'text-amber-600 dark:text-[#FFC857]' },
                  { id: 'CRITICAL_P0', label: 'Critical Escrow P0', color: 'text-rose-600 dark:text-rose-400' },
                ].map((sev) => (
                  <button
                    key={sev.id}
                    type="button"
                    onClick={() => setUrgency(sev.id as any)}
                    className={`p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${
                      urgency === sev.id
                        ? isPearl
                          ? 'bg-amber-50 border-[#FF8A3D] text-[#001E3D]'
                          : 'bg-[#FF8A3D]/20 border-[#FF8A3D] text-white'
                        : isPearl
                        ? 'bg-slate-50 border-slate-200 text-slate-600'
                        : 'bg-[#001428] border-white/10 text-slate-400'
                    }`}
                  >
                    <span className={sev.color}>{sev.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${isPearl ? 'text-[#001E3D]' : 'text-slate-300'}`}>
                Describe Situation or Telemetry Update
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Flight landed 20 mins early at MOPA Gate 4, please inform chauffeur Gurpreet..."
                className={`w-full p-3 rounded-xl text-xs outline-none resize-none border ${
                  isPearl
                    ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91]'
                    : 'bg-[#001428] border-white/15 text-white focus:border-[#00D2C4]'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#E5B869] text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/20 hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Proactive SLA Ticket (15-Min Clock)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
