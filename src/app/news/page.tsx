'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { NewsSection } from '@/components/NewsSection';
import { ParallaxProvider } from '@/components/ParallaxProvider';
import { motion } from 'framer-motion';

export default function NewsPage() {
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
                Crypto News & Analysis
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Stay informed with the latest cryptocurrency news, market analysis, and expert
                insights to make better investment decisions.
              </p>
            </motion.div>
          </section>

          {/* News Section */}
          <NewsSection />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
