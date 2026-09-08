import { useState } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Plus,
  CheckCircle2,
  Clock,
  MessageSquare,
} from 'lucide-react';

export interface ChannelPartnerRecord {
  id: string;
  agencyName: string;
  agencyType: 'Luxury Concierge' | 'Corporate Travel Desk' | 'Destination Wedding Planner' | 'High-Net-Worth Family Office';
  contactPerson: string;
  email: string;
  tier: 'SOVEREIGN_BLACK_AGENCY' | 'GOLD_PRESTIGE_AGENCY' | 'SILVER_PARTNER_AGENCY';
  commissionRatePct: number;
  totalBookings: number;
  totalGmvGenerated: number;
  unsettledCommission: number;
  settledCommission: number;
  partnerSince: string;
  activeClientPipeline: {
    clientName: string;
    propertyName: string;
    bookingValue: number;
    dates: string;
    status: 'CONFIRMED' | 'IN_STAY' | 'COMPLETED';
  }[];
}

export const INITIAL_CHANNEL_PARTNERS: ChannelPartnerRecord[] = [
  {
    id: 'chan-1',
    agencyName: 'American Express Centurion Concierge (India & UAE)',
    agencyType: 'Luxury Concierge',
    contactPerson: 'Priya Nambiar',
    email: 'priya.concierge@centurion.amex.com',
    tier: 'SOVEREIGN_BLACK_AGENCY',
    commissionRatePct: 15,
    totalBookings: 84,
    totalGmvGenerated: 48600000,
    unsettledCommission: 540000,
    settledCommission: 6750000,
    partnerSince: 'Jan 2024',
    activeClientPipeline: [
      {
        clientName: 'Vikram Malhotra & Family',
        propertyName: 'The Vana Azure Private Ocean Villa',
        bookingValue: 146160,
        dates: '07 Sep - 10 Sep 2026',
        status: 'IN_STAY',
      },
      {
        clientName: 'Sunil Mittal Retinue',
        propertyName: 'The Maharaja Pichola Royal Palace',
        bookingValue: 480000,
        dates: '14 Sep - 18 Sep 2026',
        status: 'CONFIRMED',
      },
    ],
  },
  {
    id: 'chan-2',
    agencyName: 'Quintessentially Global Lifestyle Management',
    agencyType: 'High-Net-Worth Family Office',
    contactPerson: 'Zack Fernandez',
    email: 'zack.f@quintessentially.com',
    tier: 'GOLD_PRESTIGE_AGENCY',
    commissionRatePct: 12,
    totalBookings: 42,
    totalGmvGenerated: 26400000,
    unsettledCommission: 240000,
    settledCommission: 2928000,
    partnerSince: 'Jun 2024',
    activeClientPipeline: [
      {
        clientName: 'Elena Rostova',
        propertyName: 'The Sovereign Horizon Sky Penthouse',
        bookingValue: 171360,
        dates: '04 Sep - 07 Sep 2026',
        status: 'COMPLETED',
      },
    ],
  },
  {
    id: 'chan-3',
    agencyName: 'McKinsey & Co. Executive Corporate Travel Desk',
    agencyType: 'Corporate Travel Desk',
    contactPerson: 'Rohit Kulkarni',
    email: 'rohit_kulkarni@mckinsey.com',
    tier: 'GOLD_PRESTIGE_AGENCY',
    commissionRatePct: 10,
    totalBookings: 65,
    totalGmvGenerated: 31200000,
    unsettledCommission: 180000,
    settledCommission: 2940000,
    partnerSince: 'Sep 2024',
    activeClientPipeline: [
      {
        clientName: 'Global Leadership Retreat (12 Suites)',
        propertyName: 'The Celestial Alpine Glass Chalet & Spa',
        bookingValue: 864000,
        dates: '22 Sep - 26 Sep 2026',
        status: 'CONFIRMED',
      },
    ],
  },
];

interface ChannelPartnersWorkflowProps {
  onOpenTicketsModal: () => void;
  showToast: (msg: string) => void;
}

export function ChannelPartnersWorkflow({ onOpenTicketsModal, showToast }: ChannelPartnersWorkflowProps) {
  const [partners, setPartners] = useState<ChannelPartnerRecord[]>(INITIAL_CHANNEL_PARTNERS);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(partners[0].id);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // New B2B Partner Form
  const [newAgencyForm, setNewAgencyForm] = useState({
    agencyName: '',
    agencyType: 'Luxury Concierge' as ChannelPartnerRecord['agencyType'],
    contactPerson: '',
    email: '',
    tier: 'GOLD_PRESTIGE_AGENCY' as ChannelPartnerRecord['tier'],
    commissionRatePct: 12,
  });

  const activeAgency = partners.find((p) => p.id === selectedPartnerId) || partners[0];

  // Settle Commission
  const handleSettleCommission = (partnerId: string) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === partnerId) {
          const unsettled = p.unsettledCommission;
          return {
            ...p,
            unsettledCommission: 0,
            settledCommission: p.settledCommission + unsettled,
          };
        }
        return p;
      })
    );
    showToast('Commission payout dispatched to agency corporate bank account.');
  };

  const handleOnboardAgencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgencyForm.agencyName.trim()) return;

    const newRecord: ChannelPartnerRecord = {
      id: `chan-${Date.now()}`,
      agencyName: newAgencyForm.agencyName,
      agencyType: newAgencyForm.agencyType,
      contactPerson: newAgencyForm.contactPerson || 'Agency Lead',
      email: newAgencyForm.email || 'travel@agency.com',
      tier: newAgencyForm.tier,
      commissionRatePct: newAgencyForm.commissionRatePct,
      totalBookings: 0,
      totalGmvGenerated: 0,
      unsettledCommission: 0,
      settledCommission: 0,
      partnerSince: 'Just Now',
      activeClientPipeline: [],
    };

    setPartners([newRecord, ...partners]);
    setSelectedPartnerId(newRecord.id);
    setIsOnboardingOpen(false);
    setNewAgencyForm({ agencyName: '', agencyType: 'Luxury Concierge', contactPerson: '', email: '', tier: 'GOLD_PRESTIGE_AGENCY', commissionRatePct: 12 });
    showToast(`Channel Partner "${newRecord.agencyName}" onboarded with ${newRecord.commissionRatePct}% commission rate.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white tracking-wide">Channel Partners & Corporate Travel Network</h1>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              B2B Concierge & High-Net-Worth Network
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Collaborative booking network with Amex Centurion, Quintessentially, luxury wedding planners, and corporate travel desks.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTicketsModal}
            className="px-4 py-2.5 rounded-2xl bg-[#002B4D] hover:bg-[#003866] border border-emerald-500/40 text-white text-xs font-bold transition-all shadow flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Channel Partner Requests (2 Active)</span>
          </button>

          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#00A9A5] text-white text-xs font-bold transition-all shadow-lg hover:brightness-110 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Onboard Channel Agency</span>
          </button>
        </div>
      </div>

      {/* Channel Partner Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {partners.map((p) => {
          const isSelected = p.id === selectedPartnerId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPartnerId(p.id)}
              className={`px-4 py-3 rounded-2xl border text-left transition-all shrink-0 flex items-center gap-3 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#002B4D] border-emerald-400 shadow-lg text-white'
                  : 'bg-[#001428] border-white/10 hover:bg-white/5 text-slate-300'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/30 to-[#00A9A5]/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                {p.agencyName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-xs font-bold text-white line-clamp-1">{p.agencyName}</div>
                <div className="text-[10px] text-slate-400">{p.agencyType} • {p.commissionRatePct}% Comm.</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Channel Partner Performance Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="whitespace-nowrap">Total GMV Generated</span>
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-3xl font-black text-white whitespace-nowrap">₹{(activeAgency.totalGmvGenerated / 100000).toFixed(1)}L</div>
          <div className="text-xs text-slate-300 mt-2 flex items-center justify-between gap-2">
            <span className="whitespace-nowrap">Confirmed Bookings:</span>
            <strong className="text-white whitespace-nowrap">{activeAgency.totalBookings} VIP Stays</strong>
          </div>
        </div>

        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="whitespace-nowrap">Commission Tier</span>
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
          </div>
          <div className="text-2xl font-black text-amber-300 whitespace-nowrap">{activeAgency.commissionRatePct}% Split</div>
          <div className="text-xs text-slate-300 mt-2 flex items-center justify-between gap-2">
            <span className="whitespace-nowrap">Tier Status:</span>
            <strong className="text-white whitespace-nowrap">{activeAgency.tier.replace(/_/g, ' ')}</strong>
          </div>
        </div>

        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="whitespace-nowrap">Unsettled Commission</span>
            <Clock className="w-4 h-4 text-[#00A9A5] shrink-0" />
          </div>
          <div className="text-3xl font-black text-cyan-300 whitespace-nowrap">₹{(activeAgency.unsettledCommission).toLocaleString('en-IN')}</div>
          <div className="mt-3 pt-2 border-t border-white/10">
            {activeAgency.unsettledCommission > 0 ? (
              <button
                onClick={() => handleSettleCommission(activeAgency.id)}
                className="w-full py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition text-center cursor-pointer whitespace-nowrap"
              >
                1-Click Instant Payout
              </button>
            ) : (
              <span className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1 whitespace-nowrap">
                <CheckCircle2 className="w-3 h-3 shrink-0" /> All Commissions Settled
              </span>
            )}
          </div>
        </div>

        <div className="bg-[#001428] border border-white/10 rounded-2xl p-5 shadow">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="whitespace-nowrap">Total Settled to Date</span>
            <DollarSign className="w-4 h-4 text-[#3CCF91] shrink-0" />
          </div>
          <div className="text-3xl font-black text-white whitespace-nowrap">₹{(activeAgency.settledCommission / 100000).toFixed(2)}L</div>
          <div className="text-xs text-slate-300 mt-2 flex items-center justify-between gap-2">
            <span className="whitespace-nowrap">Partnering Since:</span>
            <strong className="text-slate-200 whitespace-nowrap">{activeAgency.partnerSince}</strong>
          </div>
        </div>
      </div>

      {/* Active VIP Client Pipeline */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Active VIP Client Booking Pipeline ({activeAgency.agencyName})</span>
          </h3>
          <button
            onClick={onOpenTicketsModal}
            className="px-3 py-1.5 rounded-xl bg-[#002B4D] hover:bg-[#003866] border border-white/10 text-xs text-slate-200 font-bold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#3CCF91] shrink-0" />
            <span>Submit Custom Itinerary / Request</span>
          </button>
        </div>

        <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {activeAgency.activeClientPipeline.length > 0 ? (
            activeAgency.activeClientPipeline.map((client, idx) => (
              <div key={idx} className="p-4 bg-[#001428] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-white">{client.clientName}</span>
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                        client.status === 'IN_STAY'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : client.status === 'CONFIRMED'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-500/20 text-slate-300'
                      }`}
                    >
                      {client.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {client.propertyName} • <span className="text-slate-300 font-medium">{client.dates}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-400">Booking Value: <strong className="text-white whitespace-nowrap">₹{client.bookingValue.toLocaleString('en-IN')}</strong></div>
                  <div className="text-xs text-emerald-400 font-bold mt-0.5 whitespace-nowrap">
                    Agency Commission: ₹{Math.round((client.bookingValue * activeAgency.commissionRatePct) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 bg-[#001428]">
              No active pipeline records currently. New bookings made via B2B API will appear here.
            </div>
          )}
        </div>
      </div>

      {/* Onboarding Agency Modal */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001E36] border border-emerald-500/50 rounded-3xl w-full max-w-xl p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Onboard Channel Agency / Corporate Desk</h3>
                <p className="text-xs text-slate-400">Expand StaySphere's High-Net-Worth Distribution Network</p>
              </div>
              <button
                onClick={() => setIsOnboardingOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOnboardAgencySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Agency / Corporate Desk Name</label>
                <input
                  type="text"
                  value={newAgencyForm.agencyName}
                  onChange={(e) => setNewAgencyForm({ ...newAgencyForm, agencyName: e.target.value })}
                  placeholder="e.g. Goldman Sachs Executive Travel Desk"
                  className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Agency Type</label>
                  <select
                    value={newAgencyForm.agencyType}
                    onChange={(e) => setNewAgencyForm({ ...newAgencyForm, agencyType: e.target.value as any })}
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Luxury Concierge">Luxury Concierge</option>
                    <option value="Corporate Travel Desk">Corporate Travel Desk</option>
                    <option value="Destination Wedding Planner">Destination Wedding Planner</option>
                    <option value="High-Net-Worth Family Office">High-Net-Worth Family Office</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Commission Split (%)</label>
                  <input
                    type="number"
                    value={newAgencyForm.commissionRatePct}
                    onChange={(e) => setNewAgencyForm({ ...newAgencyForm, commissionRatePct: Number(e.target.value) })}
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary Contact Person</label>
                  <input
                    type="text"
                    value={newAgencyForm.contactPerson}
                    onChange={(e) => setNewAgencyForm({ ...newAgencyForm, contactPerson: e.target.value })}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    value={newAgencyForm.email}
                    onChange={(e) => setNewAgencyForm({ ...newAgencyForm, email: e.target.value })}
                    placeholder="travel@goldmansachs.com"
                    className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsOnboardingOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00A9A5] text-white text-xs font-bold shadow-lg hover:brightness-110"
                >
                  Activate Channel Partnership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
