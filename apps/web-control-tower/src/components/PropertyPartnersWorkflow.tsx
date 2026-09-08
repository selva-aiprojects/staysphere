import { useState } from 'react';
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Sliders,
  DollarSign,
  Award,
  MessageSquare,
} from 'lucide-react';

export interface PropertyPartner {
  id: string;
  name: string;
  location: string;
  propertyType: '5-Star Resort' | 'Heritage Palace' | 'Alpine Chalet' | 'Luxury Serviced Penthouse' | 'Boutique Hotel';
  partnershipPlan: 'VERIFIED_BOUTIQUE' | 'PREMIER_RESORT' | 'SOVEREIGN_FLAGSHIP';
  monthlyBaseFee: number;
  commissionPct: number;
  totalKeys: number;
  allottedKeysToStaySphere: number;
  occupancyPct: number;
  adr: number; // Average Daily Rate in INR
  revPar: number; // RevPAR in INR
  monthlyGMVGenerated: number;
  escrowSettledThisMonth: number;
  escrowLockedCurrent: number;
  qualityAuditScore: number;
  auditBreakdown: {
    cleanlinessAndHygiene: number;
    butlerServiceSla: number;
    keycardSecurity: number;
    linenAndAmenities: number;
  };
  rateParityStatus: 'IN_SYNC' | 'DISCREPANCY';
  onboardingDate: string;
  status: 'ACTIVE' | 'AUDIT_PENDING' | 'EXPIRING_SOON';
}

export const INITIAL_PROPERTY_PARTNERS: PropertyPartner[] = [
  {
    id: 'prop-1',
    name: 'The Vana Azure Private Ocean Villa & Estate',
    location: 'Sinquerim Cliffs, North Goa',
    propertyType: '5-Star Resort',
    partnershipPlan: 'SOVEREIGN_FLAGSHIP',
    monthlyBaseFee: 59999,
    commissionPct: 12,
    totalKeys: 12,
    allottedKeysToStaySphere: 12,
    occupancyPct: 92.4,
    adr: 42000,
    revPar: 38808,
    monthlyGMVGenerated: 14200000,
    escrowSettledThisMonth: 12400000,
    escrowLockedCurrent: 1800000,
    qualityAuditScore: 99.8,
    auditBreakdown: {
      cleanlinessAndHygiene: 100,
      butlerServiceSla: 99.5,
      keycardSecurity: 100,
      linenAndAmenities: 99.8,
    },
    rateParityStatus: 'IN_SYNC',
    onboardingDate: '15 Jan 2025',
    status: 'ACTIVE',
  },
  {
    id: 'prop-2',
    name: 'The Maharaja Pichola Royal Palace',
    location: 'Lake Pichola, Udaipur, Rajasthan',
    propertyType: 'Heritage Palace',
    partnershipPlan: 'SOVEREIGN_FLAGSHIP',
    monthlyBaseFee: 59999,
    commissionPct: 15,
    totalKeys: 24,
    allottedKeysToStaySphere: 20,
    occupancyPct: 88.0,
    adr: 65000,
    revPar: 57200,
    monthlyGMVGenerated: 28500000,
    escrowSettledThisMonth: 25100000,
    escrowLockedCurrent: 3400000,
    qualityAuditScore: 100.0,
    auditBreakdown: {
      cleanlinessAndHygiene: 100,
      butlerServiceSla: 100,
      keycardSecurity: 100,
      linenAndAmenities: 100,
    },
    rateParityStatus: 'IN_SYNC',
    onboardingDate: '10 Aug 2024',
    status: 'ACTIVE',
  },
  {
    id: 'prop-3',
    name: 'The Celestial Alpine Glass Chalet & Spa',
    location: 'Solang Heights, Manali',
    propertyType: 'Alpine Chalet',
    partnershipPlan: 'PREMIER_RESORT',
    monthlyBaseFee: 29999,
    commissionPct: 14,
    totalKeys: 8,
    allottedKeysToStaySphere: 8,
    occupancyPct: 79.5,
    adr: 36000,
    revPar: 28620,
    monthlyGMVGenerated: 6800000,
    escrowSettledThisMonth: 5900000,
    escrowLockedCurrent: 900000,
    qualityAuditScore: 99.4,
    auditBreakdown: {
      cleanlinessAndHygiene: 99.0,
      butlerServiceSla: 99.2,
      keycardSecurity: 100,
      linenAndAmenities: 99.4,
    },
    rateParityStatus: 'DISCREPANCY',
    onboardingDate: '01 Nov 2025',
    status: 'EXPIRING_SOON',
  },
  {
    id: 'prop-4',
    name: 'The Sovereign Horizon Sky Penthouse',
    location: 'Bandra West, Mumbai',
    propertyType: 'Luxury Serviced Penthouse',
    partnershipPlan: 'PREMIER_RESORT',
    monthlyBaseFee: 29999,
    commissionPct: 12,
    totalKeys: 4,
    allottedKeysToStaySphere: 4,
    occupancyPct: 95.0,
    adr: 48000,
    revPar: 45600,
    monthlyGMVGenerated: 5400000,
    escrowSettledThisMonth: 4800000,
    escrowLockedCurrent: 600000,
    qualityAuditScore: 99.7,
    auditBreakdown: {
      cleanlinessAndHygiene: 100,
      butlerServiceSla: 99.6,
      keycardSecurity: 100,
      linenAndAmenities: 99.2,
    },
    rateParityStatus: 'IN_SYNC',
    onboardingDate: '05 Mar 2025',
    status: 'ACTIVE',
  },
];

interface PropertyPartnersWorkflowProps {
  onOpenTicketsModal: () => void;
  showToast: (msg: string) => void;
}

export function PropertyPartnersWorkflow({ onOpenTicketsModal, showToast }: PropertyPartnersWorkflowProps) {
  const [partners, setPartners] = useState<PropertyPartner[]>(INITIAL_PROPERTY_PARTNERS);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(partners[0].id);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);
  const [onboardingStage, setOnboardingStage] = useState<number>(1);

  // New Partner Form
  const [newPartnerForm, setNewPartnerForm] = useState({
    name: '',
    location: 'Goa',
    propertyType: '5-Star Resort' as PropertyPartner['propertyType'],
    partnershipPlan: 'PREMIER_RESORT' as PropertyPartner['partnershipPlan'],
    totalKeys: 16,
    allottedKeys: 14,
    baseRate: 35000,
  });

  const activePartner = partners.find((p) => p.id === selectedPartnerId) || partners[0];

  // 1-Click Rate Parity Fix
  const handleFixRateParity = (propId: string) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === propId ? { ...p, rateParityStatus: 'IN_SYNC' } : p))
    );
    showToast('Rate parity automatically re-aligned across OTAs and direct channels.');
  };

  // Adjust Key Allocation
  const handleKeyAllocationChange = (propId: string, delta: number) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === propId) {
          const newAllocated = Math.max(1, Math.min(p.totalKeys, p.allottedKeysToStaySphere + delta));
          return { ...p, allottedKeysToStaySphere: newAllocated };
        }
        return p;
      })
    );
    showToast('Key inventory allocation updated in real-time across channels.');
  };

  // Complete Onboarding
  const handleFinishOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerForm.name.trim()) return;

    const baseFee = newPartnerForm.partnershipPlan === 'SOVEREIGN_FLAGSHIP' ? 59999 : newPartnerForm.partnershipPlan === 'PREMIER_RESORT' ? 29999 : 14999;
    const commPct = newPartnerForm.partnershipPlan === 'SOVEREIGN_FLAGSHIP' ? 15 : newPartnerForm.partnershipPlan === 'PREMIER_RESORT' ? 12 : 8;

    const newRecord: PropertyPartner = {
      id: `prop-${Date.now()}`,
      name: newPartnerForm.name,
      location: newPartnerForm.location,
      propertyType: newPartnerForm.propertyType,
      partnershipPlan: newPartnerForm.partnershipPlan,
      monthlyBaseFee: baseFee,
      commissionPct: commPct,
      totalKeys: newPartnerForm.totalKeys,
      allottedKeysToStaySphere: newPartnerForm.allottedKeys,
      occupancyPct: 85.0,
      adr: newPartnerForm.baseRate,
      revPar: Math.round(newPartnerForm.baseRate * 0.85),
      monthlyGMVGenerated: Math.round(newPartnerForm.baseRate * newPartnerForm.allottedKeys * 25),
      escrowSettledThisMonth: 0,
      escrowLockedCurrent: 0,
      qualityAuditScore: 100.0,
      auditBreakdown: {
        cleanlinessAndHygiene: 100,
        butlerServiceSla: 100,
        keycardSecurity: 100,
        linenAndAmenities: 100,
      },
      rateParityStatus: 'IN_SYNC',
      onboardingDate: 'Just Now',
      status: 'ACTIVE',
    };

    setPartners([newRecord, ...partners]);
    setSelectedPartnerId(newRecord.id);
    setIsOnboardingModalOpen(false);
    setOnboardingStage(1);
    setNewPartnerForm({ name: '', location: 'Goa', propertyType: '5-Star Resort', partnershipPlan: 'PREMIER_RESORT', totalKeys: 16, allottedKeys: 14, baseRate: 35000 });
    showToast(`Property "${newRecord.name}" successfully onboarded & certified!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Bar */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white tracking-wide">Property Partners & Franchise Network</h1>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00A9A5] border border-[#00A9A5]/30">
              OYO & Luxury Network Model
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Collaborative hospitality management for independent Hotels, Resorts & Serviced Apartments partnering with StaySphere.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTicketsModal}
            className="px-4 py-2.5 rounded-2xl bg-[#002B4D] hover:bg-[#003866] border border-[#00A9A5]/40 text-white text-xs font-bold transition-all shadow flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#3CCF91]" />
            <span>Partner Support & Growth Desk (3 Active)</span>
          </button>

          <button
            onClick={() => setIsOnboardingModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold transition-all shadow-lg hover:brightness-110 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard New Hotel / Resort</span>
          </button>
        </div>
      </div>

      {/* Property Selector Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {partners.map((prop) => {
          const isSelected = prop.id === selectedPartnerId;
          return (
            <button
              key={prop.id}
              onClick={() => setSelectedPartnerId(prop.id)}
              className={`px-4 py-3 rounded-2xl border text-left transition-all shrink-0 flex items-center gap-3 ${
                isSelected
                  ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg text-white'
                  : 'bg-[#001428] border-white/10 hover:bg-white/5 text-slate-300'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A9A5]/30 to-[#3CCF91]/30 flex items-center justify-center text-[#00A9A5]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white line-clamp-1">{prop.name}</div>
                <div className="text-[10px] text-slate-400">{prop.location} • {prop.totalKeys} Keys</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Property Performance Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* KPI 1: Occupancy & Keys */}
        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Occupancy & Inventory</span>
            <TrendingUp className="w-4 h-4 text-[#3CCF91]" />
          </div>
          <div className="text-3xl font-black text-white">{activePartner.occupancyPct}%</div>
          <div className="text-xs text-slate-300 mt-2 flex items-center justify-between">
            <span>Allocated to StaySphere:</span>
            <strong className="text-white">{activePartner.allottedKeysToStaySphere} / {activePartner.totalKeys} Keys</strong>
          </div>
          {/* Key Allocation Controls */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">Quick Adjust:</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleKeyAllocationChange(activePartner.id, -1)}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold"
              >
                -1
              </button>
              <button
                onClick={() => handleKeyAllocationChange(activePartner.id, 1)}
                className="px-2 py-0.5 rounded bg-[#00A9A5] hover:bg-[#00A9A5]/80 text-white font-bold"
              >
                +1 Key
              </button>
            </div>
          </div>
        </div>

        {/* KPI 2: ADR & RevPAR */}
        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>ADR / RevPAR Performance</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">₹{(activePartner.adr).toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-300 mt-2 flex items-center justify-between">
            <span>RevPAR (Per Avail Room):</span>
            <strong className="text-[#3CCF91]">₹{(activePartner.revPar).toLocaleString('en-IN')}</strong>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Partnership Plan:</span>
            <span className="text-[#00A9A5] font-bold">{activePartner.partnershipPlan.replace('_', ' ')}</span>
          </div>
        </div>

        {/* KPI 3: Escrow Settlements */}
        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Monthly Escrow Payouts</span>
            <Clock className="w-4 h-4 text-[#00A9A5]" />
          </div>
          <div className="text-3xl font-black text-white">₹{(activePartner.escrowSettledThisMonth / 100000).toFixed(2)}L</div>
          <div className="text-xs text-slate-300 mt-2 flex items-center justify-between">
            <span>In Escrow (Locked):</span>
            <strong className="text-amber-400">₹{(activePartner.escrowLockedCurrent / 100000).toFixed(2)}L</strong>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Payout SLA:</span>
            <span className="text-slate-200 font-medium">2-Hr Post Check-In</span>
          </div>
        </div>

        {/* KPI 4: 84-Point Audit Score */}
        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>84-Point Quality Audit</span>
            <ShieldCheck className="w-4 h-4 text-[#3CCF91]" />
          </div>
          <div className="text-3xl font-black text-white">{activePartner.qualityAuditScore}%</div>
          <div className="text-xs text-slate-300 mt-2 flex items-center justify-between">
            <span>Rate Parity Status:</span>
            <span
              className={`font-bold ${
                activePartner.rateParityStatus === 'IN_SYNC' ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {activePartner.rateParityStatus === 'IN_SYNC' ? '100% In-Sync' : 'Discrepancy'}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            {activePartner.rateParityStatus === 'DISCREPANCY' ? (
              <button
                onClick={() => handleFixRateParity(activePartner.id)}
                className="w-full py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-center"
              >
                1-Click Fix Rate Parity
              </button>
            ) : (
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Certified Sovereign Partner
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 84-Point Audit Sub-Scores & Operational Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#001E36] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#00A9A5]" />
            <span>84-Point Trust & Luxury Quality Audit Breakdown</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Cleanliness & Hygiene Protocol</span>
                <span className="font-bold text-white">{activePartner.auditBreakdown.cleanlinessAndHygiene}%</span>
              </div>
              <div className="w-full h-2 bg-[#001428] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00A9A5] to-[#3CCF91]"
                  style={{ width: `${activePartner.auditBreakdown.cleanlinessAndHygiene}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>In-Suite Butler Service SLA (&lt;10 Min P0 Response)</span>
                <span className="font-bold text-white">{activePartner.auditBreakdown.butlerServiceSla}%</span>
              </div>
              <div className="w-full h-2 bg-[#001428] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00A9A5] to-[#3CCF91]"
                  style={{ width: `${activePartner.auditBreakdown.butlerServiceSla}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>AES-256 Digital Keycard & Smart Door Lock Reliability</span>
                <span className="font-bold text-white">{activePartner.auditBreakdown.keycardSecurity}%</span>
              </div>
              <div className="w-full h-2 bg-[#001428] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00A9A5] to-[#3CCF91]"
                  style={{ width: `${activePartner.auditBreakdown.keycardSecurity}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Linen, Luxury Amenities & Bath Menu Compliance</span>
                <span className="font-bold text-white">{activePartner.auditBreakdown.linenAndAmenities}%</span>
              </div>
              <div className="w-full h-2 bg-[#001428] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00A9A5] to-[#3CCF91]"
                  style={{ width: `${activePartner.auditBreakdown.linenAndAmenities}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Commercial & Contract Terms */}
        <div className="bg-[#001E36] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Commercial Agreement & Escrow Governance</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#001428]">
                <span className="text-slate-400">Monthly Network Fee:</span>
                <strong className="text-white">₹{(activePartner.monthlyBaseFee).toLocaleString('en-IN')}/mo</strong>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#001428]">
                <span className="text-slate-400">StaySphere Revenue Share Split:</span>
                <strong className="text-[#3CCF91]">{activePartner.commissionPct}% per completed stay</strong>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#001428]">
                <span className="text-slate-400">Estimated Monthly GMV:</span>
                <strong className="text-white">₹{(activePartner.monthlyGMVGenerated / 100000).toFixed(2)} Lakhs</strong>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#001428]">
                <span className="text-slate-400">Dedicated Relationship Manager:</span>
                <strong className="text-cyan-300">Vikramaditya Singh (West & North India)</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">Need operational support or inventory changes?</span>
            <button
              onClick={onOpenTicketsModal}
              className="px-3.5 py-2 rounded-xl bg-[#00A9A5] text-white text-xs font-bold hover:bg-[#00A9A5]/90 transition shadow flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message RM</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Stage Onboarding Modal */}
      {isOnboardingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001E36] border border-[#00A9A5]/50 rounded-3xl w-full max-w-2xl p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Partner Onboarding Funnel (5-Stage Certification)</h3>
                <p className="text-xs text-slate-400">Join StaySphere's Luxury Hotel & Resort Franchise Network</p>
              </div>
              <button
                onClick={() => setIsOnboardingModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Stages Stepper */}
            <div className="flex items-center justify-between mb-6 text-xs font-bold text-slate-400">
              {[
                { num: 1, label: '1. Dossier' },
                { num: 2, label: '2. 84-Pt Audit' },
                { num: 3, label: '3. Commercials' },
                { num: 4, label: '4. Key Sync' },
                { num: 5, label: '5. Certified Live' },
              ].map((step) => (
                <div
                  key={step.num}
                  className={`flex items-center gap-1.5 ${
                    onboardingStage >= step.num ? 'text-[#00A9A5]' : 'text-slate-500'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      onboardingStage >= step.num ? 'bg-[#00A9A5] text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleFinishOnboarding} className="space-y-4">
              {onboardingStage === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Property Name</label>
                    <input
                      type="text"
                      value={newPartnerForm.name}
                      onChange={(e) => setNewPartnerForm({ ...newPartnerForm, name: e.target.value })}
                      placeholder="e.g. The Oberoi Grand Oceanfront Villa"
                      className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A9A5]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Destination</label>
                      <input
                        type="text"
                        value={newPartnerForm.location}
                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, location: e.target.value })}
                        className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Property Category</label>
                      <select
                        value={newPartnerForm.propertyType}
                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, propertyType: e.target.value as any })}
                        className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                      >
                        <option value="5-Star Resort">5-Star Resort</option>
                        <option value="Heritage Palace">Heritage Palace</option>
                        <option value="Alpine Chalet">Alpine Chalet</option>
                        <option value="Luxury Serviced Penthouse">Luxury Serviced Penthouse</option>
                        <option value="Boutique Hotel">Boutique Hotel</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {onboardingStage === 2 && (
                <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>84-Point Physical & Digital Audit Passed (Score: 100.0%)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Physical linen inspection, hygiene protocol, AES-256 digital lock sync, and butler SLA testing verified by StaySphere Senior Quality Inspector.
                  </p>
                </div>
              )}

              {onboardingStage === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Partnership Plan</label>
                    <select
                      value={newPartnerForm.partnershipPlan}
                      onChange={(e) => setNewPartnerForm({ ...newPartnerForm, partnershipPlan: e.target.value as any })}
                      className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                    >
                      <option value="VERIFIED_BOUTIQUE">Verified Boutique Partner (₹14,999/mo + 8% rev share)</option>
                      <option value="PREMIER_RESORT">Premier Resort & Villa Partner (₹29,999/mo + 12% rev share)</option>
                      <option value="SOVEREIGN_FLAGSHIP">Sovereign Flagship Palace Franchise (₹59,999/mo + 15% rev share)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Base Room Rate (₹/Night)</label>
                      <input
                        type="number"
                        value={newPartnerForm.baseRate}
                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, baseRate: Number(e.target.value) })}
                        className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Total Property Keys</label>
                      <input
                        type="number"
                        value={newPartnerForm.totalKeys}
                        onChange={(e) => setNewPartnerForm({ ...newPartnerForm, totalKeys: Number(e.target.value), allottedKeys: Math.round(Number(e.target.value) * 0.85) })}
                        className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {onboardingStage === 4 && (
                <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white">Channel Manager & Key Allotment Sync</div>
                  <p className="text-xs text-slate-300">
                    Allocating <strong>{newPartnerForm.allottedKeys} of {newPartnerForm.totalKeys} Keys</strong> to the StaySphere VIP marketplace with 2-hour automated post-check-in Escrow Payouts.
                  </p>
                </div>
              )}

              {onboardingStage === 5 && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00A9A5]/20 to-[#3CCF91]/20 border border-[#00A9A5] text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-[#3CCF91] mx-auto animate-pulse" />
                  <h4 className="text-base font-bold text-white">Ready for Go-Live Certification!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    The property will receive the <strong>StaySphere Sovereign Verified Seal</strong> and be instantly bookable by global high-net-worth guests.
                  </p>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setOnboardingStage(Math.max(1, onboardingStage - 1))}
                  disabled={onboardingStage === 1}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold disabled:opacity-30"
                >
                  Previous
                </button>

                {onboardingStage < 5 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (onboardingStage === 1 && !newPartnerForm.name.trim()) return;
                      setOnboardingStage(onboardingStage + 1);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#00A9A5] text-white text-xs font-bold hover:brightness-110 shadow"
                  >
                    Next Stage →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110"
                  >
                    Authorize & Publish Property
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
