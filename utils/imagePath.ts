// Returns first valid path; SafeImage will retry on error
const IMAGE_EXTS = ['.jpg', '.webp', '.jpeg', '.png', '.avif'];

export function getImagePath(id: string, category: string): string {
  const cat = category === 'city' ? 'sacred-cities' : category + 's';
  return `/place-images/${cat}/${id}.jpg`;
}

export function getImagePathVariants(id: string, category: string): string[] {
  const cat = category === 'city' ? 'sacred-cities' : category + 's';
  return IMAGE_EXTS.map(ext => `/place-images/${cat}/${id}${ext}`);
}

/**
 * Generate variants from an image path (e.g., /place-images/sacred-cities/ujjain.webp)
 * Returns all possible extension variants for the same base name.
 */
export function getVariantsFromPath(imagePath: string): string[] {
  if (!imagePath || !imagePath.includes('/place-images/')) {
    return [];
  }

  const parts = imagePath.match(/^(.+\/)((?:[a-zA-Z0-9_-]+)\.([a-zA-Z]+))$/);
  if (!parts) return [];

  const [, dir, baseName, ext] = parts;
  const nameWithoutExt = baseName.replace(/\.[^.]+$/, '');

  // Generate variants with different extensions, but NOT the original
  return IMAGE_EXTS
    .filter(e => e !== `.${ext.toLowerCase()}` && e !== `.${ext.toUpperCase()}`)
    .map(ext => `${dir}${nameWithoutExt}${ext}`);
}