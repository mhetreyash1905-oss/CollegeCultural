import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'IIITA Cultural Council',
  description:
    'The official Cultural Council of IIIT Allahabad — celebrating art, music, dance, drama, and creativity across campus.',
  keywords: ['IIITA', 'Cultural Council', 'College', 'Arts', 'Festival'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-indigo-base text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
