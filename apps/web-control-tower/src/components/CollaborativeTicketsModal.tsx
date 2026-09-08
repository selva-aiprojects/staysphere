import { useState } from 'react';
import {
  X,
  Send,
  Clock,
  CheckCircle2,
  Building2,
  Car,
  Users,
  ShieldCheck,
  Plus,
} from 'lucide-react';

export interface CollaborativeTicket {
  id: string;
  ticketNumber: string;
  title: string;
  category: 'PROPERTY_HOST' | 'TRAVEL_FLEET' | 'CHANNEL_PARTNER' | 'GUEST_ESCALATION';
  partnerName: string;
  partnerRole: string;
  assignedStaff: string;
  assignedRole: string;
  priority: 'P0_CRITICAL' | 'P1_HIGH' | 'P2_NORMAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED';
  slaMinutesRemaining: number;
  createdAt: string;
  messages: {
    id: string;
    sender: string;
    role: string;
    avatar: string;
    isStaff: boolean;
    timestamp: string;
    text: string;
    actionBadge?: string;
  }[];
}

interface CollaborativeTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: CollaborativeTicket[];
  onUpdateTicket: (updated: CollaborativeTicket) => void;
  onCreateTicket?: (newTicket: CollaborativeTicket) => void;
  currentUserRole?: string;
  currentUserName?: string;
}

export function CollaborativeTicketsModal({
  isOpen,
  onClose,
  tickets,
  onUpdateTicket,
  onCreateTicket,
  currentUserRole = 'Senior Relationship Manager',
  currentUserName = 'Vikramaditya Singh',
}: CollaborativeTicketsModalProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [replyText, setReplyText] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // New Ticket Form State
  const [newTicketTitle, setNewTicketTitle] = useState<string>('');
  const [newTicketCategory, setNewTicketCategory] = useState<'PROPERTY_HOST' | 'TRAVEL_FLEET' | 'CHANNEL_PARTNER' | 'GUEST_ESCALATION'>('PROPERTY_HOST');
  const [newTicketPriority, setNewTicketPriority] = useState<'P0_CRITICAL' | 'P1_HIGH' | 'P2_NORMAL'>('P1_HIGH');
  const [newTicketMessage, setNewTicketMessage] = useState<string>('');

  if (!isOpen) return null;

  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const filteredTickets = tickets.filter((t) => {
    if (filterCategory === 'ALL') return true;
    return t.category === filterCategory;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUserName,
      role: currentUserRole,
      avatar: currentUserName.split(' ').map((n) => n[0]).join('').slice(0, 2),
      isStaff: true,
      timestamp: 'Just Now',
      text: replyText.trim(),
    };

    const updated: CollaborativeTicket = {
      ...activeTicket,
      status: activeTicket.status === 'OPEN' ? 'IN_PROGRESS' : activeTicket.status,
      messages: [...activeTicket.messages, newMessage],
    };

    onUpdateTicket(updated);
    setReplyText('');
  };

  const handleQuickAction = (actionText: string) => {
    if (!activeTicket) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUserName,
      role: currentUserRole,
      avatar: currentUserName.split(' ').map((n) => n[0]).join('').slice(0, 2),
      isStaff: true,
      timestamp: 'Just Now',
      text: `Operational update executed: ${actionText}`,
      actionBadge: actionText,
    };

    const updated: CollaborativeTicket = {
      ...activeTicket,
      status: 'RESOLVED',
      messages: [...activeTicket.messages, newMessage],
    };

    onUpdateTicket(updated);
  };

  const handleCreateNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim() || !newTicketMessage.trim()) return;

    const newTicket: CollaborativeTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `SS-OPS-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTicketTitle,
      category: newTicketCategory,
      partnerName: currentUserName,
      partnerRole: currentUserRole,
      assignedStaff: 'Central Operations Team',
      assignedRole: 'Tier 1 Resolution Desk',
      priority: newTicketPriority,
      status: 'OPEN',
      slaMinutesRemaining: newTicketPriority === 'P0_CRITICAL' ? 15 : 120,
      createdAt: 'Just Now',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: currentUserName,
          role: currentUserRole,
          avatar: currentUserName.split(' ').map((n) => n[0]).join('').slice(0, 2),
          isStaff: false,
          timestamp: 'Just Now',
          text: newTicketMessage,
        },
      ],
    };

    if (onCreateTicket) onCreateTicket(newTicket);
    setSelectedTicketId(newTicket.id);
    setIsCreatingNew(false);
    setNewTicketTitle('');
    setNewTicketMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#001E36] border border-[#00A9A5]/40 rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="px-6 py-4 bg-[#001428] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00A9A5] to-[#3CCF91] flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">StaySphere Partner & Staff Engagement Hub</h2>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00A9A5] border border-[#00A9A5]/30">
                  Live Operations Desk
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Collaborative ticketing, real-time follow-ups & SLA resolution between Property Hosts, Travel Desks, Channel Partners & StaySphere Staff
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCreatingNew(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Raise Operational Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Ticket List */}
          <div className="w-80 md:w-96 border-r border-white/10 flex flex-col bg-[#001428]/60 shrink-0">
            {/* Filter Tabs */}
            <div className="p-3 border-b border-white/10 flex gap-1 overflow-x-auto no-scrollbar text-[11px] font-bold pb-2">
              {[
                { key: 'ALL', label: 'All Tickets' },
                { key: 'PROPERTY_HOST', label: 'Hotels/Resorts' },
                { key: 'TRAVEL_FLEET', label: 'Travel Desk' },
                { key: 'CHANNEL_PARTNER', label: 'Channel B2B' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterCategory(tab.key)}
                  className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    filterCategory === tab.key
                      ? 'bg-[#00A9A5] text-white shadow'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {filteredTickets.map((ticket) => {
                const isSelected = activeTicket?.id === ticket.id;
                return (
                  <button
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicketId(ticket.id);
                      setIsCreatingNew(false);
                    }}
                    className={`w-full text-left p-4 transition-all flex flex-col gap-2 cursor-pointer ${
                      isSelected ? 'bg-[#002B4D] border-l-4 border-[#00A9A5]' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#00A9A5] whitespace-nowrap shrink-0">{ticket.ticketNumber}</span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                          ticket.priority === 'P0_CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : ticket.priority === 'P1_HIGH'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {ticket.priority.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white line-clamp-1">{ticket.title}</div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 gap-2">
                      <span className="flex items-center gap-1.5 truncate">
                        {ticket.category === 'PROPERTY_HOST' ? (
                          <Building2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        ) : ticket.category === 'TRAVEL_FLEET' ? (
                          <Car className="w-3 h-3 text-amber-400 shrink-0" />
                        ) : (
                          <Users className="w-3 h-3 text-emerald-400 shrink-0" />
                        )}
                        <span className="truncate">{ticket.partnerName}</span>
                      </span>

                      <span
                        className={`text-[10px] font-bold whitespace-nowrap shrink-0 ${
                          ticket.status === 'RESOLVED'
                            ? 'text-emerald-400'
                            : ticket.status === 'IN_PROGRESS'
                            ? 'text-cyan-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Thread & Actions OR Create Form */}
          <div className="flex-1 flex flex-col bg-[#001E36]">
            {isCreatingNew ? (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-xl mx-auto bg-[#001428] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-base font-bold text-white mb-1">Create New Operational / Support Ticket</h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Connect with your dedicated StaySphere Relationship Manager, Fleet Coordinator, or Finance Custodian.
                  </p>

                  <form onSubmit={handleCreateNewTicketSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Ticket Subject / Scope</label>
                      <input
                        type="text"
                        value={newTicketTitle}
                        onChange={(e) => setNewTicketTitle(e.target.value)}
                        placeholder="e.g. VIP Early Check-In Approval / Maybach Re-route to Private Hangar"
                        className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A9A5]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
                        <select
                          value={newTicketCategory}
                          onChange={(e) => setNewTicketCategory(e.target.value as any)}
                          className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                        >
                          <option value="PROPERTY_HOST">Hotel & Resort Partner</option>
                          <option value="TRAVEL_FLEET">Travel Desk & Chauffeur Fleet</option>
                          <option value="CHANNEL_PARTNER">Channel Partner & Corporate B2B</option>
                          <option value="GUEST_ESCALATION">Guest Journey Escalation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">Priority SLA</label>
                        <select
                          value={newTicketPriority}
                          onChange={(e) => setNewTicketPriority(e.target.value as any)}
                          className="w-full bg-[#002B4D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00A9A5]"
                        >
                          <option value="P0_CRITICAL">P0 Critical (15-min Response)</option>
                          <option value="P1_HIGH">P1 High (2-hr Resolution)</option>
                          <option value="P2_NORMAL">P2 Standard Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Detailed Operational Context</label>
                      <textarea
                        rows={4}
                        value={newTicketMessage}
                        onChange={(e) => setNewTicketMessage(e.target.value)}
                        placeholder="Describe the operational challenge, partner requirement, or guest request..."
                        className="w-full bg-[#002B4D] border border-white/15 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A9A5]"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCreatingNew(false)}
                        className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold hover:bg-white/10"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110"
                      >
                        Submit Operational Ticket
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : activeTicket ? (
              <>
                {/* Active Ticket Header */}
                <div className="p-4 bg-[#001428] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00A9A5]">{activeTicket.ticketNumber}</span>
                      <h3 className="text-sm font-bold text-white">{activeTicket.title}</h3>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                      <span>
                        Raised by: <strong className="text-slate-200">{activeTicket.partnerName}</strong> ({activeTicket.partnerRole})
                      </span>
                      <span>•</span>
                      <span>
                        Assigned RM: <strong className="text-[#3CCF91]">{activeTicket.assignedStaff}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#002B4D] border border-white/10 text-xs text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-[#00A9A5]" />
                      <span>SLA Timer: <strong>{activeTicket.slaMinutesRemaining} mins</strong></span>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        activeTicket.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {activeTicket.status}
                    </div>
                  </div>
                </div>

                {/* Quick Collaborative Actions Bar */}
                <div className="px-4 py-2 bg-[#001020] border-b border-white/10 flex items-center gap-2 overflow-x-auto text-[11px]">
                  <span className="text-slate-400 font-bold shrink-0">1-Click Operational Actions:</span>
                  <button
                    onClick={() => handleQuickAction('Early Escrow Payout Authorized')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-bold transition-all shrink-0"
                  >
                    ✓ Authorize Early Escrow Advance
                  </button>
                  <button
                    onClick={() => handleQuickAction('Rate Parity Synced to 100%')}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 font-bold transition-all shrink-0"
                  >
                    🔄 Auto-Sync Rate Parity
                  </button>
                  <button
                    onClick={() => handleQuickAction('VIP Maybach Assigned & Briefed')}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-bold transition-all shrink-0"
                  >
                    🚗 Brief Maybach Chauffeur
                  </button>
                </div>

                {/* Thread Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {activeTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-2xl ${msg.isStaff ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                          msg.isStaff
                            ? 'bg-gradient-to-br from-[#00A9A5] to-[#3CCF91]'
                            : 'bg-gradient-to-br from-amber-500 to-rose-500'
                        }`}
                      >
                        {msg.avatar}
                      </div>

                      <div className="flex flex-col">
                        <div className={`flex items-center gap-2 mb-1 ${msg.isStaff ? 'justify-end' : ''}`}>
                          <span className="text-xs font-bold text-white">{msg.sender}</span>
                          <span className="text-[10px] text-slate-400">({msg.role})</span>
                          <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                        </div>

                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                            msg.isStaff
                              ? 'bg-[#002B4D] border border-[#00A9A5]/30 text-slate-100 rounded-tr-none'
                              : 'bg-[#001428] border border-white/10 text-slate-200 rounded-tl-none'
                          }`}
                        >
                          {msg.text}

                          {msg.actionBadge && (
                            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-bold text-[#3CCF91]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>System Trigger: {msg.actionBadge}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Bar */}
                <form onSubmit={handleSendReply} className="p-4 bg-[#001428] border-t border-white/10 flex items-center gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Follow up as ${currentUserName} (${currentUserRole})...`}
                    className="flex-1 bg-[#002B4D] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A9A5]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Follow-up</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
                Select an operational ticket from the list or create a new one.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
