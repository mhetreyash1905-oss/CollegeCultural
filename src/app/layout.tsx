import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';

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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
