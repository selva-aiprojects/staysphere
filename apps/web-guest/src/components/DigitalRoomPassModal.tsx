'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  QrCode,
  Wifi,
  Sparkles,
  X,
  CheckCircle2,
  Lock,
  Unlock,
  Smartphone,
  Copy,
  Check,
  Download,
  Hotel,
  Compass,
  Zap,
} from 'lucide-react';
import { SupportedCurrency, formatCurrencyAmount } from '@staysphere/domain-types';

interface DigitalRoomPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
  roomName?: string;
  propertyName?: string;
  bookingRef?: string;
  checkInDate?: string;
  checkOutDate?: string;
  theme?: 'dark' | 'pearl';
  currency?: SupportedCurrency;
}

export const DigitalRoomPassModal: React.FC<DigitalRoomPassModalProps> = ({
  isOpen,
  onClose,
  guestName = 'Vikram Malhotra',
  roomName = 'Villa 101 — Horizon Oceanfront Private Pool Villa',
  propertyName = 'The Grand Vagator Bay Resort & Oceanfront Villas',
  bookingRef = 'SS-LUX-8492',
  checkInDate = '12 Sep 2026 (14:00)',
  checkOutDate = '15 Sep 2026 (11:00)',
  theme = 'pearl',
  currency = 'INR',
}) => {
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [addedWallet, setAddedWallet] = useState<'apple' | 'google' | null>(null);

  if (!isOpen) return null;

  const isPearl = theme === 'pearl';

  const handleCopyWifi = () => {
    navigator.clipboard?.writeText('SovereignAzure2026');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  const handleSimulateUnlock = () => {
    setUnlocking(true);
    setTimeout(() => {
      setUnlocking(false);
      setUnlocked(true);
      setTimeout(() => setUnlocked(false), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all max-h-[92vh] flex flex-col ${
          isPearl
            ? 'bg-[#F8FAFC] border-slate-300 text-slate-800'
            : 'bg-[#001428] border-white/15 text-slate-100'
        }`}
      >
        {/* Top Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isPearl ? 'bg-slate-100/90 border-slate-200' : 'bg-[#001D3A]/90 border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] text-white shadow-md">
              <KeyRound className="w-5 h-5 text-[#FFC857]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black tracking-wide">StaySphere Sovereign Digital Pass</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  NFC ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Cryptographic PKPass Keycard • Hotel BLE 5.4 Mesh</p>
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

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Authentic Apple/Google Wallet Digital Pass Card */}
          <div data-keep-dark className="relative rounded-3xl bg-gradient-to-br from-[#001B36] via-[#002B4D] to-[#004B7A] border border-[#00D2C4]/40 p-6 text-white shadow-2xl overflow-hidden keep-dark">
            {/* Ambient Background Shimmer */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#00A9A5]/25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#FF8A3D]/20 blur-3xl pointer-events-none" />

            {/* Pass Brand Bar */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-[#FFC857]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                  {propertyName}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF8A3D]/20 text-[#FF8A3D] border border-[#FF8A3D]/40">
                REF: {bookingRef}
              </span>
            </div>

            {/* Suite & Guest Details */}
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#00D2C4]">Allocated Suite</div>
                <div className="text-lg font-black text-white leading-tight">{roomName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Primary Sovereign Guest</div>
                  <div className="font-bold text-slate-100">{guestName}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Security Clearance</div>
                  <div className="font-bold text-[#FFC857] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#3CCF91]" />
                    VIP Sovereign Gold
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Check-In Window</div>
                  <div className="font-mono text-slate-200 text-[11px]">{checkInDate}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Check-Out Window</div>
                  <div className="font-mono text-slate-200 text-[11px]">{checkOutDate}</div>
                </div>
              </div>

              {/* Dynamic QR Code & Scanning Simulation */}
              <div className="mt-4 pt-4 border-t border-white/15 flex flex-col items-center justify-center text-center">
                <div className="relative p-3 rounded-2xl bg-white text-slate-900 shadow-xl border border-white/20">
                  <QrCode className="w-32 h-32" />
                  {/* Subtle animated scanline */}
                  <div className="absolute inset-x-2 top-2 h-0.5 bg-gradient-to-r from-transparent via-[#00A9A5] to-transparent animate-pulse" />
                </div>
                <p className="mt-2 text-[10px] font-mono text-slate-300">
                  AES-256 TOKEN: 0x489F•B012•89A1•E442 (Auto-Rotates in 4m)
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Door Unlock Button (BLE Simulation) */}
          <div className="space-y-2">
            <button
              onClick={handleSimulateUnlock}
              disabled={unlocking}
              className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition shadow-xl cursor-pointer ${
                unlocked
                  ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] hover:from-[#00c2be] hover:to-[#0d4ab0] text-white shadow-cyan-500/20'
              }`}
            >
              {unlocking ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-[#FFC857]" />
                  <span>Connecting to Suite Door via Bluetooth Mesh...</span>
                </>
              ) : unlocked ? (
                <>
                  <Unlock className="w-4 h-4 text-white" />
                  <span>Villa 101 Unlocked • Door Latched Open</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-[#FFC857]" />
                  <span>Hold Near Lock or Tap to Unlock Door</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Compatible with Salto KS, Assa Abloy Hospitality, and Dormakaba Mobile Access BLE.
            </p>
          </div>

          {/* Estate High-Speed Wi-Fi NFC Card */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              isPearl ? 'bg-slate-100/90 border-slate-200' : 'bg-[#001D38] border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00A9A5]/15 text-[#00A9A5]">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black">Estate High-Speed Wi-Fi (WPA3 Enterprise)</div>
                <div className="text-[11px] font-mono text-slate-400">SSID: VanaAzure-Ultra5G • 500 Mbps</div>
              </div>
            </div>
            <button
              onClick={handleCopyWifi}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                isPearl
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-200'
                  : 'border-white/15 text-slate-200 hover:bg-white/10'
              }`}
            >
              {copiedWifi ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Key</span>
                </>
              )}
            </button>
          </div>

          {/* Add to Native Mobile Wallets Buttons */}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Export to Smartphone Wallet
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAddedWallet('apple')}
                className="py-2.5 px-3 rounded-2xl bg-black text-white hover:bg-slate-900 border border-white/20 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5 text-[#00D2C4]" />
                <span>{addedWallet === 'apple' ? 'Added to Apple Wallet ✓' : 'Add to Apple Wallet'}</span>
              </button>
              <button
                onClick={() => setAddedWallet('google')}
                className="py-2.5 px-3 rounded-2xl bg-[#002B4D] text-white hover:bg-[#003866] border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5 text-[#FFC857]" />
                <span>{addedWallet === 'google' ? 'Saved to Google Wallet ✓' : 'Save to Google Wallet'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
