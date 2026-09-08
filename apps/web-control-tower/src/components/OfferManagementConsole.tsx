import { useState } from 'react';
import {
  Tag,
  CalendarDays,
  Zap,
  BarChart3,
  Plus,
  PauseCircle,
  PlayCircle,
  Copy,
  Archive,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Flame,
  Snowflake,
  Sun,
  Gift,
  Percent,
  BedDouble,
  Sparkles,
  Inbox,
  X,
  ShieldAlert,
} from 'lucide-react';

// ─── Data Models ─────────────────────────────────────────────────────────────

type SeasonType = 'PEAK' | 'OFF_PEAK' | 'SHOULDER';
type OfferType = 'FLAT_DISCOUNT' | 'FREE_NIGHT' | 'COMPLIMENTARY_ADDON' | 'EARLY_BIRD' | 'FLASH_DEAL';
type OfferStatus = 'DRAFT' | 'LIVE' | 'PAUSED' | 'EXPIRED';
type OfferChannel = 'DIRECT' | 'B2B' | 'BOTH';
type ProposalStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';

interface Season {
  id: string;
  name: string;
  type: SeasonType;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'UPCOMING' | 'ARCHIVED';
  notes?: string;
}

interface Offer {
  id: string;
  offerCode: string;
  name: string;
  type: OfferType;
  seasonId: string | null;
  discountValue: number;
  addonType?: 'AIRPORT_TRANSFER' | 'EXPERIENCE' | 'ROOM_UPGRADE';
  status: OfferStatus;
  validFrom: string;
  validTo: string;
  redemptionCap: number;
  redemptionCount: number;
  applicableProperties: string[];
  channel: OfferChannel;
  isStackable: boolean;
  rateParity: 'OK' | 'WARNING';
  createdBy: string;
}

interface OfferRule {
  id: string;
  offerCode: string;
  offerId: string;
  minStayNights: number;
  minAdvanceBookingDays: number;
  guestTierEligibility: 'ALL' | 'GOLD_AND_ABOVE' | 'SOVEREIGN_ONLY';
  maxUsesPerGuest: number;
  isStackable: boolean;
}

interface PartnerProposal {
  id: string;
  partnerName: string;
  propertyName: string;
  proposedOfferName: string;
  type: OfferType;
  discountValue: number;
  validFrom: string;
  validTo: string;
  reason: string;
  status: ProposalStatus;
  submittedAt: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_SEASONS: Season[] = [
  {
    id: 'ssn-1',
    name: 'Goa Peak Winter 2026',
    type: 'PEAK',
    destination: 'Goa',
    startDate: 'Dec 20, 2026',
    endDate: 'Jan 10, 2027',
    status: 'UPCOMING',
    notes: 'Christmas & New Year high demand window. Full-inventory black-out for flash deals.',
  },
  {
    id: 'ssn-2',
    name: 'Goa Off-Peak Monsoon 2026',
    type: 'OFF_PEAK',
    destination: 'Goa',
    startDate: 'Jul 1, 2026',
    endDate: 'Aug 31, 2026',
    status: 'ACTIVE',
    notes: 'Lowest occupancy period. Flash deals & complimentary add-ons authorized.',
  },
  {
    id: 'ssn-3',
    name: 'Udaipur Shoulder Autumn 2026',
    type: 'SHOULDER',
    destination: 'Udaipur',
    startDate: 'Sep 1, 2026',
    endDate: 'Nov 30, 2026',
    status: 'ACTIVE',
  },
  {
    id: 'ssn-4',
    name: 'Manali Peak Snow 2026–27',
    type: 'PEAK',
    destination: 'Manali',
    startDate: 'Dec 15, 2026',
    endDate: 'Feb 15, 2027',
    status: 'UPCOMING',
    notes: 'Snow season at Solang Heights. High demand for Alpine Chalets.',
  },
  {
    id: 'ssn-5',
    name: 'All India Off-Peak Feb-Mar 2027',
    type: 'OFF_PEAK',
    destination: 'All Destinations',
    startDate: 'Feb 1, 2027',
    endDate: 'Mar 31, 2027',
    status: 'UPCOMING',
  },
];

const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    offerCode: 'GOA-MONSOON-20',
    name: 'Goa Monsoon Escape 20% Off',
    type: 'FLAT_DISCOUNT',
    seasonId: 'ssn-2',
    discountValue: 20,
    status: 'LIVE',
    validFrom: 'Jul 1, 2026',
    validTo: 'Aug 31, 2026',
    redemptionCap: 200,
    redemptionCount: 87,
    applicableProperties: ['The Vana Azure Ocean Villa'],
    channel: 'BOTH',
    isStackable: false,
    rateParity: 'OK',
    createdBy: 'Devraj Mukherjee',
  },
  {
    id: 'off-2',
    offerCode: 'UDR-STAY3PAY2',
    name: 'Udaipur Royal Stay 3 Pay 2',
    type: 'FREE_NIGHT',
    seasonId: 'ssn-3',
    discountValue: 1,
    status: 'LIVE',
    validFrom: 'Sep 1, 2026',
    validTo: 'Nov 30, 2026',
    redemptionCap: 50,
    redemptionCount: 14,
    applicableProperties: ['The Maharaja Pichola Royal Palace'],
    channel: 'DIRECT',
    isStackable: false,
    rateParity: 'OK',
    createdBy: 'Vikramaditya Singh',
  },
  {
    id: 'off-3',
    offerCode: 'GOA-TRANSFER-FREE',
    name: 'Free Airport Transfer on 3+ Night Stays',
    type: 'COMPLIMENTARY_ADDON',
    seasonId: 'ssn-2',
    discountValue: 0,
    addonType: 'AIRPORT_TRANSFER',
    status: 'LIVE',
    validFrom: 'Jul 1, 2026',
    validTo: 'Sep 30, 2026',
    redemptionCap: 300,
    redemptionCount: 212,
    applicableProperties: [],
    channel: 'DIRECT',
    isStackable: true,
    rateParity: 'OK',
    createdBy: 'Devraj Mukherjee',
  },
  {
    id: 'off-4',
    offerCode: 'EARLY-BIRD-15',
    name: 'Early Planner 15% — Book 60 Days Early',
    type: 'EARLY_BIRD',
    seasonId: null,
    discountValue: 15,
    status: 'LIVE',
    validFrom: 'Jan 1, 2026',
    validTo: 'Dec 31, 2026',
    redemptionCap: 500,
    redemptionCount: 341,
    applicableProperties: [],
    channel: 'BOTH',
    isStackable: false,
    rateParity: 'WARNING',
    createdBy: 'Rajesh Khosla',
  },
  {
    id: 'off-5',
    offerCode: 'FLASH-MNL-AUG',
    name: 'Manali Flash Deal — 30% Off This Weekend',
    type: 'FLASH_DEAL',
    seasonId: null,
    discountValue: 30,
    status: 'DRAFT',
    validFrom: 'Aug 30, 2026',
    validTo: 'Sep 1, 2026',
    redemptionCap: 20,
    redemptionCount: 0,
    applicableProperties: ['The Celestial Alpine Glass Chalet'],
    channel: 'DIRECT',
    isStackable: false,
    rateParity: 'WARNING',
    createdBy: 'Vikramaditya Singh',
  },
  {
    id: 'off-6',
    offerCode: 'GOA-PEAK-XMAS',
    name: 'Goa Christmas & NYE Sovereign Package',
    type: 'COMPLIMENTARY_ADDON',
    seasonId: 'ssn-1',
    discountValue: 0,
    addonType: 'EXPERIENCE',
    status: 'DRAFT',
    validFrom: 'Dec 20, 2026',
    validTo: 'Jan 2, 2027',
    redemptionCap: 80,
    redemptionCount: 0,
    applicableProperties: ['The Vana Azure Ocean Villa'],
    channel: 'BOTH',
    isStackable: false,
    rateParity: 'OK',
    createdBy: 'Devraj Mukherjee',
  },
];

const INITIAL_RULES: OfferRule[] = [
  { id: 'rl-1', offerId: 'off-1', offerCode: 'GOA-MONSOON-20', minStayNights: 2, minAdvanceBookingDays: 0, guestTierEligibility: 'ALL', maxUsesPerGuest: 1, isStackable: false },
  { id: 'rl-2', offerId: 'off-2', offerCode: 'UDR-STAY3PAY2', minStayNights: 3, minAdvanceBookingDays: 7, guestTierEligibility: 'ALL', maxUsesPerGuest: 2, isStackable: false },
  { id: 'rl-3', offerId: 'off-3', offerCode: 'GOA-TRANSFER-FREE', minStayNights: 3, minAdvanceBookingDays: 0, guestTierEligibility: 'ALL', maxUsesPerGuest: 5, isStackable: true },
  { id: 'rl-4', offerId: 'off-4', offerCode: 'EARLY-BIRD-15', minStayNights: 1, minAdvanceBookingDays: 60, guestTierEligibility: 'ALL', maxUsesPerGuest: 3, isStackable: false },
  { id: 'rl-5', offerId: 'off-5', offerCode: 'FLASH-MNL-AUG', minStayNights: 1, minAdvanceBookingDays: 0, guestTierEligibility: 'SOVEREIGN_ONLY', maxUsesPerGuest: 1, isStackable: false },
  { id: 'rl-6', offerId: 'off-6', offerCode: 'GOA-PEAK-XMAS', minStayNights: 4, minAdvanceBookingDays: 30, guestTierEligibility: 'GOLD_AND_ABOVE', maxUsesPerGuest: 1, isStackable: false },
];

const INITIAL_PROPOSALS: PartnerProposal[] = [
  {
    id: 'pp-1',
    partnerName: 'Anil Deshmukh',
    propertyName: 'The Vana Azure Ocean Villa',
    proposedOfferName: 'Vana Azure Honeymoon Package — 10% Off + Champagne',
    type: 'FLAT_DISCOUNT',
    discountValue: 10,
    validFrom: 'Oct 1, 2026',
    validTo: 'Dec 15, 2026',
    reason: 'October is traditionally slow for us. A romantic offer with champagne add-on would drive direct bookings from anniversary and honeymoon travelers.',
    status: 'PENDING_REVIEW',
    submittedAt: '2 hrs ago',
  },
  {
    id: 'pp-2',
    partnerName: 'Arjun Mehra',
    propertyName: 'The Celestial Alpine Glass Chalet',
    proposedOfferName: 'Ski Season Early Check-in Bundle',
    type: 'COMPLIMENTARY_ADDON',
    discountValue: 0,
    validFrom: 'Dec 1, 2026',
    validTo: 'Feb 28, 2027',
    reason: 'Many ski guests arrive on late-night flights. Early check-in without extra charge would differentiate us from Airbnb properties in Solang.',
    status: 'PENDING_REVIEW',
    submittedAt: '1 day ago',
  },
  {
    id: 'pp-3',
    partnerName: 'Sunita Rao',
    propertyName: 'The Maharaja Pichola Royal Palace',
    proposedOfferName: 'Heritage Walk + Lake Cruise Combo Deal',
    type: 'COMPLIMENTARY_ADDON',
    discountValue: 0,
    validFrom: 'Sep 15, 2026',
    validTo: 'Nov 15, 2026',
    reason: 'Shoulder season guests are typically experiential travelers. A bundled heritage walk + Lake Pichola cruise would increase average booking value.',
    status: 'APPROVED',
    submittedAt: '3 days ago',
  },
];

// ─── Helper Utilities ─────────────────────────────────────────────────────────

const SEASON_STYLE: Record<SeasonType, { bg: string; text: string; border: string; Icon: React.FC<{className?: string}>; label: string }> = {
  PEAK: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30', Icon: Flame, label: 'Peak Season' },
  OFF_PEAK: { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-500/30', Icon: Snowflake, label: 'Off-Peak Season' },
  SHOULDER: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30', Icon: Sun, label: 'Shoulder Season' },
};

const OFFER_TYPE_STYLE: Record<OfferType, { Icon: React.FC<{className?: string}>; label: string; color: string }> = {
  FLAT_DISCOUNT: { Icon: Percent, label: 'Flat Discount', color: 'text-emerald-400' },
  FREE_NIGHT: { Icon: BedDouble, label: 'Free Night', color: 'text-violet-400' },
  COMPLIMENTARY_ADDON: { Icon: Gift, label: 'Complimentary Add-On', color: 'text-amber-400' },
  EARLY_BIRD: { Icon: CalendarDays, label: 'Early Bird', color: 'text-sky-400' },
  FLASH_DEAL: { Icon: Zap, label: 'Flash Deal', color: 'text-rose-400' },
};

const STATUS_BADGE: Record<OfferStatus, { cls: string; dot: string; label: string }> = {
  LIVE: { cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400 animate-pulse', label: 'LIVE' },
  DRAFT: { cls: 'bg-slate-500/20 text-slate-300 border-slate-500/30', dot: 'bg-slate-400', label: 'DRAFT' },
  PAUSED: { cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30', dot: 'bg-amber-400', label: 'PAUSED' },
  EXPIRED: { cls: 'bg-rose-500/10 text-rose-400 border-rose-500/20', dot: 'bg-rose-500', label: 'EXPIRED' },
};

const SEASON_STATUS_BADGE: Record<'ACTIVE' | 'UPCOMING' | 'ARCHIVED', string> = {
  ACTIVE: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  UPCOMING: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  ARCHIVED: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
};

function offerTypeLabel(type: OfferType, discountValue: number, addonType?: string): string {
  switch (type) {
    case 'FLAT_DISCOUNT': return `${discountValue}% Off`;
    case 'FREE_NIGHT': return `Stay ${discountValue + 2}, Pay ${discountValue + 1}`;
    case 'COMPLIMENTARY_ADDON': return `Free ${(addonType ?? 'Add-On').replace(/_/g, ' ')}`;
    case 'EARLY_BIRD': return `${discountValue}% (60+ Days Early)`;
    case 'FLASH_DEAL': return `${discountValue}% Flash`;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// ── CREATE OFFER MODAL ────────────────────────────────────────────────────────
interface CreateOfferModalProps {
  seasons: Season[];
  onClose: () => void;
  onSave: (offer: Offer) => void;
}

function CreateOfferModal({ seasons, onClose, onSave }: CreateOfferModalProps) {
  const [form, setForm] = useState({
    name: '',
    offerCode: '',
    type: 'FLAT_DISCOUNT' as OfferType,
    seasonId: '',
    discountValue: 10,
    addonType: 'AIRPORT_TRANSFER' as Offer['addonType'],
    validFrom: '',
    validTo: '',
    redemptionCap: 100,
    channel: 'BOTH' as OfferChannel,
    isStackable: false,
  });

  const handleSave = () => {
    const newOffer: Offer = {
      id: `off-${Date.now()}`,
      ...form,
      seasonId: form.seasonId || null,
      status: 'DRAFT',
      redemptionCount: 0,
      applicableProperties: [],
      rateParity: form.discountValue >= 25 ? 'WARNING' : 'OK',
      createdBy: 'Devraj Mukherjee',
    };
    onSave(newOffer);
  };

  const inputCls = 'w-full bg-[#001428] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A9A5]/60';
  const labelCls = 'text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#001E36] border border-white/15 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFC857]/5">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#FFC857]" />
            <h2 className="text-base font-bold text-white">Create New Offer</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
          <div className="col-span-2">
            <label className={labelCls}>Offer Name</label>
            <input className={inputCls} placeholder="e.g. Goa Monsoon Escape 20% Off" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Offer Code</label>
            <input className={inputCls} placeholder="e.g. GOA-MONSOON-20" value={form.offerCode} onChange={e => setForm(f => ({ ...f, offerCode: e.target.value.toUpperCase() }))} />
          </div>
          <div>
            <label className={labelCls}>Offer Type</label>
            <select className={inputCls} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as OfferType }))}>
              <option value="FLAT_DISCOUNT">Flat % Discount</option>
              <option value="FREE_NIGHT">Free Night (Stay X Pay Y)</option>
              <option value="COMPLIMENTARY_ADDON">Complimentary Add-On</option>
              <option value="EARLY_BIRD">Early Bird</option>
              <option value="FLASH_DEAL">Flash Deal</option>
            </select>
          </div>

          {form.type === 'COMPLIMENTARY_ADDON' ? (
            <div>
              <label className={labelCls}>Add-On Type</label>
              <select className={inputCls} value={form.addonType} onChange={e => setForm(f => ({ ...f, addonType: e.target.value as Offer['addonType'] }))}>
                <option value="AIRPORT_TRANSFER">Airport Transfer</option>
                <option value="EXPERIENCE">Experience / Excursion</option>
                <option value="ROOM_UPGRADE">Room Upgrade</option>
              </select>
            </div>
          ) : (
            <div>
              <label className={labelCls}>Discount Value {form.type === 'FREE_NIGHT' ? '(# free nights)' : '(%)'}</label>
              <input type="number" className={inputCls} value={form.discountValue} min={1} max={form.type === 'FREE_NIGHT' ? 5 : 80} onChange={e => setForm(f => ({ ...f, discountValue: Number(e.target.value) }))} />
              {form.discountValue >= 25 && form.type !== 'FLASH_DEAL' && (
                <p className="text-amber-400 text-[10px] mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> May trigger rate parity warning</p>
              )}
            </div>
          )}

          <div>
            <label className={labelCls}>Linked Season (Optional)</label>
            <select className={inputCls} value={form.seasonId} onChange={e => setForm(f => ({ ...f, seasonId: e.target.value }))}>
              <option value="">— Season-Independent —</option>
              {seasons.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Valid From</label>
            <input type="date" className={inputCls} onChange={e => setForm(f => ({ ...f, validFrom: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Valid To</label>
            <input type="date" className={inputCls} onChange={e => setForm(f => ({ ...f, validTo: e.target.value }))} />
          </div>

          <div>
            <label className={labelCls}>Redemption Cap</label>
            <input type="number" className={inputCls} value={form.redemptionCap} min={1} onChange={e => setForm(f => ({ ...f, redemptionCap: Number(e.target.value) }))} />
          </div>
          <div>
            <label className={labelCls}>Applicable Channel</label>
            <select className={inputCls} value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value as OfferChannel }))}>
              <option value="BOTH">Both (Direct + B2B)</option>
              <option value="DIRECT">Direct Only</option>
              <option value="B2B">B2B Channel Partners Only</option>
            </select>
          </div>

          <div className="col-span-2 flex items-center gap-2 bg-[#001428] rounded-xl p-3 border border-white/10">
            <input type="checkbox" id="stackable-cb" checked={form.isStackable} onChange={e => setForm(f => ({ ...f, isStackable: e.target.checked }))} className="w-4 h-4 accent-[#00A9A5] cursor-pointer" />
            <label htmlFor="stackable-cb" className="text-xs text-slate-300 cursor-pointer">
              <span className="font-bold text-white">Stackable</span> — Allow this offer to be combined with other active offers
            </label>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 border border-white/10 hover:bg-white/5 cursor-pointer">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!form.name || !form.offerCode}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFC857] text-[#001428] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface OfferManagementConsoleProps {
  showToast: (msg: string) => void;
}

type SubTab = 'seasons' | 'offers' | 'rules' | 'analytics';

export function OfferManagementConsole({ showToast }: OfferManagementConsoleProps) {
  const [activeTab, setActiveTab] = useState<SubTab>('offers');
  const [seasons, setSeasons] = useState<Season[]>(INITIAL_SEASONS);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [rules] = useState<OfferRule[]>(INITIAL_RULES);
  const [proposals, setProposals] = useState<PartnerProposal[]>(INITIAL_PROPOSALS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OfferStatus | 'ALL'>('ALL');
  const [showProposals, setShowProposals] = useState(false);

  // ── Offer actions ──
  const handleActivate = (id: string) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: 'LIVE' } : o));
    showToast('Offer activated and now LIVE across all applicable channels.');
  };
  const handlePause = (id: string) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: 'PAUSED' } : o));
    showToast('Offer paused. No new redemptions will be accepted.');
  };
  const handleDuplicate = (id: string) => {
    const source = offers.find(o => o.id === id);
    if (!source) return;
    const clone: Offer = { ...source, id: `off-${Date.now()}`, offerCode: source.offerCode + '-COPY', status: 'DRAFT', redemptionCount: 0 };
    setOffers(prev => [clone, ...prev]);
    showToast(`Offer duplicated as "${clone.offerCode}". Edit and activate when ready.`);
  };
  const handleArchive = (id: string) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: 'EXPIRED' } : o));
    showToast('Offer archived. It will no longer appear in guest-facing channels.');
  };
  const handleSaveOffer = (offer: Offer) => {
    setOffers(prev => [offer, ...prev]);
    setShowCreateModal(false);
    showToast(`Offer "${offer.offerCode}" saved as Draft. Review and activate when ready.`);
  };

  // ── Proposal actions ──
  const handleApproveProposal = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
    showToast('Partner proposal approved. Converted to a Draft offer for final configuration.');
  };
  const handleRejectProposal = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'REJECTED' } : p));
    showToast('Partner proposal declined. Partner has been notified.');
  };

  // ── Season actions ──
  const handleArchiveSeason = (id: string) => {
    setSeasons(prev => prev.map(s => s.id === id ? { ...s, status: 'ARCHIVED' } : s));
    showToast('Season archived.');
  };

  const filteredOffers = filterStatus === 'ALL' ? offers : offers.filter(o => o.status === filterStatus);
  const pendingProposals = proposals.filter(p => p.status === 'PENDING_REVIEW').length;
  const liveOffers = offers.filter(o => o.status === 'LIVE').length;
  const totalRedemptions = offers.reduce((a, o) => a + o.redemptionCount, 0);

  // ── Analytics helpers ──
  const topOffers = [...offers].sort((a, b) => b.redemptionCount - a.redemptionCount).slice(0, 5);
  const maxRedemptions = Math.max(...topOffers.map(o => o.redemptionCount), 1);

  const TAB_BTN = (key: SubTab, Icon: React.FC<{className?: string}>, label: string, badge?: number) => (
    <button
      onClick={() => setActiveTab(key)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
        activeTab === key
          ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#FFC857]/20 text-[#FFC857] border border-[#D4AF37]/40 shadow-md'
          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">{badge}</span>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#FFC857] flex items-center justify-center shadow-lg">
                <Tag className="w-4.5 h-4.5 text-[#001428]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">Offer Management Console</h1>
                <p className="text-[11px] text-slate-400 mt-0.5">Season-based promotions, eligibility rules & partner proposals — Platform Operations</p>
              </div>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Live Offers', value: liveOffers, color: 'text-emerald-400' },
              { label: 'Total Redemptions', value: totalRedemptions, color: 'text-sky-400' },
              { label: 'Active Seasons', value: seasons.filter(s => s.status === 'ACTIVE').length, color: 'text-amber-400' },
              { label: 'Partner Proposals', value: pendingProposals, color: 'text-rose-400' },
            ].map(kpi => (
              <div key={kpi.label} className="bg-[#001428] border border-white/10 rounded-2xl px-4 py-3 text-center min-w-[90px]">
                <div className={`text-xl font-black ${kpi.color}`}>{kpi.value}</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex flex-wrap gap-1 mt-5 p-1 bg-[#001428]/80 rounded-2xl border border-white/10">
          {TAB_BTN('offers', Tag, 'Active Offers')}
          {TAB_BTN('seasons', CalendarDays, 'Seasons Calendar')}
          {TAB_BTN('rules', Sparkles, 'Rules Engine')}
          {TAB_BTN('analytics', BarChart3, 'Offer Analytics')}
          <button
            onClick={() => setShowProposals(p => !p)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ml-auto border ${
              showProposals ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            Partner Proposals
            {pendingProposals > 0 && <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">{pendingProposals}</span>}
          </button>
        </div>
      </div>

      {/* ── Partner Proposals Panel ── */}
      {showProposals && (
        <div className="bg-[#001E36] border border-rose-500/20 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-rose-500/5">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold text-white">Partner Proposal Queue</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">{pendingProposals} PENDING</span>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {proposals.map(p => (
              <div key={p.id} className="px-6 py-4 flex flex-wrap gap-4 items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-bold text-white">{p.proposedOfferName}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      p.status === 'PENDING_REVIEW' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : p.status === 'APPROVED' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}>
                      {p.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-1">
                    <span className="text-slate-300 font-semibold">{p.partnerName}</span> · {p.propertyName} · {p.validFrom} → {p.validTo} · Submitted {p.submittedAt}
                  </p>
                  <p className="text-xs text-slate-400 italic">"{p.reason}"</p>
                </div>
                {p.status === 'PENDING_REVIEW' && (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleApproveProposal(p.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold cursor-pointer transition">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => handleRejectProposal(p.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold cursor-pointer transition">
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════ TAB: ACTIVE OFFERS ═══════════════ */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 bg-[#001428] p-1 rounded-2xl border border-white/10">
              {(['ALL', 'LIVE', 'DRAFT', 'PAUSED', 'EXPIRED'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    filterStatus === s ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {s === 'ALL' ? `All (${offers.length})` : `${s} (${offers.filter(o => o.status === s).length})`}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFC857] text-[#001428] font-black text-xs hover:brightness-110 shadow-lg cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5" /> Create Offer
            </button>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOffers.map(offer => {
              const typeInfo = OFFER_TYPE_STYLE[offer.type];
              const statusInfo = STATUS_BADGE[offer.status];
              const season = seasons.find(s => s.id === offer.seasonId);
              const fillPct = Math.round((offer.redemptionCount / offer.redemptionCap) * 100);

              return (
                <div key={offer.id} className="bg-[#001E36] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all shadow-lg">
                  {/* Card header */}
                  <div className="px-5 py-4 border-b border-white/8 bg-gradient-to-r from-[#D4AF37]/8 to-transparent flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`flex items-center gap-1 ${statusInfo.cls} border rounded-full px-2.5 py-0.5 text-[10px] font-black`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                          {statusInfo.label}
                        </span>
                        {offer.rateParity === 'WARNING' && (
                          <span className="flex items-center gap-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full px-2 py-0.5 text-[10px] font-bold">
                            <ShieldAlert className="w-3 h-3" /> Rate Parity Warning
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white truncate">{offer.name}</h3>
                      <p className="text-[10px] font-mono text-[#00D2C4] mt-0.5">{offer.offerCode}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 shrink-0 ${typeInfo.color}`}>
                      <typeInfo.Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-5 py-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Offer Value</span>
                        <span className="text-white font-bold">{offerTypeLabel(offer.type, offer.discountValue, offer.addonType)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Type</span>
                        <span className={`font-bold ${typeInfo.color}`}>{typeInfo.label}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Valid Period</span>
                        <span className="text-slate-300 font-medium">{offer.validFrom} → {offer.validTo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Channel</span>
                        <span className="text-slate-300 font-medium">{offer.channel === 'BOTH' ? 'Direct + B2B' : offer.channel}</span>
                      </div>
                      {season && (
                        <div className="col-span-2">
                          <span className="text-slate-500 block">Season</span>
                          <span className={`font-bold ${SEASON_STYLE[season.type].text}`}>{season.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Redemption progress */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-slate-500">Redemptions</span>
                        <span className="text-slate-300 font-bold">{offer.redemptionCount} / {offer.redemptionCap} cap ({fillPct}%)</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${fillPct >= 80 ? 'bg-rose-400' : fillPct >= 50 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Action row */}
                    <div className="flex items-center gap-2 pt-1">
                      {offer.status === 'DRAFT' && (
                        <button onClick={() => handleActivate(offer.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold cursor-pointer transition">
                          <PlayCircle className="w-3.5 h-3.5" /> Activate
                        </button>
                      )}
                      {offer.status === 'LIVE' && (
                        <button onClick={() => handlePause(offer.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-bold cursor-pointer transition">
                          <PauseCircle className="w-3.5 h-3.5" /> Pause
                        </button>
                      )}
                      {offer.status === 'PAUSED' && (
                        <button onClick={() => handleActivate(offer.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold cursor-pointer transition">
                          <PlayCircle className="w-3.5 h-3.5" /> Resume
                        </button>
                      )}
                      <button onClick={() => handleDuplicate(offer.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-[11px] font-bold cursor-pointer transition">
                        <Copy className="w-3.5 h-3.5" /> Duplicate
                      </button>
                      {offer.status !== 'EXPIRED' && (
                        <button onClick={() => handleArchive(offer.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 border border-white/10 text-[11px] font-bold cursor-pointer transition ml-auto">
                          <Archive className="w-3.5 h-3.5" /> Archive
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════ TAB: SEASONS CALENDAR ═══════════════ */}
      {activeTab === 'seasons' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Seasons Calendar</h2>
            <div className="flex gap-2">
              {(['PEAK', 'OFF_PEAK', 'SHOULDER'] as SeasonType[]).map(t => {
                const s = SEASON_STYLE[t];
                return (
                  <span key={t} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${s.bg} ${s.text} ${s.border}`}>
                    <s.Icon className="w-3 h-3" /> {s.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {seasons.map(season => {
              const style = SEASON_STYLE[season.type];
              const linkedOffers = offers.filter(o => o.seasonId === season.id);
              return (
                <div key={season.id} className={`bg-[#001E36] border ${style.border} rounded-3xl overflow-hidden shadow-lg`}>
                  <div className={`px-5 py-4 ${style.bg} border-b border-white/8 flex flex-wrap items-center justify-between gap-3`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center`}>
                        <style.Icon className={`w-4.5 h-4.5 ${style.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{season.name}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${SEASON_STATUS_BADGE[season.status]}`}>{season.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{season.destination} · {season.startDate} → {season.endDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-bold ${style.text}`}>{linkedOffers.length} Linked Offer{linkedOffers.length !== 1 ? 's' : ''}</span>
                      {season.status !== 'ARCHIVED' && (
                        <button onClick={() => handleArchiveSeason(season.id)} className="text-[11px] text-slate-400 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 px-3 py-1 rounded-xl font-bold cursor-pointer transition flex items-center gap-1.5">
                          <Archive className="w-3 h-3" /> Archive
                        </button>
                      )}
                    </div>
                  </div>

                  {(season.notes || linkedOffers.length > 0) && (
                    <div className="px-5 py-4 space-y-3">
                      {season.notes && (
                        <p className="text-[11px] text-slate-400 italic">"{season.notes}"</p>
                      )}
                      {linkedOffers.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {linkedOffers.map(o => {
                            const sb = STATUS_BADGE[o.status];
                            return (
                              <span key={o.id} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${sb.cls}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sb.dot}`} />
                                {o.offerCode}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════ TAB: RULES ENGINE ═══════════════ */}
      {activeTab === 'rules' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-white">Eligibility Rules Engine</h2>
            <p className="text-[11px] text-slate-500">Rules are evaluated at checkout against the guest's profile and booking parameters.</p>
          </div>

          {rules.map(rule => {
            const offer = offers.find(o => o.id === rule.offerId);
            const isExpanded = expandedRule === rule.id;
            return (
              <div key={rule.id} className="bg-[#001E36] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                <button
                  onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-black font-mono bg-[#001428] border border-white/15 px-2.5 py-1 rounded-lg text-[#00D2C4] shrink-0">{rule.offerCode}</span>
                    <span className="text-sm font-bold text-white truncate">{offer?.name ?? 'Unknown Offer'}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {rule.minStayNights > 1 && <span className="text-[10px] bg-sky-500/15 text-sky-300 border border-sky-500/30 rounded-full px-2 py-0.5 font-bold">{rule.minStayNights}+ nights</span>}
                      {rule.minAdvanceBookingDays > 0 && <span className="text-[10px] bg-violet-500/15 text-violet-300 border border-violet-500/30 rounded-full px-2 py-0.5 font-bold">{rule.minAdvanceBookingDays}+ days advance</span>}
                      {rule.guestTierEligibility !== 'ALL' && <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full px-2 py-0.5 font-bold">{rule.guestTierEligibility.replace(/_/g, ' ')}</span>}
                      {rule.isStackable && <span className="text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full px-2 py-0.5 font-bold">Stackable</span>}
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/8 pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-[11px]">
                    {[
                      { label: 'Minimum Stay', value: `${rule.minStayNights} night${rule.minStayNights !== 1 ? 's' : ''}` },
                      { label: 'Advance Booking', value: rule.minAdvanceBookingDays > 0 ? `${rule.minAdvanceBookingDays} days before arrival` : 'No minimum' },
                      { label: 'Guest Tier', value: rule.guestTierEligibility.replace(/_/g, ' ') },
                      { label: 'Max Uses / Guest', value: `${rule.maxUsesPerGuest} use${rule.maxUsesPerGuest !== 1 ? 's' : ''}` },
                      { label: 'Stackable', value: rule.isStackable ? '✓ Yes — combinable with other offers' : '✗ No — single offer only' },
                      { label: 'Channel', value: offer?.channel === 'BOTH' ? 'Direct + B2B' : (offer?.channel ?? 'Both') },
                    ].map(item => (
                      <div key={item.label} className="bg-[#001428] border border-white/10 rounded-xl p-3">
                        <span className="text-slate-500 block text-[10px] mb-0.5">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════════ TAB: OFFER ANALYTICS ═══════════════ */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Active Offers', value: liveOffers, sub: 'Currently LIVE', color: 'text-emerald-400', border: 'border-emerald-500/20' },
              { label: 'Total Redemptions MTD', value: totalRedemptions, sub: 'All offer types combined', color: 'text-sky-400', border: 'border-sky-500/20' },
              { label: 'Est. Revenue Impact', value: '₹32.4L', sub: 'Gross value of redeemed offers', color: 'text-[#FFC857]', border: 'border-[#FFC857]/20' },
              { label: 'Avg Discount %', value: '18.4%', sub: 'Weighted across active offers', color: 'text-violet-400', border: 'border-violet-500/20' },
            ].map(kpi => (
              <div key={kpi.label} className={`bg-[#001E36] border ${kpi.border} rounded-3xl p-5 shadow-lg`}>
                <div className={`text-2xl font-black ${kpi.color} mb-1`}>{kpi.value}</div>
                <div className="text-xs font-bold text-white mb-0.5">{kpi.label}</div>
                <div className="text-[10px] text-slate-500">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Top Offers Bar Chart */}
          <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#FFC857]" /> Top 5 Offers by Redemption
            </h3>
            <div className="space-y-4">
              {topOffers.map((offer, i) => {
                const barPct = Math.round((offer.redemptionCount / maxRedemptions) * 100);
                const typeInfo = OFFER_TYPE_STYLE[offer.type];
                return (
                  <div key={offer.id} className="flex items-center gap-3">
                    <span className="text-[11px] font-black text-slate-500 w-4 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <span className="text-[11px] font-bold text-white truncate">{offer.name}</span>
                        <span className={`text-[11px] font-black shrink-0 ${typeInfo.color}`}>{offer.redemptionCount}</span>
                      </div>
                      <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${i === 0 ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFC857]' : i === 1 ? 'bg-[#00A9A5]' : 'bg-slate-500'}`}
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0 w-10 text-right">{barPct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Offer Performance Table */}
          <div className="bg-[#001E36] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-white">Full Offer Performance Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/8 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="text-left px-6 py-3">Offer</th>
                    <th className="text-left px-4 py-3">Type</th>
                    <th className="text-right px-4 py-3">Redemptions</th>
                    <th className="text-right px-4 py-3">Cap Used</th>
                    <th className="text-right px-4 py-3">Est. GMV</th>
                    <th className="text-right px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {offers.map(offer => {
                    const typeInfo = OFFER_TYPE_STYLE[offer.type];
                    const sb = STATUS_BADGE[offer.status];
                    const fillPct = Math.round((offer.redemptionCount / offer.redemptionCap) * 100);
                    const estGmv = offer.type === 'FLAT_DISCOUNT'
                      ? `₹${(offer.redemptionCount * 38000 * (offer.discountValue / 100)).toLocaleString('en-IN')}`
                      : offer.type === 'FREE_NIGHT' ? `₹${(offer.redemptionCount * 42000).toLocaleString('en-IN')}`
                      : offer.redemptionCount > 0 ? `₹${(offer.redemptionCount * 5500).toLocaleString('en-IN')}` : '—';
                    return (
                      <tr key={offer.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-6 py-3">
                          <div className="text-white font-semibold">{offer.name}</div>
                          <div className="text-[10px] font-mono text-[#00D2C4]">{offer.offerCode}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1 ${typeInfo.color} font-bold`}>
                            <typeInfo.Icon className="w-3 h-3" /> {typeInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-white font-bold">{offer.redemptionCount}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`font-bold ${fillPct >= 80 ? 'text-rose-400' : fillPct >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{fillPct}%</span>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-300 font-medium">{estGmv}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-[10px] font-black ${sb.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sb.dot}`} />{sb.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Create Offer Modal ── */}
      {showCreateModal && (
        <CreateOfferModal
          seasons={seasons}
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveOffer}
        />
      )}
    </div>
  );
}
