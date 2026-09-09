'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Societies', href: '/societies' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FFF8EC]/80 dark:bg-[#0F0B1E]/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="font-serif text-2xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC] hover:text-[#FF4D6D] dark:hover:text-[#FF4D6D] transition-colors">
            Cultural Council
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${isActive ? 'text-[#FF4D6D]' : 'text-[#0F0B1E]/70 dark:text-[#FFF8EC]/70 hover:text-[#FF4D6D]'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <ThemeSwitch />
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeSwitch />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#0F0B1E] dark:text-[#FFF8EC]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`bg-current h-0.5 w-6 rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`bg-current h-0.5 w-6 rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`bg-current h-0.5 w-6 rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100 bg-[#FFF8EC] dark:bg-[#0F0B1E] border-b border-black/10 dark:border-white/10' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`block py-3 px-4 rounded-lg text-center font-medium transition-colors ${isActive ? 'text-[#FF4D6D] bg-[#FF4D6D]/10' : 'text-[#0F0B1E] dark:text-[#FFF8EC] hover:bg-black/5 dark:hover:bg-white/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
