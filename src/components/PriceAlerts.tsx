'use client';

import { motion } from 'framer-motion';
import { Bell, Plus, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  currentPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  triggered: boolean;
  createdAt: Date;
}

export function PriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      symbol: 'BTC',
      targetPrice: 50000,
      currentPrice: 45000,
      condition: 'above',
      isActive: true,
      triggered: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      symbol: 'ETH',
      targetPrice: 2500,
      currentPrice: 2800,
      condition: 'below',
      isActive: true,
      triggered: true,
      createdAt: new Date(),
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    targetPrice: '',
    condition: 'above' as 'above' | 'below',
  });

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) =>
        prev.map((alert) => {
          const newPrice = alert.currentPrice * (1 + (Math.random() - 0.5) * 0.02);
          const shouldTrigger =
            (alert.condition === 'above' && newPrice >= alert.targetPrice) ||
            (alert.condition === 'below' && newPrice <= alert.targetPrice);

          return {
            ...alert,
            currentPrice: newPrice,
            triggered: alert.triggered || (shouldTrigger && alert.isActive),
          };
        }),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addAlert = () => {
    if (newAlert.symbol && newAlert.targetPrice) {
      const alert: PriceAlert = {
        id: Date.now().toString(),
        symbol: newAlert.symbol.toUpperCase(),
        targetPrice: Number.parseFloat(newAlert.targetPrice),
        currentPrice: Math.random() * 1000 + 100, // Mock current price
        condition: newAlert.condition,
        isActive: true,
        triggered: false,
        createdAt: new Date(),
      };
      setAlerts((prev) => [...prev, alert]);
      setNewAlert({ symbol: '', targetPrice: '', condition: 'above' });
      setShowAddForm(false);
    }
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)),
    );
  };

  const activeAlerts = alerts.filter((alert) => alert.isActive).length;
  const triggeredAlerts = alerts.filter((alert) => alert.triggered).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="crypto-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Price Alerts</h2>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Alert</span>
        </button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400">Active Alerts</span>
          </div>
          <div className="text-2xl font-bold text-white">{activeAlerts}</div>
        </div>
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Bell className="w-5 h-5 text-orange-400" />
            <span className="text-gray-400">Triggered</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">{triggeredAlerts}</div>
        </div>
      </div>

      {/* Add Alert Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-effect rounded-lg p-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Create Price Alert</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Symbol (e.g., BTC)"
              value={newAlert.symbol}
              onChange={(e) => setNewAlert((prev) => ({ ...prev, symbol: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            />
            <div className="flex space-x-2">
              <select
                value={newAlert.condition}
                onChange={(e) =>
                  setNewAlert((prev) => ({
                    ...prev,
                    condition: e.target.value as 'above' | 'below',
                  }))
                }
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
              <input
                type="number"
                placeholder="Target Price"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert((prev) => ({ ...prev, targetPrice: e.target.value }))}
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button type="button" onClick={addAlert} className="btn-primary">
              Create Alert
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            className={`glass-effect rounded-lg p-4 ${
              alert.triggered ? 'ring-2 ring-orange-400' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    alert.triggered
                      ? 'bg-orange-500'
                      : alert.isActive
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                  }`}
                >
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">{alert.symbol}</div>
                  <div className="text-gray-400 text-sm">
                    {alert.condition === 'above' ? 'Above' : 'Below'} $
                    {alert.targetPrice.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  ${alert.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-sm flex items-center justify-end ${
                    alert.condition === 'above'
                      ? alert.currentPrice >= alert.targetPrice
                        ? 'text-green-400'
                        : 'text-gray-400'
                      : alert.currentPrice <= alert.targetPrice
                        ? 'text-red-400'
                        : 'text-gray-400'
                  }`}
                >
                  {alert.condition === 'above' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {alert.condition === 'above' ? 'Target Above' : 'Target Below'}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => toggleAlert(alert.id)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    alert.isActive ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {alert.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  type="button"
                  onClick={() => removeAlert(alert.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {alert.triggered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 p-2 bg-orange-500/20 rounded-lg"
              >
                <div className="text-orange-400 text-sm font-medium">
                  🔔 Alert Triggered! {alert.symbol} is now {alert.condition} $
                  {alert.targetPrice.toLocaleString()}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <div className="text-gray-400">No price alerts set</div>
          <div className="text-gray-500 text-sm">
            Create your first alert to get notified of price movements
          </div>
        </div>
      )}
    </motion.div>
  );
}
