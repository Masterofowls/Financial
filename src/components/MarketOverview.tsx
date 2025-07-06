'use client';

import { motion } from 'framer-motion';
import { Activity, BarChart3, DollarSign, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MarketData {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  activeCryptos: number;
  marketChange24h: number;
  fearGreedIndex: number;
}

interface TopCrypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

export function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData>({
    totalMarketCap: 2850000000000,
    totalVolume24h: 95000000000,
    btcDominance: 42.5,
    activeCryptos: 23567,
    marketChange24h: 3.2,
    fearGreedIndex: 74,
  });

  const [topCryptos, setTopCryptos] = useState<TopCrypto[]>([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 45000,
      change24h: 2.5,
      marketCap: 875000000000,
      volume24h: 28000000000,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2800,
      change24h: -1.2,
      marketCap: 336000000000,
      volume24h: 15000000000,
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'BNB',
      price: 380,
      change24h: 5.7,
      marketCap: 58000000000,
      volume24h: 2800000000,
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 95,
      change24h: 8.3,
      marketCap: 42000000000,
      volume24h: 3200000000,
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'XRP',
      price: 0.68,
      change24h: -2.1,
      marketCap: 38000000000,
      volume24h: 1900000000,
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        totalMarketCap: prev.totalMarketCap * (1 + (Math.random() - 0.5) * 0.001),
        totalVolume24h: prev.totalVolume24h * (1 + (Math.random() - 0.5) * 0.01),
        marketChange24h: prev.marketChange24h + (Math.random() - 0.5) * 0.1,
        fearGreedIndex: Math.max(0, Math.min(100, prev.fearGreedIndex + (Math.random() - 0.5) * 2)),
      }));

      setTopCryptos((prev) =>
        prev.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.01),
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.5,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const getFearGreedColor = (index: number) => {
    if (index >= 75) return 'text-green-400';
    if (index >= 50) return 'text-yellow-400';
    if (index >= 25) return 'text-orange-400';
    return 'text-red-400';
  };

  const getFearGreedLabel = (index: number) => {
    if (index >= 75) return 'Extreme Greed';
    if (index >= 50) return 'Greed';
    if (index >= 25) return 'Fear';
    return 'Extreme Fear';
  };

  return (
    <section className="container-padding py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Market Overview</h2>
        <p className="text-gray-300">Real-time cryptocurrency market data and statistics</p>
      </motion.div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="crypto-card text-center"
        >
          <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-sm text-gray-400 mb-1">Market Cap</div>
          <div className="text-lg font-bold text-white">
            {formatNumber(marketData.totalMarketCap)}
          </div>
          <div
            className={`text-sm ${marketData.marketChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
          >
            {marketData.marketChange24h >= 0 ? '+' : ''}
            {marketData.marketChange24h.toFixed(2)}%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="crypto-card text-center"
        >
          <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-sm text-gray-400 mb-1">24h Volume</div>
          <div className="text-lg font-bold text-white">
            {formatNumber(marketData.totalVolume24h)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="crypto-card text-center"
        >
          <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="text-sm text-gray-400 mb-1">BTC Dominance</div>
          <div className="text-lg font-bold text-white">{marketData.btcDominance.toFixed(1)}%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="crypto-card text-center"
        >
          <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-sm text-gray-400 mb-1">Active Cryptos</div>
          <div className="text-lg font-bold text-white">
            {marketData.activeCryptos.toLocaleString()}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="crypto-card text-center col-span-2"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="text-sm text-gray-400">Fear & Greed Index</div>
          </div>
          <div className={`text-2xl font-bold ${getFearGreedColor(marketData.fearGreedIndex)}`}>
            {Math.round(marketData.fearGreedIndex)}
          </div>
          <div className={`text-sm ${getFearGreedColor(marketData.fearGreedIndex)}`}>
            {getFearGreedLabel(marketData.fearGreedIndex)}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                marketData.fearGreedIndex >= 75
                  ? 'bg-green-400'
                  : marketData.fearGreedIndex >= 50
                    ? 'bg-yellow-400'
                    : marketData.fearGreedIndex >= 25
                      ? 'bg-orange-400'
                      : 'bg-red-400'
              }`}
              style={{ width: `${marketData.fearGreedIndex}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Top Cryptocurrencies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="crypto-card"
      >
        <h3 className="text-xl font-bold text-white mb-6">Top Cryptocurrencies</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left pb-4">#</th>
                <th className="text-left pb-4">Name</th>
                <th className="text-right pb-4">Price</th>
                <th className="text-right pb-4">24h Change</th>
                <th className="text-right pb-4">Market Cap</th>
                <th className="text-right pb-4">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {topCryptos.map((crypto, index) => (
                <motion.tr
                  key={crypto.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 text-gray-400">{index + 1}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {crypto.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{crypto.name}</div>
                        <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right text-white font-semibold">
                    ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </td>
                  <td
                    className={`py-4 text-right font-semibold ${
                      crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      {crypto.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{Math.abs(crypto.change24h).toFixed(2)}%</span>
                    </div>
                  </td>
                  <td className="py-4 text-right text-gray-300">
                    {formatNumber(crypto.marketCap)}
                  </td>
                  <td className="py-4 text-right text-gray-300">
                    {formatNumber(crypto.volume24h)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
