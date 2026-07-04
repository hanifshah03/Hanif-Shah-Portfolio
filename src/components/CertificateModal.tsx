import { X, Printer, ExternalLink, ShieldCheck, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CertificateData {
  type: 'microsoft' | 'aws' | 'geekglory' | 'brainware' | 'simplilearn' | 'yuva';
  title: string;
  recipient: string;
  date: string;
  verifyUrl?: string;
  verifyCode?: string;
  userVerifyCode?: string;
  details: string[];
  signedBy: string;
  role?: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData | null;
}

export default function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // We generate a beautiful printable certificate
    printWindow.document.write(`
      <html>
        <head>
          <title>${certificate.title} - Certificate</title>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@300;400;500;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body {
                background: white;
                color: black;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .no-print {
                display: none;
              }
              @page {
                size: landscape;
                margin: 0;
              }
            }
            .font-serif-header {
              font-family: 'Cinzel', serif;
            }
            .font-signature {
              font-family: 'Great Vibes', cursive;
            }
            .font-playfair {
              font-family: 'Playfair Display', serif;
            }
          </style>
        </head>
        <body class="bg-slate-100 p-8 flex items-center justify-center min-h-screen">
          <div class="no-print fixed top-4 right-4 z-50 flex gap-2">
            <button onclick="window.print()" class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition-all">
              Print / Save PDF
            </button>
            <button onclick="window.close()" class="bg-gray-800 hover:bg-gray-900 text-white font-bold px-4 py-2 rounded shadow cursor-pointer transition-all">
              Close Window
            </button>
          </div>
          <div class="w-[1050px] h-[740px] bg-white p-12 border-[16px] border-double border-slate-300 relative shadow-2xl flex flex-col justify-between overflow-hidden">
            <!-- Content here matching the HTML template -->
            ${renderPrintHTML(certificate)}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Certificate Dialog Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full p-4 md:p-6 shadow-2xl z-10 my-8 overflow-hidden text-left"
        >
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-display font-bold text-lg text-white">Verified Digital Credential</h3>
                <p className="text-xs text-slate-400 font-mono">ID: {certificate.verifyCode || 'VERIFIED-PORTFOLIO'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden md:inline">Print / PDF</span>
              </button>
              {certificate.verifyUrl && (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg transition-all flex items-center gap-2 text-xs md:text-sm"
                  title="Verify online"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden md:inline">Verify Online</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 bg-slate-800 hover:bg-red-500 hover:text-white text-slate-300 rounded-lg transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Certificate Board Display */}
          <div className="bg-slate-950 p-2 md:p-6 rounded-xl border border-slate-850 overflow-x-auto flex justify-center">
            <div className="w-[840px] h-[594px] min-w-[840px] bg-white text-slate-900 p-8 border-[12px] border-double border-slate-300 relative shadow-inner flex flex-col justify-between selection:bg-cyan-150 select-none">
              {renderComponentHTML(certificate)}
            </div>
          </div>

          {/* Bottom helper metadata */}
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-slate-400 font-mono gap-3 pt-3 border-t border-slate-800">
            <div>
              <span>Recipient: <strong>{certificate.recipient}</strong></span>
              <span className="mx-2">•</span>
              <span>Issued: <strong>{certificate.date}</strong></span>
            </div>
            {certificate.verifyCode && (
              <div>
                <span>Verification Code: <strong className="text-cyan-400 select-all">{certificate.verifyCode}</strong></span>
                {certificate.userVerifyCode && (
                  <>
                    <span className="mx-2">•</span>
                    <span>User Verification: <strong className="text-cyan-400 select-all">{certificate.userVerifyCode}</strong></span>
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Renders the live HTML inside the React component preview
function renderComponentHTML(cert: CertificateData) {
  const isLight = true; // Digital certificate is always clean white style for authentic representation

  switch (cert.type) {
    case 'microsoft':
      return (
        <>
          {/* Certificate Corner Borders */}
          <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-slate-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-slate-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-slate-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-slate-400 pointer-events-none" />

          {/* Geometric circular stamp overlay in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(148,163,184,0.06)_0%,transparent_60%)] pointer-events-none" />

          {/* Right vertical panel decoration (Matches image 1) */}
          <div className="absolute right-0 top-0 bottom-0 w-[210px] bg-slate-50 border-l border-slate-200 flex flex-col justify-between p-6 text-right">
            <div className="flex flex-col gap-1 items-end mt-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-sans">PROJECT</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-700 font-sans border-t border-slate-200 pt-1">CERTIFICATE</span>
            </div>

            {/* Coursera Seal Stamp design */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-slate-400/80 p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-slate-300 flex flex-col items-center justify-center p-2 text-center bg-white/50 shadow-sm relative">
                  <span className="text-[8px] font-mono tracking-widest uppercase text-slate-400 leading-none">EDUCATION</span>
                  <span className="text-[8px] font-mono tracking-widest uppercase text-slate-400 leading-none border-b border-slate-200 pb-0.5 mb-1 w-10">FOR ALL</span>
                  <span className="text-[9px] font-bold text-cyan-600 font-serif leading-none uppercase">coursera</span>
                  <div className="w-1 h-1 rounded-full bg-slate-400 my-0.5" />
                  <span className="text-[7px] font-mono tracking-widest uppercase text-slate-400 leading-none">PROJECT</span>
                  <span className="text-[7px] font-mono tracking-widest uppercase text-slate-400 leading-none">CERTIFICATE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end mb-4 font-mono text-[8px] text-slate-400 gap-1 leading-normal">
              <span>Verify at:</span>
              <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline break-all font-sans text-[7.5px] font-semibold text-right leading-tight max-w-[170px]">
                {cert.verifyUrl}
              </a>
              <span className="text-slate-300 text-[7px] mt-1">Coursera has confirmed the identity of this individual and their participation in the project.</span>
            </div>
          </div>

          {/* Left panel core certificate info */}
          <div className="w-[560px] flex flex-col justify-between h-full pr-4 text-left">
            {/* Microsoft Logo Row */}
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-0.5 w-8 h-8">
                <div className="bg-[#f25022] w-3.5 h-3.5" />
                <div className="bg-[#7fba00] w-3.5 h-3.5" />
                <div className="bg-[#00a4ef] w-3.5 h-3.5" />
                <div className="bg-[#ffb900] w-3.5 h-3.5" />
              </div>
              <span className="text-2xl font-bold font-sans text-slate-600 tracking-tight">Microsoft</span>
            </div>

            {/* Recipient area */}
            <div className="my-auto space-y-6">
              <div className="space-y-0.5">
                <span className="text-xs font-mono text-slate-400 tracking-wider block">{cert.date}</span>
                <h1 className="text-4xl font-semibold text-slate-800 font-sans tracking-tight">{cert.recipient}</h1>
                <p className="text-[11px] font-sans text-slate-500 italic">has successfully completed</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-sans tracking-tight leading-snug">
                  {cert.title}
                </h2>
                <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-[500px]">
                  {cert.details[0]}
                </p>
              </div>
            </div>

            {/* Signatures */}
            <div className="border-t border-slate-200 pt-3 mt-4 flex items-end justify-between">
              <div>
                <p className="font-serif italic text-xl text-slate-700 font-signature leading-none">{cert.signedBy}</p>
                <div className="w-36 h-[1px] bg-slate-300 my-1.5" />
                <p className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">{cert.signedBy}</p>
                <p className="text-[8px] font-sans text-slate-500">{cert.role}</p>
              </div>
              
              <div className="text-right text-[9px] font-mono text-slate-300">
                <span>SECURE DIGITAL RECORD</span>
              </div>
            </div>
          </div>
        </>
      );

    case 'aws':
      return (
        <>
          {/* Top Yellow AWS Accent Banner */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[#ff9900]" />
          
          {/* Main contents matching Image 2 */}
          <div className="flex flex-col justify-between h-full p-6">
            {/* Logo header row */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start gap-1">
                <span className="text-3xl font-bold font-sans text-slate-800 tracking-tighter flex items-center">
                  aws
                </span>
                <div className="w-10 h-1 bg-[#ff9900] rounded-full" />
              </div>

              {/* Forage Side Banner */}
              <div className="bg-[#ff9900] text-white py-4 px-6 rounded-b-xl shadow-md flex flex-col items-center">
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-80">ISSUED BY</span>
                <span className="text-lg font-bold font-sans tracking-tight">Forage</span>
                <span className="text-[7px] text-center max-w-[80px] mt-1 opacity-70 leading-tight">Inspiring and empowering future professionals</span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="my-auto space-y-4 pt-4 text-left">
              <h1 className="text-4xl font-extrabold text-slate-900 font-sans tracking-tight">{cert.recipient}</h1>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">{cert.title}</h2>
                <span className="text-xs text-slate-500 font-sans font-semibold">Certificate of Completion</span>
                <span className="mx-2 text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-mono">{cert.date}</span>
              </div>

              <div className="w-20 h-1 bg-slate-200 my-3" />

              <div className="space-y-1">
                <p className="text-xs text-slate-600 font-sans">{cert.details[0]}</p>
                <p className="text-sm font-semibold text-slate-700 font-sans">• {cert.details[1]}</p>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="border-t border-slate-200 pt-4 flex justify-between items-end">
              <div className="space-y-0.5 font-mono text-[8px] text-slate-400">
                <p>Enrolment Verification Code: <span className="text-slate-600 font-bold select-all">{cert.verifyCode}</span></p>
                <p>User Verification Code: <span className="text-slate-600 font-bold select-all">{cert.userVerifyCode}</span></p>
                <p className="text-[7.5px] mt-1">Issued by Forage. Verify authenticity online.</p>
              </div>

              <div className="text-right">
                <span className="font-serif italic text-lg text-slate-700 font-signature leading-none block">{cert.signedBy}</span>
                <div className="w-36 h-[1px] bg-slate-300 my-1" />
                <p className="text-[8px] font-sans font-bold text-slate-700">{cert.signedBy}</p>
                <p className="text-[8px] font-sans text-slate-500">{cert.role}</p>
              </div>
            </div>
          </div>
        </>
      );

    case 'geekglory':
      return (
        <>
          {/* Outer elegant golden border frame */}
          <div className="absolute inset-2 border border-slate-200 pointer-events-none" />

          <div className="flex flex-col justify-between h-full p-4 relative">
            
            {/* Header section with Geekglory logo & Date */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white shadow-md relative overflow-hidden">
                  <div className="absolute inset-0.5 rounded-lg border border-white/20 flex items-center justify-center">
                    <span className="font-bold text-lg font-serif">G</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-wider text-blue-800 font-sans uppercase leading-none">GEEKGLORY</h2>
                  <span className="text-[8px] tracking-widest text-slate-400 uppercase font-mono">TECHNOLOGIES PVT. LTD.</span>
                </div>
              </div>

              <div className="text-right font-mono text-[9px] text-slate-500 leading-tight">
                <p>DATED: <strong>{cert.date}</strong></p>
                <p>CIN: GGTPL/S2/81</p>
              </div>
            </div>

            {/* Internship Title */}
            <div className="text-center my-2">
              <h1 className="text-2xl font-bold text-slate-800 tracking-wider font-sans border-b-2 border-slate-900 pb-1 inline-block uppercase">
                {cert.title}
              </h1>
            </div>

            {/* Certificate text core */}
            <div className="space-y-3 px-6 text-sm text-slate-600 font-sans leading-relaxed text-justify max-w-[720px] mx-auto">
              <p>
                This is to certify that <strong className="text-slate-900 uppercase font-semibold">{cert.recipient}</strong> has completed his internship at Bharat Gaming News for the duration of <strong>3 months</strong>, starting from <strong>October 2025 to January 2026</strong>.
              </p>
              <p>
                In this period, as <strong className="text-slate-900 font-semibold">“Intern – MANAGEMENT”</strong>, he has successfully completed all the tasks assigned to him and has proven to be a valuable resource for the organization in his domain. Time and again, he displayed good determination and problem-solving qualities, coming up with innovative ways to execute his tasks.
              </p>
              <p>We wish him the best of luck for the future.</p>
            </div>

            {/* Footer with MSME, DPIIT Logos & Signatures */}
            <div className="border-t border-slate-200 pt-3 flex justify-between items-end px-4 mt-2">
              <div className="flex items-center gap-4">
                {/* Micro Representation of Indian Government MSME Seal */}
                <div className="flex flex-col items-center border border-slate-200 p-1.5 rounded bg-slate-50">
                  <span className="text-[7px] font-bold text-slate-700 leading-none">MSME</span>
                  <span className="text-[5px] text-slate-400 font-mono">REGD. ENTERPRISE</span>
                </div>
                {/* DPIIT logo representation */}
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[6px] font-mono text-slate-400">SUPPORTED BY</span>
                  <span className="text-[9px] font-bold text-orange-600 font-sans">DPIIT</span>
                  <span className="text-[7px] text-green-700 font-bold tracking-tight">#startupindia</span>
                </div>
              </div>

              <div className="text-center text-[7px] text-slate-400 font-mono max-w-[280px]">
                <p className="font-bold text-slate-500">Geekglory Technologies Private Limited</p>
                <p className="leading-tight mt-0.5">Regd. Office: Naihati, West Bengal 743165. Email: info@geekglorytechnologies.in</p>
              </div>

              <div className="text-right">
                <span className="font-serif italic text-lg text-slate-800 font-signature leading-none block">{cert.signedBy}</span>
                <div className="w-28 h-[1px] bg-slate-300 my-1" />
                <p className="text-[8px] font-sans font-bold text-slate-700">{cert.signedBy}</p>
                <p className="text-[8px] font-sans text-slate-500">{cert.role}</p>
              </div>
            </div>
          </div>
        </>
      );

    case 'brainware':
      return (
        <>
          {/* Elegant Gold Borders */}
          <div className="absolute inset-1 border border-[#b6954a] pointer-events-none" />
          <div className="absolute inset-2 border-[2px] border-[#b6954a]/80 pointer-events-none" />

          {/* Corner Ribbon Decorations */}
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-44 h-44 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,0 L 40,0 L 0,40 Z" fill="#0c325c" />
              <line x1="44" y1="0" x2="0" y2="44" stroke="#b6954a" strokeWidth="1.5" />
              <line x1="49" y1="0" x2="0" y2="49" stroke="#b6954a" strokeWidth="1" />
            </svg>
          </div>

          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-44 h-44 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 100,100 L 60,100 L 100,60 Z" fill="#0c325c" />
              <line x1="56" y1="100" x2="100" y2="56" stroke="#b6954a" strokeWidth="1.5" />
              <line x1="51" y1="100" x2="100" y2="51" stroke="#b6954a" strokeWidth="1" />
            </svg>
          </div>

          {/* Wavy subtle background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='12' viewBox='0 0 80 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6 Q 20 12, 40 6 T 80 6' fill='none' stroke='%23cbd5e1' strokeWidth='0.5'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '80px 12px'
            }}
          />

          <div className="flex flex-col justify-between h-full p-8 text-center relative z-10">
            
            {/* Top-right QR code */}
            <div className="absolute top-3 right-8">
              <div className="w-12 h-12 border border-slate-300 p-0.5 bg-white shadow-sm">
                <div className="w-full h-full bg-slate-900 flex flex-col justify-between p-1">
                  <div className="flex justify-between w-full h-2">
                    <div className="w-2.5 h-2.5 bg-white" />
                    <div className="w-2.5 h-2.5 bg-white" />
                  </div>
                  <div className="flex justify-between w-full h-2">
                    <div className="w-2.5 h-2.5 bg-white" />
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* University Logo Header */}
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="w-14 h-14 rounded-full border border-[#0c78be] p-0.5 flex items-center justify-center bg-white shadow-sm">
                <div className="w-full h-full rounded-full border-2 border-amber-400 flex flex-col items-center justify-center relative p-1">
                  <span className="text-[7px] font-bold text-blue-900 font-serif leading-none scale-90">BWU</span>
                  <span className="text-[4px] text-amber-600 font-bold tracking-widest scale-75 mt-0.5">1990</span>
                </div>
              </div>
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-2xl font-black text-[#0c78be] tracking-tight font-sans">BRAINWARE</span>
                <span className="text-xl font-bold text-[#0c78be] tracking-[0.18em] font-sans">UNIVERSITY</span>
              </div>
            </div>

            {/* Certificate Header */}
            <div className="flex flex-col items-center mt-2">
              <h1 className="text-4xl font-serif text-[#0c325c] font-bold tracking-widest uppercase">
                CERTIFICATE
              </h1>
              <h2 className="text-xs text-slate-500 font-sans tracking-[0.3em] font-medium uppercase mt-0.5">
                OF PARTICIPATION
              </h2>
              <div className="w-48 h-[1px] bg-[#b6954a]/60 mt-1.5" />
            </div>

            {/* Body texts */}
            <div className="my-auto py-2">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                This is to certify that
              </p>
              
              <div className="my-4 max-w-2xl mx-auto px-6">
                <p className="text-sm md:text-base text-slate-700 font-sans leading-relaxed">
                  <strong className="text-slate-900 font-bold font-sans text-lg">{cert.recipient}</strong> of B.Tech.(CSE)-AIML - Arti has participated in <strong className="text-slate-900 font-bold">Internal Hackathon ( SIH 2023 )</strong> held on <strong className="text-slate-900 font-bold">22nd September 2023</strong>.
                </p>
              </div>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-end px-12 pb-2">
              <div className="text-center w-52 flex flex-col items-center">
                {/* Signature Graphic Box */}
                <div className="h-10 flex items-center justify-center relative">
                  <div className="absolute -inset-x-4 h-6 bg-[#ebf3ff]/40 rounded rotate-1" />
                  <span className="font-signature italic text-2xl text-slate-700 leading-none select-none relative z-10">Pranam Paul</span>
                </div>
                <div className="w-full h-[1px] bg-slate-300 my-1" />
                <p className="text-[9px] font-sans font-bold text-slate-700 tracking-wider">DR. PRANAM PAUL</p>
                <p className="text-[7.5px] font-sans text-slate-500">President, IIC, BWU</p>
              </div>

              <div className="text-center w-52 flex flex-col items-center">
                {/* Signature Graphic Box */}
                <div className="h-10 flex items-center justify-center relative">
                  <div className="absolute -inset-x-4 h-6 bg-[#ebf3ff]/40 rounded -rotate-1" />
                  <span className="font-signature italic text-2xl text-slate-700 leading-none select-none relative z-10">P. P. Dasgupta</span>
                </div>
                <div className="w-full h-[1px] bg-slate-300 my-1" />
                <p className="text-[9px] font-sans font-bold text-slate-700 tracking-wider">PARTHA PRATIM DASGUPTA</p>
                <p className="text-[7.5px] font-sans text-slate-500">Convener, Tech Club, BWU</p>
              </div>
            </div>

          </div>
        </>
      );

    case 'simplilearn':
      return (
        <>
          {/* Elegant Gray Borders */}
          <div className="absolute inset-2 border border-slate-300 pointer-events-none rounded-sm" />
          <div className="absolute inset-3 border border-slate-200 pointer-events-none rounded-sm" />

          {/* Corner Ribbon Decorations */}
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,0 L 15,0 L 0,15 Z" fill="#4285F4" />
              <path d="M 15,0 L 25,0 L 0,25 L 0,15 Z" fill="#ff9900" />
              <path d="M 25,0 L 35,0 L 0,35 L 0,25 Z" fill="#10b981" />
              <path d="M 35,0 L 45,0 L 0,45 L 0,35 Z" fill="#ef4444" />
            </svg>
          </div>

          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 100,100 L 85,100 L 100,85 Z" fill="#4285F4" />
              <path d="M 85,100 L 75,100 L 100,75 L 100,85 Z" fill="#ef4444" />
              <path d="M 75,100 L 65,100 L 100,65 L 100,75 Z" fill="#10b981" />
              <path d="M 65,100 L 55,100 L 100,55 L 100,65 Z" fill="#ff9900" />
            </svg>
          </div>

          <div className="flex flex-col justify-between h-full p-8 text-center relative z-10">
            
            {/* Logos header Row */}
            <div className="flex justify-between items-center px-2">
              {/* Google Cloud Logo */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <svg className="w-9 h-9" viewBox="0 0 100 100">
                    <path d="M50 15 L20 32.3 L20 67.7 L50 50 Z" fill="#4285F4" />
                    <path d="M50 15 L80 32.3 L80 67.7 L50 50 Z" fill="#EA4335" />
                    <path d="M20 67.7 L50 85 L80 67.7 L50 50 Z" fill="#34A853" />
                    <path d="M50 15 L35 23.6 L50 32.3 L65 23.6 Z" fill="#FBBC05" />
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[7.5px] font-sans font-semibold text-slate-400 tracking-wider uppercase">Powered by</span>
                  <span className="text-base font-bold text-slate-700 font-sans tracking-tight">
                    <span className="text-slate-800 font-bold">Google</span> <span className="text-slate-500 font-medium">Cloud</span>
                  </span>
                </div>
              </div>

              {/* Simplilearn SkillUp Logo */}
              <div className="flex items-center gap-0.5 text-right">
                <span className="text-base font-sans tracking-tight">
                  <span className="text-[#a4a4a4] font-medium">simpli</span><span className="text-[#1070b0] font-bold">learn</span>
                </span>
                <span className="text-slate-300 mx-1.5 text-sm font-light">|</span>
                <span className="text-base font-sans font-extrabold tracking-tight">
                  <span className="text-[#1070b0]">Skill</span><span className="text-[#ff9000]">UP</span>
                </span>
              </div>
            </div>

            {/* Certificate Title / Recipient Center block */}
            <div className="my-auto py-2">
              <span className="text-xs font-semibold tracking-[0.15em] text-[#2a3e5c] uppercase block">DECLARATION OF</span>
              <h2 className="text-2xl font-serif font-medium tracking-[0.25em] text-[#2a3e5c] uppercase mt-0.5">COMPLETION</h2>
              
              {/* Dotted separator line */}
              <div className="w-56 h-[1px] border-t border-dotted border-slate-300 mx-auto my-3" />

              {/* Recipient Name */}
              <h1 className="text-3xl md:text-4xl font-sans font-medium text-[#1090e0] uppercase tracking-wide py-1">
                {cert.recipient}
              </h1>

              {/* Dotted separator line */}
              <div className="w-56 h-[1px] border-t border-dotted border-slate-300 mx-auto my-3" />

              {/* Course Completed statement */}
              <p className="text-[10.5px] italic text-slate-400 font-sans mt-2">has successfully completed the online course:</p>
              
              {/* Course Title */}
              <h3 className="text-lg md:text-xl font-extrabold tracking-wider text-slate-800 uppercase font-sans mt-1.5">
                {cert.title}
              </h3>

              {/* Professional Description Statement */}
              <p className="text-[10px] md:text-[11px] text-slate-400 font-sans italic max-w-lg mx-auto leading-relaxed mt-4">
                This professional has demonstrated initiative and a commitment to deepening their skills and advancing their career. Well done!
              </p>
            </div>

            {/* Footer with Date and Signature */}
            <div className="flex justify-between items-end px-4 mt-2">
              <div className="text-left flex flex-col items-start">
                <span className="text-xs font-bold text-slate-800 font-sans tracking-tight">
                  {cert.date}
                </span>
              </div>

              <div className="text-center w-36 flex flex-col items-center">
                <span className="font-signature italic text-2xl text-slate-700 leading-none select-none">Krishna Kumar</span>
                <div className="w-full h-[1px] bg-slate-300 my-1" />
                <p className="text-[8.5px] font-sans font-bold text-slate-700 tracking-wider">KRISHNA KUMAR</p>
                <p className="text-[7.5px] font-sans text-slate-500">CEO, Simplilearn</p>
              </div>
            </div>

            {/* Fine print at bottom center */}
            <p className="text-[6.5px] text-slate-400 font-sans max-w-xl mx-auto mt-4 leading-snug border-t border-slate-100 pt-1.5">
              This certification is issued solely for the purpose of acknowledging completion of Google Cloud Courses on the Simplilearn portal, and is not an official Google Cloud Certification.
            </p>

          </div>
        </>
      );

    case 'yuva':
      return (
        <>
          {/* Top curve red band as seen in image 6 */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-600 via-[#0e7490] to-blue-600" />
          
          <div className="flex flex-col justify-between h-full p-6 text-center relative">
            
            {/* Logos header Row */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start leading-none">
                <span className="text-base font-black tracking-tight text-slate-800 font-sans">IND/aI</span>
                <span className="text-[6px] tracking-wider font-mono text-slate-400">NATIONAL AI INITIATIVE</span>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="leading-none flex flex-col items-end">
                  <span className="text-[9px] font-black text-slate-800">nasscom</span>
                  <span className="text-[7px] text-red-600 font-bold tracking-tight">futureskills prime</span>
                </div>
              </div>
            </div>

            {/* Round Central Emblem */}
            <div className="flex justify-center my-1">
              <div className="w-16 h-16 rounded-full border-4 border-amber-400 p-0.5 flex items-center justify-center bg-amber-50">
                <div className="w-full h-full rounded-full border border-amber-300 flex flex-col items-center justify-center text-center p-1 bg-white leading-none">
                  <span className="text-[5px] text-amber-700 font-bold uppercase tracking-widest">COURSE</span>
                  <span className="text-[6px] text-amber-950 font-black uppercase leading-tight">PARTICIPATION</span>
                </div>
              </div>
            </div>

            {/* Certificate text elements */}
            <div className="space-y-2">
              <span className="text-xs tracking-wider text-slate-400 font-semibold block">Certificate of Participation</span>
              <h1 className="text-3xl font-extrabold text-slate-950 font-sans tracking-tight">
                {cert.recipient}
              </h1>
              <p className="text-xs text-slate-500 font-sans">has completed</p>
              <h2 className="text-xl font-black text-blue-900 tracking-wide uppercase font-sans">
                {cert.title}
              </h2>
            </div>

            {/* Footer Signatures */}
            <div className="border-t border-slate-200 pt-4 flex justify-between items-end mt-4">
              <div className="text-left font-mono text-[8px] text-slate-400 leading-normal">
                <p>Date of issue: <strong>{cert.date}</strong></p>
                <p>NASSCOM FUTURES_PRIME AUDIT SECURE</p>
              </div>

              <div className="text-right">
                <span className="font-serif italic text-base text-slate-800 font-signature leading-none block">Dr. Abhilasha Gaur</span>
                <div className="w-28 h-[1px] bg-slate-300 my-1" />
                <p className="text-[8px] font-sans font-bold text-slate-700">{cert.signedBy}</p>
                <p className="text-[8px] font-sans text-slate-500">{cert.role}</p>
              </div>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
}

// Renders the precise full page layout used for clean printing & PDF export
function renderPrintHTML(cert: CertificateData) {
  switch (cert.type) {
    case 'microsoft':
      return `
        <div class="absolute top-4 left-4 w-24 h-24 border-t-4 border-l-4 border-slate-400 pointer-events-none"></div>
        <div class="absolute top-4 right-4 w-24 h-24 border-t-4 border-r-4 border-slate-400 pointer-events-none"></div>
        <div class="absolute bottom-4 left-4 w-24 h-24 border-b-4 border-l-4 border-slate-400 pointer-events-none"></div>
        <div class="absolute bottom-4 right-4 w-24 h-24 border-b-4 border-r-4 border-slate-400 pointer-events-none"></div>

        <div class="absolute right-0 top-0 bottom-0 w-[280px] bg-slate-50 border-l border-slate-200 flex flex-col justify-between p-8 text-right">
          <div class="flex flex-col gap-1 items-end mt-6">
            <span class="text-xs uppercase tracking-widest font-bold text-slate-400">PROJECT</span>
            <span class="text-sm uppercase tracking-[0.2em] font-bold text-slate-700 border-t border-slate-200 pt-1">CERTIFICATE</span>
          </div>

          <div class="flex flex-col items-center justify-center my-auto">
            <div class="w-36 h-36 rounded-full border-2 border-dashed border-slate-400 p-1 flex items-center justify-center">
              <div class="w-full h-full rounded-full border border-slate-300 flex flex-col items-center justify-center p-4 text-center bg-white shadow-sm">
                <span class="text-[10px] tracking-widest uppercase text-slate-400 leading-none mb-1">EDUCATION FOR ALL</span>
                <span class="text-xs font-bold text-cyan-600 leading-none uppercase">coursera</span>
                <span class="text-[9px] tracking-widest uppercase text-slate-400 leading-none mt-2">PROJECT CERTIFICATE</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-end mb-6 font-mono text-[10px] text-slate-400 gap-1 leading-normal">
            <span>Verify at:</span>
            <a href="${cert.verifyUrl}" target="_blank" class="text-cyan-600 hover:underline break-all font-sans font-semibold text-right leading-tight max-w-[240px]">
              ${cert.verifyUrl}
            </a>
            <span class="text-slate-300 text-[8px] mt-2">Coursera has confirmed the identity of this individual and their participation in the project.</span>
          </div>
        </div>

        <div class="w-[660px] flex flex-col justify-between h-full pr-8 text-left">
          <div class="flex items-center gap-4">
            <div class="grid grid-cols-2 gap-1 w-10 h-10">
              <div class="bg-[#f25022] w-4.5 h-4.5"></div>
              <div class="bg-[#7fba00] w-4.5 h-4.5"></div>
              <div class="bg-[#00a4ef] w-4.5 h-4.5"></div>
              <div class="bg-[#ffb900] w-4.5 h-4.5"></div>
            </div>
            <span class="text-3xl font-bold font-sans text-slate-600 tracking-tight">Microsoft</span>
          </div>

          <div class="my-auto space-y-8">
            <div class="space-y-1">
              <span class="text-sm font-mono text-slate-400 tracking-wider block">${cert.date}</span>
              <h1 class="text-5xl font-semibold text-slate-800 tracking-tight">${cert.recipient}</h1>
              <p class="text-xs text-slate-500 italic">has successfully completed</p>
            </div>

            <div class="space-y-3">
              <h2 class="text-3xl font-bold text-slate-800 tracking-tight leading-snug">
                ${cert.title}
              </h2>
              <p class="text-sm text-slate-500 leading-relaxed max-w-[580px]">
                ${cert.details[0]}
              </p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-4 mt-6 flex items-end justify-between">
            <div>
              <p class="font-signature italic text-3xl text-slate-700 leading-none">${cert.signedBy}</p>
              <div class="w-48 h-[1px] bg-slate-300 my-2"></div>
              <p class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">${cert.signedBy}</p>
              <p class="text-xs text-slate-500">${cert.role}</p>
            </div>
            
            <div class="text-right text-xs font-mono text-slate-300">
              <span>SECURE DIGITAL RECORD</span>
            </div>
          </div>
        </div>
      `;

    case 'aws':
      return `
        <div class="absolute top-0 left-0 right-0 h-6 bg-[#ff9900]"></div>
        <div class="flex flex-col justify-between h-full p-8">
          <div class="flex justify-between items-start">
            <div class="flex flex-col items-start gap-1">
              <span class="text-4xl font-bold font-sans text-slate-800 tracking-tighter">aws</span>
              <div class="w-12 h-1.5 bg-[#ff9900] rounded-full"></div>
            </div>

            <div class="bg-[#ff9900] text-white py-6 px-8 rounded-b-xl shadow-md flex flex-col items-center">
              <span class="text-xs font-mono tracking-widest uppercase opacity-80">ISSUED BY</span>
              <span class="text-2xl font-bold tracking-tight">Forage</span>
              <span class="text-[10px] text-center max-w-[120px] mt-2 opacity-70 leading-tight">Inspiring and empowering future professionals</span>
            </div>
          </div>

          <div class="my-auto space-y-6 pt-6 text-left">
            <h1 class="text-5xl font-extrabold text-slate-900 tracking-tight">${cert.recipient}</h1>
            <div>
              <h2 class="text-3xl font-bold text-slate-800 tracking-tight">${cert.title}</h2>
              <span class="text-sm text-slate-500 font-semibold">Certificate of Completion</span>
              <span class="mx-2 text-slate-300">•</span>
              <span class="text-sm text-slate-500 font-mono">${cert.date}</span>
            </div>

            <div class="w-28 h-1 bg-slate-200 my-4"></div>

            <div class="space-y-2">
              <p class="text-sm text-slate-600">${cert.details[0]}</p>
              <p class="text-base font-semibold text-slate-700">• ${cert.details[1]}</p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-6 flex justify-between items-end">
            <div class="space-y-1 font-mono text-[10px] text-slate-400">
              <p>Enrolment Verification Code: <span class="text-slate-600 font-bold select-all">${cert.verifyCode}</span></p>
              <p>User Verification Code: <span class="text-slate-600 font-bold select-all">${cert.userVerifyCode}</span></p>
              <p class="text-[9px] mt-2">Issued by Forage. Verify authenticity online.</p>
            </div>

            <div class="text-right">
              <span class="font-signature italic text-2xl text-slate-700 leading-none block">${cert.signedBy}</span>
              <div class="w-48 h-[1px] bg-slate-300 my-2"></div>
              <p class="text-xs font-bold text-slate-700">${cert.signedBy}</p>
              <p class="text-xs text-slate-500">${cert.role}</p>
            </div>
          </div>
        </div>
      `;

    case 'geekglory':
      return `
        <div class="absolute inset-4 border border-slate-200 pointer-events-none"></div>
        <div class="flex flex-col justify-between h-full p-6 relative">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white shadow-md relative overflow-hidden">
                <span class="font-bold text-2xl">G</span>
              </div>
              <div>
                <h2 class="text-lg font-bold tracking-wider text-blue-800 uppercase leading-none">GEEKGLORY</h2>
                <span class="text-xs tracking-widest text-slate-400 uppercase font-mono">TECHNOLOGIES PVT. LTD.</span>
              </div>
            </div>

            <div class="text-right font-mono text-xs text-slate-500 leading-tight">
              <p>DATED: <strong>${cert.date}</strong></p>
              <p>CIN: GGTPL/S2/81</p>
            </div>
          </div>

          <div class="text-center my-4">
            <h1 class="text-3xl font-bold text-slate-800 tracking-wider border-b-2 border-slate-900 pb-2 inline-block uppercase">
              ${cert.title}
            </h1>
          </div>

          <div class="space-y-4 px-12 text-base text-slate-600 leading-relaxed text-justify max-w-[840px] mx-auto">
            <p>
              This is to certify that <strong class="text-slate-900 uppercase font-semibold">${cert.recipient}</strong> has completed his internship at Bharat Gaming News for the duration of <strong>3 months</strong>, starting from <strong>October 2025 to January 2026</strong>.
            </p>
            <p>
              In this period, as <strong class="text-slate-900 font-semibold">“Intern – MANAGEMENT”</strong>, he has successfully completed all the tasks assigned to him and has proven to be a valuable resource for the organization in his domain. Time and again, he displayed good determination and problem-solving qualities, coming up with innovative ways to execute his tasks.
            </p>
            <p>We wish him the best of luck for the future.</p>
          </div>

          <div class="border-t border-slate-200 pt-4 flex justify-between items-end px-6 mt-4">
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center border border-slate-200 p-2 rounded bg-slate-50">
                <span class="text-[9px] font-bold text-slate-700 leading-none">MSME</span>
                <span class="text-[7px] text-slate-400 font-mono">REGD. ENTERPRISE</span>
              </div>
              <div class="flex flex-col items-start leading-none">
                <span class="text-[8px] font-mono text-slate-400">SUPPORTED BY</span>
                <span class="text-sm font-bold text-orange-600">DPIIT</span>
                <span class="text-[10px] text-green-700 font-bold tracking-tight">#startupindia</span>
              </div>
            </div>

            <div class="text-center text-[9px] text-slate-400 font-mono max-w-[360px]">
              <p class="font-bold text-slate-500">Geekglory Technologies Private Limited</p>
              <p class="leading-tight mt-1">Regd. Office: Naihati, West Bengal 743165. Email: info@geekglorytechnologies.in</p>
            </div>

            <div class="text-right">
              <span class="font-signature italic text-2xl text-slate-800 leading-none block">${cert.signedBy}</span>
              <div class="w-36 h-[1px] bg-slate-300 my-2"></div>
              <p class="text-xs font-bold text-slate-700">${cert.signedBy}</p>
              <p class="text-xs text-slate-500">${cert.role}</p>
            </div>
          </div>
        </div>
      `;

    case 'brainware':
      return `
        <!-- Elegant Gold Borders -->
        <div class="absolute inset-2 border border-[#b6954a] pointer-events-none"></div>
        <div class="absolute inset-3 border-[2px] border-[#b6954a]/80 pointer-events-none"></div>

        <!-- Corner Ribbon Decorations -->
        <!-- Top-Left -->
        <div class="absolute top-0 left-0 w-56 h-56 pointer-events-none">
          <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0,0 L 40,0 L 0,40 Z" fill="#0c325c" />
            <line x1="44" y1="0" x2="0" y2="44" stroke="#b6954a" stroke-width="1.5" />
            <line x1="49" y1="0" x2="0" y2="49" stroke="#b6954a" stroke-width="1" />
          </svg>
        </div>

        <!-- Bottom-Right -->
        <div class="absolute bottom-0 right-0 w-56 h-56 pointer-events-none">
          <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 100,100 L 60,100 L 100,60 Z" fill="#0c325c" />
            <line x1="56" y1="100" x2="100" y2="56" stroke="#b6954a" stroke-width="1.5" />
            <line x1="51" y1="100" x2="100" y2="51" stroke="#b6954a" stroke-width="1" />
          </svg>
        </div>

        <!-- Wavy subtle background -->
        <div class="absolute inset-0 pointer-events-none opacity-40" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='80' height='12' viewBox='0 0 80 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6 Q 20 12, 40 6 T 80 6' fill='none' stroke='%23cbd5e1' stroke-width='0.5'/%3E%3C/svg%3E&quot;); background-repeat: repeat; background-size: 80px 12px;"></div>

        <div class="flex flex-col justify-between h-full p-12 text-center relative z-10">
          <!-- Top-right QR code -->
          <div class="absolute top-4 right-12">
            <div class="w-16 h-16 border border-slate-300 p-0.5 bg-white shadow-sm">
              <div class="w-full h-full bg-slate-900 flex flex-col justify-between p-1.5">
                <div class="flex justify-between w-full h-3">
                  <div class="w-3.5 h-3.5 bg-white"></div>
                  <div class="w-3.5 h-3.5 bg-white"></div>
                </div>
                <div class="flex justify-between w-full h-3">
                  <div class="w-3.5 h-3.5 bg-white"></div>
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- University Logo Header -->
          <div class="flex items-center justify-center gap-4 mt-4">
            <div class="w-16 h-16 rounded-full border border-[#0c78be] p-0.5 flex items-center justify-center bg-white shadow-sm">
              <div class="w-full h-full rounded-full border-2 border-amber-400 flex flex-col items-center justify-center relative p-1">
                <span class="text-xs font-bold text-blue-900 font-serif leading-none">BWU</span>
                <span class="text-[6px] text-amber-600 font-bold tracking-widest mt-0.5">1990</span>
              </div>
            </div>
            <div class="flex flex-col items-start leading-none text-left">
              <span class="text-3xl font-black text-[#0c78be] tracking-tight font-sans">BRAINWARE</span>
              <span class="text-2xl font-bold text-[#0c78be] tracking-[0.18em] font-sans">UNIVERSITY</span>
            </div>
          </div>

          <!-- Certificate Header -->
          <div class="flex flex-col items-center mt-4">
            <h1 class="text-5xl font-serif text-[#0c325c] font-bold tracking-widest uppercase">
              CERTIFICATE
            </h1>
            <h2 class="text-sm text-slate-500 tracking-[0.3em] font-medium uppercase mt-1">
              OF PARTICIPATION
            </h2>
            <div class="w-64 h-[1px] bg-[#b6954a]/60 mt-3"></div>
          </div>

          <!-- Body texts -->
          <div class="my-auto py-4">
            <p class="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-2">
              This is to certify that
            </p>
            
            <div class="my-6 max-w-3xl mx-auto px-8">
              <p class="text-lg md:text-xl text-slate-700 leading-relaxed font-sans">
                <strong class="text-slate-950 font-bold text-2xl">${cert.recipient}</strong> of B.Tech.(CSE)-AIML - Arti has participated in <strong class="text-slate-950 font-bold">Internal Hackathon ( SIH 2023 )</strong> held on <strong class="text-slate-950 font-bold">22nd September 2023</strong>.
              </p>
            </div>
          </div>

          <!-- Signatures -->
          <div class="flex justify-between items-end px-16 pb-4">
            <div class="text-center w-64 flex flex-col items-center">
              <div class="h-12 flex items-center justify-center relative">
                <div class="absolute -inset-x-6 h-8 bg-[#ebf3ff]/40 rounded rotate-1"></div>
                <span class="font-signature italic text-3xl text-slate-700 leading-none select-none relative z-10">Pranam Paul</span>
              </div>
              <div class="w-full h-[1px] bg-slate-300 my-1.5"></div>
              <p class="text-[10px] font-sans font-bold text-slate-700 tracking-wider">DR. PRANAM PAUL</p>
              <p class="text-[8.5px] font-sans text-slate-500">President, IIC, BWU</p>
            </div>

            <div class="text-center w-64 flex flex-col items-center">
              <div class="h-12 flex items-center justify-center relative">
                <div class="absolute -inset-x-6 h-8 bg-[#ebf3ff]/40 rounded -rotate-1"></div>
                <span class="font-signature italic text-3xl text-slate-700 leading-none select-none relative z-10">P. P. Dasgupta</span>
              </div>
              <div class="w-full h-[1px] bg-slate-300 my-1.5"></div>
              <p class="text-[10px] font-sans font-bold text-slate-700 tracking-wider">PARTHA PRATIM DASGUPTA</p>
              <p class="text-[8.5px] font-sans text-slate-500">Convener, Tech Club, BWU</p>
            </div>
          </div>

        </div>
      `;

    case 'simplilearn':
      return `
        <!-- Elegant Gray Borders -->
        <div class="absolute inset-2 border border-slate-300 pointer-events-none rounded-sm"></div>
        <div class="absolute inset-3 border border-slate-200 pointer-events-none rounded-sm"></div>

        <!-- Corner Ribbon Decorations -->
        <!-- Top-Left -->
        <div class="absolute top-0 left-0 w-28 h-28 pointer-events-none overflow-hidden">
          <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0,0 L 15,0 L 0,15 Z" fill="#4285F4" />
            <path d="M 15,0 L 25,0 L 0,25 L 0,15 Z" fill="#ff9900" />
            <path d="M 25,0 L 35,0 L 0,35 L 0,25 Z" fill="#10b981" />
            <path d="M 35,0 L 45,0 L 0,45 L 0,35 Z" fill="#ef4444" />
          </svg>
        </div>

        <!-- Bottom-Right -->
        <div class="absolute bottom-0 right-0 w-28 h-28 pointer-events-none overflow-hidden">
          <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 100,100 L 85,100 L 100,85 Z" fill="#4285F4" />
            <path d="M 85,100 L 75,100 L 100,75 L 100,85 Z" fill="#ef4444" />
            <path d="M 75,100 L 65,100 L 100,65 L 100,75 Z" fill="#10b981" />
            <path d="M 65,100 L 55,100 L 100,55 L 100,65 Z" fill="#ff9900" />
          </svg>
        </div>

        <div class="flex flex-col justify-between h-full p-8 text-center relative z-10">
          
          <!-- Logos header Row -->
          <div class="flex justify-between items-center px-2">
            <!-- Google Cloud Logo -->
            <div class="flex items-center gap-2">
              <div class="relative">
                <svg class="w-9 h-9" viewBox="0 0 100 100">
                  <path d="M50 15 L20 32.3 L20 67.7 L50 50 Z" fill="#4285F4" />
                  <path d="M50 15 L80 32.3 L80 67.7 L50 50 Z" fill="#EA4335" />
                  <path d="M20 67.7 L50 85 L80 67.7 L50 50 Z" fill="#34A853" />
                  <path d="M50 15 L35 23.6 L50 32.3 L65 23.6 Z" fill="#FBBC05" />
                </svg>
              </div>
              <div class="flex flex-col items-start leading-none">
                <span class="text-[7.5px] font-sans font-semibold text-slate-400 tracking-wider uppercase">Powered by</span>
                <span class="text-base font-bold text-slate-700 font-sans tracking-tight">
                  <span class="text-slate-800 font-bold">Google</span> <span class="text-slate-500 font-medium">Cloud</span>
                </span>
              </div>
            </div>

            <!-- Simplilearn SkillUp Logo -->
            <div class="flex items-center gap-0.5 text-right">
              <span class="text-base font-sans tracking-tight">
                <span class="text-[#a4a4a4] font-medium">simpli</span><span class="text-[#1070b0] font-bold">learn</span>
              </span>
              <span class="text-slate-300 mx-1.5 text-sm font-light">|</span>
              <span class="text-base font-sans font-extrabold tracking-tight">
                <span class="text-[#1070b0]">Skill</span><span class="text-[#ff9000]">UP</span>
              </span>
            </div>
          </div>

          <!-- Certificate Title / Recipient Center block -->
          <div class="my-auto py-2">
            <span class="text-xs font-semibold tracking-[0.15em] text-[#2a3e5c] uppercase block">DECLARATION OF</span>
            <h2 class="text-2xl font-serif font-medium tracking-[0.25em] text-[#2a3e5c] uppercase mt-0.5">COMPLETION</h2>
            
            <!-- Dotted separator line -->
            <div class="w-56 h-[1px] border-t border-dotted border-slate-300 mx-auto my-3"></div>

            <!-- Recipient Name -->
            <h1 class="text-3xl md:text-4xl font-sans font-medium text-[#1090e0] uppercase tracking-wide py-1">
              ${cert.recipient}
            </h1>

            <!-- Dotted separator line -->
            <div class="w-56 h-[1px] border-t border-dotted border-slate-300 mx-auto my-3"></div>

            <!-- Course Completed statement -->
            <p class="text-[10.5px] italic text-slate-400 font-sans mt-2">has successfully completed the online course:</p>
            
            <!-- Course Title -->
            <h3 class="text-lg md:text-xl font-extrabold tracking-wider text-slate-800 uppercase font-sans mt-1.5">
              ${cert.title}
            </h3>

            <!-- Professional Description Statement -->
            <p class="text-[10px] md:text-[11px] text-slate-400 font-sans italic max-w-lg mx-auto leading-relaxed mt-4">
              This professional has demonstrated initiative and a commitment to deepening their skills and advancing their career. Well done!
            </p>
          </div>

          <!-- Footer with Date and Signature -->
          <div class="flex justify-between items-end px-4 mt-2">
            <div class="text-left flex flex-col items-start">
              <span class="text-xs font-bold text-slate-800 font-sans tracking-tight">
                ${cert.date}
              </span>
            </div>

            <div class="text-center w-36 flex flex-col items-center">
              <span class="font-signature italic text-2xl text-slate-700 leading-none select-none">Krishna Kumar</span>
              <div class="w-full h-[1px] bg-slate-300 my-1"></div>
              <p class="text-[8.5px] font-sans font-bold text-slate-700 tracking-wider">KRISHNA KUMAR</p>
              <p class="text-[7.5px] font-sans text-slate-500">CEO, Simplilearn</p>
            </div>
          </div>

          <!-- Fine print at bottom center -->
          <p class="text-[6.5px] text-slate-400 font-sans max-w-xl mx-auto mt-4 leading-snug border-t border-slate-100 pt-1.5">
            This certification is issued solely for the purpose of acknowledging completion of Google Cloud Courses on the Simplilearn portal, and is not an official Google Cloud Certification.
          </p>

        </div>
      `;

    case 'yuva':
      return `
        <div class="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-red-600 via-[#0e7490] to-blue-600"></div>
        
        <div class="flex flex-col justify-between h-full p-8 text-center relative">
          <div class="flex justify-between items-center">
            <div class="flex flex-col items-start leading-none">
              <span class="text-xl font-black tracking-tight text-slate-800">IND/aI</span>
              <span class="text-[8px] tracking-wider font-mono text-slate-400">NATIONAL AI INITIATIVE</span>
            </div>

            <div class="flex items-center gap-2 text-right">
              <div class="leading-none flex flex-col items-end">
                <span class="text-xs font-black text-slate-800">nasscom</span>
                <span class="text-[9px] text-red-600 font-bold tracking-tight">futureskills prime</span>
              </div>
            </div>
          </div>

          <div class="flex justify-center my-2">
            <div class="w-20 h-20 rounded-full border-4 border-amber-400 p-0.5 flex items-center justify-center bg-amber-50">
              <div class="w-full h-full rounded-full border border-amber-300 flex flex-col items-center justify-center text-center p-2 bg-white leading-none">
                <span class="text-[7px] text-amber-700 font-bold uppercase tracking-widest">COURSE</span>
                <span class="text-[8px] text-amber-950 font-black uppercase leading-tight">PARTICIPATION</span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <span class="text-sm tracking-wider text-slate-400 font-semibold block">Certificate of Participation</span>
            <h1 class="text-4xl font-extrabold text-slate-950 tracking-tight">
              ${cert.recipient}
            </h1>
            <p class="text-sm text-slate-500">has completed</p>
            <h2 class="text-2xl font-black text-blue-900 tracking-wide uppercase">
              ${cert.title}
            </h2>
          </div>

          <div class="border-t border-slate-200 pt-6 flex justify-between items-end mt-6">
            <div class="text-left font-mono text-[10px] text-slate-400 leading-normal">
              <p>Date of issue: <strong>${cert.date}</strong></p>
              <p>NASSCOM FUTURES_PRIME AUDIT SECURE</p>
            </div>

            <div class="text-right">
              <span class="font-signature italic text-lg text-slate-800 leading-none block">Dr. Abhilasha Gaur</span>
              <div class="w-36 h-[1px] bg-slate-300 my-2"></div>
              <p class="text-xs font-bold text-slate-700">${cert.signedBy}</p>
              <p class="text-xs text-slate-500">${cert.role}</p>
            </div>
          </div>
        </div>
      `;

    default:
      return '';
  }
}
