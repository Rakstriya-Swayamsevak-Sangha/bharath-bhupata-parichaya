# Akhand Bharat Cultural Map — Specification

## 1. Project Overview

**Name:** Akhand Bharat Darshana (अखंड भारत दर्शन)
**Type:** Interactive geospatial cultural map application
**Core Functionality:** Display historical and cultural locations (mountains, rivers, temples) of the Indian subcontinent on an interactive offline-capable map
**Target Users:** Scholars, students, cultural enthusiasts exploring Indian heritage

---

## 2. Visual & Rendering Specification

### Scene Setup
- **Map Engine:** Leaflet.js with OpenStreetMap tiles (cached for offline)
- **Initial View:** Centered on Indian subcontinent (lat: 20.5937, lng: 78.9629)
- **Initial Zoom:** Level 5 (shows full subcontinent)
- **Min Zoom:** 4 (shows broader region)
- **Max Zoom:** 15 (detailed local view)

### Visual Style
- **Theme:** Dark charcoal base with saffron/gold accents (Sanskrit-inspired)
- **Color Palette:**
  - Background: `#1a1a1a` (deep charcoal)
  - Surface: `#252525` (elevated surfaces)
  - Primary accent: `#E07A3C` (saffron orange)
  - Secondary accent: `#D4AF37` (gold)
  - Text primary: `#F5F5F5` (off-white)
  - Text secondary: `#A0A0A0` (muted)
- **Typography:** "Cinzel" for headings (Sanskrit aesthetic), "Source Sans 3" for body

### Map Markers
- **Mountain:** 🏔️ emoji or custom triangle icon in `#4A90A4` (slate blue)
- **River:** 🌊 emoji or custom wave icon in `#3B82F6` (blue)
- **Temple:** 🛕 emoji or custom temple icon in `#E07A3C` (saffron)
- **Selected state:** Golden ring highlight `#D4AF37`

### UI Components
- **Sidebar:** 380px width on desktop, full-width drawer on mobile
- **Filter Controls:** Horizontal pill buttons, toggleable
- **Popup:** Minimal card on map with name + "View Details" action

---

## 3. Data Specification

### Location Interface (TypeScript)
```typescript
interface Location {
  id: string;
  name: string;
  nameHindi?: string;      // Devanagari script
  category: 'mountain' | 'river' | 'temple';
  latitude: number;
  longitude: number;
  description: string;
  historicalSignificance?: string;
  metadata?: {
    elevation?: string;      // for mountains
    length?: string;         // for rivers
    deity?: string;          // for temples
    builtYear?: string;      // for temples
    [key: string]: string | undefined;
  };
}
```

### Data Files
- `/data/mountains.json` — Array of mountain locations
- `/data/rivers.json` — Array of river locations
- `/data/temples.json` — Array of temple locations

### Sample Data Points (minimum 5 per category)
**Mountains:** Himalaya peaks, Vindhya ranges, Western Ghats peaks
**Rivers:** Ganga, Yamuna, Saraswati, Narmada, Brahmaputra
**Temples:** Kedarnath, Badrinath, Somnath, Konark, Kailash

---

## 4. Interaction Specification

### Map Interactions
- **Pan:** Drag to navigate
- **Zoom:** Scroll wheel or pinch
- **Marker Click:**
  1. Open Leaflet popup with location name
  2. Highlight marker with golden ring
  3. Open sidebar with full details
- **Marker Hover:** Subtle scale increase (1.1x)

### Sidebar Interactions
- **Open:** Triggered by marker click, slides in from right
- **Close:** Click X button, click outside, or press Escape
- **Content:** Name, Hindi name, category badge, description, metadata grid

### Filter Controls
- **Toggle buttons:** All | Mountains | Rivers | Temples
- **Active state:** Filled with primary accent color
- **Behavior:** Instantly show/hide markers of that category

### Keyboard Accessibility
- **Escape:** Close sidebar
- **Tab:** Navigate through interactive elements

---

## 5. Offline Architecture

### Service Worker Strategy
- **Precache:** All static assets (HTML, JS, CSS, fonts, JSON)
- **Runtime cache:** Map tiles (cache-first strategy)
- **Update flow:** Background sync when online

### Cached Resources
```
/                    → index.html
/_next/static/       → all JS/CSS bundles
/data/               → all JSON files
/fonts/              → custom fonts
/public/             → static assets
```

### Map Tiles
- Use OpenStreetMap tile server
- Cache tiles at zoom levels 4-10 for offline
- Fallback: Show placeholder pattern if tiles unavailable

---

## 6. Folder Structure

```
/app
  layout.tsx           → Root layout with providers
  page.tsx             → Home redirect to /map
  globals.css          → Tailwind + custom styles
  /map
    page.tsx           → Map route
/components
  /Map
    Map.tsx            → Leaflet map container
    MarkerLayer.tsx    → Renders all markers
    LocationPopup.tsx  → Popup content component
  /Sidebar
    Sidebar.tsx        → Detail sidebar
    LocationCard.tsx   → Individual location display
    MetadataGrid.tsx   → Key-value metadata display
  /FilterControls
    FilterBar.tsx      → Category filter pills
  /ui
    Button.tsx         → Reusable button
    Badge.tsx          → Category badge
    CloseButton.tsx    → Icon button with X
/providers
  MapProvider.tsx      → React context for selected location
  FilterProvider.tsx   → React context for active filters
/data
  mountains.json
  rivers.json
  temples.json
/types
  location.ts
/utils
  mapHelpers.ts        → Coordinate validation, distance calc
  constants.ts         → Map defaults, colors, etc.
/public
  sw.js               → Service worker (generated)
  manifest.json       → PWA manifest
  icons/              → App icons
```

---

## 7. Performance Requirements

- **First Load:** < 3 seconds on 3G (after initial tile load)
- **Bundle Size:** < 200KB JS (gzipped)
- **Map Tiles:** Progressive loading, show placeholders for uncached
- **React:** Use `React.memo` for markers, `useMemo` for filtered lists
- **Images:** None (emoji-based markers)

---

## 8. Acceptance Criteria

- [ ] Next.js app initializes without errors
- [ ] Leaflet map renders centered on India
- [ ] All markers load from JSON files
- [ ] Clicking marker opens sidebar with correct data
- [ ] Filter buttons toggle marker visibility
- [ ] Sidebar closes on Escape/click outside/X button
- [ ] Service worker registers and caches assets
- [ ] App works offline after first load
- [ ] Mobile responsive layout works
- [ ] No TypeScript errors (strict mode)
- [ ] `next build && next export` succeeds
