'use client';

import { motion } from 'framer-motion';
import { Activity, BarChart3, Calendar, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PriceData {
  time: string;
  bitcoin: number;
  ethereum: number;
  binance: number;
  solana: number;
}

interface VolumeData {
  time: string;
  volume: number;
}

interface MarketCapData {
  name: string;
  value: number;
  color: string;
}

export function AdvancedCharts() {
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '1M' | '1Y'>('7D');
  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'volume'>('line');
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [volumeData, setVolumeData] = useState<VolumeData[]>([]);
  const [marketCapData, setMarketCapData] = useState<MarketCapData[]>([]);

  useEffect(() => {
    // Generate mock data based on timeframe
    const generateData = () => {
      const days = timeframe === '1D' ? 1 : timeframe === '7D' ? 7 : timeframe === '1M' ? 30 : 365;
      const intervals = timeframe === '1D' ? 24 : days;

      const newPriceData: PriceData[] = [];
      const newVolumeData: VolumeData[] = [];

      for (let i = 0; i < intervals; i++) {
        const time =
          timeframe === '1D'
            ? `${i}:00`
            : new Date(Date.now() - (intervals - i) * 24 * 60 * 60 * 1000).toLocaleDateString();

        newPriceData.push({
          time,
          bitcoin: 45000 + Math.random() * 10000,
          ethereum: 2800 + Math.random() * 1000,
          binance: 380 + Math.random() * 100,
          solana: 95 + Math.random() * 50,
        });

        newVolumeData.push({
          time,
          volume: 20000000000 + Math.random() * 10000000000,
        });
      }

      setPriceData(newPriceData);
      setVolumeData(newVolumeData);
    };

    generateData();

    // Market cap distribution
    setMarketCapData([
      { name: 'Bitcoin', value: 875, color: '#f7931a' },
      { name: 'Ethereum', value: 336, color: '#627eea' },
      { name: 'BNB', value: 58, color: '#f0b90b' },
      { name: 'Solana', value: 42, color: '#9945ff' },
      { name: 'XRP', value: 38, color: '#23292f' },
      { name: 'Others', value: 1501, color: '#8884d8' },
    ]);
  }, [timeframe]);

  const timeframes = ['1D', '7D', '1M', '1Y'] as const;
  const chartTypes = [
    { key: 'line', label: 'Line Chart', icon: TrendingUp },
    { key: 'candlestick', label: 'Volume', icon: BarChart3 },
    { key: 'volume', label: 'Market Cap', icon: PieChartIcon },
  ] as const;

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      value: number;
      name?: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
          <p className="text-gray-300">{`Time: ${label}`}</p>
          {payload.map((entry, index: number) => (
            <p key={`${entry.dataKey}-${index}`} className="text-white">
              {`${entry.dataKey}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
          <p className="text-white">{`${payload[0].name}: $${payload[0].value}B`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="container-padding py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Advanced Charts</h2>
        <p className="text-gray-300">Interactive charts and technical analysis tools</p>
      </motion.div>

      {/* Chart Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="crypto-card mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            {chartTypes.map((type) => (
              <button
                key={type.key}
                type="button"
                onClick={() => setChartType(type.key as typeof chartType)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  chartType === type.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span>{type.label}</span>
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Price Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 crypto-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Price Chart</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-gray-300">Bitcoin</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-gray-300">Ethereum</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-gray-300">BNB</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-gray-300">Solana</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            {chartType === 'line' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="bitcoin"
                    stroke="#f7931a"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="ethereum"
                    stroke="#627eea"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="binance"
                    stroke="#f0b90b"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="solana"
                    stroke="#9945ff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            {chartType === 'candlestick' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    formatter={(value: number) => [`$${(value / 1e9).toFixed(2)}B`, 'Volume']}
                    labelStyle={{ color: '#9CA3AF' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  />
                  <Bar dataKey="volume" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Market Cap Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="crypto-card"
        >
          <h3 className="text-xl font-bold text-white mb-6">Market Cap Distribution</h3>
          <div className="h-80">
            {chartType === 'volume' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketCapData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {marketCapData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
            {chartType !== 'volume' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <PieChartIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <div className="text-gray-400">
                    Select "Market Cap" chart to view distribution
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {marketCapData.map((item, index) => (
              <div
                key={`legend-${item.name}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-semibold text-sm">${item.value}B</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Technical Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 crypto-card"
      >
        <h3 className="text-xl font-bold text-white mb-6">Technical Indicators</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-gray-400 mb-2">RSI (14)</div>
            <div className="text-2xl font-bold text-yellow-400">68.5</div>
            <div className="text-sm text-gray-300">Overbought</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 mb-2">MACD</div>
            <div className="text-2xl font-bold text-green-400">+1,250</div>
            <div className="text-sm text-gray-300">Bullish</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 mb-2">Volume</div>
            <div className="text-2xl font-bold text-blue-400">High</div>
            <div className="text-sm text-gray-300">Above Average</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
