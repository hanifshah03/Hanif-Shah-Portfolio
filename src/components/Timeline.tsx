import { useState } from 'react';
import { Briefcase, Milestone, Award, CloudLightning } from 'lucide-react';
import { motion } from 'motion/react';
import { TIMELINE, TimelineItem } from '../types';
import CertificateModal from './CertificateModal';

export default function Timeline() {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isCertOpen, setIsCertOpen] = useState(false);

  const handleShowCertificate = (cert: any) => {
    setSelectedCert(cert);
    setIsCertOpen(true);
  };

  const getIcon = (id: string) => {
    if (id.includes('management')) return Briefcase;
    if (id.includes('aws')) return CloudLightning;
    return Award;
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden px-6 md:px-12 bg-slate-950/20">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-2 mb-20"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            05. PROFESSIONAL_TIMELINE
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Experience & Achievements
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-1" />
        </motion.div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-slate-900 ml-4 md:ml-12 pl-6 md:pl-12 space-y-12">
          
          {TIMELINE.map((item, idx) => {
            const IconComponent = getIcon(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="relative group"
              >
                
                {/* Glowing Node on Timeline Line */}
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>

                {/* Glass Card Panel */}
                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-slate-900 group-hover:border-cyan-500/20 transition-all duration-300 text-left hover:shadow-[0_10px_25px_rgba(6,182,212,0.02)]">
                  
                  {/* Card Header Row */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm font-semibold text-slate-300">
                        {item.organization}
                      </p>
                    </div>
                    
                    {/* Duration Badge */}
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px] tracking-wider uppercase">
                      {item.duration}
                    </span>
                  </div>

                  {/* Description text */}
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tags Badges & Certificate Trigger */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-cyan-950/30 border border-cyan-500/10 text-cyan-400 font-mono text-[9px] tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.certificate && (
                      <button
                        onClick={() => handleShowCertificate(item.certificate)}
                        className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/40 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-mono text-[10px] tracking-wider uppercase rounded border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                      >
                        <Award className="w-3.5 h-3.5 animate-pulse" />
                        Show Certificate
                      </button>
                    )}
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        certificate={selectedCert}
      />
    </section>
  );
}
