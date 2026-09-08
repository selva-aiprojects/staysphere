import { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export interface EmailTemplate {
  id: string;
  name: string;
  targetAudience: 'CUSTOMER_GUEST' | 'PROPERTY_PARTNER' | 'TRAVEL_FLEET' | 'CHANNEL_PARTNER' | 'INTERNAL_EMPLOYEE';
  subject: string;
  previewText: string;
  senderName: string;
  senderEmail: string;
  contentHtml: {
    heading: string;
    subheading: string;
    paragraphs: string[];
    callToActionText?: string;
    callToActionUrl?: string;
    badgeText?: string;
  };
}

export interface EmailDispatchLog {
  id: string;
  templateName: string;
  recipientEmail: string;
  recipientName: string;
  recipientType: string;
  subject: string;
  sentAt: string;
  status: 'DELIVERED' | 'OPENED' | 'CLICKED';
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  // 1. GUEST BOOKING CONFIRMATION
  {
    id: 'tpl-guest-booking',
    name: 'VIP Guest Booking & Escrow Protection Confirmation',
    targetAudience: 'CUSTOMER_GUEST',
    subject: 'StaySphere VIP Confirmation — Your Sovereign Journey is Confirmed (#BK-SS-2026-9041)',
    previewText: 'Your clifftop oceanfront villa and Maybach transit are reserved under 100% Escrow Protection.',
    senderName: 'StaySphere VIP Concierge',
    senderEmail: 'concierge@staysphere.io',
    contentHtml: {
      heading: 'Welcome to Sovereign Luxury Hospitality',
      subheading: 'Booking Ref: BK-SS-2026-9041 • The Vana Azure Private Ocean Villa & Estate',
      badgeText: '100% SMART ESCROW PROTECTED',
      paragraphs: [
        'Dear Vikram Malhotra,',
        'We are honored to confirm your upcoming retreat at The Vana Azure Private Ocean Villa (Sinquerim Cliffs, Goa) from 07 Sep to 10 Sep 2026.',
        'Your stay is protected by the StaySphere ₹14.82M Smart Escrow Vault. Your booking fee remains securely held until 2 hours after you arrive and verify your suite.',
        'Your dedicated Mercedes-Maybach S680 chauffeur (Gurpreet Singh) has been paired with flight 6E-204 from Delhi.',
      ],
      callToActionText: 'View Digital Suite Keycard & Flight Radar →',
      callToActionUrl: 'http://localhost:3000',
    },
  },

  // 2. GUEST DIGITAL KEYCARD
  {
    id: 'tpl-guest-keycard',
    name: 'AES-256 Encrypted Digital Suite Keycard Issued',
    targetAudience: 'CUSTOMER_GUEST',
    subject: 'Your Digital Suite Key is Ready — Villa 101 at The Vana Azure',
    previewText: 'Tap to arm and unlock your oceanfront suite directly from your mobile device.',
    senderName: 'StaySphere Smart Access Desk',
    senderEmail: 'access@staysphere.io',
    contentHtml: {
      heading: 'Your Digital Suite Keycard is Armed',
      subheading: 'Villa 101 (Horizon Oceanfront Private Villa)',
      badgeText: 'AES-256 MILITARY-GRADE ENCRYPTION',
      paragraphs: [
        'Dear Vikram Malhotra,',
        'Your digital keycard for Villa 101 has been generated and pre-armed for your arrival.',
        'Simply tap your phone against the smart door sensor upon arrival, or share access with family members.',
      ],
      callToActionText: 'Open Digital Keycard in Apple Wallet / Web Pass →',
      callToActionUrl: 'http://localhost:3000',
    },
  },

  // 3. PARTNER ONBOARDING WELCOME
  {
    id: 'tpl-partner-welcome',
    name: 'Partner Certification & 84-Point Audit Approved',
    targetAudience: 'PROPERTY_PARTNER',
    subject: 'Welcome to the StaySphere Network — 84-Point Luxury Certification Passed (100%)',
    previewText: 'Your property has been awarded the StaySphere Sovereign Verified Seal.',
    senderName: 'StaySphere Partnership Governance',
    senderEmail: 'partners@staysphere.io',
    contentHtml: {
      heading: 'Congratulations! Your Property is Certified',
      subheading: 'The Vana Azure Private Ocean Villa & Estate • Sovereign Flagship Franchise',
      badgeText: '84-POINT LUXURY TRUST AUDIT: 100.0%',
      paragraphs: [
        'Dear Anil Deshmukh,',
        'We are thrilled to welcome The Vana Azure Ocean Estate into the StaySphere Luxury Partner Network.',
        'Your 84-point physical and digital inspection passed with a 100% score across Cleanliness, Butler SLAs, Linen Quality, and Smart Keycard readiness.',
        'Your property is now live on the global marketplace, connected to our 2-hour automated escrow payout cycle.',
      ],
      callToActionText: 'Open Property Partner Console & PMS Sync →',
      callToActionUrl: 'http://localhost:3002',
    },
  },

  // 4. PARTNER ESCROW PAYOUT ADVICE
  {
    id: 'tpl-partner-payout',
    name: 'Escrow Payout Settlement Remittance Advice',
    targetAudience: 'PROPERTY_PARTNER',
    subject: 'Escrow Remittance Advice — ₹1,26,000 Dispatched to Coastal Hospitality LLP',
    previewText: 'Automated 2-hour post check-in escrow release for Vikram Malhotra stay.',
    senderName: 'StaySphere Escrow Vault Custodian',
    senderEmail: 'finance@staysphere.io',
    contentHtml: {
      heading: 'Smart Escrow Remittance Confirmation',
      subheading: 'Remittance Reference: REM-SS-2026-9041 • ₹1,26,000.00 Net Host Earnings',
      badgeText: 'IMPS/RTGS SETTLEMENT COMPLETED',
      paragraphs: [
        'Dear Managing Partner,',
        'Following the seamless check-in and 2-hour escrow verification for booking BK-SS-2026-9041 (Guest: Vikram Malhotra), funds have been automatically disbursed.',
        'Net Host Earnings: ₹1,26,000 (after 12% StaySphere revenue share and luxury GST settlement).',
        'Beneficiary Account: Coastal Hospitality LLP • HDFC Bank A/C ending in 8841.',
      ],
      callToActionText: 'View Financial Statement & Tax Ledger →',
      callToActionUrl: 'http://localhost:3002',
    },
  },

  // 5. TRAVEL DESK CHAUFFEUR DISPATCH
  {
    id: 'tpl-driver-dispatch',
    name: 'VIP Chauffeur Flight Sync & Transit Briefing',
    targetAudience: 'TRAVEL_FLEET',
    subject: 'VIP Transit Dispatch — Maybach S680 assigned for Flight 6E-204 (DEL -> GOX)',
    previewText: 'Guest Vikram Malhotra arriving at Mopa VIP Gate 1. Chauffeur transit escrow armed.',
    senderName: 'StaySphere Fleet Telematics',
    senderEmail: 'fleet@staysphere.io',
    contentHtml: {
      heading: 'First-Class Chauffeur Transit Assignment',
      subheading: 'Vehicle: Mercedes-Maybach S680 (GA-03-MB-0001) • Chauffeur: Gurpreet Singh',
      badgeText: 'TRANSIT ESCROW ARMED: ₹8,500',
      paragraphs: [
        'Dear Gurpreet Singh,',
        'You have been assigned to VIP Guest Vikram Malhotra arriving on IndiGo 6E-204 at Mopa International (GOX) Terminal 2 VIP Gate 1.',
        'Ensure in-vehicle San Pellegrino and chilled eucalyptus towels are ready.',
        'Upon doorstep arrival at The Vana Azure Estate, your ₹8,500 transit fee will automatically release to your wallet.',
      ],
      callToActionText: 'Open Live Driver GPS & Radar Console →',
      callToActionUrl: 'http://localhost:3002',
    },
  },

  // 6. CHANNEL PARTNER COMMISSION ADVICE
  {
    id: 'tpl-channel-commission',
    name: 'Channel Partner B2B Commission Settlement',
    targetAudience: 'CHANNEL_PARTNER',
    subject: 'B2B Commission Advice — ₹72,000 (15%) Dispatched to American Express Centurion',
    previewText: 'Commission settled for Sunil Mittal multi-suite royal buyout booking.',
    senderName: 'StaySphere Channel Partnerships',
    senderEmail: 'channel@staysphere.io',
    contentHtml: {
      heading: 'B2B Concierge Commission Remittance',
      subheading: 'Agency: American Express Centurion Concierge • Tier: Sovereign Black (15%)',
      badgeText: 'COMMISSION SETTLEMENT: ₹72,000.00',
      paragraphs: [
        'Dear Priya Nambiar,',
        'Thank you for partnering with StaySphere. Commission of ₹72,000 for the 4-Suite buyout at Maharaja Pichola Palace has been credited to your agency corporate ledger.',
        'Cumulative YTD Settled: ₹67.5 Lakhs across 84 confirmed VIP itineraries.',
      ],
      callToActionText: 'Open Channel Partner Dashboard & Pipeline →',
      callToActionUrl: 'http://localhost:3002',
    },
  },

  // 7. INTERNAL EMPLOYEE SLA ESCALATION
  {
    id: 'tpl-employee-sla',
    name: 'P0 Hospitality SLA Critical Alert (Internal Staff)',
    targetAudience: 'INTERNAL_EMPLOYEE',
    subject: '🚨 CRITICAL P0 SLA ALERT — 15-Minute Response Window Closing (#SS-OPS-4091)',
    previewText: 'Helipad & VIP Early Check-in ticket raised for Malhotra Family.',
    senderName: 'StaySphere Central SLA Engine',
    senderEmail: 'alerts@staysphere.io',
    contentHtml: {
      heading: 'P0 Critical SLA Escalation',
      subheading: 'Ticket #SS-OPS-4091 • Assigned RM: Vikramaditya Singh',
      badgeText: 'P0 SLA TIMER: 8 MINS REMAINING',
      paragraphs: [
        'Attention Central Operations Team,',
        'Ticket #SS-OPS-4091 (VIP Early Check-in & Maybach Re-route) has 8 minutes remaining before Tier-1 SLA breach.',
        'Please acknowledge and execute the 1-click chauffeur dispatch action in the Resolution Console.',
      ],
      callToActionText: 'Open Central Resolution Desk →',
      callToActionUrl: 'http://localhost:3002',
    },
  },
];

export const INITIAL_DISPATCH_LOGS: EmailDispatchLog[] = [
  {
    id: 'log-1',
    templateName: 'VIP Guest Booking & Escrow Protection Confirmation',
    recipientEmail: 'vikram.malhotra@vipguest.io',
    recipientName: 'Vikram Malhotra',
    recipientType: 'Customer / Guest',
    subject: 'StaySphere VIP Confirmation — Your Sovereign Journey is Confirmed (#BK-SS-2026-9041)',
    sentAt: '15 mins ago',
    status: 'OPENED',
  },
  {
    id: 'log-2',
    templateName: 'AES-256 Encrypted Digital Suite Keycard Issued',
    recipientEmail: 'vikram.malhotra@vipguest.io',
    recipientName: 'Vikram Malhotra',
    recipientType: 'Customer / Guest',
    subject: 'Your Digital Suite Key is Ready — Villa 101 at The Vana Azure',
    sentAt: '12 mins ago',
    status: 'CLICKED',
  },
  {
    id: 'log-3',
    templateName: 'VIP Chauffeur Flight Sync & Transit Briefing',
    recipientEmail: 'gurpreet.driver@staysphere.io',
    recipientName: 'Gurpreet Singh',
    recipientType: 'Travel Desk Driver',
    subject: 'VIP Transit Dispatch — Maybach S680 assigned for Flight 6E-204 (DEL -> GOX)',
    sentAt: '25 mins ago',
    status: 'DELIVERED',
  },
  {
    id: 'log-4',
    templateName: 'B2B Commission Advice — ₹72,000 (15%) Dispatched to American Express Centurion',
    recipientEmail: 'priya.concierge@centurion.amex.com',
    recipientName: 'Priya Nambiar',
    recipientType: 'Channel Partner',
    subject: 'B2B Commission Advice — ₹72,000 (15%) Dispatched to American Express Centurion',
    sentAt: '1 hr ago',
    status: 'OPENED',
  },
];

interface EmailCommunicationsCenterProps {
  showToast: (msg: string) => void;
}

export function EmailCommunicationsCenter({ showToast }: EmailCommunicationsCenterProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(EMAIL_TEMPLATES[0].id);
  const [filterAudience, setFilterAudience] = useState<string>('ALL');
  const [dispatchLogs, setDispatchLogs] = useState<EmailDispatchLog[]>(INITIAL_DISPATCH_LOGS);
  const [testRecipientEmail, setTestRecipientEmail] = useState<string>('vikram.malhotra@vipguest.io');
  const [isSending, setIsSending] = useState<boolean>(false);

  const activeTemplate = EMAIL_TEMPLATES.find((t) => t.id === selectedTemplateId) || EMAIL_TEMPLATES[0];

  const filteredTemplates = EMAIL_TEMPLATES.filter((t) => {
    if (filterAudience === 'ALL') return true;
    return t.targetAudience === filterAudience;
  });

  const handleSendTestEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipientEmail.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const newLog: EmailDispatchLog = {
        id: `log-${Date.now()}`,
        templateName: activeTemplate.name,
        recipientEmail: testRecipientEmail,
        recipientName: testRecipientEmail.split('@')[0],
        recipientType: activeTemplate.targetAudience.replace(/_/g, ' '),
        subject: activeTemplate.subject,
        sentAt: 'Just Now',
        status: 'DELIVERED',
      };

      setDispatchLogs([newLog, ...dispatchLogs]);
      showToast(`Email "${activeTemplate.name}" dispatched to ${testRecipientEmail}`);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white tracking-wide">Automated Email & Stakeholder Communication Hub</h1>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00A9A5] border border-[#00A9A5]/30">
              Luxury HTML Dispatcher
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Real-time transactional and operational email notifications for Guests, Hotel Partners, Chauffeurs, Channel Desks, and Internal Staff.
          </p>
        </div>
      </div>

      {/* Audience Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto text-xs font-bold">
        {[
          { key: 'ALL', label: 'All Templates (7)' },
          { key: 'CUSTOMER_GUEST', label: '1. Guests & Customers (2)' },
          { key: 'PROPERTY_PARTNER', label: '2. Hotel/Resort Partners (2)' },
          { key: 'TRAVEL_FLEET', label: '3. Travel Desk Chauffeurs (1)' },
          { key: 'CHANNEL_PARTNER', label: '4. Channel Partners B2B (1)' },
          { key: 'INTERNAL_EMPLOYEE', label: '5. Internal Staff SLAs (1)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterAudience(tab.key)}
            className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap ${
              filterAudience === tab.key
                ? 'bg-[#00A9A5] text-white shadow-md'
                : 'bg-[#001428] border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Template List on Left, Live HTML Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Template Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Email Templates</div>
          <div className="space-y-2.5">
            {filteredTemplates.map((tpl) => {
              const isSelected = tpl.id === selectedTemplateId;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg'
                      : 'bg-[#001428] border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {tpl.targetAudience.replace(/_/g, ' ')}
                    </span>
                    <Mail className="w-3.5 h-3.5 text-[#00A9A5]" />
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{tpl.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{tpl.subject}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Luxury Email Previewer & Test Dispatcher */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#001E36] border border-white/10 rounded-2xl p-4 shadow flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>From: <strong>{activeTemplate.senderName}</strong> &lt;{activeTemplate.senderEmail}&gt;</span>
              </div>
              <div className="text-xs text-cyan-300 font-medium mt-0.5">Subject: {activeTemplate.subject}</div>
            </div>

            {/* Test Send Form */}
            <form onSubmit={handleSendTestEmail} className="flex items-center gap-2">
              <input
                type="email"
                value={testRecipientEmail}
                onChange={(e) => setTestRecipientEmail(e.target.value)}
                placeholder="Recipient Email..."
                className="bg-[#001428] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A9A5] w-56"
                required
              />
              <button
                type="submit"
                disabled={isSending}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Sending...' : 'Send Live Email'}</span>
              </button>
            </form>
          </div>

          {/* HTML Email Canvas (Dark Luxury Theme) */}
          <div className="bg-[#000E1C] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6 max-w-2xl mx-auto">
            {/* Email Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00A9A5] flex items-center justify-center text-white font-bold text-xs">
                  SS
                </div>
                <span className="font-serif text-base tracking-widest text-white font-bold">STAYSPHERE</span>
              </div>
              {activeTemplate.contentHtml.badgeText && (
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00A9A5] border border-[#00A9A5]/40">
                  {activeTemplate.contentHtml.badgeText}
                </span>
              )}
            </div>

            {/* Email Body */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">{activeTemplate.contentHtml.heading}</h2>
                <p className="text-xs text-[#3CCF91] font-medium mt-0.5">{activeTemplate.contentHtml.subheading}</p>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-t border-b border-white/5 py-4">
                {activeTemplate.contentHtml.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {activeTemplate.contentHtml.callToActionText && (
                <div className="pt-2">
                  <a
                    href={activeTemplate.contentHtml.callToActionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110 transition"
                  >
                    {activeTemplate.contentHtml.callToActionText}
                  </a>
                </div>
              )}
            </div>

            {/* Email Footer */}
            <div className="pt-6 border-t border-white/10 text-[10px] text-slate-500 space-y-1">
              <p>StaySphere Luxury Hospitality & Sovereign Mobility Network • Support Desk: 24/7</p>
              <p>This is a verified transactional communication protected under StaySphere Smart Escrow Governance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Email Delivery Audit Logs */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3CCF91]" />
            <span>Recent Email Dispatch & Delivery Audit Logs</span>
          </h3>
          <span className="text-xs text-slate-400">SMTP Gateway: Active • 100% Delivery Rate</span>
        </div>

        <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {dispatchLogs.map((log) => (
            <div key={log.id} className="p-4 bg-[#001428] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{log.templateName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">{log.recipientType}</span>
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  To: <strong className="text-slate-200">{log.recipientName}</strong> &lt;{log.recipientEmail}&gt; • {log.sentAt}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
