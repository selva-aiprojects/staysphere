'use client';

import { useState } from 'react';
import {
  X,
  Building2,
  Car,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';

interface PartnerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'pearl';
}

export function PartnerRegistrationModal({ isOpen, onClose, theme = 'pearl' }: PartnerRegistrationModalProps) {
  const [partnerType, setPartnerType] = useState<'HOTEL_RESORT' | 'CHAUFFEUR_FLEET' | 'CHANNEL_B2B'>('HOTEL_RESORT');
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    city: 'Goa',
    inventoryCount: 12,
    baseRateOrFee: 35000,
    partnershipPlan: 'PREMIER_RESORT',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isPearl = theme === 'pearl';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl transition-all border my-8 animate-scale-up ${
          isPearl
            ? 'bg-white/95 text-[#001E3D] border-[#D4AF37]/35 shadow-[0_25px_60px_-15px_rgba(11,61,145,0.12)]'
            : 'bg-[#001E36] text-slate-100 border-[#00A9A5]/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A9A5] animate-pulse shrink-0" />
              <h3 className={`text-lg font-bold tracking-wide ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                Partner with StaySphere
              </h3>
            </div>
            <p className={`text-xs mt-0.5 ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
              Join India's unified travel & hospitality network with automated milestone payouts and direct rate synchronization.
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
              Partner Registration Received!
            </h4>
            <div
              className={`p-4 rounded-2xl border max-w-md mx-auto text-xs text-left space-y-2 ${
                isPearl ? 'bg-slate-50 border-slate-200 text-[#001E3D]' : 'bg-[#001020] border-white/15 text-slate-200'
              }`}
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Partner Entity:</span>
                <strong className="truncate">{formData.businessName || 'Elite Partner Properties'}</strong>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Category:</span>
                <span className="font-bold text-[#00A9A5]">{partnerType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Onboarding SLA:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">24-Hour Review Window</span>
              </div>
            </div>
            <p className={`text-xs max-w-sm mx-auto ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
              Our Partner Operations Director will connect with you via {formData.email || 'your registered email'} to verify API sync & escrow keys.
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
                Return to Portal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category Selector */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${isPearl ? 'text-[#001E3D]' : 'text-slate-300'}`}>
                1. Select Partner Vertical
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'HOTEL_RESORT', label: 'Hotel & Luxury Resort', icon: Building2, desc: 'Hotels, homestays, private pool villas' },
                  { id: 'CHAUFFEUR_FLEET', label: 'Mobility & Chauffeur Fleet', icon: Car, desc: 'Sedans, MPVs, Maybach & EV fleets' },
                  { id: 'CHANNEL_B2B', label: 'Travel Designer / B2B Agent', icon: Users, desc: 'Corporate agents & tour operators' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = partnerType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPartnerType(item.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? isPearl
                            ? 'bg-blue-50/80 border-[#0B3D91] shadow-sm'
                            : 'bg-[#002B4D] border-[#00D2C4] text-white shadow-md'
                          : isPearl
                          ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          : 'bg-[#001428] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? (isPearl ? 'text-[#0B3D91]' : 'text-[#00D2C4]') : 'text-slate-400'}`} />
                      <div className="text-xs font-bold leading-tight">{item.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Entity Details */}
            <div className="space-y-3">
              <label className={`block text-xs font-bold uppercase tracking-wider ${isPearl ? 'text-[#001E3D]' : 'text-slate-300'}`}>
                2. Business & Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Business / Property / Fleet Name"
                  className={`px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                    isPearl
                      ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91]'
                      : 'bg-[#001428] border-white/15 text-white focus:border-[#00D2C4]'
                  }`}
                />
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Director / Authorized Contact Person"
                  className={`px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                    isPearl
                      ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91]'
                      : 'bg-[#001428] border-white/15 text-white focus:border-[#00D2C4]'
                  }`}
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Official Email Address"
                  className={`px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                    isPearl
                      ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91]'
                      : 'bg-[#001428] border-white/15 text-white focus:border-[#00D2C4]'
                  }`}
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Direct Phone / WhatsApp"
                  className={`px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                    isPearl
                      ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91]'
                      : 'bg-[#001428] border-white/15 text-white focus:border-[#00D2C4]'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 ${
                isPearl
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-blue-950/10'
                  : 'bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428] shadow-teal-950/30'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Submit Partner Application</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
