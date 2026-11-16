import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

export const UpButton: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          onClick={scrollToTop}
          onMouseEnter={() => sound.playHover()}
          data-cursor="button"
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-xl bg-[#7928CA] hover:bg-[#6820B0] text-white shadow-xl transition-transform hover:scale-110 active:scale-95 group font-mono text-xs font-bold tracking-tight select-none"
        >
          <span className="group-hover:-translate-y-0.5 transition-transform">
            .up
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
