import React, { useState } from 'react';
import {
  Moon,
  CheckCircle2,
  Calendar,
  FileText,
  RefreshCw,
  Sparkles,
  Printer,
} from 'lucide-react';

interface AuditStep {
  stepNumber: number;
  title: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED';
  resultSummary?: string;
}

export const NightAuditWorkspace: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [currentBusinessDate, setCurrentBusinessDate] = useState('26-SEP-2026');
  const [auditComplete, setAuditComplete] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [steps, setSteps] = useState<AuditStep[]>([
    {
      stepNumber: 1,
      title: 'Pre-Audit Front Desk & Cashier Sanity Check',
      description: 'Verifies all front desk shifts are reconciled, zero pending check-ins, and all keys encoded.',
      status: 'COMPLETED',
      resultSummary: 'Verified: 0 unassigned arrivals, 14 cashier drops balanced with zero discrepancy.',
    },
    {
      stepNumber: 2,
      title: 'Automated Room & Tax Batch Posting (SAC 996311)',
      description: 'Posts standard room tariffs + 18% GST (9% CGST + 9% SGST) across 38 in-house guest folios.',
      status: 'PENDING',
      resultSummary: 'Scheduled to post ₹10,64,000 in room tariffs + ₹1,91,520 in GST.',
    },
    {
      stepNumber: 3,
      title: 'No-Show & Flight Delay Cascade Evaluation',
      description: 'Evaluates un-arrived reservations. Extends guaranteed holds for passengers with active ADS-B flight delay telemetry.',
      status: 'PENDING',
      resultSummary: '2 guests delayed by 6E 5324; hold extended until 02:45 AM. 0 penalty no-shows.',
    },
    {
      stepNumber: 4,
      title: 'Guest Ledger & Double-Entry Trial Balance',
      description: 'Runs double-entry equation check: Opening Balance + Day Debits - Day Credits == Closing Escrow Liability.',
      status: 'PENDING',
      resultSummary: 'Trial balance matched: Total Debits ₹14,82,500 == Total Credits ₹14,82,500.',
    },
    {
      stepNumber: 5,
      title: 'Operational Business Date Roll-over',
      description: 'Formally closes operational trading for 26-SEP-2026 and advances hotel calendar to 27-SEP-2026.',
      status: 'PENDING',
      resultSummary: 'Generates immutable Manager Daily Revenue Ledger Archive.',
    },
  ]);

  const handleExecuteNightAudit = () => {
    setIsAuditing(true);
    let currentStep = 1;

    const interval = setInterval(() => {
      setSteps((prev) =>
        prev.map((step) => {
          if (step.stepNumber <= currentStep) {
            return { ...step, status: 'COMPLETED' };
          } else if (step.stepNumber === currentStep + 1) {
            return { ...step, status: 'RUNNING' };
          }
          return step;
        })
      );

      currentStep++;

      if (currentStep > 5) {
        clearInterval(interval);
        setIsAuditing(false);
        setAuditComplete(true);
        setCurrentBusinessDate('27-SEP-2026');
        showToast('Night Audit Completed Successfully: Business date advanced to 27-SEP-2026.');
      }
    }, 1200);
  };

  const handlePrintDailyReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div data-keep-dark className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#002B4D] border border-[#3CCF91] text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <Sparkles className="w-4 h-4 text-[#3CCF91]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001428] via-[#00284D] to-[#0B3D91] border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Moon className="w-6 h-6 text-[#FFC857]" />
            <h1 className="text-xl font-serif-luxury font-bold text-white tracking-wide">
              Hotel Night Audit & Daily Business Date Roll-over
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              OPERA Cloud Standard
            </span>
          </div>
          <p className="text-xs text-slate-200">
            End-of-day operational closure: Batch room & tax posting, flight-delayed no-show holds, ledger trial balance, and calendar advancement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#001020] border border-white/10 text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Current Business Date</div>
            <div className="text-sm font-black font-mono text-[#FFC857] flex items-center gap-1.5 justify-end">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentBusinessDate}</span>
            </div>
          </div>

          <button
            onClick={handleExecuteNightAudit}
            disabled={isAuditing || auditComplete}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer ${
              auditComplete
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FFC857] to-[#FF8A3D] hover:brightness-110 text-[#001428] font-bold'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Running Night Audit...' : auditComplete ? 'Audit Closed for Date' : 'Execute Night Audit'}</span>
          </button>
        </div>
      </div>

      {/* 4 Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
          <div className="text-xs text-slate-400 font-bold">Property Occupancy</div>
          <div className="text-2xl font-black text-[#3CCF91] font-mono">88.4%</div>
          <div className="text-[11px] text-slate-400">38 of 43 Villas Occupied Tonight</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
          <div className="text-xs text-slate-400 font-bold">RevPAR (Revenue Per Avail Room)</div>
          <div className="text-2xl font-black text-[#FFC857] font-mono">₹24,752</div>
          <div className="text-[11px] text-slate-400">Average Daily Rate (ADR): ₹28,000</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
          <div className="text-xs text-slate-400 font-bold">In-Stay F&B Dining Incidentals</div>
          <div className="text-2xl font-black text-cyan-300 font-mono">₹1,42,800</div>
          <div className="text-[11px] text-slate-400">Logged to Room Folios via AI Butler</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
          <div className="text-xs text-slate-400 font-bold">Guest Ledger Balance</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">₹0.00 (Balanced)</div>
          <div className="text-[11px] text-slate-400">Debits == Credits Invariant Met</div>
        </div>
      </div>

      {/* 5-Step Night Audit Execution Pipeline */}
      <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Moon className="w-4 h-4 text-[#FFC857]" />
          <span>Night Audit Operational Pipeline</span>
        </h3>

        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className={`p-4 rounded-2xl border transition-all flex flex-wrap items-start justify-between gap-4 ${
                step.status === 'COMPLETED'
                  ? 'bg-[#001428] border-emerald-500/30'
                  : step.status === 'RUNNING'
                  ? 'bg-[#002244] border-cyan-400/50 shadow-md'
                  : 'bg-[#001020] border-white/5 opacity-70'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    step.status === 'COMPLETED'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : step.status === 'RUNNING'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 animate-pulse'
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
                >
                  {step.status === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4" /> : step.stepNumber}
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <span>{step.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        step.status === 'COMPLETED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : step.status === 'RUNNING'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-xl">{step.description}</p>
                  {step.resultSummary && (
                    <div className="text-[11px] text-cyan-300/90 font-mono mt-1">
                      ↳ {step.resultSummary}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Manager Revenue Ledger Preview */}
      <div className="bg-[#001A33] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#3CCF91]" />
            <h3 className="text-sm font-serif-luxury font-bold text-white">Daily Manager’s Revenue & Ledger Report</h3>
          </div>

          <button
            onClick={handlePrintDailyReport}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#001020] border border-white/10 font-mono text-xs text-slate-300 space-y-2">
          <div className="flex justify-between border-b border-white/10 pb-2 text-slate-400 font-bold">
            <span>REVENUE ACCOUNT CODE</span>
            <span>DESCRIPTION</span>
            <span className="text-right">DAY AMOUNT (INR)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-cyan-300">REV-ROOM-996311</span>
            <span>Villa Accommodation Tariffs (38 Villas)</span>
            <span className="text-right font-bold text-white">₹10,64,000.00</span>
          </div>

          <div className="flex justify-between">
            <span className="text-cyan-300">REV-FB-996331</span>
            <span>Curated Fine Dining & Room Butler Service</span>
            <span className="text-right font-bold text-white">₹1,42,800.00</span>
          </div>

          <div className="flex justify-between">
            <span className="text-cyan-300">REV-TRANSIT-996412</span>
            <span>Airport Chauffeur Maybach & EV Transfers</span>
            <span className="text-right font-bold text-white">₹84,500.00</span>
          </div>

          <div className="flex justify-between">
            <span className="text-cyan-300">TAX-CGST-9PCT</span>
            <span>Central GST Collected (9%)</span>
            <span className="text-right font-bold text-white">₹1,16,217.00</span>
          </div>

          <div className="flex justify-between">
            <span className="text-cyan-300">TAX-SGST-9PCT</span>
            <span>State GST Collected (9%)</span>
            <span className="text-right font-bold text-white">₹1,16,217.00</span>
          </div>

          <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-black text-[#FFC857]">
            <span>TOTAL CLOSING REVENUE & ESCROW CAPTURE</span>
            <span></span>
            <span className="text-right">₹15,23,734.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
