import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { InteractiveText } from './InteractiveText';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="relative bg-[#0A0A0C] text-white py-16 sm:py-24 border-t border-white/[0.08] overflow-hidden select-none">
      {/* Dark Architectural Grid */}
      <div className="architectural-grid architectural-grid-dark opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Tag */}
        <div className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-3 flex items-center gap-2">
          <span>[ FIN ]</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
        </div>

        {/* Massive Kinetic Headline: DEEPAKIRUTHIKA T with Interactive Letter Stretch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-12 border-b border-white/[0.08] gap-8">
          <div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-none">
              <InteractiveText
                text="DEEPAKIRUTHIKA T"
                hoverColor="#FF4D26"
              />
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Engineering Student • IoT & Embedded Systems • Tamil Nadu, India</span>
            </p>
          </div>

          {/* Quick Direct Contacts */}
          <div className="flex flex-col sm:flex-row lg:flex-col sm:items-start lg:items-end gap-3 text-xs font-mono text-gray-300">
            <a
              href="mailto:deepakiruthika156@gmail.com"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-accent-orange transition-colors flex items-center gap-1.5"
            >
              <span>deepakiruthika156@gmail.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>
            <a
              href="tel:+916379719564"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-accent-orange transition-colors flex items-center gap-1.5"
            >
              <span>+91 6379719564</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-gray-500 gap-4">
          <div>
            © {currentYear} Deepakiruthika T. All rights reserved.
          </div>
          <div className="text-gray-400">
            Design & Architecture inspired by Fragment, BlueSQX, and Moisez.
          </div>
        </div>

      </div>
    </footer>
  );
};
