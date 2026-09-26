'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, RefreshCw, X, Sparkles } from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../lib/i18n';

interface InventorySoftLockBannerProps {
  villaName: string;
  theme: 'pearl' | 'dark';
  language?: SupportedLanguage;
  onTimeout?: () => void;
}

export const InventorySoftLockBanner: React.FC<InventorySoftLockBannerProps> = ({
  villaName,
  theme,
  language = 'en',
  onTimeout,
}) => {
  const isPearl = theme === 'pearl';
  const INITIAL_SECONDS = 900; // 15:00 minutes
  const [secondsRemaining, setSecondsRemaining] = useState<number>(INITIAL_SECONDS);
  const [lockToken] = useState<string>(() => `HOLD-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`);
  const [isExtended, setIsExtended] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      if (onTimeout) onTimeout();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, onTimeout]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (secondsRemaining / (isExtended ? 1500 : 900)) * 100;

  const handleExtendHold = () => {
    setSecondsRemaining((prev) => prev + 600); // Add 10 mins
    setIsExtended(true);
    setToastMessage('Hold extended by 10 minutes. Your suite remains locked.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-1.5">
      {toastMessage && (
        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div
        className={`p-3.5 rounded-2xl border shadow-lg transition-all ${
          isPearl
            ? 'bg-amber-50/90 border-amber-200 text-slate-800'
            : 'bg-[#002244]/90 border-amber-500/30 text-slate-100'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <Clock className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs">
                  {getTranslation(language, 'softLockActive', 'Inventory Soft-Locked for Checkout')}
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/30 border border-white/10 text-cyan-300">
                  {lockToken}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-sm sm:max-w-md">
                {villaName} — {getTranslation(language, 'softLockNotice', 'Guaranteed 15-minute hold preventing double-booking race conditions.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-mono font-black text-sm text-[#FFC857]">
                {formatTime(secondsRemaining)}
              </div>
              <div className="text-[10px] text-slate-400">
                {getTranslation(language, 'softLockRemaining', 'remaining to complete')}
              </div>
            </div>

            <button
              type="button"
              onClick={handleExtendHold}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] font-bold text-slate-200 transition flex items-center gap-1 cursor-pointer"
              title="Add 10 minutes to hold"
            >
              <RefreshCw className="w-3 h-3 text-[#3CCF91]" />
              <span className="hidden sm:inline">+10m</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/20 rounded-full h-1 mt-2.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              secondsRemaining < 180
                ? 'bg-rose-500'
                : secondsRemaining < 360
                ? 'bg-amber-400'
                : 'bg-gradient-to-r from-[#00A9A5] to-[#3CCF91]'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
