'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Award,
  TrendingUp,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function LearnPage() {
  const courses = [
    {
      title: 'Cryptocurrency Fundamentals',
      description: 'Learn the basics of blockchain technology and cryptocurrency.',
      duration: '4 hours',
      lessons: 12,
      level: 'Beginner',
      icon: BookOpen,
      color: 'from-blue-400 to-purple-600'
    },
    {
      title: 'Technical Analysis Mastery',
      description: 'Master chart patterns, indicators, and trading strategies.',
      duration: '6 hours',
      lessons: 18,
      level: 'Intermediate',
      icon: TrendingUp,
      color: 'from-green-400 to-blue-600'
    },
    {
      title: 'DeFi and Yield Farming',
      description: 'Understand decentralized finance and yield opportunities.',
      duration: '5 hours',
      lessons: 15,
      level: 'Advanced',
      icon: Users,
      color: 'from-purple-400 to-pink-600'
    },
    {
      title: 'Risk Management',
      description: 'Learn to protect your investments and manage portfolio risk.',
      duration: '3 hours',
      lessons: 10,
      level: 'Intermediate',
      icon: Award,
      color: 'from-orange-400 to-red-600'
    }
  ];

  const resources = [
    {
      type: 'Article',
      title: 'Understanding Market Cycles',
      readTime: '8 min read',
      icon: FileText,
      category: 'Analysis'
    },
    {
      type: 'Video',
      title: 'Setting Up Your First Wallet',
      readTime: '15 min watch',
      icon: Video,
      category: 'Tutorial'
    },
    {
      type: 'Guide',
      title: 'Crypto Tax Planning',
      readTime: '12 min read',
      icon: BookOpen,
      category: 'Finance'
    },
    {
      type: 'Article',
      title: 'NFT Market Analysis',
      readTime: '6 min read',
      icon: FileText,
      category: 'Trends'
    }
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
            Learn & Grow Your
            <span className="text-gradient"> Crypto Knowledge</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master cryptocurrency trading, DeFi protocols, and blockchain technology 
            with our comprehensive educational resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Start Learning
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Browse Resources
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-300 text-lg">
              Structured learning paths to accelerate your crypto journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-lg p-6 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${course.color} flex items-center justify-center mb-4`}>
                  <course.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                  <span>{course.lessons} lessons</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.level === 'Beginner' ? 'bg-green-900 text-green-300' :
                    course.level === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {course.level}
                  </span>
                  <button type="button" className="text-blue-400 text-sm hover:text-blue-300">
                    Start Course →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest Resources
            </h2>
            <p className="text-gray-300 text-lg">
              Stay updated with the latest insights and tutorials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-lg p-6 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">
                    {resource.category}
                  </span>
                  <resource.icon className="w-5 h-5 text-gray-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{resource.type}</span>
                  <span>{resource.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Learning Journey
            </h2>
            <p className="text-gray-300 text-lg">
              Follow our structured path from beginner to expert
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: 1, title: 'Fundamentals', desc: 'Learn blockchain basics', completed: true },
              { step: 2, title: 'Trading Basics', desc: 'Understand markets and orders', completed: true },
              { step: 3, title: 'Technical Analysis', desc: 'Master chart reading', completed: false },
              { step: 4, title: 'Advanced Strategies', desc: 'Professional trading techniques', completed: false },
              { step: 5, title: 'Portfolio Management', desc: 'Risk management and diversification', completed: false }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.completed ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  {item.completed ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white font-semibold">{item.step}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${
                    item.completed ? 'text-green-400' : 'text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {!item.completed && (
                  <button type="button" className="btn-primary text-sm">
                    Start
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
