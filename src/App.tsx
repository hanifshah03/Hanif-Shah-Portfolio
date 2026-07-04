import { useState, useEffect } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';
import QuickLinksFab from './components/QuickLinksFab';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden theme-container">
      {/* Interactive 3D Particle Constellation Background (Three.js) */}
      <ThreeCanvas theme={theme} />

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Sticky Cyber Navbar */}
        <Navbar 
          onOpenResume={() => setIsResumeOpen(true)} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Scrollable Layout Sections */}
        <main className="w-full">
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <About />
          <Education />
          <TechStack />
          <Projects />
          <Timeline />
          <Contact />
        </main>
      </div>

      {/* Resume View & Print Modal Overlay */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Floating Action Button (FAB) cluster */}
      <QuickLinksFab onOpenResume={() => setIsResumeOpen(true)} />
    </div>
  );
}
