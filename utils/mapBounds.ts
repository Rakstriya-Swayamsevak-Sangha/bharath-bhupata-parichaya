import L from 'leaflet';

// ─── Akhand Bharat Geographic Bounds ────────────────────────────────────────
// Southwest: [4.5°N, 58.0°E]  Northeast: [37.5°N, 97.5°E]
// This file is client-only — Leaflet requires `window` and cannot
// be imported during SSR. Import this only from client components.
export const AKHAND_BHARAT_BOUNDS = L.latLngBounds(
  [4.5, 58.0],   // SW
  [37.5, 97.5],  // NE
);
