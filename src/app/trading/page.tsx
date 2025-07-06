'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ParallaxProvider } from '@/components/ParallaxProvider';
import { PortfolioTracker } from '@/components/PortfolioTracker';
import { PriceAlerts } from '@/components/PriceAlerts';
import { TradingCalculator } from '@/components/TradingCalculator';
import { motion } from 'framer-motion';

export default function TradingPage() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="container-padding py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Trading Dashboard
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Professional trading tools and portfolio management in one comprehensive platform.
              </p>
            </motion.div>
          </section>

          {/* Trading Tools */}
          <section className="container-padding py-16">
            <div className="grid lg:grid-cols-2 gap-8">
              <PortfolioTracker />
              <PriceAlerts />
            </div>
          </section>

          {/* Trading Calculator */}
          <section className="container-padding py-16">
            <TradingCalculator />
          </section>
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
