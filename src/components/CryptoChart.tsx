'use client';

import { formatCurrency, formatPercentage, generateCryptoData } from '@/lib/utils';
import type { CryptoCurrency } from '@/types';
import { motion } from 'framer-motion';
import { Bitcoin, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const cryptoList: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45250.67,
    change24h: 3.45,
    marketCap: 885000000000,
    volume24h: 28000000000,
    icon: '₿',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2750.89,
    change24h: -1.23,
    marketCap: 330000000000,
    volume24h: 15000000000,
    icon: 'Ξ',
  },
  {
    id: 'binance-coin',
    name: 'BNB',
    symbol: 'BNB',
    price: 285.43,
    change24h: 2.1,
    marketCap: 45000000000,
    volume24h: 2000000000,
    icon: 'B',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.6789,
    change24h: 5.67,
    marketCap: 24000000000,
    volume24h: 1200000000,
    icon: '₳',
  },
];

export function CryptoChart() {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoList[0]);
  const [chartData, setChartData] = useState<{ time: string; price: number; volume: number }[]>([]);
  const [timeframe, setTimeframe] = useState('24H');
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Prevent hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true);
    // Use a fixed seed for initial data to prevent hydration mismatches
    setChartData(generateCryptoData(24, 12345));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [...prevData.slice(1)];
        const lastPrice = newData[newData.length - 1]?.price || selectedCrypto.price;
        const newPrice = lastPrice * (1 + (Math.random() - 0.5) * 0.02);

        newData.push({
          time: new Date().toISOString(),
          price: Number(newPrice.toFixed(2)),
          volume: Math.floor(Math.random() * 1000000000),
        });

        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedCrypto]);

  const timeframes = ['1H', '24H', '7D', '30D', '1Y'];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <section id="markets" ref={ref} className="py-20 bg-gray-900/50">
        <div className="container-padding mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Live Market Data
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Loading real-time cryptocurrency prices and charts...
            </p>
          </div>
          <div className="crypto-card p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect rounded-lg p-3 border border-white/20">
          <p className="text-gray-300 text-sm">
            {label ? new Date(label).toLocaleTimeString() : ''}
          </p>
          <p className="text-white font-semibold">Price: {formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="markets" ref={ref} className="py-20 bg-gray-900/50">
      <div className="container-padding mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Real-Time</span> Market Data
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Track live cryptocurrency prices with professional-grade charts and analytics
            </p>
          </motion.div>

          {/* Crypto Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {cryptoList.map((crypto) => (
              <motion.div
                key={crypto.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCrypto(crypto)}
                className={`crypto-card cursor-pointer transition-all duration-300 ${
                  selectedCrypto.id === crypto.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {crypto.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{crypto.symbol}</h3>
                      <p className="text-sm text-gray-400">{crypto.name}</p>
                    </div>
                  </div>
                  {crypto.change24h >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(crypto.price)}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {formatPercentage(crypto.change24h)}
                  </div>
                  <div className="text-xs text-gray-400">
                    Vol: {formatCurrency(crypto.volume24h / 1000000)}M
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Chart Section */}
          <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {selectedCrypto.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedCrypto.name} ({selectedCrypto.symbol})
                  </h3>
                </div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(chartData[chartData.length - 1]?.price || selectedCrypto.price)}
                </div>
              </div>

              <div className="flex space-x-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      timeframe === tf
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={12}
                  />
                  <YAxis
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
