import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 30,
  className = '',
  threshold = 0.1
}: ScrollRevealProps) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialVal = {
    opacity: 0,
    ...directions[direction]
  };

  return (
    <motion.div
      initial={initialVal}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: "-100px", amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1] // OutCubic easing for a fast start and ultra-smooth settle
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
