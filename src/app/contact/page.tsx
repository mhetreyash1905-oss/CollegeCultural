'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How do I audition or join one of the 6 cultural societies?',
    category: 'Inductions & Joining',
    answer:
      'Auditions for all six societies—AMS (Music), Nirmiti (Fine Arts), GeneticX (Dance), Virtousi (Dramatics), Rangtarangini (Theatre), and Saraswa (Literature)—are conducted at the start of each academic semester during Induction Week. We announce dates, tasks, and venues on our social channels and notice boards. Both freshers and senior students are welcome to audition!',
  },
  {
    question: 'Do I need prior formal training or stage experience to audition?',
    category: 'Eligibility',
    answer:
      'Not at all! Enthusiasm, dedication, and a love for the art form are what we value most. Many of our finest performers and leads started right here on campus. Societies conduct peer mentorship workshops, weekly jam sessions, and beginner bootcamps throughout the year to help you develop your craft.',
  },
  {
    question: 'What are the major cultural events and festivals held at IIITA?',
    category: 'Festivals & Events',
    answer:
      'Our hallmark annual cultural festival is Alankar, featuring pro-nights with celebrated artists, inter-collegiate dance and band battles, theatre showcases, and literary summits. We also host themed music evenings, Street Play (Nukkad) competitions, Canvas Art exhibitions, open-mic slams, and festive celebrations like Rang Barse.',
  },
  {
    question: 'Can students access the music jam rooms, dance studios, and society equipment?',
    category: 'Facilities & Jam Rooms',
    answer:
      'Yes. The Student Activity Centre (SAC) has sound-proofed acoustic jam rooms, dance practice halls with floor mirrors, and fine art studio spaces. Active society members have scheduled practice hours, while other students can reserve slots for authorized college productions by contacting the Core Operations team.',
  },
  {
    question: 'How can brands, sponsors, or external artists collaborate with the council?',
    category: 'Sponsorship & Outreach',
    answer:
      'We actively collaborate with brands, youth media partners, guest artists, and alumni sponsors. Select "Sponsorship / Brand Partnership" in the contact form or email our finance & sponsorship leads directly at sponsorship.cultural@iiita.ac.in. We offer extensive festival branding, digital reach, and on-ground activations.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    society: 'General Query',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMessage('');

    try {
      // Compose message incorporating subject & society choice
      const composedMessage = `[Subject: ${formData.subject || 'General Inquiry'}] [Society: ${formData.society}]\n\n${formData.message}`;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: composedMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unable to submit your message. Please try again.');
      }

      setStatus('success');
      setFeedbackMessage('Thank you for reaching out! The Cultural Council team will review your message and respond shortly.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        society: 'General Query',
        message: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setFeedbackMessage(
        err instanceof Error ? err.message : 'An error occurred while sending your message.'
      );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="text-center py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs md:text-sm font-medium tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00B4A6] animate-pulse" />
            <span>Connect &bull; Collaborate &bull; Create</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-black/70 dark:text-white/70 font-sans leading-relaxed">
            Have an inquiry about auditions, events, performance bookings, or sponsorships?
            Drop us a message or visit us at the Students Activity Centre.
          </p>
        </section>

        {/* TWO-COLUMN MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-24">
          
          {/* LEFT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-[#FF4D6D] font-bold">Direct Message</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                Send Us a Note
              </h2>
              <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 mt-1">
                Fill out the form below and the relevant society lead or council head will get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-2"
                  >
                    Your Name <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Priyanshu Roy"
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl text-sm placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/50 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-2"
                  >
                    Email Address <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. name@iiita.ac.in"
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl text-sm placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-2"
                  >
                    Subject / Topic <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Audition Query / Fest Sponsorship"
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl text-sm placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/50 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="society"
                    className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-2"
                  >
                    Relevant Society
                  </label>
                  <select
                    id="society"
                    name="society"
                    value={formData.society}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/5 dark:bg-[#1A142E] border border-black/10 dark:border-white/15 rounded-xl text-sm text-[#0F0B1E] dark:text-[#FFF8EC] focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/50 focus:border-transparent transition-all"
                  >
                    <option value="General Query">General Cultural Council</option>
                    <option value="AMS (Music)">AMS &bull; Acoustics & Music Society</option>
                    <option value="Nirmiti (Fine Arts)">Nirmiti &bull; Fine Arts Society</option>
                    <option value="GeneticX (Dance)">GeneticX &bull; Dance Society</option>
                    <option value="Virtousi (Dramatics)">Virtousi &bull; Dramatics Society</option>
                    <option value="Rangtarangini (Theatre)">Rangtarangini &bull; Theatre Society</option>
                    <option value="Saraswa (Literature)">Saraswa &bull; Literary Society</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-2"
                >
                  Message <span className="text-[#FF4D6D]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us what you need, your roll number or organization, and how we can best assist you..."
                  className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl text-sm placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7B2FF7]/50 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 px-8 rounded-xl bg-[#7B2FF7] hover:bg-[#6824D6] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm tracking-wide shadow-lg shadow-[#7B2FF7]/20 hover:shadow-xl hover:shadow-[#7B2FF7]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 shrink-0 text-teal-600 dark:text-teal-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong className="font-semibold block mb-0.5">Message Sent Successfully!</strong>
                    <span>{feedbackMessage}</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong className="font-semibold block mb-0.5">Submission Error</strong>
                    <span>{feedbackMessage}</span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT COLUMN: CONTACT DETAILS & GOOGLE MAPS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CONTACT DETAILS CARD */}
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
              <span className="text-xs uppercase tracking-widest text-[#7B2FF7] font-bold">Contact Directory</span>
              <h2 className="font-serif text-2xl font-bold mt-1 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7B2FF7]/15 text-[#7B2FF7] dark:text-[#9B5FF9] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-black/50 dark:text-white/50">Official Emails</h3>
                    <p className="text-sm font-medium mt-0.5">
                      <a href="mailto:cultural@iiita.ac.in" className="hover:text-[#7B2FF7] dark:hover:text-[#9B5FF9] transition-colors">
                        cultural@iiita.ac.in
                      </a>
                    </p>
                    <p className="text-xs text-black/60 dark:text-white/60">
                      <a href="mailto:council.cultural@iiita.ac.in" className="hover:text-[#7B2FF7] dark:hover:text-[#9B5FF9] transition-colors">
                        council.cultural@iiita.ac.in
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF4D6D]/15 text-[#FF4D6D] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-black/50 dark:text-white/50">Helpline & Desk</h3>
                    <p className="text-sm font-medium mt-0.5">+91 (0532) 292-2000</p>
                    <p className="text-xs text-black/60 dark:text-white/60">+91 94500 12345 (Council Secretary)</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00B4A6]/15 text-[#00B4A6] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-black/50 dark:text-white/50">Council Office</h3>
                    <p className="text-sm font-medium mt-0.5">Students Activity Centre (SAC)</p>
                    <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                      Indian Institute of Information Technology, Allahabad, Devghat, Jhalwa, Prayagraj, UP - 211015
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC93C]/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-black/50 dark:text-white/50">Office & Rehearsal Hours</h3>
                    <p className="text-sm font-medium mt-0.5">Mon – Fri: 5:00 PM – 9:00 PM</p>
                    <p className="text-xs text-black/60 dark:text-white/60">Sat: 2:00 PM – 7:00 PM &bull; Sun: Event Days Only</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
                <span className="text-xs uppercase tracking-wider font-semibold text-black/50 dark:text-white/50 block mb-3">
                  Follow Our Social Channels
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#FF4D6D]/15 border border-black/10 dark:border-white/10 text-xs font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current text-[#FF4D6D]" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#FF4D6D]/15 border border-black/10 dark:border-white/10 text-xs font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>YouTube</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#7B2FF7]/15 border border-black/10 dark:border-white/10 text-xs font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current text-[#7B2FF7]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45 1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45Z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter/X</span>
                  </a>
                </div>
              </div>
            </div>

            {/* EMBEDDED GOOGLE MAPS PLACEHOLDER */}
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00B4A6]" />
                  <h3 className="font-serif text-lg font-bold">Campus Location</h3>
                </div>
                <a
                  href="https://maps.google.com/?q=Indian+Institute+of+Information+Technology+Allahabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#FF4D6D] hover:underline font-medium inline-flex items-center gap-1"
                >
                  Directions &rarr;
                </a>
              </div>

              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-black/10 dark:bg-black/40">
                <iframe
                  title="IIIT Allahabad Campus Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.822765103607!2d81.76793617616616!3d25.435882621742407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398533530c332459%3A0x6ca175232456e72b!2sIndian%20Institute%20of%20Information%20Technology%2C%20Allahabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 filter contrast-95 opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-[11px] text-black/50 dark:text-white/50 text-center mt-3">
                Students Activity Centre &bull; IIIT Allahabad, Jhalwa, Prayagraj 211015
              </p>
            </div>

          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="mt-20 pt-12 border-t border-black/10 dark:border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#FFC93C] font-bold">Frequently Asked Questions</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
              Common Questions & Answers
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60 mt-2 font-sans">
              Everything you need to know about joining our societies, attending events, and collaborating with the council.
            </p>
            <div className="w-16 h-1 bg-[#FFC93C] mx-auto mt-4 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#7B2FF7]/10 text-[#7B2FF7] dark:text-[#9B5FF9] mb-1.5">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F0B1E] dark:text-[#FFF8EC]">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#7B2FF7] text-white' : 'text-black/60 dark:text-white/60'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm text-black/75 dark:text-white/75 font-sans leading-relaxed border-t border-black/5 dark:border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs sm:text-sm text-black/60 dark:text-white/60">
              Still have questions not covered here?{' '}
              <Link href="/societies" className="text-[#FF4D6D] hover:underline font-semibold">
                Explore Society details
              </Link>{' '}
              or message us using the form above.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
