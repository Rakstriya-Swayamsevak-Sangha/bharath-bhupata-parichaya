/**
 * ASSET MANIFEST — SINGLE SOURCE OF TRUTH
 * 
 * Every entity ID must be explicitly mapped to its exact path and extension.
 * NO dynamic string building. NO extension guessing.
 */

export const IMAGE_MANIFEST: Record<string, string> = {
  // Mountains
  aravalli: '/place-images/mountains/aravalli.webp',
  himalaya: '/place-images/mountains/himalaya.avif',
  mahendra: '/place-images/mountains/mahendra.jpg',
  malaya: '/place-images/mountains/malaya.jpg',
  raivataka: '/place-images/mountains/raivataka.webp',
  sahyadri: '/place-images/mountains/sahyadri.jpg',
  vindhya: '/place-images/mountains/vindhya.webp',

  // Rivers
  brahmaputra: '/place-images/rivers/brahmaputra.webp',
  gandaki: '/place-images/rivers/gandaki.webp',
  ganga: '/place-images/rivers/ganga.jpg',
  godavari: '/place-images/rivers/godavari.jpg',
  kaveri: '/place-images/rivers/kaveri.jpg',
  krishna: '/place-images/rivers/krishna.jpg',
  mahanadi: '/place-images/rivers/mahanadi.jpg',
  narmada: '/place-images/rivers/narmada.jpg',
  saraswati: '/place-images/rivers/saraswati.jpg',
  sindhu: '/place-images/rivers/sindhu.jpg',
  yamuna: '/place-images/rivers/yamuna.jpg',

  // Sacred Cities
  amritsar: '/place-images/sacred-cities/amritsar.jpg',
  ayodhya: '/place-images/sacred-cities/ayodhya.jpg',
  dwarka: '/place-images/sacred-cities/dwarka.jpg',
  gaya: '/place-images/sacred-cities/gaya.jpg',
  indraprastha: '/place-images/sacred-cities/indraprastha.jpg',
  kanchi: '/place-images/sacred-cities/kanchi.jpg',
  mathura: '/place-images/sacred-cities/mathura.jpg',
  nagpur: '/place-images/sacred-cities/nagpur.jpg',
  pataliputra: '/place-images/sacred-cities/pataliputra.jpg',
  prayag: '/place-images/sacred-cities/prayag.webp',
  puri: '/place-images/sacred-cities/puri.jpg',
  somnath: '/place-images/sacred-cities/somnath.jpg',
  takshashila: '/place-images/sacred-cities/takshashila.jpg',
  ujjain: '/place-images/sacred-cities/ujjain.webp',
  vaishali: '/place-images/sacred-cities/vaishali.jpg',
  "vijaya-nagar": '/place-images/sacred-cities/vijaya-nagar.jpg',

  // Regions
  gandhara: '/place-images/regions/afghanistan.jpg',
  vanga_desha: '/place-images/regions/bangladesh.jpg',
  bhutan: '/place-images/regions/bhutan.jpg',
  trivishtapa: '/place-images/regions/china.jpg',
  brahma_desha: '/place-images/regions/myanmar.jpg',
  nepal: '/place-images/regions/nepal.jpg',
  sindhu_desha: '/place-images/regions/pakistan.png',
  sinhala: '/place-images/regions/sri-lanka.jpg',

  // Mahapurushas
  chanakya: '/place-images/mahapurushas/chanakya.webp',
  chandragupta_maurya: '/place-images/mahapurushas/chandragupta_maurya.webp',
  vikramaditya: '/place-images/mahapurushas/vikramaditya.webp',
  shalivahana: '/place-images/mahapurushas/shalivahana.webp',
};

export type ImageManifestKey = keyof typeof IMAGE_MANIFEST;

/**
 * Get image path from manifest with absolute certainty.
 * Returns a fallback if the ID is missing.
 */
export function getAssetPath(id: string): string {
  return IMAGE_MANIFEST[id] || '/fallback.svg';
}
