'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Wifi, WifiOff, Settings } from 'lucide-react';
import { ClientOnly } from './ClientOnly';

interface PWAStatus {
  serviceWorker: boolean;
  manifest: boolean;
  https: boolean;
  installable: boolean;
  installed: boolean;
  online: boolean;
}

function PWAStatusCheckerContent() {
  const [status, setStatus] = useState<PWAStatus>({
    serviceWorker: false,
    manifest: false,
    https: false,
    installable: false,
    installed: false,
    online: true,
  });
  const [showChecker, setShowChecker] = useState(false);

  useEffect(() => {
    checkPWAStatus();
    
    const updateOnlineStatus = () => {
      setStatus(prev => ({ ...prev, online: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const checkPWAStatus = async () => {
    const newStatus: PWAStatus = {
      serviceWorker: false,
      manifest: false,
      https: location.protocol === 'https:',
      installable: false,
      installed: false,
      online: navigator.onLine,
    };

    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const navigatorStandalone = 'standalone' in window.navigator ? 
      (window.navigator as { standalone?: boolean }).standalone : false;
    newStatus.installed = navigatorStandalone === true || isInStandaloneMode;

    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        newStatus.serviceWorker = !!registration;
      } catch (error) {
        console.error('Service worker check failed:', error);
      }
    }

    try {
      const response = await fetch('/manifest.json');
      newStatus.manifest = response.ok;
    } catch (error) {
      console.error('Manifest check failed:', error);
    }

    newStatus.installable = 'beforeinstallprompt' in window;
    setStatus(newStatus);
  };

  const getStatusIcon = (isValid: boolean) => {
    return isValid ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  if (!showChecker) {
    return (
      <button
        type="button"
        onClick={() => setShowChecker(true)}
        className="fixed bottom-4 right-4 z-40 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="Check PWA Status"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium">PWA Status</h3>
        <button
          type="button"
          onClick={() => setShowChecker(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">HTTPS</span>
          {getStatusIcon(status.https)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Service Worker</span>
          {getStatusIcon(status.serviceWorker)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Manifest</span>
          {getStatusIcon(status.manifest)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Installable</span>
          {getStatusIcon(status.installable)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Installed</span>
          {getStatusIcon(status.installed)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Online</span>
          <div className="flex items-center space-x-1">
            {status.online ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={checkPWAStatus}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded transition-colors"
      >
        Refresh Status
      </button>
    </div>
  );
}

export function PWAStatusChecker() {
  return (
    <ClientOnly>
      <PWAStatusCheckerContent />
    </ClientOnly>
  );
}
