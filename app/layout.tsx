import type { Metadata } from 'next';
import './globals.css';
import './stage2.css';
import PWAUpdate from '@/components/PWA/PWAUpdate';

export const metadata: Metadata = {
  title: 'Akhand Bharat Darshana | अखंड भारत दर्शन',
  description: 'Interactive cultural and civilizational map of the Indian subcontinent featuring mountains, rivers, and sacred sites.',
  manifest: '/manifest.json',
  themeColor: '#FF9933',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bharat Darshana',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased">
        <PWAUpdate />
        {children}
      </body>
    </html>
  );
}
