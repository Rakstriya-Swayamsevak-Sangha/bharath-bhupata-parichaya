// NOTE: Leaflet-dependent exports (AKHAND_BHARAT_BOUNDS) have been moved
// to utils/mapBounds.ts to keep this file SSR-safe.

// ─── Parchment Texture Overlay ──────────────────────────────────────────────
export const PARCHMENT_TEXTURE_URL = '/parchment-texture.png';

// ─── Map Engine Configuration ───────────────────────────────────────────────
export const MAP_CONFIG = {
  CENTER: [19.0, 80.0] as [number, number],

  // Zoom
  MIN_ZOOM: 4,
  MAX_ZOOM: 10,
  ZOOM_SNAP: 0.5,
  ZOOM_DELTA: 0.5,

  // Bounds lock — viscosity 1.0 = hard wall
  MAX_BOUNDS_VISCOSITY: 1.0,

  // World continuity disabled — single region view
  WORLD_COPY_JUMP: false,

  // Tile layer — CartoDB Positron (will be sepia-filtered via CSS)
  TILE_URL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  TILE_ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  TILE_NO_WRAP: true,
} as const;

// ─── Category Configuration — Earthy cultural icons ─────────────────────────
// SVG-based markers that blend with the parchment aesthetic
export const CATEGORY_CONFIG = {
  mountain: {
    label: 'Parvat',
    labelEn: 'Mountains',
    icon: '▲',
    color: '#7B6B4F',  // dark earth / stone
    markerBg: '#5C4E3A',
  },
  river: {
    label: 'Nadi',
    labelEn: 'Rivers',
    icon: '〰',
    color: '#4A7C8B',  // river blue-grey (aged)
    markerBg: '#3A6270',
  },
  temple: {
    label: 'Sacred City',
    labelEn: 'Sacred Cities',
    labelKn: 'ಪುಣ್ಯ ನಗರಗಳು',
    labelHi: 'पवित्र शहर',
    icon: '◆',
    color: '#C45A1C',
    markerBg: '#9B3E0D',
  },
  city: {
    label: 'Sacred City',
    labelEn: 'Sacred Cities',
    labelKn: 'ಪುಣ್ಯ ನಗರಗಳು',
    labelHi: 'पवित्र शहर',
    icon: '◆',
    color: '#C45A1C',
    markerBg: '#9B3E0D',
  },
} as const;

// ─── Theme Colors — Ancient Manuscript Palette ──────────────────────────────
export const THEME = {
  background: '#1C1A17',
  surface: '#2A2520',
  surfaceHover: '#362F28',
  primary: '#FF9933',
  secondary: '#8B0000',
  accent: '#D2B48C',
  textPrimary: '#F0E6D3',
  textSecondary: '#A89882',
  border: '#3D352D',
} as const;
