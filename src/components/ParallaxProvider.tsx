'use client';

import { useEffect, useRef } from 'react';

interface ParallaxProviderProps {
  children: React.ReactNode;
}

export function ParallaxProvider({ children }: ParallaxProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrolled = window.pageYOffset;
      const parallaxElements = containerRef.current.querySelectorAll('[data-parallax]');

      for (let i = 0; i < parallaxElements.length; i++) {
        const element = parallaxElements[i];
        const rate = scrolled * -0.5;
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const floatingElements = containerRef.current.querySelectorAll('[data-float]');
      for (let i = 0; i < floatingElements.length; i++) {
        const element = floatingElements[i];
        const x = (mouseX - 0.5) * 20;
        const y = (mouseY - 0.5) * 20;
        (element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="parallax-container">
      {children}
    </div>
  );
}
