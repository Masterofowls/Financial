'use client';

import { motion } from 'framer-motion';
import { DollarSign, Percent, Plus, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  price: number;
  change24h: number;
  value: number;
}

export function PortfolioTracker() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      price: 45000,
      change24h: 2.5,
      value: 22500,
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 10,
      price: 2800,
      change24h: -1.2,
      value: 28000,
    },
    {
      id: '3',
      symbol: 'ADA',
      name: 'Cardano',
      amount: 1000,
      price: 0.85,
      change24h: 5.7,
      value: 850,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    symbol: '',
    amount: '',
  });

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = assets.reduce((sum, asset) => sum + (asset.value * asset.change24h) / 100, 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  const updatePrices = useCallback(() => {
    setAssets((prev) =>
      prev.map((asset) => ({
        ...asset,
        price: asset.price * (1 + (Math.random() - 0.5) * 0.02),
        change24h: asset.change24h + (Math.random() - 0.5) * 2,
        value: asset.amount * asset.price,
      })),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updatePrices, 5000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  const addAsset = () => {
    if (newAsset.symbol && newAsset.amount) {
      const mockPrice = Math.random() * 1000 + 100;
      const asset: PortfolioAsset = {
        id: Date.now().toString(),
        symbol: newAsset.symbol.toUpperCase(),
        name: newAsset.symbol,
        amount: Number.parseFloat(newAsset.amount),
        price: mockPrice,
        change24h: (Math.random() - 0.5) * 10,
        value: Number.parseFloat(newAsset.amount) * mockPrice,
      };
      setAssets((prev) => [...prev, asset]);
      setNewAsset({ symbol: '', amount: '' });
      setShowAddForm(false);
    }
  };

  const removeAsset = (id: string) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="crypto-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Portfolio Tracker</h2>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-white">
            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Percent className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400">24h Change</span>
          </div>
          <div
            className={`text-2xl font-bold flex items-center ${
              totalChangePercent >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {totalChangePercent >= 0 ? (
              <TrendingUp className="w-5 h-5 mr-1" />
            ) : (
              <TrendingDown className="w-5 h-5 mr-1" />
            )}
            {Math.abs(totalChangePercent).toFixed(2)}%
          </div>
        </div>
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400">P&L Today</span>
          </div>
          <div
            className={`text-2xl font-bold ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}
          >
            ${totalChange >= 0 ? '+' : ''}
            {totalChange.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {/* Add Asset Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-effect rounded-lg p-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Add New Asset</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Symbol (e.g., BTC)"
              value={newAsset.symbol}
              onChange={(e) => setNewAsset((prev) => ({ ...prev, symbol: e.target.value }))}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newAsset.amount}
              onChange={(e) => setNewAsset((prev) => ({ ...prev, amount: e.target.value }))}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button type="button" onClick={addAsset} className="btn-primary">
              Add Asset
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Assets List */}
      <div className="space-y-3">
        {assets.map((asset) => (
          <motion.div key={asset.id} layout className="glass-effect rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{asset.symbol}</div>
                  <div className="text-gray-400 text-sm">{asset.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {asset.amount} {asset.symbol}
                </div>
                <div className="text-gray-400 text-sm">
                  ${asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  ${asset.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div
                  className={`text-sm flex items-center ${
                    asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {asset.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(asset.change24h).toFixed(2)}%
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeAsset(asset.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
