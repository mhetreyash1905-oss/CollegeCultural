'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export default function ScrollAnimationWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const translateMap = {
    up: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [distance, 0, 0, -distance]),
    down: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-distance, 0, 0, distance]),
    left: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [distance, 0, 0, -distance]),
    right: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-distance, 0, 0, distance]),
  };

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const isHorizontal = direction === 'left' || direction === 'right';

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        ...(isHorizontal ? { x: translateMap[direction] } : { y: translateMap[direction] }),
      }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered wrapper for grid items
interface StaggeredGridProps {
  children: React.ReactNode[];
  className?: string;
}

export function StaggeredGrid({ children, className = '' }: StaggeredGridProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimationWrapper key={index} delay={index * 0.1}>
          {child}
        </ScrollAnimationWrapper>
      ))}
    </div>
  );
}
