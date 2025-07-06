'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ParallaxProvider } from '@/components/ParallaxProvider';
import { motion } from 'framer-motion';
import {
  BarChart3,
  BookOpen,
  Globe,
  Headphones,
  Lock,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: TrendingUp,
      title: 'Crypto Trading',
      description:
        'Advanced trading platform with real-time charts, technical analysis tools, and automated trading strategies.',
      features: ['Spot & Futures Trading', 'Advanced Charting', 'API Integration', 'Low Fees'],
      price: 'Commission starts at 0.1%',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Management',
      description:
        'Professional portfolio management services with risk assessment and diversification strategies.',
      features: ['Risk Assessment', 'Auto-Rebalancing', 'Performance Tracking', 'Tax Optimization'],
      price: 'Management fee 1.5% annually',
    },
    {
      icon: Shield,
      title: 'Custody Services',
      description:
        'Institutional-grade security for storing and managing your digital assets safely.',
      features: ['Cold Storage', 'Multi-Sig Security', 'Insurance Coverage', '24/7 Monitoring'],
      price: 'Starting at 0.5% annually',
    },
    {
      icon: Zap,
      title: 'DeFi Strategies',
      description:
        'Access to decentralized finance protocols with managed strategies and yield optimization.',
      features: ['Yield Farming', 'Liquidity Mining', 'Staking Services', 'Risk Management'],
      price: 'Performance fee 20%',
    },
    {
      icon: Globe,
      title: 'Global Markets',
      description: 'Access to international crypto markets and emerging digital assets worldwide.',
      features: ['150+ Countries', 'Multi-Currency', 'Local Support', 'Regulatory Compliance'],
      price: 'No additional fees',
    },
    {
      icon: BookOpen,
      title: 'Education & Research',
      description:
        'Comprehensive educational resources and market research to help you make informed decisions.',
      features: ['Market Analysis', 'Trading Courses', 'Webinars', 'Research Reports'],
      price: 'Free for premium users',
    },
  ];

  const tradingFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile Trading',
      description:
        'Trade on the go with our advanced mobile app featuring full trading capabilities.',
    },
    {
      icon: Lock,
      title: 'Security First',
      description: '2FA, biometric authentication, and advanced encryption protect your account.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support from our team of crypto experts.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'AI-powered insights and market analysis to enhance your trading decisions.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for beginners getting started with crypto',
      features: [
        'Basic trading',
        'Market data',
        'Educational resources',
        'Community access',
        'Email support',
      ],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29/month',
      description: 'Advanced tools for serious traders',
      features: [
        'Everything in Starter',
        'Advanced charting',
        'API access',
        'Priority support',
        'Research reports',
        'Lower trading fees',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Institutional-grade solutions',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solutions',
        'Institutional custody',
        'Volume discounts',
      ],
      highlighted: false,
    },
  ];

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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Our Services</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comprehensive cryptocurrency solutions designed to meet your financial goals. From
                beginner-friendly tools to institutional-grade services.
              </p>
            </motion.div>
          </section>

          {/* Services Grid */}
          <section className="container-padding py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="crypto-card group cursor-pointer"
                >
                  <service.icon className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-gray-400 flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-blue-400 font-semibold">{service.price}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Trading Features */}
          <section className="container-padding py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">Trading Platform Features</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Our platform is built with cutting-edge technology to provide the best trading
                experience.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tradingFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="glass-effect rounded-2xl p-8 h-full">
                    <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="container-padding py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">Choose Your Plan</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Flexible pricing plans to suit traders of all levels, from beginners to
                institutions.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative ${
                    plan.highlighted ? 'crypto-card ring-2 ring-blue-400 scale-105' : 'crypto-card'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-blue-400 mb-2">{plan.price}</div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="text-gray-300 flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.highlighted ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="container-padding py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-2xl p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of traders who trust our platform for their cryptocurrency
                investments. Start your journey today with our comprehensive suite of services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button type="button" className="btn-primary">
                  Start Trading Now
                </button>
                <button type="button" className="btn-secondary">
                  Schedule a Demo
                </button>
              </div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
