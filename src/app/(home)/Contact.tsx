'use client';

import { useState } from 'react';
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to send message'
      );
    }
  };

  return (
    <section id="contact" className="section-padding bg-indigo-base">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-paper">
              Get in Touch
            </h2>
            <p className="mt-4 text-paper/60 text-lg max-w-2xl mx-auto">
              Have a question or want to collaborate? We&apos;d love to hear from you.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollAnimationWrapper direction="left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-paper/80 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-paper/5 border border-paper/10 rounded-xl text-paper placeholder-paper/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-paper/80 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-paper/5 border border-paper/10 rounded-xl text-paper placeholder-paper/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-paper/80 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-paper/5 border border-paper/10 rounded-xl text-paper placeholder-paper/30 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-8 bg-coral hover:bg-coral/90 disabled:opacity-50 disabled:cursor-not-allowed text-paper font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 focus:ring-offset-indigo-base"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-teal/10 border border-teal/30 rounded-xl text-teal text-sm" role="alert">
                  ✓ Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-coral/10 border border-coral/30 rounded-xl text-coral text-sm" role="alert">
                  ✗ {errorMessage}
                </div>
              )}
            </form>
          </ScrollAnimationWrapper>

          {/* Contact Info */}
          <ScrollAnimationWrapper direction="right">
            <div className="space-y-8">
              <div className="bg-paper/5 border border-paper/10 rounded-2xl p-8">
                <h3 className="font-serif text-xl font-bold text-paper mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-violet/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-paper/50">Email</p>
                      <p className="text-paper">cultural@iiita.ac.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-coral/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-paper/50">Location</p>
                      <p className="text-paper">IIIT Allahabad</p>
                      <p className="text-paper/60 text-sm">Deoghat, Jhalwa, Prayagraj, UP 211015</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-marigold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-marigold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-paper/50">Office Hours</p>
                      <p className="text-paper">Mon – Fri, 5:00 PM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-paper/5 border border-paper/10 rounded-2xl p-8">
                <h3 className="font-serif text-xl font-bold text-paper mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {['Instagram', 'YouTube', 'Twitter', 'Facebook'].map(
                    (platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="w-10 h-10 bg-paper/10 hover:bg-violet/30 rounded-lg flex items-center justify-center text-paper/60 hover:text-paper transition-colors"
                        aria-label={`Follow us on ${platform}`}
                      >
                        <span className="text-xs font-semibold">
                          {platform[0]}
                        </span>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
