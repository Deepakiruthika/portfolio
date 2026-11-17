import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { sound } from '../utils/sound';
import { InteractiveText } from './InteractiveText';

export const Education: React.FC = () => {
  const educationItems = [
    {
      institution: 'V S B Engineering College',
      degree: 'Undergraduate Engineering (B.E. in CCE)',
      location: 'Karur, Tamil Nadu',
      period: 'September 2023 – Till Date',
      status: 'Current Program',
      isCurrent: true,
      description:
        'Rigorous engineering curriculum focusing on computer and communication systems, hardware interfacing, microcontrollers, and IoT architectures.',
      highlights: [
        'Computer and Communication Engineering (CCE) core coursework',
        'Hardware interfacing and multi-sensor circuits',
        'Embedded systems laboratory & prototype testing',
      ],
    },
    {
      institution: 'Global Matriculation Higher Secondary School',
      degree: 'Senior Secondary School Certificate (SSCE)',
      location: 'Kangeyam, Tamil Nadu',
      period: 'Completed May 2023',
      status: 'Completed',
      isCurrent: false,
      description:
        'Completed senior secondary school education with comprehensive foundational training in Mathematics, Physics, Chemistry, and Computer Science.',
      highlights: [
        'Analytical foundations in mathematics and physical sciences',
        'Algorithmic reasoning and problem-solving',
        'School technical activities and science exhibitions',
      ],
    },
  ];

  return (
    <section id="education" className="relative py-24 sm:py-36 bg-[#F4F3EF] text-[#121212] overflow-hidden">
      {/* Moisez Architectural 12-Column Grid Lines */}
      <div className="architectural-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-black/[0.08] mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
            [ 03 // ACADEMIC TIMELINE ]
          </span>
          <span className="text-xs font-mono uppercase text-[#121212] font-semibold">
            EDUCATION
          </span>
        </div>

        <div className="mb-14">
          <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#121212] tracking-tight">
            <InteractiveText text="Academic Foundation." hoverColor="#00E5FF" />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-mono">
            Formal engineering rigor and technical education.
          </p>
        </div>

        {/* Clean Editorial Timeline */}
        <div className="space-y-8">
          {educationItems.map((item, idx) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="card"
              data-cursor-text="ACADEMIC"
              className="p-6 sm:p-10 bg-white border border-black/10 rounded-2xl shadow-sm hover:border-black/25 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black text-white">
                      {item.status}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-2xl sm:text-3xl text-[#121212] group-hover:text-accent-orange transition-colors">
                    {item.institution}
                  </h3>
                  <div className="text-sm font-semibold text-gray-700 mt-1">
                    {item.degree}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-gray-500 space-y-1">
                  <div className="flex items-center gap-1.5 text-black font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <p className="text-sm text-gray-700 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-gray-600">
                      <span className="text-accent-orange font-bold">→</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
