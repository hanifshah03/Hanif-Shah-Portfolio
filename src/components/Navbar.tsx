import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Cpu, Mail, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../types';

interface NavbarProps {
  onOpenResume: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Navbar({ onOpenResume, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel py-3 shadow-lg border-b border-cyan-500/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo/Identity */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="font-display font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
            {DEVELOPER_PROFILE.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 font-display text-sm tracking-widest text-slate-400 font-medium items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="relative py-1 hover:text-cyan-400 transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_#06b6d4]" />
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onOpenResume}
                className="px-3.5 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20 text-cyan-400 hover:text-cyan-300 font-display font-bold text-xs tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
              >
                RESUME
              </button>
            </li>
          </ul>

          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)] p-1.5 rounded bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)] p-1.5 rounded bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)] p-1.5 rounded bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <div className="h-4 w-[1px] bg-slate-800" />

            <button
              onClick={onToggleTheme}
              className="text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)] p-1.5 rounded bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all cursor-pointer flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 animate-pulse" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden min-w-[48px] min-h-[48px] p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 top-[64px] bg-slate-950/98 backdrop-blur-xl z-40 transition-all duration-300 md:hidden flex flex-col justify-between p-8 border-t border-slate-900 ${
          isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-5 font-display text-base tracking-widest text-slate-300 font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 min-h-[48px] py-2 border-b border-slate-900/60 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
              >
                <Cpu className="w-4 h-4 text-cyan-500 shrink-0" />
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center gap-3 min-h-[48px] py-2 border-b border-slate-900/60 text-cyan-400 hover:text-cyan-300 font-display text-left font-semibold transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-cyan-500 animate-pulse shrink-0" />
              RESUME (PRINT/PDF)
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className="w-full flex items-center justify-between min-h-[48px] py-2 border-b border-slate-900/60 text-slate-300 hover:text-cyan-400 font-display text-left font-semibold transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>THEME: {theme.toUpperCase()}</span>
              </div>
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500 animate-spin-slow shrink-0" /> : <Moon className="w-4 h-4 text-blue-500 shrink-0" />}
            </button>
          </li>
        </ul>

        {/* Mobile Social Drawer Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-900/80 pt-8">
          <p className="text-xs font-mono text-slate-500 tracking-wider text-center">
            CONNECT WITH HANIF SHAH
          </p>
          <div className="flex justify-center gap-6">
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[48px] min-h-[48px] flex items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[48px] min-h-[48px] flex items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="min-w-[48px] min-h-[48px] flex items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
