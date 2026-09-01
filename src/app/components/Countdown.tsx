'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown(); // Initial call
    
    // If reduced motion, we could update less frequently, but text changes are generally okay.
    // However, let's just use standard 1s interval.
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) {
    return <div className="h-24" aria-hidden="true" />; // Placeholder to avoid layout shift
  }

  return (
    <div className="flex gap-4 sm:gap-8 justify-center text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-4xl sm:text-6xl font-serif font-bold text-white mb-2">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}
