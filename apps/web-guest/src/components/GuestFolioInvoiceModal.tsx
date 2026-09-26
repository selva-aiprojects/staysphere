'use client';

import React, { useState } from 'react';
import {
  Receipt,
  X,
  Download,
  Printer,
  CheckCircle2,
  Hotel,
  ShieldCheck,
  Calendar,
  CreditCard,
  Building2,
  Sparkles,
  Utensils,
  Car,
  Compass,
} from 'lucide-react';
import { SupportedCurrency, formatCurrencyAmount, convertFromINR } from '@staysphere/domain-types';

interface FolioItem {
  id: string;
  date: string;
  category: 'STAY' | 'TRANSIT' | 'EXPERIENCE' | 'DINING' | 'SPA';
  description: string;
  amountINR: number;
}

interface GuestFolioInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
  guestEmail?: string;
  roomName?: string;
  propertyName?: string;
  bookingRef?: string;
  checkInDate?: string;
  checkOutDate?: string;
  inStayOrders?: string[];
  theme?: 'dark' | 'pearl';
  currency?: SupportedCurrency;
}

export const GuestFolioInvoiceModal: React.FC<GuestFolioInvoiceModalProps> = ({
  isOpen,
  onClose,
  guestName = 'Vikram & Radhika Malhotra',
  guestEmail = 'vikram.malhotra@corp.in',
  roomName = 'Villa 101 — Horizon Oceanfront Private Pool Villa',
  propertyName = 'The Grand Vagator Bay Resort & Oceanfront Villas',
  bookingRef = 'SS-LUX-8492',
  checkInDate = '12 Sep 2026',
  checkOutDate = '15 Sep 2026',
  inStayOrders = [],
  theme = 'pearl',
  currency = 'INR',
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const isPearl = theme === 'pearl';

  // Base Folio Line Items
  const baseItems: FolioItem[] = [
    {
      id: 'f-1',
      date: '12 Sep 2026',
      category: 'STAY',
      description: 'Horizon Oceanfront Private Pool Villa (3 Nights @ ₹42,000/night)',
      amountINR: 126000,
    },
    {
      id: 'f-2',
      date: '12 Sep 2026',
      category: 'TRANSIT',
      description: 'Mercedes-Maybach S680 Airport Pickup Sync (MOPA Airport T1 → Estate)',
      amountINR: 4500,
    },
    {
      id: 'f-3',
      date: '13 Sep 2026',
      category: 'EXPERIENCE',
      description: 'Private 32ft Chartered Speedboat Sunset Tour with Champagne & Canapés',
      amountINR: 4800,
    },
    {
      id: 'f-4',
      date: '15 Sep 2026',
      category: 'TRANSIT',
      description: 'Mercedes-Maybach S680 Airport Departure Drop (Estate → MOPA Airport T1)',
      amountINR: 4500,
    },
  ];

  // Map dynamic in-stay dining orders
  const diningItems: FolioItem[] = inStayOrders.map((item, idx) => ({
    id: `dyn-f-${idx}`,
    date: '13 Sep 2026',
    category: 'DINING',
    description: `In-Villa Dining: ${item}`,
    amountINR: 1850,
  }));

  const allItems = [...baseItems, ...diningItems];
  const subtotalINR = allItems.reduce((acc, curr) => acc + curr.amountINR, 0);
  const promoDiscountINR = Math.round(subtotalINR * 0.1); // 10% promo
  const taxableAmountINR = subtotalINR - promoDiscountINR;
  const gstTaxINR = Math.round(taxableAmountINR * 0.12);
  const totalAmountINR = taxableAmountINR + gstTaxINR;

  const handlePrint = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all max-h-[94vh] flex flex-col ${
          isPearl
            ? 'bg-[#F8FAFC] border-slate-300 text-slate-800'
            : 'bg-[#001428] border-white/15 text-slate-100'
        }`}
      >
        {/* Modal Top Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isPearl ? 'bg-slate-100/90 border-slate-200' : 'bg-[#001D3A]/90 border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] text-white shadow-md">
              <Receipt className="w-5 h-5 text-[#FFC857]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black tracking-wide">StaySphere Guest Folio & Tax Invoice</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  FULLY SETTLED
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Folio No: FOL-SS-2026-9041 • Compliant with GST / Global Hospitality Invoicing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isPearl
                ? 'border-slate-300 text-slate-500 hover:bg-slate-200'
                : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Folio Document Area */}
        <div className="p-6 overflow-y-auto space-y-6 print:p-0">
          {/* Hotel & Invoice Header */}
          <div
            className={`p-6 rounded-2xl border ${
              isPearl ? 'bg-white border-slate-200' : 'bg-[#001B36] border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-[#FFC857]" />
                  <span className="text-xs font-black text-[#00A9A5] tracking-wide uppercase">
                    StaySphere Sovereign Estate
                  </span>
                </div>
                <h2 className="text-base font-black text-slate-900 dark:text-white mt-1">{propertyName}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sinquerim Clifftop, North Goa, 403515 • GSTIN: 30AAACG1234F1Z8
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">SAC: 996311 (Luxury Accommodation & Transfers)</p>
              </div>

              <div className="text-right">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Official Tax Invoice</div>
                <div className="text-sm font-mono font-bold text-[#FF8A3D]">{bookingRef}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Date: 15 Sep 2026</div>
                <div className="text-[11px] font-mono text-emerald-500 font-bold">Status: Escrow Disbursed</div>
              </div>
            </div>

            {/* Guest & Stay Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Billed Guest</div>
                <div className="font-bold text-slate-800 dark:text-slate-100">{guestName}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{guestEmail}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Room Allocated</div>
                <div className="font-bold text-slate-800 dark:text-slate-100">{roomName}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Stay Duration</div>
                <div className="font-bold text-slate-800 dark:text-slate-100">3 Nights</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{checkInDate} – {checkOutDate}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Payment Gateway</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Sovereign Escrow Hold
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Folio Table */}
          <div
            className={`rounded-2xl border overflow-hidden ${
              isPearl ? 'bg-white border-slate-200' : 'bg-[#001B36] border-white/10'
            }`}
          >
            <div className="px-4 py-3 bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 grid grid-cols-12 gap-2">
              <span className="col-span-2">Date</span>
              <span className="col-span-2">Category</span>
              <span className="col-span-5">Service Particulars</span>
              <span className="col-span-3 text-right">Amount ({currency})</span>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/5 text-xs">
              {allItems.map((item) => (
                <div key={item.id} className="px-4 py-3 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {item.date}
                  </span>
                  <span className="col-span-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        item.category === 'STAY'
                          ? 'bg-blue-500/15 text-blue-500'
                          : item.category === 'TRANSIT'
                          ? 'bg-amber-500/15 text-amber-500'
                          : item.category === 'EXPERIENCE'
                          ? 'bg-purple-500/15 text-purple-500'
                          : 'bg-emerald-500/15 text-emerald-500'
                      }`}
                    >
                      {item.category}
                    </span>
                  </span>
                  <span className="col-span-5 font-medium text-slate-800 dark:text-slate-200">
                    {item.description}
                  </span>
                  <span className="col-span-3 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrencyAmount(item.amountINR, currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Totals & Double-Entry Allocation */}
          <div
            className={`p-6 rounded-2xl border space-y-3 text-xs ${
              isPearl ? 'bg-white border-slate-200' : 'bg-[#001B36] border-white/10'
            }`}
          >
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Gross Journey Subtotal</span>
              <span className="font-mono font-bold">{formatCurrencyAmount(subtotalINR, currency)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <span>Sovereign Welcome Privilege (10% Promo Code: STAYSPHERE2026)</span>
              <span className="font-mono font-bold">-{formatCurrencyAmount(promoDiscountINR, currency)}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Hospitality Goods & Services Tax (GST @ 12%)</span>
              <span className="font-mono font-bold">{formatCurrencyAmount(gstTaxINR, currency)}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex justify-between items-center text-sm font-black">
              <span>Total Invoice Amount</span>
              <span className="font-mono text-base text-[#00A9A5]">
                {formatCurrencyAmount(totalAmountINR, currency)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Double-Entry Milestone Escrow Pre-Authorization Captured
              </span>
              <span className="font-mono">Balance Due: {formatCurrencyAmount(0, currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between gap-4 ${
            isPearl ? 'bg-slate-100/90 border-slate-200' : 'bg-[#001D3A]/90 border-white/10'
          }`}
        >
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Official E-Invoice compliant with Central Board of Indirect Taxes and Customs.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              disabled={downloading}
              className={`py-2 px-4 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                isPearl
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-200'
                  : 'border-white/15 text-slate-200 hover:bg-white/10'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-[#00A9A5]" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] hover:from-[#00c2be] hover:to-[#0d4ab0] text-white text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>Download Official PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
