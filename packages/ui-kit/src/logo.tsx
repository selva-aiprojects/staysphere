import React from 'react';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
}

/**
 * AppIcon (SVG Vector):
 * Ultra-luxurious glassmorphic sphere emblem with orbital rings, 
 * deep ocean gradients, and sunset gold light accents.
 */
export const AppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  const uid = React.useId().replace(/:/g, '');
  const gradOcean = `ss-ocean-${uid}`;
  const gradRing = `ss-ring-${uid}`;
  const gradSun = `ss-sun-${uid}`;
  const gradGlass = `ss-glass-${uid}`;
  const filterGlow = `ss-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="StaySphere Sphere Emblem"
    >
      <defs>
        {/* Deep Ocean Primary Sphere Gradient */}
        <radialGradient id={gradOcean} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#00D2C4" />
          <stop offset="35%" stopColor="#00A9A5" />
          <stop offset="70%" stopColor="#0B3D91" />
          <stop offset="100%" stopColor="#001428" />
        </radialGradient>

        {/* Dynamic Orbital Light Ring Gradient */}
        <linearGradient id={gradRing} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC857" />
          <stop offset="40%" stopColor="#FF8A3D" />
          <stop offset="70%" stopColor="#00D2C4" />
          <stop offset="100%" stopColor="#3CCF91" />
        </linearGradient>

        {/* Sunset Glow Light Source */}
        <radialGradient id={gradSun} cx="70%" cy="25%" r="50%">
          <stop offset="0%" stopColor="#FFC857" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF8A3D" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF8A3D" stopOpacity="0" />
        </radialGradient>

        {/* Glass Sheen Gradient */}
        <linearGradient id={gradGlass} x1="20%" y1="10%" x2="60%" y2="90%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Ambient Drop Glow Filter */}
        <filter id={filterGlow} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Outer Halo */}
      <circle cx="40" cy="40" r="36" fill="#00A9A5" fillOpacity="0.12" filter={`url(#${filterGlow})`} />

      {/* Main Glassmorphic Sphere */}
      <circle cx="40" cy="40" r="30" fill={`url(#${gradOcean})`} />

      {/* Dynamic Elliptical Orbit 1 (Journey Trajectory) */}
      <ellipse
        cx="40"
        cy="40"
        rx="34"
        ry="14"
        transform="rotate(-28 40 40)"
        stroke={`url(#${gradRing})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="140 18"
      />

      {/* Dynamic Elliptical Orbit 2 (Counter-Orbit Ring) */}
      <ellipse
        cx="40"
        cy="40"
        rx="32"
        ry="11"
        transform="rotate(35 40 40)"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1.8"
        strokeDasharray="60 30"
      />

      {/* Golden Sunset Light Overlay on top-right */}
      <circle cx="40" cy="40" r="30" fill={`url(#${gradSun})`} />

      {/* Sphere Gloss / Specular Sheen (Curved Top Crest) */}
      <path
        d="M20 28 C 26 18, 54 18, 60 28 C 52 24, 28 24, 20 28 Z"
        fill={`url(#${gradGlass})`}
      />

      {/* Central "S" Ribbon Curve (Harmonious StaySphere Fusion) */}
      <path
        d="M48 27 C 44 23 37 23 34 26 C 30 29.5 32 35 44 38 C 53 40.5 54 48 47 52.5 C 41 56 33 54.5 28 49"
        stroke="#FFFFFF"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Golden Orbital Satellite Nodes */}
      <circle cx="64" cy="27" r="3.2" fill="#FFC857" filter={`url(#${filterGlow})`} />
      <circle cx="16" cy="53" r="2.4" fill="#3CCF91" />
    </svg>
  );
};

/**
 * EmblemImageLogo:
 * Renders the high-resolution generated 3D brand emblem asset.
 */
export const EmblemImageLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 44,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden shadow-lg shadow-[#00A9A5]/25 border border-white/20 bg-[#001428] shrink-0 ${className}`}
    >
      <img
        src="/brand/staysphere_emblem.jpg"
        alt="StaySphere Luxury Emblem"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = 'none';
        }}
      />
    </div>
  );
};

/**
 * HorizontalLogo:
 * Renders "StaySphere" as a single continuous word with distinct brand coloration.
 */
export const HorizontalLogo: React.FC<LogoProps & { useImageEmblem?: boolean }> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showTagline = false,
  useImageEmblem = false,
}) => {
  const sizeMap = {
    sm: { icon: 30, text: 'text-lg', badge: 'text-[9px]', sub: 'text-[9px]' },
    md: { icon: 40, text: 'text-2xl', badge: 'text-[10px]', sub: 'text-[10px]' },
    lg: { icon: 48, text: 'text-3xl', badge: 'text-xs', sub: 'text-xs' },
    xl: { icon: 60, text: 'text-4xl', badge: 'text-xs', sub: 'text-sm' },
  };

  const { icon, text, sub } = sizeMap[size];
  const stayTextColor = variant === 'light' ? 'text-[#0B3D91]' : 'text-white';
  const taglineColor = variant === 'light' ? 'text-[#666666]' : 'text-slate-400';

  return (
    <div className={`inline-flex items-center gap-3 font-sans select-none cursor-pointer ${className}`}>
      {useImageEmblem ? <EmblemImageLogo size={icon} /> : <AppIcon size={icon} />}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-tight ${text} inline-flex items-center whitespace-nowrap`}>
          <span className={stayTextColor}>Stay</span><span className="text-[#00A9A5] bg-gradient-to-r from-[#00D2C4] via-[#00A9A5] to-[#3CCF91] bg-clip-text text-transparent">Sphere</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF8A3D] ml-1.5 self-center animate-pulse" />
        </div>
        {showTagline ? (
          <span className={`tracking-widest uppercase font-semibold text-[#FF8A3D] ${sub} mt-1`}>
            Stay • Move • Experience
          </span>
        ) : (
          <span className={`tracking-widest uppercase font-medium ${taglineColor} ${sub} mt-1 opacity-80`}>
            Luxury Journey Escrow
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * StackedLogo:
 * Central branding with "StaySphere" as a single continuous word.
 */
export const StackedLogo: React.FC<LogoProps & { useImageEmblem?: boolean }> = ({
  className = '',
  size = 'lg',
  showTagline = true,
  variant = 'dark',
  useImageEmblem = false,
}) => {
  const iconSize = size === 'xl' ? 84 : size === 'lg' ? 68 : size === 'md' ? 52 : 38;
  const textSize = size === 'xl' ? 'text-4xl md:text-5xl' : size === 'lg' ? 'text-3xl md:text-4xl' : 'text-2xl';
  const stayTextColor = variant === 'light' ? 'text-[#0B3D91]' : 'text-white';

  return (
    <div className={`flex flex-col items-center text-center font-sans ${className}`}>
      <div className="relative mb-4 group">
        <div className="absolute -inset-2 bg-gradient-to-r from-[#00A9A5] via-[#FF8A3D] to-[#FFC857] rounded-full blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
        {useImageEmblem ? (
          <EmblemImageLogo size={iconSize} className="relative shadow-2xl" />
        ) : (
          <AppIcon size={iconSize} className="relative drop-shadow-2xl" />
        )}
      </div>
      <div className={`font-black tracking-tight ${textSize} leading-none mb-1 inline-flex items-center justify-center whitespace-nowrap`}>
        <span className={stayTextColor}>Stay</span><span className="bg-gradient-to-r from-[#00D2C4] via-[#00A9A5] to-[#3CCF91] bg-clip-text text-transparent">Sphere</span>
        <span className="inline-block w-2 h-2 rounded-full bg-[#FF8A3D] ml-2 self-center animate-bounce" />
      </div>
      {showTagline && (
        <div className="flex items-center gap-2 mt-2">
          <span className="h-[1px] w-6 bg-[#FF8A3D]/40" />
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-[#FF8A3D]">
            Stay. Move. Experience.
          </span>
          <span className="h-[1px] w-6 bg-[#FF8A3D]/40" />
        </div>
      )}
    </div>
  );
};

/**
 * LogoOnDark:
 * Reversed-out layout for dark mode applications or deep blue footers (#001428 / #001A33).
 */
export const LogoOnDark: React.FC<LogoProps> = (props) => {
  return <HorizontalLogo {...props} variant="dark" />;
};
