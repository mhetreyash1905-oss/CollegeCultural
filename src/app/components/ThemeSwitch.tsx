'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-16 h-8" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`
        relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D] focus-visible:ring-offset-2
        ${isDark ? 'bg-[#1a1a2e]' : 'bg-[#e8dcc8]'}
      `}
    >
      {/* Track icons */}
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs">☀️</span>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">🌙</span>

      {/* Sliding knob */}
      <span
        className={`
          block w-6 h-6 rounded-full shadow-md transition-all duration-300 ease-in-out
          ${isDark
            ? 'translate-x-8 bg-[#FFF8EC]'
            : 'translate-x-0 bg-[#0F0B1E]'
          }
        `}
      />
    </button>
  );
}
