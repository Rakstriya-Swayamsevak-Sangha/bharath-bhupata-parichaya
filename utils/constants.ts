import L from 'leaflet';

// ─── Akhand Bharat Geographic Bounds ────────────────────────────────────────
// Southwest: [4.5°N, 58.0°E]  Northeast: [37.5°N, 97.5°E]
// Using L.latLngBounds directly — eliminates all LatLngBoundsExpression cast issues.
export const AKHAND_BHARAT_BOUNDS = L.latLngBounds(
  [4.5, 58.0],   // SW
  [37.5, 97.5],   // NE
);

// ─── Map Engine Configuration ───────────────────────────────────────────────
// Single source of truth. No duplicate constants.
export const MAP_CONFIG = {
  CENTER: [21.0, 78.0] as [number, number],

  // Zoom — half-step snapping for precision
  MIN_ZOOM: 4.5,
  MAX_ZOOM: 7,
  ZOOM_SNAP: 0.5,
  ZOOM_DELTA: 0.5,

  // Bounds lock
  MAX_BOUNDS_VISCOSITY: 1.0,

  // World continuity disabled
  WORLD_COPY_JUMP: false,

  // Tile layer
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  TILE_ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  TILE_NO_WRAP: true,
  TILE_KEEP_BUFFER: 2,
} as const;

// ─── Category Configuration ─────────────────────────────────────────────────
export const CATEGORY_CONFIG = {
  mountain: { label: 'Mountains', icon: '🏔️', color: '#4A90A4' },
  river:    { label: 'Rivers',    icon: '🌊', color: '#3B82F6' },
  temple:   { label: 'Temples',   icon: '🛕', color: '#E07A3C' },
} as const;

// ─── Theme Colors ───────────────────────────────────────────────────────────
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
