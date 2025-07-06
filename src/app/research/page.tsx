'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Filter,
  Download,
  Eye,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useState } from 'react';

export default function ResearchPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const timeframes = [
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '3M' },
    { id: '1y', label: '1Y' }
  ];

  const marketInsights = [
    {
      title: 'Bitcoin Dominance Analysis',
      category: 'Bitcoin',
      date: '2024-01-15',
      readTime: '8 min',
      summary: 'BTC dominance shows signs of stabilization around 42% as altcoin season approaches.',
      trend: 'bullish',
      views: 2840,
      featured: true
    },
    {
      title: 'Ethereum 2.0 Staking Rewards',
      category: 'Ethereum',
      date: '2024-01-14',
      readTime: '12 min',
      summary: 'Analysis of current staking yields and their impact on ETH price dynamics.',
      trend: 'bullish',
      views: 1960,
      featured: false
    },
    {
      title: 'DeFi TVL Recovery Patterns',
      category: 'DeFi',
      date: '2024-01-13',
      readTime: '15 min',
      summary: 'Total Value Locked shows recovery signs after recent market corrections.',
      trend: 'neutral',
      views: 1520,
      featured: true
    },
    {
      title: 'NFT Market Sentiment Shift',
      category: 'NFTs',
      date: '2024-01-12',
      readTime: '6 min',
      summary: 'Blue-chip NFT collections showing renewed interest from institutional buyers.',
      trend: 'bearish',
      views: 980,
      featured: false
    }
  ];

  const marketData = [
    {
      metric: 'Total Market Cap',
      value: '$1.73T',
      change: '+2.4%',
      trend: 'up',
      description: '24h change'
    },
    {
      metric: 'Trading Volume',
      value: '$89.2B',
      change: '-5.1%',
      trend: 'down',
      description: '24h volume'
    },
    {
      metric: 'BTC Dominance',
      value: '42.1%',
      change: '+0.3%',
      trend: 'up',
      description: 'Market share'
    },
    {
      metric: 'Fear & Greed',
      value: '67',
      change: '+8',
      trend: 'up',
      description: 'Greed territory'
    }
  ];

  const topPerformers = [
    { symbol: 'SOL', name: 'Solana', price: '$98.45', change: '+12.4%', trend: 'up' },
    { symbol: 'AVAX', name: 'Avalanche', price: '$35.78', change: '+8.9%', trend: 'up' },
    { symbol: 'MATIC', name: 'Polygon', price: '$0.85', change: '+7.2%', trend: 'up' },
    { symbol: 'ADA', name: 'Cardano', price: '$0.48', change: '+5.1%', trend: 'up' }
  ];

  const topLosers = [
    { symbol: 'LUNA', name: 'Terra', price: '$0.62', change: '-15.2%', trend: 'down' },
    { symbol: 'FTT', name: 'FTX Token', price: '$1.23', change: '-12.8%', trend: 'down' },
    { symbol: 'CRO', name: 'Cronos', price: '$0.067', change: '-8.4%', trend: 'down' },
    { symbol: 'NEAR', name: 'Near Protocol', price: '$2.14', change: '-6.7%', trend: 'down' }
  ];

  const researchReports = [
    {
      title: 'Q1 2024 Crypto Market Outlook',
      type: 'Quarterly Report',
      pages: 45,
      date: '2024-01-01',
      description: 'Comprehensive analysis of market trends and price predictions for Q1 2024.',
      downloadCount: 3240
    },
    {
      title: 'Institutional Adoption Trends',
      type: 'Research Paper',
      pages: 28,
      date: '2023-12-15',
      description: 'Deep dive into institutional cryptocurrency adoption patterns and future outlook.',
      downloadCount: 1890
    },
    {
      title: 'Layer 2 Scaling Solutions',
      type: 'Technical Analysis',
      pages: 32,
      date: '2023-12-10',
      description: 'Analysis of Layer 2 solutions and their impact on Ethereum ecosystem.',
      downloadCount: 2150
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
      case 'bullish':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'down':
      case 'bearish':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
      case 'bullish':
        return 'text-green-400';
      case 'down':
      case 'bearish':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Market Research &
              <span className="text-gradient"> Analysis</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional-grade market analysis, research reports, and insights 
              to help you make informed investment decisions.
            </p>
          </div>

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {marketData.map((data, index) => (
              <motion.div
                key={data.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-400 text-sm">{data.metric}</h3>
                  {getTrendIcon(data.trend)}
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {data.value}
                </div>
                <div className={`text-sm ${getTrendColor(data.trend)}`}>
                  {data.change} {data.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Market Insights */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Latest Market Insights
              </h2>
              <p className="text-gray-300">
                Expert analysis and market commentary
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="all">All Categories</option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="DeFi">DeFi</option>
                  <option value="NFTs">NFTs</option>
                </select>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketInsights.map((insight, index) => (
              <motion.article
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-effect rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-colors ${
                  insight.featured ? 'border-2 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded-full bg-blue-900 text-blue-300 text-xs">
                      {insight.category}
                    </span>
                    {insight.featured && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  {getTrendIcon(insight.trend)}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 hover:text-blue-400 transition-colors">
                  {insight.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {insight.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {insight.date}
                    </span>
                    <span>{insight.readTime}</span>
                  </div>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {insight.views.toLocaleString()}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers & Losers */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <TrendingUp className="w-6 h-6 text-green-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Top Performers</h3>
                  <span className="ml-auto text-sm text-gray-400">24h</span>
                </div>
                
                <div className="space-y-4">
                  {topPerformers.map((coin, index) => (
                    <div key={coin.symbol} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{coin.symbol}</div>
                          <div className="text-sm text-gray-400">{coin.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{coin.price}</div>
                        <div className="text-sm text-green-400">{coin.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Top Losers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <TrendingDown className="w-6 h-6 text-red-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Top Losers</h3>
                  <span className="ml-auto text-sm text-gray-400">24h</span>
                </div>
                
                <div className="space-y-4">
                  {topLosers.map((coin, index) => (
                    <div key={coin.symbol} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{coin.symbol}</div>
                          <div className="text-sm text-gray-400">{coin.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{coin.price}</div>
                        <div className="text-sm text-red-400">{coin.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Reports */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Research Reports
            </h2>
            <p className="text-gray-300 text-lg">
              In-depth analysis and professional market research
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchReports.map((report, index) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-lg p-6 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 rounded-full bg-purple-900 text-purple-300 text-xs">
                    {report.type}
                  </span>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {report.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {report.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{report.pages} pages</span>
                  <span>{report.downloadCount} downloads</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{report.date}</span>
                    <button type="button" className="btn-primary text-sm">
                      Download PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Analytics */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced Analytics
            </h2>
            <p className="text-gray-300 text-lg">
              Professional trading tools and market indicators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-lg p-6 text-center cursor-pointer"
            >
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Technical Analysis
              </h3>
              <p className="text-gray-400 text-sm">
                Professional-grade charting tools with 100+ indicators
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-lg p-6 text-center cursor-pointer"
            >
              <PieChart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Portfolio Analytics
              </h3>
              <p className="text-gray-400 text-sm">
                Comprehensive portfolio tracking and risk assessment
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-lg p-6 text-center cursor-pointer"
            >
              <Activity className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Market Sentiment
              </h3>
              <p className="text-gray-400 text-sm">
                Real-time sentiment analysis and social media trends
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
