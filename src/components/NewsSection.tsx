'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Filter, Search, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  image: string;
  readTime: number;
  tags: string[];
}

export function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'bitcoin', 'ethereum', 'defi', 'nft', 'regulation', 'analysis'];

  // Mock news data
  useEffect(() => {
    setTimeout(() => {
      setArticles([
        {
          id: '1',
          title: 'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
          excerpt:
            'Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented demand.',
          content:
            'Bitcoin has reached a new all-time high of $75,000 as institutional adoption continues to accelerate...',
          author: 'Sarah Johnson',
          publishedAt: new Date('2025-01-06'),
          category: 'bitcoin',
          image: 'https://images.unsplash.com/photo-1518544866588-3eab3b1c1321?w=600',
          readTime: 5,
          tags: ['bitcoin', 'institutional', 'ath'],
        },
        {
          id: '2',
          title: 'Ethereum 2.0 Staking Rewards Hit Record Levels',
          excerpt:
            'With over 15 million ETH staked, validators are earning attractive yields while securing the network.',
          content:
            'Ethereum staking has become increasingly popular as validators earn substantial rewards...',
          author: 'Mike Chen',
          publishedAt: new Date('2025-01-05'),
          category: 'ethereum',
          image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600',
          readTime: 4,
          tags: ['ethereum', 'staking', 'pos'],
        },
        {
          id: '3',
          title: 'DeFi Total Value Locked Surpasses $200 Billion',
          excerpt:
            'Decentralized finance protocols continue to grow as users seek higher yields and financial freedom.',
          content:
            'The DeFi ecosystem has reached a new milestone with over $200 billion in total value locked...',
          author: 'Alex Rivera',
          publishedAt: new Date('2025-01-04'),
          category: 'defi',
          image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600',
          readTime: 6,
          tags: ['defi', 'tvl', 'yield'],
        },
        {
          id: '4',
          title: 'New Crypto Regulations Approved in European Union',
          excerpt:
            'MiCA regulations provide clarity for crypto businesses while ensuring consumer protection.',
          content:
            'The European Union has finalized its Markets in Crypto-Assets (MiCA) regulation...',
          author: 'Emma Thompson',
          publishedAt: new Date('2025-01-03'),
          category: 'regulation',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
          readTime: 7,
          tags: ['regulation', 'eu', 'mica'],
        },
        {
          id: '5',
          title: 'NFT Market Shows Signs of Recovery with New Use Cases',
          excerpt:
            'Utility-driven NFTs are driving renewed interest in the non-fungible token space.',
          content: 'After a challenging year, the NFT market is showing signs of recovery...',
          author: 'David Kim',
          publishedAt: new Date('2025-01-02'),
          category: 'nft',
          image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600',
          readTime: 5,
          tags: ['nft', 'utility', 'recovery'],
        },
        {
          id: '6',
          title: 'Technical Analysis: Bull Market Continuation Patterns',
          excerpt:
            'Chart patterns suggest the current bull market has more room to run based on historical data.',
          content:
            'Technical indicators are showing strong bullish signals across major cryptocurrencies...',
          author: 'Technical Team',
          publishedAt: new Date('2025-01-01'),
          category: 'analysis',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600',
          readTime: 8,
          tags: ['analysis', 'bullish', 'technical'],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <section className="container-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`skeleton-${Date.now()}-${i}`} className="crypto-card animate-pulse">
              <div className="bg-gray-700 h-48 rounded-lg mb-4" />
              <div className="bg-gray-700 h-4 rounded mb-2" />
              <div className="bg-gray-700 h-4 rounded w-3/4 mb-2" />
              <div className="bg-gray-700 h-3 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container-padding py-16">
      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all'
                    ? 'All Categories'
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="crypto-card mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="text-gray-400 text-sm capitalize">
                  {filteredArticles[0].category}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{filteredArticles[0].title}</h2>
              <p className="text-gray-300 text-lg mb-6">{filteredArticles[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{filteredArticles[0].publishedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{filteredArticles[0].readTime} min read</span>
                  </div>
                  <span>By {filteredArticles[0].author}</span>
                </div>
                <button type="button" className="btn-primary flex items-center space-x-2">
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <div className="flex flex-wrap gap-2">
                  {filteredArticles[0].tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.slice(1).map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
            className="crypto-card group cursor-pointer"
          >
            <div className="relative mb-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                  {article.category}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.publishedAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}m</span>
                </div>
              </div>
              <div className="text-blue-400 group-hover:text-blue-300">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-gray-400 text-lg">No articles found matching your criteria.</div>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 btn-secondary"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Load More */}
      {filteredArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button type="button" className="btn-primary">
            Load More Articles
          </button>
        </motion.div>
      )}
    </section>
  );
}
