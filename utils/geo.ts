/**
 * Adjusts geographic coordinates for specific markers to prevent overlap
 * or to improve visual centering in dense areas of the map.
 */
export function adjustCoords(id: string, lat: number, lng: number): [number, number] {
  const offsetMap: Record<string, [number, number]> = {
    "vaishali": [0.15, 0.2],
    "patliputra": [-0.1, 0.2],
    "prayag": [-0.1, -0.3],
    "mathura": [0.1, -0.2],
    "indraprastha": [0.15, 0.15],
  };

  if (offsetMap[id]) {
    return [
      lat + offsetMap[id][0],
      lng + offsetMap[id][1]
    ];
  }

  return [lat, lng];
}

/**
 * Returns a precise zoom level based on the item category.
 * Used for "precise" fly-to actions from search results.
 */
export function getPreciseZoom(category: string): number {
  switch (category) {
    case 'city':
    case 'temple':
      return 8.5; // High zoom for cities/temples
    case 'river':
      return 6.5; // Moderate zoom for rivers
    case 'mountain':
      return 5.5; // Wider zoom for mountain ranges
    default:
      return 6.5;
  }
}
