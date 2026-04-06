import L from 'leaflet';

// ─── Akhand Bharat Geographic Bounds ────────────────────────────────────────
// Southwest: [5°N, 60°E]  Northeast: [37°N, 100°E]
// This file is client-only — Leaflet requires `window` and cannot
// be imported during SSR. Import this only from client components.
export const AKHAND_BHARAT_BOUNDS = L.latLngBounds(
  [5, 60],   // SW
  [37, 100],  // NE
);
