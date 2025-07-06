import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function generateRandomPrice(basePrice: number, volatility = 0.05): number {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + change);
}

export function generateCryptoData(length = 24) {
  const data = [];
  let price = 45000 + Math.random() * 10000;

  for (let i = 0; i < length; i++) {
    price = generateRandomPrice(price, 0.02);
    data.push({
      time: new Date(Date.now() - (length - i) * 3600000).toISOString(),
      price: Number(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000000),
    });
  }

  return data;
}
