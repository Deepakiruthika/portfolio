import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

interface InteractiveTextProps {
  text: string;
  className?: string;
  hoverColor?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  wrap?: boolean;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  className = '',
  hoverColor = '#FF4D26',
  as: Component = 'span',
  wrap = true,
}) => {
  // Split into words so words wrap naturally without breaking mid-word (if wrap is enabled)
  const words = text.split(' ');

  return (
    <Component
      className={`inline-flex ${
        wrap ? 'flex-wrap' : 'flex-nowrap whitespace-nowrap'
      } gap-x-[0.3em] ${className}`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={cIdx}
              whileHover={{
                scaleY: 1.2,
                scaleX: 1.08,
                y: -10,
                color: hoverColor,
                transition: { type: 'spring', stiffness: 450, damping: 10 },
              }}
              onHoverStart={() => sound.playHover()}
              className="inline-block transition-colors duration-150 cursor-pointer select-none"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Component>
  );
};
