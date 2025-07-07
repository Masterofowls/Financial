'use client';

import type { NavigationItem } from '@/types';
import { useActivePath } from '@/hooks/useActivePath';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Shield, TrendingUp, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Trading', href: '/trading' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Research', href: '/research' },
  { label: 'Learn', href: '/learn' },
  { label: 'News', href: '/news' },
  { label: 'Company', href: '/company' },
  { label: 'Support', href: '/support' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isActive } = useActivePath();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/98 backdrop-blur-lg border-b border-white/20 shadow-2xl' 
          : 'bg-gray-900/80 backdrop-blur-md'
      }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 z-10"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      <nav className="container-padding mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-3 z-10"
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                <Zap className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">CryptoFinance</h1>
              <p className="text-xs lg:text-sm text-gray-300">Professional Trading</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`transition-all duration-300 font-medium relative group px-4 py-2 rounded-lg backdrop-blur-sm ${
                    isActive(item.href)
                      ? 'text-white bg-white/15 border border-white/20 shadow-lg'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 rounded-full ${
                    isActive(item.href) ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                  }`} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium px-4 py-2 rounded-lg"
            >
              Sign In
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="btn-primary flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Shield className="w-4 h-4" />
              <span>Get Started</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={toggleMenu}
            className="lg:hidden relative p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                className="absolute w-6 h-0.5 bg-white rounded-full"
              />
              <motion.div
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute w-6 h-0.5 bg-white rounded-full"
              />
              <motion.div
                animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                className="absolute w-6 h-0.5 bg-white rounded-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Mobile Menu Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Mobile Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-6">
                  {/* Navigation Links */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block transition-all duration-300 font-medium py-3 px-4 rounded-xl backdrop-blur-sm text-center ${
                            isActive(item.href)
                              ? 'text-white bg-white/15 border border-white/30 shadow-lg'
                              : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      type="button"
                      className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium py-3 px-4 rounded-xl text-center border border-white/10 hover:border-white/20"
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      type="button"
                      className="btn-primary w-full justify-center flex items-center space-x-2 shadow-lg"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Get Started</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
