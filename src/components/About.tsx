import { useRef } from 'react';
import { Compass, Camera, ChefHat, Cpu, GraduationCap, Target, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { DEVELOPER_PROFILE } from '../types';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const interests = [
    {
      icon: Compass,
      title: 'Traveling',
      description: 'Exploring scenic landscapes, learning about diverse regional heritages, and seeking outdoor adventures.',
      color: 'from-cyan-500/20 to-teal-500/10',
      textColor: 'text-cyan-400',
      borderColor: 'group-hover:border-cyan-500/40'
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Capturing moments, playing with natural light, framing human emotions, and documenting technical journeys.',
      color: 'from-blue-500/20 to-indigo-500/10',
      textColor: 'text-blue-400',
      borderColor: 'group-hover:border-blue-500/40'
    },
    {
      icon: ChefHat,
      title: 'Cooking',
      description: 'Experimenting with recipes, combining aromatic culinary spices, and preparing delicious home-cooked meals.',
      color: 'from-purple-500/20 to-pink-500/10',
      textColor: 'text-purple-400',
      borderColor: 'group-hover:border-purple-500/40'
    },
    {
      icon: Cpu,
      title: 'Learning Tools',
      description: 'Consistently picking up newer software stacks, studying advanced system patterns, and prototyping utilities.',
      color: 'from-teal-500/20 to-emerald-500/10',
      textColor: 'text-teal-400',
      borderColor: 'group-hover:border-teal-500/40'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden px-6 md:px-12 bg-slate-950/40">
      
      {/* Background Orbs */}
      <motion.div style={{ y: orb1Y }} className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: orb2Y }} className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            01. ABOUT_ME
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Who Is Hanif Shah?
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent mt-1" />
        </motion.div>

        {/* Main Content: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: Academic / Goals Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            
            {/* Short Profile Description */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-900 hover:border-cyan-500/20 transition-all duration-300">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans">
                B.Tech CSE (AI & ML) student building intelligent AI applications that solve real-world problems. Specialized in deep learning, computer vision architectures, and robust cloud deployments.
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans mt-3">
                I'm continuously learning modern AI technologies, software engineering, cloud computing, and full-stack development to solve real-world problems.
              </p>
            </div>

            {/* Goal Glass Panel */}
            <div className="flex-1 glass-panel p-8 rounded-2xl border border-slate-900 flex flex-col justify-between hover:border-cyan-500/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 w-fit">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white">
                  My Core Goal
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  "{DEVELOPER_PROFILE.education.goal}"
                </p>
              </div>
              <div className="mt-8 border-t border-slate-900 pt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">OBJECTIVE.STATUS</span>
                <span className="font-mono text-xs text-cyan-400 font-bold tracking-wider">ACTIVE_RUNNING</span>
              </div>
            </div>

            {/* Academic Summary Panel */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-900 hover:border-cyan-500/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 w-fit">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="font-display font-semibold text-xl text-white">
                  Education
                </h4>
                <div className="space-y-2 text-left">
                  <p className="font-display font-medium text-slate-200 text-base">
                    {DEVELOPER_PROFILE.education.degree}
                  </p>
                  <p className="text-cyan-400 text-sm font-semibold">
                    Spec: {DEVELOPER_PROFILE.education.specialization}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {DEVELOPER_PROFILE.education.institution}
                  </p>
                  <p className="font-mono text-xs text-slate-500 mt-2">
                    Timeline: {DEVELOPER_PROFILE.education.duration}
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Column 2: Interests Highlights Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-between gap-6"
          >
            <div className="mb-2">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mb-2">
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                PERSONAL_INTERESTS & VENTURES
              </div>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Beyond writing training loops and writing code, I enjoy several activities that spark my creativity, refresh my focus, and expand my perspective of the world.
              </p>
            </div>

            {/* Interests Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {interests.map((interest, idx) => {
                const IconComponent = interest.icon;
                return (
                  <motion.div
                    key={interest.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`group relative overflow-hidden rounded-xl border border-slate-900 bg-slate-950 p-6 transition-all duration-300 hover:shadow-lg ${interest.borderColor}`}
                  >
                    {/* Gradient background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10 flex flex-col items-start gap-3 text-left">
                      <div className={`p-2.5 rounded-lg bg-slate-900 border border-slate-800 ${interest.textColor} group-hover:bg-slate-950 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                        {interest.title}
                      </h4>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        {interest.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
