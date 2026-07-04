export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  link?: string;
  github?: string;
  category: 'AI/ML' | 'Computer Vision' | 'Cloud';
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
  tags: string[];
  certificate?: {
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
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const DEVELOPER_PROFILE = {
  name: "Hanif Shah",
  title: "AI-ML Intern & Software Developer",
  email: "hanifshahhanif1@gmail.com",
  github: "https://github.com/hanifshah03",
  linkedin: "https://www.linkedin.com/in/hanif-shah-17783a255",
  kaggle: "https://www.kaggle.com/hanifshah988321",
  education: {
    degree: "B.Tech Computer Science and Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    institution: "Brainware University",
    duration: "2022 - 2026",
    score: "80%",
    goal: "Continuous improvement of software development skills to build smart, real-world utility applications."
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI / ML & Computer Vision",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "Computer Vision",
      "Generative AI",
      "OpenCV",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "MediaPipe",
      "Natural Language Processing",
      "Large Language Models"
    ]
  },
  {
    title: "Languages & Core CS",
    skills: [
      "Python",
      "Java (OOPs)",
      "C",
      "SQL",
      "DSA",
      "DAA",
      "DBMS",
      "Operating Systems",
      "Computer Networks"
    ]
  },
  {
    title: "Libraries & Frameworks",
    skills: [
      "Node.js",
      "Flutter",
      "React",
      "Flask",
      "NumPy",
      "Pandas",
      "Scikit-learn"
    ]
  },
  {
    title: "Tools, Cloud & Platforms",
    skills: [
      "GitHub",
      "Git",
      "VS Code",
      "Google Cloud",
      "AWS",
      "Firebase Console"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "virtual-mouse",
    title: "Virtual Mouse Using Hand Gestures",
    description: "A computer vision-based human-computer interaction system that enables touchless cursor control via real-time hand gesture tracking. Utilizes neural networks to recognize keypoints and map them to cursor motion and click actions.",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    features: [
      "Real-time hand keypoint estimation via MediaPipe.",
      "High-precision cursor movement mapping with smooth interpolation.",
      "Gesture recognition for single click, double click, drag-and-drop, and scrolling operations.",
      "Zero-latency processing tailored for everyday computing tasks."
    ],
    github: "https://github.com/hanifshah03",
    category: "Computer Vision"
  },
  {
    id: "dl-segmentation",
    title: "Deep Learning Image Segmentation",
    description: "An advanced pixel-level semantic image segmentation pipeline built to classify and partition complex visual scenes. Trained on standard datasets to distinguish fine structural boundaries in images.",
    technologies: ["Python", "PyTorch", "Torchvision", "NumPy", "Albumentations"],
    features: [
      "Custom U-Net and DeepLabV3+ architectural implementations.",
      "Optimized cross-entropy and Dice loss formulation for class imbalance resolution.",
      "Extensive data augmentation pipeline to maximize generalization.",
      "Robust evaluation metrics tracking mIoU (Mean Intersection over Union) and Pixel Accuracy."
    ],
    github: "https://github.com/hanifshah03",
    category: "AI/ML"
  },
  {
    id: "azure-cv-app",
    title: "Azure Cognitive Vision Scanner",
    description: "A cloud-native automated computer vision app leveraging Microsoft Azure Cognitive Services. Incorporates intelligent text scanning (OCR) and automated machine learning classification to analyze and extract structural text from images.",
    technologies: ["Python", "Azure Cognitive Services", "OCR", "Automated ML"],
    features: [
      "Built low-latency Optical Character Recognition (OCR) scanner using Azure Cognitive APIs.",
      "Implemented automated ML pipelines to categorize visual datasets accurately.",
      "Engineered clean user input pipelines with instant feedback overlays.",
      "Achieved high character recognition confidence levels exceeding 98.4%."
    ],
    github: "https://github.com/hanifshah03",
    category: "Computer Vision"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "azure-cv-app-cert",
    title: "Build a computer vision app with Azure Cognitive Services",
    organization: "Microsoft & Coursera",
    duration: "Dec 6, 2025",
    description: "Successfully built and deployed an intelligent computer vision application with Azure Cognitive Services. Guided automated ML pipelines for advanced Optical Character Recognition (OCR) text recognition. Verified at: coursera.org/verify/B3QUTH6CMWO0",
    tags: ["Azure Cognitive Services", "OCR", "Automated ML", "Microsoft Certified"],
    certificate: {
      type: "microsoft",
      title: "Build a computer vision app with Azure Cognitive Services",
      recipient: "Hanif Shah",
      date: "Dec 6, 2025",
      verifyUrl: "https://coursera.org/verify/B3QUTH6CMWO0",
      verifyCode: "B3QUTH6CMWO0",
      signedBy: "Catalin Popa",
      role: "Microsoft Azure MVP, Microsoft MCT",
      details: [
        "an online non-credit project authorized by Microsoft and offered through Coursera",
        "Coursera has confirmed the identity of this individual and their participation in the project."
      ]
    }
  },
  {
    id: "aws-simulation",
    title: "AWS Solutions Architecture Job Simulation",
    organization: "Forage / Amazon Web Services",
    duration: "November 29th, 2025",
    description: "Designed secure, highly scalable hosting and cloud architectures tailored for cloud environments. Verified tasks: Designing a simple, scalable, hosting architecture. Enrolment ID: mxhM6m8BYHugBSioY",
    tags: ["AWS Architecture", "Cloud Infrastructure", "Scalable Hosting", "Forage Certified"],
    certificate: {
      type: "aws",
      title: "Solutions Architecture Job Simulation",
      recipient: "Hanif Shah",
      date: "November 29th, 2025",
      verifyCode: "mxhM6m8BYHugBSioY",
      userVerifyCode: "69256dd739725290f43081d1",
      signedBy: "Tom Brunskill",
      role: "CEO, Co-Founder of Forage",
      details: [
        "Over the period of November 2025, Hanif Shah has completed practical tasks in:",
        "Designing a simple, scalable, hosting architecture"
      ]
    }
  },
  {
    id: "management-internship",
    title: "Management Internship",
    organization: "Geekglory Technologies Pvt. Ltd. (Bharat Gaming News)",
    duration: "Oct 2025 - Jan 2026",
    description: "Completed 3 months as 'Intern - Management' at Bharat Gaming News. Led content syndication, project tracking, and organic growth campaigns, earning praise for innovative solutions and professional problem-solving.",
    tags: ["Internship Certificate", "Bharat Gaming News", "Leadership", "Management"],
    certificate: {
      type: "geekglory",
      title: "INTERNSHIP CERTIFICATE",
      recipient: "HANIF SHAH",
      date: "15 January 2026",
      signedBy: "Deep Chatterjee",
      role: "Director & CEO",
      details: [
        "This is to certify that HANIF SHAH has completed his internship at Bharat Gaming News for the duration of 3 months, starting from October 2025 to January 2026.",
        "In this period, as \"Intern - MANAGEMENT\", he has successfully completed all the tasks assigned to him and has proven to be a valuable resource for the organization in his domain.",
        "Time and again, he displayed good determination and problem-solving qualities, coming up with innovative ways to execute his tasks."
      ]
    }
  },
  {
    id: "sih-2023",
    title: "Internal Hackathon (SIH 2023)",
    organization: "Brainware University",
    duration: "September 22nd, 2023",
    description: "Participated and excelled in the Brainware University Internal Hackathon (SIH 2023) representing B.Tech.(CSE)-AIML. Built and demonstrated a real-time screen scanner and dynamic translation overlay utility.",
    tags: ["Brainware University", "Internal Hackathon", "SIH 2023", "Participation Certificate"],
    certificate: {
      type: "brainware",
      title: "CERTIFICATE OF PARTICIPATION",
      recipient: "Hanif Shah",
      date: "22nd September 2023",
      signedBy: "DR. PRANAM PAUL & PARTHA PRATIM DASGUPTA",
      role: "President, IIC, BWU & Convener, Tech Club, BWU",
      details: [
        "This is to certify that Hanif Shah of B.Tech.(CSE)-AIML - Arti has participated in Internal Hackathon ( SIH 2023 ) held on 22nd September 2023."
      ]
    }
  },
  {
    id: "intro-to-genai",
    title: "Introduction to Generative AI",
    organization: "Simplilearn & Google Cloud",
    duration: "December 7th, 2025",
    description: "Gained foundational knowledge of Large Language Models (LLMs), prompt engineering, and generative AI pipelines. Earned declaration of completion with Simplilearn and Google Cloud SkillUp partnership.",
    tags: ["LLMs & Diffusion Matrix", "Generative AI", "Simplilearn SkillUp"],
    certificate: {
      type: "simplilearn",
      title: "DECLARATION OF COMPLETION",
      recipient: "Hanif Shah",
      date: "07 Dec 2025",
      signedBy: "Krishna Kumar",
      role: "CEO, Simplilearn",
      details: [
        "has successfully completed the online course: INTRODUCTION TO GENERATIVE AI",
        "This professional has demonstrated initiative and a commitment to deepening their skills and advancing their career. Well done!"
      ]
    }
  },
  {
    id: "yuva-ai",
    title: "Yuva AI for All",
    organization: "INDi/aI & Nasscom Futureskills Prime",
    duration: "January 12th, 2026",
    description: "Completed structured AI capability training under India's national AI e-governance programs, studying neural basics, data privacy, ethics, and future technologies. Partnered by MeitY.",
    tags: ["National AI Initiative", "AI Awareness", "Nasscom Futureskills Prime"],
    certificate: {
      type: "yuva",
      title: "Certificate of Participation",
      recipient: "HANIF SHAH",
      date: "12 Jan 2026",
      signedBy: "Dr. Abhilasha Gaur",
      role: "CEO, IT-ITeS SSC Nasscom",
      details: [
        "has completed",
        "Yuva AI for All"
      ]
    }
  },
  {
    id: "programming-in-c",
    title: "Programming in C",
    organization: "NPTEL | SWAYAM",
    duration: "2023-2024",
    description: "Completed comprehensive academic coursework in computer programming, logical problem solving, and algorithms under SWAYAM.",
    tags: ["C Programming", "Problem Solving", "SWAYAM"]
  }
];
