'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Globe, 
  Award,
  TrendingUp,
  BarChart3,
  Briefcase,
  Clock,
  DollarSign,
  Star
} from 'lucide-react';

export default function CompanyPage() {
  const stats = [
    { number: '2M+', label: 'Active Users', icon: Users },
    { number: '$50B+', label: 'Trading Volume', icon: TrendingUp },
    { number: '150+', label: 'Countries', icon: Globe },
    { number: '99.9%', label: 'Uptime', icon: Clock }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      position: 'CEO & Co-Founder',
      image: '/api/placeholder/300/300',
      bio: 'Former Goldman Sachs VP with 15+ years in financial markets'
    },
    {
      name: 'Michael Rodriguez',
      position: 'CTO',
      image: '/api/placeholder/300/300',
      bio: 'Ex-Google engineer, blockchain architecture specialist'
    },
    {
      name: 'Emily Watson',
      position: 'Head of Security',
      image: '/api/placeholder/300/300',
      bio: 'Cybersecurity expert from NSA, protecting digital assets'
    },
    {
      name: 'David Park',
      position: 'Head of Trading',
      image: '/api/placeholder/300/300',
      bio: 'Quantitative trader with expertise in algorithmic strategies'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your assets are protected by military-grade encryption and multi-layer security protocols.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in service quality and platform performance.'
    },
    {
      icon: Users,
      title: 'Customer Centric',
      description: 'Every decision we make prioritizes our users\' success and satisfaction.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Constantly evolving with cutting-edge technology and market insights.'
    }
  ];

  const milestones = [
    { year: '2019', event: 'Company Founded', desc: 'Started with a vision to democratize crypto trading' },
    { year: '2020', event: 'Series A Funding', desc: '$10M raised to expand platform capabilities' },
    { year: '2021', event: '1M Users', desc: 'Reached first million registered users' },
    { year: '2022', event: 'Global Expansion', desc: 'Launched in 50+ countries worldwide' },
    { year: '2023', event: 'Advanced Features', desc: 'Introduced AI-powered trading tools' },
    { year: '2024', event: 'Industry Leader', desc: 'Recognized as top crypto platform globally' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pioneering the Future of
            <span className="text-gradient"> Digital Finance</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're building the most trusted and innovative platform for cryptocurrency 
            trading, empowering millions of users worldwide to participate in the digital economy.
          </p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2019 by a team of financial technology veterans, we recognized 
                  the transformative potential of blockchain technology and cryptocurrencies. 
                  Our mission was simple: make crypto trading accessible, secure, and profitable 
                  for everyone.
                </p>
                <p>
                  Starting as a small team of passionate engineers and traders, we've grown 
                  into a global platform serving millions of users. Our commitment to security, 
                  innovation, and user experience has made us a trusted leader in the industry.
                </p>
                <p>
                  Today, we continue to push boundaries, introducing cutting-edge features 
                  like AI-powered analytics, advanced trading tools, and institutional-grade 
                  security measures that protect our users' investments.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-effect rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <Briefcase className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Mission Statement</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  "To democratize access to digital assets and empower individuals 
                  worldwide to build wealth through innovative financial technology."
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-400">Transparent Fees</div>
                  </div>
                  <div>
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-400">5-Star Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-300 text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Leadership Team
            </h2>
            <p className="text-gray-300 text-lg">
              Meet the experts driving our vision forward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-lg p-6 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-400 mb-3 text-sm">
                  {member.position}
                </p>
                <p className="text-gray-400 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Journey
            </h2>
            <p className="text-gray-300 text-lg">
              Key milestones in our growth story
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="glass-effect rounded-lg p-6">
                    <div className="text-blue-400 font-semibold mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-gray-400">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-400" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Be part of the financial revolution and help shape the future of digital assets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Start Trading
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                View Careers
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
