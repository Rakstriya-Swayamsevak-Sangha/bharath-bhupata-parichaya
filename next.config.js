const fs = require('fs');
const path = require('path');

/**
 * ARCHIVAL PWA PRECACHE STRATEGY
 * Dynamically discovers all images, textures, and data files in /public
 * and forces them into the Workbox precache manifest.
 */
const getAllFiles = (dirPath, arrayOfFiles = []) => {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      // Get web-relative path (e.g. /place-images/xyz.jpg)
      const relativePath = path.join(dirPath, file).split('public')[1].replace(/\\/g, '/');
      
      // Only precache meaningful archival assets
      if (/\.(png|jpg|jpeg|webp|avif|geojson|json|ico|svg)$/i.test(relativePath)) {
        // We use a fixed revision for static public assets to avoid redundant downloads
        // but we can change this to a build-timestamp if needed.
        arrayOfFiles.push({ url: relativePath, revision: 'archival-v1' });
      }
    }
  });
  return arrayOfFiles;
};

// Scan the public directory for ALL museum-grade assets
const archivalAssets = getAllFiles(path.join(process.cwd(), 'public'));

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  
  // THE APP SHELL LOCK: Precache EVERYTHING archival
  additionalManifestEntries: [
    { url: '/', revision: 'html-v1' },
    { url: '/map/', revision: 'html-v1' },
    ...archivalAssets
  ],
  
  runtimeCaching: [
    {
      // Aggressive CacheFirst for all data files (Backup to precaching)
      urlPattern: /\.(?:json|geojson|csv)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'cultural-data-v1',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      // Aggressive CacheFirst for all images (Backup to precaching)
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'atlas-assets-v1',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      // Locked Google Fonts
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-v1',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = withPWA(nextConfig);
