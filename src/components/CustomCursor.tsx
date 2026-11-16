import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkTouch = () => {
      if (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      ) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
        document.body.classList.add('custom-cursor-active');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => {
      window.removeEventListener('resize', checkTouch);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if over a dark background section
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target) {
        const darkParent = target.closest('[data-theme="dark"]') || target.closest('.bg-onyx') || target.closest('.bg-\\[\\#0A0A0C\\]');
        setIsDarkBg(!!darkParent);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const interactive = target.closest('a, button, input, textarea, select');
        if (interactive) {
          setIsHovered(true);
          setCursorText('');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  const dotColor = isDarkBg ? '#FFFFFF' : '#121212';
  const ringColor = isDarkBg ? 'rgba(255, 255, 255, 0.35)' : 'rgba(18, 18, 18, 0.35)';

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Outer Follower Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: cursorText ? 2.8 : isHovered ? 1.7 : 1,
          borderColor: ringColor,
          backgroundColor: cursorText ? (isDarkBg ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)') : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-current flex items-center justify-center backdrop-blur-[1px]"
      >
        {cursorText && (
          <span
            className={`text-[7px] font-mono font-bold tracking-widest uppercase ${
              isDarkBg ? 'text-white' : 'text-black'
            }`}
          >
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Hairline Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: cursorText ? 0 : 1,
          backgroundColor: dotColor,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full"
      />
    </div>
  );
};
