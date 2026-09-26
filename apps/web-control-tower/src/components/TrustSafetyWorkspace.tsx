import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Award,
  RefreshCw,
  Lock,
  FileText,
  Download,
  Trash2,
  Fingerprint,
} from 'lucide-react';

export const TrustSafetyWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'partners' | 'privacy-dpo'>('partners');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [partners] = useState([
    {
      id: 'PTR-01',
      name: 'The Vana Azure Ocean Estate (Goa)',
      type: 'PROPERTY_ESTATE',
      trustTier: 'PREMIER',
      trustScore: 98.4,
      backgroundVerification: 'VERIFIED',
      policeVerification: 'VERIFIED',
      tradeLicense: 'VALID_2028',
      fssaiLicense: 'CERTIFIED',
      lastAudit: '3 days ago',
      status: 'ACTIVE_CERTIFIED',
    },
    {
      id: 'PTR-02',
      name: 'Apex Sovereign Chauffeur Fleet',
      type: 'MOBILITY_FLEET',
      trustTier: 'PREMIER',
      trustScore: 99.2,
      backgroundVerification: 'VERIFIED',
      policeVerification: '100% DRIVERS_VERIFIED',
      tradeLicense: 'VALID_2027',
      fssaiLicense: 'N/A',
      lastAudit: 'Yesterday',
      status: 'ACTIVE_CERTIFIED',
    },
    {
      id: 'PTR-03',
      name: 'Maharaja Pichola Palace (Udaipur)',
      type: 'PROPERTY_ESTATE',
      trustTier: 'PREMIER',
      trustScore: 99.6,
      backgroundVerification: 'VERIFIED',
      policeVerification: 'VERIFIED',
      tradeLicense: 'HERITAGE_GOVT_APPROVED',
      fssaiLicense: '5_STAR_HYGIENE',
      lastAudit: '1 week ago',
      status: 'ACTIVE_CERTIFIED',
    },
    {
      id: 'PTR-04',
      name: 'Himalayan High Pass Chauffeur Logistics',
      type: 'MOBILITY_FLEET',
      trustTier: 'VERIFIED',
      trustScore: 94.1,
      backgroundVerification: 'VERIFIED',
      policeVerification: 'PENDING_2_DRIVERS',
      tradeLicense: 'VALID_2026',
      fssaiLicense: 'N/A',
      lastAudit: '2 weeks ago',
      status: 'PROVISIONAL_CLEARANCE',
    },
  ]);

  const [dsarRequests] = useState([
    {
      id: 'DSAR-2026-0881',
      guestName: 'Claire Dupont',
      email: 'claire.d@luxetravel.fr',
      jurisdiction: 'EU GDPR (France)',
      type: 'RIGHT_TO_PORTABILITY_ART20',
      status: 'COMPLETED',
      timestamp: '2026-09-26 14:15 IST',
      notes: 'Generated machine-readable JSON data archive with flight & stay history.',
    },
    {
      id: 'DSAR-2026-0882',
      guestName: 'Karan Mehra',
      email: 'karan.m@investor.in',
      jurisdiction: 'India DPDP Act 2023',
      type: 'RIGHT_TO_ERASURE_SEC12',
      status: 'EXECUTED_ANONYMIZED',
      timestamp: '2026-09-26 16:30 IST',
      notes: 'PII scrubbed; Financial escrow records retained for 7 years under Sec 44AB.',
    },
    {
      id: 'DSAR-2026-0883',
      guestName: 'Dr. Evelyn Reed',
      email: 'evelyn.reed@oxford.ac.uk',
      jurisdiction: 'UK GDPR',
      type: 'CONSENT_REVOCATION_TELEMETRY',
      status: 'ACTIVE_PROCESSED',
      timestamp: '2026-09-26 18:40 IST',
      notes: 'Revoked ADS-B flight telemetry sync. Standard fixed pickup time maintained.',
    },
  ]);

  const [consentLedger] = useState([
    {
      consentId: 'DPDP-CONSENT-9041-A8',
      guest: 'Vikram Malhotra',
      email: 'vikram.m@corp.in',
      jurisdiction: 'DPDP Act 2023',
      essential: true,
      telemetry: true,
      personalization: true,
      analytics: false,
      ipHash: 'sha256:4f8e...9a3b (Mumbai)',
      lastUpdated: '12 mins ago',
    },
    {
      consentId: 'DPDP-CONSENT-8722-B1',
      guest: 'Ananya Roy',
      email: 'ananya.roy@design.io',
      jurisdiction: 'DPDP Act 2023',
      essential: true,
      telemetry: true,
      personalization: true,
      analytics: true,
      ipHash: 'sha256:8b11...e201 (Bengaluru)',
      lastUpdated: '2 hours ago',
    },
    {
      consentId: 'GDPR-CONSENT-7650-E9',
      guest: 'Marcus Sterling',
      email: 'm.sterling@mayfair.co.uk',
      jurisdiction: 'EU/UK GDPR',
      essential: true,
      telemetry: false,
      personalization: false,
      analytics: false,
      ipHash: 'sha256:3a44...8c71 (London)',
      lastUpdated: 'Yesterday',
    },
  ]);

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
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#002244] via-[#0B3D91] to-[#00A9A5] border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-[#3CCF91]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Trust, Governance & Sovereign Data Protection
            </h1>
          </div>
          <p className="text-xs text-slate-200">
            Multi-stage stakeholder governance, partner police verification, and enterprise GDPR / DPDP 2023 DPO compliance console.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'partners' ? (
            <button
              onClick={() => showToast('Triggered automated compliance audit scan across all 42 registered partner entities.')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-cyan-300" />
              <span>Run Integrity Audit</span>
            </button>
          ) : (
            <button
              onClick={() => showToast('Purged expired 90-day flight telemetry feeds while preserving statutory financial records.')}
              className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 transition flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>Purge &gt;90d Telemetry</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-white/10 gap-3 pb-1">
        <button
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'partners'
              ? 'bg-[#002B4D] text-[#3CCF91] border border-[#3CCF91]/30 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Partner Verification Roster & Trust Tiers</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy-dpo')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'privacy-dpo'
              ? 'bg-[#002B4D] text-[#00A9A5] border border-[#00A9A5]/40 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4 text-[#00A9A5]" />
          <span>Guest Privacy & DPDP / GDPR Compliance Center (DPO)</span>
        </button>
      </div>

      {/* TAB 1: PARTNER ROSTER */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          {/* 3 Metric Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Premier Verified Partners</div>
              <div className="text-2xl font-black text-[#3CCF91] font-mono">92.8%</div>
              <div className="text-[11px] text-slate-400">Zero tolerance for unverified staff</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Average Partner Trust Score</div>
              <div className="text-2xl font-black text-[#FFC857] font-mono">98.1 / 100</div>
              <div className="text-[11px] text-slate-400">Audited across hygiene, SLA, & safety</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Unannounced Mystery Audits</div>
              <div className="text-2xl font-black text-cyan-300 font-mono">14 This Month</div>
              <div className="text-[11px] text-slate-400">100% Passed or Resolved within 24h</div>
            </div>
          </div>

          {/* Partner Compliance Table */}
          <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFC857]" />
              <span>Partner Verification Roster & Trust Tier Matrix</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#001428] text-slate-400 font-bold border-b border-white/10">
                  <tr>
                    <th className="p-3">Partner Entity</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Trust Tier</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Police & KYC</th>
                    <th className="p-3">Trade License</th>
                    <th className="p-3">Audit Date</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {partners.map((p) => (
                    <tr key={p.id}>
                      <td className="p-3 font-bold text-white">
                        <div>{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                      </td>
                      <td className="p-3 text-cyan-300 font-mono">{p.type}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {p.trustTier}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-[#FFC857]">{p.trustScore}</td>
                      <td className="p-3 text-emerald-400 font-mono text-[11px]">{p.policeVerification}</td>
                      <td className="p-3 text-slate-300 font-mono text-[11px]">{p.tradeLicense}</td>
                      <td className="p-3 text-slate-400 text-[11px]">{p.lastAudit}</td>
                      <td className="p-3">
                        <button
                          onClick={() => showToast(`Audit report for ${p.name} verified.`)}
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition cursor-pointer"
                        >
                          Audit Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRIVACY & DPO WORKSPACE */}
      {activeTab === 'privacy-dpo' && (
        <div className="space-y-6 animate-fade-in">
          {/* Privacy & Compliance KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Active Consent Receipts</div>
              <div className="text-2xl font-black text-[#00A9A5] font-mono">1,428</div>
              <div className="text-[11px] text-slate-400">100% Cryptographically signed</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">DSAR Requests (30d)</div>
              <div className="text-2xl font-black text-cyan-300 font-mono">12 Total</div>
              <div className="text-[11px] text-slate-400">0 Overdue • Avg response 4.2h</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Right to Erasure (Art 17)</div>
              <div className="text-2xl font-black text-rose-400 font-mono">18 Executed</div>
              <div className="text-[11px] text-slate-400">Tax exemption held under Sec 44AB</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#001A33] border border-white/10 shadow-lg space-y-1.5">
              <div className="text-xs text-slate-400 font-bold">Telemetry Retention</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">90 Days</div>
              <div className="text-[11px] text-slate-400">Automated rolling purge active</div>
            </div>
          </div>

          {/* Data Subject Access Requests (DSAR) Queue */}
          <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3CCF91]" />
                <span>Data Subject Access Requests (DSAR Queue & Erasure Registry)</span>
              </h3>
              <button
                onClick={() => showToast('Exported complete DPO compliance ledger to statutory audit CSV.')}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#001428] text-slate-400 font-bold border-b border-white/10">
                  <tr>
                    <th className="p-3">Request ID</th>
                    <th className="p-3">Guest & Subject</th>
                    <th className="p-3">Jurisdiction</th>
                    <th className="p-3">Action Type</th>
                    <th className="p-3">Compliance Status</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">DPO Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {dsarRequests.map((r) => (
                    <tr key={r.id}>
                      <td className="p-3 font-mono font-bold text-cyan-300">{r.id}</td>
                      <td className="p-3 text-white">
                        <div className="font-bold">{r.guestName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{r.email}</div>
                      </td>
                      <td className="p-3 font-semibold text-slate-300">{r.jurisdiction}</td>
                      <td className="p-3 font-mono text-[11px] text-[#FFC857]">{r.type}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">{r.timestamp}</td>
                      <td className="p-3 text-slate-300 text-[11px] max-w-xs">{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Guest Consent Ledger Table */}
          <div className="bg-[#001E36] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-[#00A9A5]" />
              <span>Real-Time Guest Consent Ledger (DPDP 2023 & GDPR Art 6)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#001428] text-slate-400 font-bold border-b border-white/10">
                  <tr>
                    <th className="p-3">Consent Hash Ref</th>
                    <th className="p-3">Data Subject</th>
                    <th className="p-3">Jurisdiction</th>
                    <th className="p-3">Essential Escrow</th>
                    <th className="p-3">Flight Telemetry</th>
                    <th className="p-3">Butler Personalization</th>
                    <th className="p-3">IP Geo Hash</th>
                    <th className="p-3">Last Modified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {consentLedger.map((c) => (
                    <tr key={c.consentId}>
                      <td className="p-3 font-mono font-bold text-slate-200">{c.consentId}</td>
                      <td className="p-3 text-white">
                        <div className="font-bold">{c.guest}</div>
                        <div className="text-[10px] text-slate-400">{c.email}</div>
                      </td>
                      <td className="p-3 text-slate-300">{c.jurisdiction}</td>
                      <td className="p-3 text-emerald-400 font-bold text-center">ACTIVE</td>
                      <td className="p-3 text-center">
                        {c.telemetry ? (
                          <span className="text-emerald-400 font-bold">GRANTED</span>
                        ) : (
                          <span className="text-rose-400 font-bold">REVOKED</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {c.personalization ? (
                          <span className="text-emerald-400 font-bold">GRANTED</span>
                        ) : (
                          <span className="text-slate-400">OPT-OUT</span>
                        )}
                      </td>
                      <td className="p-3 font-mono text-[10px] text-slate-400">{c.ipHash}</td>
                      <td className="p-3 text-slate-400 text-[11px]">{c.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
