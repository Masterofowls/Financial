'use client';

import { AdvancedCharts } from '@/components/AdvancedCharts';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MarketIndicators } from '@/components/MarketIndicators';
import { MarketOverview } from '@/components/MarketOverview';
import { ParallaxProvider } from '@/components/ParallaxProvider';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
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
                Market Analytics
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Advanced market analysis tools and real-time data to help you make informed trading
                decisions in the cryptocurrency market.
              </p>
            </motion.div>
          </section>

          {/* Market Overview */}
          <MarketOverview />

          {/* Advanced Charts */}
          <AdvancedCharts />

          {/* Market Indicators */}
          <MarketIndicators />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
