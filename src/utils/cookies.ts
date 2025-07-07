/**
 * Cookie utility functions for managing cookie preferences and GDPR compliance
 */

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface GtagWindow extends Window {
  gtag?: (command: string, action: string, parameters: Record<string, string | number | boolean>) => void;
}

export const defaultCookiePreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

/**
 * Get the current cookie preferences from localStorage
 */
export function getCookiePreferences(): CookiePreferences {
  if (typeof window === 'undefined') {
    return defaultCookiePreferences;
  }

  try {
    const saved = localStorage.getItem('cookie-preferences');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultCookiePreferences, ...parsed };
    }
  } catch (error) {
    console.error('Error reading cookie preferences:', error);
  }

  return defaultCookiePreferences;
}

/**
 * Check if user has given consent for cookies
 */
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem('cookie-consent') === 'true';
}

/**
 * Check if a specific cookie type is allowed
 */
export function isCookieTypeAllowed(type: keyof CookiePreferences): boolean {
  const preferences = getCookiePreferences();
  return preferences[type];
}

/**
 * Set a cookie with respect to user preferences
 */
export function setConsentCookie(
  name: string, 
  value: string, 
  type: keyof CookiePreferences,
  options: {
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  // Always allow necessary cookies
  if (type !== 'necessary' && !isCookieTypeAllowed(type)) {
    return false;
  }

  const {
    expires,
    path = '/',
    domain,
    secure = true,
    sameSite = 'Lax'
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }
  
  cookieString += `; path=${path}`;
  
  if (domain) {
    cookieString += `; domain=${domain}`;
  }
  
  if (secure) {
    cookieString += '; secure';
  }
  
  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
  return true;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(trimmedCookie.substring(nameEQ.length));
    }
  }
  
  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(
  name: string, 
  options: { path?: string; domain?: string } = {}
): void {
  if (typeof document === 'undefined') {
    return;
  }

  const { path = '/', domain } = options;
  
  let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  
  if (domain) {
    cookieString += `; domain=${domain}`;
  }
  
  document.cookie = cookieString;
}

/**
 * Clear all non-necessary cookies based on current preferences
 */
export function clearNonConsentedCookies(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const preferences = getCookiePreferences();
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name] = cookie.trim().split('=');
    const cleanName = decodeURIComponent(name);
    
    // Skip necessary cookies and our own preference cookies
    if (
      cleanName.startsWith('cookie-') || 
      cleanName === '_ga' || 
      cleanName === '_gid' || 
      cleanName === '_gat' ||
      cleanName === 'PHPSESSID' ||
      cleanName === 'session'
    ) {
      continue;
    }
    
    // Delete analytics cookies if not consented
    if (!preferences.analytics && (
      cleanName.startsWith('_ga') ||
      cleanName.startsWith('_gid') ||
      cleanName.startsWith('_gat') ||
      cleanName.includes('analytics')
    )) {
      deleteCookie(cleanName);
    }
    
    // Delete marketing cookies if not consented
    if (!preferences.marketing && (
      cleanName.includes('facebook') ||
      cleanName.includes('twitter') ||
      cleanName.includes('linkedin') ||
      cleanName.includes('ads') ||
      cleanName.includes('marketing')
    )) {
      deleteCookie(cleanName);
    }
    
    // Delete preference cookies if not consented
    if (!preferences.preferences && (
      cleanName.includes('preference') ||
      cleanName.includes('settings') ||
      cleanName.includes('theme')
    )) {
      deleteCookie(cleanName);
    }
  }
}

/**
 * Initialize Google Analytics with consent
 */
export function initializeAnalytics(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const preferences = getCookiePreferences();
  const gtagWindow = window as GtagWindow;
  
  // Initialize gtag if analytics are consented
  if (preferences.analytics && typeof gtagWindow.gtag === 'function') {
    gtagWindow.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: preferences.marketing ? 'granted' : 'denied'
    });
  }
}

/**
 * Track an event (only if analytics are consented)
 */
export function trackEvent(
  eventName: string, 
  parameters: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const gtagWindow = window as GtagWindow;
  if (isCookieTypeAllowed('analytics') && typeof gtagWindow.gtag === 'function') {
    gtagWindow.gtag('event', eventName, parameters);
  }
}

/**
 * Get cookie consent information for display
 */
export function getCookieConsentInfo(): {
  hasConsent: boolean;
  consentDate: Date | null;
  preferences: CookiePreferences;
} {
  const hasConsent = hasCookieConsent();
  let consentDate: Date | null = null;
  
  if (typeof window !== 'undefined') {
    const dateString = localStorage.getItem('cookie-consent-date');
    if (dateString) {
      try {
        consentDate = new Date(dateString);
      } catch (error) {
        console.error('Error parsing consent date:', error);
      }
    }
  }
  
  return {
    hasConsent,
    consentDate,
    preferences: getCookiePreferences()
  };
}
