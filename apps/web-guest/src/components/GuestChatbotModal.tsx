'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Crown,
  Car,
  Hotel,
  ShieldCheck,
  Clock,
  Compass,
  Utensils,
  Thermometer,
  Zap,
  CheckCircle2,
  Bot,
  User,
  ArrowRight,
  MessageSquare,
  Sparkle,
} from 'lucide-react';
import { CustomerUser } from './CustomerAuthModal';

interface GuestChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'pearl';
  currentUser?: CustomerUser | null;
  onOpenResolve?: (category: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  actionCard?: {
    type: 'CHAUFFEUR' | 'DINING' | 'CLIMATE' | 'RESOLVE' | 'SIGHTSEEING';
    title: string;
    details: string;
    badge?: string;
  };
}

export function GuestChatbotModal({
  isOpen,
  onClose,
  theme = 'pearl',
  currentUser,
  onOpenResolve,
}: GuestChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Namaste ${currentUser?.fullName ? currentUser.fullName.split(' ')[0] : 'Guest'}! I am your StaySphere Sovereign Concierge AI. How may I orchestrate your luxury travel, chauffeur pickup, or in-suite preferences today?`,
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
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: ChatMessage;
      const lower = query.toLowerCase();

      if (lower.includes('driver') || lower.includes('chauffeur') || lower.includes('cab') || lower.includes('pickup') || lower.includes('car')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Your chauffeur Gurpreet Singh is on-time and synchronized with IndiGo flight 6E-204. He is stationed at MOPA Airport Terminal 1 VIP Pickup Lane with cold towels and sparkling water.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'CHAUFFEUR',
            title: 'Mercedes-Maybach S680 Standby',
            details: 'Driver: Gurpreet Singh (4.98 ★) • ETA: 6 mins • Live GPS Coords: 15.7538° N, 73.8697° E',
            badge: 'FLIGHT LANDED (ON-TIME)',
          },
        };
      } else if (lower.includes('food') || lower.includes('dining') || lower.includes('dinner') || lower.includes('chef') || lower.includes('seafood') || lower.includes('order')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Executive Chef Raghav has received your request for Fresh Coastal Seafood and Artisanal Sourdough. It is being prepared fresh and will be served hot in Villa 101 in 20 minutes.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'DINING',
            title: 'In-Suite Dining Order Dispatched',
            details: 'Fresh Tandoori Jumbo Lobster & Coconut Kokum Curry • Estimated delivery: 14:20 PM',
            badge: 'CHEF PREPARING (20 MINS)',
          },
        };
      } else if (lower.includes('temp') || lower.includes('climate') || lower.includes('temperature') || lower.includes('ac') || lower.includes('21') || lower.includes('22')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `I have adjusted your suite's smart IoT climate system. Villa 101 is now maintaining a crisp 21°C with soft amber ambient mood lighting.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'CLIMATE',
            title: 'Suite Climate Synced',
            details: 'Target Temp: 21°C • Air Ionizer: Active • Scent: Himalayan Cedar & Bergamot',
            badge: 'CLIMATE OPTIMAL',
          },
        };
      } else if (lower.includes('sla') || lower.includes('resolve') || lower.includes('issue') || lower.includes('complaint') || lower.includes('help')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Under StaySphere's Guaranteed 15-Minute Proactive Resolution SLA, your concern has top priority. Our Senior Relationship Manager Priya Sharma is actively monitoring your journey telemetry.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'RESOLVE',
            title: '15-Minute SLA Sentinel Active',
            details: 'Assigned Lead: Priya Sharma (Senior RM) • Guaranteed Escrow Vault Protection: ₹1,30,500',
            badge: '15:00 MIN CLOCK READY',
          },
        };
      } else if (lower.includes('tour') || lower.includes('excursion') || lower.includes('sightseeing') || lower.includes('boat') || lower.includes('cruise')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `For your Goa clifftop getaway, I highly recommend our Private 32ft Sunset Speedboat Safari to Grand Island, or the Historic Fontainhas Latin Quarter heritage walk. Both include chauffeured transfers.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'SIGHTSEEING',
            title: 'Curated Itinerary Suggestion',
            details: 'Private Speedboat Cruise + Champagne (₹3,200) • Pickup at Sinquerim Jetty 17:00 PM',
            badge: 'VIP BUNDLE AVAILABLE',
          },
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Certainly! I have recorded your request: "${query}". I am actively coordinating with your chauffeur, villa butler Chef Raghav, and the StaySphere Operations Desk.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const QUICK_PROMPTS = [
    { label: '🚗 Where is my chauffeur?', query: 'Where is my airport pickup chauffeur right now?' },
    { label: '🍽️ Order In-Suite Seafood', query: 'Order Fresh Coastal Seafood dinner to Villa 101' },
    { label: '❄️ Set Climate to 21°C', query: 'Set suite temperature to 21 degrees Celsius' },
    { label: '🛡️ 15-Min Proactive SLA', query: 'How does the 15-minute Proactive Resolve SLA work?' },
    { label: '🛥️ Recommend Sunset Tours', query: 'Suggest top curated sightseeing excursions for Goa' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col h-[640px] max-h-[90vh] transition-all border my-auto ${
          isPearl
            ? 'bg-white text-[#001E3D] border-[#D4AF37]/40 shadow-[0_25px_60px_-15px_rgba(11,61,145,0.15)]'
            : 'bg-[#001830] text-slate-100 border-[#FFC857]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between rounded-t-3xl ${
            isPearl
              ? 'bg-gradient-to-r from-amber-50/90 via-slate-50 to-amber-50/60 border-slate-200'
              : 'bg-gradient-to-r from-[#002B4D] to-[#001428] border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                isPearl
                  ? 'bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] text-white'
                  : 'bg-gradient-to-br from-[#FF8A3D] to-[#FFC857] text-[#001428]'
              }`}
            >
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-base font-serif-luxury font-bold ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                  Guest AI Concierge & Butler
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  Live 24/7
                </span>
              </div>
              <p className={`text-[11px] ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
                Sovereign Traveler Assistant • Flight Sync, Suite Amenities & 15-Min SLA
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

        {/* Quick Prompts Bar */}
        <div
          className={`px-4 py-2 border-b overflow-x-auto no-scrollbar flex items-center gap-1.5 ${
            isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#000E1C] border-white/5'
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${isPearl ? 'text-[#0B3D91]' : 'text-[#FFC857]'}`}>
            <Sparkles className="w-3 h-3" /> Quick Ask:
          </span>
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qp.query)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isPearl
                  ? 'bg-white hover:bg-blue-50 border-slate-300 text-slate-800 hover:border-[#0B3D91]'
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
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      isPearl ? 'bg-[#0B3D91] text-white' : 'bg-[#00A9A5] text-[#001428]'
                    }`}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? isPearl
                          ? 'bg-[#0B3D91] text-white rounded-tr-none'
                          : 'bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-semibold rounded-tr-none'
                        : isPearl
                        ? 'bg-white border border-slate-200 text-[#001E3D] rounded-tl-none'
                        : 'bg-[#001E36] border border-white/10 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[9px] mt-1 text-right opacity-70`}>{msg.time}</span>
                  </div>

                  {/* Optional Interactive Action Card */}
                  {msg.actionCard && (
                    <div
                      className={`p-3.5 rounded-2xl border space-y-2 animate-fade-in ${
                        isPearl
                          ? 'bg-white border-[#D4AF37]/50 shadow-sm text-[#001E3D]'
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
                      {msg.actionCard.type === 'RESOLVE' && onOpenResolve && (
                        <button
                          type="button"
                          onClick={() => onOpenResolve('GENERAL_INQUIRY')}
                          className="w-full py-1.5 rounded-lg bg-[#FF8A3D] text-[#001428] font-bold text-xs flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Open Full Proactive SLA Ticket</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isUser && (
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
              <span>Sovereign Concierge is reviewing journey telemetry...</span>
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
            placeholder="Ask anything (driver ETA, dinner order, room climate, 15-min SLA)..."
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
              isPearl
                ? 'bg-slate-50 border-slate-300 text-[#001E3D] focus:border-[#0B3D91] focus:bg-white'
                : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
            }`}
          />
          <button
            type="submit"
            className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer shadow-md ${
              isPearl
                ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white hover:brightness-110'
                : 'bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] hover:brightness-110'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
