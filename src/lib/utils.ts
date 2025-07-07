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

export function generateCryptoData(length = 24, seed?: number) {
  const data = [];
  let price = 45000 + (seed ? Math.sin(seed) * 5000 + 5000 : Math.random() * 10000);

  for (let i = 0; i < length; i++) {
    // Use seed for deterministic generation if provided
    const randomValue = seed ? Math.sin(seed + i) * 0.5 + 0.5 : Math.random();
    const change = (randomValue - 0.5) * 2 * 0.02;
    price = price * (1 + change);
    
    data.push({
      time: new Date(Date.now() - (length - i) * 3600000).toISOString(),
      price: Number(price.toFixed(2)),
      volume: Math.floor((seed ? Math.sin(seed + i + 100) * 0.5 + 0.5 : Math.random()) * 1000000000),
    });
  }

  return data;
}
