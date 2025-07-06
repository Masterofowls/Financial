'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, TrendingDown, TrendingUp, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Indicator {
  id: string;
  name: string;
  value: number;
  signal: 'bullish' | 'bearish' | 'neutral';
  strength: 'strong' | 'moderate' | 'weak';
  description: string;
  period: string;
}

interface MarketSentiment {
  score: number;
  label: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

export function MarketIndicators() {
  const [indicators, setIndicators] = useState<Indicator[]>([
    {
      id: 'rsi',
      name: 'RSI (14)',
      value: 68.5,
      signal: 'bullish',
      strength: 'moderate',
      description:
        'Relative Strength Index indicates momentum is strong but approaching overbought levels',
      period: '14 days',
    },
    {
      id: 'macd',
      name: 'MACD',
      value: 1250,
      signal: 'bullish',
      strength: 'strong',
      description: 'MACD line is above signal line, indicating strong bullish momentum',
      period: '12,26,9',
    },
    {
      id: 'bb',
      name: 'Bollinger Bands',
      value: 75,
      signal: 'neutral',
      strength: 'weak',
      description: 'Price is in the middle of the bands, indicating neutral momentum',
      period: '20 days',
    },
    {
      id: 'ema',
      name: 'EMA (50)',
      value: 43500,
      signal: 'bullish',
      strength: 'strong',
      description: 'Price is above the 50-day EMA, confirming uptrend',
      period: '50 days',
    },
    {
      id: 'volume',
      name: 'Volume Profile',
      value: 125,
      signal: 'bullish',
      strength: 'moderate',
      description: 'Trading volume is above average, supporting price movement',
      period: '30 days',
    },
    {
      id: 'support',
      name: 'Support/Resistance',
      value: 44000,
      signal: 'neutral',
      strength: 'moderate',
      description: 'Price is holding above key support level at $44,000',
      period: 'Current',
    },
  ]);

  const [sentiment, setSentiment] = useState<MarketSentiment>({
    score: 74,
    label: 'Greed',
    color: 'text-green-400',
    trend: 'up',
  });

  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'warning',
      message: 'Bitcoin RSI approaching overbought territory (>70)',
      severity: 'medium',
    },
    {
      id: '2',
      type: 'success',
      message: 'Strong bullish divergence detected on MACD',
      severity: 'high',
    },
    {
      id: '3',
      type: 'info',
      message: 'Volume spike detected in the last 4 hours',
      severity: 'low',
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndicators((prev) =>
        prev.map((indicator) => ({
          ...indicator,
          value: indicator.value * (1 + (Math.random() - 0.5) * 0.02),
        })),
      );

      setSentiment((prev) => ({
        ...prev,
        score: Math.max(0, Math.min(100, prev.score + (Math.random() - 0.5) * 5)),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-400" />;
    }
  };

  const getSignalColor = (signal: string, strength: string) => {
    const baseColors = {
      bullish: 'text-green-400',
      bearish: 'text-red-400',
      neutral: 'text-gray-400',
    };
    return baseColors[signal as keyof typeof baseColors];
  };

  const getStrengthBars = (strength: string) => {
    const levels = { weak: 1, moderate: 2, strong: 3 };
    const level = levels[strength as keyof typeof levels];

    return (
      <div className="flex space-x-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-4 rounded ${
              i <= level
                ? strength === 'strong'
                  ? 'bg-green-400'
                  : strength === 'moderate'
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="container-padding py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Market Indicators</h2>
        <p className="text-gray-300">Technical analysis and market sentiment indicators</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Technical Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="crypto-card">
            <h3 className="text-xl font-bold text-white mb-6">Technical Indicators</h3>
            <div className="space-y-4">
              {indicators.map((indicator, index) => (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="glass-effect rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getSignalIcon(indicator.signal)}
                      <div>
                        <div className="text-white font-semibold">{indicator.name}</div>
                        <div className="text-gray-400 text-sm">{indicator.period}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${getSignalColor(indicator.signal, indicator.strength)}`}
                      >
                        {indicator.name.includes('EMA') || indicator.name.includes('Support')
                          ? `$${indicator.value.toLocaleString()}`
                          : indicator.value.toFixed(1)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm capitalize">
                          {indicator.strength}
                        </span>
                        {getStrengthBars(indicator.strength)}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">{indicator.description}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        indicator.signal === 'bullish'
                          ? 'bg-green-500/20 text-green-400'
                          : indicator.signal === 'bearish'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {indicator.signal.charAt(0).toUpperCase() + indicator.signal.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sentiment & Alerts */}
        <div className="space-y-8">
          {/* Market Sentiment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="crypto-card"
          >
            <h3 className="text-xl font-bold text-white mb-6">Market Sentiment</h3>
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold ${sentiment.color} mb-2`}>
                {Math.round(sentiment.score)}
              </div>
              <div className={`text-lg ${sentiment.color} mb-4`}>{sentiment.label}</div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    sentiment.score >= 75
                      ? 'bg-green-400'
                      : sentiment.score >= 50
                        ? 'bg-yellow-400'
                        : sentiment.score >= 25
                          ? 'bg-orange-400'
                          : 'bg-red-400'
                  }`}
                  style={{ width: `${sentiment.score}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Extreme Fear</span>
                <span>Neutral</span>
                <span>Extreme Greed</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Social Sentiment</span>
                <span className="text-green-400">Positive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">News Sentiment</span>
                <span className="text-yellow-400">Mixed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Whale Activity</span>
                <span className="text-green-400">Accumulating</span>
              </div>
            </div>
          </motion.div>

          {/* Market Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="crypto-card"
          >
            <h3 className="text-xl font-bold text-white mb-6">Market Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`glass-effect rounded-lg p-3 border-l-4 ${
                    alert.type === 'warning'
                      ? 'border-yellow-400'
                      : alert.type === 'success'
                        ? 'border-green-400'
                        : alert.type === 'error'
                          ? 'border-red-400'
                          : 'border-blue-400'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="text-white text-sm">{alert.message}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} priority
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="crypto-card"
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Volatility (30d)</span>
                <span className="text-orange-400">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Correlation BTC/ETH</span>
                <span className="text-blue-400">0.87</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Phase</span>
                <span className="text-green-400">Bull Market</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trend Strength</span>
                <span className="text-green-400">Strong</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
