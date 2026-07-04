import { useState, FormEvent } from 'react';
import { Mail, Github, Linkedin, Send, MessageSquare, MapPin, ExternalLink, Check, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { DEVELOPER_PROFILE } from '../types';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error');
      setErrorMessage('PLEASE FILL ALL FIELD PAYLOADS.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '863e73f7-fa01-41d4-aadd-39be55393845',
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Message from ${formState.name}`
        })
      });

      const result = await response.json();
      if (response.status === 200 || result.success) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        // Reset success status after a few seconds
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setErrorMessage(result.message?.toUpperCase() || 'TRANSMISSION FAILURE.');
      }
    } catch (error) {
      console.error('Web3Forms Error:', error);
      setStatus('error');
      setErrorMessage('NETWORK ERROR. FAILED TO CONNECT TO TRANSMISSION GATEWAY.');
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: 'Direct Email',
      value: DEVELOPER_PROFILE.email,
      href: `mailto:${DEVELOPER_PROFILE.email}`,
      linkText: 'SEND EMAIL'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn Professional Connection',
      value: 'Hanif Shah',
      href: DEVELOPER_PROFILE.linkedin,
      linkText: 'CONNECT ON LINKEDIN'
    },
    {
      icon: Github,
      label: 'GitHub Repositories',
      value: 'hanifshah03',
      href: DEVELOPER_PROFILE.github,
      linkText: 'FOLLOW ON GITHUB'
    },
    {
      icon: Trophy,
      label: 'Kaggle Machine Learning',
      value: 'hanifshah988321',
      href: DEVELOPER_PROFILE.kaggle,
      linkText: 'COMPETE ON KAGGLE'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, West Bengal',
      href: 'https://maps.google.com/?q=Kolkata,+West+Bengal',
      linkText: 'VIEW ON MAPS'
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden px-6 md:px-12 bg-slate-950/40">
      
      {/* Background Gradients */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-2 mb-16 text-left"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            06. CONTACT_INTERFACE
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Initiate Connection
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent mt-1" />
          <p className="text-slate-400 text-sm md:text-base mt-4 max-w-xl">
            Have an exciting ML project, an internship opportunity, or a utility script idea? Drop me a message and let's build something intelligent.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
          
          {/* Column 1: Contact Cards & Info (Left 5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-white">Contact Credentials</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Feel free to reach out via the secure form, or connect directly through standard professional network directories.
              </p>
            </div>

            {/* Direct Cards Stack */}
            <div className="space-y-4 my-6">
              {contactCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.a
                    key={idx}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-900 hover:border-cyan-500/20 transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:bg-slate-950 group-hover:text-cyan-300 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-0.5 overflow-hidden">
                      <p className="text-slate-500 text-[10px] font-mono uppercase tracking-wider">{card.label}</p>
                      <p className="text-slate-200 text-sm font-semibold truncate group-hover:text-cyan-400 transition-colors">{card.value}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </motion.a>
                );
              })}
            </div>

            {/* Academic Location badge */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/10 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <p className="font-mono text-cyan-400 font-bold">CURRENT WORKSTATION</p>
                <p className="text-slate-400">Brainware University Campus, West Bengal, India</p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Form Wrapper (Right 7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-8 rounded-2xl border border-slate-900 shadow-2xl relative h-full">
              <div className="absolute top-4 right-6 font-mono text-[9px] text-cyan-500/60 tracking-widest uppercase">
                COM.CHANNEL_SECURE
              </div>
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-900">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-semibold text-lg text-white">Transmit Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block font-mono text-xs text-slate-400 uppercase tracking-wider">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 focus:border-cyan-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] text-slate-100 placeholder-slate-600 text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block font-mono text-xs text-slate-400 uppercase tracking-wider">
                    Email Vector
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 focus:border-cyan-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] text-slate-100 placeholder-slate-600 text-sm transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block font-mono text-xs text-slate-400 uppercase tracking-wider">
                    Transmission Content
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Type your message payload..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 focus:border-cyan-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] text-slate-100 placeholder-slate-600 text-sm transition-all resize-none"
                  />
                </div>

                {/* Status Banners */}
                {status === 'error' && (
                  <div className="p-3 rounded bg-rose-950/40 border border-rose-500/20 text-xs text-rose-400 font-mono">
                    ERROR: {errorMessage || 'TRANSMISSION FAILED. PLEASE TRY AGAIN.'}
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center gap-3 text-sm text-emerald-400 font-mono">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>SUCCESS: MESSAGE TRANSMITTED SAFELY!</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-display font-bold tracking-wider transition-all duration-300 ${
                    status === 'sending'
                      ? 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      TRANSMITTING...
                      <span className="w-4 h-4 border-2 border-slate-500 border-t-cyan-400 rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      TRANSMIT MESSAGE
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

        </div>

        {/* Footer layout */}
        <div className="mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {DEVELOPER_PROFILE.name}. All systems operational.</p>
          <div className="flex gap-4">
            <span className="hover:text-cyan-400 transition-colors">B.TECH CSE (AI & ML)</span>
            <span>•</span>
            <span className="hover:text-cyan-400 transition-colors">BRAINWARE UNIVERSITY</span>
          </div>
        </div>

      </div>
    </section>
  );
}
