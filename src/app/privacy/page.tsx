'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Cookie, Eye, Lock, Users, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Eye className="w-6 h-6" />,
      content: [
        'Personal information you provide when creating an account',
        'Trading and transaction data to provide our services',
        'Device and browser information for security and optimization',
        'Usage analytics to improve our platform',
        'Communication preferences and support interactions'
      ]
    },
    {
      id: 'cookies',
      title: 'How We Use Cookies',
      icon: <Cookie className="w-6 h-6" />,
      content: [
        'Essential cookies for platform functionality and security',
        'Analytics cookies to understand user behavior (with consent)',
        'Preference cookies to remember your settings',
        'Marketing cookies for personalized content (with consent)',
        'You can manage cookie preferences through our cookie banner'
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      icon: <Users className="w-6 h-6" />,
      content: [
        'Provide and maintain our cryptocurrency trading services',
        'Process transactions and maintain account security',
        'Send important updates about your account and our services',
        'Comply with legal and regulatory requirements',
        'Improve our platform based on usage analytics'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing and Disclosure',
      icon: <Globe className="w-6 h-6" />,
      content: [
        'We do not sell your personal information to third parties',
        'Data may be shared with regulatory authorities when required',
        'Service providers who help us operate our platform',
        'In case of merger, acquisition, or sale of assets',
        'To protect our rights and prevent fraud or illegal activities'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="w-6 h-6" />,
      content: [
        'Industry-standard encryption for data transmission and storage',
        'Regular security audits and penetration testing',
        'Multi-factor authentication for account protection',
        'Restricted access to personal data on a need-to-know basis',
        'Incident response procedures for potential security breaches'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <Shield className="w-6 h-6" />,
      content: [
        'Access: Request a copy of your personal data',
        'Correction: Update or correct inaccurate information',
        'Deletion: Request deletion of your personal data',
        'Portability: Export your data in a machine-readable format',
        'Objection: Object to certain types of data processing'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container-padding mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, 
                use, and protect your personal information when you use CryptoFinance Pro.
              </p>
              <div className="mt-8 text-sm text-gray-400">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Sections */}
        <section className="py-16">
          <div className="container-padding mx-auto">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="crypto-card"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item) => (
                      <li key={item.slice(0, 30)} className="flex items-start gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-800/30">
          <div className="container-padding mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Questions About This Policy?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or how we handle your data, 
                please don't hesitate to contact our privacy team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:privacy@cryptofinance.pro"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Contact Privacy Team
                </a>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Cookie className="w-5 h-5" />
                  Manage Cookie Preferences
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* GDPR/CCPA Notice */}
        <section className="py-12 bg-blue-600/10 border-y border-blue-600/20">
          <div className="container-padding mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">
                  GDPR & CCPA Compliance
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto">
                We are committed to protecting the privacy rights of our users under the 
                General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). 
                You have the right to know what personal information we collect, how it's used, 
                and to request its deletion or correction.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
