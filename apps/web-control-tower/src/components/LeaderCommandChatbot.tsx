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
    type: 'GMV_VAULT' | 'SLA_RADAR' | 'FLEET_MAP' | 'OVERRIDE' | 'INFO';
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
      text: `Sentinel Executive Command AI online. Ready to analyze platform GMV (₹1.84 Cr), triage 15-minute P0/P1 SLAs, monitor regional fleet telemetry across 6 cities, and execute cryptographic escrow custody overrides.`,
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

  // Intelligent Leader Natural Language Command Engine
  const generateLeaderResponse = (query: string): LeaderMessage => {
    const q = query.toLowerCase().trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. GMV / Escrow Vault / Financials / Payouts / Turnover
    if (
      q.includes('gmv') ||
      q.includes('vault') ||
      q.includes('revenue') ||
      q.includes('financial') ||
      q.includes('escrow') ||
      q.includes('volume') ||
      q.includes('turnover') ||
      q.includes('balance') ||
      q.includes('money') ||
      q.includes('disburse') ||
      q.includes('settle')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `Platform Escrow Vault & Financial Summary:
• Active Escrow Custody: ₹1,84,50,000 held in segregated ICICI/Axis custody across 48 active journeys.
• 30-Day Platform GMV: ₹3,42,80,000 (average journey ticket: ₹1,18,500).
• Settlement Health: 100% on-time milestone payouts (70% at check-in, 30% at trip end) with 0 payment disputes and 0 chargebacks.
• Net Platform Revenue (12% take rate): ₹41.1 Lakhs accrued for current financial month.`,
        time: nowTime,
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
    }

    // 2. 15-Minute SLA Radar / Incidents / P0/P1 / Delays
    if (
      q.includes('sla') ||
      q.includes('risk') ||
      q.includes('delayed') ||
      q.includes('ticket') ||
      q.includes('p0') ||
      q.includes('p1') ||
      q.includes('incident') ||
      q.includes('breach') ||
      q.includes('radar') ||
      q.includes('emergency')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `Sentinel 15-Minute SLA Risk Radar Telemetry:
• Active Journeys Monitored: 48 concurrent journeys across 6 regional corridors.
• At-Risk Trips: 1 journey flagged (JN-SS-2026-9041, Dr. Selva Murugan) due to coastal rain near MOPA airport.
• Chauffeur Transit Status: Mercedes-Maybach S680 driver Gurpreet Singh is 4 minutes from airport curb.
• Network SLA Health: 0 overdue SLA breaches in last 30 days. Average Relationship Manager response latency: 3.4 minutes (target: < 15 mins).`,
        time: nowTime,
        actionCard: {
          type: 'SLA_RADAR',
          title: '15-Minute Proactive Sentinel Health',
          details: 'Journey JN-SS-2026-9041 • Active Stage 2 Chauffeur Transit • RM Priya Sharma assigned',
          metrics: [
            { label: 'Active P0/P1 SLAs', value: '1 Monitored', color: 'text-[#FF8A3D]' },
            { label: 'Avg RM Response', value: '3.4 Mins', color: 'text-[#00D2C4]' },
            { label: 'Escrow at Risk', value: '₹0 (Zero Risk)', color: 'text-emerald-400' },
          ],
          badge: 'ALL SLAS WITHIN THRESHOLD',
        },
      };
    }

    // 3. Regional Fleet Telematics / Chauffeur Utilization / Standbys
    if (
      q.includes('fleet') ||
      q.includes('map') ||
      q.includes('telemetry') ||
      q.includes('chauffeur') ||
      q.includes('driver') ||
      q.includes('utilization') ||
      q.includes('standby') ||
      q.includes('maybach') ||
      q.includes('defender') ||
      q.includes('car') ||
      q.includes('vehicle')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `Regional Mobility Fleet Telematics & Utilization:
• Active Vehicles: 24 luxury vehicles deployed (Goa: 8, Mumbai: 5, Bengaluru: 4, Jaipur: 3, Udaipur: 2, Manali: 2).
• Fleet Utilization Rate: 88.5% active transit / 11.5% airport standby.
• Standby Reserves: 4 backup vehicles in airport VIP lanes (MOPA GOX: 2, BLR T2: 1, BOM T2: 1).
• EV Fleet Health: 92% electric vehicles with real-time battery status above 85% and sub-1.2s GPS telemetry.`,
        time: nowTime,
        actionCard: {
          type: 'FLEET_MAP',
          title: 'Regional Fleet Telemetry & Standby Capacity',
          details: 'Goa MOPA VIP Lane: 2 Standby • BLR T2: 1 Standby • BOM T2: 1 Standby • 5G GPS active',
          metrics: [
            { label: 'Active Fleet', value: '24 Vehicles' },
            { label: 'Maybach / Defender', value: '10 Units Active' },
            { label: 'EV Utilization', value: '92% Green' },
          ],
          badge: 'TELEMETRY SYNCED (5G GPS)',
        },
      };
    }

    // 4. Cryptographic Escrow Override & Emergency Authority
    if (
      q.includes('override') ||
      q.includes('emergency') ||
      q.includes('disburse') ||
      q.includes('release') ||
      q.includes('force') ||
      q.includes('manual') ||
      q.includes('multisig') ||
      q.includes('auth') ||
      q.includes('key')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `Executive Escrow Override & Multi-Sig Protocol:
• Authority Level: Executive Level 3 (COO Devraj Mukherjee / CFO Rajesh Khosla / RM Lead).
• Capabilities:
  1. Instant manual milestone disbursement (bypassing 2-hour delay upon VIP verification).
  2. Cryptographic emergency refund authorization directly from Escrow Vault.
  3. Dynamic chauffeur re-routing with real-time telematics dispatch.
• Audit Logging: All override actions are cryptographically signed (SHA-256) and permanently recorded in the Enterprise Audit Trail.`,
        time: nowTime,
        actionCard: {
          type: 'OVERRIDE',
          title: 'Executive Escrow & Fleet Authority',
          details: 'Admin Key: AUTH-SOV-ADMIN-99 • Single-click instant payout trigger armed',
          metrics: [
            { label: 'Override Level', value: 'Level 3 Root' },
            { label: 'Audit Trail', value: 'SHA-256 Signed' },
            { label: 'Approval Status', value: 'Ready' },
          ],
          badge: 'OVERRIDE LEVEL 3 ACTIVE',
          actionButtonText: 'Verify & Authorize Next Milestone Release',
        },
      };
    }

    // 5. Partner Governance, Rate Parity & 84-Point Audits
    if (
      q.includes('partner') ||
      q.includes('audit') ||
      q.includes('contract') ||
      q.includes('parity') ||
      q.includes('discrepancy') ||
      q.includes('compliance') ||
      q.includes('renewal') ||
      q.includes('84-point')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `Partner Governance & Compliance Index:
• Certified Partner Properties: 42 verified luxury estates across India.
• 84-Point Physical Audit Average: 99.4% network compliance score.
• Rate Parity Discrepancies: 1 minor discrepancy detected on Manali Alpine Chalet (automatically healed via 2-way API sync).
• Contract Lifecycle: 40 Active contracts, 2 renewals scheduled for Q4 (The Vana Azure Ocean Estate & Pichola Palace).`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'Partner Governance & Rate Compliance',
          details: '42 certified partners • 99.4% average audit score • Zero active listing discrepancies',
          metrics: [
            { label: 'Total Partners', value: '42 Verified' },
            { label: 'Audit Average', value: '99.4%' },
            { label: 'Parity Status', value: '100% In Sync' },
          ],
          badge: 'GOVERNANCE OPTIMAL',
        },
      };
    }

    // 6. Employee Operations Roster & Staff Allocation
    if (
      q.includes('employee') ||
      q.includes('staff') ||
      q.includes('team') ||
      q.includes('roster') ||
      q.includes('rm') ||
      q.includes('directory') ||
      q.includes('vikram') ||
      q.includes('rajesh') ||
      q.includes('devraj') ||
      q.includes('ananya') ||
      q.includes('vikas') ||
      q.includes('priya')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `StaySphere Employee & Operations Duty Roster:
• Vikramaditya Singh: Senior Relationship Manager (West & North India Estates, 14 active properties).
• Rajesh Khosla: Chief Financial Officer & Escrow Vault Custodian (Daily clearing volume: ₹1.2 Cr).
• Devraj Mukherjee: Chief Operating Officer & Central Resolution Lead (15-min SLA Command).
• Ananya Deshmukh: Head of Frontdesk & Concierge (Vana Azure & AES-256 digital keycards).
• Vikas Rathore: Fleet Telematics Director (24 luxury vehicles across 6 corridors).
• Priya Nambiar: Head of B2B Luxury Concierge (AMEX Centurion Channel).`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'Enterprise Staff & Leadership Matrix',
          details: 'All operational teams active • Zero unassigned SLA incidents across regions',
          metrics: [
            { label: 'Active Staff', value: '28 Officers' },
            { label: 'RM Coverage', value: '6 Corridors' },
            { label: 'Duty Manager', value: 'Devraj M. (COO)' },
          ],
          badge: 'ROSTER ACTIVE',
        },
      };
    }

    // 7. API Health & Webhook Telemetry
    if (
      q.includes('api') ||
      q.includes('webhook') ||
      q.includes('uptime') ||
      q.includes('server') ||
      q.includes('latency') ||
      q.includes('infrastructure')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `StaySphere Core Platform Infrastructure & API Health:
• System Uptime: 99.98% over last 90 days.
• Webhook Delivery Latency: 42ms median response time across 14,200 daily partner events.
• Error Rate: 0.002% (well within 99.9% enterprise SLA).
• HSM Encryption Engine: 256-Bit hardware security module operational for all digital keycards and escrow transfers.`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'Platform Infrastructure Telemetry',
          details: '99.98% SLA uptime • 42ms median webhook latency • Zero cryptographic failures',
          metrics: [
            { label: 'Uptime SLA', value: '99.98%' },
            { label: 'API Latency', value: '42ms' },
            { label: 'HSM Vault', value: 'Active' },
          ],
          badge: 'INFRASTRUCTURE 100% HEALTHY',
        },
      };
    }

    // 8. Greetings & Command AI Overview
    if (
      q.includes('hello') ||
      q.includes('hi') ||
      q.includes('hey') ||
      q.includes('who are you') ||
      q.includes('what can you do') ||
      q.includes('help') ||
      q.includes('status')
    ) {
      return {
        id: `sent-${Date.now()}`,
        sender: 'sentinel',
        text: `Sentinel Executive Command AI ready. As an authorized leader (${activeRoleTitle}), you have access to:
1. Real-time GMV & Escrow Vault custody telemetry (₹1.84 Cr live vault)
2. 15-Minute SLA Risk Radar with early incident warnings
3. Regional fleet telematics & airport standby tracking across 6 corridors
4. Partner governance, rate parity, and 84-point quality audits
5. Multi-sig cryptographic escrow overrides & emergency payouts
Enter any command or query to inspect platform operations.`,
        time: nowTime,
      };
    }

    // 9. Smart Fallback with Contextual Assistance
    return {
      id: `sent-${Date.now()}`,
      sender: 'sentinel',
      text: `Executive query processed: "${query}". Control Tower intelligence telemetry is actively tracking all 48 journeys, 24 chauffeur vehicles, and ₹1.84 Cr Escrow Vault. You can query financial metrics, SLA incidents, fleet GPS coordinates, partner compliance, or employee duty rosters.`,
      time: nowTime,
      actionCard: {
        type: 'INFO',
        title: 'Executive Intelligence Command',
        details: 'Try: "Show GMV vault telemetry", "Scan 15-min SLA risks", "Display regional fleet map", "Check partner rate parity", or "Review staff roster"',
        badge: 'COMMAND READY',
      },
    };
  };

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
      const botResponse = generateLeaderResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const QUICK_COMMAND_PROMPTS = [
    { label: '📈 Platform GMV & Escrow Vault', query: 'Show platform GMV, active escrow custody vault, and settlement metrics' },
    { label: '🚨 15-Min SLA Risk Radar', query: 'Scan all active journeys for at-risk 15-minute P0/P1 SLA breaches' },
    { label: '🗺️ Regional Fleet Telemetry', query: 'Show regional fleet telemetry, chauffeur utilization, and airport standbys' },
    { label: '⚡ Executive Escrow Override', query: 'Explain executive escrow overrides and emergency chauffeur re-routing' },
    { label: '🏢 Partner Governance & Audits', query: 'Check partner contracts, rate parity sync, and 84-point audit scores' },
    { label: '👥 Employee Operations Roster', query: 'Show employee duty roster, RM assignments, and finance vault custodians' },
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
              <p className="text-xs text-slate-400">
                Active Session: <strong className="text-white">{activeRoleTitle}</strong>
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
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-md whitespace-pre-line ${
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
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer hover:brightness-110 transition-all"
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
              <span>Sentinel Command AI is querying real-time enterprise telemetry...</span>
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
            placeholder="Command Sentinel AI (GMV vault telemetry, SLA risk scan, fleet map, manual override)..."
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
