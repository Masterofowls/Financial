'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface PWAStatus {
  serviceWorker: boolean;
  manifest: boolean;
  https: boolean;
  installable: boolean;
  installed: boolean;
  online: boolean;
}

export function PWAStatusChecker() {
  const [status, setStatus] = useState<PWAStatus>({
    serviceWorker: false,
    manifest: false,
    https: false,
    installable: false,
    installed: false,
    online: true,
  });
  const [showChecker, setShowChecker] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    checkPWAStatus();
    
    // Update online status
    const updateOnlineStatus = () => {
      setStatus(prev => ({ ...prev, online: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isClient]);

  const checkPWAStatus = async () => {
    if (!isClient) return;
    
    const newStatus: PWAStatus = {
      serviceWorker: 'serviceWorker' in navigator,
      manifest: false,
      https: location.protocol === 'https:' || location.hostname === 'localhost',
      installable: false,
      installed: false,
      online: navigator.onLine,
    };

    // Check manifest
    try {
      const response = await fetch('/manifest.json');
      newStatus.manifest = response.ok;
    } catch {
      newStatus.manifest = false;
    }

    // Check if installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const navigatorStandalone = 'standalone' in window.navigator ? (window.navigator as { standalone?: boolean }).standalone : false;
    newStatus.installed = navigatorStandalone === true || isInStandaloneMode;

    // Check if installable (simplified check)
    newStatus.installable = newStatus.serviceWorker && newStatus.manifest && newStatus.https;

    setStatus(newStatus);
  };

  // Don't render during SSR
  if (!isClient) return null;

  const getStatusIcon = (isTrue: boolean) => {
    return isTrue ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <XCircle className="w-4 h-4 text-red-400" />
    );
  };

  if (!showChecker) {
    return (
      <button
        type="button"
        onClick={() => setShowChecker(true)}
        className="fixed bottom-20 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
        title="Check PWA Status"
      >
        {status.online ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">PWA Status</h3>
        <button
          type="button"
          onClick={() => setShowChecker(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Service Worker</span>
          {getStatusIcon(status.serviceWorker)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Web App Manifest</span>
          {getStatusIcon(status.manifest)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300">HTTPS/Localhost</span>
          {getStatusIcon(status.https)}
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
          <span className="text-gray-300">Online Status</span>
          {status.online ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-700">
        <button
          type="button"
          onClick={checkPWAStatus}
          className="text-blue-400 hover:text-blue-300 transition-colors text-xs"
        >
          Refresh Status
        </button>
      </div>
    </div>
  );
}
