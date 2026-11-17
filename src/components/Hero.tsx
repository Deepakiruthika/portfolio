import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, ArrowUpRight, Sparkles, Clock, Move } from 'lucide-react';
import { sound } from '../utils/sound';

interface InteractiveWordProps {
  text: string;
  className?: string;
}

const InteractiveWord: React.FC<InteractiveWordProps> = ({ text, className = '' }) => {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          whileHover={{
            scaleY: 1.18,
            scaleX: 1.08,
            y: -10,
            color: '#FF4D26',
            transition: { type: 'spring', stiffness: 480, damping: 10 },
          }}
          onHoverStart={() => sound.playHover()}
          className="inline-block transition-colors duration-150 cursor-pointer select-none"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export const Hero: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  // 3D Mouse Parallax Stage Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [4, -4]), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-4, 4]), { damping: 25, stiffness: 180 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-between overflow-hidden bg-[#F4F3EF] perspective-1200"
    >
      {/* Moisez Architectural 12-Column Grid Lines */}
      <div className="architectural-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center will-change-transform"
      >
        
        {/* Top Micro-Bar: Clean Non-Overlapping Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-black/[0.08] text-xs font-mono text-gray-500 mb-8 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-black font-semibold tracking-wider uppercase">
              STUDIO EDITION // 2026
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden md:inline uppercase text-gray-500">
              TAMIL NADU, INDIA
            </span>
            <span className="flex items-center gap-1.5 text-black font-bold">
              <Clock className="w-3.5 h-3.5 text-accent-orange" />
              {currentTime} IST
            </span>
          </div>
        </div>

        {/* Editorial Typography (Centered & Proportioned) */}
        <div className="relative flex flex-col items-center justify-center text-center my-auto py-8 sm:py-12 select-none w-full max-w-5xl mx-auto">
          
          {/* Draggable Physical Studio ID Badge with Black-and-White Portrait */}
          <motion.div
            drag
            dragConstraints={{ left: -260, right: 260, top: -140, bottom: 220 }}
            dragElastic={0.35}
            whileDrag={{ scale: 1.12, rotate: 6, zIndex: 60, cursor: 'grabbing', boxShadow: '0 30px 60px rgba(0,0,0,0.45)' }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            onDragStart={() => sound.playPop()}
            onDragEnd={() => sound.playHover()}
            onHoverStart={() => sound.playHover()}
            data-cursor="drag"
            data-cursor-text="DRAG"
            className="hidden md:inline-flex absolute -top-4 sm:-top-8 right-2 lg:right-6 items-center gap-3.5 p-2 sm:p-2.5 bg-[#121212] text-white rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.25)] cursor-grab group border border-white/20 touch-none rotate-[3.5deg] select-none z-20"
          >
            {/* Authentic Studio Tape Sticker on Top Corner */}
            <div className="absolute -top-3 left-6 w-12 h-4 bg-white/30 backdrop-blur-sm border border-white/40 -rotate-6 rounded-[2px] shadow-sm pointer-events-none" />

            {/* Black and White High-Contrast Portrait Photograph */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/30 bg-[#16161c] flex-shrink-0 shadow-inner">
              <img
                src={`${import.meta.env.BASE_URL}portrait.jpg`}
                alt="Deepakiruthika T (Black and White)"
                className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95 transition-all duration-500 group-hover:contrast-135 pointer-events-none"
              />
              <div className="absolute inset-0 border border-black/20 rounded-xl pointer-events-none" />
            </div>

            <div className="pr-3 font-mono text-left">
              <div className="text-[10px] tracking-widest text-accent-orange uppercase font-bold flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                <span>[ 01 // FOUNDER ]</span>
                <span className="text-[8px] bg-white/20 px-1 py-0.2 rounded font-sans">DRAG</span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-tight whitespace-nowrap">
                Deepakiruthika T
              </div>
              <div className="text-[9px] text-gray-400 tracking-wide mt-0.5 whitespace-nowrap">
                B.E. CCE • IoT & Hardware
              </div>
            </div>
          </motion.div>

          {/* Draggable Physical Circuit Sticker with Peel Angle & Tape */}
          <motion.div
            drag
            dragConstraints={{ left: -260, right: 260, top: -180, bottom: 180 }}
            dragElastic={0.35}
            whileDrag={{ scale: 1.12, rotate: -6, zIndex: 60, cursor: 'grabbing', boxShadow: '0 30px 60px rgba(0,0,0,0.25)' }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.5 }}
            onDragStart={() => sound.playPop()}
            onDragEnd={() => sound.playHover()}
            onHoverStart={() => sound.playHover()}
            data-cursor="drag"
            data-cursor-text="DRAG"
            className="hidden md:inline-flex absolute bottom-4 sm:bottom-8 left-2 lg:left-6 items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white border border-black/20 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.12)] cursor-grab group touch-none -rotate-[3deg] select-none z-20"
          >
            {/* Studio Tape on Top-Right */}
            <div className="absolute -top-2.5 right-4 w-10 h-3.5 bg-amber-100/70 backdrop-blur-sm border border-amber-200/80 rotate-12 rounded-[2px] shadow-sm pointer-events-none" />

            <div className="w-2.5 h-2.5 rounded-full bg-accent-orange animate-ping" />
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#121212] tracking-wider uppercase">
              [ OPEN SYSTEM ]
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollTo('projects');
              }}
              title="Inspect hardware"
              className="p-1 hover:bg-black/10 rounded-lg transition-colors"
            >
              <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Line 1: TURNING. (Centered) */}
          <h1 className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.2rem] 2xl:text-[6.8rem] tracking-tight text-[#121212] uppercase leading-[0.95] text-center w-full">
            <InteractiveWord text="TURNING." />
          </h1>

          {/* Line 2: CURIOSITY. (Centered) */}
          <h1 className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.2rem] 2xl:text-[6.8rem] tracking-tight text-[#121212] uppercase leading-[0.95] text-center w-full my-1 sm:my-2">
            <InteractiveWord text="CURIOSITY." />
          </h1>

          {/* Line 3: INTO TECH. (Centered + Hand-Drawn Marker Underline) */}
          <div className="relative inline-block leading-none mt-1">
            <h1 className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.2rem] 2xl:text-[6.8rem] tracking-tight text-[#121212] uppercase leading-[0.95] text-center">
              <InteractiveWord text="INTO TECH." />
            </h1>

            {/* Hand-Drawn Terracotta / Orange Marker Underline Centered */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
              className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-4 sm:h-6 pointer-events-none text-accent-orange"
              viewBox="0 0 600 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M4 16C120 6 380 2 596 14C450 18 190 22 28 20"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>

          {/* Mobile-Friendly Draggable Badge Indicator */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-accent-orange" />
              <span>B.E. CCE • IoT & Hardware</span>
            </div>
          </div>

          {/* Centered Creative Action Buttons with Glow Effects */}
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
            <button
              onClick={() => scrollTo('projects')}
              onMouseEnter={() => sound.playHover()}
              className="group relative px-6 py-3 rounded-full bg-[#121212] text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>EXPLORE WORK</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3 rounded-full bg-white border border-black/15 text-[#121212] text-xs sm:text-sm font-mono font-bold tracking-wider uppercase hover:border-black transition-all duration-300 hover:scale-105 shadow-sm"
            >
              LET'S TALK
            </button>
          </div>

        </div>

        {/* Bottom Manifest & Scroll Indicator */}
        <div className="pt-12 sm:pt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-black/[0.08] mt-8">
          
          {/* Left: Indicator */}
          <div className="flex items-center gap-3 font-mono text-xs text-gray-500 uppercase tracking-widest">
            <div className="w-0.5 h-6 bg-black" />
            <span>SCROLL.</span>
            <Eye className="w-4 h-4 text-black animate-pulse" />
          </div>

          {/* Right: Editorial Quote from Moisez screenshot */}
          <div className="max-w-xl space-y-1 font-sans text-base sm:text-xl text-[#121212] font-normal leading-snug">
            <p className="font-medium">
              I build IoT embedded systems and engineer technology that makes a difference.
            </p>
            <p className="text-gray-500">
              Everything else is details, and I like details.
            </p>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
