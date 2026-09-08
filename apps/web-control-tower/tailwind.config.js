/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui-kit/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Official Brand Primary Colors
        'deep-ocean': '#0B3D91',
        'teal': '#00A9A5',

        // Official Brand Accent Colors
        'sunset-orange': '#FF8A3D',
        'warm-yellow': '#FFC857',
        'nature-green': '#3CCF91',
        'sky-gray': '#E9EEF3',

        // Typography & Backgrounds
        'text-dark': '#0B3D91',
        'text-muted': '#666666',
        'bg-dark': '#001A33',

        // Component & Icon Pillars
        'pillar-stay': '#0B3D91',
        'pillar-move': '#00A9A5',
        'pillar-explore': '#FF8A3D',
        'pillar-support': '#FFC857',
        'pillar-together': '#3CCF91',

        brand: {
          deepOcean: '#0B3D91',
          teal: '#00A9A5',
          sunsetOrange: '#FF8A3D',
          warmYellow: '#FFC857',
          natureGreen: '#3CCF91',
          skyGray: '#E9EEF3',
          dark: '#001A33',
        },
      },
    },
  },
  plugins: [],
};
