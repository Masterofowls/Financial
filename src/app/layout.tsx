import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
    'cryptocurrency, bitcoin, ethereum, trading, investment, blockchain, crypto charts, market analysis',
  authors: [{ name: 'CryptoFinance Pro' }],
  creator: 'CryptoFinance Pro',
  publisher: 'CryptoFinance Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cryptofinance-pro.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CryptoFinance Pro - Advanced Cryptocurrency Trading Platform',
    description:
      'Professional cryptocurrency trading platform with real-time charts and market analysis.',
    url: 'https://cryptofinance-pro.com',
    siteName: 'CryptoFinance Pro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
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
    images: ['/twitter-image.jpg'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <div id="root">{children}</div>
        <div id="modal-root" />
      </body>
    </html>
  );
}
