'use client';

import { X, Download, Smartphone, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ClientOnly } from './ClientOnly';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function PWAInstallPromptContent() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const navigatorStandalone = 'standalone' in window.navigator ? (window.navigator as { standalone?: boolean }).standalone : false;
    const isInstalled = navigatorStandalone === true || isInStandaloneMode;
    setIsInstalled(isInstalled);

    // Don't show banner if already installed
    if (isInstalled) return;

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('installPromptDismissed');
    if (isDismissed) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show banner after a delay
      setTimeout(() => {
        setShowInstallBanner(true);
      }, 3000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  // Don't show if already installed
  if (isInstalled) return null;

  return (
    <>
      {/* Install Banner for Android/Desktop */}
      {showInstallBanner && deferredPrompt && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm">Install CryptoFinance</h3>
                  <p className="text-gray-300 text-xs mt-1">Get the full app experience with offline access</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex space-x-2 mt-3">
              <button
                type="button"
                onClick={handleInstallClick}
                className="btn-primary text-xs py-2 px-3 flex-1"
              >
                Install App
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-gray-300 hover:text-white transition-colors text-xs py-2 px-3"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Install Instructions */}
      {showInstallBanner && isIOS && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm">Install CryptoFinance</h3>
                  <p className="text-gray-300 text-xs mt-1">
                    Tap the share button <span className="font-mono bg-gray-700 px-1 rounded">⎙</span> then "Add to Home Screen"
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-gray-300 hover:text-white transition-colors text-xs mt-3"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function PWAInstallPrompt() {
  return (
    <ClientOnly>
      <PWAInstallPromptContent />
    </ClientOnly>
  );
}
