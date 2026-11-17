import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { InteractiveText } from './InteractiveText';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-36 bg-[#F4F3EF] text-[#121212] overflow-hidden">
      {/* Moisez Architectural 12-Column Grid Lines */}
      <div className="architectural-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between pb-8 border-b border-black/[0.08] mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
            [ 02 // DOSSIER ]
          </span>
          <span className="text-xs font-mono uppercase text-[#121212] font-semibold">
            ABOUT DEEPAKIRUTHIKA
          </span>
        </div>

        {/* Editorial Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Black & White Portrait & Verified Specifications Dossier */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-4 sm:p-6 bg-white border border-black/10 rounded-2xl shadow-sm space-y-6">
              
              {/* Profile Card with Black and White Photograph */}
              <div className="flex items-center gap-4 pb-6 border-b border-black/[0.06]">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-black/10 flex-shrink-0 shadow-inner">
                  <img
                    src={`${import.meta.env.BASE_URL}portrait.jpg`}
                    alt="Deepakiruthika T (Black and White)"
                    className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95"
                  />
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-xl text-[#121212]">
                    Deepakiruthika T
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-mono text-gray-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                    <span>Kangeyam, Tamil Nadu</span>
                  </div>
                  <span className="inline-block mt-2 text-[10px] font-mono px-2.5 py-0.5 rounded bg-black/[0.05] text-[#121212] font-semibold">
                    B.E. CCE • V S B Engineering College
                  </span>
                </div>
              </div>

              {/* Confirmed Technical Dossier Matrix */}
              <div className="space-y-3 font-mono text-xs text-gray-700">
                <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                  <span className="text-gray-400">Date of Birth:</span>
                  <span className="text-black font-semibold">May 22, 2006</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                  <span className="text-gray-400">Core Specialty:</span>
                  <span className="text-black font-semibold">IoT & Embedded Systems</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                  <span className="text-gray-400">Hardware Interfacing:</span>
                  <span className="text-black font-semibold">Arduino, ESP8266, HC-05</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                  <span className="text-gray-400">Languages:</span>
                  <span className="text-black font-semibold">English, Tamil, Hindi</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-400">Interests:</span>
                  <span className="text-accent-orange font-semibold">Sensors, Semiconductors, PCB</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Editorial Narrative & Statement */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#121212] tracking-tight leading-[1.05]">
              <InteractiveText text="A little about me." hoverColor="#8B5CF6" />
            </h2>

            <div className="space-y-6 text-base sm:text-xl text-[#121212] font-normal leading-relaxed font-sans">
              <p>
                I'm Deepakiruthika, an engineering student with a strong interest in electronics, communication technologies, and the Internet of Things.
              </p>
              <p className="text-gray-600">
                I enjoy exploring new ideas, working with hardware, and developing practical technology-based solutions. I believe every interesting idea is an opportunity to learn, experiment, and create something meaningful.
              </p>
              <p className="text-gray-600">
                With a strong foundation in problem-solving and programming, I have developed an IoT-based vehicle speed monitoring and accident alert system combining Arduino Uno, multi-sensor interfacing, and Wi-Fi/Bluetooth communications.
              </p>
            </div>

            {/* Moisez Editorial Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.08]">
              <div className="p-4 bg-white border border-black/10 rounded-xl space-y-1">
                <span className="font-mono text-[10px] text-gray-400 font-bold">01 // FOCUS</span>
                <div className="font-syne font-bold text-sm text-black">Hardware First</div>
                <p className="text-xs text-gray-500">Prototyping with sensors, microcontrollers, and circuit designs.</p>
              </div>

              <div className="p-4 bg-white border border-black/10 rounded-xl space-y-1">
                <span className="font-mono text-[10px] text-gray-400 font-bold">02 // IMPACT</span>
                <div className="font-syne font-bold text-sm text-black">Accident Alert</div>
                <p className="text-xs text-gray-500">Autonomous speed limit enforcement and shock sensing SOS.</p>
              </div>

              <div className="p-4 bg-white border border-black/10 rounded-xl space-y-1">
                <span className="font-mono text-[10px] text-gray-400 font-bold">03 // GROWTH</span>
                <div className="font-syne font-bold text-sm text-black">Continuous Learn</div>
                <p className="text-xs text-gray-500">Expanding into semiconductors, PCB layout, and embedded C.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
