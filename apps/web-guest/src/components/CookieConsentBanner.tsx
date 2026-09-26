'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Sliders,
  CheckCircle2,
  X,
  Sparkles,
  Info
} from 'lucide-react';

export interface ConsentPreferences {
  version: string;
  timestamp: string;
  consentId: string;
  essential: boolean; // Always true
  telemetry: boolean; // Aviation ADS-B & Chauffeur GPS
  personalization: boolean; // Butler preferences, allergies, pillow selection
  analytics: boolean; // Anonymous platform telemetry
}

interface CookieConsentBannerProps {
  onOpenPrivacyCenter: () => void;
  theme: 'pearl' | 'dark';
}

const STORAGE_KEY = 'staysphere_privacy_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyCenter,
  theme,
}) => {
  const isPearl = theme === 'pearl';
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  const [preferences, setPreferences] = useState<ConsentPreferences>({
    version: '2026.1-DPDP-GDPR',
    timestamp: new Date().toISOString(),
    consentId: 'CONSENT-INIT',
    essential: true,
    telemetry: true,
    personalization: true,
    analytics: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
        setIsVisible(false);
      } else {
        // First visit or reset
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
    setHasLoaded(true);
  }, []);

  const saveConsent = (updated: Partial<ConsentPreferences>) => {
    const finalPreferences: ConsentPreferences = {
      ...preferences,
      ...updated,
      essential: true, // Invariant: Escrow & booking execution requires essential cookies
      version: '2026.1-DPDP-GDPR',
      timestamp: new Date().toISOString(),
      consentId: `DPDP-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPreferences));
    } catch (e) {
      console.warn('Failed to save consent to localStorage', e);
    }

    setPreferences(finalPreferences);
    setIsVisible(false);
    setShowPreferencesModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      telemetry: true,
      personalization: true,
      analytics: true,
    });
  };

  const handleAcceptNecessaryOnly = () => {
    saveConsent({
      telemetry: false,
      personalization: false,
      analytics: false,
    });
  };

  if (!hasLoaded || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Consent Banner */}
      <aside
        aria-label="Privacy & Cookie Preferences"
        className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 animate-slide-up"
      >
        <div
          className={`p-5 rounded-3xl border shadow-2xl backdrop-blur-xl transition-all ${
            isPearl
              ? 'bg-white/95 border-slate-300 text-slate-800 shadow-slate-400/20'
              : 'bg-[#00182E]/95 border-[#00A9A5]/40 text-slate-100 shadow-cyan-950/50'
          }`}
        >
          <div className="flex items-start gap-3.5 mb-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#00A9A5]/20 to-[#3CCF91]/20 border border-[#00A9A5]/30 shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#00A9A5]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold tracking-wide">
                  Guest Privacy, GDPR & DPDP 2023 Notice
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00A9A5]/20 text-[#00A9A5] border border-[#00A9A5]/30">
                  DPDP Compliant
                </span>
              </div>
              <p
                className={`text-xs mt-1 leading-relaxed ${
                  isPearl ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                StaySphere processes personal data strictly to orchestrate your atomic 3-in-1 journey (Villa Stay, Airport Chauffeur, and Curbside Handshake) under the EU GDPR & India DPDP Act 2023. We never sell your flight telemetry or stay data.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] hover:from-[#00B4B0] hover:to-[#45DF9E] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Accept All Cookies</span>
            </button>

            <button
              type="button"
              onClick={handleAcceptNecessaryOnly}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                isPearl
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
            >
              Essential Only
            </button>

            <button
              type="button"
              onClick={() => setShowPreferencesModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#00A9A5] hover:text-[#00C2BD] flex items-center gap-1 transition ml-auto cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Customize Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl space-y-5 ${
              isPearl
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-[#001A33] border-white/15 text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-[#00A9A5]" />
                <h3 className="text-base font-bold">Privacy & Consent Preferences</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p
              className={`text-xs ${
                isPearl ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Control how StaySphere handles your personal records. Under statutory global regulations (GDPR Art. 6 & DPDP Act 2023 Sec. 6), you have the right to withdraw or modify these permissions at any time.
            </p>

            <div className="space-y-3 text-xs">
              {/* Category 1: Strictly Necessary */}
              <div
                className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 ${
                  isPearl
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#001224] border-white/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold flex items-center gap-2 text-white">
                    <span>1. Core Journey & Escrow Settlement</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      Required
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Essential for reserving luxury estates, assigning executive chauffeurs, issuing curbside OTP handshakes, and releasing milestone escrow funds. Cannot be disabled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 w-4 h-4 accent-[#00A9A5] cursor-not-allowed opacity-80"
                />
              </div>

              {/* Category 2: Flight & Chauffeur Telemetry */}
              <div
                className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 ${
                  isPearl
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#001224] border-white/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>2. Aviation Telemetry & Chauffeur Drift Sync</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Allows real-time matching with ADS-B flight feeds to dynamically delay or advance your chauffeur pickup if your flight is rescheduled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.telemetry}
                  onChange={(e) =>
                    setPreferences({ ...preferences, telemetry: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 accent-[#00A9A5] cursor-pointer"
                />
              </div>

              {/* Category 3: Personalized Concierge & Butler */}
              <div
                className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 ${
                  isPearl
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#001224] border-white/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>3. In-Stay Butler & Experience Personalization</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Remembers dietary allergens, private pool temperature preferences, and curated dining favorites across your stays.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      personalization: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 accent-[#00A9A5] cursor-pointer"
                />
              </div>

              {/* Category 4: Anonymous Analytics */}
              <div
                className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 ${
                  isPearl
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#001224] border-white/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>4. Performance & Reliability Telemetry</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Helps us detect network anomalies and improve checkout response latency. No PII is collected.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 accent-[#00A9A5] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setShowPreferencesModal(false);
                  onOpenPrivacyCenter();
                }}
                className="text-xs font-bold text-[#00A9A5] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Open Full Privacy Center</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreferencesModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent(preferences)}
                  className="px-4 py-2 rounded-xl bg-[#00A9A5] hover:bg-[#00BFB9] text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
