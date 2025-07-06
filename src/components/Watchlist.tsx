'use client';

import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Bell,
  Settings,
  Plus,
  X,
  AlertTriangle
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  priceAlert?: {
    type: 'above' | 'below';
    value: number;
    enabled: boolean;
  };
  lastUpdated: Date;
}

interface WatchlistProps {
  className?: string;
}

export function Watchlist({ className = '' }: WatchlistProps) {
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  // Simulated watchlist data
  useEffect(() => {
    const mockWatchlist: WatchlistItem[] = [
      {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 43250.50,
        change24h: 2.45,
        priceAlert: { type: 'above', value: 45000, enabled: true },
        lastUpdated: new Date()
      },
      {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        price: 2650.75,
        change24h: 3.21,
        priceAlert: { type: 'below', value: 2500, enabled: true },
        lastUpdated: new Date()
      },
      {
        id: '3',
        symbol: 'SOL',
        name: 'Solana',
        price: 98.45,
        change24h: 8.92,
        lastUpdated: new Date()
      },
      {
        id: '4',
        symbol: 'ADA',
        name: 'Cardano',
        price: 0.485,
        change24h: -3.15,
        priceAlert: { type: 'above', value: 0.50, enabled: false },
        lastUpdated: new Date()
      }
    ];
    
    setWatchlistItems(mockWatchlist);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlistItems(prev => prev.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
        change24h: item.change24h + (Math.random() - 0.5) * 0.5,
        lastUpdated: new Date()
      })));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToWatchlist = () => {
    if (!newSymbol.trim()) return;
    
    const newItem: WatchlistItem = {
      id: Date.now().toString(),
      symbol: newSymbol.toUpperCase(),
      name: newSymbol.charAt(0).toUpperCase() + newSymbol.slice(1),
      price: Math.random() * 1000,
      change24h: (Math.random() - 0.5) * 20,
      lastUpdated: new Date()
    };
    
    setWatchlistItems(prev => [...prev, newItem]);
    setNewSymbol('');
    setShowAddForm(false);
  };

  const togglePriceAlert = (id: string) => {
    setWatchlistItems(prev => prev.map(item => 
      item.id === id && item.priceAlert
        ? { ...item, priceAlert: { ...item.priceAlert, enabled: !item.priceAlert.enabled } }
        : item
    ));
  };

  const shouldShowAlert = (item: WatchlistItem) => {
    if (!item.priceAlert?.enabled) return false;
    
    if (item.priceAlert.type === 'above') {
      return item.price >= item.priceAlert.value;
    }
    return item.price <= item.priceAlert.value;
  };

  return (
    <div className={`glass-effect rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <div>
            <h3 className="text-xl font-semibold text-white">Watchlist</h3>
            <p className="text-gray-400 text-sm">{watchlistItems.length} assets tracked</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
          <button type="button" className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
            <Settings className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Add Asset Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              placeholder="Enter symbol (e.g., BTC)"
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              onKeyDown={(e) => e.key === 'Enter' && addToWatchlist()}
            />
            <button
              type="button"
              onClick={addToWatchlist}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Watchlist Items */}
      <div className="space-y-3">
        {watchlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border transition-all ${
              shouldShowAlert(item) 
                ? 'border-yellow-500 bg-yellow-500/10' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Asset Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">{item.symbol[0]}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{item.symbol}</span>
                    {shouldShowAlert(item) && (
                      <AlertTriangle className="w-4 h-4 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{item.name}</span>
                </div>
              </div>

              {/* Price & Change */}
              <div className="text-right">
                <div className="font-medium text-white text-lg">
                  {formatPrice(item.price)}
                </div>
                <div className={`flex items-center justify-end space-x-1 ${
                  item.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {item.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-sm">
                    {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {item.priceAlert && (
                  <button
                    type="button"
                    onClick={() => togglePriceAlert(item.id)}
                    className={`p-1 rounded transition-colors ${
                      item.priceAlert.enabled 
                        ? 'text-yellow-400 hover:text-yellow-300' 
                        : 'text-gray-500 hover:text-gray-400'
                    }`}
                    title={`Alert ${item.priceAlert.type} $${item.priceAlert.value}`}
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeFromWatchlist(item.id)}
                  className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price Alert Info */}
            {item.priceAlert && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Alert when {item.priceAlert.type} {formatPrice(item.priceAlert.value)}
                  </span>
                  <span className={`${
                    item.priceAlert.enabled ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {item.priceAlert.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {watchlistItems.length === 0 && (
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-400 mb-2">No assets in watchlist</h4>
          <p className="text-gray-500 text-sm">Add cryptocurrencies to track their prices</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
        <span>Updates every 5 seconds</span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Live</span>
        </div>
      </div>
    </div>
  );
}
