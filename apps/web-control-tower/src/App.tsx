import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Hotel,
  Plus,
  Users,
  Building2,
  CreditCard,
  Receipt,
  ShieldCheck,
  KeyRound,
  Sparkles,
  UserCheck,
  Check,
  Download,
  Eye,
  ChevronRight,
  X,
  Package,
} from 'lucide-react';
import { HorizontalLogo } from '@staysphere/ui-kit';

// Persona / Role Types
export type PlatformRole = 'RELATIONSHIP_MANAGER' | 'FRONTDESK' | 'FINANCE_PAYMENTS' | 'PROPERTY_SUBSCRIPTIONS' | 'OPS_ADMIN';

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: PlatformRole;
  title: string;
  avatar: string;
  assignedProperty?: string;
}

const DEMO_ACCOUNTS: Record<PlatformRole, UserSession> = {
  RELATIONSHIP_MANAGER: {
    id: 'usr-rm-1',
    name: 'Vikramaditya Singh',
    email: 'vikram.rm@staysphere.io',
    role: 'RELATIONSHIP_MANAGER',
    title: 'Senior Relationship Manager (West & North India Estates)',
    avatar: 'VS',
  },
  FRONTDESK: {
    id: 'usr-fd-1',
    name: 'Ananya Deshmukh',
    email: 'ananya.frontdesk@vanaazure.com',
    role: 'FRONTDESK',
    title: 'Head of Frontdesk & Concierge (The Vana Azure Ocean Estate)',
    avatar: 'AD',
    assignedProperty: 'The Vana Azure Private Ocean Villa & Estate',
  },
  FINANCE_PAYMENTS: {
    id: 'usr-fin-1',
    name: 'Rajesh Khosla',
    email: 'rajesh.finance@staysphere.io',
    role: 'FINANCE_PAYMENTS',
    title: 'Chief Financial Officer & Escrow Vault Custodian',
    avatar: 'RK',
  },
  PROPERTY_SUBSCRIPTIONS: {
    id: 'usr-sub-1',
    name: 'Sarah Al Mansoor',
    email: 'sarah.partnerships@staysphere.io',
    role: 'PROPERTY_SUBSCRIPTIONS',
    title: 'Head of Hotel, Resort & Apartment Partner Subscriptions',
    avatar: 'SM',
  },
  OPS_ADMIN: {
    id: 'usr-adm-1',
    name: 'Devraj Mukherjee',
    email: 'devraj.lead@staysphere.io',
    role: 'OPS_ADMIN',
    title: 'Chief Operating Officer & Central Resolution Desk Lead',
    avatar: 'DM',
  },
};

// Hotel Partner Details for RM Workflow
interface HotelPartnerRecord {
  id: string;
  name: string;
  location: string;
  category: string;
  tier: 'ROYAL_SOVEREIGN' | 'GOLD_PRESTIGE' | 'SILVER_CLASSIC';
  totalSuites: number;
  occupancyPct: number;
  baseRate: number;
  commissionPct: number;
  trustAuditScore: number;
  contractStatus: 'ACTIVE' | 'RENEWAL_DUE' | 'AUDIT_PENDING';
  contractExpires: string;
  rateParityStatus: 'IN_SYNC' | 'DISCREPANCY';
  monthlyRevenue: number;
}

// Frontdesk Room/Guest Record
interface FrontdeskGuestRecord {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'EXPECTED_TODAY' | 'CHECKED_IN' | 'CHECKED_OUT';
  flightTransitCode: string;
  transitStatus: 'LANDED_EN_ROUTE' | 'ON_TIME' | 'SELF_TRANSIT';
  keycardActive: boolean;
  vipTier: string;
  activeRequests: number;
}

// Payment & Escrow Transaction Record
interface PaymentReceiptRecord {
  id: string;
  receiptNumber: string;
  guestName: string;
  propertyName: string;
  date: string;
  stayAmount: number;
  transitAmount: number;
  taxesAmount: number;
  totalAmount: number;
  paymentMethod: string;
  escrowStatus: 'ESCROW_LOCKED' | 'RELEASED_TO_HOST' | 'REFUNDED' | 'DISPUTE_HELD';
  releaseETA: string;
}

// Hotel / Resort / Apartment Partnership Plan Record (Like OYO / Luxury Network)
interface PropertySubscriptionRecord {
  id: string;
  propertyName: string;
  location: string;
  propertyType: '5-Star Resort' | 'Heritage Palace' | 'Alpine Chalet' | 'Luxury Serviced Penthouse' | 'Boutique Hotel';
  partnershipPlan: 'VERIFIED_BOUTIQUE' | 'PREMIER_RESORT' | 'SOVEREIGN_FLAGSHIP';
  monthlyBaseFee: number;
  commissionPct: number;
  totalKeys: number;
  allottedKeysToStaySphere: number;
  monthlyGMVGenerated: number;
  escrowPayoutCycle: string;
  qualityAuditScore: number;
  onboardingDate: string;
  status: 'ACTIVE' | 'AUDIT_PENDING' | 'EXPIRING_SOON';
}

// Mock Data Sets
const INITIAL_HOTELS: HotelPartnerRecord[] = [
  {
    id: 'hp-1',
    name: 'The Vana Azure Private Ocean Villa & Estate',
    location: 'Sinquerim Cliffs, North Goa',
    category: 'Oceanfront Estate',
    tier: 'ROYAL_SOVEREIGN',
    totalSuites: 12,
    occupancyPct: 92,
    baseRate: 42000,
    commissionPct: 12,
    trustAuditScore: 99.8,
    contractStatus: 'ACTIVE',
    contractExpires: '31 Dec 2027',
    rateParityStatus: 'IN_SYNC',
    monthlyRevenue: 14200000,
  },
  {
    id: 'hp-2',
    name: 'The Maharaja Pichola Royal Palace',
    location: 'Lake Pichola, Udaipur, Rajasthan',
    category: 'Heritage Palace',
    tier: 'ROYAL_SOVEREIGN',
    totalSuites: 24,
    occupancyPct: 88,
    baseRate: 65000,
    commissionPct: 15,
    trustAuditScore: 100.0,
    contractStatus: 'ACTIVE',
    contractExpires: '15 Aug 2028',
    rateParityStatus: 'IN_SYNC',
    monthlyRevenue: 28500000,
  },
  {
    id: 'hp-3',
    name: 'The Celestial Alpine Glass Chalet & Spa',
    location: 'Solang Heights, Manali',
    category: 'Alpine Chalet',
    tier: 'GOLD_PRESTIGE',
    totalSuites: 8,
    occupancyPct: 79,
    baseRate: 36000,
    commissionPct: 14,
    trustAuditScore: 99.4,
    contractStatus: 'RENEWAL_DUE',
    contractExpires: '30 Sep 2026',
    rateParityStatus: 'DISCREPANCY',
    monthlyRevenue: 6800000,
  },
  {
    id: 'hp-4',
    name: 'The Sovereign Horizon Sky Penthouse',
    location: 'Bandra West, Mumbai',
    category: 'Luxury Penthouse',
    tier: 'ROYAL_SOVEREIGN',
    totalSuites: 4,
    occupancyPct: 95,
    baseRate: 48000,
    commissionPct: 12,
    trustAuditScore: 99.7,
    contractStatus: 'ACTIVE',
    contractExpires: '10 Jan 2028',
    rateParityStatus: 'IN_SYNC',
    monthlyRevenue: 5400000,
  },
];

const INITIAL_FRONTDESK_GUESTS: FrontdeskGuestRecord[] = [
  {
    id: 'fd-1',
    guestName: 'Vikram Malhotra & Family',
    roomNumber: 'Villa 101 (Horizon Oceanfront)',
    roomType: 'Horizon Oceanfront Villa (3,800 sq.ft)',
    checkInDate: 'Today (07 Sep)',
    checkOutDate: '10 Sep 2026',
    status: 'EXPECTED_TODAY',
    flightTransitCode: 'Maybach S680 / 6E-204 from DEL',
    transitStatus: 'LANDED_EN_ROUTE',
    keycardActive: false,
    vipTier: 'Sovereign Black Tier',
    activeRequests: 1,
  },
  {
    id: 'fd-2',
    guestName: 'Dr. Siddharth & Rhea Singhania',
    roomNumber: 'Suite 204 (Royal Sea Cliff)',
    roomType: 'Presidential Royal Sea Sanctuary',
    checkInDate: 'Yesterday (06 Sep)',
    checkOutDate: '12 Sep 2026',
    status: 'CHECKED_IN',
    flightTransitCode: 'Defender 110 (In-Stay)',
    transitStatus: 'ON_TIME',
    keycardActive: true,
    vipTier: 'Diplomatic Pass',
    activeRequests: 2,
  },
  {
    id: 'fd-3',
    guestName: 'Elena Rostova (Executive Retinue)',
    roomNumber: 'Villa 102 (Azure Sunset)',
    roomType: 'Horizon Oceanfront Villa',
    checkInDate: '04 Sep 2026',
    checkOutDate: 'Today (07 Sep)',
    status: 'CHECKED_OUT',
    flightTransitCode: 'Maybach S680 to GOI T2',
    transitStatus: 'ON_TIME',
    keycardActive: false,
    vipTier: 'Global Elite VIP',
    activeRequests: 0,
  },
];

const INITIAL_PAYMENTS: PaymentReceiptRecord[] = [
  {
    id: 'pay-1',
    receiptNumber: 'RCP-SS-2026-9041',
    guestName: 'Vikram Malhotra',
    propertyName: 'The Vana Azure Ocean Estate',
    date: '07 Sep 2026',
    stayAmount: 126000,
    transitAmount: 4500,
    taxesAmount: 15660,
    totalAmount: 146160,
    paymentMethod: 'Amex Centurion Black',
    escrowStatus: 'ESCROW_LOCKED',
    releaseETA: 'In 2 hrs (Post Check-In)',
  },
  {
    id: 'pay-2',
    receiptNumber: 'RCP-SS-2026-9040',
    guestName: 'Dr. Siddharth Singhania',
    propertyName: 'The Vana Azure Ocean Estate',
    date: '06 Sep 2026',
    stayAmount: 234000,
    transitAmount: 7600,
    taxesAmount: 28992,
    totalAmount: 270592,
    paymentMethod: 'HDFC Infinia Metal',
    escrowStatus: 'RELEASED_TO_HOST',
    releaseETA: 'Settled to Coastal Hospitality LLP',
  },
  {
    id: 'pay-3',
    receiptNumber: 'RCP-SS-2026-9039',
    guestName: 'Elena Rostova',
    propertyName: 'The Sovereign Horizon Sky Penthouse',
    date: '04 Sep 2026',
    stayAmount: 144000,
    transitAmount: 9000,
    taxesAmount: 18360,
    totalAmount: 171360,
    paymentMethod: 'Wire Transfer / Swift',
    escrowStatus: 'RELEASED_TO_HOST',
    releaseETA: 'Settled to Bandra Sky Residences',
  },
];

const INITIAL_PROPERTY_SUBSCRIPTIONS: PropertySubscriptionRecord[] = [
  {
    id: 'psub-1',
    propertyName: 'The Vana Azure Private Ocean Villa & Estate',
    location: 'Sinquerim Cliffs, North Goa',
    propertyType: '5-Star Resort',
    partnershipPlan: 'SOVEREIGN_FLAGSHIP',
    monthlyBaseFee: 59999,
    commissionPct: 12,
    totalKeys: 12,
    allottedKeysToStaySphere: 12,
    monthlyGMVGenerated: 14200000,
    escrowPayoutCycle: '2-Hr Post Check-In (Automated)',
    qualityAuditScore: 99.8,
    onboardingDate: '15 Jan 2025',
    status: 'ACTIVE',
  },
  {
    id: 'psub-2',
    propertyName: 'The Maharaja Pichola Royal Palace',
    location: 'Lake Pichola, Udaipur, Rajasthan',
    propertyType: 'Heritage Palace',
    partnershipPlan: 'SOVEREIGN_FLAGSHIP',
    monthlyBaseFee: 59999,
    commissionPct: 15,
    totalKeys: 24,
    allottedKeysToStaySphere: 20,
    monthlyGMVGenerated: 28500000,
    escrowPayoutCycle: '2-Hr Post Check-In (Automated)',
    qualityAuditScore: 100.0,
    onboardingDate: '10 Aug 2024',
    status: 'ACTIVE',
  },
  {
    id: 'psub-3',
    propertyName: 'The Celestial Alpine Glass Chalet & Spa',
    location: 'Solang Heights, Manali',
    propertyType: 'Alpine Chalet',
    partnershipPlan: 'PREMIER_RESORT',
    monthlyBaseFee: 29999,
    commissionPct: 14,
    totalKeys: 8,
    allottedKeysToStaySphere: 8,
    monthlyGMVGenerated: 6800000,
    escrowPayoutCycle: '2-Hr Post Check-In (Automated)',
    qualityAuditScore: 99.4,
    onboardingDate: '01 Nov 2025',
    status: 'EXPIRING_SOON',
  },
  {
    id: 'psub-4',
    propertyName: 'The Sovereign Horizon Sky Penthouse',
    location: 'Bandra West, Mumbai',
    propertyType: 'Luxury Serviced Penthouse',
    partnershipPlan: 'PREMIER_RESORT',
    monthlyBaseFee: 29999,
    commissionPct: 12,
    totalKeys: 4,
    allottedKeysToStaySphere: 4,
    monthlyGMVGenerated: 5400000,
    escrowPayoutCycle: '2-Hr Post Check-In (Automated)',
    qualityAuditScore: 99.7,
    onboardingDate: '05 Mar 2025',
    status: 'ACTIVE',
  },
];

export default function OperationsControlTower() {
  // Session / Authentication State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(DEMO_ACCOUNTS.RELATIONSHIP_MANAGER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeWorkflow, setActiveWorkflow] = useState<'rm' | 'frontdesk' | 'payments' | 'subscriptions' | 'resolution'>('rm');

  // Workflows Datasets
  const [hotels, setHotels] = useState<HotelPartnerRecord[]>(INITIAL_HOTELS);
  const [frontdeskGuests, setFrontdeskGuests] = useState<FrontdeskGuestRecord[]>(INITIAL_FRONTDESK_GUESTS);
  const [payments, setPayments] = useState<PaymentReceiptRecord[]>(INITIAL_PAYMENTS);
  const [propertySubscriptions, setPropertySubscriptions] = useState<PropertySubscriptionRecord[]>(INITIAL_PROPERTY_SUBSCRIPTIONS);

  // Modals State
  const [viewingReceipt, setViewingReceipt] = useState<PaymentReceiptRecord | null>(null);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);
  const [newPropertyForm, setNewPropertyForm] = useState<{
    name: string;
    location: string;
    propertyType: '5-Star Resort' | 'Heritage Palace' | 'Alpine Chalet' | 'Luxury Serviced Penthouse' | 'Boutique Hotel';
    partnershipPlan: 'VERIFIED_BOUTIQUE' | 'PREMIER_RESORT' | 'SOVEREIGN_FLAGSHIP';
    keysCount: number;
  }>({
    name: '',
    location: 'Goa',
    propertyType: '5-Star Resort',
    partnershipPlan: 'PREMIER_RESORT',
    keysCount: 15,
  });

  // Success Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Login handler
  const handleSwitchRole = (role: PlatformRole) => {
    const account = DEMO_ACCOUNTS[role];
    setCurrentUser(account);
    setIsAuthModalOpen(false);

    // Automatically navigate to appropriate primary tab
    if (role === 'RELATIONSHIP_MANAGER') setActiveWorkflow('rm');
    else if (role === 'FRONTDESK') setActiveWorkflow('frontdesk');
    else if (role === 'FINANCE_PAYMENTS') setActiveWorkflow('payments');
    else if (role === 'PROPERTY_SUBSCRIPTIONS') setActiveWorkflow('subscriptions');
    else setActiveWorkflow('rm');

    showToast(`Logged in as ${account.name} (${account.role})`);
  };

  // RM Action: Sync Rate Parity
  const handleFixRateParity = (hotelId: string) => {
    setHotels((prev) =>
      prev.map((h) => (h.id === hotelId ? { ...h, rateParityStatus: 'IN_SYNC' } : h))
    );
    showToast('Rate parity automatically re-aligned across OTAs and direct channels.');
  };

  // Frontdesk Action: Issue Keycard & Check-in
  const handleCheckInGuest = (id: string) => {
    setFrontdeskGuests((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: 'CHECKED_IN', keycardActive: true }
          : g
      )
    );
    showToast('VIP Check-In Completed! NFC Keycard Activated for Villa 101.');
  };

  // Finance Action: Release Escrow
  const handleReleaseEscrow = (id: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, escrowStatus: 'RELEASED_TO_HOST', releaseETA: 'Settled to Partner Bank Account' }
          : p
      )
    );
    showToast('Smart Escrow Disbursed! Funds released to Property Operator.');
  };

  // Property Subscription Action: Upgrade Tier
  const handleUpgradePropertyPlan = (subId: string) => {
    setPropertySubscriptions((prev) =>
      prev.map((s) =>
        s.id === subId
          ? {
              ...s,
              partnershipPlan: 'SOVEREIGN_FLAGSHIP',
              monthlyBaseFee: 59999,
              commissionPct: 15,
              status: 'ACTIVE',
            }
          : s
      )
    );
    showToast('Property partnership upgraded to Sovereign Flagship Franchise!');
  };

  // Onboard New Property Partner Form Submit
  const handleOnboardPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropertyForm.name.trim()) return;

    const baseFee = newPropertyForm.partnershipPlan === 'SOVEREIGN_FLAGSHIP' ? 59999 : newPropertyForm.partnershipPlan === 'PREMIER_RESORT' ? 29999 : 14999;
    const commPct = newPropertyForm.partnershipPlan === 'SOVEREIGN_FLAGSHIP' ? 15 : newPropertyForm.partnershipPlan === 'PREMIER_RESORT' ? 12 : 8;

    const newRecord: PropertySubscriptionRecord = {
      id: `psub-${Date.now()}`,
      propertyName: newPropertyForm.name,
      location: newPropertyForm.location,
      propertyType: newPropertyForm.propertyType,
      partnershipPlan: newPropertyForm.partnershipPlan,
      monthlyBaseFee: baseFee,
      commissionPct: commPct,
      totalKeys: newPropertyForm.keysCount,
      allottedKeysToStaySphere: Math.round(newPropertyForm.keysCount * 0.85),
      monthlyGMVGenerated: 0,
      escrowPayoutCycle: '2-Hr Post Check-In (Automated)',
      qualityAuditScore: 100.0,
      onboardingDate: 'Just Now',
      status: 'ACTIVE',
    };

    setPropertySubscriptions([newRecord, ...propertySubscriptions]);
    setIsOnboardingModalOpen(false);
    setNewPropertyForm({ name: '', location: 'Goa', propertyType: '5-Star Resort', partnershipPlan: 'PREMIER_RESORT', keysCount: 15 });
    showToast(`Property "${newRecord.propertyName}" partnered successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#001428] text-white flex flex-col font-sans selection:bg-[#00A9A5] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#00A9A5] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#3CCF91]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Application Switcher Bar */}
      <div className="bg-[#000B17] border-b border-white/10 px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-[#00A9A5] animate-pulse" />
          <span>StaySphere Operational Control: <strong className="text-white">Hotel & Property Network Hub (Port 3002)</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#002B4D] border border-[#00A9A5]/40 text-[#00D2C4] font-bold hover:brightness-110 text-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Switch Role / Login</span>
          </button>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-xs hover:brightness-110 shadow-sm"
          >
            <Hotel className="w-3.5 h-3.5" />
            <span>Guest Experience Portal (Port 3000) ↗</span>
          </a>
        </div>
      </div>

      {/* Operations Master Header */}
      <header className="h-20 border-b border-white/10 bg-[#001020]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <HorizontalLogo size="md" variant="dark" />
          <span className="text-[11px] px-3 py-1 rounded-full bg-[#00A9A5]/10 text-[#00D2C4] border border-[#00A9A5]/30 font-bold uppercase tracking-wider hidden sm:inline-block">
            Hotel & Franchise Operations v3.3
          </span>
        </div>

        {/* Global Navigation Bar */}
        <nav className="flex items-center gap-1 p-1 rounded-2xl bg-[#000E1C] border border-white/10 text-xs font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveWorkflow('rm')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'rm'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#00D2C4]" /> 1. Relationship Manager (RM)
          </button>

          <button
            onClick={() => setActiveWorkflow('frontdesk')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'frontdesk'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-[#FFC857]" /> 2. Frontdesk & Butler
          </button>

          <button
            onClick={() => setActiveWorkflow('payments')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'payments'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="w-3.5 h-3.5 text-[#3CCF91]" /> 3. Payments & Receipts
          </button>

          <button
            onClick={() => setActiveWorkflow('subscriptions')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'subscriptions'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-[#FF8A3D]" /> 4. Property Partner Subscriptions
          </button>
        </nav>

        {/* User Persona Profile Pill */}
        {currentUser && (
          <div
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-3 p-1.5 pr-3.5 rounded-2xl bg-[#001830] border border-white/10 hover:border-[#00A9A5]/60 transition-all cursor-pointer hidden xl:flex"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] flex items-center justify-center text-xs font-black text-white shrink-0">
              {currentUser.avatar}
            </div>
            <div className="text-left leading-none">
              <span className="text-xs font-bold text-white block">{currentUser.name}</span>
              <span className="text-[10px] text-[#00D2C4] font-medium block mt-0.5">{currentUser.role.replace('_', ' ')}</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Workspaces Area */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full space-y-8">
        {/* Role Context Notification Bar */}
        {currentUser && (
          <div className="p-4 rounded-2xl bg-[#001A33] border border-[#00A9A5]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#002B4D] border border-[#00A9A5]/40 flex items-center justify-center text-[#00A9A5]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">{currentUser.title}</strong>
                <span className="text-slate-400">Authenticated as <code className="text-[#00D2C4]">{currentUser.email}</code></span>
              </div>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-bold self-start sm:self-auto"
            >
              Switch Role Workspace ↗
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORKFLOW 1: RELATIONSHIP MANAGER (RM) WORKSPACE                           */}
        {/* ========================================================================= */}
        {activeWorkflow === 'rm' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#00D2C4] uppercase tracking-widest flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Luxury Portfolio Governance
                </span>
                <h1 className="text-3xl font-black text-white mt-1">Relationship Manager Workspace</h1>
                <p className="text-xs text-slate-300 mt-1">
                  Manage hotel and villa partner accounts, contract renewals, rate parity, and trust audit scores.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-xl bg-[#3CCF91]/20 text-[#3CCF91] font-bold border border-[#3CCF91]/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4 Active Partner Contracts
                </span>
              </div>
            </div>

            {/* RM Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Portfolio Revenue (MTD)</span>
                <span className="text-2xl font-black text-white">₹54.90M</span>
                <span className="text-[11px] text-[#3CCF91] block font-bold">+18.4% vs last month</span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Average Portfolio Trust</span>
                <span className="text-2xl font-black text-[#00D2C4]">99.72%</span>
                <span className="text-[11px] text-slate-400 block">84-point audit certified</span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Rate Parity Sync</span>
                <span className="text-2xl font-black text-[#FFC857]">75% Synced</span>
                <span className="text-[11px] text-[#FF8A3D] block font-bold">1 Discrepancy Flagged</span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Contracts Due Renewal</span>
                <span className="text-2xl font-black text-[#FF8A3D]">1 Estate</span>
                <span className="text-[11px] text-slate-400 block">Solang Alpine (30 Sep)</span>
              </div>
            </div>

            {/* Hotel & Resort Partner Table */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-[#00A9A5]" />
                  <span>Assigned Hotel & Resort Portfolio</span>
                </h3>
                <span className="text-xs text-slate-400">All partner payouts secured in escrow</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#000E1C] border-b border-white/10 text-slate-400 uppercase font-mono text-[11px]">
                      <th className="p-4">Property & Location</th>
                      <th className="p-4">Partnership Tier</th>
                      <th className="p-4">Base Rate / Night</th>
                      <th className="p-4">Trust Audit</th>
                      <th className="p-4">Rate Parity</th>
                      <th className="p-4">Contract Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {hotels.map((hotel) => (
                      <tr key={hotel.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <strong className="text-white text-sm block font-bold">{hotel.name}</strong>
                          <span className="text-slate-400">{hotel.location} • {hotel.totalSuites} Suites</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#FFC857]/20 text-[#FFC857] text-[10px] font-black border border-[#FFC857]/40">
                            {hotel.tier.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white text-sm">₹{hotel.baseRate.toLocaleString()}</span>
                          <span className="text-slate-400 block text-[10px]">{hotel.commissionPct}% RM Commission</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-[#3CCF91] text-sm">{hotel.trustAuditScore}%</span>
                          <span className="text-slate-400 block text-[10px]">Verified Audit</span>
                        </td>
                        <td className="p-4">
                          {hotel.rateParityStatus === 'IN_SYNC' ? (
                            <span className="text-[#3CCF91] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> In Sync
                            </span>
                          ) : (
                            <span className="text-[#FF8A3D] font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Price Mismatch
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`text-xs font-bold block ${hotel.contractStatus === 'ACTIVE' ? 'text-[#3CCF91]' : 'text-[#FF8A3D]'}`}>
                            {hotel.contractStatus}
                          </span>
                          <span className="text-[10px] text-slate-400">Exp: {hotel.contractExpires}</span>
                        </td>
                        <td className="p-4 text-right">
                          {hotel.rateParityStatus === 'DISCREPANCY' ? (
                            <button
                              onClick={() => handleFixRateParity(hotel.id)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-bold text-xs hover:brightness-110 shadow-sm"
                            >
                              Fix Parity Sync
                            </button>
                          ) : (
                            <button
                              onClick={() => showToast(`Audit details for ${hotel.name} opened.`)}
                              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10"
                            >
                              View Contract
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORKFLOW 2: FRONTDESK & IN-STAY BUTLER WORKSPACE                          */}
        {/* ========================================================================= */}
        {activeWorkflow === 'frontdesk' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#FFC857] uppercase tracking-widest flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" /> Property Operations & Butler Desk
                </span>
                <h1 className="text-3xl font-black text-white mt-1">Frontdesk & Concierge Workspace</h1>
                <p className="text-xs text-slate-300 mt-1">
                  Assigned Property: <strong>The Vana Azure Private Ocean Villa & Estate</strong> • Live Maybach flight sync active.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-xl bg-[#00A9A5]/20 text-[#00D2C4] font-bold border border-[#00A9A5]/40 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 10-Minute Butler SLA Active
                </span>
              </div>
            </div>

            {/* Frontdesk Guest Queue */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-xl space-y-4">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#FFC857]" />
                  <span>Today's Guest Arrivals & Active In-Suite Retinue</span>
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {frontdeskGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="p-5 rounded-2xl bg-[#001020] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{guest.guestName}</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] font-bold">
                          {guest.vipTier}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{guest.roomNumber}</p>
                      <span className="text-[11px] text-[#00D2C4] font-medium block">{guest.flightTransitCode}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                        <span className="font-bold text-white">{guest.status.replace('_', ' ')}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Digital Key</span>
                        <span className={`font-bold ${guest.keycardActive ? 'text-[#3CCF91]' : 'text-slate-500'}`}>
                          {guest.keycardActive ? '● Active & Armed' : '○ Pending Check-In'}
                        </span>
                      </div>

                      {guest.status === 'EXPECTED_TODAY' && (
                        <button
                          onClick={() => handleCheckInGuest(guest.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] hover:brightness-110 text-white font-black text-xs shadow-lg flex items-center gap-1.5"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          <span>Check-In & Issue Key</span>
                        </button>
                      )}

                      {guest.status === 'CHECKED_IN' && (
                        <button
                          onClick={() => showToast(`Butler dispatched to ${guest.roomNumber}`)}
                          className="px-4 py-2 rounded-xl bg-[#002B4D] hover:bg-[#003A66] text-[#00D2C4] font-bold text-xs border border-[#00A9A5]/40"
                        >
                          Dispatch Butler Request ({guest.activeRequests})
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORKFLOW 3: PAYMENTS, ESCROW & RECEIPTS WORKSPACE                         */}
        {/* ========================================================================= */}
        {activeWorkflow === 'payments' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#3CCF91] uppercase tracking-widest flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5" /> Institutional Smart Escrow Vault
                </span>
                <h1 className="text-3xl font-black text-white mt-1">Payments & Receipts Ledger</h1>
                <p className="text-xs text-slate-300 mt-1">
                  Immutable smart escrow tracking, guest receipts, tax invoices, and verified host disbursements.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-xl bg-[#3CCF91]/20 text-[#3CCF91] font-bold border border-[#3CCF91]/40 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> ₹14,820,000.00 Escrow Vault Active
                </span>
              </div>
            </div>

            {/* Payments Table */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#3CCF91]" />
                  <span>Escrow Transactions & VIP Receipt Repository</span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#000E1C] border-b border-white/10 text-slate-400 uppercase font-mono text-[11px]">
                      <th className="p-4">Receipt #</th>
                      <th className="p-4">Guest & Property</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Escrow Status</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono font-bold text-white">{p.receiptNumber}</td>
                        <td className="p-4">
                          <strong className="text-white block font-bold">{p.guestName}</strong>
                          <span className="text-slate-400">{p.propertyName}</span>
                        </td>
                        <td className="p-4 text-slate-300">{p.paymentMethod}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            p.escrowStatus === 'ESCROW_LOCKED'
                              ? 'bg-[#FF8A3D]/20 text-[#FF8A3D] border-[#FF8A3D]/40'
                              : 'bg-[#3CCF91]/20 text-[#3CCF91] border-[#3CCF91]/40'
                          }`}>
                            {p.escrowStatus.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-1">{p.releaseETA}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-black text-white text-sm">₹{p.totalAmount.toLocaleString()}</span>
                          <span className="text-slate-400 block text-[10px]">Incl. 12% GST</span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setViewingReceipt(p)}
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 inline-flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Receipt</span>
                          </button>

                          {p.escrowStatus === 'ESCROW_LOCKED' && (
                            <button
                              onClick={() => handleReleaseEscrow(p.id)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#3CCF91] to-[#00A9A5] text-[#001428] font-bold text-xs hover:brightness-110 shadow-sm inline-flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Release Escrow</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORKFLOW 4: PROPERTY PARTNERSHIP SUBSCRIPTIONS & NETWORK FRANCHISE        */}
        {/* (Hotels, Resorts & Serviced Apartments partnering like OYO / Luxury Net)  */}
        {/* ========================================================================= */}
        {activeWorkflow === 'subscriptions' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#FF8A3D] uppercase tracking-widest flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5" /> Property Franchise & Network Plans
                </span>
                <h1 className="text-3xl font-black text-white mt-1">Property Partner Subscriptions</h1>
                <p className="text-xs text-slate-300 mt-1">
                  Manage hotel, resort, and apartment network partnership plans, room key allocations, revenue shares, and quality compliance.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOnboardingModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-xs hover:brightness-110 shadow-lg flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Onboard New Hotel Partner</span>
                </button>
              </div>
            </div>

            {/* Quick Network KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Active Partner Properties</span>
                <span className="text-2xl font-black text-white">4 Estates</span>
                <span className="text-[11px] text-[#3CCF91] block font-bold">52 Committed Keys Total</span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Network Subscription ARR</span>
                <span className="text-2xl font-black text-[#00D2C4]">₹2.22M</span>
                <span className="text-[11px] text-slate-400 block">Monthly Base Membership</span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Gross GMV Delivered</span>
                <span className="text-2xl font-black text-[#FFC857]">₹54.90M</span>
                <span className="text-[11px] text-[#3CCF91] block font-bold">100% Escrow Protected</span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Average Quality Score</span>
                <span className="text-2xl font-black text-[#3CCF91]">99.7%</span>
                <span className="text-[11px] text-slate-400 block">Zero compliance violations</span>
              </div>
            </div>

            {/* 3 Property Partnership Subscription Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan 1 */}
              <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">TIER 01</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold">5–20 Keys</span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">Verified Boutique Partner</h3>
                  <p className="text-xs text-slate-300 mt-1">For independent boutique hotels, luxury serviced apartments & homestays.</p>
                  
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="text-3xl font-black text-white">₹14,999</span>
                    <span className="text-xs text-slate-400"> / month</span>
                    <span className="block text-xs text-[#00D2C4] font-bold mt-1">+ 8% Booking Revenue Share</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> StaySphere Co-Branding & Quality Seal</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Guaranteed Escrow Payouts (2h post check-in)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Channel Manager Sync (OTAs + Direct Engine)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Standard Airport Cab Fleet Integration</li>
                  </ul>
                </div>

                <button
                  onClick={() => showToast('Verified Boutique Tier selected')}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10"
                >
                  View Boutique Contract
                </button>
              </div>

              {/* Plan 2 */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-[#002244] to-[#001428] border border-[#00A9A5] shadow-2xl flex flex-col justify-between space-y-6 relative">
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#00A9A5] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#00D2C4] uppercase tracking-widest">TIER 02</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00D2C4] font-bold">20–60 Keys</span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">Premier Resort & Villa Partner</h3>
                  <p className="text-xs text-slate-200 mt-1">For luxury 4/5-star beachfront resorts, heritage estates & private pool villas.</p>
                  
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="text-3xl font-black text-white">₹29,999</span>
                    <span className="text-xs text-slate-400"> / month</span>
                    <span className="block text-xs text-[#00D2C4] font-bold mt-1">+ 12% Booking Revenue Share</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-200">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Verified Luxury Audit Badge & Staging</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Dedicated Relationship Manager (RM)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Mercedes-Maybach & Defender Chauffeur Sync</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> In-Suite Butler & Sommelier Concierge Desk</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Guaranteed 90%+ Targeted High-Spend Occupancy</li>
                  </ul>
                </div>

                <button
                  onClick={() => showToast('Premier Resort Tier selected')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white text-xs font-black shadow-lg hover:brightness-110"
                >
                  Premier Resort Terms
                </button>
              </div>

              {/* Plan 3 */}
              <div className="p-6 rounded-3xl glass-panel border border-[#FFC857]/40 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#FFC857] uppercase tracking-widest">TIER 03</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] font-bold">50+ Keys / Chains</span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">Sovereign Flagship Palace Franchise</h3>
                  <p className="text-xs text-slate-300 mt-1">For world-renowned heritage palaces, ultra-luxury chains & private islands.</p>
                  
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="text-3xl font-black text-white">₹59,999</span>
                    <span className="text-xs text-slate-400"> / month</span>
                    <span className="block text-xs text-[#FFC857] font-bold mt-1">+ 15% Booking Revenue Share</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Full Brand Onboarding & St. Regis Staff Certification</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Black Tier VIP Concierge (Private Jet & Yacht Berths)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Zero Chargeback Escrow Guarantee</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3CCF91]" /> Executive 5-Minute Escalation Hotline</li>
                  </ul>
                </div>

                <button
                  onClick={() => showToast('Sovereign Flagship Tier selected')}
                  className="w-full py-2.5 rounded-xl bg-[#FFC857]/20 hover:bg-[#FFC857]/30 text-[#FFC857] text-xs font-bold border border-[#FFC857]/40"
                >
                  Flagship Franchise Terms
                </button>
              </div>
            </div>

            {/* Active Property Partner Subscriptions Table */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#FF8A3D]" />
                    <span>Partnered Properties Network & Key Allocation</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Hotels, Resorts & Luxury Serviced Apartments enrolled under StaySphere partnership plans.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#000E1C] border-b border-white/10 text-slate-400 uppercase font-mono text-[11px]">
                      <th className="p-4">Property & Type</th>
                      <th className="p-4">Partnership Plan</th>
                      <th className="p-4">Base Membership</th>
                      <th className="p-4">Committed Keys</th>
                      <th className="p-4">Monthly GMV Delivered</th>
                      <th className="p-4">Quality Score</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {propertySubscriptions.map((ps) => (
                      <tr key={ps.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <strong className="text-white font-bold text-sm block">{ps.propertyName}</strong>
                          <span className="text-slate-400">{ps.location} • <em className="text-[#00D2C4] not-italic">{ps.propertyType}</em></span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                            ps.partnershipPlan === 'SOVEREIGN_FLAGSHIP'
                              ? 'bg-[#FFC857]/20 text-[#FFC857] border-[#FFC857]/40'
                              : 'bg-[#00A9A5]/20 text-[#00D2C4] border-[#00A9A5]/40'
                          }`}>
                            {ps.partnershipPlan.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white">₹{ps.monthlyBaseFee.toLocaleString()} / mo</span>
                          <span className="text-[10px] text-slate-400 block">{ps.commissionPct}% Revenue Share</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white">{ps.allottedKeysToStaySphere} / {ps.totalKeys} Keys</span>
                          <span className="text-[10px] text-[#3CCF91] block">100% Network Allotted</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-[#3CCF91] text-sm">
                          ₹{(ps.monthlyGMVGenerated / 1000000).toFixed(2)}M
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-[#3CCF91] text-sm">{ps.qualityAuditScore}%</span>
                          <span className="text-[10px] text-slate-400 block">Quality Verified</span>
                        </td>
                        <td className="p-4 text-right">
                          {ps.partnershipPlan !== 'SOVEREIGN_FLAGSHIP' ? (
                            <button
                              onClick={() => handleUpgradePropertyPlan(ps.id)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-bold text-xs hover:brightness-110 shadow-sm"
                            >
                              Upgrade to Flagship
                            </button>
                          ) : (
                            <span className="text-xs text-[#FFC857] font-bold">Flagship MOU Active</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: PLATFORM AUTHENTICATION & ROLE SWITCHER                          */}
      {/* ========================================================================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-elevated w-full max-w-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#00A9A5] uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" /> Single Sign-On & Role Switcher
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Select Operations Persona</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Instantly switch between governance workflows to test specific permissions and operational desks.
                </p>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {(Object.keys(DEMO_ACCOUNTS) as PlatformRole[]).map((roleKey) => {
                const acc = DEMO_ACCOUNTS[roleKey];
                const isActive = currentUser?.role === roleKey;
                return (
                  <div
                    key={roleKey}
                    onClick={() => handleSwitchRole(roleKey)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg shadow-[#00A9A5]/25'
                        : 'bg-[#001020] border-white/10 hover:border-white/25 hover:bg-[#001830]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] flex items-center justify-center text-sm font-black text-white shrink-0">
                        {acc.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-white">{acc.name}</strong>
                          {isActive && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3CCF91]/20 text-[#3CCF91] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 block">{acc.title}</span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INTERACTIVE VIP TAX INVOICE & RECEIPT PREVIEW                    */}
      {/* ========================================================================= */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-elevated w-full max-w-lg rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <HorizontalLogo size="sm" variant="dark" />
                <span className="text-[10px] text-slate-400 font-mono block mt-1">OFFICIAL TAX INVOICE & ESCROW RECEIPT</span>
              </div>
              <button
                onClick={() => setViewingReceipt(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Receipt Number:</span>
                <strong className="text-white font-mono">{viewingReceipt.receiptNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guest Name:</span>
                <strong className="text-white">{viewingReceipt.guestName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Property:</span>
                <strong className="text-white">{viewingReceipt.propertyName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Channel:</span>
                <span className="text-[#00D2C4] font-bold">{viewingReceipt.paymentMethod}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#001020] border border-white/10 space-y-2 mt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Sanctuary Accommodation</span>
                  <span className="font-bold text-white">₹{viewingReceipt.stayAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Chauffeur Transit & Airport Sync</span>
                  <span className="font-bold text-white">₹{viewingReceipt.transitAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST & Hospitality Taxes (12%)</span>
                  <span className="font-bold text-white">₹{viewingReceipt.taxesAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-black text-sm text-white">
                  <span>Total Escrow Amount</span>
                  <span className="text-[#3CCF91] text-base">₹{viewingReceipt.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#002244]/60 border border-[#00A9A5]/40 text-[11px] text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3CCF91] shrink-0" />
                <span>Protected by StaySphere Smart Escrow Protocol • Status: <strong className="text-white">{viewingReceipt.escrowStatus}</strong></span>
              </div>
            </div>

            <div className="flex justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  showToast(`Invoice ${viewingReceipt.receiptNumber} downloaded successfully.`);
                  setViewingReceipt(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Receipt</span>
              </button>

              <button
                onClick={() => setViewingReceipt(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ONBOARD NEW PROPERTY PARTNER (HOTEL/RESORT/APARTMENT FRANCHISE) */}
      {/* ========================================================================= */}
      {isOnboardingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-elevated w-full max-w-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#FF8A3D] uppercase tracking-wider flex items-center gap-1.5">
                  <Hotel className="w-4 h-4" /> Hotel & Property Onboarding
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Enroll New Property Partner</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Partner hotels, resorts, and luxury apartments under StaySphere franchise subscription plans.
                </p>
              </div>
              <button
                onClick={() => setIsOnboardingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleOnboardPropertySubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold uppercase block mb-1">Property Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Palms Beach Resort & Villas"
                  value={newPropertyForm.name}
                  onChange={(e) => setNewPropertyForm({ ...newPropertyForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold outline-none focus:border-[#00A9A5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold uppercase block mb-1">Location / Destination</label>
                  <select
                    value={newPropertyForm.location}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, location: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold outline-none cursor-pointer"
                  >
                    <option value="North Goa">North Goa (Coastal)</option>
                    <option value="Lake Pichola, Udaipur">Lake Pichola, Udaipur</option>
                    <option value="Solang Heights, Manali">Solang Heights, Manali</option>
                    <option value="Bandra West, Mumbai">Bandra West, Mumbai</option>
                    <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                    <option value="Munnar, Kerala">Munnar, Kerala</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase block mb-1">Property Category</label>
                  <select
                    value={newPropertyForm.propertyType}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, propertyType: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold outline-none cursor-pointer"
                  >
                    <option value="5-Star Resort">5-Star Luxury Resort</option>
                    <option value="Heritage Palace">Heritage Palace</option>
                    <option value="Alpine Chalet">Alpine Chalet</option>
                    <option value="Luxury Serviced Penthouse">Luxury Serviced Penthouse</option>
                    <option value="Boutique Hotel">Boutique Hotel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold uppercase block mb-1">Partnership Plan</label>
                  <select
                    value={newPropertyForm.partnershipPlan}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, partnershipPlan: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold outline-none cursor-pointer"
                  >
                    <option value="VERIFIED_BOUTIQUE">Verified Boutique (₹14,999/mo + 8%)</option>
                    <option value="PREMIER_RESORT">Premier Resort & Villa (₹29,999/mo + 12%)</option>
                    <option value="SOVEREIGN_FLAGSHIP">Sovereign Flagship (₹59,999/mo + 15%)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase block mb-1">Total Keys / Inventory</label>
                  <input
                    type="number"
                    min={2}
                    max={200}
                    value={newPropertyForm.keysCount}
                    onChange={(e) => setNewPropertyForm({ ...newPropertyForm, keysCount: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#002244]/60 border border-[#00A9A5]/30 text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3CCF91] shrink-0" />
                <span>Includes Escrow Payment Guarantee, Chauffeur API sync & Quality Audit badge.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOnboardingModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg"
                >
                  Execute Partnership MOU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
