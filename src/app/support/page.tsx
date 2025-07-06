'use client';

import { motion } from 'framer-motion';
import { 
  Search,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  HelpCircle,
  Book,
  Video,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', count: 48 },
    { id: 'getting-started', name: 'Getting Started', count: 12 },
    { id: 'trading', name: 'Trading', count: 15 },
    { id: 'security', name: 'Security', count: 8 },
    { id: 'account', name: 'Account', count: 10 },
    { id: 'fees', name: 'Fees & Limits', count: 3 }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple. Click the "Sign Up" button, provide your email, create a strong password, and verify your email address.',
      popularity: 'high'
    },
    {
      category: 'trading',
      question: 'What are the trading fees?',
      answer: 'Our trading fees start from 0.1% for makers and 0.15% for takers. Fees decrease with higher trading volumes.',
      popularity: 'high'
    },
    {
      category: 'security',
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Security settings, click "Enable 2FA", scan the QR code with your authenticator app, and enter the verification code.',
      popularity: 'medium'
    },
    {
      category: 'account',
      question: 'How long does verification take?',
      answer: 'Account verification typically takes 1-3 business days. You\'ll receive an email once your documents are reviewed.',
      popularity: 'high'
    },
    {
      category: 'trading',
      question: 'What is the minimum deposit amount?',
      answer: 'The minimum deposit varies by payment method. Credit card deposits start from $10, while bank transfers start from $50.',
      popularity: 'medium'
    },
    {
      category: 'fees',
      question: 'Are there withdrawal fees?',
      answer: 'Withdrawal fees vary by cryptocurrency. Bitcoin withdrawals cost 0.0005 BTC, Ethereum costs 0.005 ETH.',
      popularity: 'low'
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      action: 'Start Chat',
      color: 'from-blue-400 to-purple-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions via email',
      availability: 'Response within 24h',
      action: 'Send Email',
      color: 'from-green-400 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri 9AM-6PM',
      action: 'Call Now',
      color: 'from-orange-400 to-red-600'
    }
  ];

  const resources = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Comprehensive guide to using our platform',
      type: 'PDF',
      size: '2.5 MB'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video instructions',
      type: 'Playlist',
      size: '15 videos'
    },
    {
      icon: FileText,
      title: 'API Documentation',
      description: 'Complete API reference for developers',
      type: 'Web',
      size: '200+ endpoints'
    }
  ];

  const systemStatus = [
    { service: 'Trading Engine', status: 'operational', uptime: '99.9%' },
    { service: 'User Authentication', status: 'operational', uptime: '99.8%' },
    { service: 'Payment Processing', status: 'maintenance', uptime: '99.5%' },
    { service: 'API Services', status: 'operational', uptime: '99.9%' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'maintenance':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How can we
            <span className="text-gradient"> help you?</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Find answers, get support, and learn how to make the most of our platform
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-300 text-lg">
              Choose the best way to reach our support team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-lg p-6 text-center cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-400 mb-3">
                  {method.description}
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  {method.availability}
                </div>
                <button type="button" className="btn-primary text-sm">
                  {method.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-lg">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-xs">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={`${faq.question}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white flex-1">
                        {faq.question}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs ml-4 ${
                        faq.popularity === 'high' ? 'bg-red-900 text-red-300' :
                        faq.popularity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-green-900 text-green-300'
                      }`}>
                        {faq.popularity} demand
                      </span>
                    </div>
                    <p className="text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learning Resources
            </h2>
            <p className="text-gray-300 text-lg">
              Additional materials to help you succeed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-lg p-6 cursor-pointer"
              >
                <resource.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{resource.type}</span>
                  <span>{resource.size}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              System Status
            </h2>
            <p className="text-gray-300 text-lg">
              Real-time status of our services
            </p>
          </motion.div>

          <div className="glass-effect rounded-lg p-6">
            <div className="space-y-4">
              {systemStatus.map((service, index) => (
                <motion.div
                  key={service.service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <span className="text-white font-medium">{service.service}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-sm">
                      Uptime: {service.uptime}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.status === 'operational' 
                        ? 'bg-green-900 text-green-300'
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Clock className="w-5 h-5 text-gray-400 inline mr-2" />
              <span className="text-gray-400 text-sm">
                Last updated: {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
