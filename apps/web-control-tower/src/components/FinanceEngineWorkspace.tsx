import React, { useState } from 'react';
import {
  RefreshCw,
  Receipt,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Percent,
  Check,
  AlertCircle,
  DollarSign,
  Lock,
  Unlock,
  ShieldAlert,
  CheckCheck,
} from 'lucide-react';

interface FinanceEngineWorkspaceProps {
  onOpenReceipt?: (payment: any) => void;
}

export const FinanceEngineWorkspace: React.FC<FinanceEngineWorkspaceProps> = () => {
  const [activeTab, setActiveTab] = useState<
    'ledger' | 'refunds' | 'commissions' | 'reconciliation' | 'settlements'
  >('refunds');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. PAYMENT SPLIT LEDGER
  const [ledgerEntries] = useState([
    {
      id: 'LED-1091',
      journeyRef: 'JRN-2026-GOA-084',
      guestName: 'Vikram & Radhika Malhotra',
      totalCustomerPaid: 164500,
      hotelPayable: 132600, // 156,000 gross - 15% comm
      transportPayable: 7480, // 8,500 gross - 12% comm
      platformGrossCommission: 24420,
      gstCollected: 29610,
      escrowStatus: 'PARTIALLY_RELEASED',
      createdAt: 'Today, 10:15 AM',
    },
    {
      id: 'LED-1092',
      journeyRef: 'JRN-2026-UDR-112',
      guestName: 'Sunil & Kavita Mittal Retinue',
      totalCustomerPaid: 480000,
      hotelPayable: 408000, // 480,000 gross - 15% comm
      transportPayable: 0,
      platformGrossCommission: 72000,
      gstCollected: 86400,
      escrowStatus: 'ARMED_FOR_RELEASE',
      createdAt: 'Today, 11:30 AM',
    },
    {
      id: 'LED-1093',
      journeyRef: 'JRN-2026-SHM-045',
      guestName: 'Dr. Siddharth Sen',
      totalCustomerPaid: 75000,
      hotelPayable: 51000,
      transportPayable: 12760,
      platformGrossCommission: 11240,
      gstCollected: 13500,
      escrowStatus: 'HELD_DISPUTE_RESERVE',
      createdAt: 'Yesterday, 16:40 PM',
    },
  ]);

  // MILESTONE ESCROW DATA FOR MULTI-PARTY SPLIT SETTLEMENT
  const [milestoneJourneys, setMilestoneJourneys] = useState([
    {
      id: 'ESC-JRN-GOA-084',
      journeyRef: 'JRN-2026-GOA-084',
      guestName: 'Vikram & Radhika Malhotra',
      totalPaid: 164500,
      currency: 'INR',
      overallStatus: 'PARTIALLY_DISBURSED',
      milestones: [
        {
          id: 'M1-TRV',
          beneficiary: 'Gurpreet Singh (Goa Maybach Fleet)',
          role: 'MOBILITY_PARTNER',
          component: 'Airport VIP Transfer (GOX → Estate)',
          amount: 7480,
          trigger: 'OTP Verified Trip Completion',
          payoutWindow: 'Released 2h post-trip completion',
          status: 'RELEASED' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'Today, 14:15 (Settled)',
        },
        {
          id: 'M2-HTL-BASE',
          beneficiary: 'The Vana Azure Ocean Estate',
          role: 'HOTEL_PARTNER',
          component: 'Villa 101 — 70% Base Stay Payout',
          amount: 92820,
          trigger: 'Front Desk Check-in & Keycard Arming',
          payoutWindow: 'Automatic 2h post-check-in verification window',
          status: 'TRIGGERED_LOCKED' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'Countdown: 48 mins remaining',
        },
        {
          id: 'M3-HTL-BAL',
          beneficiary: 'The Vana Azure Ocean Estate',
          role: 'HOTEL_PARTNER',
          component: 'Villa 101 — 30% Balance & Room Clearance',
          amount: 39780,
          trigger: 'Guest Checkout & Zero Incident Inspection',
          payoutWindow: '24h post-checkout clearance',
          status: 'PENDING_EVENT' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'Pending Sep 11 Checkout',
        },
      ],
    },
    {
      id: 'ESC-JRN-UDR-112',
      journeyRef: 'JRN-2026-UDR-112',
      guestName: 'Sunil & Kavita Mittal Retinue',
      totalPaid: 480000,
      currency: 'INR',
      overallStatus: 'FUNDS_HELD',
      milestones: [
        {
          id: 'M1-BOAT',
          beneficiary: 'Royal Pichola Solar Boat Transport',
          role: 'MOBILITY_PARTNER',
          component: 'Palace Water Arrival Jetty Transfer',
          amount: 21120,
          trigger: 'Jetty Arrival Handshake',
          payoutWindow: '2h post-arrival',
          status: 'TRIGGERED_LOCKED' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'Countdown: 1 hr 12 mins left',
        },
        {
          id: 'M2-HTL-BASE',
          beneficiary: 'Maharaja Pichola Heritage Palace',
          role: 'HOTEL_PARTNER',
          component: '4 Royal Suites — 70% Base Stay Payout',
          amount: 285600,
          trigger: 'Palace Concierge Check-in Verification',
          payoutWindow: '2h post-check-in verification',
          status: 'PENDING_EVENT' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'Awaiting Check-in',
        },
        {
          id: 'M3-HTL-BAL',
          beneficiary: 'Maharaja Pichola Heritage Palace',
          role: 'HOTEL_PARTNER',
          component: '4 Royal Suites — 30% Balance Payout',
          amount: 122400,
          trigger: 'Checkout Audit & Retinue Minibar Clearance',
          payoutWindow: '24h post-checkout',
          status: 'PENDING_EVENT' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'Awaiting Checkout',
        },
      ],
    },
    {
      id: 'ESC-JRN-SHM-045',
      journeyRef: 'JRN-2026-SHM-045',
      guestName: 'Dr. Siddharth Sen',
      totalPaid: 75000,
      currency: 'INR',
      overallStatus: 'FUNDS_HELD',
      milestones: [
        {
          id: 'M1-TRV',
          beneficiary: 'Shimla 4x4 Mountain Fleet',
          role: 'MOBILITY_PARTNER',
          component: 'Mountain 4x4 Transfer (Chandigarh → Shimla)',
          amount: 12760,
          trigger: 'Trip Completion OTP',
          payoutWindow: 'P0 Ticket Investigation Hold',
          status: 'FROZEN' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'FROZEN (SLA Investigation)',
        },
        {
          id: 'M2-HTL-BASE',
          beneficiary: 'Wildflower Himalayan Sky Chalet',
          role: 'HOTEL_PARTNER',
          component: 'Heritage Chalet — 70% Base Payout',
          amount: 35700,
          trigger: 'Front Desk Check-in',
          payoutWindow: '2h post-checkin',
          status: 'PENDING_EVENT' as 'RELEASED' | 'TRIGGERED_LOCKED' | 'PENDING_EVENT' | 'FROZEN',
          payoutTime: 'Pending Arrival',
        },
      ],
    },
  ]);

  const handleReleaseMilestone = (journeyId: string, milestoneId: string) => {
    setMilestoneJourneys((prev) =>
      prev.map((j) => {
        if (j.id === journeyId) {
          return {
            ...j,
            milestones: j.milestones.map((m) =>
              m.id === milestoneId
                ? { ...m, status: 'RELEASED' as const, payoutTime: 'Just Now (Disbursed to HDFC Account)' }
                : m
            ),
          };
        }
        return j;
      })
    );
    showToast(`Milestone ${milestoneId} verified and disbursed to partner bank account.`);
  };

  const handleToggleFreezeMilestone = (journeyId: string, milestoneId: string) => {
    setMilestoneJourneys((prev) =>
      prev.map((j) => {
        if (j.id === journeyId) {
          return {
            ...j,
            milestones: j.milestones.map((m) => {
              if (m.id === milestoneId) {
                const next = m.status === 'FROZEN' ? 'TRIGGERED_LOCKED' : 'FROZEN';
                return { ...m, status: next, payoutTime: next === 'FROZEN' ? 'FROZEN by Central Ops' : 'Holding 2h Timer' };
              }
              return m;
            }),
          };
        }
        return j;
      })
    );
    showToast(`Escrow milestone status toggled.`);
  };

  // 2. REFUND ENGINE WITH POLICY ENGINE
  const [refundRequests, setRefundRequests] = useState([
    {
      id: 'RFND-801',
      journeyRef: 'JRN-2026-DEL-022',
      guestName: 'Aarav Singhal',
      reason: '15-Min SLA Breach: Chauffeur Maybach Air Conditioning Failure',
      type: 'SLA_BREACH_COMPENSATION',
      requestedAmount: 8500,
      status: 'AUTHORIZED',
      gatewayRef: 'rzp_pay_90281149',
      commissionClawback: 1020, // 12% transport commission reversed
      policyRule: 'Rule #4: 100% Transport Fare Refund for VIP AC failure + 12% commission reversal',
      createdAt: '18 mins ago',
    },
    {
      id: 'RFND-802',
      journeyRef: 'JRN-2026-BOM-091',
      guestName: 'Megha Kapoor',
      reason: 'Voluntary Cancellation (48+ Hours prior to arrival)',
      type: 'POLICY_CANCELLATION_FULL',
      requestedAmount: 52000,
      status: 'PROCESSING',
      gatewayRef: 'rzp_pay_89104712',
      commissionClawback: 7800, // 15% property commission reversed
      policyRule: 'Rule #1: 100% refund for cancellations > 48h prior to check-in',
      createdAt: '1 hr ago',
    },
    {
      id: 'RFND-803',
      journeyRef: 'JRN-2026-BLR-038',
      guestName: 'Rohan Deshmukh',
      reason: 'Flight Cancellation (Severe Monsoon Weather at Mumbai Terminal)',
      type: 'FORCE_MAJEURE_WEATHER',
      requestedAmount: 38500,
      status: 'REQUESTED',
      gatewayRef: 'rzp_pay_77189021',
      commissionClawback: 5775,
      policyRule: 'Rule #6: Force Majeure Weather override — Full refund with zero partner penalty',
      createdAt: '2 hrs ago',
    },
  ]);

  // 3. COMMISSION & COMMISSION REVERSAL LEDGER
  const [commissions] = useState([
    {
      id: 'COMM-401',
      date: 'Today, 14:10',
      journeyRef: 'JRN-2026-BOM-091',
      componentType: 'HOTEL_STAY',
      partnerName: 'The Vana Azure Ocean Estate',
      grossValue: 52000,
      originalCommission: 7800, // 15%
      reversalAmount: -7800,
      status: 'REVERSED',
      reason: 'Guest Cancellation >48h (Refund #RFND-802)',
      clawbackMethod: 'INSTANT_ESCROW_DEDUCTION',
    },
    {
      id: 'COMM-402',
      date: 'Today, 13:50',
      journeyRef: 'JRN-2026-DEL-022',
      componentType: 'MOBILITY_CHAUFFEUR',
      partnerName: 'Apex Sovereign Chauffeur Fleet',
      grossValue: 8500,
      originalCommission: 1020, // 12%
      reversalAmount: -1020,
      status: 'REVERSED',
      reason: 'SLA Breach Penalty: AC Breakdown (Refund #RFND-801)',
      clawbackMethod: 'NEXT_SETTLEMENT_OFFSET',
    },
    {
      id: 'COMM-403',
      date: 'Today, 11:30',
      journeyRef: 'JRN-2026-UDR-112',
      componentType: 'HOTEL_STAY',
      partnerName: 'Maharaja Pichola Palace',
      grossValue: 480000,
      originalCommission: 72000,
      reversalAmount: 0,
      status: 'ACTIVE_EARNED',
      reason: 'Successful Multi-Suite Reservation Armed',
      clawbackMethod: 'NONE',
    },
  ]);

  // 4. AUTOMATED 3-WAY RECONCILIATION BATCHES
  const [reconciliationBatch, setReconciliationBatch] = useState({
    batchId: 'REC-2026-0908-01',
    lastRun: '10 mins ago',
    status: 'COMPLETED',
    matchRate: 99.6,
    totalGatewayTransactions: 148,
    totalGatewayVolume: 4285000,
    totalBankCredit: 4284500,
    variance: -500, // 500 rounding variance
    varianceReason: 'Minor IMPS gateway interbank rounding tolerance (₹500 across 148 transactions)',
    unmatchedItems: [
      {
        id: 'UNC-01',
        type: 'GATEWAY_CHARGEBACK_HOLD',
        reference: 'chg_rzp_8910488',
        amount: 25000,
        detectedAt: 'Today, 08:30 AM',
        status: 'UNDER_INVESTIGATION',
        resolutionNote: 'Customer bank inquiry flagged for duplicate card swipe check.',
      },
    ],
  });

  const [isReconciling, setIsReconciling] = useState(false);

  // Actions
  const handleAuthorizeRefund = (id: string) => {
    setRefundRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'PROCESSING' } : r
      )
    );
    showToast(`Refund #${id} authorized. Routing to Razorpay/Stripe gateway for disbursement.`);
  };

  const handleSettleRefund = (id: string) => {
    setRefundRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'COMPLETED' } : r
      )
    );
    showToast(`Refund #${id} settled! Funds returned to guest original payment method.`);
  };

  const handleRunReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      setReconciliationBatch((prev) => ({
        ...prev,
        lastRun: 'Just now',
        matchRate: 99.8,
        variance: -200,
      }));
      showToast('3-Way Automated Reconciliation completed. Match Rate: 99.8% (Bank ↔ Gateway ↔ Ledger)');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#3CCF91] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#3CCF91]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#031526] via-[#052340] to-[#0A345C] border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white tracking-wide">StaySphere Financial Engine & Ledger</h1>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              3-Way Reconciled • Section 10 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Payment splitting, instant SLA breach refunds, automated commission reversals, and bank escrow reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-black text-[#3CCF91] font-mono">₹14,820,000</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Total Cryptographic Escrow Pool</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#001428] border border-white/10 overflow-x-auto no-scrollbar">
        {[
          { id: 'settlements', label: 'Milestone Escrow Disbursements', icon: DollarSign, badge: '3 Active Milestones' },
          { id: 'refunds', label: 'Refund Engine & SLA Breaches', icon: RotateCcw, badge: `${refundRequests.filter(r => r.status !== 'COMPLETED').length} Active` },
          { id: 'commissions', label: 'Commissions & Reversals', icon: Percent, badge: 'Auto-Reversing' },
          { id: 'reconciliation', label: '3-Way Reconciliation', icon: RefreshCw, badge: `${reconciliationBatch.matchRate}% Match` },
          { id: 'ledger', label: 'Multi-Split Payment Ledger', icon: Receipt },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-lg border border-[#00D2C4]/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFC857]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#FF8A3D] text-[#001428]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: REFUND ENGINE                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'refunds' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Pending Refund Requests</div>
              <div className="text-2xl font-black text-[#FFC857] font-mono">₹99,000</div>
              <div className="text-[11px] text-slate-400">3 Requests in Processing Pipeline</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Commission Reversals Clawed Back</div>
              <div className="text-2xl font-black text-[#3CCF91] font-mono">₹14,595</div>
              <div className="text-[11px] text-slate-400">Auto-deducted from partner settlements</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Average SLA Refund Speed</div>
              <div className="text-2xl font-black text-cyan-300 font-mono">4.2 Mins</div>
              <div className="text-[11px] text-slate-400">Guaranteed within 15-minute SLA limit</div>
            </div>
          </div>

          <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#FF8A3D]" />
              <span>Active Refund & Compensation Queue</span>
            </h3>

            <div className="space-y-4">
              {refundRequests.map((rfnd) => (
                <div
                  key={rfnd.id}
                  className="p-5 rounded-2xl bg-[#001428] border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-cyan-300">{rfnd.id}</span>
                      <span className="font-bold text-white text-xs">{rfnd.guestName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                        {rfnd.journeyRef}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        rfnd.status === 'COMPLETED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : rfnd.status === 'PROCESSING'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {rfnd.status}
                      </span>
                    </div>

                    <div className="text-xs text-rose-300 font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{rfnd.reason}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 bg-[#001020] p-2.5 rounded-xl border border-white/5 space-y-1">
                      <div><strong className="text-slate-300">Policy Citation:</strong> {rfnd.policyRule}</div>
                      <div className="text-emerald-400">
                        ✓ Commission Reversal: <strong className="font-mono font-bold">₹{rfnd.commissionClawback.toLocaleString('en-IN')}</strong> clawed back from partner ledger.
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2 shrink-0">
                    <div className="text-xl font-black text-[#FF8A3D] font-mono">
                      ₹{rfnd.requestedAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      {rfnd.status === 'REQUESTED' && (
                        <button
                          onClick={() => handleAuthorizeRefund(rfnd.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 cursor-pointer"
                        >
                          Authorize Refund
                        </button>
                      )}

                      {rfnd.status === 'PROCESSING' && (
                        <button
                          onClick={() => handleSettleRefund(rfnd.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#3CCF91] to-emerald-600 text-white text-xs font-bold shadow hover:brightness-110 cursor-pointer flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Complete & Settle</span>
                        </button>
                      )}

                      {rfnd.status === 'COMPLETED' && (
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Settled via Gateway
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COMMISSIONS & REVERSALS                                            */}
      {/* ========================================================================= */}
      {activeTab === 'commissions' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-base font-bold text-white">Platform Commission & Reversal Audit Trail</h2>
              <p className="text-xs text-slate-400 mt-1">
                Automatic commission reversal on guest cancellations, SLA failures, and refund events per Blueprint Section 10.
              </p>
            </div>
            <button
              onClick={() => showToast('Auditing commission ledger against latest cancellations')}
              className="px-4 py-2 rounded-xl bg-[#002B4D] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Audit Ledger</span>
            </button>
          </div>

          <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#001428] text-slate-400 font-bold font-sans border-b border-white/10">
                  <tr>
                    <th className="p-3">Audit Code</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Partner & Component</th>
                    <th className="p-3">Gross Value</th>
                    <th className="p-3">Commission (12-15%)</th>
                    <th className="p-3">Reversal Adjustment</th>
                    <th className="p-3 font-sans">Status</th>
                    <th className="p-3 font-sans">Clawback Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {commissions.map((c) => (
                    <tr key={c.id}>
                      <td className="p-3 text-cyan-300 font-bold">{c.id}</td>
                      <td className="p-3 text-slate-400">{c.date}</td>
                      <td className="p-3 font-sans text-white">
                        <div>{c.partnerName}</div>
                        <div className="text-[10px] text-slate-400">{c.componentType} • {c.journeyRef}</div>
                      </td>
                      <td className="p-3">₹{c.grossValue.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-[#3CCF91]">₹{c.originalCommission.toLocaleString('en-IN')}</td>
                      <td className={`p-3 font-bold ${c.reversalAmount < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                        {c.reversalAmount < 0 ? `-₹${Math.abs(c.reversalAmount).toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="p-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'REVERSED'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-slate-300 text-[11px]">
                        {c.clawbackMethod.replace(/_/g, ' ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 3-WAY RECONCILIATION                                               */}
      {/* ========================================================================= */}
      {activeTab === 'reconciliation' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#002244] to-[#003866] border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Automated 3-Way Reconciliation Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {reconciliationBatch.matchRate}% Match Rate
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Comparing Payment Gateway (Razorpay/Stripe) ↔ Internal Ledger ↔ HDFC Bank Escrow Pool.
              </p>
            </div>

            <button
              onClick={handleRunReconciliation}
              disabled={isReconciling}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-white text-xs font-bold shadow hover:brightness-110 flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isReconciling ? 'animate-spin' : ''}`} />
              <span>{isReconciling ? 'Reconciling Batches...' : 'Run 3-Way Reconcile Batch'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">1. Gateway Inflow</div>
              <div className="text-2xl font-black text-cyan-300 font-mono">₹{reconciliationBatch.totalGatewayVolume.toLocaleString('en-IN')}</div>
              <div className="text-xs text-slate-400">148 Transactions Processed Today</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">2. Bank Escrow Balance</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">₹{reconciliationBatch.totalBankCredit.toLocaleString('en-IN')}</div>
              <div className="text-xs text-slate-400">Verified via HDFC API Corporate Webhook</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">3. Net System Variance</div>
              <div className="text-2xl font-black text-amber-300 font-mono">₹{Math.abs(reconciliationBatch.variance).toLocaleString('en-IN')}</div>
              <div className="text-xs text-slate-400">{reconciliationBatch.varianceReason}</div>
            </div>
          </div>

          {/* Unmatched Items / Exception Queue */}
          <div className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF8A3D]" />
              <span>Exception Triage & Chargeback Sentinel</span>
            </h3>

            <div className="space-y-3">
              {reconciliationBatch.unmatchedItems.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-[#001428] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{item.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">{item.type}</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">Ref: {item.reference} • Detected {item.detectedAt}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{item.resolutionNote}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-black text-[#FF8A3D]">₹{item.amount.toLocaleString('en-IN')}</span>
                    <button
                      onClick={() => showToast(`Discrepancy ${item.id} verified and settled.`)}
                      className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition cursor-pointer"
                    >
                      Resolve Discrepancy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PAYMENT LEDGER (MULTI-SPLIT)                                       */}
      {/* ========================================================================= */}
      {activeTab === 'ledger' && (
        <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#3CCF91]" />
              <span>Journey Multi-Split Financial Ledger</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real-time Split Architecture</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#001428] text-slate-400 font-bold font-sans border-b border-white/10">
                <tr>
                  <th className="p-3">Ledger Code</th>
                  <th className="p-3">Journey & Guest</th>
                  <th className="p-3">Customer Paid</th>
                  <th className="p-3">Hotel Payable</th>
                  <th className="p-3">Transit Payable</th>
                  <th className="p-3">Platform Comm</th>
                  <th className="p-3">GST 18%</th>
                  <th className="p-3 font-sans">Escrow Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {ledgerEntries.map((l) => (
                  <tr key={l.id}>
                    <td className="p-3 text-cyan-300 font-bold">{l.id}</td>
                    <td className="p-3 font-sans text-white">
                      <div>{l.guestName}</div>
                      <div className="text-[10px] text-slate-400">{l.journeyRef}</div>
                    </td>
                    <td className="p-3 font-bold text-white">₹{l.totalCustomerPaid.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-cyan-400">₹{l.hotelPayable.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-amber-300">₹{l.transportPayable.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-[#3CCF91] font-bold">₹{l.platformGrossCommission.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-slate-400">₹{l.gstCollected.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {l.escrowStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MILESTONE-BASED ESCROW SETTLEMENTS                                 */}
      {/* ========================================================================= */}
      {activeTab === 'settlements' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001E36] via-[#002B4D] to-[#0A4D68] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Milestone-Based Escrow Custody (Blueprint Section 10)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Multi-Party Milestone Escrow Disbursement Cockpit
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                Guest funds are captured upfront in escrow. Disbursed strictly upon verified physical milestones:
                <strong> Mobility: 2h post trip completion</strong> • <strong> Hotel: 70% 2h post check-in</strong> • <strong> 30% balance post checkout</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => showToast('Escrow bank audit verified with HDFC SmartHub Escrow gateway.')}
                className="px-4 py-2 rounded-xl bg-[#002B4D] border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>Sync Bank Rails</span>
              </button>
            </div>
          </div>

          {/* Journey Escrow Milestone Cards */}
          <div className="space-y-6">
            {milestoneJourneys.map((jrn) => (
              <div
                key={jrn.id}
                className="p-6 rounded-3xl bg-[#001A33] border border-white/10 shadow-xl space-y-5"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-sm font-black text-cyan-300">{jrn.journeyRef}</span>
                      <span className="text-base font-bold text-white">{jrn.guestName}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {jrn.overallStatus.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      Escrow Vault ID: <strong className="text-slate-200">{jrn.id}</strong>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Captured Upfront</div>
                    <div className="text-xl font-black text-white font-mono">₹{jrn.totalPaid.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                {/* Milestone Progress Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {jrn.milestones.map((ms, mIdx) => {
                    const isReleased = ms.status === 'RELEASED';
                    const isLocked = ms.status === 'TRIGGERED_LOCKED';
                    const isFrozen = ms.status === 'FROZEN';
                    return (
                      <div
                        key={ms.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                          isReleased
                            ? 'bg-[#00261E] border-emerald-500/40'
                            : isFrozen
                            ? 'bg-[#2A0E14] border-rose-500/40'
                            : isLocked
                            ? 'bg-[#00243D] border-cyan-500/40'
                            : 'bg-black/30 border-white/5 opacity-70'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-white/10 text-slate-300">
                              Milestone {mIdx + 1}: {ms.role.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              isReleased
                                ? 'bg-emerald-500/20 text-emerald-300 font-black'
                                : isFrozen
                                ? 'bg-rose-500/20 text-rose-300 font-black animate-pulse'
                                : isLocked
                                ? 'bg-cyan-500/20 text-cyan-300 font-black'
                                : 'bg-white/10 text-slate-400'
                            }`}>
                              {ms.status.replace(/_/g, ' ')}
                            </span>
                          </div>

                          <div>
                            <div className="text-sm font-bold text-white leading-tight">{ms.component}</div>
                            <div className="text-[11px] text-slate-300 mt-1 font-medium">{ms.beneficiary}</div>
                          </div>

                          <div className="pt-2 border-t border-white/10 space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Net Payable:</span>
                              <strong className="text-white font-mono text-sm">₹{ms.amount.toLocaleString('en-IN')}</strong>
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Trigger: <strong className="text-cyan-300 font-normal">{ms.trigger}</strong>
                            </div>
                            <div className="text-[11px] text-[#FFC857] font-mono">
                              ● {ms.payoutTime}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-2 flex gap-2">
                          {!isReleased && (
                            <button
                              onClick={() => handleReleaseMilestone(jrn.id, ms.id)}
                              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] hover:brightness-110 text-black font-black text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                              <span>Release Payout</span>
                            </button>
                          )}

                          {isReleased ? (
                            <div className="w-full py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold text-center flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Disbursed</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleToggleFreezeMilestone(jrn.id, ms.id)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                                isFrozen
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
                              }`}
                              title="Toggle dispute freeze"
                            >
                              {isFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                              <span>{isFrozen ? 'Unfreeze' : 'Hold'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
