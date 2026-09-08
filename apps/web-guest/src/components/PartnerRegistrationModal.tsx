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
}

export function PartnerRegistrationModal({ isOpen, onClose }: PartnerRegistrationModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#001E36] border border-[#00A9A5]/50 rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A9A5] animate-pulse" />
              <h3 className="text-lg font-bold text-white tracking-wide">Partner with StaySphere</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Join India's unified travel & hospitality network with automated milestone payouts and direct rate synchronization.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 bg-[#001428] rounded-2xl border border-[#00A9A5]">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Application Received & Registration Initiated!</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.contactName}</strong>! Your application for <strong>{formData.businessName}</strong> has been received.
              A confirmation email has been dispatched to <strong className="text-cyan-300">{formData.email}</strong>.
            </p>
            <div className="p-4 rounded-xl bg-[#002B4D] text-xs text-slate-300 max-w-md mx-auto text-left space-y-1">
              <div className="text-cyan-300 font-bold">Next Steps:</div>
              <p>1. Dedicated Relationship Manager assigned: <strong>Vikramaditya Singh</strong></p>
              <p>2. Scheduling 84-Point Trust & Luxury Quality Inspection</p>
              <p>3. Automatic PMS / Telematics API key provisioning</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110"
            >
              Done & Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Partner Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Select Partnership Category</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPartnerType('HOTEL_RESORT')}
                  className={`p-3 rounded-xl border text-left transition flex flex-col gap-1.5 ${
                    partnerType === 'HOTEL_RESORT'
                      ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg text-white'
                      : 'bg-[#001428] border-white/10 text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#00A9A5]" />
                  <span className="text-xs font-bold">Hotel / Resort / Villa</span>
                  <span className="text-[10px] text-slate-400">List Suites & Estates</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPartnerType('CHAUFFEUR_FLEET')}
                  className={`p-3 rounded-xl border text-left transition flex flex-col gap-1.5 ${
                    partnerType === 'CHAUFFEUR_FLEET'
                      ? 'bg-[#002B4D] border-amber-400 shadow-lg text-white'
                      : 'bg-[#001428] border-white/10 text-slate-400'
                  }`}
                >
                  <Car className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Travel & Fleet Desk</span>
                  <span className="text-[10px] text-slate-400">Maybach / Helicopters</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPartnerType('CHANNEL_B2B')}
                  className={`p-3 rounded-xl border text-left transition flex flex-col gap-1.5 ${
                    partnerType === 'CHANNEL_B2B'
                      ? 'bg-[#002B4D] border-emerald-400 shadow-lg text-white'
                      : 'bg-[#001428] border-white/10 text-slate-400'
                  }`}
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Channel Partner B2B</span>
                  <span className="text-[10px] text-slate-400">Corporate & Concierge</span>
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {partnerType === 'HOTEL_RESORT'
                    ? 'Hotel / Property Entity Name'
                    : partnerType === 'CHAUFFEUR_FLEET'
                    ? 'Fleet / Mobility Operator Name'
                    : 'Agency / Corporate Desk Name'}
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. The Imperial Palms Resort"
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Primary Contact Person</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Vikramaditya Rathore"
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="partner@domain.com"
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile / Direct Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">City / Region</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {partnerType === 'HOTEL_RESORT' ? 'Total Keys / Suites' : partnerType === 'CHAUFFEUR_FLEET' ? 'Fleet Vehicles' : 'Monthly VIP Stays'}
                </label>
                <input
                  type="number"
                  value={formData.inventoryCount}
                  onChange={(e) => setFormData({ ...formData, inventoryCount: Number(e.target.value) })}
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Plan Tier</label>
                <select
                  value={formData.partnershipPlan}
                  onChange={(e) => setFormData({ ...formData, partnershipPlan: e.target.value })}
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                >
                  <option value="VERIFIED_BOUTIQUE">Verified Boutique (8% rev share)</option>
                  <option value="PREMIER_RESORT">Premier Resort (12% rev share)</option>
                  <option value="SOVEREIGN_FLAGSHIP">Sovereign Flagship (15% franchise)</option>
                </select>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="p-3.5 rounded-2xl bg-[#001428] border border-white/10 flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-[#3CCF91] shrink-0" />
              <span>
                <strong>StaySphere Partner Standards:</strong> Prompt post-check-in milestone disbursements, Dedicated Relationship Manager & Direct Rate Sync.
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110 flex items-center gap-1.5"
              >
                <span>Submit Partner Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
