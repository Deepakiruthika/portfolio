import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Check current section color theme
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let inDark = false;
      const scrollPos = window.scrollY + 80;
      darkSections.forEach((sec) => {
        const top = (sec as HTMLElement).offsetTop;
        const height = (sec as HTMLElement).offsetHeight;
        if (scrollPos >= top && scrollPos <= top + height) {
          inDark = true;
        }
      });
      setIsDarkTheme(inDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'DETAILS', href: '#details' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDarkTheme
              ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5'
              : 'bg-[#F4F3EF]/90 backdrop-blur-md border-b border-black/[0.06] py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Left: Clean, Non-wrapping */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="button"
            className="group flex items-center gap-2 select-none flex-shrink-0"
          >
            <span
              className={`font-syne font-extrabold text-lg sm:text-xl tracking-tight transition-colors whitespace-nowrap ${
                isDarkTheme ? 'text-white' : 'text-[#121212]'
              }`}
            >
              DEEPAKIRUTHIKA
            </span>
            <span className="text-[10px] font-mono text-accent-orange font-bold whitespace-nowrap">
              / CCE
            </span>
          </a>

          {/* Center Coordinates: Only on wider viewports to prevent wrapping collision */}
          <div className="hidden xl:flex items-center gap-6 text-[11px] font-mono whitespace-nowrap flex-shrink-0">
            <span
              className={`tracking-wider uppercase ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              BASED IN TAMIL NADU <span className="opacity-40">/</span> WORKING GLOBALLY (IST)
            </span>
          </div>

          {/* Available Indicator: Always clean */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.1] border border-emerald-500/20 text-emerald-600 font-mono text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AVAILABLE</span>
          </div>

          {/* Right Navigation & CTA Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <nav className="hidden md:flex items-center gap-5 lg:gap-6 whitespace-nowrap">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="button"
                  className={`text-xs font-mono font-medium tracking-widest transition-colors ${
                    isDarkTheme
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* BlueSQX / Fragment Pill Action Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="button"
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 border whitespace-nowrap ${
                isDarkTheme
                  ? 'bg-white text-black hover:bg-gray-200 border-white'
                  : 'bg-[#121212] text-white hover:bg-black/85 border-[#121212]'
              }`}
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              data-cursor="button"
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-xl border ${
                isDarkTheme
                  ? 'border-white/10 text-white'
                  : 'border-black/10 text-black'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#F4F3EF] flex flex-col justify-between p-6 pt-24 md:hidden"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                NAVIGATION
              </span>
              {navLinks.map((link, idx) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-3 border-b border-black/[0.06] flex items-center justify-between"
                >
                  <span className="font-syne text-3xl font-extrabold text-[#121212]">
                    {link.label}
                  </span>
                  <span className="text-xs font-mono text-gray-400">0{idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-black/[0.08] space-y-2 font-mono text-xs text-gray-600">
              <p>deepakiruthika156@gmail.com</p>
              <p>+91 6379719564 • Kangeyam, Tamil Nadu</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
