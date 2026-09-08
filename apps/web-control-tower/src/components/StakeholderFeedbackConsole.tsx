import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  Users,
  CheckCircle2,
  Send,
  Plus,
  Search,
  ThumbsUp,
  X,
  RefreshCw,
} from 'lucide-react';
import {
  StakeholderFeedbackRecord,
  ReviewerRole,
  FeedbackCategory,
  FeedbackSentiment
} from '@staysphere/domain-types';

interface StakeholderFeedbackConsoleProps {
  showToast: (msg: string) => void;
}

const INITIAL_FEEDBACK_DATA: StakeholderFeedbackRecord[] = [
  // 1. GUEST FEEDBACK
  {
    id: 'fb-gst-01',
    journeyReference: 'JN-SS-2026-9041',
    reviewerRole: 'GUEST',
    reviewerName: 'Vikram Malhotra',
    reviewerOrganization: 'Individual VIP Traveler',
    targetEntity: 'Azura Cliff Luxury Estates & Goa Maybach Fleet',
    category: 'STAY_QUALITY',
    overallRating: 5,
    subRatings: {
      stayScore: 5,
      transitScore: 5,
      resolutionScore: 5,
      platformSupportScore: 5,
    },
    sentiment: 'POSITIVE',
    comment: 'Flawless arrival. The flight sync was spot on—Chauffeur Gurpreet was waiting at Terminal 1 with chilled sparkling water. Suite 402 cliff view was breathtaking, and the digital NFC pass worked instantly.',
    status: 'PUBLISHED',
    createdAt: '2026-09-08T06:30:00Z',
  },
  {
    id: 'fb-gst-02',
    journeyReference: 'JN-SS-2026-5541',
    reviewerRole: 'GUEST',
    reviewerName: 'Rohan Mehta',
    reviewerOrganization: 'Individual VIP Traveler',
    targetEntity: 'Solang Valley Pine Chalet & Manali 4x4 Fleet',
    category: 'TRANSIT_PUNCTUALITY',
    overallRating: 4,
    subRatings: {
      stayScore: 5,
      transitScore: 3,
      resolutionScore: 5,
      platformSupportScore: 5,
    },
    sentiment: 'NEUTRAL',
    comment: 'The landslide detour caused a 22-minute delay in airport pickup, but StaySphere Resolve Sentinel automatically credited ₹3,000 to my account within 6 minutes and kept me updated. Exemplary proactive resolution.',
    status: 'ACTIONED_BY_RM',
    createdAt: '2026-09-08T07:45:00Z',
    actionTaken: 'Auto-credited ₹3,000 SLA compensation and upgraded dinner package',
    actionedBy: 'Siddharth Rao (Lead Transit RM)',
    actionedAt: '2026-09-08T07:50:00Z',
  },

  // 2. HOTEL PARTNER FEEDBACK
  {
    id: 'fb-htl-01',
    journeyReference: 'JN-SS-2026-9041',
    reviewerRole: 'HOTEL_PARTNER',
    reviewerName: 'Anil Deshmukh (GM & Managing Partner)',
    reviewerOrganization: 'Azura Cliff Luxury Estates, Goa',
    targetEntity: 'StaySphere Operations & Payment Custody',
    category: 'COMMISSION_SETTLEMENT',
    overallRating: 5,
    subRatings: {
      payoutSpeedScore: 5,
      platformSupportScore: 5,
    },
    sentiment: 'POSITIVE',
    comment: 'StaySphere has transformed our guest intake. The 2-hour post-checkin automated payout release to our HDFC Corporate Account settled ₹1,13,400 with zero delays. Direct rate parity sync prevents OTA conflicts.',
    status: 'PUBLISHED',
    createdAt: '2026-09-07T18:00:00Z',
  },
  {
    id: 'fb-htl-02',
    journeyReference: 'JN-SS-2026-7720',
    reviewerRole: 'HOTEL_PARTNER',
    reviewerName: 'Maharaj Ranjit Rathore',
    reviewerOrganization: 'The Royal Lake Palace, Udaipur',
    targetEntity: 'StaySphere Guest Quality & Concierge Bridge',
    category: 'GUEST_CONDUCT',
    overallRating: 5,
    subRatings: {
      payoutSpeedScore: 5,
      platformSupportScore: 5,
    },
    sentiment: 'POSITIVE',
    comment: 'Guest profile and dining preferences arrived 24 hours prior to check-in via HostSphere integration. The seamless coordination of the Solar Boat transfer made their arrival regal and effortless.',
    status: 'PUBLISHED',
    createdAt: '2026-09-06T14:30:00Z',
  },

  // 3. CHANNEL PARTNER FEEDBACK (B2B & Concierge Desks)
  {
    id: 'fb-chn-01',
    journeyReference: 'JN-SS-2026-4412',
    reviewerRole: 'CHANNEL_PARTNER',
    reviewerName: 'Priya Nambiar (Head of Luxury Concierge)',
    reviewerOrganization: 'American Express Centurion B2B Concierge',
    targetEntity: 'StaySphere Partner API & B2B Inventory Bridge',
    category: 'PLATFORM_SUPPORT',
    overallRating: 5,
    subRatings: {
      platformSupportScore: 5,
      payoutSpeedScore: 5,
    },
    sentiment: 'POSITIVE',
    comment: 'Our Centurion black-tier cardholders require zero friction. StaySphere Partner REST APIs let us bundle verified villas with private chauffeured mobility in a single atomic API call. Instant 15% B2B commission settlement is best-in-class.',
    status: 'PUBLISHED',
    createdAt: '2026-09-05T11:20:00Z',
  },
  {
    id: 'fb-chn-02',
    journeyReference: 'JN-SS-2026-3390',
    reviewerRole: 'CHANNEL_PARTNER',
    reviewerName: 'Rajesh Khanna (Director of Corporate Travel)',
    reviewerOrganization: 'Platinum Corporate Travel Agency',
    targetEntity: 'StaySphere Hotel Partner Responsiveness',
    category: 'COMMISSION_SETTLEMENT',
    overallRating: 4,
    subRatings: {
      platformSupportScore: 4,
      payoutSpeedScore: 4,
    },
    sentiment: 'POSITIVE',
    comment: 'Consolidated monthly commission reconciliation (₹68,500) was issued with full GST invoice breakdown. Looking forward to expanding our booking volume across the Mumbai sky residences inventory.',
    status: 'PUBLISHED',
    createdAt: '2026-09-04T16:00:00Z',
  },

  // 4. TRAVEL DESK / FLEET FEEDBACK
  {
    id: 'fb-trv-01',
    journeyReference: 'JN-SS-2026-9041',
    reviewerRole: 'TRAVEL_DESK',
    reviewerName: 'Vikas Rathore (Fleet Dispatcher Lead)',
    reviewerOrganization: 'Goa Elite Chauffeur Fleet',
    targetEntity: 'StaySphere Live Telematics & Gate Dispatch',
    category: 'TRANSIT_PUNCTUALITY',
    overallRating: 5,
    subRatings: {
      transitScore: 5,
      platformSupportScore: 5,
    },
    sentiment: 'POSITIVE',
    comment: 'Automated flight tracker alerted our driver 30 mins before touch-down at MOPA GOX. The guest came directly to Gate 4 and we had the vehicle pre-cooled. Payout for the transfer was credited promptly.',
    status: 'PUBLISHED',
    createdAt: '2026-09-08T09:10:00Z',
  },
];

export const StakeholderFeedbackConsole: React.FC<StakeholderFeedbackConsoleProps> = ({ showToast }) => {
  const [feedbackList, setFeedbackList] = useState<StakeholderFeedbackRecord[]>(INITIAL_FEEDBACK_DATA);
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // New feedback form
  const [newFeedback, setNewFeedback] = useState<Partial<StakeholderFeedbackRecord>>({
    reviewerRole: 'GUEST',
    reviewerName: '',
    reviewerOrganization: '',
    targetEntity: '',
    category: 'STAY_QUALITY',
    overallRating: 5,
    sentiment: 'POSITIVE',
    comment: '',
    journeyReference: 'JN-SS-2026-9041',
  });

  const filtered = feedbackList.filter((fb) => {
    if (selectedRole !== 'ALL' && fb.reviewerRole !== selectedRole) return false;
    if (selectedSentiment !== 'ALL' && fb.sentiment !== selectedSentiment) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        fb.reviewerName.toLowerCase().includes(q) ||
        fb.targetEntity.toLowerCase().includes(q) ||
        fb.comment.toLowerCase().includes(q) ||
        fb.journeyReference.toLowerCase().includes(q) ||
        (fb.reviewerOrganization && fb.reviewerOrganization.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleActionFeedback = (id: string, actionMsg: string) => {
    setFeedbackList((prev) =>
      prev.map((fb) =>
        fb.id === id
          ? {
              ...fb,
              status: 'ACTIONED_BY_RM' as const,
              actionTaken: actionMsg,
              actionedBy: 'Central Ops Desk Lead',
              actionedAt: new Date().toISOString(),
            }
          : fb
      )
    );
    showToast(`Feedback ${id} actioned and RM log updated.`);
  };

  const handleSubmitNewFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.reviewerName || !newFeedback.comment) {
      showToast('Please provide your name and review comments');
      return;
    }

    const created: StakeholderFeedbackRecord = {
      id: `fb-new-${Date.now()}`,
      journeyReference: newFeedback.journeyReference || 'JN-SS-2026-9041',
      reviewerRole: (newFeedback.reviewerRole as ReviewerRole) || 'GUEST',
      reviewerName: newFeedback.reviewerName,
      reviewerOrganization: newFeedback.reviewerOrganization || (newFeedback.reviewerRole === 'GUEST' ? 'Verified Guest' : 'Partner Org'),
      targetEntity: newFeedback.targetEntity || 'StaySphere Platform & Partner Network',
      category: (newFeedback.category as FeedbackCategory) || 'STAY_QUALITY',
      overallRating: Number(newFeedback.overallRating) || 5,
      sentiment: (newFeedback.sentiment as FeedbackSentiment) || 'POSITIVE',
      comment: newFeedback.comment,
      status: 'PUBLISHED',
      createdAt: new Date().toISOString(),
    };

    setFeedbackList([created, ...feedbackList]);
    setShowSubmitModal(false);
    showToast(`Feedback from ${created.reviewerName} (${created.reviewerRole}) published!`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#001428] via-[#002B4D] to-[#0A4D68] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3CCF91]/20 border border-[#3CCF91]/40 text-[#3CCF91] text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              360° Multi-Stakeholder Reputation
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Multi-Party Feedback & Ecosystem Ratings
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Transparent review collection across <strong>Guests</strong>, <strong>Hotels & Resorts</strong>, <strong>B2B Channel Partners</strong>, and <strong>Travel Desks</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                showToast('Dynamic Trust Algorithm executed: Recalculated 360° indices across all active partners.');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4 text-[#00A9A5]" />
              <span>Recalculate Trust Index</span>
            </button>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#00A9A5]/25 flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record 360° Feedback</span>
            </button>
          </div>
        </div>

        {/* 360° Multi-Directional Trust Engine Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-white/10 mt-6">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">1. Hotel Trust Score</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 uppercase">PREMIER</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <strong className="text-xl font-black text-white">98.4%</strong>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">+0.4% this month</span>
            </div>
            <p className="text-[10px] text-slate-400">Enables: 2-Hour Escrow Payouts & Top Search Placement</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">2. Fleet Reliability</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-cyan-500/20 text-cyan-300 uppercase">TIER 1</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <strong className="text-xl font-black text-[#00D2C4]">99.2%</strong>
              <span className="text-[10px] text-slate-400 font-mono">0 No-shows</span>
            </div>
            <p className="text-[10px] text-slate-400">Enables: Flight Delay Priority Auto-Dispatches</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">3. Guest Conduct Index</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500/20 text-amber-300 uppercase">SOVEREIGN</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <strong className="text-xl font-black text-[#FFC857]">99.8%</strong>
              <span className="text-[10px] text-amber-300 font-mono font-bold">5.0★ Behavior</span>
            </div>
            <p className="text-[10px] text-slate-400">Reviewed by Hotels & Drivers • Zero Deposit Waiver</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">4. Channel Partner NPS</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 uppercase">B2B TOP</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <strong className="text-xl font-black text-[#3CCF91]">+64 NPS</strong>
              <span className="text-[10px] text-slate-400 font-mono">Amex Centurion</span>
            </div>
            <p className="text-[10px] text-slate-400">Atomic 3-in-1 API satisfaction & settlement speed</p>
          </div>
        </div>
      </div>

      {/* Stakeholder Filters & Search */}
      <div className="p-4 rounded-xl bg-[#001E36] border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-1 whitespace-nowrap shrink-0">
            <Users className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" /> Reviewer:
          </span>
          {[
            { id: 'ALL', label: 'All Parties (360°)' },
            { id: 'GUEST', label: '👤 Guests' },
            { id: 'HOTEL_PARTNER', label: '🏨 Hotels & Resorts' },
            { id: 'CHANNEL_PARTNER', label: '🤝 Channel Partners (B2B)' },
            { id: 'TRAVEL_DESK', label: '🚗 Travel Desks & Fleets' },
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                selectedRole === role.id
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {role.label}
            </button>
          ))}

          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 ml-3 mr-1 whitespace-nowrap shrink-0">
            Sentiment:
          </span>
          {[
            { id: 'ALL', label: 'All' },
            { id: 'POSITIVE', label: '👍 Positive' },
            { id: 'NEUTRAL', label: '⚖️ Neutral' },
          ].map((sent) => (
            <button
              key={sent.id}
              onClick={() => setSelectedSentiment(sent.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                selectedSentiment === sent.id
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {sent.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviews, reviewer, hotel, ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9A5]"
          />
        </div>
      </div>

      {/* Reviews Feed */}
      <div className="space-y-4">
        {filtered.map((fb) => {
          const isGuest = fb.reviewerRole === 'GUEST';
          const isHotel = fb.reviewerRole === 'HOTEL_PARTNER';
          const isChannel = fb.reviewerRole === 'CHANNEL_PARTNER';
          const isTravel = fb.reviewerRole === 'TRAVEL_DESK';

          return (
            <div
              key={fb.id}
              className="p-6 rounded-2xl bg-[#001D33] border border-white/10 hover:border-[#00A9A5]/50 transition shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow shrink-0 ${
                      isGuest
                        ? 'bg-gradient-to-br from-blue-600 to-cyan-500'
                        : isHotel
                        ? 'bg-gradient-to-br from-amber-600 to-orange-500'
                        : isChannel
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-500'
                        : isTravel
                        ? 'bg-gradient-to-br from-purple-600 to-indigo-500'
                        : 'bg-gradient-to-br from-slate-600 to-slate-500'
                    }`}
                  >
                    {isGuest ? '👤' : isHotel ? '🏨' : isChannel ? '🤝' : '🚗'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-white text-sm">{fb.reviewerName}</strong>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                          isGuest
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : isHotel
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : isChannel
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        }`}
                      >
                        {fb.reviewerRole.replace(/_/g, ' ')}
                      </span>
                      {fb.reviewerOrganization && (
                        <span className="text-xs text-slate-400">• {fb.reviewerOrganization}</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Regarding: <strong className="text-slate-200">{fb.targetEntity}</strong> • Journey Ref:{' '}
                      <span className="font-mono text-[#00D2C4] font-bold whitespace-nowrap">{fb.journeyReference}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-lg shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 shrink-0 ${
                          i < fb.overallRating ? 'fill-amber-300 text-amber-300' : 'text-slate-600'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-black text-amber-300 ml-1 whitespace-nowrap">{fb.overallRating}.0</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase whitespace-nowrap shrink-0 ${
                      fb.status === 'PUBLISHED'
                        ? 'bg-[#3CCF91]/20 text-[#3CCF91]'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {fb.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Review Comment Text */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                "{fb.comment}"
              </p>

              {/* Action Log if Present */}
              {fb.actionTaken && (
                <div className="p-3 rounded-xl bg-[#002844] border border-[#00A9A5]/30 text-xs flex items-center justify-between gap-3 text-[#3CCF91]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span><strong>RM Action Taken:</strong> {fb.actionTaken} ({fb.actionedBy})</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{new Date(fb.actionedAt || '').toLocaleDateString()}</span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="text-[11px] font-mono">Logged: {new Date(fb.createdAt).toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  {!fb.actionTaken && (
                    <button
                      onClick={() => handleActionFeedback(fb.id, 'RM verified & logged praise into partner profile')}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3 text-[#3CCF91]" />
                      Acknowledge & Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Multi-Stakeholder Feedback Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#001D33] border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3CCF91]/20 text-[#3CCF91] text-xs font-bold">
                <Plus className="w-3.5 h-3.5" /> 360° Feedback Entry
              </div>
              <h2 className="text-2xl font-black text-white">Record Multi-Stakeholder Review</h2>
              <p className="text-xs text-slate-300">
                Log feedback from a Guest, Hotel Host, Channel Partner, or Travel Desk.
              </p>
            </div>

            <form onSubmit={handleSubmitNewFeedback} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Reviewer Party *</label>
                  <select
                    value={newFeedback.reviewerRole}
                    onChange={(e) => setNewFeedback({ ...newFeedback, reviewerRole: e.target.value as ReviewerRole })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  >
                    <option value="GUEST">👤 Guest (Customer)</option>
                    <option value="HOTEL_PARTNER">🏨 Hotel / Property Partner</option>
                    <option value="CHANNEL_PARTNER">🤝 Channel Partner (B2B Travel Desk)</option>
                    <option value="TRAVEL_DESK">🚗 Travel Desk / Chauffeur Fleet</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Reviewer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania / Anil Deshmukh"
                    value={newFeedback.reviewerName}
                    onChange={(e) => setNewFeedback({ ...newFeedback, reviewerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Organization / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Amex Centurion / The Vana Azure GM"
                    value={newFeedback.reviewerOrganization}
                    onChange={(e) => setNewFeedback({ ...newFeedback, reviewerOrganization: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Target Entity Being Reviewed *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Azura Cliff Villa / Goa Chauffeur / StaySphere APIs"
                    value={newFeedback.targetEntity}
                    onChange={(e) => setNewFeedback({ ...newFeedback, targetEntity: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Category *</label>
                  <select
                    value={newFeedback.category}
                    onChange={(e) => setNewFeedback({ ...newFeedback, category: e.target.value as FeedbackCategory })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  >
                    <option value="STAY_QUALITY">Stay & Room Quality (Guest Review)</option>
                    <option value="TRANSIT_PUNCTUALITY">Transit Punctuality & Driver (Guest Review)</option>
                    <option value="GUEST_CONDUCT_CARE">Guest Conduct & Property Care (Partner Review of Guest)</option>
                    <option value="EXCURSION_EXPERIENCE">Local Excursion & Sightseeing</option>
                    <option value="RESOLVE_SLA">Resolve Desk SLA & Support</option>
                    <option value="COMMISSION_SETTLEMENT">Commission & Payout Settlement</option>
                    <option value="PLATFORM_SUPPORT">Platform & API Integration</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Overall Rating (1 - 5 Stars) *</label>
                  <select
                    value={newFeedback.overallRating}
                    onChange={(e) => setNewFeedback({ ...newFeedback, overallRating: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5.0 - Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ (4.0 - Good)</option>
                    <option value={3}>⭐⭐⭐ (3.0 - Neutral)</option>
                    <option value={2}>⭐⭐ (2.0 - Poor)</option>
                    <option value={1}>⭐ (1.0 - Critical Friction)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Feedback Comments & Observations *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed feedback regarding the experience, punctuality, coordination, and support..."
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-[#00A9A5] leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428] font-black shadow-lg hover:brightness-110 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish 360° Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
