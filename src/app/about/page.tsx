'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ParallaxProvider } from '@/components/ParallaxProvider';
import { motion } from 'framer-motion';
import { Award, Globe, Shield, Target, TrendingUp, Users } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Active Users', value: '2M+', icon: Users },
    { label: 'Assets Traded', value: '$50B+', icon: TrendingUp },
    { label: 'Countries', value: '150+', icon: Globe },
    { label: 'Security Score', value: '99.9%', icon: Shield },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'Former Goldman Sachs VP with 15+ years in traditional and digital finance.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Ex-Google engineer specializing in blockchain technology and scalable systems.',
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Security',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Cybersecurity expert with experience protecting major financial institutions.',
    },
    {
      name: 'David Kim',
      role: 'Head of Trading',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Former hedge fund manager with expertise in algorithmic trading strategies.',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description:
        'Bank-grade security with multi-layer protection and cold storage for digital assets.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description:
        'Cutting-edge technology and AI-driven insights for smarter investment decisions.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a global community of informed investors and crypto enthusiasts.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing the highest quality service and user experience.',
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                About CryptoFinance
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We're pioneering the future of digital finance, making cryptocurrency trading and
                investment accessible, secure, and profitable for everyone. Since 2020, we've been
                at the forefront of the digital asset revolution.
              </p>
            </motion.div>
          </section>

          {/* Stats Section */}
          <section className="container-padding py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center crypto-card"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="container-padding py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  To democratize access to digital assets and provide institutional-grade tools for
                  retail investors. We believe that everyone should have the opportunity to
                  participate in the digital economy with confidence and security.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our platform combines advanced analytics, real-time market data, and educational
                  resources to empower users to make informed investment decisions in the rapidly
                  evolving cryptocurrency landscape.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-effect rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Why Choose Us?</h3>
                <div className="space-y-4">
                  {values.map((value, index) => (
                    <div key={value.title} className="flex items-start space-x-4">
                      <value.icon className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                        <p className="text-gray-300 text-sm">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Team Section */}
          <section className="container-padding py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">Meet Our Team</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Our experienced team combines decades of expertise in traditional finance,
                technology, and blockchain innovation.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="crypto-card text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Timeline Section */}
          <section className="container-padding py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">Our Journey</h2>
              <p className="text-gray-300 text-lg">Key milestones in our growth story</p>
            </motion.div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    year: '2020',
                    title: 'Company Founded',
                    description: 'Started with a vision to democratize crypto trading',
                  },
                  {
                    year: '2021',
                    title: 'Series A Funding',
                    description: 'Raised $50M to expand our platform and team',
                  },
                  {
                    year: '2022',
                    title: '1M Users',
                    description: 'Reached our first million active users milestone',
                  },
                  {
                    year: '2023',
                    title: 'Global Expansion',
                    description: 'Launched in 50+ countries with local support',
                  },
                  {
                    year: '2024',
                    title: 'AI Integration',
                    description: 'Introduced AI-powered trading insights and analytics',
                  },
                  {
                    year: '2025',
                    title: 'Industry Leader',
                    description: 'Recognized as a top crypto platform globally',
                  },
                ].map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex items-center space-x-6"
                  >
                    <div className="w-20 text-2xl font-bold text-blue-400">{milestone.year}</div>
                    <div className="flex-1 crypto-card">
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
