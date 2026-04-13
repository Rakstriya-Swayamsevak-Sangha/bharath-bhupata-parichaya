import type { Metadata } from 'next';
import './globals.css';
import './stage2.css';
import ServiceWorkerManager from '@/components/PWA/ServiceWorkerManager';
import PreloadSystem from '@/components/PWA/PreloadSystem';
import { Analytics } from '@vercel/analytics/react';

export const viewport = {
  themeColor: '#FF9933',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Bharatha Bhupata Parichaya',
  description: 'Cultural Atlas of Akhand Bharat',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bharath Bhupata',
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
  other: {
    "mobile-web-app-capable": "yes",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="antialiased">
        <ServiceWorkerManager />
        <PreloadSystem />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
