import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { ArrowDown, Code2, ArrowUpRight, Cpu, FileText, Camera, Trash2, Image, MapPin, Lock, Unlock } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../types';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [useDefaultAvatar, setUseDefaultAvatar] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [showPasscodeInput, setShowPasscodeInput] = useState<boolean>(false);
  const [passcodeError, setPasscodeError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Load custom profile photo and admin active state from localStorage if it exists
  useEffect(() => {
    const savedImage = localStorage.getItem('hanif_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
    const savedAdmin = localStorage.getItem('hanif_admin_active');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleVerifyPasscode = (e: FormEvent) => {
    e.preventDefault();
    const sanitizedInput = passcodeInput.trim().toLowerCase();
    // Supporting standard accessible passcode combinations for Hanif
    if (sanitizedInput === 'hanif2026' || sanitizedInput === 'hanifshah2026' || sanitizedInput === 'hanif' || sanitizedInput === 'hanifshahhanif1@gmail.com') {
      setIsAdmin(true);
      localStorage.setItem('hanif_admin_active', 'true');
      setPasscodeError('');
      setSuccessMsg('ACCESS GRANTED! DEVELOPER ACCESS ACTIVE.');
      setTimeout(() => setSuccessMsg(''), 3000);
      setShowPasscodeInput(false);
    } else {
      setPasscodeError('INVALID KEY. ACCESS DENIED.');
      setTimeout(() => setPasscodeError(''), 3000);
    }
  };

  const handleLockAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('hanif_admin_active');
    setShowPasscodeInput(false);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('hanif_profile_image', base64String);
        setProfileImage(base64String);
        setUseDefaultAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    localStorage.removeItem('hanif_profile_image');
    setProfileImage(null);
    setUseDefaultAvatar(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 md:px-12"
    >
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 cyber-grid z-0" />
      
      {/* Background radial gradient to fade the grid in the center */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Profile Info (Left 7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          
          {/* Status & Location Badges */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-cyan text-xs font-mono tracking-widest text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
              CURRENTLY FOCUSING ON AI / ML / CV
            </div>
            <a
              href="https://maps.google.com/?q=Kolkata,+West+Bengal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-mono tracking-wider text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              KOLKATA, WEST BENGAL
            </a>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <p className="font-mono text-sm tracking-widest text-slate-400">
              SYSTEM.LAUNCH_SEQUENCE_SUCCESSFUL
            </p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-white">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:glow-cyan duration-500">{DEVELOPER_PROFILE.name}</span>
            </h1>
            <p className="font-display font-medium text-lg sm:text-xl md:text-2xl text-cyan-300 tracking-wide mt-2">
              {DEVELOPER_PROFILE.title}
            </p>
          </div>

          {/* Subheading */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
            B.Tech CSE (AI & ML) student building intelligent AI applications that solve real-world problems. Specialized in deep learning, computer vision architectures, and robust cloud deployments.
          </p>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-3 gap-6 py-4 border-y border-slate-900 w-full max-w-lg font-mono text-xs text-slate-400">
            <div>
              <p className="text-cyan-400 text-base font-bold font-display">B.Tech CSE</p>
              <p className="tracking-wide">AI & ML (2022-26)</p>
            </div>
            <div>
              <p className="text-cyan-400 text-base font-bold font-display">OpenCV / PyTorch</p>
              <p className="tracking-wide">Framework Core</p>
            </div>
            <div>
              <p className="text-cyan-400 text-base font-bold font-display">AI Intern</p>
              <p className="tracking-wide">Software Engineer</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-2 w-full sm:w-auto">
            <a
              href="#projects"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 group"
            >
              EXPLORE PROJECTS
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <button
              onClick={onOpenResume}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 font-display font-bold text-sm tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 cursor-pointer"
            >
              <FileText className="w-4.5 h-4.5" />
              VIEW & PRINT RESUME
            </button>
            
            <a
              href="#contact"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-transparent hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-display font-bold text-sm tracking-wider transition-all duration-300"
            >
              GET IN TOUCH
              <ArrowUpRight className="w-4 h-4 text-cyan-500" />
            </a>
          </div>

        </div>

        {/* Avatar Profile Picture Frame (Right 5 Columns) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            
            {/* Spinning Neon External Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-double border-blue-500/10 animate-[spin_25s_linear_infinite_reverse]" />
            <div className="absolute inset-8 rounded-full border border-cyan-400/20 border-t-cyan-400 border-b-blue-500 animate-[spin_10s_linear_infinite]" />

            {/* Glowing Shadow Ambient */}
            <div className="absolute inset-10 rounded-full bg-cyan-500/10 blur-[40px] pointer-events-none" />

            {/* Core Circular Avatar Frame */}
            <div className="absolute inset-10 rounded-full bg-slate-950 border-2 border-slate-900 overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.15)] flex items-center justify-center">
              
              {/* High-Tech HUD elements overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-slate-950/80 z-20 pointer-events-none" />
              
              {/* Interactive Laser Scanning line */}
              <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#06b6d4] z-30 animate-[bounce_5s_ease-in-out_infinite] pointer-events-none" />

              {/* Hidden File Input for Live Profile Photo Upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {(profileImage || !useDefaultAvatar) ? (
                /* Dynamic real-photo container (loads uploaded photo OR default GitHub picture) */
                <img
                  src={profileImage || "https://github.com/hanifshah03.png"}
                  alt={DEVELOPER_PROFILE.name}
                  onError={() => setUseDefaultAvatar(true)}
                  className="w-full h-full object-cover scale-105 z-10 select-none bg-slate-950 transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                /* Vector Silhouette Portrait of Hanif Shah based on photo */
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full object-cover scale-105 z-10 select-none bg-slate-950 transition-transform duration-700 group-hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Soft Circle Gradient */}
                  <defs>
                    <radialGradient id="avatarGlow" cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
                      <stop offset="0%" stopColor="#112240" />
                      <stop offset="70%" stopColor="#0a192f" />
                      <stop offset="100%" stopColor="#030712" />
                    </radialGradient>
                    <linearGradient id="blazerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="neonCyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#avatarGlow)" />

                  {/* Grid guidelines overlay (Sci-fi look) */}
                  <circle cx="200" cy="200" r="160" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="5,10" opacity="0.3" />
                  <circle cx="200" cy="200" r="130" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.1" />
                  <line x1="200" y1="20" x2="200" y2="380" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="3,8" opacity="0.2" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="3,8" opacity="0.2" />

                  {/* Main Portrait Silhouette of Hanif Shah */}
                  <g id="portrait">
                    {/* Suit Blazer / Jacket (Navy Blue) */}
                    <path
                      d="M 110 330 C 110 270, 140 240, 170 240 L 230 240 C 260 240, 290 270, 290 330 L 310 400 L 90 400 Z"
                      fill="url(#blazerGradient)"
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    {/* Suit Lapels */}
                    <path d="M 140 250 L 175 320 L 180 400" stroke="#334155" strokeWidth="2.5" fill="none" />
                    <path d="M 260 250 L 225 320 L 220 400" stroke="#334155" strokeWidth="2.5" fill="none" />

                    {/* White Collared Shirt */}
                    <path
                      d="M 170 240 L 200 280 L 230 240 L 215 310 L 185 310 Z"
                      fill="#f8fafc"
                    />
                    <path d="M 170 240 L 188 285 L 185 310" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                    <path d="M 230 240 L 212 285 L 215 310" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                    {/* Shirt collar flaps */}
                    <path d="M 170 240 C 180 250, 185 270, 185 275 L 195 240" stroke="#94a3b8" strokeWidth="1" fill="#ffffff" />
                    <path d="M 230 240 C 220 250, 215 270, 215 275 L 205 240" stroke="#94a3b8" strokeWidth="1" fill="#ffffff" />
                    {/* Button details */}
                    <circle cx="200" cy="315" r="2.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
                    <circle cx="200" cy="340" r="2.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />

                    {/* Neck */}
                    <path
                      d="M 180 185 C 180 230, 220 230, 220 185 Z"
                      fill="#df9b7d" // Stylized skin color matching lighting
                    />
                    {/* Neck Shadow */}
                    <path d="M 180 195 C 200 220, 220 220, 220 195" fill="none" stroke="#bf715a" strokeWidth="8" opacity="0.4" />

                    {/* Head / Face */}
                    <path
                      d="M 148 150 C 148 220, 252 220, 252 150 C 252 85, 148 85, 148 150 Z"
                      fill="#e6a78d"
                    />

                    {/* Hair (Dark, wavy, slightly swept to the right side of screen/left side of face) */}
                    {/* Sideburns and back */}
                    <path
                      d="M 146 150 C 144 110, 160 85, 195 72 C 235 68, 255 85, 256 120 C 257 140, 254 152, 250 152 C 250 135, 246 100, 205 85 C 170 95, 155 125, 154 150 Z"
                      fill="#1e1e24"
                    />
                    {/* Main voluminous swept hair volume */}
                    <path
                      d="M 144 135 C 140 100, 165 65, 205 55 C 245 45, 265 70, 260 115 C 265 105, 262 85, 245 75 C 225 65, 175 75, 155 110 Z"
                      fill="#111115"
                    />
                    {/* Front hair spikes/waves */}
                    <path d="M 145 125 Q 160 90, 180 85 Q 165 105, 150 130 Z" fill="#1e1e24" />
                    <path d="M 180 85 Q 215 65, 245 80 Q 215 80, 190 95 Z" fill="#1e1e24" />
                    <path d="M 200 70 Q 235 65, 255 95 Q 235 85, 210 95 Z" fill="#282830" />

                    {/* Ears */}
                    <path d="M 148 145 C 140 145, 140 165, 148 165 Z" fill="#cf8a72" />
                    <path d="M 252 145 C 260 145, 260 165, 252 165 Z" fill="#cf8a72" />

                    {/* Eyebrows */}
                    <path d="M 162 136 Q 175 126, 186 133" stroke="#1a1a20" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M 238 136 Q 225 126, 214 133" stroke="#1a1a20" strokeWidth="3" strokeLinecap="round" fill="none" />

                    {/* Eyes (Dark Brown as in Photo) */}
                    <ellipse cx="176" cy="144" rx="6" ry="4" fill="#1c1816" />
                    <circle cx="175.5" cy="143" r="1.5" fill="#ffffff" />
                    <ellipse cx="224" cy="144" rx="6" ry="4" fill="#1c1816" />
                    <circle cx="223.5" cy="143" r="1.5" fill="#ffffff" />

                    {/* Nose (Elegant shadow lines) */}
                    <path d="M 197 142 L 197 165 Q 200 171, 203 165" stroke="#bf715a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                    {/* Mustache (Thin, neat, slightly curved as in Photo) */}
                    <path
                      d="M 174 182 C 183 176, 195 177, 200 181 C 205 177, 217 176, 226 182 C 220 184, 204 184, 200 183 C 196 184, 180 184, 174 182 Z"
                      fill="#1a1a20"
                    />

                    {/* Mouth / Lips */}
                    <path d="M 185 192 Q 200 198, 215 192" stroke="#d48a73" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 188 192 Q 200 195, 212 192" stroke="#b25d48" strokeWidth="1" fill="none" />

                    {/* Stylish Soul Patch Beard under lip matching Photo */}
                    <path d="M 195 199 L 205 199 L 203 206 L 197 206 Z" fill="#1a1a20" />

                    {/* Stylish Chin Goatee matching Photo */}
                    <path d="M 182 208 C 182 218, 218 218, 218 208 Q 200 220, 182 208" fill="#1a1a20" />

                    {/* Subtle beard shadow detail on jawline */}
                    <path d="M 148 168 C 158 204, 170 216, 200 216 C 230 216, 242 204, 252 168" stroke="#cca293" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.3" />
                  </g>

                  {/* Tech overlay text and cyber frames */}
                  <text x="50" y="360" fill="#06b6d4" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.7">IP: 192.168.0.3</text>
                  <text x="350" y="360" fill="#06b6d4" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.7" textAnchor="end">SYS.ON</text>
                  
                  {/* Tech corners */}
                  <path d="M 40,40 L 40,20 L 20,40" fill="none" stroke="#06b6d4" strokeWidth="2" />
                  <path d="M 360,40 L 360,20 L 380,40" fill="none" stroke="#06b6d4" strokeWidth="2" />
                  <path d="M 40,360 L 40,380 L 20,360" fill="none" stroke="#06b6d4" strokeWidth="2" />
                  <path d="M 360,360 L 360,380 L 380,360" fill="none" stroke="#06b6d4" strokeWidth="2" />
                </svg>
              )}

              {/* Hover Interaction Overlay to Upload / Change Real Photo with Developer Passcode Lock */}
              <div className="absolute inset-0 bg-slate-950/90 z-40 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[3px]">
                {!isAdmin ? (
                  <div className="flex flex-col items-center justify-center p-4 w-full h-full text-center">
                    {!showPasscodeInput ? (
                      <>
                        <Lock className="w-8 h-8 text-rose-500 mb-1 animate-pulse" />
                        <span className="font-display font-bold text-[11px] tracking-wider text-rose-400 uppercase">
                          OWNER ACCESS ONLY
                        </span>
                        <p className="font-mono text-[8.5px] text-slate-400 mt-1.5 mb-3 max-w-[190px] leading-relaxed">
                          Only Hanif Shah has authority to change the profile picture.
                        </p>
                        <button
                          onClick={() => {
                            setShowPasscodeInput(true);
                            setPasscodeInput('');
                            setPasscodeError('');
                          }}
                          className="py-1.5 px-3 rounded bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950/40 text-cyan-400 font-mono text-[9px] tracking-wider transition-all cursor-pointer hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"
                        >
                          ENTER ACCESS KEY
                        </button>
                      </>
                    ) : (
                      <form onSubmit={handleVerifyPasscode} className="w-full max-w-[210px] flex flex-col items-center gap-2 px-2">
                        <span className="font-mono text-[8px] text-cyan-400 tracking-wider">INPUT DEPLOYMENT KEY</span>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passcodeInput}
                          onChange={(e) => setPasscodeInput(e.target.value)}
                          className="w-full text-center font-mono text-xs py-1.5 px-2 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 focus:outline-none focus:border-cyan-400 placeholder-slate-700"
                          autoFocus
                        />
                        {passcodeError && (
                          <p className="font-mono text-[7.5px] text-rose-400 animate-bounce">{passcodeError}</p>
                        )}
                        <div className="flex gap-2 w-full mt-1">
                          <button
                            type="button"
                            onClick={() => setShowPasscodeInput(false)}
                            className="flex-1 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[8.5px] cursor-pointer"
                          >
                            CANCEL
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-[8.5px] cursor-pointer"
                          >
                            VERIFY
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 w-full h-full text-center gap-2">
                    <Unlock className="w-8 h-8 text-emerald-400 animate-pulse" />
                    <span className="font-display font-bold text-[10px] tracking-wider text-emerald-400 uppercase">
                      DEVELOPER ACCESS ACTIVE
                    </span>
                    
                    <div className="flex flex-col gap-1.5 w-3/4 z-50">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-1.5 px-3 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-[10px] tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      >
                        SELECT NEW PHOTO
                      </button>
                      
                      {profileImage && (
                        <button
                          onClick={handleRemoveImage}
                          className="w-full py-1.5 px-3 rounded border border-rose-500/50 hover:border-rose-400 hover:bg-rose-950/30 text-rose-400 font-mono text-[10px] tracking-wider transition-all cursor-pointer"
                        >
                          REMOVE PHOTO
                        </button>
                      )}
                      
                      <button
                        onClick={handleLockAdmin}
                        className="w-full py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-300 font-mono text-[8px] tracking-wider cursor-pointer"
                      >
                        LOCK PROFILE ACCESS
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Scanning Info Box inside */}
              <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-cyan-400 tracking-wider space-y-0.5 opacity-90 pointer-events-none">
                <p>ID: SHAH.HANIF.22</p>
                <p>STATUS: {isAdmin ? "DEV_UNLOCKED" : "LOCKED_SECURE"}</p>
                <p>ROLE: AI_ML_DEVELOPER</p>
              </div>

            </div>

            {/* Handset Upload Access Button for Non-Hover viewports */}
            <button
              onClick={() => {
                if (isAdmin) {
                  fileInputRef.current?.click();
                } else {
                  // Prompt password by triggering the passcodeInput state
                  setShowPasscodeInput(true);
                }
              }}
              className="absolute bottom-6 right-6 lg:hidden z-30 p-2.5 rounded-full bg-slate-900/95 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 active:scale-95 shadow-lg flex items-center justify-center cursor-pointer transition-all"
              title={isAdmin ? "Upload Profile Photo" : "Authenticate Owner"}
            >
              {isAdmin ? <Camera className="w-4 h-4 animate-pulse" /> : <Lock className="w-4 h-4 text-rose-400" />}
            </button>

            {/* Glowing Corner Accents */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          </div>
        </div>

      </div>

      {/* Floating Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-slate-500 text-[10px] tracking-[0.25em] uppercase">
          SCROLL_DOWN
        </span>
        <div className="w-5 h-8 rounded-full border border-slate-700 p-1 flex justify-center">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-[bounce_1.5s_infinite]" />
        </div>
      </div>
    </section>
  );
}
