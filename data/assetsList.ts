import { IMAGE_MANIFEST } from './imageManifest';

/**
 * PRELOAD_IMAGES is now derived directly from the IMAGE_MANIFEST
 * to ensure 100% consistency across the application and PWA cache.
 */
export const PRELOAD_IMAGES = Object.values(IMAGE_MANIFEST);
