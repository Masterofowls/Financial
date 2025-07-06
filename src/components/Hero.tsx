'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Star, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Video autoplay failed, which is fine
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/90 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/crypto-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        <div
          data-float
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
        />
        <div
          data-float
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-bounce-slow"
        />
        <div
          data-float
          className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-crypto-bitcoin/10 rounded-full blur-3xl animate-float"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container-padding mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center mb-6">
            <div className="glass-effect rounded-full px-6 py-2 flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-200">
                #1 Crypto Trading Platform 2024
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Trade Crypto</span>
            <br />
            <span className="text-white">Like a</span>{' '}
            <span className="gradient-text">Professional</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Access real-time cryptocurrency data, advanced trading tools, and institutional-grade
            security. Start your journey to financial freedom today.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {[
              { label: 'Active Traders', value: '2M+', icon: TrendingUp },
              { label: 'Trading Volume', value: '$50B+', icon: Zap },
              { label: 'Cryptocurrencies', value: '500+', icon: Shield },
              { label: 'Countries', value: '150+', icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="glass-effect rounded-xl p-4 lg:p-6"
              >
                <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Start Trading Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 w-full sm:w-auto"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60"
          >
            <div className="text-sm text-gray-400">Trusted by leading institutions</div>
            <div className="flex items-center space-x-6">
              {['Coinbase', 'Binance', 'Kraken', 'FTX'].map((name) => (
                <div key={name} className="text-gray-500 font-semibold">
                  {name}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
