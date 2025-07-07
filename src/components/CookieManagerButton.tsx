'use client';

import { useState } from 'react';
import { Cookie, Settings } from 'lucide-react';
import { ClientOnly } from './ClientOnly';

function CookieManagerButtonContent() {
  const [showTooltip, setShowTooltip] = useState(false);

  const openCookieSettings = () => {
    // Trigger cookie settings modal by dispatching a custom event
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={openCookieSettings}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
      >
        <Cookie className="w-4 h-4" />
        <span>Cookie Settings</span>
        <Settings className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
          Manage your cookie preferences
        </div>
      )}
    </div>
  );
}

export function CookieManagerButton() {
  return (
    <ClientOnly>
      <CookieManagerButtonContent />
    </ClientOnly>
  );
}
