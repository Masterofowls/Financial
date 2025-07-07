'use client';

import { motion } from 'framer-motion';
import { Download, Smartphone, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PWABanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // All hooks must be called before any early returns
  useEffect(() => {
    setIsMounted(true);
    
    // Check if running as PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already dismissed recently (within 7 days)
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed) {
      const dismissedTime = Number.parseInt(dismissed, 10);
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (dismissedTime > weekAgo) {
        return; // Don't show banner if recently dismissed
      }
    }

    // Only show banner after user interaction and if not PWA
    // Make it less intrusive by requiring user to scroll down first
    if (!standalone) {
      let hasScrolled = false;
      const handleScroll = () => {
        if (!hasScrolled && window.scrollY > 100) {
          hasScrolled = true;
          // Show banner after scrolling and a longer delay
          const timer = setTimeout(() => {
            setShowBanner(true);
          }, 8000); // Increased delay

          return () => clearTimeout(timer);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleInstall = () => {
    if (isIOS) {
      // Show iOS install instructions
      alert('To install this app on iOS:\n1. Tap the Share button\n2. Select "Add to Home Screen"\n3. Tap "Add" to confirm');
    }
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  };

  // Don't render anything until mounted to prevent SSR issues
  if (!isMounted || !showBanner || isStandalone) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
    >
      <div className="container mx-auto flex items-center justify-between max-w-4xl">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold">Install CryptoFinance App</h3>
            <p className="text-blue-100 text-sm">
              Get the full experience with offline access, push notifications, and lightning-fast performance.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 ml-4">
          {isIOS ? (
            <button
              type="button"
              onClick={handleInstall}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Install</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="w-4 h-4" />
              <span>Auto-install available</span>
            </div>
          )}
          
          <button
            type="button"
            onClick={handleDismiss}
            className="text-blue-100 hover:text-white text-sm underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function PWAFeatures() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Native App Experience',
      description: 'Install on any device for a smooth, native-like experience',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized performance with intelligent caching and preloading',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Offline Access',
      description: 'Access cached data and essential features even without internet',
    },
  ];

  if (!isMounted) return null;

  return (
    <section className="py-16 bg-gray-800/50">
      <div className="container-padding mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Available as a Progressive Web App
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience CryptoFinance Pro as a fully-featured app on any device. 
            Install directly from your browser for the best trading experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
