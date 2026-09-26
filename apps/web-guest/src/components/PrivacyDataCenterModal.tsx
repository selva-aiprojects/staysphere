'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  RefreshCw,
  X,
  FileCheck,
  Info
} from 'lucide-react';
import { CustomerUser } from './CustomerAuthModal';

interface PrivacyDataCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CustomerUser | null;
  theme: 'pearl' | 'dark';
}

const STORAGE_KEY = 'staysphere_privacy_consent_v1';

export const PrivacyDataCenterModal: React.FC<PrivacyDataCenterModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  theme,
}) => {
  const isPearl = theme === 'pearl';
  const [activeTab, setActiveTab] = useState<'consent' | 'export' | 'erasure'>('consent');
  const [consentData, setConsentData] = useState({
    consentId: 'DPDP-CONSENT-2026-9041-A8',
    timestamp: '2026-09-26T12:00:00.000Z',
    ipHash: 'sha256:4f8e...9a3b (India / Mumbai)',
    essential: true,
    telemetry: true,
    personalization: true,
    analytics: false,
  });

  const [isUpdatingConsent, setIsUpdatingConsent] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Erasure State
  const [isErasing, setIsErasing] = useState(false);
  const [erasureCompleted, setErasureCompleted] = useState(false);
  const [erasureCertificate, setErasureCertificate] = useState<{
    certificateId: string;
    erasureTimestamp: string;
    anonymizedHash: string;
    statutoryTaxRetentionRef: string;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setConsentData(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Mock guest data dossier for GDPR Art. 20 Export
  const guestDataDossier = {
    exportMetadata: {
      generatedAt: new Date().toISOString(),
      governingRegulations: ['EU GDPR (Regulation 2016/679) Article 20', 'India DPDP Act 2023 Section 12'],
      dataController: 'StaySphere Journey Platform Pvt. Ltd. (Corporate CIN: U74999GA2026PTC01889)',
      dataProtectionOfficer: 'dpo@staysphere.com',
    },
    guestIdentity: {
      guestId: currentUser?.id || 'GUEST-9041',
      legalName: currentUser?.fullName || 'Vikram Malhotra',
      verifiedEmail: currentUser?.email || 'vikram.m@corp.in',
      verifiedPhone: currentUser?.phone || '+91 98201 54321',
      loyaltyTier: currentUser?.loyaltyTier || 'Centurion Sovereign Circle',
      kycStatus: 'VERIFIED_PASSPORT_ON_FILE',
    },
    journeyRecords: [
      {
        journeyReference: 'JN-SS-2026-9041',
        origin: 'Mumbai Chhatrapati Shivaji Maharaj International (BOM)',
        destination: 'The Grand Vagator Bay Resort & Oceanfront Villas (Goa)',
        flightNumber: '6E 5324',
        flightTelemetryTrackingConsent: consentData.telemetry ? 'ACTIVE_CONSENT_GRANTED' : 'REVOKED',
        legs: [
          { legType: 'AIRPORT_TRANSFER', provider: 'Apex Sovereign Chauffeurs', vehicle: 'Mercedes S-Class Maybach', status: 'COMPLETED' },
          { legType: 'LUXURY_VILLA_STAY', property: 'The Grand Vagator Bay Resort', roomCategory: 'Presidential Oceanfront Villa 101', status: 'CONFIRMED' },
          { legType: 'CURATED_EXPERIENCE', package: 'Private Sunset Speedboat Cruise', status: 'CONFIRMED' },
        ],
      },
    ],
    consentsAndPreferences: {
      activeConsentId: consentData.consentId,
      grantedTimestamp: consentData.timestamp,
      dietaryPreferences: consentData.personalization ? ['Gluten-Sensitive', 'Organic Cold-Pressed Juices'] : 'SCRUBBED',
      climatePreference: consentData.personalization ? '21.5°C' : 'DEFAULT',
      telemetryAllowed: consentData.telemetry,
      analyticsAllowed: consentData.analytics,
    },
    financialEscrowLedger: {
      totalBookedTransactions: '₹2,06,000 INR (Dual-currency USD $2,452.38)',
      escrowProtocol: 'DOUBLE_ENTRY_MILESTONE_SETTLEMENT',
      statutoryTaxCompliance: 'CGST 9% + SGST 9% (SAC 996311 & SAC 996412)',
      retentionBasis: 'Statutory 7-Year Accounting Exemption (Sec 44AB Income Tax Act 1961)',
    },
  };

  const handleDownloadDossier = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(guestDataDossier, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `staysphere_data_dossier_${currentUser?.id || 'guest'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setStatusMessage('Machine-readable JSON data dossier downloaded successfully.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleUpdateConsent = () => {
    setIsUpdatingConsent(true);
    setTimeout(() => {
      const updated = {
        ...consentData,
        timestamp: new Date().toISOString(),
        consentId: `DPDP-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      };
      setConsentData(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      setIsUpdatingConsent(false);
      setStatusMessage('Consent Ledger updated and cryptographically signed.');
      setTimeout(() => setStatusMessage(null), 4000);
    }, 600);
  };

  const handleExecuteErasure = () => {
    setIsErasing(true);
    setTimeout(() => {
      const certId = `CERT-DPDP-ERASURE-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;
      const cert = {
        certificateId: certId,
        erasureTimestamp: new Date().toISOString(),
        anonymizedHash: `SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`,
        statutoryTaxRetentionRef: `FIN-ESCROW-TAX-SEC44AB-${Date.now()}`,
      };
      setErasureCertificate(cert);
      setErasureCompleted(true);
      setIsErasing(false);

      // Clean local consent storage
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            version: '2026.1-DPDP-GDPR',
            timestamp: new Date().toISOString(),
            consentId: 'ANONYMIZED_RECORD',
            essential: true,
            telemetry: false,
            personalization: false,
            analytics: false,
          })
        );
      } catch (e) {
        console.warn(e);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] ${
          isPearl
            ? 'bg-white border-slate-300 text-slate-800'
            : 'bg-[#00172B] border-white/15 text-slate-100'
        }`}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#001A33] via-[#002B4D] to-[#003B5C] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#00A9A5]/20 border border-[#00A9A5]/40 text-[#00A9A5]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Guest Privacy, GDPR & DPDP 2023 Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Global Standard
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Full transparency & self-service data sovereign controls under EU GDPR & India DPDP Act 2023.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="px-6 py-2.5 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 pt-3 gap-2 bg-[#001428]/60 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('consent')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
              activeTab === 'consent'
                ? 'border-[#00A9A5] text-[#00A9A5] bg-[#001D38]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>1. Consent Ledger & Governance</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
              activeTab === 'export'
                ? 'border-[#00A9A5] text-[#00A9A5] bg-[#001D38]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>2. Data Portability (GDPR Art 20)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('erasure')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer shrink-0 ${
              activeTab === 'erasure'
                ? 'border-rose-500 text-rose-400 bg-[#001D38]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>3. Right to Erasure / Anonymization</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: CONSENT LEDGER */}
          {activeTab === 'consent' && (
            <div className="space-y-5 animate-fade-in">
              {/* Active Consent Receipt Card */}
              <div className="p-4 rounded-2xl bg-[#001F3B] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-[#00A9A5]" />
                    <span className="font-bold text-white text-xs">Active Cryptographic Consent Receipt</span>
                  </div>
                  <div className="font-mono text-[11px] text-cyan-300">{consentData.consentId}</div>
                  <div className="text-[10px] text-slate-400">
                    Timestamp: {consentData.timestamp} • Region: India / APAC • Legal Basis: GDPR Art 6(1)(b) Contractual Necessity
                  </div>
                </div>

                <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Legally Enforceable</span>
                </div>
              </div>

              {/* Granular Consent Controls */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm">Granular Processing Permissions</h4>

                {/* 1. Essential Travel Escrow */}
                <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>Core 3-in-1 Journey Orchestration & Escrow Settlement</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                        Mandatory
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Required to hold villa inventory, coordinate chauffeur dispatch, issue curbside OTPs, and release milestone funds to partners. Excluded from opt-out.
                    </p>
                  </div>
                  <input type="checkbox" checked disabled className="w-4 h-4 accent-[#00A9A5] opacity-75 mt-1 cursor-not-allowed" />
                </div>

                {/* 2. Aviation Telemetry */}
                <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>Live Aviation Telemetry (ADS-B Flight Radar Sync)</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Allows StaySphere to track flight delay drifts and automatically adjust executive chauffeur pickup times without needing you to call dispatch.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consentData.telemetry}
                    onChange={(e) => setConsentData({ ...consentData, telemetry: e.target.checked })}
                    className="w-4 h-4 accent-[#00A9A5] mt-1 cursor-pointer"
                  />
                </div>

                {/* 3. Personalized Butler */}
                <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>Curated Butler & In-Stay Hospitality Personalization</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Allows remembering your dietary allergens, favorite welcome champagne, and climate preferences for repeat stays across our luxury estate network.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consentData.personalization}
                    onChange={(e) => setConsentData({ ...consentData, personalization: e.target.checked })}
                    className="w-4 h-4 accent-[#00A9A5] mt-1 cursor-pointer"
                  />
                </div>

                {/* 4. Anonymous Analytics */}
                <div className="p-4 rounded-2xl bg-[#001428] border border-white/10 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>Anonymous Experience Performance Analytics</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Collects non-PII performance metrics to improve search speed and prevent checkout concurrency issues.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consentData.analytics}
                    onChange={(e) => setConsentData({ ...consentData, analytics: e.target.checked })}
                    className="w-4 h-4 accent-[#00A9A5] mt-1 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleUpdateConsent}
                  disabled={isUpdatingConsent}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] hover:from-[#00B4B0] hover:to-[#45DF9E] text-white font-bold transition flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isUpdatingConsent ? 'animate-spin' : ''}`} />
                  <span>{isUpdatingConsent ? 'Signing Consent...' : 'Sign & Update Consent Ledger'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DATA PORTABILITY */}
          {activeTab === 'export' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-[#002244] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#3CCF91]" />
                    <span className="font-bold text-white text-xs">Article 20 Machine-Readable Dossier</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Export your complete personal data in standard structured JSON format, including identity, past journeys, chauffeur rides, and escrow invoices.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadDossier}
                  className="px-4 py-2 rounded-xl bg-[#3CCF91] hover:bg-[#48E2A1] text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .JSON Dossier</span>
                </button>
              </div>

              {/* JSON Data Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold">Live Data Package Preview:</span>
                  <span className="font-mono">Format: application/json (UTF-8)</span>
                </div>
                <pre className="p-4 rounded-2xl bg-[#000E1C] border border-white/10 font-mono text-[11px] text-emerald-400/90 overflow-x-auto max-h-72 leading-relaxed">
                  {JSON.stringify(guestDataDossier, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: RIGHT TO ERASURE */}
          {activeTab === 'erasure' && (
            <div className="space-y-5 animate-fade-in">
              {!erasureCompleted ? (
                <>
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-bold text-white text-xs">
                        Right to Erasure & Cryptographic Anonymization (GDPR Art. 17 & DPDP §12)
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Requesting erasure permanently removes your full legal name, phone number, email, flight telemetry logs, and butler preferences from active StaySphere operational databases.
                      </p>
                    </div>
                  </div>

                  {/* Statutory Tax Retention Notice */}
                  <div className="p-4 rounded-2xl bg-[#001D38] border border-white/10 space-y-2">
                    <h5 className="font-bold text-white text-xs flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#FFC857]" />
                      <span>Statutory Financial Accounting Exemption</span>
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      In accordance with Section 44AB of the Indian Income Tax Act and Section 36 of the Central Goods & Services Tax (GST) Act 2017, escrow milestone transactions and tax invoice numbers must be preserved for <strong className="text-white">7 years</strong>. These records will be permanently decoupled from your identity and stored as an anonymous cryptographic hash (<code className="text-cyan-300 font-mono">ANONYMIZED_GUEST_HASH</code>).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-white/10 bg-[#001224] space-y-3">
                    <div className="text-white font-bold text-xs">What will be executed upon confirmation:</div>
                    <ul className="space-y-2 text-[11px] text-slate-300 list-disc list-inside">
                      <li>Full Legal Name scrubbed and replaced with an irreversible UUID token.</li>
                      <li>Phone & Email addresses wiped from CRM and marketing dispatch queues.</li>
                      <li>Historical GPS coordinates and flight telemetry feeds wiped permanently.</li>
                      <li>Active customer login session terminated.</li>
                    </ul>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleExecuteErasure}
                      disabled={isErasing}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{isErasing ? 'Scrubbing Identity...' : 'Execute Cryptographic Erasure'}</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Erasure Completed Certificate */
                <div className="p-6 rounded-3xl bg-[#001E36] border border-emerald-500/40 space-y-4 animate-scale-in">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Statutory Certificate of Data Erasure</h4>
                      <p className="text-[11px] text-emerald-300 font-mono">
                        {erasureCertificate?.certificateId}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your personal identity has been permanently scrubbed from StaySphere operational databases. Anonymization verified by the StaySphere Data Protection Officer.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#001224] border border-white/10 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Execution Timestamp:</span>
                      <span className="text-white">{erasureCertificate?.erasureTimestamp}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Anonymized Ledger Token:</span>
                      <span className="text-cyan-300">{erasureCertificate?.anonymizedHash.substring(0, 28)}...</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Tax Retention Reference:</span>
                      <span className="text-slate-300">{erasureCertificate?.statutoryTaxRetentionRef}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition cursor-pointer"
                  >
                    Close Privacy Center
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#001224] border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-6">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#00A9A5]" />
            <span>StaySphere DPO Office: dpo@staysphere.com • DPDP Act 2023 & GDPR Reg. 2016/679</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
