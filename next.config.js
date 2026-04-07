const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache map tiles with CacheFirst strategy
      urlPattern: /^https:\/\/[a-z]\.basemaps\.cartocdn\.com\/.*\.png/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'map-tiles',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
    {
      // Cache GeoJSON and JSON data files
      urlPattern: /\.(?:json|geojson)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'cultural-data',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 Hours
        },
      },
    },
    {
      // Cache images and textures
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'atlas-assets',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
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
