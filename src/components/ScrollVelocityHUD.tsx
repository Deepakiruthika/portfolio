import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const ScrollVelocityHUD: React.FC = () => {
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.round((currentY / total) * 100));
      }

      if (currentY > lastY + 2) {
        setScrollDir('down');
      } else if (currentY < lastY - 2) {
        setScrollDir('up');
      }

      lastY = currentY;
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 900);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-6 z-40 hidden sm:flex items-center gap-3 select-none pointer-events-none">
      <div className="px-3.5 py-1.5 rounded-full bg-black/85 text-white backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-2 font-mono text-[11px]">
        {scrollDir === 'down' ? (
          <ArrowDown className={`w-3.5 h-3.5 text-accent-orange ${isScrolling ? 'animate-bounce' : ''}`} />
        ) : (
          <ArrowUp className={`w-3.5 h-3.5 text-emerald-400 ${isScrolling ? 'animate-bounce' : ''}`} />
        )}
        <span className="font-bold">
          {scrollDir === 'down' ? 'SCROLL DOWN' : 'SCROLL UP'}
        </span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-300 tabular-nums">{scrollProgress}%</span>
      </div>
    </div>
  );
};
