import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Move, RotateCcw, Compass, Waves, Shuffle } from 'lucide-react';
import { sound } from '../utils/sound';

interface LetterState {
  char: string;
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export const CreativePlayground: React.FC = () => {
  const initialLetters: LetterState[] = 'CREATIVITY'.split('').map((char, index) => ({
    char,
    id: index,
    x: 0,
    y: 0,
    rotation: 0,
  }));

  const [letters, setLetters] = useState<LetterState[]>(initialLetters);
  const [activeMode, setActiveMode] = useState<string>('baseline');

  const handleScatter = () => {
    sound.playPop();
    setActiveMode('scatter');
    setLetters((prev) =>
      prev.map((letter) => ({
        ...letter,
        x: (Math.random() - 0.5) * 440,
        y: (Math.random() - 0.5) * 200,
        rotation: (Math.random() - 0.5) * 50,
      }))
    );
  };

  const handleSineWave = () => {
    sound.playPop();
    setActiveMode('wave');
    setLetters((prev) =>
      prev.map((letter, idx) => ({
        ...letter,
        x: (idx - 4.5) * 48,
        y: Math.sin(idx * 0.9) * 40,
        rotation: Math.cos(idx * 0.9) * 15,
      }))
    );
  };

  const handleCircle = () => {
    sound.playPop();
    setActiveMode('circle');
    const total = letters.length;
    const radius = 120;
    setLetters((prev) =>
      prev.map((letter, idx) => {
        const angle = (idx / total) * Math.PI * 2;
        return {
          ...letter,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          rotation: (angle * 180) / Math.PI + 90,
        };
      })
    );
  };

  const handleReset = () => {
    sound.playClick();
    setActiveMode('baseline');
    setLetters(initialLetters);
  };

  return (
    <section id="details" className="relative py-24 sm:py-36 bg-[#F4F3EF] text-[#121212] overflow-hidden select-none">
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
            [ 05 // EXPERIMENTAL PHYSICS ]
          </span>
          <span className="text-xs font-mono uppercase text-[#121212] font-semibold">
            KINETIC TYPOGRAPHY
          </span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-syne font-black text-5xl sm:text-7xl text-[#121212] tracking-tight">
            DETAILS MATTER.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal font-sans">
            "Everything else is details, and I like details." Drag, toss, and manipulate letters across the architectural canvas.
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={handleScatter}
            onMouseEnter={() => sound.playHover()}
            data-cursor="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-white hover:bg-gray-100 text-black border border-black/15 shadow-sm transition-all"
          >
            <Shuffle className="w-3.5 h-3.5 text-accent-orange" />
            <span>Scatter</span>
          </button>

          <button
            onClick={handleSineWave}
            onMouseEnter={() => sound.playHover()}
            data-cursor="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-white hover:bg-gray-100 text-black border border-black/15 shadow-sm transition-all"
          >
            <Waves className="w-3.5 h-3.5 text-blue-600" />
            <span>Wave Flow</span>
          </button>

          <button
            onClick={handleCircle}
            onMouseEnter={() => sound.playHover()}
            data-cursor="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-white hover:bg-gray-100 text-black border border-black/15 shadow-sm transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-purple-600" />
            <span>Orbit</span>
          </button>

          <button
            onClick={handleReset}
            onMouseEnter={() => sound.playHover()}
            data-cursor="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-black text-white hover:bg-gray-800 shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Kinetic Canvas Box */}
        <div className="relative min-h-[360px] sm:min-h-[420px] rounded-2xl bg-white border border-black/10 p-6 sm:p-12 flex items-center justify-center overflow-hidden shadow-sm">
          
          <div className="absolute top-4 left-6 flex items-center gap-2 text-[11px] font-mono text-gray-400">
            <Move className="w-3.5 h-3.5 text-black" />
            <span>DRAG ANY LETTER • SPRING DYNAMICS</span>
          </div>

          <div className="absolute top-4 right-6 text-[11px] font-mono text-gray-400 uppercase">
            Mode: <span className="text-black font-bold">{activeMode}</span>
          </div>

          {/* Draggable Letters Row */}
          <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3 z-10">
            {letters.map((letter) => (
              <motion.div
                key={letter.id}
                drag
                dragConstraints={{ left: -300, right: 300, top: -160, bottom: 160 }}
                dragElastic={0.4}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
                animate={{
                  x: letter.x,
                  y: letter.y,
                  rotate: letter.rotation,
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: (letter.id % 2 === 0 ? 6 : -6),
                }}
                whileDrag={{
                  scale: 1.3,
                  zIndex: 50,
                  cursor: 'grabbing',
                }}
                onDragStart={() => sound.playPop()}
                onDragEnd={() => sound.playHover()}
                onMouseEnter={() => sound.playHover()}
                data-cursor="card"
                data-cursor-text="DRAG"
                className="relative cursor-grab touch-none select-none"
              >
                <div className="w-12 h-16 sm:w-16 sm:h-24 md:w-20 md:h-28 rounded-xl bg-[#F4F3EF] border border-black/15 flex items-center justify-center shadow-md hover:border-black transition-colors">
                  <span className="font-syne font-black text-3xl sm:text-5xl md:text-6xl text-[#121212]">
                    {letter.char}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
