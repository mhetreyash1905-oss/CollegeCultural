'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-base/70 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-2xl font-bold text-paper hover:text-coral transition-colors">
              Cultural Council
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${isActive ? 'text-coral' : 'text-paper'} hover:text-coral transition-colors px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-paper hover:text-coral focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 flex flex-col items-end justify-center gap-1.5">
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : '-translate-y-0.5'}`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 bg-indigo-base' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg flex flex-col">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${isActive ? 'text-coral' : 'text-paper'} hover:text-coral block px-3 py-4 rounded-md text-base font-medium text-center`}
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
