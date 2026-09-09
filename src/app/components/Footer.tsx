import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { name: 'Societies', href: '/societies' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="border-t border-black/10 dark:border-white/10 text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC] mb-4">Cultural Council</h3>
            <p className="text-sm leading-relaxed">
              Where Creativity Meets Tradition. Fostering art, culture, and expression at IIIT Allahabad.
            </p>
          </div>

          <div>
            <h4 className="text-[#0F0B1E] dark:text-[#FFF8EC] font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#FF4D6D] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#0F0B1E] dark:text-[#FFF8EC] font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <address className="not-italic text-sm space-y-2">
              <p>Email: <a href="mailto:cultural@iiita.ac.in" className="hover:text-[#FF4D6D] transition-colors">cultural@iiita.ac.in</a></p>
              <p>IIIT Allahabad<br />Devghat, Jhalwa<br />Prayagraj, UP 211015</p>
            </address>
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            &copy; 2026 IIITA Cultural Council. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
