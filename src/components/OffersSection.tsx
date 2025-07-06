'use client';

import type { OfferCard } from '@/types';
import { motion } from 'framer-motion';
import { Check, Shield, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const offers: OfferCard[] = [
  {
    title: 'Starter',
    description: 'Perfect for beginners entering the crypto world',
    features: [
      'Basic trading interface',
      'Real-time price alerts',
      'Educational resources',
      'Mobile app access',
      'Email support',
    ],
    price: 'Free',
    buttonText: 'Get Started',
  },
  {
    title: 'Professional',
    description: 'Advanced tools for serious traders',
    features: [
      'Advanced charting tools',
      'API access',
      'Portfolio analytics',
      'Priority support',
      'Advanced order types',
      'Risk management tools',
    ],
    price: '$29/month',
    buttonText: 'Start Free Trial',
    popular: true,
  },
  {
    title: 'Enterprise',
    description: 'Institutional-grade trading platform',
    features: [
      'White-label solutions',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced reporting',
      'SLA guarantees',
      'Unlimited API calls',
    ],
    price: 'Custom',
    buttonText: 'Contact Sales',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Execute trades in milliseconds with our optimized infrastructure',
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'Multi-layer security with cold storage and insurance protection',
  },
  {
    icon: TrendingUp,
    title: 'Advanced Analytics',
    description: 'Professional charting tools and market analysis',
  },
  {
    icon: Users,
    title: '24/7 Support',
    description: 'Round-the-clock customer support from crypto experts',
  },
];

export function OffersSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="trading" ref={ref} className="py-20 bg-gray-800/30">
      <div className="container-padding mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Trading Plan</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From beginners to institutions, we have the perfect plan for your trading needs
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative glass-effect rounded-2xl p-8 ${
                  offer.popular
                    ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-500/10 to-purple-600/10'
                    : ''
                }`}
              >
                {offer.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-gray-400 mb-4">{offer.description}</p>
                  <div className="text-4xl font-bold text-white mb-2">{offer.price}</div>
                  {offer.price !== 'Free' && offer.price !== 'Custom' && (
                    <p className="text-gray-400 text-sm">per month</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    offer.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {offer.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Start Trading?
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Join over 2 million traders who trust our platform for their crypto investments
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Create Free Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  View Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
