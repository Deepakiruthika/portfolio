import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const KineticScrollMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 200 });

  // Line 1 moves left on scroll down, right on scroll up
  const x1 = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);

  // Line 2 moves right on scroll down, left on scroll up
  const x2 = useTransform(smoothProgress, [0, 1], ['-30%', '0%']);

  const line1Words = [
    'HARDWARE FIRST',
    '•',
    'CURIOSITY INTO REALITY',
    '•',
    'EMBEDDED SYSTEMS',
    '•',
    'ACCIDENT PREVENTION',
    '•',
    'REAL-TIME TELEMETRY',
    '•',
    'PRECISION ENGINEERING',
    '•',
  ];

  const line2Words = [
    'ARDUINO UNO R3',
    '•',
    'ESP8266 CLOUD SOS',
    '•',
    'ULTRASONIC BRAKING',
    '•',
    'HC-05 BEACON',
    '•',
    'VIBRATION SHOCK SENSING',
    '•',
    'DETAILS MATTER',
    '•',
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 bg-[#121214] text-[#F4F3EF] overflow-hidden border-y border-white/[0.08] select-none"
    >
      {/* Background Grid */}
      <div className="architectural-grid architectural-grid-dark opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="space-y-4 sm:space-y-6 relative z-10">
        
        {/* Kinetic Scroll Line 1: Moves Left when scrolling down */}
        <motion.div style={{ x: x1 }} className="flex whitespace-nowrap will-change-transform">
          {[...line1Words, ...line1Words, ...line1Words].map((word, idx) => (
            <span
              key={idx}
              className={`font-syne font-black text-4xl sm:text-7xl md:text-8xl tracking-tight uppercase px-4 sm:px-6 transition-colors ${
                word === '•' ? 'text-accent-orange' : 'text-white hover:text-accent-orange'
              }`}
            >
              {word}
            </span>
          ))}
        </motion.div>

        {/* Poetic Engineering Quote Banner in between */}
        <div className="max-w-4xl mx-auto text-center px-4 py-2">
          <p className="font-mono text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
            "Curiosity is the engine of achievement — precision in every circuit, intention in every line of firmware."
          </p>
        </div>

        {/* Kinetic Scroll Line 2: Moves Right when scrolling down */}
        <motion.div style={{ x: x2 }} className="flex whitespace-nowrap will-change-transform">
          {[...line2Words, ...line2Words, ...line2Words].map((word, idx) => (
            <span
              key={idx}
              className={`font-syne font-black text-4xl sm:text-7xl md:text-8xl tracking-tight uppercase px-4 sm:px-6 transition-colors ${
                word === '•' ? 'text-accent-purple' : 'text-gray-400 hover:text-white'
              }`}
            >
              {word}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
