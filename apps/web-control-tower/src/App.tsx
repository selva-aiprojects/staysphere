import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Hotel,
  Users,
  Building2,
  Receipt,
  ShieldCheck,
  KeyRound,
  Sparkles,
  UserCheck,
  Check,
  Download,
  Eye,
  Car,
  MessageSquare,
  LifeBuoy,
  Code,
} from 'lucide-react';
import { HorizontalLogo } from '@staysphere/ui-kit';
import { PropertyPartnersWorkflow } from './components/PropertyPartnersWorkflow';
import { TravelDeskWorkflow } from './components/TravelDeskWorkflow';
import { ChannelPartnersWorkflow } from './components/ChannelPartnersWorkflow';
import {
  CollaborativeTicketsModal,
  CollaborativeTicket,
} from './components/CollaborativeTicketsModal';

import { PartnerApiConsole } from './components/PartnerApiConsole';

// Persona / Role Types
export type PlatformRole =
  | 'RELATIONSHIP_MANAGER'
  | 'PROPERTY_PARTNER'
  | 'FRONTDESK'
  | 'TRAVEL_DESK_LEAD'
  | 'CHANNEL_PARTNER_LEAD'
  | 'FINANCE_PAYMENTS'
  | 'OPS_ADMIN';

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
  PROPERTY_PARTNER: {
    id: 'usr-prop-1',
    name: 'Anil Deshmukh',
    email: 'anil.owner@vanaazure.com',
    role: 'PROPERTY_PARTNER',
    title: 'Managing Partner & Owner (The Vana Azure Ocean Estate)',
    avatar: 'AD',
    assignedProperty: 'The Vana Azure Private Ocean Villa & Estate',
  },
  FRONTDESK: {
    id: 'usr-fd-1',
    name: 'Ananya Deshmukh',
    email: 'ananya.frontdesk@vanaazure.com',
    role: 'FRONTDESK',
    title: 'Head of Frontdesk & Concierge (The Vana Azure Ocean Estate)',
    avatar: 'AN',
    assignedProperty: 'The Vana Azure Private Ocean Villa & Estate',
  },
  TRAVEL_DESK_LEAD: {
    id: 'usr-trv-1',
    name: 'Vikas Rathore',
    email: 'vikas.traveldesk@staysphere.io',
    role: 'TRAVEL_DESK_LEAD',
    title: 'Fleet Telematics Director & Chauffeur Transit Coordinator',
    avatar: 'VR',
  },
  CHANNEL_PARTNER_LEAD: {
    id: 'usr-chan-1',
    name: 'Priya Nambiar',
    email: 'priya.concierge@centurion.amex.com',
    role: 'CHANNEL_PARTNER_LEAD',
    title: 'Head of Luxury Concierge (American Express Centurion B2B)',
    avatar: 'PN',
  },
  FINANCE_PAYMENTS: {
    id: 'usr-fin-1',
    name: 'Rajesh Khosla',
    email: 'rajesh.finance@staysphere.io',
    role: 'FINANCE_PAYMENTS',
    title: 'Chief Financial Officer & Escrow Vault Custodian',
    avatar: 'RK',
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

const INITIAL_COLLAB_TICKETS: CollaborativeTicket[] = [
  {
    id: 'tkt-1',
    ticketNumber: 'SS-OPS-4091',
    title: 'VIP Early Check-in & Helipad Request for Malhotra Family',
    category: 'PROPERTY_HOST',
    partnerName: 'Anil Deshmukh (GM, The Vana Azure)',
    partnerRole: 'Hotel Property Partner',
    assignedStaff: 'Vikramaditya Singh',
    assignedRole: 'Senior Relationship Manager',
    priority: 'P0_CRITICAL',
    status: 'IN_PROGRESS',
    slaMinutesRemaining: 8,
    createdAt: '12 mins ago',
    messages: [
      {
        id: 'm-1',
        sender: 'Anil Deshmukh',
        role: 'Hotel Property Partner',
        avatar: 'AD',
        isStaff: false,
        timestamp: '12 mins ago',
        text: 'Malhotra VIP family is landing early at Mopa GOX on 6E-204. Can we authorize Maybach priority pickup and arm Villa 101 digital key 2 hours early?',
      },
      {
        id: 'm-2',
        sender: 'Vikramaditya Singh',
        role: 'Senior Relationship Manager',
        avatar: 'VS',
        isStaff: true,
        timestamp: '5 mins ago',
        text: 'Approved! I have coordinated with Travel Desk chauffeur Gurpreet (Maybach S680) and pre-armed the AES-256 digital lock for Villa 101.',
        actionBadge: 'Villa 101 Armed & Chauffeur Dispatched',
      },
    ],
  },
  {
    id: 'tkt-2',
    ticketNumber: 'SS-OPS-4092',
    title: 'Airport Security Pass & Flight Delay Sync (6E-204)',
    category: 'TRAVEL_FLEET',
    partnerName: 'Gurpreet Singh',
    partnerRole: 'First-Class Chauffeur Lead',
    assignedStaff: 'Vikas Rathore',
    assignedRole: 'Fleet Telematics Director',
    priority: 'P1_HIGH',
    status: 'RESOLVED',
    slaMinutesRemaining: 45,
    createdAt: '30 mins ago',
    messages: [
      {
        id: 'm-3',
        sender: 'Gurpreet Singh',
        role: 'First-Class Chauffeur Lead',
        avatar: 'GS',
        isStaff: false,
        timestamp: '30 mins ago',
        text: 'Mopa VIP parking bay 4 reached. San Pellegrino bottles and chilled eucalyptus towels pre-arranged in vehicle.',
      },
      {
        id: 'm-4',
        sender: 'Vikas Rathore',
        role: 'Fleet Telematics Director',
        avatar: 'VR',
        isStaff: true,
        timestamp: '20 mins ago',
        text: 'Radar confirmed flight touched down on runway 09. Transit escrow ₹8,500 armed for release upon estate arrival.',
        actionBadge: 'Transit Escrow Armed',
      },
    ],
  },
  {
    id: 'tkt-3',
    ticketNumber: 'SS-OPS-4093',
    title: 'Centurion Black 15% Commission & Multi-Suite Buyout for Mittal Retinue',
    category: 'CHANNEL_PARTNER',
    partnerName: 'Priya Nambiar',
    partnerRole: 'Head of Luxury Concierge (Amex Centurion)',
    assignedStaff: 'Vikramaditya Singh',
    assignedRole: 'Senior Relationship Manager',
    priority: 'P1_HIGH',
    status: 'IN_PROGRESS',
    slaMinutesRemaining: 75,
    createdAt: '1 hr ago',
    messages: [
      {
        id: 'm-5',
        sender: 'Priya Nambiar',
        role: 'Head of Luxury Concierge (Amex Centurion)',
        avatar: 'PN',
        isStaff: false,
        timestamp: '1 hr ago',
        text: 'Sunil Mittal executive team is booking 4 Royal Suites at Maharaja Pichola Palace (₹4.8L booking). Requesting customized Rajasthani royal dinner and 1-click B2B commission settlement.',
      },
      {
        id: 'm-6',
        sender: 'Vikramaditya Singh',
        role: 'Senior Relationship Manager',
        avatar: 'VS',
        isStaff: true,
        timestamp: '25 mins ago',
        text: 'Palace GM has assigned Master Chef & Sommelier. B2B Commission ₹72,000 (15%) marked for instant settlement.',
        actionBadge: 'Royal Chef Assigned & 15% Commission Logged',
      },
    ],
  },
];

export default function OperationsControlTower() {
  // Session / Authentication State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(DEMO_ACCOUNTS.RELATIONSHIP_MANAGER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeWorkflow, setActiveWorkflow] = useState<
    'partners' | 'rm' | 'frontdesk' | 'travel-desk' | 'channel-partners' | 'payments' | 'resolution' | 'api-docs'
  >('partners');

  // Workflows Datasets
  const [hotels, setHotels] = useState<HotelPartnerRecord[]>(INITIAL_HOTELS);
  const [frontdeskGuests, setFrontdeskGuests] = useState<FrontdeskGuestRecord[]>(INITIAL_FRONTDESK_GUESTS);
  const [payments, setPayments] = useState<PaymentReceiptRecord[]>(INITIAL_PAYMENTS);
  const [collaborativeTickets, setCollaborativeTickets] = useState<CollaborativeTicket[]>(INITIAL_COLLAB_TICKETS);

  // Modals State
  const [viewingReceipt, setViewingReceipt] = useState<PaymentReceiptRecord | null>(null);
  const [isCollabTicketsModalOpen, setIsCollabTicketsModalOpen] = useState<boolean>(false);

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
    if (role === 'PROPERTY_PARTNER') setActiveWorkflow('partners');
    else if (role === 'RELATIONSHIP_MANAGER') setActiveWorkflow('rm');
    else if (role === 'FRONTDESK') setActiveWorkflow('frontdesk');
    else if (role === 'TRAVEL_DESK_LEAD') setActiveWorkflow('travel-desk');
    else if (role === 'CHANNEL_PARTNER_LEAD') setActiveWorkflow('channel-partners');
    else if (role === 'FINANCE_PAYMENTS') setActiveWorkflow('payments');
    else setActiveWorkflow('resolution');

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
  const handleCheckInGuest = (guestId: string) => {
    setFrontdeskGuests((prev) =>
      prev.map((g) =>
        g.id === guestId
          ? { ...g, status: 'CHECKED_IN', keycardActive: true, transitStatus: 'ON_TIME' }
          : g
      )
    );
    showToast('Guest Checked-in: AES-256 Digital Keycard armed & VIP Welcome Cocktail dispatched.');
  };

  // Finance Action: Release Escrow to Host
  const handleReleaseEscrow = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, escrowStatus: 'RELEASED_TO_HOST', releaseETA: 'Settled to Partner Account via IMPS/RTGS' }
          : p
      )
    );
    showToast('Escrow released: ₹126,000 net host earnings dispatched to partner bank account.');
  };

  // Collaborative Ticket Update
  const handleUpdateTicket = (updated: CollaborativeTicket) => {
    setCollaborativeTickets((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    showToast(`Ticket #${updated.ticketNumber} updated successfully.`);
  };

  const handleCreateTicket = (newTicket: CollaborativeTicket) => {
    setCollaborativeTickets([newTicket, ...collaborativeTickets]);
    showToast(`Ticket #${newTicket.ticketNumber} created and assigned to Central Ops.`);
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
          <span>StaySphere Operational Control: <strong className="text-white">Unified Partner & Operations Network (Port 3002)</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCollabTicketsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#002B4D] border border-[#3CCF91]/40 text-[#3CCF91] font-bold hover:brightness-110 text-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Partner Support & Growth Tickets ({collaborativeTickets.filter(t => t.status !== 'RESOLVED').length} Active)</span>
          </button>
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
            Collaborative Ecosystem v3.4
          </span>
        </div>

        {/* Global Navigation Bar */}
        <nav className="flex items-center gap-1 p-1 rounded-2xl bg-[#000E1C] border border-white/10 text-xs font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveWorkflow('partners')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'partners'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#00D2C4]" /> 1. Property Partners
          </button>

          <button
            onClick={() => setActiveWorkflow('travel-desk')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'travel-desk'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-amber-400" /> 2. Travel Desk
          </button>

          <button
            onClick={() => setActiveWorkflow('channel-partners')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'channel-partners'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#3CCF91]" /> 3. Channel Partners
          </button>

          <button
            onClick={() => setActiveWorkflow('frontdesk')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'frontdesk'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-[#FFC857]" /> 4. Frontdesk
          </button>

          <button
            onClick={() => setActiveWorkflow('payments')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'payments'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="w-3.5 h-3.5 text-[#3CCF91]" /> 5. Escrow & Receipts
          </button>

          <button
            onClick={() => setActiveWorkflow('rm')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'rm'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 6. RM Governance
          </button>

          <button
            onClick={() => setActiveWorkflow('api-docs')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeWorkflow === 'api-docs'
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-cyan-300" /> 7. Partner APIs
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
              <span className="text-[10px] text-[#00D2C4] font-medium block mt-0.5">{currentUser.role.replace(/_/g, ' ')}</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Workspaces Area */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full space-y-8">
        {/* Role Context Notification Bar */}
        {currentUser && (
          <div className="p-4 rounded-2xl bg-[#001E36] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00A9A5] to-[#3CCF91] flex items-center justify-center text-xs font-black text-white">
                {currentUser.avatar}
              </div>
              <div>
                <span className="text-slate-400">Authenticated Session: </span>
                <strong className="text-white">{currentUser.name}</strong> • <span className="text-[#3CCF91] font-semibold">{currentUser.title}</span>
              </div>
            </div>
            <button
              onClick={() => setIsCollabTicketsModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#00A9A5]/20 hover:bg-[#00A9A5]/30 text-[#00D2C4] border border-[#00A9A5]/40 font-bold transition flex items-center gap-1.5"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Open Support Desk ({collaborativeTickets.length} Tickets)</span>
            </button>
          </div>
        )}

        {/* WORKSPACE 1: PROPERTY PARTNERS */}
        {activeWorkflow === 'partners' && (
          <PropertyPartnersWorkflow
            onOpenTicketsModal={() => setIsCollabTicketsModalOpen(true)}
            showToast={showToast}
          />
        )}

        {/* WORKSPACE 2: TRAVEL DESK */}
        {activeWorkflow === 'travel-desk' && (
          <TravelDeskWorkflow
            onOpenTicketsModal={() => setIsCollabTicketsModalOpen(true)}
            showToast={showToast}
          />
        )}

        {/* WORKSPACE 3: CHANNEL PARTNERS */}
        {activeWorkflow === 'channel-partners' && (
          <ChannelPartnersWorkflow
            onOpenTicketsModal={() => setIsCollabTicketsModalOpen(true)}
            showToast={showToast}
          />
        )}

        {/* WORKSPACE 4: FRONTDESK */}
        {activeWorkflow === 'frontdesk' && (
          <div className="space-y-6">
            <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-white tracking-wide">Frontdesk & Concierge Operations</h1>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
                    Villa & Suite Radar
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Guest arrivals queue, flight sync, 1-click check-in, and in-suite butler service tickets.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCollabTicketsModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-[#002B4D] hover:bg-[#003866] border border-[#FFC857]/40 text-white text-xs font-bold transition shadow flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#FFC857]" />
                  <span>Frontdesk Support Tickets</span>
                </button>
              </div>
            </div>

            {/* Arrivals Table */}
            <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFC857]" />
                <span>Today's VIP Arrival & In-Stay Queue (The Vana Azure Ocean Estate)</span>
              </h3>

              <div className="space-y-4">
                {frontdeskGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="p-5 rounded-2xl bg-[#001428] border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{guest.guestName}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold">
                          {guest.vipTier}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {guest.roomNumber} • <span className="text-slate-300 font-medium">{guest.roomType}</span>
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono mt-1">
                        Transit: {guest.flightTransitCode} ({guest.transitStatus.replace(/_/g, ' ')})
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {guest.status === 'EXPECTED_TODAY' && (
                        <button
                          onClick={() => handleCheckInGuest(guest.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 flex items-center gap-1.5"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          <span>1-Click Check-In & Issue Key</span>
                        </button>
                      )}

                      {guest.status === 'CHECKED_IN' && (
                        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>In-Stay (Key Active)</span>
                        </span>
                      )}

                      {guest.status === 'CHECKED_OUT' && (
                        <span className="px-3.5 py-1.5 rounded-xl bg-slate-500/20 text-slate-400 text-xs font-bold">
                          Checked Out
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE 5: PAYMENTS & ESCROW RECEIPTS */}
        {activeWorkflow === 'payments' && (
          <div className="space-y-6">
            <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-white tracking-wide">Smart Escrow Vault & Tax Receipts</h1>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ₹14.82M Escrow Pool
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Real-time escrow release triggers (2-hr post check-in), split payments, and itemized PDF tax receipts.
                </p>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#3CCF91]" />
                <span>Recent Escrow Transactions & VIP Invoices</span>
              </h3>

              <div className="space-y-4">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-[#001428] border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#00A9A5]">{p.receiptNumber}</span>
                        <h4 className="text-sm font-bold text-white">{p.guestName}</h4>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {p.propertyName} • <span className="text-slate-300">{p.date}</span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Total Amount: <strong className="text-white">₹{p.totalAmount.toLocaleString('en-IN')}</strong> ({p.paymentMethod})
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setViewingReceipt(p)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Tax Invoice</span>
                      </button>

                      {p.escrowStatus === 'ESCROW_LOCKED' && (
                        <button
                          onClick={() => handleReleaseEscrow(p.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Release to Host</span>
                        </button>
                      )}

                      {p.escrowStatus === 'RELEASED_TO_HOST' && (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE 6: RELATIONSHIP MANAGER GOVERNANCE */}
        {activeWorkflow === 'rm' && (
          <div className="space-y-6">
            <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-white tracking-wide">Relationship Manager (RM) Governance</h1>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    Estate Portfolio & Rate Parity
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Estate performance oversight, 84-point luxury trust audits, contract renewals, and OTA rate parity enforcement.
                </p>
              </div>

              <button
                onClick={() => setIsCollabTicketsModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-[#002B4D] hover:bg-[#003866] border border-cyan-500/40 text-white text-xs font-bold transition shadow flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>RM Support Desk</span>
              </button>
            </div>

            <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Managed Estate Portfolio (Vikramaditya Singh - RM)</span>
              </h3>

              <div className="space-y-4">
                {hotels.map((h) => (
                  <div
                    key={h.id}
                    className="p-5 rounded-2xl bg-[#001428] border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{h.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00A9A5] font-bold">
                          {h.tier.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {h.location} • <strong className="text-white">{h.totalSuites} Suites</strong> • Occupancy: <strong className="text-[#3CCF91]">{h.occupancyPct}%</strong>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Monthly Revenue: ₹{(h.monthlyRevenue / 100000).toFixed(1)} Lakhs • Audit Score: <strong className="text-[#3CCF91]">{h.trustAuditScore}%</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {h.rateParityStatus === 'DISCREPANCY' ? (
                        <button
                          onClick={() => handleFixRateParity(h.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Fix Rate Parity Sync</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Rate Parity Synced
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE 7: PARTNER APIS & DOCS */}
        {activeWorkflow === 'api-docs' && <PartnerApiConsole />}
      </main>

      {/* PLATFORM SINGLE SIGN-ON / ROLE SWITCHER MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001E36] border border-[#00A9A5]/50 rounded-3xl w-full max-w-2xl p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Switch Role / Platform Login</h3>
                <p className="text-xs text-slate-400">Experience StaySphere through different stakeholder perspectives</p>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {(Object.keys(DEMO_ACCOUNTS) as PlatformRole[]).map((roleKey) => {
                const account = DEMO_ACCOUNTS[roleKey];
                const isCurrent = currentUser?.role === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => handleSwitchRole(roleKey)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 ${
                      isCurrent
                        ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg'
                        : 'bg-[#001428] border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] flex items-center justify-center text-xs font-black text-white shrink-0">
                        {account.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{account.name}</span>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00A9A5] font-bold">
                            {account.role.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{account.title}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCurrent ? (
                        <span className="text-xs text-[#3CCF91] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Active
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-bold hover:text-white">Switch →</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* COLLABORATIVE TICKETS MODAL */}
      <CollaborativeTicketsModal
        isOpen={isCollabTicketsModalOpen}
        onClose={() => setIsCollabTicketsModalOpen(false)}
        tickets={collaborativeTickets}
        onUpdateTicket={handleUpdateTicket}
        onCreateTicket={handleCreateTicket}
        currentUserRole={currentUser?.title || 'Senior Relationship Manager'}
        currentUserName={currentUser?.name || 'Vikramaditya Singh'}
      />

      {/* RECEIPT VIEW MODAL */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001E36] border border-[#00A9A5]/50 rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-scale-up space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">VIP Tax Invoice & Escrow Receipt</h3>
                <span className="text-xs font-mono text-[#00A9A5]">{viewingReceipt.receiptNumber}</span>
              </div>
              <button
                onClick={() => setViewingReceipt(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs bg-[#001428] p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between">
                <span className="text-slate-400">Guest Name:</span>
                <strong className="text-white">{viewingReceipt.guestName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Property:</span>
                <strong className="text-white">{viewingReceipt.propertyName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Accommodation:</span>
                <strong className="text-white">₹{viewingReceipt.stayAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Chauffeur Transit:</span>
                <strong className="text-white">₹{viewingReceipt.transitAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GST (12%):</span>
                <strong className="text-white">₹{viewingReceipt.taxesAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                <span className="font-bold text-slate-300">Total Settled:</span>
                <strong className="text-[#3CCF91]">₹{viewingReceipt.totalAmount.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  showToast('Tax invoice PDF receipt downloaded.');
                  setViewingReceipt(null);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
