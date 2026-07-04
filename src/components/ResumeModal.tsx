import { X, Printer, Download, Eye, GraduationCap, Award, Briefcase, Code, MapPin, Phone, Mail, Linkedin, Github, Globe, FileText } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    // Open a new printable window with custom Tailwind-like styling to guarantee a perfect 1-page/2-page physical print layout
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Hanif Shah - Resume</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;850&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                  }
                }
              }
            }
          </script>
          <style>
            @media print {
              body {
                background: white;
                color: black;
              }
              .no-print {
                display: none;
              }
              @page {
                size: A4;
                margin: 1.2cm 1.5cm;
              }
            }
            body {
              font-family: 'Inter', sans-serif;
            }
          </style>
        </head>
        <body class="bg-gray-50 text-gray-950 min-h-screen">
          <div class="no-print bg-slate-900 text-white p-4 sticky top-0 flex justify-between items-center z-50 shadow-md">
            <div>
              <p class="font-bold text-sm">Hanif Shah — PDF Resume Generator</p>
              <p class="text-xs text-slate-400">Select "Save as PDF" as your destination in the print dialog. Ensure "Background graphics" is checked if you want colors.</p>
            </div>
            <div class="flex gap-3">
              <button onclick="window.print()" class="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
                PRINT / SAVE AS PDF
              </button>
              <button onclick="window.close()" class="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded font-bold text-sm transition-all cursor-pointer">
                CLOSE WINDOW
              </button>
            </div>
          </div>

          <div class="max-w-[850px] mx-auto bg-white p-10 shadow-2xl border border-gray-200 my-8 print:my-0 print:shadow-none print:border-none rounded-xl print:rounded-none">
            
            <!-- Header Section -->
            <div class="border-b-2 border-slate-900 pb-6 text-center">
              <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Hanif Shah</h1>
              <p class="text-xl font-medium text-cyan-600 tracking-wide mb-4">AI-ML Intern & Software Developer</p>
              
              <div class="flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-gray-600 font-medium">
                <span class="flex items-center gap-1.5">
                  <span class="text-slate-900 font-bold">✉</span> hanifshahhanif1@gmail.com
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="text-slate-900 font-bold">☎</span> +91 9883210074
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="text-slate-900 font-bold">📍</span> West Bengal, India
                </span>
              </div>
              <div class="flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-cyan-700 font-semibold mt-2.5">
                <a href="${DEVELOPER_PROFILE.linkedin}" target="_blank" class="hover:underline flex items-center gap-1">
                  linkedin.com/in/hanif-shah-17783a255
                </a>
                <span class="text-gray-300">•</span>
                <a href="${DEVELOPER_PROFILE.github}" target="_blank" class="hover:underline flex items-center gap-1">
                  github.com/hanifshah03
                </a>
              </div>
            </div>

            <!-- Summary -->
            <div class="mt-6">
              <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">Professional Summary</h2>
              <p class="text-xs text-gray-700 leading-relaxed text-justify">
                B.Tech Computer Science and Engineering (Artificial Intelligence & Machine Learning) student with hands-on experience in Machine Learning, Deep Learning, Computer Vision, and Software Development. Proficient in Python, Java, SQL, TensorFlow, PyTorch, OpenCV, and Git. Passionate about developing AI-driven solutions and seeking an AI/ML or Software Development internship or full-time opportunity.
              </p>
            </div>

            <!-- Two Column Layout: Work/Education (Left 60%) & Skills/Misc (Right 40%) -->
            <div class="grid grid-cols-12 gap-8 mt-6">
              
              <!-- Left Column (Education, Projects, Experience) -->
              <div class="col-span-7 space-y-6">
                
                <!-- Education -->
                <div>
                  <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">Education</h2>
                  
                  <div class="space-y-4">
                    <div>
                      <div class="flex justify-between items-start">
                        <h4 class="text-xs font-bold text-slate-900">Brainware University</h4>
                        <span class="text-[10px] font-semibold text-gray-500 shrink-0">08/2022 – 07/2026</span>
                      </div>
                      <p class="text-[11px] font-medium text-cyan-700">B.Tech CSE (AI & ML) — Present Student</p>
                      <p class="text-[10px] text-gray-500 mt-0.5">West Bengal, India | Cumulative Score: 80%</p>
                    </div>

                    <div>
                      <div class="flex justify-between items-start">
                        <h4 class="text-xs font-bold text-slate-900">Jamsherpur B.N High School</h4>
                        <span class="text-[10px] font-semibold text-gray-500 shrink-0">07/2018 – 03/2020</span>
                      </div>
                      <p class="text-[11px] font-medium text-slate-700">Higher Secondary (12th) — Science Stream (WBCHSE)</p>
                      <p class="text-[10px] text-gray-500 mt-0.5">Nadia, West Bengal, India | Score: 84%</p>
                    </div>

                    <div>
                      <div class="flex justify-between items-start">
                        <h4 class="text-xs font-bold text-slate-900">Bagmara High School</h4>
                        <span class="text-[10px] font-semibold text-gray-500 shrink-0">01/2012 – 03/2018</span>
                      </div>
                      <p class="text-[11px] font-medium text-slate-700">Secondary Education (10th) — (WBBSE)</p>
                      <p class="text-[10px] text-gray-500 mt-0.5">Murshidabad, West Bengal, India | Score: 71.85%</p>
                    </div>
                  </div>
                </div>

                <!-- Projects -->
                <div>
                  <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">Key Projects</h2>
                  
                  <div class="space-y-4">
                    <div>
                      <div class="flex justify-between items-start">
                        <h4 class="text-xs font-bold text-slate-900">Virtual Mouse Using Hand Gestures</h4>
                        <span class="text-[10px] font-semibold text-gray-500 shrink-0">11/2025 – 03/2026</span>
                      </div>
                      <p class="text-[10px] font-medium text-cyan-700 mb-1">Python | OpenCV | MediaPipe</p>
                      <ul class="list-disc list-inside text-[10px] text-gray-600 space-y-0.5 pl-1 leading-normal">
                        <li>Built a computer vision-based virtual mouse for touchless cursor control.</li>
                        <li>Utilized neural hand-keypoints tracking to enable fluid cursor gestures.</li>
                        <li>Implemented gesture actions for clicking, scrolling, and dragging-and-dropping.</li>
                      </ul>
                    </div>

                    <div>
                      <div class="flex justify-between items-start">
                        <h4 class="text-xs font-bold text-slate-900">Deep Learning Image Segmentation</h4>
                        <span class="text-[10px] font-semibold text-gray-500 shrink-0">12/2025</span>
                      </div>
                      <p class="text-[10px] font-medium text-cyan-700 mb-1">Python | PyTorch | Deep Learning</p>
                      <ul class="list-disc list-inside text-[10px] text-gray-600 space-y-0.5 pl-1 leading-normal">
                        <li>Trained pixel-level image segmentation models (U-Net architectures).</li>
                        <li>Optimized custom dice coefficient losses to resolve class imbalances.</li>
                        <li>Integrated Albumentations library for robust image preprocessing.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Certificates & Internships -->
                <div>
                  <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">Certificates</h2>
                  <div class="space-y-3 text-[10px] text-gray-700 leading-normal">
                    <div>
                      <p class="font-bold text-slate-900">Management Internship Certificate — Geekglory Technologies</p>
                      <p class="text-gray-500 text-[9px] mb-0.5">Bharat Gaming News | 3-Month Tenure</p>
                      <p class="text-gray-650">Led content syndication pipelines. Earned CEO recognition for innovation, proactive problem-solving, and impactful team contributions.</p>
                    </div>
                    <div>
                      <p class="font-bold text-slate-900">Internal Hackathon Finalist (SIH 2023)</p>
                      <p class="text-gray-650">Designed and built a real-time screen translation utility for the Brainware University Smart India Hackathon preliminary round.</p>
                    </div>
                    <div>
                      <p class="font-bold text-slate-900">Build Computer Vision App with Azure</p>
                      <p class="text-gray-500 text-[9px] mb-0.5">Microsoft (Coursera) | Dec 2025</p>
                      <p class="text-gray-650">Built an intelligent computer vision application leveraging Azure Cognitive Services, Automated ML, and OCR pipelines. Credential: B3QUTH6CMWO0</p>
                    </div>
                    <div>
                      <p class="font-bold text-slate-900">AWS Solutions Architecture Job Simulation</p>
                      <p class="text-gray-500 text-[9px] mb-0.5">Forage / Amazon Web Services | Nov 2025</p>
                      <p class="text-gray-650">Designed secure, highly scalable hosting and cloud architectures tailored for Python applications. Verified Enrolment: mxhM6m8BYHugBSioY</p>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Right Column (Skills, Courses, Languages) -->
              <div class="col-span-5 space-y-6">
                
                <!-- Technical Skills -->
                <div>
                  <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">Core Skills</h2>
                  <div class="space-y-3 text-[10px]">
                    <div>
                      <p class="font-bold text-cyan-700 mb-1">AI / ML / Computer Vision</p>
                      <p class="text-gray-700 leading-relaxed">Machine Learning, Deep Learning, Artificial Intelligence, Computer Vision, Generative AI, OpenCV, PyTorch, TensorFlow, Keras, MediaPipe, NLP, Large Language Models</p>
                    </div>
                    <div>
                      <p class="font-bold text-slate-800 mb-1">Languages & Core CS</p>
                      <p class="text-gray-700 leading-relaxed">Python, Java (OOPs), C, SQL, DSA, DAA, DBMS, Operating Systems, Computer Networks</p>
                    </div>
                    <div>
                      <p class="font-bold text-slate-800 mb-1">Libraries & Frameworks</p>
                      <p class="text-gray-700 leading-relaxed">Node.js, Flutter, React, Flask, NumPy, Pandas, Scikit-learn</p>
                    </div>
                    <div>
                      <p class="font-bold text-slate-800 mb-1">Tools & Platforms</p>
                      <p class="text-gray-700 leading-relaxed">GitHub, Git, VS Code, Google Cloud, AWS, Firebase Console, Soft Computing, VLSI Design, Software Project Management</p>
                    </div>
                  </div>
                </div>

                <!-- Courses -->
                <div>
                  <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">NPTEL & Courses</h2>
                  <div class="space-y-3 text-[10px]">
                    <div>
                      <div class="flex justify-between items-start font-bold text-slate-900">
                        <span>Problem Solving in C</span>
                        <span class="text-[9px] text-gray-500 shrink-0">NPTEL SWAYAM</span>
                      </div>
                      <p class="text-gray-650">Completed comprehensive academic coursework with distinctions.</p>
                    </div>
                    <div>
                      <div class="flex justify-between items-start font-bold text-slate-900">
                        <span>Introduction to Generative AI</span>
                        <span class="text-[9px] text-gray-500 shrink-0">Simplilearn</span>
                      </div>
                      <p class="text-gray-650">Gained foundational knowledge of LLMs and generative pipelines.</p>
                    </div>
                    <div>
                      <div class="flex justify-between items-start font-bold text-slate-900">
                        <span>YUVA AI for All</span>
                        <span class="text-[9px] text-gray-500 shrink-0">NASSCOM</span>
                      </div>
                      <p class="text-gray-650">Foundational training in modern AI awareness and societal impact.</p>
                    </div>
                  </div>
                </div>

                <!-- Achievements -->
                <div>
                  <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">Achievements</h2>
                  <ul class="list-disc list-inside text-[10px] text-gray-700 space-y-1 pl-1">
                    <li>Active GitHub open-source developer</li>
                    <li>Developed multiple responsive custom web apps</li>
                    <li>Hands-on practical CV architecture expertise</li>
                  </ul>
                </div>

                <!-- Languages -->
                <div>
                  <h2 class="text-sm font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">Languages</h2>
                  <p class="text-[10px] text-gray-700 font-semibold">English, Hindi, Bengali</p>
                </div>

              </div>

            </div>

            <!-- Footer / Declaration -->
            <div class="border-t border-gray-200 mt-8 pt-4 text-[9px] text-gray-400 flex justify-between items-center">
              <p>Self-declared and verified electronically.</p>
              <p class="font-bold text-slate-700">Hanif Shah — West Bengal, India</p>
            </div>

          </div>

          <script>
            // Auto trigger print in new window after assets load
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# Hanif Shah
AI-ML Intern & Software Developer
Email: hanifshahhanif1@gmail.com | Phone: +91 9883210074
Location: West Bengal, India
LinkedIn: ${DEVELOPER_PROFILE.linkedin}
GitHub: ${DEVELOPER_PROFILE.github}

## Professional Summary
B.Tech Computer Science and Engineering (Artificial Intelligence & Machine Learning) student with hands-on experience in Machine Learning, Deep Learning, Computer Vision, and Software Development. Proficient in Python, Java, SQL, TensorFlow, PyTorch, OpenCV, and Git. Passionate about developing AI-driven solutions and seeking an AI/ML or Software Development internship or full-time opportunity.

## Education
* **Brainware University** (2022 – 2026)
  B.Tech CSE (AI & ML) — Cumulative Score: 80%
* **Jamsherpur B.N High School** (2018 – 2020)
  Higher Secondary (12th, WBCHSE) — Score: 84%
* **Bagmara High School** (2012 – 2018)
  Secondary Education (10th, WBBSE) — Score: 71.85%

## Key Projects
### 1. Virtual Mouse Using Hand Gestures (11/2025 – 03/2026)
* Tech: Python, OpenCV, MediaPipe
* Developed a computer vision system for seamless touchless mouse control using real-time hand-keypoint tracking gestures.
* Implemented gesture actions for clicking, scrolling, and dragging-and-dropping.

### 2. Deep Learning Image Segmentation (12/2025)
* Tech: Python, PyTorch, Torchvision
* Trained neural networks for pixel-level semantic image segmentation.
* Addressed class imbalances using tailored Loss optimizations.

### 3. Azure Cognitive Vision Scanner (12/2025)
* Tech: Python, Azure Cognitive Services, OCR, Automated ML
* Developed a cloud-native automated computer vision app leveraging Microsoft Azure Cognitive Services.
* Implemented OCR scanners and automated ML classifiers with over 98% accuracy.

## Core Skills
* **AI / ML & CV**: PyTorch, TensorFlow, OpenCV, MediaPipe, Deep Learning, NLP, Generative AI
* **Languages**: Python, Java (OOPs), C, SQL, DSA, DBMS
* **Tools & Platforms**: Git, GitHub, Google Cloud, AWS, Firebase Console, VS Code

## Certifications & Achievements
* Microsoft: Build Computer Vision App with Azure Cognitive Services (Credential: B3QUTH6CMWO0)
* Forage / AWS: Solutions Architecture Job Simulation (Verification: mxhM6m8BYHugBSioY)
* Geekglory Technologies Management Internship Recognition
* NPTEL SWAYAM: Problem Solving in C Coursework
* Simplilearn: Generative AI & Large Language Models
* NASSCOM: YUVA AI for All Awareness Training
* Smart India Hackathon (SIH 2023) Preliminary Round Finalist

## Languages
* English, Hindi, Bengali
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Hanif_Shah_Resume.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Hanif Shah — CV Resume Engine</h3>
              <p className="text-xs text-slate-400 font-mono">STABLE_TRANSMISSION_SECURE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 border-b border-slate-800">
          <p className="text-xs text-slate-400 font-sans max-w-md text-left">
            Review the perfectly formatted professional resume derived from Hanif Shah's credentials. Choose your preferred format below to save or compile.
          </p>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD PDF RESUME
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-display font-bold text-xs tracking-wider transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              DOWNLOAD MARKDOWN (.MD)
            </button>
          </div>
        </div>

        {/* Scaled Render Preview (Interactive Scroll Container) */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-950 flex justify-center scrollbar-thin">
          
          {/* Simulated A4 Paper */}
          <div className="w-full max-w-[800px] bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-lg border border-slate-800 flex flex-col text-left font-sans text-xs sm:text-[11px] leading-relaxed select-text selection:bg-cyan-100 selection:text-cyan-900">
            
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-5 text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{DEVELOPER_PROFILE.name}</h1>
              <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wider mt-1">{DEVELOPER_PROFILE.title}</p>
              
              <div className="flex flex-wrap justify-center gap-y-1.5 gap-x-4 text-[10px] text-slate-600 font-medium mt-3">
                <span className="flex items-center gap-1">📍 West Bengal, India</span>
                <span>•</span>
                <span className="flex items-center gap-1">✉ hanifshahhanif1@gmail.com</span>
                <span>•</span>
                <span className="flex items-center gap-1">☎ +91 9883210074</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-y-1 gap-x-4 text-[10px] text-cyan-700 font-semibold mt-2">
                <a href={DEVELOPER_PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/hanif-shah-17783a255</a>
                <span className="text-slate-300">•</span>
                <a href={DEVELOPER_PROFILE.github} target="_blank" rel="noreferrer" className="hover:underline">github.com/hanifshah03</a>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mt-5">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-[10px]">Professional Summary</h4>
              <p className="text-slate-700 leading-normal text-justify">
                B.Tech Computer Science and Engineering (Artificial Intelligence & Machine Learning) student with hands-on experience in Machine Learning, Deep Learning, Computer Vision, and Software Development. Proficient in Python, Java, SQL, TensorFlow, PyTorch, OpenCV, and Git. Passionate about developing AI-driven solutions and seeking an AI/ML or Software Development internship or full-time opportunity.
              </p>
            </div>

            {/* Main Details Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-5">
              
              {/* Left Column */}
              <div className="md:col-span-7 space-y-5">
                
                {/* Education */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-[10px]">Education</h4>
                  
                  <div className="space-y-3">
                    <div className="relative pl-3 border-l border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                        <span>Brainware University</span>
                        <span className="text-[9px] font-medium text-slate-500">2022 – 2026</span>
                      </div>
                      <p className="font-medium text-cyan-600">B.Tech CSE (AI & ML) — Cumulative 80%</p>
                    </div>

                    <div className="relative pl-3 border-l border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                        <span>Jamsherpur B.N High School</span>
                        <span className="text-[9px] font-medium text-slate-500">2018 – 2020</span>
                      </div>
                      <p className="font-medium text-slate-700">Higher Secondary (12th, WBCHSE) — Score: 84%</p>
                    </div>

                    <div className="relative pl-3 border-l border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                        <span>Bagmara High School</span>
                        <span className="text-[9px] font-medium text-slate-500">2012 – 2018</span>
                      </div>
                      <p className="font-medium text-slate-700">Secondary Education (10th, WBBSE) — Score: 71.85%</p>
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-[10px]">Key Projects</h4>
                  
                  <div className="space-y-3">
                    <div className="relative pl-3 border-l border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                        <span>Virtual Mouse Using Hand Gestures</span>
                        <span className="text-[9px] font-medium text-slate-500">11/2025 – 03/2026</span>
                      </div>
                      <p className="text-cyan-600 font-semibold mb-1">Python | OpenCV | MediaPipe</p>
                      <p className="text-slate-600 text-[10px]">Developed a computer vision system for seamless touchless mouse control using real-time hand-keypoint tracking gestures.</p>
                    </div>

                    <div className="relative pl-3 border-l border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                        <span>Deep Learning Image Segmentation</span>
                        <span className="text-[9px] font-medium text-slate-500">12/2025</span>
                      </div>
                      <p className="text-cyan-600 font-semibold mb-1">Python | PyTorch | Torchvision</p>
                      <p className="text-slate-600 text-[10px]">Trained neural networks for pixel-level semantic image segmentation. Addressed class imbalances using tailored Loss optimizations.</p>
                    </div>

                    <div className="relative pl-3 border-l border-slate-200">
                      <div className="flex justify-between font-bold text-slate-900 text-[10.5px]">
                        <span>Azure Cognitive Vision Scanner</span>
                        <span className="text-[9px] font-medium text-slate-500">12/2025</span>
                      </div>
                      <p className="text-cyan-600 font-semibold mb-1">Python | Azure Cognitive Services | OCR</p>
                      <p className="text-slate-600 text-[10px]">Built a cloud-native computer vision app leveraging Azure Cognitive Services, Automated ML, and OCR scanners.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="md:col-span-5 space-y-5">
                
                {/* Skills */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-[10px]">Core Skills</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="font-bold text-cyan-650 text-[10px]">AI / ML & CV</p>
                      <p className="text-slate-700 text-[10px]">PyTorch, TensorFlow, OpenCV, MediaPipe, Deep Learning, NLP, Generative AI</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[10px]">Languages</p>
                      <p className="text-slate-700 text-[10px]">Python, Java (OOPs), C, SQL, DSA, DBMS</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[10px]">Tools & Platforms</p>
                      <p className="text-slate-700 text-[10px]">Git, GitHub, Google Cloud, AWS, Firebase Console, VS Code</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-[10px]">Certifications</h4>
                  <div className="space-y-1.5 text-slate-700 text-[10px]">
                    <p><strong className="text-slate-900">Microsoft:</strong> Build Computer Vision App with Azure (B3QUTH6CMWO0)</p>
                    <p><strong className="text-slate-900">Forage / AWS:</strong> Solutions Architecture Job Simulation (mxhM6m8BYHugBSioY)</p>
                    <p><strong className="text-slate-900">Geekglory Technologies:</strong> Management Internship Recognition</p>
                    <p><strong className="text-slate-900">NPTEL SWAYAM:</strong> Problem Solving in C Coursework</p>
                    <p><strong className="text-slate-900">Simplilearn:</strong> Generative AI & Large Language Models</p>
                    <p><strong className="text-slate-900">NASSCOM:</strong> YUVA AI for All Awareness Training</p>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-[10px]">Achievements</h4>
                  <ul className="list-disc list-inside text-slate-700 text-[10px] space-y-0.5">
                    <li>Developed fully responsive websites</li>
                    <li>Hands-on deep learning model loops</li>
                    <li>Smart India Hackathon Finalist</li>
                  </ul>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-[10px]">Languages</h4>
                  <p className="font-semibold text-slate-800 text-[10px]">English, Hindi, Bengali</p>
                </div>

              </div>

            </div>

            {/* Declaration */}
            <div className="border-t border-slate-200 mt-6 pt-3 text-[9px] text-slate-400 text-center">
              I hereby declare that all the information provided above is true and correct.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
