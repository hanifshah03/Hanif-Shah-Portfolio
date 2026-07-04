import { useState, useRef, MouseEvent } from 'react';
import { Github, Cpu, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROJECTS, Project } from '../types';
import VirtualMouseVisualizer from './VirtualMouseVisualizer';
import SegmentationVisualizer from './SegmentationVisualizer';
import AzureCognitiveVisualizer from './AzureCognitiveVisualizer';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden px-6 md:px-12 bg-slate-950/40">
      
      {/* Decorative background gradients */}
      <motion.div style={{ y: orb1Y }} className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div style={{ y: orb2Y }} className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

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
            04. RECENT_WORK
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Projects Gallery
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent mt-1" />
          <p className="text-slate-400 text-sm md:text-base mt-4 max-w-xl">
            Interactive showcase of intelligent computer vision utilities and deep learning pipelines solving complex spatial and user interface tasks.
          </p>
        </motion.div>

        {/* Projects Grid of Interactive 3D Hover Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* Sub-component: Dynamic 3D Tilting Card */
interface ProjectCardProps {
  project: Project;
  index: number;
  key?: string;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Only calculate 3D tilt on hover-enabled pointer devices (PC, Laptop, macOS, Windows, Linux)
    if (window.matchMedia('(hover: none)').matches) return;
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse position relative to card boundaries
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Scale rotation angles (max 12 degrees tilt)
    setRotateX(-normalizedY * 12);
    setRotateY(normalizedX * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="h-full select-none"
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className={`relative h-full rounded-2xl bg-slate-950 border transition-all duration-300 flex flex-col justify-between p-8 text-left group ${
          isHovered
            ? 'border-cyan-500/40 shadow-[0_15px_35px_rgba(6,182,212,0.1)] bg-slate-900/60'
            : 'border-slate-900'
        }`}
      >
        {/* Neon Edge Highlight */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />

        <div className="relative z-10 space-y-6">
          
          {/* Top category row */}
          <div className="flex justify-between items-center" style={{ transform: 'translateZ(30px)' }}>
            <span className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-widest uppercase">
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <span className="font-mono text-[10px] text-slate-500">ML_MODEL_ACTIVE</span>
            </div>
          </div>

          {/* Dynamic 3D Project Visualizer Showcase */}
          <div style={{ transform: 'translateZ(35px)' }} className="w-full">
            {project.id === 'virtual-mouse' ? (
              <VirtualMouseVisualizer isCardHovered={isHovered} />
            ) : project.id === 'azure-cv-app' ? (
              <AzureCognitiveVisualizer isCardHovered={isHovered} />
            ) : (
              <SegmentationVisualizer isCardHovered={isHovered} />
            )}
          </div>

          {/* Project Title */}
          <h3
            style={{ transform: 'translateZ(45px)' }}
            className="font-display font-bold text-2xl text-white group-hover:text-cyan-400 transition-colors"
          >
            {project.title}
          </h3>

          {/* Project Description */}
          <p
            style={{ transform: 'translateZ(35px)' }}
            className="text-slate-400 text-sm leading-relaxed"
          >
            {project.description}
          </p>

          {/* Key Features Bullet List */}
          <div style={{ transform: 'translateZ(40px)' }} className="space-y-2 pt-2 border-t border-slate-900">
            <p className="font-mono text-xs text-slate-500 tracking-wider">KEY_IMPLEMENTATIONS:</p>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-350 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies badges */}
          <div style={{ transform: 'translateZ(30px)' }} className="flex flex-wrap gap-1.5 pt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* Buttons / Actions */}
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="flex items-center gap-4 mt-8 pt-4 border-t border-slate-900 relative z-10"
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 border border-slate-800 hover:border-cyan-400 text-slate-300 font-display font-bold text-xs tracking-wider transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              VIEW SOURCE CODE
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-transparent hover:bg-slate-900 border border-transparent hover:border-slate-800 text-cyan-400 hover:text-white font-display font-bold text-xs tracking-wider transition-all duration-300"
            >
              LAUNCH RUNTIME
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>
    </motion.div>
  );
}
