# CryptoFinance Pro - Modern Cryptocurrency Trading Platform

A cutting-edge Next.js cryptocurrency trading platform with real-time charts, advanced analytics, and modern UI/UX design. **Now available as a Progressive Web App (PWA)** for installation on any device!

## 🚀 Features

### 🌟 Core Features
- **Modern Design**: Beautiful, responsive UI with Tailwind CSS
- **Real-time Data**: Live cryptocurrency price charts using Recharts
- **Advanced Analytics**: Market indicators, trading tools, and portfolio tracking
- **Professional Trading**: Order placement, price alerts, and market analysis
- **Parallax Effects**: Smooth scrolling and interactive animations
- **SEO Optimized**: Perfect SEO structure with meta tags and structured data
- **Mobile First**: Fully responsive design for all devices
- **Performance**: Optimized for speed and Core Web Vitals
- **TypeScript**: Fully typed for better development experience

### 📱 PWA Features (NEW!)
- **📲 Installable**: Add to home screen on any device
- **⚡ Offline Support**: Works without internet connection
- **🔔 Push Notifications**: Real-time market alerts
- **🎯 App Shortcuts**: Quick access to trading, portfolio, analytics
- **🚀 Native Performance**: Lightning-fast, app-like experience
- **💾 Smart Caching**: Intelligent data storage and updates

[**📱 Learn more about PWA features →**](./PWA_FEATURES.md)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **PWA**: Service Worker, Web App Manifest
- **Linting**: Biome.js
- **Code Quality**: ESLint + Prettier

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-financial-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── CryptoChart.tsx # Real-time charts
│   ├── OffersSection.tsx # Pricing plans
│   ├── ContactSection.tsx # Contact form
│   ├── Footer.tsx      # Footer
│   └── ParallaxProvider.tsx # Parallax effects
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
└── types/              # TypeScript types
    └── index.ts        # Type definitions
```

## 🎨 Design Features

### Hero Section
- Animated background with parallax effects
- Gradient text effects
- Statistics cards with real-time data
- Call-to-action buttons with hover animations

### Real-time Charts
- Interactive cryptocurrency price charts
- Multiple timeframe selection
- Live data updates every 2 seconds
- Responsive chart design

### Offers Section
- Pricing plans with feature comparison
- Animated cards with hover effects
- Popular plan highlighting
- Feature icons and descriptions

### Contact Section
- Interactive contact form
- Validation and loading states
- Contact information cards
- Map placeholder for future integration

### Footer
- Comprehensive site navigation
- Social media links
- Newsletter signup
- Scroll-to-top functionality

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Biome linter
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Biome
npm run check        # Run all Biome checks
npm run type-check   # Check TypeScript types
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1280px and up)

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Font Loading**: Optimized Google Fonts loading
- **Animation Performance**: GPU-accelerated animations with Framer Motion
- **Bundle Analysis**: Optimized imports and tree shaking

## 🔒 Security Features

- **Content Security Policy**: Implemented security headers
- **Form Validation**: Client and server-side validation
- **XSS Protection**: Built-in Next.js security features
- **HTTPS**: Production deployment with SSL/TLS

## 🌐 SEO Features

- **Meta Tags**: Comprehensive meta tag implementation
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: XML sitemap generation
- **Robots.txt**: Search engine crawling instructions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
The application can be deployed on any platform that supports Node.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Heroku

## 🔮 Future Enhancements

- Real API integration for live cryptocurrency data
- User authentication and portfolio tracking
- Advanced trading interface
- Mobile app development
- Multi-language support
- Dark/light theme toggle
- Advanced analytics dashboard
- WebSocket integration for real-time updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@cryptofinance.pro or join our Discord community.
