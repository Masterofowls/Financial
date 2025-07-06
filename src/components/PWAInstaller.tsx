'use client';

import { useEffect, useState } from 'react';
import { ClientOnly } from './ClientOnly';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function PWAInstallerContent() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Register service worker with better error handling
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
          });
          
          console.log('Service Worker registered successfully:', registration);

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New content is available');
                }
              });
            }
          });

          // Handle controller change
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service Worker controller changed');
          });

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      if (document.readyState === 'loading') {
        window.addEventListener('load', registerSW);
      } else {
        registerSW();
      }
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowInstallButton(false);
      setDeferredPrompt(null);
      setIsInstalling(false);
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

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User response to the install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallButton(false);
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  if (!showInstallButton || !deferredPrompt) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleInstallClick}
      disabled={isInstalling}
      className="fixed bottom-20 right-4 z-40 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
    >
      {isInstalling ? 'Installing...' : 'Install App'}
    </button>
  );
}

export function PWAInstaller() {
  return (
    <ClientOnly>
      <PWAInstallerContent />
    </ClientOnly>
  );
}
