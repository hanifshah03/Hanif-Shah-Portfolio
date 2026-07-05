import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Download, Link2, Copy, Check, Linkedin, Github, FileText } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../types';

interface QuickLinksFabProps {
  onOpenResume: () => void;
}

export default function QuickLinksFab({ onOpenResume }: QuickLinksFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close FAB on pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fabActions = [
    {
      id: 'resume',
      label: 'Open & Download CV',
      icon: Download,
      color: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
      shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]',
      onClick: () => {
        onOpenResume();
        setIsOpen(false);
      },
    },
    {
      id: 'email',
      label: 'Email Me',
      icon: Mail,
      color: 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700',
      shadow: 'shadow-lg',
      onClick: () => {
        window.open(`mailto:${DEVELOPER_PROFILE.email}`, '_blank');
        setIsOpen(false);
      },
    },
    {
      id: 'copy',
      label: copied ? 'Copied Link!' : 'Copy Portfolio Link',
      icon: copied ? Check : Copy,
      color: copied 
        ? 'bg-emerald-600 border border-emerald-500 text-white' 
        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700',
      shadow: 'shadow-lg',
      onClick: handleCopyLink,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      icon: Linkedin,
      color: 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700',
      shadow: 'shadow-lg',
      onClick: () => {
        window.open(DEVELOPER_PROFILE.linkedin, '_blank');
        setIsOpen(false);
      },
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      icon: Github,
      color: 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700',
      shadow: 'shadow-lg',
      onClick: () => {
        window.open(DEVELOPER_PROFILE.github, '_blank');
        setIsOpen(false);
      },
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Background overlay when open (subtle blur to focus the actions) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-[1px] z-30"
          />
        )}
      </AnimatePresence>

      {/* Floating expanded menu elements */}
      <div className="relative z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="flex flex-col items-end gap-2.5 mb-2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1
                  }
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: 1
                  }
                }
              }}
            >
              {fabActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    variants={{
                      hidden: { opacity: 0, y: 15, scale: 0.9 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="flex items-center gap-3 group"
                  >
                    {/* Tooltip Label */}
                    <span className="md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-200 pointer-events-none bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                      {action.label}
                    </span>

                    {/* Action Circle Button */}
                    <button
                      onClick={action.onClick}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${action.color} ${action.shadow}`}
                      title={action.label}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master Toggle Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all border shadow-2xl relative group/master ${
            isOpen 
              ? 'bg-slate-950 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
          }`}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {/* Cyber scanner ring when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 group-hover/master:scale-110 group-hover/master:opacity-100 opacity-0 transition-all duration-500" />
          )}

          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex items-center justify-center"
          >
            {/* When open, we show an 'X' via the rotation of Link2 */}
            <Link2 className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>

    </div>
  );
}
