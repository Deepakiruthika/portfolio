import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const words = [
    'CURIOSITY',
    'EXPLORATION',
    'CIRCUITS',
    'TELEMETRY',
    'PRECISION',
    'INNOVATION',
  ];

  const quotes = [
    '"Every interesting idea is an opportunity to learn, experiment, and create something meaningful."',
    '"Hardware is the foundation. Firmware is the intelligence."',
    '"Turning Curiosity Into Technology."',
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showFinalManifesto, setShowFinalManifesto] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Cycle through kinetic words
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) {
          sound.playHover();
          return prev + 1;
        } else {
          clearInterval(wordInterval);
          // Transition to quote
          setTimeout(() => {
            setShowFinalManifesto(true);
            sound.playPop();

            // After showing quote, exit gracefully
            setTimeout(() => {
              setIsExiting(true);
              sound.playSuccess();
              setTimeout(() => {
                onComplete();
              }, 850);
            }, 1800);
          }, 400);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(wordInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0C0C0F] text-[#F4F3EF] flex flex-col justify-between p-6 sm:p-14 select-none overflow-hidden"
        >
          {/* Architectural Grid Lines */}
          <div className="architectural-grid architectural-grid-dark opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="grid-col" />
            ))}
          </div>

          {/* Top Bar: Studio Metadata */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-gray-400 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
              <span className="font-bold text-white tracking-widest uppercase">
                DEEPAKIRUTHIKA T
              </span>
            </div>
            <div className="hidden sm:block uppercase tracking-wider text-[11px] text-gray-400">
              ECE • IoT & EMBEDDED SYSTEMS
            </div>
            <div className="text-[11px] font-mono text-gray-500 uppercase">
              STUDIO EDITION // 2026
            </div>
          </div>

          {/* Center: Kinetic Words & Poetic Quotes (NO NUMBERS!) */}
          <div className="relative z-10 my-auto text-center max-w-4xl mx-auto px-4">
            {!showFinalManifesto ? (
              <div className="space-y-4">
                <div className="text-[11px] font-mono tracking-widest uppercase text-accent-orange">
                  [ PHILOSOPHY IN MOTION ]
                </div>

                {/* Oversized Kinetic Word Morph */}
                <div className="h-32 sm:h-44 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={words[wordIndex]}
                      initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="font-syne font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase text-white"
                    >
                      {words[wordIndex]}
                    </motion.h1>
                  </AnimatePresence>
                </div>

                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  EXPLORING • EXPERIMENTING • ENGINEERING
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono uppercase tracking-widest text-accent-orange font-bold">
                  PORTFOLIO MANIFESTO
                </div>

                {/* Main Quote */}
                <blockquote className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                  "Every interesting idea is an opportunity to learn, experiment, and create something meaningful."
                </blockquote>

                <div className="pt-2 flex items-center justify-center gap-3 text-xs font-mono text-gray-400">
                  <span>DEEPAKIRUTHIKA T</span>
                  <span>•</span>
                  <span className="text-white font-semibold">TURNING CURIOSITY INTO TECHNOLOGY</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Bar: Ambient Wire */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-gray-500 pt-4 border-t border-white/10 uppercase">
            <span>KANGEYAM, TAMIL NADU, INDIA</span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              OPENING PORTFOLIO...
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
