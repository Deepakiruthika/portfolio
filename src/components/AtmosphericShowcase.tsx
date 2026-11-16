import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Radio, Shield, Wifi, Zap, Moon, Sun } from 'lucide-react';
import { sound } from '../utils/sound';
import { MagneticButton } from './MagneticButton';
import { InteractiveText } from './InteractiveText';

export const AtmosphericShowcase: React.FC = () => {
  const [nightMode, setNightMode] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  const handlePortalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portalRef.current) return;
    const rect = portalRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const industryPartners = [
    'ARDUINO UNO',
    'ESP8266 WI-FI',
    'AUTOCAD',
    'EMBEDDED C',
    'HC-05 BLUETOOTH',
    'V S B ENG COLLEGE',
    'INFOTECH SOLUTIONS',
  ];

  return (
    <section
      id="atmospheric"
      data-theme="dark"
      className="relative min-h-screen py-24 sm:py-36 bg-[#0A0A0C] text-white overflow-hidden select-none"
    >
      {/* Dark Architectural Grid Lines */}
      <div className="architectural-grid architectural-grid-dark">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-between">
        
        {/* BlueSQX Top Announcement Bar Style */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] mb-12">
          <div className="text-xs font-mono tracking-widest uppercase text-gray-400">
            [ 02 // BLUE SQUARE X AESTHETIC ]
          </div>
          <div className="flex items-center gap-4">
            {/* Interactive Mode Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setNightMode(!nightMode);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="button"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 transition-colors"
            >
              {nightMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
              <span>{nightMode ? 'SPECTRUM: INFRARED' : 'SPECTRUM: NOMINAL'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SENSOR BEACON: ACTIVE</span>
            </div>
          </div>
        </div>

        {/* BlueSQX Oversized Heading with Kinetic Letters */}
        <div className="mb-14">
          <h2 className="font-syne font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] max-w-4xl text-white">
            <span className="text-gray-500 block">
              <InteractiveText text="Immersive Systems." hoverColor="#38BDF8" />
            </span>
            <span className="block mt-1">
              <InteractiveText text="Lasting Impact." hoverColor="#FF4D26" />
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-400 font-light max-w-2xl font-sans">
            Engineering connected vehicle safety, intelligent IR speed throttling, and automated vibration shock emergency broadcast networks.
          </p>
        </div>

        {/* BlueSQX Cinematic Framed Portal Window with Interactive Spotlight Lens! */}
        <div
          ref={portalRef}
          onMouseMove={handlePortalMouseMove}
          className={`relative w-full aspect-[16/9] max-h-[560px] rounded-3xl overflow-hidden border transition-colors duration-700 ${
            nightMode
              ? 'border-emerald-500/40 bg-gradient-to-b from-[#051A10] to-[#030B07] shadow-[0_25px_80px_rgba(16,185,129,0.25)]'
              : 'border-white/15 bg-gradient-to-b from-[#16161E] to-[#0A0A0E] shadow-[0_25px_60px_rgba(0,0,0,0.8)]'
          } group`}
        >
          {/* Interactive Mouse Flashlight/Spotlight Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-80"
            style={{
              background: `radial-gradient(circle 380px at ${lensPos.x}% ${lensPos.y}%, ${
                nightMode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(121, 40, 202, 0.25)'
              }, transparent 70%)`,
            }}
          />

          {/* Ambient Lighting & Volumetric Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-[#0A0A0C] opacity-90 pointer-events-none" />
          
          {/* Framed Natural/Hardware Window Artwork */}
          <div className="absolute inset-x-6 inset-y-6 sm:inset-x-14 sm:inset-y-12 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden flex flex-col justify-between p-6 sm:p-10">
            
            {/* Top Telemetry Overlay */}
            <div className="flex items-center justify-between font-mono text-xs text-gray-300">
              <span className="flex items-center gap-2">
                <Cpu className={`w-4 h-4 ${nightMode ? 'text-emerald-400' : 'text-accent-orange'}`} />
                BENCH TELEMETRY // ARDUINO UNO + ESP8266
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] tracking-wider">
                {nightMode ? 'INFRARED NIGHT LENS' : 'OPTICAL LENS'}
              </span>
            </div>

            {/* Center Cinematic Display */}
            <div className="text-center space-y-3 py-6">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                <h3 className={`font-syne font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter transition-colors ${
                  nightMode ? 'text-emerald-300' : 'text-white'
                }`}>
                  <InteractiveText text="SPEED CONTROL & SOS" hoverColor="#00F0FF" />
                </h3>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-accent-orange" /> IR RPM Speed Sensor
                </span>
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-blue-400" /> HC-SR04 Ultrasonic
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-rose-400" /> Vibration SW-420 Impact
                </span>
                <span className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" /> ESP8266 Cloud Link
                </span>
              </div>
            </div>

            {/* Bottom Floating Pill Action Buttons with Magnetic Elastic Pull! */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
              <MagneticButton
                onClick={() => scrollTo('projects')}
                className="rounded-full"
                dataCursorText="EXPLORE"
              >
                <div className="px-5 py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-1.5">
                  <span>Our Latest System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo('simulator-bench')}
                className="rounded-full"
                dataCursorText="BENCH"
              >
                <div className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-semibold text-xs uppercase tracking-wider transition-colors border border-white/15 flex items-center gap-1.5">
                  <span>Live Bench</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </MagneticButton>
            </div>

          </div>
        </div>

        {/* BlueSQX "Trusted by the industry leaders" Monochrome Ticker Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <div className="text-[11px] font-mono tracking-widest uppercase text-gray-400 text-center mb-6">
            Technologies & Hardware Mastered:
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...industryPartners, ...industryPartners].map((partner, idx) => (
                <div
                  key={idx}
                  className="mx-8 font-syne font-bold text-sm sm:text-base tracking-widest uppercase text-gray-500 hover:text-white transition-colors"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
