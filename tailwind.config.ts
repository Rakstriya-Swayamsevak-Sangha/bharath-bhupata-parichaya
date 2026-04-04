import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        surface: '#252525',
        surfaceHover: '#2f2f2f',
        primary: '#E07A3C',
        secondary: '#D4AF37',
        textPrimary: '#F5F5F5',
        textSecondary: '#A0A0A0',
        border: '#333333',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
