'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Building2,
  Car,
  Users,
  ShieldCheck,
  TrendingUp,
  Bot,
  User,
  Sparkles,
  Percent,
} from 'lucide-react';

interface PartnerChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'pearl';
}

interface ChatMessage {
  id: string;
  sender: 'partner' | 'copilot';
  text: string;
  time: string;
  actionCard?: {
    type: 'ROOM_AUDIT' | 'FLEET_ASSIGN' | 'ESCROW_PAYOUT' | 'RATE_SYNC' | 'INVOICE' | 'INFO';
    title: string;
    details: string;
    metrics?: { label: string; value: string }[];
    badge?: string;
  };
}

export function PartnerChatbotModal({
  isOpen,
  onClose,
  theme = 'pearl',
}: PartnerChatbotModalProps) {
  const [partnerRole, setPartnerRole] = useState<'HOTEL_RESORT' | 'CHAUFFEUR_FLEET' | 'B2B_CHANNEL'>('HOTEL_RESORT');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'copilot',
      text: 'Welcome to the StaySphere Partner Operations Copilot. I can assist with suite turnaround telemetry, fleet telematics, automated milestone escrow payouts, and live rate parity sync across channels.',
      time: '14:00',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPearl = theme === 'pearl';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Intelligent Partner NLP Response Engine
  const generatePartnerResponse = (query: string, currentRole: string): ChatMessage => {
    const q = query.toLowerCase().trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Room / Villa Audits / Housekeeping / Cleanliness / Turnaround
    if (
      q.includes('audit') ||
      q.includes('clean') ||
      q.includes('villa 101') ||
      q.includes('turnaround') ||
      q.includes('room') ||
      q.includes('inspection') ||
      q.includes('linen') ||
      q.includes('quality') ||
      q.includes('hvac') ||
      q.includes('housekeeping')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `Villa 101 (Horizon Clifftop Ocean Villa) has achieved a verified 84/84 (100%) score under the StaySphere Physical Quality Protocol. 
Inspection Summary:
• Linen purity & hypoallergenic wash certified.
• HVAC climate system calibrated to 21.0°C.
• Smart BLE digital lock keycard enrolled with AES-256 encryption.
• Pool water chemistry & deck cleanliness verified by Housekeeping Supervisor.
Turnaround completed in 38 minutes (average SLA: < 45m).`,
        time: nowTime,
        actionCard: {
          type: 'ROOM_AUDIT',
          title: 'Suite 84-Point Readiness Audit Passed',
          details: 'The Grand Vagator Bay Resort • Pre-Check-in Digital Pass Active for Guest Dr. Selva Murugan',
          metrics: [
            { label: 'Audit Score', value: '84/84 (100%)' },
            { label: 'BLE Keycard', value: 'Armed (AES-256)' },
            { label: 'Suite Temp', value: '21.0°C Set' },
          ],
          badge: 'READY FOR GUEST TAP',
        },
      };
    }

    // 2. Escrow Payouts / Settle / Bank Transfer / GST Invoicing
    if (
      q.includes('payout') ||
      q.includes('escrow') ||
      q.includes('money') ||
      q.includes('settle') ||
      q.includes('130500') ||
      q.includes('disburse') ||
      q.includes('bank') ||
      q.includes('transfer') ||
      q.includes('rtgs') ||
      q.includes('imps') ||
      q.includes('invoice') ||
      q.includes('tax') ||
      q.includes('gst')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `Escrow Milestone Release Schedule for Booking SS-LUX-8492 (Total Vault: ₹1,30,500):
• Milestone 1 (70% = ₹91,350): Disburses automatically to host bank account via instant RTGS exactly 2 hours post verified seamless guest check-in.
• Milestone 2 (30% = ₹39,150): Disburses upon trip completion and zero-incident check-out.
• GST & TDS: Automated B2B tax invoice is generated with GSTIN compliance and accessible in your Partner Finance console.`,
        time: nowTime,
        actionCard: {
          type: 'ESCROW_PAYOUT',
          title: 'Escrow Milestone Disbursement Schedule',
          details: 'Beneficiary: The Grand Vagator Bay Resort & Mobility Fleet • Zero payment delay escrow guarantee',
          metrics: [
            { label: 'Total Vault', value: '₹1,30,500' },
            { label: 'T+2h Check-In Payout', value: '₹91,350 (Auto-RTGS)' },
            { label: 'Post-Stay Final', value: '₹39,150' },
          ],
          badge: 'ESCROW PROTECTED',
        },
      };
    }

    // 3. Fleet Telematics / Chauffeur Dispatch / Vehicle Reassignment / Flight Sync
    if (
      q.includes('fleet') ||
      q.includes('car') ||
      q.includes('driver') ||
      q.includes('chauffeur') ||
      q.includes('maybach') ||
      q.includes('defender') ||
      q.includes('reassign') ||
      q.includes('dispatch') ||
      q.includes('telematics') ||
      q.includes('delay') ||
      q.includes('6e-204')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `Flight Telematics & Mobility Dispatch Status:
• Incoming Flight: IndiGo 6E-204 (DEL ➔ GOX/GOI) on-time arrival at 13:45 PM.
• Assigned Chauffeur: Gurpreet Singh (4.98 ★ rating across 420 completed trips).
• Assigned Vehicle: Mercedes-Maybach S680 (GA-01-EV-9002) stationed at MOPA Airport Terminal 1 VIP Lane.
• Auto-Delay Sync: If the incoming flight is delayed, driver schedule shifts automatically with 0 penalty to driver or host. Direct transit milestone payout: ₹4,500.`,
        time: nowTime,
        actionCard: {
          type: 'FLEET_ASSIGN',
          title: 'Transit Dispatch & Telematics Linked',
          details: 'Connected with Stay Booking SS-LUX-8492 • Zero cancellation penalty delay auto-sync',
          metrics: [
            { label: 'Assigned Vehicle', value: 'Mercedes-Maybach S680' },
            { label: 'Driver Rating', value: '4.98 ★ (420 Trips)' },
            { label: 'Milestone Fee', value: '₹4,500 Direct Payout' },
          ],
          badge: 'LIVE ON RADAR',
        },
      };
    }

    // 4. Rate Parity / Dynamic Surge / Channel Sync / OTAs
    if (
      q.includes('rate') ||
      q.includes('surge') ||
      q.includes('price') ||
      q.includes('sync') ||
      q.includes('parity') ||
      q.includes('ota') ||
      q.includes('calendar') ||
      q.includes('multiplier') ||
      q.includes('double-booking')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `Multi-Channel Dynamic Rate Sync Status:
• Rate Parity Status: 100% IN SYNC across StaySphere Direct, AMEX Centurion Concierge, Agoda, and Partner APIs.
• Weekend Surge Multiplier: +15% calibrated peak demand for North Goa & Udaipur properties.
• Villa 101 Rate: ₹42,000 / night (Standard: ₹36,500 / night).
• Two-Way Inventory Lock: Instant sub-50ms calendar locking guarantees 0% double-booking risk.`,
        time: nowTime,
        actionCard: {
          type: 'RATE_SYNC',
          title: 'Multi-Channel Rate Distribution',
          details: 'Instant 2-way rate parity & availability sync with 0% double-booking risk',
          metrics: [
            { label: 'Active Multiplier', value: '+15% Peak Weekend' },
            { label: 'Villa 101 Rate', value: '₹42,000 / night' },
            { label: 'API Latency', value: '< 50ms Synced' },
          ],
          badge: 'RATE PARITY LOCKED',
        },
      };
    }

    // 5. Commission Structure & Tiers
    if (
      q.includes('commission') ||
      q.includes('fee') ||
      q.includes('percentage') ||
      q.includes('tier') ||
      q.includes('contract') ||
      q.includes('royal sovereign') ||
      q.includes('gold prestige')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `StaySphere Partner Commission Tiers:
• Direct Hotel / Villa Partner: 10%–12% net commission (Zero listing fee, zero maintenance fee).
• Chauffeur Mobility Fleet Lead: 100% direct transit fare pass-through minus 5% platform telemetry handling fee.
• B2B Travel Agency / DMC: 14%–16% wholesale commission tier with net-30 escrow consolidation.
• Partner Tier Upgrades: Properties achieving 99%+ audit scores and 4.9+ guest ratings are promoted to Royal Sovereign tier for priority placement.`,
        time: nowTime,
        actionCard: {
          type: 'INVOICE',
          title: 'Partner Commission & Contract Tiers',
          details: 'Direct Partner: 10-12% • Chauffeur: 95% net • B2B DMC: 14-16% wholesale',
          badge: 'TRANSPARENT CONTRACT',
          metrics: [
            { label: 'Direct Host Fee', value: '10% - 12%' },
            { label: 'Mobility Payout', value: '95% Net' },
            { label: 'Listing Fee', value: '₹0 (Free)' },
          ],
        },
      };
    }

    // 6. Onboarding New Properties / Vehicles
    if (
      q.includes('onboard') ||
      q.includes('add') ||
      q.includes('register') ||
      q.includes('join') ||
      q.includes('new villa') ||
      q.includes('new car') ||
      q.includes('documents') ||
      q.includes('kyc')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `Onboarding Protocol for New StaySphere Partners:
1. Online Registration: Submit GSTIN, PAN, bank account details, and property/vehicle ownership documents.
2. 84-Point Physical Audit: Regional Relationship Manager conducts an on-premise quality inspection within 48 hours.
3. IoT Key & Telematics Integration: Smart locks connected to AES-256 cloud; Chauffeur app onboarded with GPS tracking.
4. Go Live: Real-time availability distributed to direct guests and B2B concierge networks with instant Escrow protection.`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'Partner Network Onboarding Protocol',
          details: '48-hour verification turnaround • Free digital smart lock & telematics integration',
          badge: '48-HOUR ONBOARDING',
          metrics: [
            { label: 'Audit Timeline', value: '< 48 Hours' },
            { label: 'Setup Cost', value: '₹0 (Free)' },
            { label: 'Escrow Integration', value: 'Automated' },
          ],
        },
      };
    }

    // 7. Dispute Resolution & Damage Claims / 15-Min SLA
    if (
      q.includes('dispute') ||
      q.includes('damage') ||
      q.includes('claim') ||
      q.includes('ticket') ||
      q.includes('incident') ||
      q.includes('sla') ||
      q.includes('relationship manager') ||
      q.includes('vikram')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `Partner Dispute & Damage Protection Guarantee:
• 15-Minute Response SLA: Any partner dispute or guest incident is assigned to Senior RM Vikramaditya Singh with a guaranteed 15-minute response clock.
• Sovereign Damage Vault: All verified properties are covered up to ₹5,00,000 for incidental damages with frictionless photographic claims.
• Escrow Protection: Funds are never unilaterally charged back without documented dual-stakeholder review.`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'Partner Damage & Dispute Protection',
          details: 'Up to ₹5,00,000 damage coverage • 15-Minute RM Resolution Guarantee',
          badge: 'PROTECTION ACTIVE',
          metrics: [
            { label: 'Damage Vault', value: 'Up to ₹5 Lakh' },
            { label: 'RM Lead', value: 'Vikramaditya S.' },
            { label: 'Response SLA', value: '< 15 Mins' },
          ],
        },
      };
    }

    // 8. Greetings & General Inquiries
    if (
      q.includes('hello') ||
      q.includes('hi') ||
      q.includes('hey') ||
      q.includes('who are you') ||
      q.includes('what can you do') ||
      q.includes('thank')
    ) {
      return {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: `Greetings Partner! I am your StaySphere Partner Operations Copilot. I help hotel hosts, fleet operators, and B2B agents streamline daily operations:
1. Suite Readiness Audits (84-point cleanliness and smart lock sync)
2. Milestone Escrow Disbursements (70% at check-in, 30% at checkout)
3. Fleet Telematics & Driver Reassignments (Flight-tracked Maybach & Defender dispatch)
4. Dynamic Rate Parity & OTA Surge Multipliers
How can I assist your operations right now?`,
        time: nowTime,
      };
    }

    // 9. Smart Fallback with Contextual Assistance
    return {
      id: `cop-${Date.now()}`,
      sender: 'copilot',
      text: `Acknowledged partner query regarding "${query}". I am actively interfacing with your property management telemetry, fleet dispatch desk, and escrow payment gateway. You can ask for live suite audits, milestone payout releases, flight delay adjustments, rate sync, or contract terms.`,
      time: nowTime,
      actionCard: {
        type: 'INFO',
        title: 'Partner Operations Help Desk',
        details: 'Ask about: 84-Pt Suite Audit • Milestone Escrow Payouts • Chauffeur Flight Sync • Rate Parity Multipliers • Commission Tiers',
        badge: 'OPERATIONS ASSISTANT READY',
      },
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `part-${Date.now()}`,
      sender: 'partner',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generatePartnerResponse(query, partnerRole);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const QUICK_PARTNER_PROMPTS = [
    { label: '🏨 Villa 101 Turnaround Audit', query: 'Check Villa 101 cleanliness and pre-arrival audit status' },
    { label: '🚗 Flight 6E-204 Fleet Sync', query: 'Verify Maybach fleet allocation for incoming flight 6E-204' },
    { label: '💰 Escrow Payout Timeline', query: 'When will the ₹1,30,500 escrow payout release for SS-LUX-8492?' },
    { label: '📊 Weekend Rate & Surge Sync', query: 'Check dynamic rate sync and surge multiplier for weekend stays' },
    { label: '📑 Commission Tiers & Fees', query: 'What are the commission rates and fees for hotel and fleet partners?' },
    { label: '➕ Onboard New Property', query: 'How do I add and verify a new luxury villa on StaySphere?' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col h-[640px] max-h-[90vh] transition-all border my-auto ${
          isPearl
            ? 'bg-white text-[#001E3D] border-teal-500/40 shadow-[0_25px_60px_-15px_rgba(0,169,165,0.15)]'
            : 'bg-[#001830] text-slate-100 border-[#00A9A5]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between rounded-t-3xl ${
            isPearl
              ? 'bg-gradient-to-r from-teal-50/90 via-slate-50 to-blue-50/60 border-slate-200'
              : 'bg-gradient-to-r from-[#002B4D] to-[#001428] border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                isPearl
                  ? 'bg-gradient-to-br from-[#00A9A5] to-[#0B3D91] text-white'
                  : 'bg-gradient-to-br from-[#00A9A5] to-[#3CCF91] text-[#001428]'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-base font-bold ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                  StaySphere Partner Operations Copilot
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold">
                  B2B Telematics
                </span>
              </div>
              <p className={`text-[11px] ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
                Operational AI for Hosts, Chauffeur Fleets & B2B Travel Agencies
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPearl ? 'bg-slate-200/80 hover:bg-slate-300 text-slate-700' : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className={`grid grid-cols-3 p-1.5 border-b text-xs font-bold ${isPearl ? 'bg-slate-100 border-slate-200' : 'bg-[#000E1C] border-white/10'}`}>
          <button
            type="button"
            onClick={() => setPartnerRole('HOTEL_RESORT')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              partnerRole === 'HOTEL_RESORT'
                ? isPearl
                  ? 'bg-white text-[#0B3D91] shadow-sm'
                  : 'bg-[#002B4D] text-[#00D2C4] shadow-md border border-[#00D2C4]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Hotel / Villa Host</span>
          </button>

          <button
            type="button"
            onClick={() => setPartnerRole('CHAUFFEUR_FLEET')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              partnerRole === 'CHAUFFEUR_FLEET'
                ? isPearl
                  ? 'bg-white text-[#0B3D91] shadow-sm'
                  : 'bg-[#002B4D] text-[#00D2C4] shadow-md border border-[#00D2C4]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Chauffeur Fleet</span>
          </button>

          <button
            type="button"
            onClick={() => setPartnerRole('B2B_CHANNEL')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              partnerRole === 'B2B_CHANNEL'
                ? isPearl
                  ? 'bg-white text-[#0B3D91] shadow-sm'
                  : 'bg-[#002B4D] text-[#00D2C4] shadow-md border border-[#00D2C4]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>B2B Travel Agent</span>
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div
          className={`px-4 py-2 border-b overflow-x-auto no-scrollbar flex items-center gap-1.5 ${
            isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#000E1C] border-white/5'
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${isPearl ? 'text-teal-700' : 'text-[#00D2C4]'}`}>
            <Sparkles className="w-3 h-3" /> Quick Ops:
          </span>
          {QUICK_PARTNER_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qp.query)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isPearl
                  ? 'bg-white hover:bg-teal-50 border-slate-300 text-slate-800 hover:border-teal-600'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:border-[#00D2C4]'
              }`}
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat Messages Feed */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 ${isPearl ? 'bg-[#F8FAFD]' : 'bg-[#001428]'}`}>
          {messages.map((msg) => {
            const isPartner = msg.sender === 'partner';
            return (
              <div key={msg.id} className={`flex gap-3 ${isPartner ? 'justify-end' : 'justify-start'}`}>
                {!isPartner && (
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      isPearl ? 'bg-teal-700 text-white' : 'bg-[#00A9A5] text-[#001428]'
                    }`}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-2.5 ${isPartner ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                      isPartner
                        ? isPearl
                          ? 'bg-teal-700 text-white rounded-tr-none'
                          : 'bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] text-white font-medium rounded-tr-none'
                        : isPearl
                        ? 'bg-white border border-slate-200 text-[#001E3D] rounded-tl-none'
                        : 'bg-[#001E36] border border-white/10 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[9px] mt-1 text-right opacity-70`}>{msg.time}</span>
                  </div>

                  {/* Interactive Action Card */}
                  {msg.actionCard && (
                    <div
                      className={`p-3.5 rounded-2xl border space-y-2 animate-fade-in ${
                        isPearl
                          ? 'bg-white border-teal-500/40 shadow-sm text-[#001E3D]'
                          : 'bg-[#002444] border-[#00D2C4]/40 text-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold">{msg.actionCard.title}</span>
                        {msg.actionCard.badge && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                            {msg.actionCard.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
                        {msg.actionCard.details}
                      </p>

                      {msg.actionCard.metrics && (
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {msg.actionCard.metrics.map((met, mIdx) => (
                            <div
                              key={mIdx}
                              className={`p-2 rounded-xl text-center border ${
                                isPearl ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/5'
                              }`}
                            >
                              <div className="text-[9px] text-slate-400 font-bold uppercase">{met.label}</div>
                              <div
                                className={`text-xs font-black mt-0.5 ${
                                  isPearl ? 'text-teal-700' : 'text-[#00D2C4]'
                                }`}
                              >
                                {met.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isPartner && (
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      isPearl ? 'bg-slate-200 text-slate-800' : 'bg-white/15 text-white'
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse">
              <Bot className="w-4 h-4 text-[#00A9A5]" />
              <span>Partner Copilot is querying operational telemetry...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className={`p-3 sm:p-4 border-t flex items-center gap-2 rounded-b-3xl ${
            isPearl ? 'bg-white border-slate-200' : 'bg-[#001020] border-white/10'
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot (audit status, escrow payout release, rate sync, fleet telemetry)..."
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
              isPearl
                ? 'bg-slate-50 border-slate-300 text-[#001E3D] focus:border-teal-600 focus:bg-white'
                : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
            }`}
          />
          <button
            type="submit"
            className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer shadow-md ${
              isPearl
                ? 'bg-gradient-to-r from-teal-600 to-[#0B3D91] text-white hover:brightness-110'
                : 'bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428] hover:brightness-110'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
