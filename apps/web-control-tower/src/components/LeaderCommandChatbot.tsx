import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Zap,
  Activity,
  Bot,
  User,
  Lock,
} from 'lucide-react';

interface LeaderCommandChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  activeRoleTitle?: string;
}

interface LeaderMessage {
  id: string;
  sender: 'leader' | 'sentinel';
  text: string;
  time: string;
  actionCard?: {
    type: 'GMV_VAULT' | 'SLA_RADAR' | 'FLEET_MAP' | 'OVERRIDE';
    title: string;
    details: string;
    metrics?: { label: string; value: string; color?: string }[];
    badge?: string;
    actionButtonText?: string;
  };
}

export function LeaderCommandChatbot({
  isOpen,
  onClose,
  activeRoleTitle = 'Platform Operations Admin / Relationship Manager',
}: LeaderCommandChatbotProps) {
  const [messages, setMessages] = useState<LeaderMessage[]>([
    {
      id: 'msg-1',
      sender: 'sentinel',
      text: `Sentinel Executive Command AI online. Ready to analyze platform GMV (₹1.84 Cr), triage 15-minute P0/P1 SLAs, monitor regional fleet telemetry across 6 cities, and execute escrow custody overrides.`,
      time: '14:00',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: LeaderMessage = {
      id: `lead-${Date.now()}`,
      sender: 'leader',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: LeaderMessage;
      const lower = query.toLowerCase();

      if (lower.includes('gmv') || lower.includes('vault') || lower.includes('revenue') || lower.includes('financial') || lower.includes('escrow')) {
        botResponse = {
          id: `sent-${Date.now()}`,
          sender: 'sentinel',
          text: `Platform Escrow Vault Summary: Current live escrow custody stands at ₹1,84,50,000 across 48 active journeys. 30-day gross platform GMV is ₹3.42 Cr with zero payment disputes and a 100% milestone settlement rate.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'GMV_VAULT',
            title: 'Live Escrow Custody & Financial Health',
            details: 'All funds held in segregated ICICI / Axis Escrow Custody with smart milestone release protocols.',
            metrics: [
              { label: 'Active Escrow Vault', value: '₹1.84 Cr', color: 'text-[#00D2C4]' },
              { label: 'Avg Journey Ticket', value: '₹1,18,500', color: 'text-[#FFC857]' },
              { label: 'Settlement SLA', value: '99.98% On-Time', color: 'text-emerald-400' },
            ],
            badge: 'VAULT AUDITED & SECURE',
          },
        };
      } else if (lower.includes('sla') || lower.includes('risk') || lower.includes('delayed') || lower.includes('ticket') || lower.includes('p0') || lower.includes('p1')) {
        botResponse = {
          id: `sent-${Date.now()}`,
          sender: 'sentinel',
          text: `Sentinel 15-Minute SLA Radar: 1 trip is currently under proactive monitoring due to weather in North Goa. Flight 6E-204 landed on-time; chauffeur Gurpreet Singh is 4 mins from curb. 0 overdue SLA breaches recorded.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'SLA_RADAR',
            title: '15-Minute Proactive Sentinel Health',
            details: 'Journey JN-SS-2026-9041 (Dr. Selva Murugan) • Active Stage 2 Chauffeur Transit • RM Priya Sharma assigned',
            metrics: [
              { label: 'Active P0/P1 SLAs', value: '1 Monitored', color: 'text-[#FF8A3D]' },
              { label: 'Avg RM Response', value: '3.4 Mins', color: 'text-[#00D2C4]' },
              { label: 'Escrow at Risk', value: '₹0 (Zero Risk)', color: 'text-emerald-400' },
            ],
            badge: 'ALL SLAS WITHIN THRESHOLD',
          },
        };
      } else if (lower.includes('fleet') || lower.includes('map') || lower.includes('telemetry') || lower.includes('chauffeur') || lower.includes('utilization')) {
        botResponse = {
          id: `sent-${Date.now()}`,
          sender: 'sentinel',
          text: `Regional Fleet Telemetry: 24 vehicles are active across Goa, Bengaluru, Jaipur, Udaipur, Manali, and Mumbai. Chauffeur fleet utilization is 88.5%, with 4 backup vehicles on airport standby.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'FLEET_MAP',
            title: 'Regional Fleet Telemetry & Standby Capacity',
            details: 'Goa MOPA VIP Lane: 3 Standby • BLR T2: 2 Standby • BOM T2: 2 Standby • JPR: 1 Standby',
            metrics: [
              { label: 'Active Fleet', value: '24 Vehicles' },
              { label: 'Maybach / Defender', value: '10 Units Active' },
              { label: 'EV Utilization', value: '92% Green' },
            ],
            badge: 'TELEMETRY SYNCED (5G GPS)',
          },
        };
      } else if (lower.includes('override') || lower.includes('emergency') || lower.includes('disburse') || lower.includes('release')) {
        botResponse = {
          id: `sent-${Date.now()}`,
          sender: 'sentinel',
          text: `Executive Override System: Authorized Relationship Managers can manually disburse escrow milestones, re-route VIP chauffeurs, or upgrade guest villas instantly with single-click cryptographic signing.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'OVERRIDE',
            title: 'Executive Escrow & Fleet Authority',
            details: 'Admin Key: AUTH-SOV-ADMIN-99 • Single-click instant payout trigger armed',
            badge: 'OVERRIDE LEVEL 3 ACTIVE',
            actionButtonText: 'Verify & Authorize Next Milestone Release',
          },
        };
      } else {
        botResponse = {
          id: `sent-${Date.now()}`,
          sender: 'sentinel',
          text: `Command query acknowledged: "${query}". Control Tower intelligence telemetry has processed this query for executive review.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const QUICK_COMMAND_PROMPTS = [
    { label: '📈 Platform GMV & Escrow Vault', query: 'Show platform GMV, active escrow custody vault, and settlement metrics' },
    { label: '🚨 15-Min SLA Risk Radar', query: 'Scan all active journeys for at-risk 15-minute P0/P1 SLA breaches' },
    { label: '🗺️ Regional Fleet Telemetry', query: 'Show regional fleet telemetry, chauffeur utilization, and airport standbys' },
    { label: '⚡ Executive Escrow Override', query: 'Explain executive escrow overrides and emergency chauffeur re-routing' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col h-[660px] max-h-[90vh] bg-[#001428] text-slate-100 border border-[#00A9A5]/40 my-auto animate-scale-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-[#002B4D] via-[#001E36] to-[#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D2C4] to-[#00A9A5] text-[#001428] font-black flex items-center justify-center shadow-lg shadow-[#00A9A5]/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Executive Operations Intelligence AI
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00D2C4]/20 border border-[#00D2C4]/40 text-[#00D2C4] text-[10px] font-mono font-bold">
                  COMMAND v3.0
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Platform Leaders & RM Command • {activeRoleTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Command Prompts */}
        <div className="px-4 py-2.5 border-b border-white/10 bg-[#000E1C] overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00D2C4] shrink-0 flex items-center gap-1">
            <Activity className="w-3 h-3" /> Command Chips:
          </span>
          {QUICK_COMMAND_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qp.query)}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-white/10 bg-[#001830] hover:bg-[#002B4D] hover:border-[#00D2C4] text-slate-200 transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#001020]">
          {messages.map((msg) => {
            const isLeader = msg.sender === 'leader';
            return (
              <div key={msg.id} className={`flex gap-3 ${isLeader ? 'justify-end' : 'justify-start'}`}>
                {!isLeader && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D2C4] to-[#0B3D91] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2.5 ${isLeader ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                      isLeader
                        ? 'bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] text-white font-medium rounded-tr-none'
                        : 'bg-[#001C38] border border-white/10 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] mt-1 text-right text-slate-300 opacity-75">{msg.time}</span>
                  </div>

                  {msg.actionCard && (
                    <div className="p-4 rounded-2xl bg-[#002444] border border-[#00A9A5]/40 space-y-3 shadow-lg animate-fade-in">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{msg.actionCard.title}</span>
                        {msg.actionCard.badge && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            {msg.actionCard.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {msg.actionCard.details}
                      </p>

                      {msg.actionCard.metrics && (
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {msg.actionCard.metrics.map((met, mIdx) => (
                            <div key={mIdx} className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                              <div className="text-[9px] text-slate-400 font-bold uppercase">{met.label}</div>
                              <div className={`text-xs font-black mt-0.5 ${met.color || 'text-white'}`}>{met.value}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.actionCard.actionButtonText && (
                        <button
                          type="button"
                          onClick={() => handleSend('Authorizing instant milestone disbursement with cryptographic verification key...')}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{msg.actionCard.actionButtonText}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isLeader && (
                  <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#00D2C4] animate-pulse">
              <Bot className="w-4 h-4 text-[#00A9A5]" />
              <span>Sentinel Command AI is calculating real-time portfolio metrics...</span>
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
          className="p-3 sm:p-4 border-t border-white/10 bg-[#000E1C] flex items-center gap-2 rounded-b-3xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Command Sentinel AI (Escrow status, SLA risk scan, fleet map, manual override)..."
            className="flex-1 px-4 py-2.5 rounded-xl text-xs outline-none bg-[#001830] border border-white/15 text-white focus:border-[#00D2C4] transition-all"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] via-[#00D2C4] to-[#3CCF91] text-[#001428] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-[#00A9A5]/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
