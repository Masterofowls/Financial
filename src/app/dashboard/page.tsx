'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MarketOverview } from '@/components/MarketOverview';
import { MarketScanner } from '@/components/MarketScanner';
import { NewsSection } from '@/components/NewsSection';
import { ParallaxProvider } from '@/components/ParallaxProvider';
import { PortfolioTracker } from '@/components/PortfolioTracker';
import { PriceAlerts } from '@/components/PriceAlerts';
import { PriceTicker } from '@/components/PriceTicker';
import { Watchlist } from '@/components/Watchlist';
import { motion } from 'framer-motion';
import { Activity, BarChart3, DollarSign, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const quickStats = [
    {
      label: 'Total Portfolio Value',
      value: '$51,350',
      change: '+8.2%',
      positive: true,
      icon: DollarSign,
    },
    {
      label: '24h P&L',
      value: '+$3,850',
      change: '+7.9%',
      positive: true,
      icon: TrendingUp,
    },
    {
      label: 'Active Positions',
      value: '12',
      change: '+2 today',
      positive: true,
      icon: BarChart3,
    },
    {
      label: 'Trading Volume',
      value: '$125K',
      change: '+15.3%',
      positive: true,
      icon: Activity,
    },
  ];

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Header />
        <PriceTicker />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="container-padding py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Trading Dashboard
              </h1>
              <p className="text-lg text-gray-300">
                Your complete cryptocurrency trading and investment overview
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="crypto-card text-center"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className={`text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Market Overview */}
          <MarketOverview />

          {/* Portfolio and Alerts */}
          <section className="container-padding py-16">
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <PortfolioTracker />
              <PriceAlerts />
            </div>
          </section>

          {/* Advanced Trading Tools */}
          <section className="container-padding py-16 bg-gray-800/50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-2">Trading Tools</h2>
              <p className="text-gray-300">
                Advanced market analysis and portfolio management tools
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MarketScanner />
              </div>
              <div>
                <Watchlist />
              </div>
            </div>
          </section>

          {/* Latest News */}
          <section className="container-padding pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-2">Latest Market News</h2>
              <p className="text-gray-300">
                Stay updated with the latest cryptocurrency news and insights
              </p>
            </motion.div>
            <NewsSection />
          </section>
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
