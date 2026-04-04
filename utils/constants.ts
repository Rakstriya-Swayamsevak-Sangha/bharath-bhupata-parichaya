// Map configuration constants
export const MAP_CONFIG = {
  CENTER: [20.5937, 78.9629] as [number, number],
  INITIAL_ZOOM: 5,
  MIN_ZOOM: 4,
  MAX_ZOOM: 15,
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
} as const;

// Category configuration
export const CATEGORY_CONFIG = {
  mountain: {
    label: 'Mountains',
    icon: '🏔️',
    color: '#4A90A4',
  },
  river: {
    label: 'Rivers',
    icon: '🌊',
    color: '#3B82F6',
  },
  temple: {
    label: 'Temples',
    icon: '🛕',
    color: '#E07A3C',
  },
} as const;

// Theme colors
export const THEME = {
  background: '#1a1a1a',
  surface: '#252525',
  surfaceHover: '#2f2f2f',
  primary: '#E07A3C',
  secondary: '#D4AF37',
  textPrimary: '#F5F5F5',
  textSecondary: '#A0A0A0',
  border: '#333333',
} as const;
