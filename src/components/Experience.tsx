import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';
import { InteractiveText } from './InteractiveText';

export const Experience: React.FC = () => {
  const experiences = [
    {
      company: 'INFOTECH SOLUTIONS',
      role: 'IoT Intern',
      location: 'Coimbatore, Tamil Nadu',
      period: 'March 2025 – April 2025',
      badge: 'VERIFIED INTERNSHIP',
      responsibilities: [
        'Assisted in IoT project development using Arduino Uno, microcontrollers, and sensors.',
        'Worked on hardware interfacing and wireless communication protocols (Wi-Fi ESP8266 and Bluetooth HC-05).',
        'Performed testing, electrical debugging, and simulation of sensor telemetry streams.',
        'Collaborated actively with team members and documented comprehensive project work.',
      ],
      skills: [
        'Arduino Prototyping',
        'Hardware Interfacing',
        'Wi-Fi (ESP8266)',
        'Bluetooth (HC-05)',
        'Sensor Integration',
        'Testing & Debugging',
        'Technical Documentation',
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-36 bg-[#F4F3EF] text-[#121212] overflow-hidden">
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
            [ 04 // PROFESSIONAL EXPERIENCE ]
          </span>
          <span className="text-xs font-mono uppercase text-[#121212] font-semibold">
            INTERNSHIP
          </span>
        </div>

        <div className="mb-14">
          <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#121212] tracking-tight">
            <InteractiveText text="Industry Experience." hoverColor="#F43F5E" />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-mono">
            Hands-on hardware testing, sensor calibration, and collaborative engineering.
          </p>
        </div>

        {/* Experience Card */}
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="card"
            data-cursor-text="INTERN"
            className="p-6 sm:p-10 bg-white border border-black/10 rounded-2xl shadow-sm hover:border-black/25 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-orange text-white">
                    {exp.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    ROLE 01
                  </span>
                </div>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-[#121212] group-hover:text-accent-orange transition-colors">
                  {exp.company}
                </h3>
                <div className="text-sm font-semibold text-gray-700 mt-1">
                  {exp.role}
                </div>
              </div>

              <div className="flex flex-col sm:items-end text-xs font-mono text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5 text-black font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                  Confirmed Responsibilities & Tasks:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 rounded-xl bg-gray-50 border border-black/[0.04] text-xs text-gray-800 flex items-start gap-2.5 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-gray-400 mr-2 uppercase">
                  Technologies Utilized:
                </span>
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-black text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};
