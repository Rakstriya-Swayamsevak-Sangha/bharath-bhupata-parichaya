import type { Metadata } from 'next';
import './globals.css';
import './stage2.css';
import PWAUpdate from '@/components/PWA/PWAUpdate';
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
      </head>
      <body className="antialiased">
        <PWAUpdate />
        <PreloadSystem />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
