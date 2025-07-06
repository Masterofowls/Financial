'use client';

import { useEffect, useState } from 'react';

interface CryptoPrice {
  symbol: string;
  price: number;
  change: number;
}

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching crypto prices
    const fetchPrices = () => {
      const mockPrices: CryptoPrice[] = [
        {
          symbol: 'BTC',
          price: 45000 + Math.random() * 10000,
          change: (Math.random() - 0.5) * 10,
        },
        {
          symbol: 'ETH',
          price: 2500 + Math.random() * 1000,
          change: (Math.random() - 0.5) * 10,
        },
        {
          symbol: 'BNB',
          price: 250 + Math.random() * 100,
          change: (Math.random() - 0.5) * 10,
        },
      ];
      setPrices(mockPrices);
      setLoading(false);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { prices, loading };
}

export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit,
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}
