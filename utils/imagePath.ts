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