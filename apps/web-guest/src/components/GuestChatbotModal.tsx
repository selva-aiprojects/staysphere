'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Crown,
  ShieldCheck,
  Bot,
  User,
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
    type: 'CHAUFFEUR' | 'DINING' | 'CLIMATE' | 'RESOLVE' | 'SIGHTSEEING' | 'INFO';
    title: string;
    details: string;
    badge?: string;
    metrics?: { label: string; value: string }[];
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
      text: `Namaste ${currentUser?.fullName ? currentUser.fullName.split(' ')[0] : 'Guest'}! I am your StaySphere Sovereign Concierge & In-Suite AI Butler. How may I orchestrate your luxury travel, chauffeur pickup, in-suite dining, or local excursions today?`,
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

  // Intelligent Natural Language Query Processor
  const generateGuestResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase().trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Chauffeur / Airport / Flight / Driver / Transit
    if (
      q.includes('driver') ||
      q.includes('chauffeur') ||
      q.includes('cab') ||
      q.includes('pickup') ||
      q.includes('drop') ||
      q.includes('flight') ||
      q.includes('airport') ||
      q.includes('car') ||
      q.includes('maybach') ||
      q.includes('defender') ||
      q.includes('ev') ||
      q.includes('transit') ||
      q.includes('eta') ||
      q.includes('terminal') ||
      q.includes('6e-204')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `Your chauffeur Gurpreet Singh is actively synchronized with IndiGo Flight 6E-204 (DEL ➔ GOX/GOI). He is stationed at Terminal 1 VIP Arrival Lane with the Mercedes-Maybach S680, chilled Himalayan mineral water, and scented cold towels. If your flight is delayed, your chauffeur automatically adjusts with zero waiting penalties.`,
        time: nowTime,
        actionCard: {
          type: 'CHAUFFEUR',
          title: 'Mercedes-Maybach S680 Airport Standby',
          details: 'Driver: Gurpreet Singh (4.98 ★) • Vehicle: GA-01-EV-9002 • Luggage Assistance: Active',
          badge: 'FLIGHT SYNCHRONIZED (ON-TIME)',
          metrics: [
            { label: 'Live ETA', value: '6 mins' },
            { label: 'Cabin Temp', value: '21.0°C' },
            { label: 'Escrow Status', value: 'Transit Paid' },
          ],
        },
      };
    }

    // 2. Food / Dining / Chef / Dinner / Breakfast / Lunch / Drinks / Room Service
    if (
      q.includes('food') ||
      q.includes('dining') ||
      q.includes('dinner') ||
      q.includes('lunch') ||
      q.includes('breakfast') ||
      q.includes('chef') ||
      q.includes('meal') ||
      q.includes('eat') ||
      q.includes('seafood') ||
      q.includes('veg') ||
      q.includes('vegetarian') ||
      q.includes('vegan') ||
      q.includes('tea') ||
      q.includes('coffee') ||
      q.includes('wine') ||
      q.includes('cocktail') ||
      q.includes('order') ||
      q.includes('menu') ||
      q.includes('room service') ||
      q.includes('dessert')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `Executive Chef Raghav has prepared a bespoke gourmet in-suite menu for your stay. Today's signature selections include Fresh Tandoori Jumbo Lobster, Goan Coconut Kokum Curry, Truffle Wild Mushroom Risotto, and Artisanal Sourdough. All meals are prepared fresh and served directly in your suite or private pool deck within 20–25 minutes.`,
        time: nowTime,
        actionCard: {
          type: 'DINING',
          title: 'In-Suite Gourmet Dining Order',
          details: 'Dispatched to Executive Kitchen • Charged seamlessly to your StaySphere Escrow portfolio',
          badge: 'CHEF PREPARING (20 MINS)',
          metrics: [
            { label: 'Service Style', value: 'In-Suite / Deck' },
            { label: 'Dietary', value: 'Chef Tailored' },
            { label: 'Delivery ETA', value: '20 mins' },
          ],
        },
      };
    }

    // 3. Room Temperature / Climate / AC / Lights / Wi-Fi / Keycard / Amenities / Jacuzzi
    if (
      q.includes('temp') ||
      q.includes('temperature') ||
      q.includes('climate') ||
      q.includes('ac') ||
      q.includes('air conditioning') ||
      q.includes('cool') ||
      q.includes('warm') ||
      q.includes('light') ||
      q.includes('mood') ||
      q.includes('wifi') ||
      q.includes('internet') ||
      q.includes('keycard') ||
      q.includes('lock') ||
      q.includes('jacuzzi') ||
      q.includes('pool') ||
      q.includes('clean') ||
      q.includes('towel') ||
      q.includes('amenity')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `I have interfaced with your suite's IoT environmental controls. The temperature is calibrated to a crisp 21°C, the Himalayan Cedar air ionizer is active, and ambient lighting is set to 'Relaxation Gold'. Your AES-256 digital BLE keycard is armed on your phone for one-tap door and pool deck access. High-speed 500 Mbps Wi-Fi connects automatically.`,
        time: nowTime,
        actionCard: {
          type: 'CLIMATE',
          title: 'Suite Environment & IoT Sync',
          details: 'Target: 21°C • Lighting: Soft Amber Relaxation • Smart Lock: AES-256 Armed',
          badge: 'SUITE OPTIMAL',
          metrics: [
            { label: 'Suite Temp', value: '21.0°C' },
            { label: 'Wi-Fi Speed', value: '500 Mbps' },
            { label: 'BLE Key', value: 'Active' },
          ],
        },
      };
    }

    // 4. 15-Minute SLA / Sentinel / Resolve / Issue / Delay / Complaint / Refund / Help
    if (
      q.includes('sla') ||
      q.includes('sentinel') ||
      q.includes('resolve') ||
      q.includes('issue') ||
      q.includes('problem') ||
      q.includes('delay') ||
      q.includes('complaint') ||
      q.includes('refund') ||
      q.includes('help') ||
      q.includes('emergency') ||
      q.includes('support') ||
      q.includes('manager') ||
      q.includes('priya')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `Under StaySphere's Guaranteed 15-Minute Proactive Resolution SLA, your journey is backed by automated sentinel monitoring. If any flight delay, room defect, or chauffeur transit issue occurs, Senior Relationship Manager Priya Sharma is alerted within 30 seconds. If an issue is not resolved within 15 minutes, automated escrow compensation is credited to your account.`,
        time: nowTime,
        actionCard: {
          type: 'RESOLVE',
          title: '15-Minute SLA Sentinel Monitoring',
          details: 'Assigned RM Lead: Priya Sharma • 100% Escrow Vault Guarantee • Automated Escalation Active',
          badge: '15:00 MIN SLA GUARANTEE',
          metrics: [
            { label: 'Response SLA', value: '< 15 Mins' },
            { label: 'Escrow Vault', value: '₹1,30,500 Protected' },
            { label: 'Direct Lead', value: 'Priya Sharma (RM)' },
          ],
        },
      };
    }

    // 5. Sightseeing / Tours / Excursions / Boat / Cruise / Safari / Activities
    if (
      q.includes('tour') ||
      q.includes('sightseeing') ||
      q.includes('excursion') ||
      q.includes('boat') ||
      q.includes('cruise') ||
      q.includes('yacht') ||
      q.includes('safari') ||
      q.includes('trek') ||
      q.includes('beach') ||
      q.includes('island') ||
      q.includes('activity') ||
      q.includes('activities') ||
      q.includes('things to do')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `We offer curated private excursions with dedicated chauffeur transfers:
• Goa: Private 32ft Sunset Speedboat Safari to Grand Island (₹3,200) & Fontainhas Latin Quarter Heritage Walk (₹1,500).
• Udaipur: Private Lake Pichola Solar Boat Cruise with Royal High Tea (₹4,500).
• Manali: Rohtang Pass 4x4 Mountain Snow Expedition in Defender (₹3,800).
• Mumbai: Gateway of India Private Sunset Yacht Sailing (₹5,500).
All excursions include private transfers and English/Hindi speaking guides.`,
        time: nowTime,
        actionCard: {
          type: 'SIGHTSEEING',
          title: 'Curated Sightseeing & Excursions',
          details: 'Private Chauffeur Pickup Included • English-speaking Guide • Instant Escrow Booking',
          badge: 'VIP EXPERIENCES AVAILABLE',
          metrics: [
            { label: 'Goa Speedboat', value: '₹3,200' },
            { label: 'Udaipur Solar Boat', value: '₹4,500' },
            { label: 'Manali 4x4 Trek', value: '₹3,800' },
          ],
        },
      };
    }

    // 6. Properties / Destinations / Homestay / Palace / Chalet / Where to stay
    if (
      q.includes('hotel') ||
      q.includes('resort') ||
      q.includes('homestay') ||
      q.includes('villa') ||
      q.includes('palace') ||
      q.includes('chalet') ||
      q.includes('apartment') ||
      q.includes('property') ||
      q.includes('properties') ||
      q.includes('stay') ||
      q.includes('goa') ||
      q.includes('jaipur') ||
      q.includes('udaipur') ||
      q.includes('manali') ||
      q.includes('mumbai') ||
      q.includes('kerala') ||
      q.includes('coorg') ||
      q.includes('where')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `StaySphere curates certified properties across three distinct tiers:
1. Signature Luxe (₹36k–₹65k/nt): The Vana Azure Ocean Villa (Goa), Royal Lake Pichola Palace (Udaipur), Alpine Snow Peak Chalet (Manali), Sovereign Horizon Penthouse (Mumbai).
2. Premium Select (₹7.5k–₹10.5k/nt): The Coastal Courtyard Boutique Hotel (Goa), Pine Ridge Valley Resort (Manali).
3. Verified Homestays (₹2.2k–₹4.2k/nt): Royal Rajput Heritage Haveli (Jaipur), Coconut Palm Riverside Cottage (Goa).
Every stay includes verified 84-point audit scores, flight-tracked pickups, and escrow payment protection.`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'StaySphere Curated Property Catalog',
          details: 'All tiers include 84-point cleanliness certification and flight-tracked airport chauffeur coordination',
          badge: 'VERIFIED 99.4%+ TRUST',
          metrics: [
            { label: 'Luxe Tier', value: '₹36k - ₹65k' },
            { label: 'Premium Tier', value: '₹7.5k - ₹10.5k' },
            { label: 'Homestay Tier', value: '₹2.2k - ₹4.2k' },
          ],
        },
      };
    }

    // 7. Pricing / Costs / Promo Codes / Coupons / Discounts / Bills
    if (
      q.includes('price') ||
      q.includes('cost') ||
      q.includes('bill') ||
      q.includes('promo') ||
      q.includes('coupon') ||
      q.includes('discount') ||
      q.includes('offer') ||
      q.includes('code') ||
      q.includes('cheap') ||
      q.includes('gst') ||
      q.includes('staysphere2026') ||
      q.includes('monsoon20') ||
      q.includes('maybachfree')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `StaySphere provides transparent, unified journey billing:
• Active Coupon Codes:
  - 'STAYSPHERE2026': 10% Off your entire unified stay & travel booking.
  - 'MONSOON20': 20% Seasonal Off on luxury villas in Goa & Udaipur.
  - 'MAYBACHFREE': 15% Off with complimentary Mercedes-Maybach airport upgrade.
• Unified Bill: Includes Stay + Airport Transit + Sightseeing Tours + 12% GST, held 100% securely in the StaySphere Escrow Vault until verified check-in.`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'Active Promo Codes & Transparent Billing',
          details: 'Apply during Step 2 of booking for instant discount redemption on total escrow payment',
          badge: 'UP TO 20% OFF ACTIVE',
          metrics: [
            { label: 'STAYSPHERE2026', value: '10% Off' },
            { label: 'MONSOON20', value: '20% Off' },
            { label: 'MAYBACHFREE', value: '15% Off + Chauffeur' },
          ],
        },
      };
    }

    // 8. Cancellations / Refunds / Check-In / Check-Out Policies
    if (
      q.includes('cancel') ||
      q.includes('cancellation') ||
      q.includes('policy') ||
      q.includes('checkin') ||
      q.includes('check-in') ||
      q.includes('checkout') ||
      q.includes('check-out') ||
      q.includes('early') ||
      q.includes('late') ||
      q.includes('timing') ||
      q.includes('rules')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `Key Policies for StaySphere Guests:
• Check-In: 14:00 PM (Early check-in from 10:00 AM accommodated complimentary based on villa readiness).
• Check-Out: 11:00 AM (Late checkout up to 16:00 PM available for Sovereign members).
• Cancellation & Refund: 100% full refund credited instantly from Escrow Vault if cancelled up to 48 hours before check-in.
• Flight Delays: Zero cancellation or waiting penalty. Your chauffeur and villa butler hold your reservation regardless of flight arrival time.`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'Guest Policies & Refund Guarantee',
          details: 'Zero cancellation penalty on flight delays • 48-hour free cancellation with instant Escrow refund',
          badge: '100% ESCROW PROTECTED',
          metrics: [
            { label: 'Check-In', value: '14:00 PM' },
            { label: 'Check-Out', value: '11:00 AM' },
            { label: 'Free Cancel', value: 'Up to 48h' },
          ],
        },
      };
    }

    // 9. Loyalty / Membership / Sovereign Club / Points
    if (
      q.includes('loyalty') ||
      q.includes('point') ||
      q.includes('points') ||
      q.includes('sovereign') ||
      q.includes('club') ||
      q.includes('member') ||
      q.includes('membership') ||
      q.includes('tier') ||
      q.includes('black') ||
      q.includes('gold') ||
      q.includes('silver') ||
      q.includes('reward') ||
      q.includes('vip')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `The StaySphere Sovereign Club rewards frequent luxury travelers:
• Sovereign Black Tier (10,000+ pts): Dedicated 24/7 personal butler, guaranteed complimentary Maybach upgrades, private wine cellar access, and VIP 15-minute priority SLA.
• Gold Prestige Tier (3,000+ pts): Complimentary daily gourmet breakfast, priority early check-in, and 10% dining privileges.
• Silver Classic Tier: Welcome perks & automatic points earning (10 pts per ₹100 spent). Points can be redeemed for stay discounts or complimentary chauffeur legs.`,
        time: nowTime,
        actionCard: {
          type: 'INFO',
          title: 'StaySphere Sovereign Loyalty Club',
          details: 'Earn points across stays, mobility transit, and curated private excursions',
          badge: 'SOVEREIGN CLUB PERKS',
          metrics: [
            { label: 'Black Tier', value: '10,000+ pts' },
            { label: 'Gold Tier', value: '3,000+ pts' },
            { label: 'Earning Rate', value: '10 pts / ₹100' },
          ],
        },
      };
    }

    // 10. Human Contact / Phone / Agent / Direct Support
    if (
      q.includes('human') ||
      q.includes('person') ||
      q.includes('phone') ||
      q.includes('call') ||
      q.includes('number') ||
      q.includes('agent') ||
      q.includes('contact') ||
      q.includes('speak') ||
      q.includes('representative') ||
      q.includes('talk')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `You can reach our 24/7 Human Concierge Desk directly:
• Sovereign Hotline: +91 800-STAY-SPHERE (+91 800 782 9774)
• Senior Relationship Manager on Duty: Priya Sharma (+91 98200 44921)
• In-Suite Butler Intercom: Press '0' from your suite phone or tap the Proactive Resolve Sentinel button below for an instant 15-minute SLA dispatch.`,
        time: nowTime,
        actionCard: {
          type: 'RESOLVE',
          title: '24/7 Human Concierge & Duty Manager',
          details: 'Direct hotline: +91 800-STAY-SPHERE • Senior RM Priya Sharma actively assigned',
          badge: '24/7 HUMAN DESK LIVE',
          metrics: [
            { label: 'Toll-Free', value: '+91 800-782-9774' },
            { label: 'Duty RM', value: 'Priya Sharma' },
            { label: 'SLA Dispatch', value: 'Instant' },
          ],
        },
      };
    }

    // 11. Greetings & Courtesy
    if (
      q.includes('hello') ||
      q.includes('hi') ||
      q.includes('hey') ||
      q.includes('namaste') ||
      q.includes('good morning') ||
      q.includes('good afternoon') ||
      q.includes('good evening') ||
      q.includes('who are you') ||
      q.includes('what can you do') ||
      q.includes('thank') ||
      q.includes('thanks')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `Namaste! It is an absolute pleasure to assist you. I am your StaySphere Sovereign Concierge & In-Suite AI Butler. I can help you with:
1. Chauffeur & Flight Telemetry (Maybach/Defender airport pickup & live GPS tracking)
2. 24/7 In-Suite Dining (Dispatched hot from Executive Chef Raghav)
3. Smart Room IoT Controls (Calibrating 21°C suite temperature & ambient moods)
4. Curated Sightseeing (Private speedboats, heritage tours, and snow treks)
5. 15-Minute Guaranteed Proactive Resolution SLA
What would you like to explore or arrange?`,
        time: nowTime,
      };
    }

    // 12. Smart Fallback with Contextual Assistance
    return {
      id: `bot-${Date.now()}`,
      sender: 'assistant',
      text: `Thank you for your question regarding "${query}". I am actively coordinating with your chauffeur Gurpreet Singh, Executive Chef Raghav, and Senior Relationship Manager Priya Sharma. Whether you need transit updates, suite dining, temperature adjustments, local sightseeing advice, or booking details, please feel free to ask!`,
      time: nowTime,
      actionCard: {
        type: 'INFO',
        title: 'Sovereign Concierge Assistance',
        details: 'Ask about: Chauffeur ETA • In-Suite Dining • Suite Climate (21°C) • Sightseeing Tours • 15-Min SLA Guarantee',
        badge: 'CONCIERGE ON STANDBY',
      },
    };
  };

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
      const botResponse = generateGuestResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const QUICK_PROMPTS = [
    { label: '🚗 Chauffeur Status', query: 'Where is my airport pickup chauffeur right now?' },
    { label: '🍽️ Order In-Suite Dining', query: 'Order Fresh Coastal Seafood dinner to Villa 101' },
    { label: '❄️ Set Climate to 21°C', query: 'Set suite temperature to 21 degrees Celsius' },
    { label: '🛡️ 15-Min Proactive SLA', query: 'How does the 15-minute Proactive Resolve SLA work?' },
    { label: '🛥️ Curated Sightseeing', query: 'Suggest top curated sightseeing excursions for Goa' },
    { label: '🏨 Show Hotels & Homestays', query: 'What properties and homestays do you offer in Goa and Jaipur?' },
    { label: '🎟️ Active Promo Codes', query: 'What promo codes and discounts are available?' },
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
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-line ${
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
                                  isPearl ? 'text-[#0B3D91]' : 'text-[#00D2C4]'
                                }`}
                              >
                                {met.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.actionCard.type === 'RESOLVE' && onOpenResolve && (
                        <button
                          type="button"
                          onClick={() => onOpenResolve('GENERAL_INQUIRY')}
                          className="w-full py-1.5 rounded-lg bg-[#FF8A3D] text-[#001428] font-bold text-xs flex items-center justify-center gap-1.5 mt-1 cursor-pointer hover:brightness-110 transition-all"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Open Full Proactive SLA Ticket (15m Clock)</span>
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
