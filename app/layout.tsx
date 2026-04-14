import type { Metadata } from 'next';
import './globals.css';
import ServiceWorkerManager from '@/components/PWA/ServiceWorkerManager';
import PreloadSystem from '@/components/PWA/PreloadSystem';
import ViewportStabilizer from '@/components/ui/ViewportStabilizer';
import AssetGuard from '@/components/AssetGuard';

export const viewport = {
  themeColor: '#FF9933',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Bharata Bhupata Parichaya',
  description: 'Cultural Atlas of Akhand Bharat',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bharata Bhupata Parichaya',
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="antialiased">
        <AssetGuard />
        <ViewportStabilizer />
        <ServiceWorkerManager />
        <PreloadSystem />
        {children}
      </body>
    </html>
  );
}
