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

        {/* Massive Moisez-Style Editorial Typography with DRAGGABLE Physical Stickers */}
        <div className="space-y-2 select-none my-auto">
          
          {/* Row 1: TURNING + Embedded Draggable Black-and-White Photo Sticker */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-3 leading-none">
            <h1 className="font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tighter text-[#121212] uppercase leading-none">
              <InteractiveWord text="TURNING." />
            </h1>

            {/* Draggable Physical Studio ID Badge with Black-and-White Portrait */}
            <motion.div
              drag
              dragConstraints={{ left: -120, right: 280, top: -120, bottom: 220 }}
              dragElastic={0.35}
              whileDrag={{ scale: 1.15, rotate: 6, zIndex: 60, cursor: 'grabbing', boxShadow: '0 30px 60px rgba(0,0,0,0.45)' }}
              whileHover={{ scale: 1.08, rotate: 1 }}
              onDragStart={() => sound.playPop()}
              onDragEnd={() => sound.playHover()}
              onHoverStart={() => sound.playHover()}
              data-cursor="drag"
              data-cursor-text="DRAG"
              className="relative inline-flex items-center gap-3.5 p-2 sm:p-2.5 bg-[#121212] text-white rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.3)] cursor-grab group -mt-3 sm:-mt-8 border border-white/20 touch-none rotate-[-2.5deg] select-none"
            >
              {/* Authentic Studio Tape Sticker on Top Corner */}
              <div className="absolute -top-3 left-6 w-12 h-4 bg-white/30 backdrop-blur-sm border border-white/40 -rotate-6 rounded-[2px] shadow-sm pointer-events-none" />

              {/* Black and White High-Contrast Portrait Photograph */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-white/30 bg-[#16161c] flex-shrink-0 shadow-inner">
                <img
                  src={`${import.meta.env.BASE_URL}portrait.jpg`}
                  alt="Deepakiruthika T (Black and White)"
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95 transition-all duration-500 group-hover:contrast-135 pointer-events-none"
                />
                {/* Subtle vignette border */}
                <div className="absolute inset-0 border border-black/20 rounded-xl pointer-events-none" />
              </div>

              <div className="pr-3 font-mono">
                <div className="text-[10px] tracking-widest text-accent-orange uppercase font-bold flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                  <span>[ 01 // FOUNDER ]</span>
                  <span className="text-[8px] bg-white/20 px-1 py-0.2 rounded font-sans">DRAG</span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-tight">
                  Deepakiruthika T
                </div>
                <div className="text-[9px] text-gray-400 tracking-wide mt-0.5">
                  B.E. ECE • IoT & Hardware
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Embedded Draggable Hardware Sticker + CURIOSITY */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-3 leading-none">
            
            {/* Draggable Physical Circuit Sticker with Peel Angle & Tape */}
            <motion.div
              drag
              dragConstraints={{ left: -160, right: 240, top: -160, bottom: 180 }}
              dragElastic={0.35}
              whileDrag={{ scale: 1.15, rotate: -6, zIndex: 60, cursor: 'grabbing', boxShadow: '0 30px 60px rgba(0,0,0,0.25)' }}
              whileHover={{ scale: 1.08, rotate: -2 }}
              onDragStart={() => sound.playPop()}
              onDragEnd={() => sound.playHover()}
              onHoverStart={() => sound.playHover()}
              data-cursor="drag"
              data-cursor-text="DRAG"
              className="relative inline-flex items-center gap-2.5 px-3.5 py-2.5 sm:px-5 sm:py-3.5 bg-white border border-black/20 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.12)] cursor-grab group -mb-3 sm:-mb-8 touch-none rotate-[3deg] select-none"
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

            <h1 className="font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tighter text-[#121212] uppercase leading-none">
              <InteractiveWord text="CURIOSITY." />
            </h1>
          </div>

          {/* Row 3: INTO TECH + Animated Hand-Drawn Marker Underline */}
          <div className="relative inline-block leading-none pt-1">
            <h1 className="font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tighter text-[#121212] uppercase leading-none">
              <InteractiveWord text="INTO TECH." />
            </h1>

            {/* Hand-Drawn Terracotta / Orange Marker Underline (Image 3 Moisez) */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
              className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-4 sm:h-7 pointer-events-none text-accent-orange"
              viewBox="0 0 600 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M4 16C120 6 380 2 596 14C450 18 190 22 28 20"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
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
