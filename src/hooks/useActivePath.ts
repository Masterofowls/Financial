'use client';

import { usePathname } from 'next/navigation';

export function useActivePath() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };
  
  return { pathname, isActive };
}
