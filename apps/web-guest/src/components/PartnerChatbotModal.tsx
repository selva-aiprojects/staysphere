'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Building2,
  Car,
  Users,
  ShieldCheck,
  Clock,
  DollarSign,
  TrendingUp,
  KeyRound,
  CheckCircle2,
  Bot,
  User,
  Sparkles,
  ArrowRight,
  FileText,
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
    type: 'ROOM_AUDIT' | 'FLEET_ASSIGN' | 'ESCROW_PAYOUT' | 'RATE_SYNC' | 'INVOICE';
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
      text: 'Welcome to the StaySphere Partner Operations Copilot. I can assist with suite turnaround telemetry, fleet reassignments, automated milestone escrow payouts, and live rate sync across channels.',
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
      let botResponse: ChatMessage;
      const lower = query.toLowerCase();

      if (lower.includes('audit') || lower.includes('clean') || lower.includes('villa 101') || lower.includes('turnaround') || lower.includes('room')) {
        botResponse = {
          id: `cop-${Date.now()}`,
          sender: 'copilot',
          text: `Villa 101 (Horizon Clifftop Ocean Villa) has completed its 84-point pre-arrival inspection. Housekeeping supervisor certified linen purity, HVAC 21°C calibration, and BLE smart lock encryption.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'ROOM_AUDIT',
            title: 'Suite 84-Point Readiness Audit Passed',
            details: 'The Grand Vagator Bay Resort • Pre-Check-in Pass Active for Dr. Selva Murugan',
            metrics: [
              { label: 'Audit Score', value: '84/84 (100%)' },
              { label: 'BLE Keycard', value: 'Armed (AES-256)' },
              { label: 'Suite Temp', value: '21.0°C Set' },
            ],
            badge: 'READY FOR GUEST TAP',
          },
        };
      } else if (lower.includes('fleet') || lower.includes('car') || lower.includes('driver') || lower.includes('reassign') || lower.includes('maybach')) {
        botResponse = {
          id: `cop-${Date.now()}`,
          sender: 'copilot',
          text: `Flight 6E-204 telemetry indicates on-time touchdown at 13:45 PM. Mercedes-Maybach S680 (GA-03-XX-0001) driven by Gurpreet Singh has been confirmed at MOPA Airport Terminal 1 VIP lane.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      } else if (lower.includes('payout') || lower.includes('escrow') || lower.includes('money') || lower.includes('settle') || lower.includes('130500')) {
        botResponse = {
          id: `cop-${Date.now()}`,
          sender: 'copilot',
          text: `Booking SS-LUX-8492 holds ₹1,30,500 in StaySphere Escrow Vault. Milestone Rule: 70% (₹91,350) automatically disburses 2 hours post seamless check-in, and 30% (₹39,150) upon trip completion.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      } else if (lower.includes('rate') || lower.includes('surge') || lower.includes('price') || lower.includes('sync')) {
        botResponse = {
          id: `cop-${Date.now()}`,
          sender: 'copilot',
          text: `Dynamic Rate Sync is active across StaySphere Direct, Amex B2B, and Partner APIs. Weekend rates for Goa & Udaipur are calibrated with a +15% demand multiplier.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'RATE_SYNC',
            title: 'Multi-Channel Rate Distribution',
            details: 'Instant 2-way rate parity & availability sync with 0% double-booking risk',
            metrics: [
              { label: 'Active Multiplier', value: '+15% Peak Weekend' },
              { label: 'Villa 101 Rate', value: '₹42,000 / night' },
              { label: 'API Status', value: 'Synced (Sub-50ms)' },
            ],
            badge: 'RATE PARITY LOCKED',
          },
        };
      } else {
        botResponse = {
          id: `cop-${Date.now()}`,
          sender: 'copilot',
          text: `Acknowledged partner query: "${query}". Operational lead and automated telemetry have recorded this request for your portfolio.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const QUICK_PARTNER_PROMPTS = [
    { label: '🏨 Villa 101 Turnaround Audit', query: 'Check Villa 101 cleanliness and pre-arrival audit status' },
    { label: '🚗 Flight 6E-204 Fleet Sync', query: 'Verify Maybach fleet allocation for incoming flight 6E-204' },
    { label: '💰 Escrow Payout Timeline', query: 'When will the ₹1,30,500 escrow payout release for SS-LUX-8492?' },
    { label: '📊 Weekend Rate & Surge Sync', query: 'Check dynamic rate sync and surge multiplier for weekend stays' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col h-[640px] max-h-[90vh] transition-all border my-auto ${
          isPearl
            ? 'bg-white text-[#001E3D] border-teal-300 shadow-[0_25px_60px_-15px_rgba(0,169,165,0.15)]'
            : 'bg-[#001E36] text-slate-100 border-[#00A9A5]/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between rounded-t-3xl ${
            isPearl
              ? 'bg-gradient-to-r from-teal-50 via-slate-50 to-teal-50/60 border-slate-200'
              : 'bg-gradient-to-r from-[#002B4D] to-[#001428] border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                isPearl
                  ? 'bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] text-white'
                  : 'bg-gradient-to-br from-[#00A9A5] to-[#3CCF91] text-[#001428]'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-base font-serif-luxury font-bold ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                  Partner Operations Copilot AI
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-[10px] font-bold">
                  B2B & Fleet Hub
                </span>
              </div>
              <p className={`text-[11px] ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
                Property Turnaround • Fleet Logistics • Escrow Milestones • Rate Engine
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

        {/* Partner Role Selector Tabs */}
        <div
          className={`px-4 py-2 border-b flex items-center justify-between gap-2 ${
            isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#000E1C] border-white/5'
          }`}
        >
          <div className="flex items-center gap-1.5">
            {[
              { id: 'HOTEL_RESORT', label: 'Hotel & Resort Partner', icon: Building2 },
              { id: 'CHAUFFEUR_FLEET', label: 'Fleet & Chauffeur Lead', icon: Car },
              { id: 'B2B_CHANNEL', label: 'B2B & Travel Agent', icon: Users },
            ].map((role) => {
              const Icon = role.icon;
              const isSelected = partnerRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setPartnerRole(role.id as any)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? isPearl
                        ? 'bg-[#0B3D91] text-white shadow-sm'
                        : 'bg-[#00A9A5] text-[#001428] font-black'
                      : isPearl
                      ? 'text-slate-600 hover:bg-slate-200'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Prompts */}
        <div
          className={`px-4 py-2 border-b overflow-x-auto no-scrollbar flex items-center gap-1.5 ${
            isPearl ? 'bg-white border-slate-200' : 'bg-[#001428] border-white/5'
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${isPearl ? 'text-[#00A9A5]' : 'text-[#00D2C4]'}`}>
            <Sparkles className="w-3 h-3" /> Partner Quick Actions:
          </span>
          {QUICK_PARTNER_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qp.query)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isPearl
                  ? 'bg-slate-50 hover:bg-teal-50 border-slate-300 text-slate-800 hover:border-[#00A9A5]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:border-[#00A9A5]'
              }`}
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 ${isPearl ? 'bg-[#F8FAFD]' : 'bg-[#001428]'}`}>
          {messages.map((msg) => {
            const isPartner = msg.sender === 'partner';
            return (
              <div key={msg.id} className={`flex gap-3 ${isPartner ? 'justify-end' : 'justify-start'}`}>
                {!isPartner && (
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      isPearl ? 'bg-[#00A9A5] text-white' : 'bg-[#00A9A5] text-[#001428]'
                    }`}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-2.5 ${isPartner ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isPartner
                        ? isPearl
                          ? 'bg-[#0B3D91] text-white rounded-tr-none'
                          : 'bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428] font-semibold rounded-tr-none'
                        : isPearl
                        ? 'bg-white border border-slate-200 text-[#001E3D] rounded-tl-none'
                        : 'bg-[#001E36] border border-white/10 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] mt-1 text-right opacity-70">{msg.time}</span>
                  </div>

                  {msg.actionCard && (
                    <div
                      className={`p-3.5 rounded-2xl border space-y-2.5 animate-fade-in ${
                        isPearl
                          ? 'bg-white border-teal-200/80 shadow-sm text-[#001E3D]'
                          : 'bg-[#002444] border-[#00A9A5]/40 text-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold">{msg.actionCard.title}</span>
                        {msg.actionCard.badge && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30">
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
                            <div key={mIdx} className={`p-2 rounded-xl border text-center ${isPearl ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'}`}>
                              <div className="text-[9px] text-slate-400 font-bold uppercase">{met.label}</div>
                              <div className="text-xs font-black text-[#00A9A5] mt-0.5">{met.value}</div>
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
            placeholder="Ask Partner Copilot (Villa 101 audit, Maybach fleet, escrow release schedule)..."
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
              isPearl
                ? 'bg-slate-50 border-slate-300 text-[#001E3D] focus:border-[#00A9A5] focus:bg-white'
                : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
            }`}
          />
          <button
            type="submit"
            className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer shadow-md ${
              isPearl
                ? 'bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] text-white hover:brightness-110'
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
