/**
 * StaySphere Official Brand Theme & Color Tokens
 */

export const BRAND_COLORS = {
  // Brand Primary Colors
  deepOcean: '#0B3D91',
  teal: '#00A9A5',

  // Brand Accent Colors
  sunsetOrange: '#FF8A3D',
  warmYellow: '#FFC857',
  natureGreen: '#3CCF91',
  skyGray: '#E9EEF3',

  // Typography / Core Messaging Colors
  textDark: '#0B3D91',
  textMuted: '#666666',
  bgDark: '#001A33', // For Dark Mode backgrounds matching the dark logo option
} as const;

export const PILLAR_COLORS = {
  stay: '#0B3D91', // Deep Ocean: Accommodations, hotels, and bookings
  move: '#00A9A5', // Teal: Car rentals, flights, transit
  explore: '#FF8A3D', // Sunset Orange: Activities, locations, trip planners
  support: '#FFC857', // Warm Yellow: Customer service, resolution desk & help centers
  together: '#3CCF91', // Nature Green: Community features, group trips, rewards
} as const;

export const STAYSPHERE_COLORS = {
  ...BRAND_COLORS,
  pillar: PILLAR_COLORS,
  primary: {
    50: '#eef8ff',
    100: '#d8eeff',
    500: '#00A9A5', // Teal
    600: '#0B3D91', // Deep Ocean
    700: '#082d6b',
    900: '#001A33', // Dark BG
  },
  accent: {
    sunsetOrange: '#FF8A3D',
    warmYellow: '#FFC857',
    natureGreen: '#3CCF91',
    skyGray: '#E9EEF3',
    amber: '#FFC857',
    emerald: '#3CCF91',
    rose: '#FF8A3D',
  },
  neutral: {
    darkBg: '#001A33',
    cardDark: '#002244',
    borderDark: 'rgba(255, 255, 255, 0.1)',
    textMuted: '#666666',
    skyGray: '#E9EEF3',
  },
} as const;
