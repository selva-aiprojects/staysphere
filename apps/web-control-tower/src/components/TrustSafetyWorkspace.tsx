import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Award,
  RefreshCw,
} from 'lucide-react';

export const TrustSafetyWorkspace: React.FC = () => {
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
            <h1 className="text-xl font-bold text-white tracking-wide">Trust, Governance & Partner Verification</h1>
          </div>
          <p className="text-xs text-slate-200">
            Multi-stage governance: REGISTERED → VERIFIED → PREMIER. Background scrutiny, police records, and unannounced safety audits.
          </p>
        </div>

        <button
          onClick={() => showToast('Triggered automated compliance audit scan across all 42 registered partner entities.')}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-cyan-300" />
          <span>Run Integrity Audit</span>
        </button>
      </div>

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
  );
};
