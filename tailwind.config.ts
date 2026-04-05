import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Akhand Bharat Cultural Palette ─────────────────────────────
        background: '#1C1A17',       // dark earthy tone
        surface: '#2A2520',          // warm dark surface
        surfaceHover: '#362F28',     // hover: slightly lighter
        primary: '#FF9933',          // saffron
        secondary: '#8B0000',        // deep red (sindoor)
        accent: '#D2B48C',           // sand / parchment
        textPrimary: '#F0E6D3',      // warm white (parchment light)
        textSecondary: '#A89882',     // muted sand
        border: '#3D352D',           // earthy border
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        devanagari: ['Noto Serif Devanagari', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
