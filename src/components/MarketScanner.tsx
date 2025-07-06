'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Volume,
  Star,
  MoreVertical,
  Eye,
  Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface MarketScannerProps {
  className?: string;
}

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  isFavorite: boolean;
  trend: 'up' | 'down';
}

export function MarketScanner({ className = '' }: MarketScannerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume' | 'marketCap'>('marketCap');
  const [filterBy, setFilterBy] = useState<'all' | 'gainers' | 'losers' | 'favorites'>('all');
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  // Simulated crypto data
  useEffect(() => {
    const mockData: CryptoData[] = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 43250.50,
        change24h: 2.45,
        volume24h: 28500000000,
        marketCap: 847000000000,
        isFavorite: true,
        trend: 'up'
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 2650.75,
        change24h: 3.21,
        volume24h: 15200000000,
        marketCap: 318000000000,
        isFavorite: true,
        trend: 'up'
      },
      {
        symbol: 'BNB',
        name: 'BNB',
        price: 315.20,
        change24h: -1.85,
        volume24h: 850000000,
        marketCap: 47000000000,
        isFavorite: false,
        trend: 'down'
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        price: 98.45,
        change24h: 8.92,
        volume24h: 1200000000,
        marketCap: 42000000000,
        isFavorite: true,
        trend: 'up'
      },
      {
        symbol: 'ADA',
        name: 'Cardano',
        price: 0.485,
        change24h: -3.15,
        volume24h: 280000000,
        marketCap: 17000000000,
        isFavorite: false,
        trend: 'down'
      },
      {
        symbol: 'AVAX',
        name: 'Avalanche',
        price: 35.78,
        change24h: 5.67,
        volume24h: 520000000,
        marketCap: 13000000000,
        isFavorite: false,
        trend: 'up'
      },
      {
        symbol: 'DOT',
        name: 'Polkadot',
        price: 7.23,
        change24h: -2.45,
        volume24h: 145000000,
        marketCap: 9200000000,
        isFavorite: false,
        trend: 'down'
      },
      {
        symbol: 'MATIC',
        name: 'Polygon',
        price: 0.852,
        change24h: 4.32,
        volume24h: 320000000,
        marketCap: 8100000000,
        isFavorite: false,
        trend: 'up'
      }
    ];
    
    setCryptoData(mockData);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const toggleFavorite = (symbol: string) => {
    setCryptoData(prev => prev.map(crypto => 
      crypto.symbol === symbol 
        ? { ...crypto, isFavorite: !crypto.isFavorite }
        : crypto
    ));
  };

  const filteredData = cryptoData
    .filter(crypto => {
      const matchesSearch = crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      
      switch (filterBy) {
        case 'gainers':
          return matchesSearch && crypto.change24h > 0;
        case 'losers':
          return matchesSearch && crypto.change24h < 0;
        case 'favorites':
          return matchesSearch && crypto.isFavorite;
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change24h - a.change24h;
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'marketCap':
          return b.marketCap - a.marketCap;
        default:
          return 0;
      }
    });

  return (
    <div className={`glass-effect rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Market Scanner</h3>
          <p className="text-gray-400 text-sm">Real-time cryptocurrency prices</p>
        </div>
        <div className="flex items-center space-x-2">
          <button type="button" className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
            <Plus className="w-4 h-4 text-gray-300" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cryptocurrencies..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as 'all' | 'gainers' | 'losers' | 'favorites')}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
          >
            <option value="all">All</option>
            <option value="gainers">Gainers</option>
            <option value="losers">Losers</option>
            <option value="favorites">Favorites</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'change' | 'volume' | 'marketCap')}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
          >
            <option value="marketCap">Market Cap</option>
            <option value="price">Price</option>
            <option value="change">24h Change</option>
            <option value="volume">Volume</option>
          </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-4 px-2">
        <div className="col-span-4">Name</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">24h Change</div>
        <div className="col-span-2 text-right">Volume</div>
        <div className="col-span-2 text-right">Market Cap</div>
      </div>

      {/* Crypto List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredData.map((crypto, index) => (
          <motion.div
            key={crypto.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            {/* Name & Symbol */}
            <div className="col-span-4 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => toggleFavorite(crypto.symbol)}
                className="hover:scale-110 transition-transform"
              >
                <Star 
                  className={`w-4 h-4 ${
                    crypto.isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-500'
                  }`} 
                />
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs font-semibold text-white">{crypto.symbol[0]}</span>
              </div>
              <div>
                <div className="font-medium text-white text-sm">{crypto.symbol}</div>
                <div className="text-xs text-gray-400">{crypto.name}</div>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-right">
              <div className="font-medium text-white text-sm">
                {formatPrice(crypto.price)}
              </div>
            </div>

            {/* 24h Change */}
            <div className="col-span-2 text-right">
              <div className={`flex items-center justify-end space-x-1 ${
                crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {crypto.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-sm font-medium">
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Volume */}
            <div className="col-span-2 text-right">
              <div className="text-sm text-gray-300">
                {formatNumber(crypto.volume24h)}
              </div>
            </div>

            {/* Market Cap */}
            <div className="col-span-2 text-right">
              <div className="text-sm text-gray-300">
                {formatNumber(crypto.marketCap)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
        <span>Showing {filteredData.length} cryptocurrencies</span>
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4" />
          <span>Live data</span>
        </div>
      </div>
    </div>
  );
}
