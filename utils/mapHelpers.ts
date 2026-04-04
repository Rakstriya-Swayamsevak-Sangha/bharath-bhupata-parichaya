import { Location } from '@/types/location';

/**
 * Validates if coordinates are within Akhand Bharat region bounds
 * Southwest: [4.5, 58.0], Northeast: [37.5, 97.5]
 */
export function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= 4.5 && lat <= 37.5 && lng >= 58.0 && lng <= 97.5;
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Filter locations by active categories
 */
export function filterLocations(
  locations: Location[],
  activeFilters: Record<string, boolean>
): Location[] {
  return locations.filter(loc => activeFilters[loc.category] !== false);
}

/**
 * Get marker color based on category
 */
export function getMarkerColor(category: string): string {
  const colors: Record<string, string> = {
    mountain: '#4A90A4',
    river: '#3B82F6',
    temple: '#E07A3C',
  };
  return colors[category] || '#888888';
}
