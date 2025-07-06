'use client';

import { ContactSection } from '@/components/ContactSection';
import { CryptoChart } from '@/components/CryptoChart';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { OffersSection } from '@/components/OffersSection';
import { ParallaxProvider } from '@/components/ParallaxProvider';
import { PriceTicker } from '@/components/PriceTicker';
import { PWABanner, PWAFeatures } from '@/components/PWABanner';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { ClientOnly } from '@/components/ClientOnly';

export default function HomePage() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Header />
        <PriceTicker />
        <main>
          <Hero />
          <CryptoChart />
          <OffersSection />
          <PWAFeatures />
          <ContactSection />
        </main>
        <Footer />
        <ClientOnly>
          <PWABanner />
          <PWAInstallPrompt />
        </ClientOnly>
      </div>
    </ParallaxProvider>
  );
}
