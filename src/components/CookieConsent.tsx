'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X, Check, Shield, BarChart3, Target } from 'lucide-react';
import { ClientOnly } from './ClientOnly';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface GtagWindow extends Window {
  gtag?: (command: string, action: string, parameters: Record<string, string>) => void;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  preferences: false,
};

function CookieConsentContent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    if (!consent) {
      // Show banner after a delay if no consent given
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
    
    if (savedPreferences) {
      // Load saved preferences
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }

    // Listen for cookie settings open event
    const handleOpenCookieSettings = () => {
      setShowSettings(true);
    };

    window.addEventListener('openCookieSettings', handleOpenCookieSettings);
    
    return () => {
      window.removeEventListener('openCookieSettings', handleOpenCookieSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    savePreferences(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    savePreferences(onlyNecessary);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Apply preferences
    applyCookiePreferences(prefs);
    setPreferences(prefs);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    const gtagWindow = window as GtagWindow;
    
    // Google Analytics
    if (prefs.analytics) {
      // Enable analytics
      if (typeof window !== 'undefined' && gtagWindow.gtag) {
        gtagWindow.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    } else {
      // Disable analytics
      if (typeof window !== 'undefined' && gtagWindow.gtag) {
        gtagWindow.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }

    // Marketing cookies
    if (prefs.marketing) {
      // Enable marketing cookies
      if (typeof window !== 'undefined' && gtagWindow.gtag) {
        gtagWindow.gtag('consent', 'update', {
          ad_storage: 'granted'
        });
      }
    } else {
      // Disable marketing cookies
      if (typeof window !== 'undefined' && gtagWindow.gtag) {
        gtagWindow.gtag('consent', 'update', {
          ad_storage: 'denied'
        });
      }
    }

    // Preferences cookies are handled by the app itself
    if (prefs.preferences) {
      localStorage.setItem('allow-preferences-cookies', 'true');
    } else {
      localStorage.removeItem('allow-preferences-cookies');
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      icon: <Shield className="w-5 h-5" />,
      title: 'Necessary Cookies',
      description: 'Essential for the website to function properly. These cannot be disabled.',
      required: true,
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting anonymous information.',
      required: false,
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      icon: <Target className="w-5 h-5" />,
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements.',
      required: false,
    },
    {
      key: 'preferences' as keyof CookiePreferences,
      icon: <Settings className="w-5 h-5" />,
      title: 'Preference Cookies',
      description: 'Remember your settings and preferences to provide a personalized experience.',
      required: false,
    },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-2xl"
          >
            <div className="container-padding mx-auto py-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Cookie className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      We use cookies
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We use cookies to enhance your browsing experience, provide personalized content, 
                      and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowSettings(true)}
                      className="text-blue-400 hover:text-blue-300 text-sm underline mt-2 inline-block"
                    >
                      Cookie Settings
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Reject All
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Cookie Settings</h2>
                    <p className="text-gray-400 text-sm">Manage your cookie preferences</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="text-gray-300 text-sm leading-relaxed">
                  <p>
                    We use different types of cookies to optimize your experience on our platform. 
                    You can choose which categories you're comfortable with below.
                  </p>
                </div>

                {/* Cookie Types */}
                <div className="space-y-4">
                  {cookieTypes.map((type) => (
                    <div key={type.key} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-white font-semibold">{type.title}</h3>
                              {type.required && (
                                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {type.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => togglePreference(type.key)}
                          disabled={type.required}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences[type.key] 
                              ? 'bg-blue-600' 
                              : 'bg-gray-600'
                          } ${type.required ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              preferences[type.key] ? 'translate-x-7' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-1">Your Privacy Matters</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        You can change these settings at any time by clicking the cookie icon in the footer. 
                        We respect your choices and will never use cookies beyond what you've consented to.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700 bg-gray-800/30">
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Reject All
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CookieConsent() {
  return (
    <ClientOnly>
      <CookieConsentContent />
    </ClientOnly>
  );
}
