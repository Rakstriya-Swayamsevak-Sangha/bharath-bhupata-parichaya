import L from 'leaflet';

// ─── Akhand Bharat Darshana Geographic Bounds ────────────────────────────────────────
// Southwest: [5°N, 60°E]  Northeast: [37°N, 100°E]
// This file is client-only — Leaflet requires `window` and cannot
// be imported during SSR. Import this only from client components.
export const REGION_BOUNDS = L.latLngBounds(
  [-2, 55],   // SW expanded west and south
  [40, 105],  // NE expanded east and north
);
