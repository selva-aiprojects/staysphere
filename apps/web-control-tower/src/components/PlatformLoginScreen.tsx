import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  Car,
  KeyRound,
  Lock,
  ArrowRight,
  Sparkles,
  Hotel,
  Receipt,
  Fingerprint,
  Info,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { HorizontalLogo } from '@staysphere/ui-kit';
import { PlatformRole } from '../App';

interface PlatformLoginScreenProps {
  onLogin: (role: PlatformRole) => void;
}

export const PlatformLoginScreen: React.FC<PlatformLoginScreenProps> = ({ onLogin }) => {
  const [authTab, setAuthTab] = useState<'PARTNER' | 'EMPLOYEE'>('PARTNER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [selectedPartnerPreset, setSelectedPartnerPreset] = useState<PlatformRole | null>('PROPERTY_PARTNER');
  const [selectedEmployeePreset, setSelectedEmployeePreset] = useState<PlatformRole | null>('RELATIONSHIP_MANAGER');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Partner Presets
  const PARTNER_PRESETS = [
    {
      role: 'PROPERTY_PARTNER' as PlatformRole,
      name: 'Anil Deshmukh',
      email: 'anil.owner@vanaazure.com',
      entity: 'The Vana Azure Private Ocean Villa & Estate',
      category: 'Luxury Resort & Villa Partner',
      icon: Hotel,
      badge: 'Tier 1 Certified Partner',
    },
    {
      role: 'TRAVEL_DESK_LEAD' as PlatformRole,
      name: 'Vikas Rathore',
      email: 'vikas.traveldesk@staysphere.io',
      entity: 'Apex Sovereign Chauffeur Fleet Operations',
      category: 'Mobility & Chauffeur Fleet Lead',
      icon: Car,
      badge: 'Fleet Telematics Authority',
    },
    {
      role: 'CHANNEL_PARTNER_LEAD' as PlatformRole,
      name: 'Priya Nambiar',
      email: 'priya.concierge@centurion.amex.com',
      entity: 'American Express Centurion Concierge Desk',
      category: 'B2B Luxury Channel Partner',
      icon: Users,
      badge: 'Centurion Black Agency',
    },
  ];

  // Employee (StaySphere Internal Staff) Presets
  const EMPLOYEE_PRESETS = [
    {
      role: 'RELATIONSHIP_MANAGER' as PlatformRole,
      name: 'Vikramaditya Singh',
      email: 'vikram.rm@staysphere.io',
      department: 'Estate Relations & Governance (West & North)',
      title: 'Senior Relationship Manager',
      icon: ShieldCheck,
      badge: 'Executive Staff ID #RM-804',
    },
    {
      role: 'FINANCE_PAYMENTS' as PlatformRole,
      name: 'Rajesh Khosla',
      email: 'rajesh.finance@staysphere.io',
      department: 'Treasury & Cryptographic Escrow Vault',
      title: 'Chief Financial Officer & Escrow Custodian',
      icon: Receipt,
      badge: 'Vault Keyholder ID #FIN-102',
    },
    {
      role: 'OPS_ADMIN' as PlatformRole,
      name: 'Devraj Mukherjee',
      email: 'devraj.lead@staysphere.io',
      department: 'Central Resolution Command & 15m SLA Desk',
      title: 'Chief Operating Officer & Central Ops Lead',
      icon: Zap,
      badge: 'SuperAdmin Root #OPS-001',
    },
    {
      role: 'FRONTDESK' as PlatformRole,
      name: 'Ananya Deshmukh',
      email: 'ananya.frontdesk@vanaazure.com',
      department: 'On-Premise Guest Experience & AES Keycards',
      title: 'Head of Frontdesk & Concierge',
      icon: KeyRound,
      badge: 'Estate Concierge ID #FD-409',
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      if (authTab === 'PARTNER') {
        const targetRole = selectedPartnerPreset || 'PROPERTY_PARTNER';
        onLogin(targetRole);
      } else {
        const targetRole = selectedEmployeePreset || 'RELATIONSHIP_MANAGER';
        onLogin(targetRole);
      }
    }, 800);
  };

  const handleQuickPresetLogin = (role: PlatformRole) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(role);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#000E1C] text-white flex flex-col font-sans selection:bg-[#00A9A5] selection:text-white relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0B3D91]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#00A9A5]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#FF8A3D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Security Header */}
      <header className="border-b border-white/10 bg-[#001428]/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-4">
          <HorizontalLogo size="md" variant="dark" />
          <div className="hidden sm:block h-6 w-px bg-white/15" />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300">
            <Lock className="w-3.5 h-3.5 text-[#00D2C4]" />
            <span>ENTERPRISE CONTROL MATRIX • ZERO-TRUST SSO</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>256-Bit HSM Protected</span>
          </span>

          <a
            href="http://localhost:3000"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-slate-200 transition-all font-bold cursor-pointer"
          >
            <span>Guest App</span>
            <ExternalLink className="w-3 h-3 text-[#FFC857]" />
          </a>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 z-10">
        <div className="w-full max-w-4xl space-y-6">
          {/* Guest Exclusion Policy Banner */}
          <div className="p-4 rounded-2xl bg-[#002444]/90 border border-[#00A9A5]/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[#FFC857] flex items-center justify-center shrink-0 border border-amber-500/40">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-xs leading-relaxed">
                <span className="font-black text-white block sm:inline">
                  Enterprise Platform Gate (Authorized Partners & Staff Only)
                </span>
                <span className="text-slate-300 block sm:inline sm:ml-1">
                  — Travelers & guests booking stays should use the customer portal.
                </span>
              </div>
            </div>

            <a
              href="http://localhost:3000"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-xs shadow hover:brightness-110 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Go to Guest Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Central Auth Matrix Card */}
          <div className="rounded-3xl bg-[#001830]/95 border border-white/15 shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Dual Gateway Selector Tabs */}
            <div className="grid grid-cols-2 p-2 bg-[#000E1C] border-b border-white/10 gap-2">
              <button
                type="button"
                onClick={() => setAuthTab('PARTNER')}
                className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  authTab === 'PARTNER'
                    ? 'bg-gradient-to-r from-[#0B3D91] via-[#002B4D] to-[#00A9A5] text-white shadow-lg border border-[#00D2C4]/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className={`w-4 h-4 ${authTab === 'PARTNER' ? 'text-[#00D2C4]' : 'text-slate-400'}`} />
                <span>1. Verified Partners Portal</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-[#00D2C4] font-mono">
                  HOTEL & FLEET
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAuthTab('EMPLOYEE')}
                className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  authTab === 'EMPLOYEE'
                    ? 'bg-gradient-to-r from-[#0B3D91] via-[#002B4D] to-[#FF8A3D] text-white shadow-lg border border-[#FF8A3D]/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${authTab === 'EMPLOYEE' ? 'text-[#FFC857]' : 'text-slate-400'}`} />
                <span>2. StaySphere Employee SSO</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-[#FFC857] font-mono">
                  STAFF MATRIX
                </span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Partner Portal Section */}
              {authTab === 'PARTNER' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                        <span>Partner Network Sovereign Authentication</span>
                        <Sparkles className="w-4 h-4 text-[#00D2C4]" />
                      </h2>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Dedicated portal for verified Luxury Hotel Owners, Chauffeur Fleet Leads, and Centurion B2B Concierge Partners.
                    </p>
                  </div>

                  {/* 1-Click Fast Verified Partner Login */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-[#00D2C4] uppercase tracking-wider block font-mono">
                      Fast 1-Click Authentication (Verified Partner Presets):
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {PARTNER_PRESETS.map((p) => {
                        const IconComponent = p.icon;
                        const isSelected = selectedPartnerPreset === p.role;
                        return (
                          <div
                            key={p.role}
                            onClick={() => {
                              setSelectedPartnerPreset(p.role);
                              setEmail(p.email);
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                              isSelected
                                ? `bg-[#002B4D] border-[#00A9A5] shadow-lg shadow-[#00A9A5]/20`
                                : 'bg-[#001326] border-white/10 hover:border-white/25 hover:bg-[#001E36]'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#00D2C4]">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-black/50 text-[#00D2C4] border border-[#00D2C4]/30">
                                  {p.badge}
                                </span>
                              </div>

                              <div>
                                <h3 className="text-xs font-black text-white group-hover:text-[#00D2C4] transition-colors">
                                  {p.name}
                                </h3>
                                <p className="text-[10px] text-slate-300 truncate mt-0.5">{p.entity}</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{p.email}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickPresetLogin(p.role);
                              }}
                              className="mt-3 w-full py-1.5 rounded-xl bg-gradient-to-r from-[#00A9A5] to-[#3CCF91] text-[#001428] font-black text-[11px] shadow hover:brightness-110 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Enter as Partner</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual Partner Credentials Form */}
                  <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-white/10 space-y-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Or Sign In with Registered Partner Credentials:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Partner Business Email</label>
                        <input
                          type="email"
                          value={email || 'anil.owner@vanaazure.com'}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="partner@estate.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#001326] border border-white/15 text-white text-xs outline-none focus:border-[#00D2C4] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Partner Access Key / Token</label>
                        <input
                          type="password"
                          value={password || '••••••••••••'}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="API / Security Token"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#001326] border border-white/15 text-white text-xs outline-none focus:border-[#00D2C4] transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Fingerprint className="w-4 h-4 text-[#00D2C4]" />
                        <span>Biometric & Hardware Key passkeys enabled</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isAuthenticating}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#0B3D91] via-[#00A9A5] to-[#3CCF91] text-white font-black text-xs shadow-xl shadow-[#00A9A5]/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isAuthenticating ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Verifying Partner Credentials...</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="w-4 h-4" />
                            <span>Authenticate Partner Session</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Employee SSO Section */}
              {authTab === 'EMPLOYEE' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                        <span>StaySphere Internal Staff & Leadership SSO</span>
                        <Sparkles className="w-4 h-4 text-[#FF8A3D]" />
                      </h2>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Restricted to authorized StaySphere team members (Relationship Managers, Frontdesk, Escrow Vault Custodians & Central Ops).
                    </p>
                  </div>

                  {/* 1-Click Fast Verified Employee Login */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-[#FF8A3D] uppercase tracking-wider block font-mono">
                      Fast 1-Click Authentication (StaySphere Staff Presets):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {EMPLOYEE_PRESETS.map((emp) => {
                        const IconComponent = emp.icon;
                        const isSelected = selectedEmployeePreset === emp.role;
                        return (
                          <div
                            key={emp.role}
                            onClick={() => {
                              setSelectedEmployeePreset(emp.role);
                              setEmail(emp.email);
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                              isSelected
                                ? `bg-[#002B4D] border-[#FF8A3D] shadow-lg shadow-[#FF8A3D]/20`
                                : 'bg-[#001326] border-white/10 hover:border-white/25 hover:bg-[#001E36]'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FFC857]">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-black/50 text-[#FFC857] border border-[#FFC857]/30">
                                  {emp.badge}
                                </span>
                              </div>

                              <div>
                                <h3 className="text-xs font-black text-white group-hover:text-[#FFC857] transition-colors">
                                  {emp.name}
                                </h3>
                                <p className="text-[10px] text-[#00D2C4] font-bold mt-0.5">{emp.title}</p>
                                <p className="text-[9px] text-slate-400 font-mono truncate mt-0.5">{emp.email}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickPresetLogin(emp.role);
                              }}
                              className="mt-3 w-full py-1.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-[11px] shadow hover:brightness-110 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Enter Staff Hub</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual Employee Credentials Form */}
                  <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-white/10 space-y-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Or Sign In via Corporate Okta / Google Workspace SSO:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-bold text-slate-300">Corporate Email (@staysphere.io)</label>
                        <input
                          type="email"
                          value={email || 'vikram.rm@staysphere.io'}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="staff@staysphere.io"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#001326] border border-white/15 text-white text-xs outline-none focus:border-[#FF8A3D] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-bold text-slate-300">Security PIN / Password</label>
                        <input
                          type="password"
                          value={password || '••••••••••••'}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Employee PIN"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#001326] border border-white/15 text-white text-xs outline-none focus:border-[#FF8A3D] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-bold text-slate-300">2FA Authenticator Code</label>
                        <input
                          type="text"
                          value={twoFactorCode || '849-204'}
                          onChange={(e) => setTwoFactorCode(e.target.value)}
                          placeholder="6-digit code"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#001326] border border-white/15 text-white text-xs outline-none focus:border-[#FF8A3D] transition-all font-mono text-center tracking-widest"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-[#3CCF91]" />
                        <span>YubiKey FIDO2 & Okta SSO Connected</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isAuthenticating}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#0B3D91] via-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-xs shadow-xl shadow-[#FF8A3D]/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isAuthenticating ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Validating Corporate SSO...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>Authenticate Staff Session</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Footer Trust Ticker */}
            <div className="px-6 py-4 bg-[#000B17] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero-Trust RBAC Policy: Strict Role Isolation Active</span>
              </div>
              <div>
                <span>StaySphere Journey Platform v3.5 • Enterprise Security Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
