export interface CryptoData {
  time: string;
  price: number;
  volume: number;
}

export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  icon: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface OfferCard {
  title: string;
  description: string;
  features: string[];
  price: string;
  buttonText: string;
  popular?: boolean;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'address' | 'social';
  label: string;
  value: string;
  href?: string;
  icon: string;
}

export interface ChartDataPoint {
  timestamp: number;
  value: number;
  volume?: number;
}
