/**
 * StaySphere Brand Taglines, Pillar Definitions, and Constants
 */

export const APP_NAME = 'StaySphere';

// Brand Messaging Guidelines
export const PRIMARY_TAGLINE = 'Stay. Move. Experience.';
export const SUB_TAGLINE = 'Your Journey. Our Priority.';
export const SECONDARY_MESSAGE = 'More than a booking. A better journey.';
export const FOOTER_TAGLINE = 'People. Places. Possibilities. / A BRIGHTER JOURNEY AHEAD';
export const BRAND_TAGLINE = 'Stay. Move. Experience. We’ve Got You Covered.';

// Service Pillars & Component Icon Styles
export const BRAND_PILLARS = {
  STAY: {
    id: 'stay',
    name: 'Stay',
    color: '#0B3D91',
    accentClass: 'text-[#0B3D91]',
    bgClass: 'bg-[#0B3D91]',
    borderClass: 'border-[#0B3D91]',
    description: 'Accommodations, hotels, and luxury bookings',
    badge: 'STAY',
  },
  MOVE: {
    id: 'move',
    name: 'Move',
    color: '#00A9A5',
    accentClass: 'text-[#00A9A5]',
    bgClass: 'bg-[#00A9A5]',
    borderClass: 'border-[#00A9A5]',
    description: 'Airport transfers, cab rentals, and transit mobility',
    badge: 'MOVE',
  },
  EXPLORE: {
    id: 'explore',
    name: 'Explore',
    color: '#FF8A3D',
    accentClass: 'text-[#FF8A3D]',
    bgClass: 'bg-[#FF8A3D]',
    borderClass: 'border-[#FF8A3D]',
    description: 'Curated experiences, activities, and trip planners',
    badge: 'EXPLORE',
  },
  SUPPORT: {
    id: 'support',
    name: 'Support',
    color: '#FFC857',
    accentClass: 'text-[#FFC857]',
    bgClass: 'bg-[#FFC857]',
    borderClass: 'border-[#FFC857]',
    description: '24/7 dedicated customer service and SLA dispute resolution',
    badge: 'SUPPORT',
  },
  TOGETHER: {
    id: 'together',
    name: 'Together',
    color: '#3CCF91',
    accentClass: 'text-[#3CCF91]',
    bgClass: 'bg-[#3CCF91]',
    borderClass: 'border-[#3CCF91]',
    description: 'Community features, group bookings, and loyalty rewards',
    badge: 'TOGETHER',
  },
} as const;

export const SLA_BADGES = {
  P0_CRITICAL: { label: 'P0 - Critical (10m SLA)', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
  P1_HIGH: { label: 'P1 - High (30m SLA)', color: 'bg-[#FF8A3D]/10 text-[#FF8A3D] border-[#FF8A3D]/30' },
  P2_MEDIUM: { label: 'P2 - Medium (2h SLA)', color: 'bg-[#00A9A5]/10 text-[#00A9A5] border-[#00A9A5]/30' },
  P3_LOW: { label: 'P3 - Low (24h SLA)', color: 'bg-slate-500/10 text-slate-400 border-slate-500/30' },
} as const;
