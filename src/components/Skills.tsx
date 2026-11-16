import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Radio,
  Terminal,
  Activity,
  Code2,
  Users,
  MessageSquare,
  Zap,
  Sliders,
  CircuitBoard,
  Layers,
  Wrench,
  SearchCheck,
} from 'lucide-react';
import { sound } from '../utils/sound';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'iot' | 'software' | 'professional' | 'interests'>('all');

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'iot', label: 'IoT & Hardware Core' },
    { id: 'software', label: 'Software & CAD' },
    { id: 'professional', label: 'Professional Skills' },
    { id: 'interests', label: 'Future Domains' },
  ];

  const skillCards = [
    {
      name: 'IoT Fundamentals',
      category: 'iot',
      tag: 'Core Focus',
      description: 'Foundations of connected smart objects, device telemetry, packet transmission, and edge sensing architectures.',
      icon: Radio,
      accent: 'from-electric-purple to-purple-700',
      glow: 'shadow-glow-purple',
      badge: 'Architecture',
    },
    {
      name: 'Arduino Prototyping',
      category: 'iot',
      tag: 'Hardware Core',
      description: 'Hands-on development with Arduino Uno, pinout mapping, digital & analog I/O manipulation, and firmware flashing.',
      icon: Cpu,
      accent: 'from-electric-blue to-cyan-600',
      glow: 'shadow-glow-blue',
      badge: 'Microcontrollers',
    },
    {
      name: 'Embedded Systems',
      category: 'iot',
      tag: 'Engineering Domain',
      description: 'Interfacing peripheral devices, timers, interrupts, and power management on bare-metal architectures.',
      icon: CircuitBoard,
      accent: 'from-electric-pink to-rose-600',
      glow: 'shadow-glow-pink',
      badge: 'Systems',
    },
    {
      name: 'Hardware Interfacing',
      category: 'iot',
      tag: 'Protocols & Signals',
      description: 'Connecting external communication modules (ESP8266 Wi-Fi, HC-05 Bluetooth, UART, I2C, Serial communication).',
      icon: Zap,
      accent: 'from-amber-400 to-orange-500',
      glow: 'shadow-[0_0_25px_rgba(251,191,36,0.3)]',
      badge: 'Protocols',
    },
    {
      name: 'Basic Embedded C',
      category: 'iot',
      tag: 'Firmware Code',
      description: 'Writing structured firmware code, memory-efficient loops, bitwise logic, and hardware abstraction routines.',
      icon: Code2,
      accent: 'from-emerald-400 to-teal-600',
      glow: 'shadow-[0_0_25px_rgba(52,211,153,0.3)]',
      badge: 'Programming',
    },
    {
      name: 'Sensor Integration',
      category: 'iot',
      tag: 'Telemetry & Sensing',
      description: 'Integrating Ultrasonic (HC-SR04), IR obstacle sensors, vibration detectors, and processing analog sensor streams.',
      icon: Activity,
      accent: 'from-electric-purple to-electric-blue',
      glow: 'shadow-glow-purple',
      badge: 'Sensing',
    },
    {
      name: 'Arduino IDE',
      category: 'software',
      tag: 'Development Environment',
      description: 'Serial monitoring, board management, library dependency linking, and real-time serial debugging.',
      icon: Terminal,
      accent: 'from-cyan-400 to-blue-600',
      glow: 'shadow-glow-blue',
      badge: 'IDE & Tools',
    },
    {
      name: 'AutoCAD',
      category: 'software',
      tag: 'CAD Drafting',
      description: 'Technical drafting, 2D component layouts, dimensional schematics, and mechanical enclosure alignment.',
      icon: Layers,
      accent: 'from-red-500 to-pink-600',
      glow: 'shadow-glow-pink',
      badge: 'Design CAD',
    },
    {
      name: 'Team Collaboration',
      category: 'professional',
      tag: 'Engineering Practice',
      description: 'Thrives in cross-functional team settings, contributing to group deliverables, peer code reviews, and labs.',
      icon: Users,
      accent: 'from-electric-blue to-indigo-600',
      glow: 'shadow-glow-blue',
      badge: 'Collaboration',
    },
    {
      name: 'Technical Communication',
      category: 'professional',
      tag: 'Reporting & Docs',
      description: 'Documenting project work, presenting technical architectures, and explaining sensor integrations clearly.',
      icon: MessageSquare,
      accent: 'from-electric-purple to-purple-600',
      glow: 'shadow-glow-purple',
      badge: 'Communication',
    },
    {
      name: 'Problem Solving',
      category: 'professional',
      tag: 'Debugging & Analysis',
      description: 'Methodical circuit fault isolation, debugging electrical continuity, and optimizing sensor responsiveness.',
      icon: SearchCheck,
      accent: 'from-yellow-400 to-amber-600',
      glow: 'shadow-[0_0_25px_rgba(250,204,21,0.3)]',
      badge: 'Analytical',
    },
    {
      name: 'Sensor-Based Smart Systems',
      category: 'interests',
      tag: 'Exploration & Hobbies',
      description: 'Researching intelligent autonomous feedback loops, smart transportation telemetry, and connected homes.',
      icon: Sliders,
      accent: 'from-electric-pink to-purple-600',
      glow: 'shadow-glow-pink',
      badge: 'Interest',
    },
    {
      name: 'Semiconductor Technology',
      category: 'interests',
      tag: 'Material & Physics',
      description: 'Studying modern semiconductor architectures, silicon fabrication principles, and microelectronic devices.',
      icon: Cpu,
      accent: 'from-electric-blue to-purple-600',
      glow: 'shadow-glow-blue',
      badge: 'Interest',
    },
    {
      name: 'PCB Design & Prototyping',
      category: 'interests',
      tag: 'Hardware Layouts',
      description: 'Exploring schematic capture, track routing, copper layer planning, and printed circuit board manufacturing.',
      icon: Wrench,
      accent: 'from-emerald-400 to-cyan-600',
      glow: 'shadow-[0_0_25px_rgba(52,211,153,0.3)]',
      badge: 'Interest',
    },
  ];

  const filteredCards =
    activeTab === 'all'
      ? skillCards
      : skillCards.filter((card) => card.category === activeTab);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#09090F] overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="orb w-[500px] h-[500px] bg-electric-blue/10 top-10 right-0" />
      <div className="orb w-[400px] h-[400px] bg-electric-pink/10 bottom-20 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-electric-pink mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>04 // Technical Matrix</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Skills & Toolset.
            </h2>
          </div>
          <div className="text-gray-400 font-mono text-xs max-w-xs">
            [ VERIFIED CAPABILITIES ] <br />
            Hardware interfacing, embedded programming & collaborative execution.
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(cat.id as any);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="button"
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-electric-purple to-electric-blue text-white shadow-glow-purple font-semibold'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="card"
                  data-cursor-text="SKILL"
                  className="group relative glass-panel p-6 rounded-[26px] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Subtle Top Gradient Accent on Hover */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.accent} opacity-40 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <IconComponent className="w-5 h-5 text-electric-blue group-hover:text-electric-pink transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.08]">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <h3 className="font-syne font-bold text-lg text-white group-hover:text-electric-blue transition-colors mb-1">
                    {card.name}
                  </h3>
                  <div className="text-[11px] font-mono text-purple-300/80 mb-3">
                    {card.tag}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Live Signal Activity Indicator */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Skill
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 rounded-full bg-electric-purple/40" />
                      <div className="w-1 h-4 rounded-full bg-electric-blue/70" />
                      <div className="w-1 h-5 rounded-full bg-electric-pink" />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
