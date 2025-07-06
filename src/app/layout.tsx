import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { PWAInstaller, PWAMeta } from '@/components/PWAInstaller';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CryptoFinance Pro - Advanced Cryptocurrency Trading & Investment Platform',
  description:
    'Professional cryptocurrency trading platform with real-time charts, market analysis, and advanced trading tools. Start your crypto investment journey today.',
  keywords:
    'cryptocurrency, bitcoin, ethereum, trading, investment, blockchain, crypto charts, market analysis, pwa, progressive web app',
  authors: [{ name: 'CryptoFinance Pro' }],
  creator: 'CryptoFinance Pro',
  publisher: 'CryptoFinance Pro',
  applicationName: 'CryptoFinance Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cryptofinance-pro.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CryptoFinance Pro',
    startupImage: [
      {
        url: '/icons/apple-touch-icon.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  openGraph: {
    title: 'CryptoFinance Pro - Advanced Cryptocurrency Trading Platform',
    description:
      'Professional cryptocurrency trading platform with real-time charts and market analysis.',
    url: 'https://cryptofinance-pro.com',
    siteName: 'CryptoFinance Pro',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'CryptoFinance Pro Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoFinance Pro - Advanced Cryptocurrency Trading Platform',
    description:
      'Professional cryptocurrency trading platform with real-time charts and market analysis.',
    images: ['/icons/icon-512x512.png'],
    creator: '@cryptofinancepro',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/icons/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/logo.svg',
        color: '#3b82f6',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#3b82f6' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <PWAMeta />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <div id="root">{children}</div>
        <div id="modal-root" />
        <PWAInstaller />
      </body>
    </html>
  );
}
