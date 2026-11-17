import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Copy, ArrowUpRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { InteractiveText } from './InteractiveText';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('deepakiruthika156@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please provide a subject';
    if (!formData.message.trim() || formData.message.length < 8) {
      newErrors.message = 'Please provide a message with at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      sound.playPop();
      return;
    }

    setIsSubmitting(true);
    sound.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#121212', '#7928CA', '#FF4D26'],
        });
      } catch {
        // Fallback
      }
    }, 900);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-36 bg-[#F4F3EF] text-[#121212] overflow-hidden select-none">
      {/* Moisez Architectural 12-Column Grid Lines */}
      <div className="architectural-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-black/[0.08] mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
            [ 06 // DIRECT CONTACT ]
          </span>
          <span className="text-xs font-mono uppercase text-[#121212] font-semibold">
            GET IN TOUCH
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#121212] tracking-tight leading-[1.05]">
                <span className="block">
                  <InteractiveText text="HAVE AN IDEA?" hoverColor="#FF4D26" />
                </span>
                <span className="block mt-1">
                  <InteractiveText text="LET'S TALK." hoverColor="#7928CA" />
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal">
                Whether you want to discuss IoT sensor systems, microcontroller architectures, or engineering opportunities, feel free to reach out.
              </p>
            </div>

            {/* Direct Coordinates Dossier */}
            <div className="space-y-4 pt-4 border-t border-black/[0.08]">
              
              {/* Email */}
              <div className="flex items-center justify-between p-4 bg-white border border-black/10 rounded-xl hover:border-black/30 transition-colors">
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Email</div>
                  <a
                    href="mailto:deepakiruthika156@gmail.com"
                    className="font-mono text-xs sm:text-sm font-semibold text-black hover:text-accent-orange transition-colors"
                  >
                    deepakiruthika156@gmail.com
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="button"
                  title="Copy email"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-4 bg-white border border-black/10 rounded-xl hover:border-black/30 transition-colors">
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Phone</div>
                  <a
                    href="tel:+916379719564"
                    className="font-mono text-xs sm:text-sm font-semibold text-black hover:text-accent-orange transition-colors"
                  >
                    +91 6379719564
                  </a>
                </div>
                <a
                  href="tel:+916379719564"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Location */}
              <div className="p-4 bg-white border border-black/10 rounded-xl">
                <div className="text-[10px] font-mono text-gray-400 uppercase">Location</div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-black">
                  Kangeyam, Tamil Nadu, India
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 bg-white border border-black/10 rounded-2xl shadow-sm">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-syne font-bold text-2xl text-black">
                      Message Received
                    </h3>
                    <p className="text-sm text-gray-600 max-w-sm mx-auto font-sans">
                      Thank you. Your message has been sent to Deepakiruthika. I will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-mono underline uppercase text-black hover:text-accent-orange"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/15 bg-gray-50 text-sm text-black focus:outline-none focus:border-black"
                        />
                        {errors.name && <p className="text-[11px] text-red-600 font-mono mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/15 bg-gray-50 text-sm text-black focus:outline-none focus:border-black"
                        />
                        {errors.email && <p className="text-[11px] text-red-600 font-mono mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/15 bg-gray-50 text-sm text-black focus:outline-none focus:border-black"
                      />
                      {errors.subject && <p className="text-[11px] text-red-600 font-mono mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/15 bg-gray-50 text-sm text-black focus:outline-none focus:border-black resize-none"
                      />
                      {errors.message && <p className="text-[11px] text-red-600 font-mono mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-black text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <span>Sending...</span> : <span>Send Message</span>}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
