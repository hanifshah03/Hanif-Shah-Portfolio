import { useState, useRef } from 'react';
import { Cpu, Terminal, Layers, Database, ShieldCheck, Filter } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { SKILL_CATEGORIES } from '../types';

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const [activeFilter, setActiveFilter] = useState<'All' | 'AI/ML' | 'Languages' | 'Cloud' | 'Frameworks'>('All');

  const filters = [
    { label: 'ALL_SKILLS', value: 'All' },
    { label: 'AI / ML', value: 'AI/ML' },
    { label: 'LANGUAGES', value: 'Languages' },
    { label: 'FRAMEWORKS', value: 'Frameworks' },
    { label: 'CLOUD & TOOLS', value: 'Cloud' }
  ] as const;

  const filteredCategories = SKILL_CATEGORIES.filter((category) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'AI/ML') return category.title === 'AI / ML & Computer Vision';
    if (activeFilter === 'Languages') return category.title === 'Languages & Core CS';
    if (activeFilter === 'Frameworks') return category.title === 'Libraries & Frameworks';
    if (activeFilter === 'Cloud') return category.title === 'Tools, Cloud & Platforms';
    return true;
  });

  // Map icons to categories for dynamic decoration
  const getCategoryIcon = (title: string) => {
    if (title.includes('AI') || title.includes('Vision')) return Cpu;
    if (title.includes('Languages') || title.includes('CS')) return Terminal;
    if (title.includes('Libraries')) return Layers;
    return Database;
  };

  return (
    <section ref={sectionRef} id="tech" className="py-24 relative overflow-hidden px-6 md:px-12 bg-slate-950/20">
      
      {/* Background Decorative Blur */}
      <motion.div style={{ y: orbY }} className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-2 mb-12 text-left"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            03. CORE_SKILLS
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Technical Arsenal
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent mt-1" />
        </motion.div>

        {/* Filtering System */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-10 max-w-4xl text-left"
        >
          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs mr-2 border-r border-slate-900 pr-4">
            <Filter className="w-3.5 h-3.5 text-cyan-500" />
            <span>FILTER</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'border-cyan-500/60 text-cyan-400 bg-cyan-950/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800 bg-slate-950/40'
                  }`}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 transition-colors duration-300 ${
                    isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                  }`} />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const IconComponent = getCategoryIcon(category.title);
              return (
                <motion.div
                  key={category.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl bg-slate-950 border border-slate-900 p-8 hover:border-cyan-500/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.05)]"
                >
                  {/* Tech Panel Header */}
                  <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/10 font-mono text-[9px] text-cyan-400">
                      <ShieldCheck className="w-3 h-3 text-cyan-500" />
                      SECURE_STACK
                    </div>
                  </div>

                  {/* Badges Flow */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/30 hover:bg-slate-900 text-slate-300 hover:text-cyan-400 font-mono text-xs font-medium tracking-wide transition-all duration-200 cursor-default"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors" />
                        {skill}
                      </div>
                    ))}
                  </div>

                  {/* Sub-corner sci-fi markings */}
                  <div className="absolute bottom-2 right-4 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                    <span className="font-mono text-[9px] text-cyan-400">SYS_DEC_NODE::{category.title.substring(0, 4).toUpperCase()}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Tech Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass-panel p-6 rounded-xl border border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-left"
        >
          <div className="space-y-1">
            <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest">CONTINUOUS INTEGRATION & DEVELOPMENT</p>
            <p className="text-slate-400 text-sm">Regularly studying peer-reviewed papers and deploying ML pipelines locally & on public clouds.</p>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
            <span>STABILITY_INDEX_OK</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
