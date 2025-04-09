
export interface Assessment {
  id: string;
  name: string;
  url: string;
  remoteTestingSupport: boolean;
  adaptiveSupport: boolean;
  duration: number | string; // in minutes or string for "N/A"
  testType: string;
  skillCategories: string[];
  description: string;
  targetRoles: string[];
}

// Mock data based on SHL's catalog
export const assessments: Assessment[] = [
  {
    id: "1",
    name: "SHL Verify - Java",
    url: "https://www.shl.com/solutions/products/verify/verify-coding/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 40,
    testType: "Technical Skills",
    skillCategories: ["Java", "Programming", "Development"],
    description: "Assess Java programming skills through practical coding challenges and technical problem solving.",
    targetRoles: ["Java Developer", "Backend Developer", "Software Engineer"]
  },
  {
    id: "2",
    name: "SHL Verify - Python",
    url: "https://www.shl.com/solutions/products/verify/verify-coding/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 40,
    testType: "Technical Skills",
    skillCategories: ["Python", "Programming", "Development", "Data Science"],
    description: "Evaluate Python coding expertise with hands-on programming challenges focused on data manipulation and algorithms.",
    targetRoles: ["Python Developer", "Data Scientist", "Backend Developer"]
  },
  {
    id: "3",
    name: "SHL Verify - JavaScript",
    url: "https://www.shl.com/solutions/products/verify/verify-coding/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 40,
    testType: "Technical Skills",
    skillCategories: ["JavaScript", "Web Development", "Frontend"],
    description: "Test JavaScript proficiency through interactive coding challenges focusing on web development concepts.",
    targetRoles: ["Frontend Developer", "Full Stack Developer", "Web Developer"]
  },
  {
    id: "4",
    name: "SHL Verify - SQL",
    url: "https://www.shl.com/solutions/products/verify/verify-coding/",
    remoteTestingSupport: true,
    adaptiveSupport: false,
    duration: 35,
    testType: "Technical Skills",
    skillCategories: ["SQL", "Database", "Data Analysis"],
    description: "Evaluate SQL query writing and database management skills through practical database challenges.",
    targetRoles: ["Database Developer", "Data Analyst", "Backend Developer"]
  },
  {
    id: "5",
    name: "SHL General Ability - Inductive Reasoning",
    url: "https://www.shl.com/solutions/products/general-ability/inductive-reasoning/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 25,
    testType: "Cognitive",
    skillCategories: ["Problem Solving", "Pattern Recognition", "Logical Thinking"],
    description: "Measures the ability to draw inferences and understand the relationships between various concepts independent of language or numerical reasoning.",
    targetRoles: ["Analyst", "Manager", "Professional"]
  },
  {
    id: "6",
    name: "SHL General Ability - Deductive Reasoning",
    url: "https://www.shl.com/solutions/products/general-ability/deductive-reasoning/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 25,
    testType: "Cognitive",
    skillCategories: ["Logical Reasoning", "Decision Making", "Critical Thinking"],
    description: "Assesses the ability to draw logical conclusions based on provided information, measuring critical thinking and decision-making abilities.",
    targetRoles: ["Analyst", "Manager", "Professional"]
  },
  {
    id: "7",
    name: "SHL Personality Assessment (OPQ)",
    url: "https://www.shl.com/solutions/products/personality/occupational-personality-questionnaire/",
    remoteTestingSupport: true,
    adaptiveSupport: false,
    duration: 35,
    testType: "Personality",
    skillCategories: ["Behavioral Traits", "Work Style", "Team Fit"],
    description: "Provides insights into behavioral preferences and style at work, helping predict performance and team fit.",
    targetRoles: ["All Positions", "Management", "Team-based roles"]
  },
  {
    id: "8",
    name: "SHL Verify - Full Stack Development",
    url: "https://www.shl.com/solutions/products/verify/verify-coding/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 60,
    testType: "Technical Skills",
    skillCategories: ["JavaScript", "HTML/CSS", "Backend", "Frontend", "Web Development"],
    description: "Comprehensive assessment of full-stack development skills including frontend, backend, and integration capabilities.",
    targetRoles: ["Full Stack Developer", "Web Developer", "Software Engineer"]
  },
  {
    id: "9",
    name: "SHL Situational Judgement Test",
    url: "https://www.shl.com/solutions/products/personality/situational-judgement/",
    remoteTestingSupport: true,
    adaptiveSupport: false,
    duration: 30,
    testType: "Behavioral",
    skillCategories: ["Decision Making", "Problem Solving", "Team Collaboration"],
    description: "Evaluates judgment and decision-making in workplace scenarios, providing insight into how candidates handle real-world situations.",
    targetRoles: ["Customer Service", "Management", "Team Leaders"]
  },
  {
    id: "10",
    name: "SHL Numerical Reasoning",
    url: "https://www.shl.com/solutions/products/general-ability/numerical-reasoning/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 25,
    testType: "Cognitive",
    skillCategories: ["Numerical Analysis", "Data Interpretation", "Mathematical Reasoning"],
    description: "Measures the ability to analyze and interpret numerical data and make logical conclusions.",
    targetRoles: ["Analyst", "Financial Roles", "Data-driven positions"]
  },
  {
    id: "11",
    name: "SHL Verbal Reasoning",
    url: "https://www.shl.com/solutions/products/general-ability/verbal-reasoning/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 25,
    testType: "Cognitive",
    skillCategories: ["Comprehension", "Critical Thinking", "Language Skills"],
    description: "Assesses the ability to understand and evaluate written information to draw accurate conclusions.",
    targetRoles: ["Communication Roles", "Management", "Administrative Positions"]
  },
  {
    id: "12",
    name: "SHL Development Center",
    url: "https://www.shl.com/solutions/products/development-center/",
    remoteTestingSupport: true,
    adaptiveSupport: false,
    duration: 120,
    testType: "Comprehensive",
    skillCategories: ["Leadership", "Strategic Thinking", "Interpersonal Skills"],
    description: "Holistic assessment combining multiple exercises to evaluate leadership potential and development needs.",
    targetRoles: ["Leadership", "Management", "High-potential employees"]
  },
  {
    id: "13",
    name: "SHL Coding Challenge - Multi-language",
    url: "https://www.shl.com/solutions/products/verify/verify-coding/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 60,
    testType: "Technical Skills",
    skillCategories: ["Multiple Programming Languages", "Algorithm Design", "Software Development"],
    description: "Flexible coding assessment that allows candidates to solve problems in their preferred programming language (Python, Java, JavaScript, etc.).",
    targetRoles: ["Software Developer", "Programmer", "Engineering Roles"]
  },
  {
    id: "14",
    name: "SHL Short-form Cognitive Ability",
    url: "https://www.shl.com/solutions/products/general-ability/cognitive-ability/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 15,
    testType: "Cognitive",
    skillCategories: ["Problem Solving", "Critical Thinking", "Learning Ability"],
    description: "Quick assessment of general cognitive abilities suited for initial screening of candidates.",
    targetRoles: ["Entry-level positions", "Graduate recruitment", "High-volume hiring"]
  },
  {
    id: "15",
    name: "SHL Technical Aptitude",
    url: "https://www.shl.com/solutions/products/aptitude/technical/",
    remoteTestingSupport: true,
    adaptiveSupport: false,
    duration: 40,
    testType: "Technical Skills",
    skillCategories: ["Mechanical Reasoning", "Spatial Awareness", "Technical Understanding"],
    description: "Evaluates aptitude for technical roles through specialized problem-solving scenarios.",
    targetRoles: ["Engineering Roles", "Technical Specialists", "Manufacturing Positions"]
  },
  {
    id: "16",
    name: "SHL Remote Work Readiness",
    url: "https://www.shl.com/solutions/products/personality/remote-work-readiness/",
    remoteTestingSupport: true,
    adaptiveSupport: false,
    duration: 30,
    testType: "Behavioral",
    skillCategories: ["Self-management", "Remote Communication", "Digital Collaboration"],
    description: "Assesses a candidate's suitability and preparedness for effective remote work environments.",
    targetRoles: ["Remote Positions", "Work-from-home Roles", "Distributed Teams"]
  },
  {
    id: "17",
    name: "SHL Digital Skills Assessment",
    url: "https://www.shl.com/solutions/products/verify/digital-skills/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 30,
    testType: "Technical Skills",
    skillCategories: ["Digital Literacy", "Software Proficiency", "Technical Aptitude"],
    description: "Evaluates proficiency with common software applications and digital tools required in modern workplaces.",
    targetRoles: ["Administrative Positions", "Office Roles", "Technical Support"]
  },
  {
    id: "18",
    name: "SHL Coding Challenge - Data Science",
    url: "https://www.shl.com/solutions/products/verify/verify-coding/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 45,
    testType: "Technical Skills",
    skillCategories: ["Data Analysis", "Machine Learning", "Python", "Statistical Modeling"],
    description: "Specialized assessment for data science skills including data manipulation, analysis, and model development.",
    targetRoles: ["Data Scientist", "Data Analyst", "Machine Learning Engineer"]
  },
  {
    id: "19",
    name: "SHL Business Collaboration Assessment",
    url: "https://www.shl.com/solutions/products/personality/workplace-collaboration/",
    remoteTestingSupport: true,
    adaptiveSupport: false,
    duration: 35,
    testType: "Behavioral",
    skillCategories: ["Teamwork", "Communication", "Interpersonal Skills"],
    description: "Measures ability to collaborate effectively in business settings and cross-functional teams.",
    targetRoles: ["Team Members", "Collaborative Roles", "Business Analysts"]
  },
  {
    id: "20",
    name: "SHL Combined Technical Package",
    url: "https://www.shl.com/solutions/products/verify/verify-suite/",
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: 60,
    testType: "Technical Skills",
    skillCategories: ["Multiple Technical Skills", "Programming", "Problem Solving"],
    description: "Comprehensive technical assessment combining multiple programming languages and problem-solving challenges in a single package.",
    targetRoles: ["Software Engineers", "Technical Positions", "IT Professionals"]
  }
];
