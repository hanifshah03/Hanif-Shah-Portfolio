import { useRef } from 'react';
import { GraduationCap, Calendar, MapPin, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [90, -90]);

  const educationData = [
    {
      id: 'EDU-1',
      duration: '2022 - 2026',
      title: 'Brainware University',
      subtitle: 'B.Tech Computer Science Engineering (AI & ML)',
      description: 'Focusing on cutting-edge Artificial Intelligence, Machine Learning, Deep Learning, and Computer Vision.',
      scoreLabel: 'Current CGPA / Percentage',
      score: '80%',
      location: 'IND'
    },
    {
      id: 'EDU-2',
      duration: 'Completed 2020',
      title: 'Higher Secondary Schooling',
      subtitle: 'WBCHSE Board',
      description: 'Completed science track with major focusing on Chemistry,Physics, Mathematics and Biology.',
      scoreLabel: 'Final Score',
      score: '84%',
      location: 'IND'
    },
    {
      id: 'EDU-3',
      duration: 'Completed 2018',
      title: 'Secondary Schooling',
      subtitle: 'WBBSE Board',
      description: 'General curriculum focusing on core science and humanities.',
      scoreLabel: 'Final Score',
      score: '71.85%',
      location: 'IND'
    }
  ];

  return (
    <section ref={sectionRef} id="education" className="py-24 relative overflow-hidden px-6 md:px-12 bg-slate-950/20">
      
      {/* Decorative Orbs */}
      <motion.div style={{ y: orb1Y }} className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: orb2Y }} className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
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
            02. ACADEMIC_PATHWAY
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Education History
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-1" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Vertical Line (Visible on md and up) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-900 -translate-x-1/2" />

          {/* Staggered Timeline Cards */}
          <div className="space-y-12 md:space-y-0 relative">
            {educationData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.id} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                  
                  {/* Left Column Spacer / Card placement */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:order-1' : 'md:order-3 md:text-right'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="glass-panel p-6 md:p-8 rounded-2xl border border-slate-900 hover:border-cyan-500/20 transition-all duration-300 text-left hover:shadow-[0_10px_25px_rgba(6,182,212,0.02)] relative group"
                    >
                      {/* Top Row: Year and ID */}
                      <div className="flex justify-between items-center mb-4 border-b border-slate-900/60 pb-3">
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.duration}</span>
                        </div>
                        <span className="font-mono text-xs text-slate-500 font-medium">#{item.id}</span>
                      </div>

                      {/* Content */}
                      <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-cyan-400 text-sm font-semibold font-display mt-1">
                        {item.subtitle}
                      </p>
                      
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4 mb-6">
                        {item.description}
                      </p>

                      {/* Footer Row: Score and Location */}
                      <div className="flex justify-between items-center border-t border-slate-900/60 pt-4 mt-2">
                        <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold">
                          <Star className="w-3.5 h-3.5 fill-cyan-400/20" />
                          <span>{item.scoreLabel}: {item.score}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Timeline Node (Circle with GraduationCap) */}
                  <div className="absolute left-4 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 md:order-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: idx * 0.15 }}
                      className="w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300"
                    >
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                  </div>

                  {/* Right Column Spacer (Visible on md and up to balance the flex layout) */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'order-3' : 'order-1'}`} />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
