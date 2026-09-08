'use client';

import { useState } from 'react';
import {
  X,
  Crown,
  ShieldCheck,
  Sparkles,
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Car,
  Hotel,
  KeyRound,
  Award,
  Star,
  QrCode,
  LogOut,
  ChevronRight,
  Sparkle,
  Compass,
  Zap,
} from 'lucide-react';

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  loyaltyTier: 'Silver Smart' | 'Gold Signature' | 'Platinum Sovereign';
  tierLevel: 1 | 2 | 3;
  loyaltyPoints: number;
  completedStays: number;
  upcomingTripsCount: number;
  memberSince: string;
  membershipId: string;
  preferredClass: 'comfort' | 'premium' | 'luxe';
  preferredVehicle: 'sedan' | 'comfort_mpv' | 'electric' | 'defender' | 'maybach';
  savedPreferences: {
    dietary: string;
    roomTemp: number;
    chauffeurNotes: string;
  };
}

export const FREQUENT_GUEST_PRESETS: CustomerUser[] = [
  {
    id: 'user-selva',
    fullName: 'Dr. Selva Murugan',
    email: 'selva.m@staysphere.com',
    phone: '+91 98401 23456',
    loyaltyTier: 'Platinum Sovereign',
    tierLevel: 3,
    loyaltyPoints: 4850,
    completedStays: 12,
    upcomingTripsCount: 1,
    memberSince: 'Oct 2024',
    membershipId: 'SS-SOV-8802',
    preferredClass: 'luxe',
    preferredVehicle: 'maybach',
    savedPreferences: {
      dietary: 'Fresh Coastal Seafood & Sparkling Mineral Water',
      roomTemp: 21,
      chauffeurNotes: 'Prefers quiet ride, terminal VIP pickup lane, chilled sparkling water.',
    },
  },
  {
    id: 'user-ananya',
    fullName: 'Ananya Roy',
    email: 'ananya.roy@voyage.in',
    phone: '+91 98200 98765',
    loyaltyTier: 'Gold Signature',
    tierLevel: 2,
    loyaltyPoints: 2400,
    completedStays: 6,
    upcomingTripsCount: 1,
    memberSince: 'Jan 2025',
    membershipId: 'SS-SIG-5104',
    preferredClass: 'premium',
    preferredVehicle: 'electric',
    savedPreferences: {
      dietary: 'Artisanal Plant-Based & Oat Milk Latte',
      roomTemp: 22,
      chauffeurNotes: 'Prefers Executive EV Sedan, soft ambient lounge music.',
    },
  },
  {
    id: 'user-vikram',
    fullName: 'Vikram Mehta',
    email: 'vikram.m@techventures.co',
    phone: '+91 98110 54321',
    loyaltyTier: 'Silver Smart',
    tierLevel: 1,
    loyaltyPoints: 850,
    completedStays: 3,
    upcomingTripsCount: 0,
    memberSince: 'May 2025',
    membershipId: 'SS-SMT-2099',
    preferredClass: 'comfort',
    preferredVehicle: 'sedan',
    savedPreferences: {
      dietary: 'Traditional Vegetarian Breakfast',
      roomTemp: 23,
      chauffeurNotes: 'Prompt airport connection, highway route priority.',
    },
  },
];

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CustomerUser | null;
  onLogin: (user: CustomerUser) => void;
  onLogout: () => void;
  theme?: 'dark' | 'pearl';
  initialMode?: 'signin' | 'register' | 'profile';
}

export function CustomerAuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  theme = 'pearl',
  initialMode = 'signin',
}: CustomerAuthModalProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'register' | 'otp' | 'profile'>(
    currentUser ? 'profile' : initialMode
  );
  const [loginIdentifier, setLoginIdentifier] = useState('selva.m@staysphere.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPreferredClass, setRegPreferredClass] = useState<'comfort' | 'premium' | 'luxe'>('premium');
  const [regPassword, setRegPassword] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickPresetLogin = (preset: CustomerUser) => {
    onLogin(preset);
    setSuccessToast(`Welcome back, ${preset.fullName}! Sovereign Privileges active.`);
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 1200);
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Match preset or create user
    const found = FREQUENT_GUEST_PRESETS.find(
      (p) => p.email.toLowerCase() === loginIdentifier.toLowerCase() || p.phone === loginIdentifier
    );
    const userToLogin: CustomerUser = found || {
      id: `user-${Date.now()}`,
      fullName: loginIdentifier.split('@')[0].replace('.', ' ').toUpperCase(),
      email: loginIdentifier,
      phone: '+91 98000 11223',
      loyaltyTier: 'Silver Smart',
      tierLevel: 1,
      loyaltyPoints: 500,
      completedStays: 1,
      upcomingTripsCount: 0,
      memberSince: 'Just now',
      membershipId: `SS-SMT-${Math.floor(1000 + Math.random() * 9000)}`,
      preferredClass: 'comfort',
      preferredVehicle: 'sedan',
      savedPreferences: {
        dietary: 'Standard Continental',
        roomTemp: 22,
        chauffeurNotes: 'Standard transfer',
      },
    };
    onLogin(userToLogin);
    setSuccessToast(`Signed in successfully as ${userToLogin.fullName}`);
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 1100);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regEmail.trim()) return;

    const newUser: CustomerUser = {
      id: `user-${Date.now()}`,
      fullName: regFullName,
      email: regEmail,
      phone: regPhone || '+91 99999 88888',
      loyaltyTier: 'Silver Smart',
      tierLevel: 1,
      loyaltyPoints: 1000, // Welcome bonus!
      completedStays: 0,
      upcomingTripsCount: 0,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      membershipId: `SS-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
      preferredClass: regPreferredClass,
      preferredVehicle: regPreferredClass === 'luxe' ? 'maybach' : regPreferredClass === 'premium' ? 'comfort_mpv' : 'sedan',
      savedPreferences: {
        dietary: 'Chef Curated Special',
        roomTemp: 22,
        chauffeurNotes: 'Welcome guest preference',
      },
    };

    onLogin(newUser);
    setSuccessToast('Sphere Club account created! 1,000 Welcome Points credited.');
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 1300);
  };

  const isPearl = theme === 'pearl';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl transition-all border my-8 ${
          isPearl
            ? 'bg-white/95 text-[#001E3D] border-[#D4AF37]/35 shadow-[0_25px_60px_-15px_rgba(11,61,145,0.12)]'
            : 'bg-[#001830]/95 text-slate-100 border-[#FFC857]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Success Toast Notification */}
        {successToast && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 flex items-center gap-2.5 text-xs font-bold animate-fade-in shadow-md">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                isPearl
                  ? 'bg-gradient-to-br from-[#0B3D91] to-[#00A9A5] text-white'
                  : 'bg-gradient-to-br from-[#FF8A3D] to-[#FFC857] text-[#001428]'
              }`}
            >
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-xl font-serif-luxury font-bold ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                  {currentUser && authMode === 'profile'
                    ? 'Sphere Club Sovereign Portal'
                    : authMode === 'register'
                    ? 'Join Sphere Club Membership'
                    : 'Customer & Frequent Guest Login'}
                </h2>
              </div>
              <p className={`text-xs ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
                {currentUser && authMode === 'profile'
                  ? 'Manage your loyalty tier, saved preferences, and synchronized journeys'
                  : 'Access exclusive member rates, chauffeur telemetry, and 15-min resolution'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPearl ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Navigation Tabs */}
        {!currentUser && (
          <div
            className={`flex items-center p-1 rounded-2xl mb-6 border ${
              isPearl ? 'bg-slate-100 border-slate-200' : 'bg-[#000E1C] border-white/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'signin'
                  ? isPearl
                    ? 'bg-white text-[#001E3D] shadow-sm'
                    : 'bg-[#002B4D] text-white shadow-md'
                  : isPearl
                  ? 'text-slate-500 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Frequent Guest Sign-In</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'register'
                  ? isPearl
                    ? 'bg-white text-[#001E3D] shadow-sm'
                    : 'bg-[#002B4D] text-white shadow-md'
                  : isPearl
                  ? 'text-slate-500 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>New Guest Register (1k Pts)</span>
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: SIGN IN MODE & ONE-CLICK FREQUENT PRESETS             */}
        {/* ------------------------------------------------------------- */}
        {authMode === 'signin' && !currentUser && (
          <div className="space-y-6">
            {/* Quick 1-Click Frequent Guest Presets */}
            <div
              className={`p-4 rounded-2xl border ${
                isPearl
                  ? 'bg-gradient-to-br from-amber-50/70 to-slate-50 border-amber-200/80'
                  : 'bg-gradient-to-br from-[#002B4D]/60 to-[#001428] border-[#FFC857]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${isPearl ? 'text-[#001E3D]' : 'text-[#FFC857]'}`}>
                    Quick Select Frequent Guest Profile
                  </span>
                </div>
                <span className={`text-[11px] font-semibold ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
                  Instant 1-Click Demo Login
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {FREQUENT_GUEST_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleQuickPresetLogin(preset)}
                    className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between group ${
                      isPearl
                        ? 'bg-white hover:border-[#D4AF37] hover:shadow-md border-slate-200'
                        : 'bg-[#001830] hover:border-[#FFC857] hover:shadow-lg border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-xs font-bold truncate ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                          {preset.fullName}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-black shrink-0 ${
                            preset.tierLevel === 3
                              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                              : preset.tierLevel === 2
                              ? 'bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30'
                              : 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {preset.loyaltyTier.split(' ')[0]}
                        </span>
                      </div>
                      <div className={`text-[10px] ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>
                        {preset.loyaltyPoints.toLocaleString()} Pts • {preset.completedStays} Stays
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-[#00A9A5] font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>Select & Sign In</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Form Login */}
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                  Registered Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. selva.m@staysphere.com or +91 98401 23456"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all border ${
                      isPearl
                        ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91] focus:bg-white'
                        : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`block text-xs font-bold ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                    Password or Sphere PIN
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(true);
                      setSuccessToast('Instant 6-digit OTP dispatched to your registered device: 789042');
                    }}
                    className="text-[11px] text-[#00A9A5] hover:underline font-bold"
                  >
                    Use Instant 1-Click OTP
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all border ${
                      isPearl
                        ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91] focus:bg-white'
                        : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
                    }`}
                  />
                </div>
              </div>

              {otpSent && (
                <div
                  className={`p-3 rounded-xl border animate-fade-in ${
                    isPearl ? 'bg-teal-50 border-teal-200 text-[#001E3D]' : 'bg-teal-950/40 border-teal-500/30 text-teal-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#00A9A5]" />
                      Enter 6-Digit SMS / WhatsApp Code
                    </span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">Demo OTP: 789042</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="789042"
                    className={`w-full px-3 py-2 rounded-lg text-sm font-mono tracking-widest text-center border ${
                      isPearl ? 'bg-white border-teal-300 text-[#001E3D]' : 'bg-[#001428] border-teal-500/50 text-white'
                    }`}
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 ${
                  isPearl
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-blue-950/10'
                    : 'bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] shadow-orange-950/30'
                }`}
              >
                <span>Access Customer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: NEW GUEST REGISTRATION (SPHERE CLUB ONBOARDING)       */}
        {/* ------------------------------------------------------------- */}
        {authMode === 'register' && !currentUser && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div
              className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isPearl ? 'bg-amber-50/80 border-amber-200 text-[#001E3D]' : 'bg-[#002B4D]/70 border-[#FFC857]/40 text-white'
              }`}
            >
              <Award className="w-6 h-6 text-[#D4AF37] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#D4AF37]">Sphere Club Welcome Privilege: </span>
                <span>Get <strong>1,000 Sphere Reward Points</strong> instantly credited to your portfolio upon registration!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border ${
                      isPearl
                        ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91] focus:bg-white'
                        : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`block text-xs font-bold ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                  Mobile Number (With Country Code)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border ${
                      isPearl
                        ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91] focus:bg-white'
                        : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`block text-xs font-bold ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                Email Address for Itinerary Dispatches
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ramesh.chandra@gmail.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border ${
                    isPearl
                      ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91] focus:bg-white'
                      : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`block text-xs font-bold ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                Preferred Travel Tier & Stay Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'comfort', label: 'Smart & Comfort', range: '₹1.8k–₹3.8k' },
                  { id: 'premium', label: 'Premium Select', range: '₹5.5k–₹10.5k' },
                  { id: 'luxe', label: 'Signature Luxe', range: '₹28k–₹65k+' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setRegPreferredClass(tier.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      regPreferredClass === tier.id
                        ? isPearl
                          ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-sm'
                          : 'bg-[#00A9A5] text-[#001428] font-black border-[#00D2C4]'
                        : isPearl
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#000E1C] border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-xs font-bold">{tier.label}</div>
                    <div className="text-[10px] opacity-80">{tier.range}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`block text-xs font-bold ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                Create Secure Account Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 8 characters with numbers & symbols"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border ${
                    isPearl
                      ? 'bg-slate-50 border-slate-200 text-[#001E3D] focus:border-[#0B3D91] focus:bg-white'
                      : 'bg-[#000E1C] border-white/15 text-white focus:border-[#00D2C4]'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 ${
                isPearl
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-blue-950/10'
                  : 'bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] shadow-orange-950/30'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Create Account & Claim 1,000 Bonus Points</span>
            </button>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: AUTHENTICATED CUSTOMER PORTAL & LOYALTY CARD          */}
        {/* ------------------------------------------------------------- */}
        {currentUser && (
          <div className="space-y-6">
            {/* Digital Sphere Club Sovereign Card */}
            <div
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 shadow-2xl border ${
                isPearl
                  ? 'bg-gradient-to-br from-[#001E3D] via-[#0B3D91] to-[#002B4D] text-white border-[#D4AF37]/50'
                  : 'bg-gradient-to-br from-[#081B34] via-[#000B17] to-[#001F3F] text-white border-[#FFC857]/40'
              }`}
            >
              {/* Metallic Gold Sheen Backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.22),transparent_60%)] pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-4 h-4 text-[#FFC857]" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#FFC857]">
                      StaySphere Sovereign Membership
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white tracking-tight">
                    {currentUser.fullName}
                  </h3>
                  <div className="font-mono text-xs text-slate-300 mt-0.5">
                    Member ID: <strong className="text-white">{currentUser.membershipId}</strong>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/40 inline-block shadow-sm">
                    {currentUser.loyaltyTier}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">Since {currentUser.memberSince}</div>
                </div>
              </div>

              {/* Points Balance & Key Perks Bar */}
              <div className="relative z-10 grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div>
                  <div className="text-[10px] text-slate-300 font-semibold uppercase">Sphere Reward Points</div>
                  <div className="text-lg font-black text-[#FFC857]">{currentUser.loyaltyPoints.toLocaleString()} <span className="text-xs font-normal">pts</span></div>
                  <div className="text-[9px] text-emerald-400">≈ ₹{currentUser.loyaltyPoints} redeemable</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-300 font-semibold uppercase">Completed Stays</div>
                  <div className="text-lg font-black text-white">{currentUser.completedStays} <span className="text-xs font-normal">stays</span></div>
                  <div className="text-[9px] text-teal-300">100% Verified SLA</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-300 font-semibold uppercase">Active Priority SLA</div>
                  <div className="text-lg font-black text-[#00D2C4]">15 Min</div>
                  <div className="text-[9px] text-slate-300">Guaranteed Escrow</div>
                </div>
              </div>
            </div>

            {/* Saved Customer Preferences */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#000E1C] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold uppercase tracking-wider ${isPearl ? 'text-[#001E3D]' : 'text-slate-200'}`}>
                  Saved Sovereign Concierge Preferences
                </span>
                <span className="text-[10px] text-[#00A9A5] font-bold">Auto-applied to new bookings</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className={`p-2.5 rounded-xl border ${isPearl ? 'bg-white border-slate-200' : 'bg-[#001830] border-white/5'}`}>
                  <div className="text-[10px] text-slate-400 font-bold mb-0.5">Dining & In-Suite Refreshments</div>
                  <div className={`font-semibold ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>{currentUser.savedPreferences.dietary}</div>
                </div>
                <div className={`p-2.5 rounded-xl border ${isPearl ? 'bg-white border-slate-200' : 'bg-[#001830] border-white/5'}`}>
                  <div className="text-[10px] text-slate-400 font-bold mb-0.5">Preferred Chauffeur & Climate</div>
                  <div className={`font-semibold ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>
                    {currentUser.preferredVehicle.toUpperCase()} • Room: {currentUser.savedPreferences.roomTemp}°C
                  </div>
                </div>
              </div>
            </div>

            {/* Switch Preset or Logout */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`text-xs font-bold underline cursor-pointer ${isPearl ? 'text-[#0B3D91]' : 'text-[#00D2C4]'}`}
              >
                Switch to Another Frequent Guest Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setSuccessToast('Signed out of Sovereign Portal');
                  setTimeout(() => {
                    setSuccessToast(null);
                    onClose();
                  }, 900);
                }}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
