'use client';

import { motion } from 'framer-motion';
import { Calculator, DollarSign, Percent, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface CalculationResult {
  investment: number;
  returns: number;
  profit: number;
  profitPercent: number;
  fees: number;
  netProfit: number;
}

export function TradingCalculator() {
  const [calculatorType, setCalculatorType] = useState<'profit' | 'position' | 'fee'>('profit');

  // Profit Calculator
  const [profitInputs, setProfitInputs] = useState({
    buyPrice: '',
    sellPrice: '',
    quantity: '',
    feePercent: '0.1',
  });

  // Position Size Calculator
  const [positionInputs, setPositionInputs] = useState({
    accountSize: '',
    riskPercent: '2',
    entryPrice: '',
    stopLoss: '',
  });

  // Fee Calculator
  const [feeInputs, setFeeInputs] = useState({
    tradeAmount: '',
    makerFee: '0.1',
    takerFee: '0.1',
    tradeType: 'taker',
  });

  const [results, setResults] = useState<{
    type?: string;
    profit?: number;
    profitPercent?: number;
    profitAfterFees?: number;
    positionSize?: number;
    riskAmount?: number;
    fees?: number;
    investment?: number;
    returns?: number;
    netProfit?: number;
    netProfitPercent?: number;
    accountSize?: number;
    riskPerShare?: number;
    positionValue?: number;
    tradeAmount?: number;
    riskPercent?: number;
    feeRate?: number;
    tradeType?: string;
    fee?: number;
    netAmount?: number;
  } | null>(null);

  const calculateProfit = () => {
    const buyPrice = Number.parseFloat(profitInputs.buyPrice);
    const sellPrice = Number.parseFloat(profitInputs.sellPrice);
    const quantity = Number.parseFloat(profitInputs.quantity);
    const feePercent = Number.parseFloat(profitInputs.feePercent) / 100;

    if (buyPrice && sellPrice && quantity) {
      const investment = buyPrice * quantity;
      const returns = sellPrice * quantity;
      const profit = returns - investment;
      const profitPercent = (profit / investment) * 100;
      const fees = (investment + returns) * feePercent;
      const netProfit = profit - fees;

      setResults({
        type: 'profit',
        investment,
        returns,
        profit,
        profitPercent,
        fees,
        netProfit,
        netProfitPercent: (netProfit / investment) * 100,
      });
    }
  };

  const calculatePositionSize = () => {
    const accountSize = Number.parseFloat(positionInputs.accountSize);
    const riskPercent = Number.parseFloat(positionInputs.riskPercent) / 100;
    const entryPrice = Number.parseFloat(positionInputs.entryPrice);
    const stopLoss = Number.parseFloat(positionInputs.stopLoss);

    if (accountSize && riskPercent && entryPrice && stopLoss) {
      const riskAmount = accountSize * riskPercent;
      const riskPerShare = Math.abs(entryPrice - stopLoss);
      const positionSize = riskAmount / riskPerShare;
      const positionValue = positionSize * entryPrice;

      setResults({
        type: 'position',
        accountSize,
        riskAmount,
        riskPerShare,
        positionSize,
        positionValue,
        riskPercent: riskPercent * 100,
      });
    }
  };

  const calculateFees = () => {
    const tradeAmount = Number.parseFloat(feeInputs.tradeAmount);
    const feeRate =
      Number.parseFloat(feeInputs.tradeType === 'maker' ? feeInputs.makerFee : feeInputs.takerFee) /
      100;

    if (tradeAmount && feeRate) {
      const fee = tradeAmount * feeRate;
      const netAmount = tradeAmount - fee;

      setResults({
        type: 'fee',
        tradeAmount,
        feeRate: feeRate * 100,
        fee,
        netAmount,
        tradeType: feeInputs.tradeType,
      });
    }
  };

  const handleCalculate = () => {
    switch (calculatorType) {
      case 'profit':
        calculateProfit();
        break;
      case 'position':
        calculatePositionSize();
        break;
      case 'fee':
        calculateFees();
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="crypto-card"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Trading Calculator</h2>
      </div>

      {/* Calculator Type Selector */}
      <div className="flex space-x-2 mb-6">
        {[
          { key: 'profit', label: 'Profit/Loss' },
          { key: 'position', label: 'Position Size' },
          { key: 'fee', label: 'Fee Calculator' },
        ].map((type) => (
          <button
            key={type.key}
            type="button"
            onClick={() => {
              setCalculatorType(type.key as typeof calculatorType);
              setResults(null);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              calculatorType === type.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div>
          {calculatorType === 'profit' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Profit/Loss Calculator</h3>
              <div>
                <label htmlFor="buyPrice" className="block text-gray-400 mb-2">
                  Buy Price ($)
                </label>
                <input
                  id="buyPrice"
                  type="number"
                  value={profitInputs.buyPrice}
                  onChange={(e) =>
                    setProfitInputs((prev) => ({ ...prev, buyPrice: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter buy price"
                />
              </div>
              <div>
                <label htmlFor="sellPrice" className="block text-gray-400 mb-2">
                  Sell Price ($)
                </label>
                <input
                  id="sellPrice"
                  type="number"
                  value={profitInputs.sellPrice}
                  onChange={(e) =>
                    setProfitInputs((prev) => ({ ...prev, sellPrice: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter sell price"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-gray-400 mb-2">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={profitInputs.quantity}
                  onChange={(e) =>
                    setProfitInputs((prev) => ({ ...prev, quantity: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label htmlFor="feePercent" className="block text-gray-400 mb-2">
                  Trading Fee (%)
                </label>
                <input
                  id="feePercent"
                  type="number"
                  value={profitInputs.feePercent}
                  onChange={(e) =>
                    setProfitInputs((prev) => ({ ...prev, feePercent: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="0.1"
                />
              </div>
            </div>
          )}

          {calculatorType === 'position' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Position Size Calculator</h3>
              <div>
                <label htmlFor="accountSize" className="block text-gray-400 mb-2">
                  Account Size ($)
                </label>
                <input
                  id="accountSize"
                  type="number"
                  value={positionInputs.accountSize}
                  onChange={(e) =>
                    setPositionInputs((prev) => ({ ...prev, accountSize: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter account size"
                />
              </div>
              <div>
                <label htmlFor="riskPercent" className="block text-gray-400 mb-2">
                  Risk Per Trade (%)
                </label>
                <input
                  id="riskPercent"
                  type="number"
                  value={positionInputs.riskPercent}
                  onChange={(e) =>
                    setPositionInputs((prev) => ({ ...prev, riskPercent: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="2"
                />
              </div>
              <div>
                <label htmlFor="entryPrice" className="block text-gray-400 mb-2">
                  Entry Price ($)
                </label>
                <input
                  id="entryPrice"
                  type="number"
                  value={positionInputs.entryPrice}
                  onChange={(e) =>
                    setPositionInputs((prev) => ({ ...prev, entryPrice: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter entry price"
                />
              </div>
              <div>
                <label htmlFor="stopLoss" className="block text-gray-400 mb-2">
                  Stop Loss ($)
                </label>
                <input
                  id="stopLoss"
                  type="number"
                  value={positionInputs.stopLoss}
                  onChange={(e) =>
                    setPositionInputs((prev) => ({ ...prev, stopLoss: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter stop loss"
                />
              </div>
            </div>
          )}

          {calculatorType === 'fee' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Fee Calculator</h3>
              <div>
                <label htmlFor="tradeAmount" className="block text-gray-400 mb-2">
                  Trade Amount ($)
                </label>
                <input
                  id="tradeAmount"
                  type="number"
                  value={feeInputs.tradeAmount}
                  onChange={(e) =>
                    setFeeInputs((prev) => ({ ...prev, tradeAmount: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="Enter trade amount"
                />
              </div>
              <div>
                <label htmlFor="tradeType" className="block text-gray-400 mb-2">
                  Trade Type
                </label>
                <select
                  id="tradeType"
                  value={feeInputs.tradeType}
                  onChange={(e) => setFeeInputs((prev) => ({ ...prev, tradeType: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                >
                  <option value="maker">Maker</option>
                  <option value="taker">Taker</option>
                </select>
              </div>
              <div>
                <label htmlFor="makerFee" className="block text-gray-400 mb-2">
                  Maker Fee (%)
                </label>
                <input
                  id="makerFee"
                  type="number"
                  value={feeInputs.makerFee}
                  onChange={(e) => setFeeInputs((prev) => ({ ...prev, makerFee: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="0.1"
                />
              </div>
              <div>
                <label htmlFor="takerFee" className="block text-gray-400 mb-2">
                  Taker Fee (%)
                </label>
                <input
                  id="takerFee"
                  type="number"
                  value={feeInputs.takerFee}
                  onChange={(e) => setFeeInputs((prev) => ({ ...prev, takerFee: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  placeholder="0.1"
                />
              </div>
            </div>
          )}

          <button type="button" onClick={handleCalculate} className="w-full btn-primary mt-6">
            Calculate
          </button>
        </div>

        {/* Results Section */}
        <div>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Results</h3>

              {results.type === 'profit' && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Investment:</span>
                    <span className="text-white font-semibold">
                      $
                      {(results.investment || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Returns:</span>
                    <span className="text-white font-semibold">
                      $
                      {(results.returns || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gross Profit:</span>
                    <span
                      className={`font-semibold ${(results.profit || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      ${(results.profit || 0) >= 0 ? '+' : ''}
                      {(results.profit || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trading Fees:</span>
                    <span className="text-red-400 font-semibold">
                      -$
                      {(results.fees || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Net Profit:</span>
                    <span
                      className={`font-bold text-lg ${(results.netProfit || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      ${(results.netProfit || 0) >= 0 ? '+' : ''}
                      {(results.netProfit || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI:</span>
                    <span
                      className={`font-bold ${(results.netProfitPercent || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {(results.netProfitPercent || 0) >= 0 ? '+' : ''}
                      {(results.netProfitPercent || 0).toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}

              {results.type === 'position' && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Size:</span>
                    <span className="text-white font-semibold">
                      ${(results.accountSize || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk Amount:</span>
                    <span className="text-orange-400 font-semibold">
                      $
                      {(results.riskAmount || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk Per Share:</span>
                    <span className="text-white font-semibold">
                      $
                      {(results.riskPerShare || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Position Size:</span>
                    <span className="text-blue-400 font-bold text-lg">
                      {(results.positionSize || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}{' '}
                      shares
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Position Value:</span>
                    <span className="text-blue-400 font-bold">
                      $
                      {(results.positionValue || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              )}

              {results.type === 'fee' && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trade Amount:</span>
                    <span className="text-white font-semibold">
                      $
                      {(results.tradeAmount || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trade Type:</span>
                    <span className="text-white font-semibold capitalize">
                      {results.tradeType || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee Rate:</span>
                    <span className="text-white font-semibold">{results.feeRate || 0}%</span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trading Fee:</span>
                    <span className="text-red-400 font-bold">
                      ${(results.fee || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Net Amount:</span>
                    <span className="text-green-400 font-bold text-lg">
                      $
                      {(results.netAmount || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {!results && (
            <div className="glass-effect rounded-lg p-6 text-center">
              <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <div className="text-gray-400">Enter values and click calculate to see results</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
