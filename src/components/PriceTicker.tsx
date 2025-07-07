'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export function PriceTicker() {
  const [mounted, setMounted] = useState(false);
  const [cryptos, setCryptos] = useState<CryptoPrice[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 45000, change24h: 2.5, volume24h: 28000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 2800, change24h: -1.2, volume24h: 15000000000 },
    { symbol: 'BNB', name: 'BNB', price: 380, change24h: 5.7, volume24h: 2800000000 },
    { symbol: 'SOL', name: 'Solana', price: 95, change24h: 8.3, volume24h: 3200000000 },
    { symbol: 'ADA', name: 'Cardano', price: 0.68, change24h: -2.1, volume24h: 1900000000 },
    { symbol: 'DOT', name: 'Polkadot', price: 12.5, change24h: 4.2, volume24h: 800000000 },
    { symbol: 'AVAX', name: 'Avalanche', price: 42, change24h: 6.8, volume24h: 1200000000 },
    { symbol: 'MATIC', name: 'Polygon', price: 1.15, change24h: -0.8, volume24h: 600000000 },
  ]);

  const [isPaused, setIsPaused] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCryptos((prev) =>
        prev.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.01),
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.5,
        })),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(4);
    if (price < 100) return price.toFixed(2);
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    return `$${volume.toLocaleString()}`;
  };

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="bg-gray-900/90 backdrop-blur-sm border-y border-white/10 py-4 overflow-hidden">
        <div className="flex justify-center items-center py-2">
          <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
          <span className="ml-2 text-gray-400 text-sm">Loading market data...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-900/90 backdrop-blur-sm border-y border-white/10 py-4 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex space-x-8"
        animate={{ x: isPaused ? 0 : [-100, -2000] }}
        transition={{
          x: {
            repeat: isPaused ? 0 : Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {/* Duplicate the array to create seamless loop */}
        {[...cryptos, ...cryptos].map((crypto, index) => (
          <div
            key={`${crypto.symbol}-${index}`}
            className="flex items-center space-x-4 min-w-max cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">{crypto.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{crypto.symbol}</div>
                <div className="text-gray-400 text-xs">{crypto.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">${formatPrice(crypto.price)}</div>
              <div
                className={`text-sm flex items-center ${
                  crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {crypto.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(crypto.change24h).toFixed(2)}%
              </div>
            </div>
            <div className="text-gray-400 text-xs">Vol: {formatVolume(crypto.volume24h)}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
