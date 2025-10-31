export const toolsData = {
  qaqc: [
  {
    name: "Deviation Tracker",
    icon: "https://img.icons8.com/color/50/hospital.png",
    link: "/tools/deviation",
    unlockLessonId: "les_1_04_01",
    description: "Track and manage deviations in quality assurance processes.",
  },
  {
    name: "CAPA Manager",
    icon: "https://img.icons8.com/color/50/alert.png",
    link: "/tools/capa",
    unlockLessonId: "les_1_04_02",
    description: "Streamline Corrective and Preventive Action workflows.",
  },
  {
    name: "Document Change Request System",
    icon: "https://img.icons8.com/color/50/spy.png",
    link: "/tools/dcr",
    unlockLessonId: "les_1_05_01",
    description: "Create and track document change requests with audit trails.",
  },
  {
    name: "Training Compliance Tracker",
    icon: "https://img.icons8.com/connect-color/500/globe.png",
    link: "/tools/training",
    unlockLessonId: "les_1_05_02",
    description: "Monitor staff GMP training records and compliance status.",
  },
  {
    name: "Audit Observation Log",
    icon: "https://img.icons8.com/color/50/folder.png",
    link: "/tools/audit-log",
    unlockLessonId: "les_1_06_01",
    description: "Record, assign, and close internal and external audit findings.",
  },
  {
    name: "Batch Record Review",
    icon: "📘",
    link: "/tools/batch-review",
    unlockLessonId: "les_1_06_02",
    description: "Digitally review and approve executed batch records.",
  },
],

  pharmacovigilance: [
    {
      name: "ZANE Argus Safety",
      icon: "https://img.icons8.com/arcade/100/bookmark.png",
      link: "https://zane-argus.vercel.app/",
      unlockLessonId: "les_2_03_06",
      description: "Manage pharmacovigilance data with Argus Safety integration.",
    },
    {
      name: "ZANE ArisG",
      icon: "https://img.icons8.com/liquid-glass-color/256/form.png",
      link: "https://zane-arisg.vercel.app/",
      unlockLessonId: "les_2_03_07",
      description: "Handle adverse event reporting with ArisG compatibility.",
    },
    {
      name: "ZANE MedDRA",
      icon: "https://img.icons8.com/pulsar-gradient/420/bookmark.png",
      link: "https://zane-meddra.vercel.app/",
      unlockLessonId: "les_2_06_01",
      description: "Standardize medical terminology with MedDRA coding.",
    },
    {
      name: "ZANE VigiBase",
      icon: "https://img.icons8.com/ios-filled/500/FA5252/database.png",
      link: "https://zane-intel.vercel.app/vigibase",
      unlockLessonId: "les_2_03_01",
      description: "Access WHO's global pharmacovigilance database.",
    },
    {
      name: "ZANE FAERS",
      icon: "https://img.icons8.com/officel/480/database.png",
      link: "https://zane-intel.vercel.app/faers",
      unlockLessonId: "les_2_03_04",
      description: "Analyze FDA's adverse event reporting system data.",
    },
    {
      name: "ZANE EudraVigilance",
      icon: "https://img.icons8.com/color/100/database.png",
      link: "https://zane-intel.vercel.app/eudra",
      unlockLessonId: "les_2_03_05",
      description: "Monitor EU pharmacovigilance data efficiently.",
    },
    {
      name: "ZANE E2B-R3 Mapper",
      icon: "https://img.icons8.com/color/100/radar--v1.png",
      link: "/tools/zane-e2b-r3-mapper",
      unlockLessonId: "les_2_10_07",
      description: "Map data to E2B-R3 standards for submissions.",
    },
  ],

  clinicalresearch: [
  {
    name: "CRF Builder",
    icon: "https://img.icons8.com/color/50/question.png",
    link: "/tools/crf",
    unlockLessonId: "les_3_03_02",
    description: "Design and customize Case Report Forms for clinical trials.",
  },
  {
    name: "Protocol Comparator",
    icon: "https://img.icons8.com/color/50/artificial-intelligence.png",
    link: "/tools/protocol",
    unlockLessonId: "les_3_03_03",
    description: "Compare clinical trial protocols side by side.",
  },
  {
    name: "Informed Consent Tracker",
    icon: "https://img.icons8.com/color/50/software.png",
    link: "/tools/consent",
    unlockLessonId: "les_3_04_01",
    description: "Track participant consent forms and status updates securely.",
  },
  {
    name: "Site Monitoring Log",
    icon: "https://img.icons8.com/ios-filled/500/greek-pillar-capital.png",
    link: "/tools/monitoring",
    unlockLessonId: "les_3_05_01",
    description: "Record site visit observations and CRA follow-up actions.",
  },
  {
    name: "Adverse Event Recorder",
    icon: "https://img.icons8.com/stickers/500/best_of_both_words.png",
    link: "/tools/aerecord",
    unlockLessonId: "les_3_06_01",
    description: "Capture, categorize, and follow up on adverse events.",
  },
],

  regulatory: [
  {
    name: "eCTD Viewer",
    icon: "https://img.icons8.com/liquid-glass/384/lab-items.png",
    link: "/tools/ectd",
    unlockLessonId: "les_4_02_02",
    description: "View and navigate eCTD submissions with ease.",
  },
  {
    name: "Guideline Library",
    icon: "📚",
    link: "/tools/guidelines",
    unlockLessonId: "les_4_02_03",
    description: "Access a comprehensive library of regulatory guidelines.",
  },
  {
    name: "Dossier Builder",
    icon: "https://img.icons8.com/color/50/shield.png",
    link: "/tools/dossier",
    unlockLessonId: "les_4_03_01",
    description: "Assemble and manage regulatory dossiers across markets.",
  },
  {
    name: "Labeling Control System",
    icon: "https://img.icons8.com/color/50/error.png",
    link: "/tools/labeling",
    unlockLessonId: "les_4_04_01",
    description: "Manage product labeling, variations, and regulatory updates.",
  },
  {
    name: "Regulatory Intelligence Hub",
    icon: "https://img.icons8.com/ios-filled/500/xaml.png",
    link: "/tools/intel",
    unlockLessonId: "les_4_05_01",
    description: "Stay updated on changing regulations and global filings.",
  },
],

  medicalaffairs: [
  {
    name: "Publication Tracker",
    icon: "https://img.icons8.com/color/50/monitor.png",
    link: "/tools/publications",
    unlockLessonId: "les_5_01_02",
    description: "Track and manage medical publications effectively.",
  },
  {
    name: "Medical Query Library",
    icon: "https://img.icons8.com/color/50/question.png",
    link: "/tools/queries",
    unlockLessonId: "les_5_01_03",
    description: "Organize and retrieve medical queries quickly.",
  },
  {
    name: "KOL Relationship Manager",
    icon: "https://img.icons8.com/color/50/document.png",
    link: "/tools/kol",
    unlockLessonId: "les_5_02_01",
    description: "Maintain engagement records and insights on KOL interactions.",
  },
  {
    name: "Slide Deck Repository",
    icon: "https://img.icons8.com/color/50/check.png",
    link: "/tools/slides",
    unlockLessonId: "les_5_03_01",
    description: "Store and retrieve compliant scientific slide decks for meetings.",
  },
  {
    name: "Medical Review Log",
    icon: "https://img.icons8.com/color/50/database.png",
    link: "/tools/review-log",
    unlockLessonId: "les_5_04_01",
    description: "Document the review and approval of medical materials.",
  },
],

  cdm: [
  {
    name: "CDASH Mapper",
    icon: "https://img.icons8.com/color/50/signature.png",
    link: "/tools/cdash",
    unlockLessonId: "les_6_03_02",
    description: "Map data to CDASH standards for clinical research.",
  },
  {
    name: "ODM Converter",
    icon: "https://img.icons8.com/color/50/form.png",
    link: "/tools/odm",
    unlockLessonId: "les_6_03_03",
    description: "Convert data to ODM format for interoperability.",
  },
  {
    name: "Data Validation Suite",
    icon: "https://img.icons8.com/color/50/user.png",
    link: "/tools/validation",
    unlockLessonId: "les_6_04_01",
    description: "Run automated checks for data consistency and integrity.",
  },
  {
    name: "Edit Check Builder",
    icon: "https://img.icons8.com/color/50/building.png",
    link: "/tools/edit-check",
    unlockLessonId: "les_6_05_01",
    description: "Create and manage edit checks for CRF data entry.",
  },
  {
    name: "Database Lock Manager",
    icon: "https://img.icons8.com/pulsar-gradient/48/high-risk.png",
    link: "/tools/db-lock",
    unlockLessonId: "les_6_06_01",
    description: "Control, audit, and finalize database lock workflows.",
  },
],

  shared: [
    {
      name: "GPT",
      icon: "https://img.icons8.com/material/50/FFFFFF/chatgpt.png",
      link: "https://chat.openai.com",
      description: "Access ChatGPT for conversational AI assistance.",
    },
    {
      name: "Claude",
      icon: "https://img.icons8.com/fluency/100/claude-ai.png",
      link: "https://claude.ai",
      description: "Use Claude AI for advanced conversational tasks.",
    },
    {
      name: "Grok",
      icon: "https://img.icons8.com/ios-filled/100/EBEBEB/grok.png",
      link: "https://x.ai",
      description: "Leverage Grok for AI-powered insights and queries.",
    },
    {
      name: "Perplexity",
      icon: "https://img.icons8.com/fluency/50/perplexity-ai.png",
      link: "https://www.perplexity.ai",
      description: "Explore Perplexity AI for research and answers.",
    },
    {
      name: "Gemini",
      icon: "https://img.icons8.com/fluency/48/gemini-ai.png",
      link: "https://gemini.google.com",
      description: "Utilize Gemini AI for versatile task assistance.",
    },
    {
      name: "Notion",
      icon: "https://img.icons8.com/ios-filled/100/EBEBEB/notion.png",
      link: "https://www.notion.so",
      description: "Organize notes and projects with Notion's workspace.",
    },
    {
      name: "Gamma",
      icon: "https://img.icons8.com/clouds/100/g.png",
      link: "https://gamma.app",
      description: "Create engaging presentations with Gamma's AI tools.",
    },
  ],
};

const aiAssistants = [
  {
    name: "GPT",
    icon: "https://img.icons8.com/material/24/FFFFFF/chatgpt.png",
    link: "https://chat.openai.com",
    description: "A versatile AI for generating text, summarizing content, drafting emails, coding assistance, and creative writing."
  },
  {
    name: "Claude",
    icon: "https://img.icons8.com/fluency/48/claude-ai.png",
    link: "https://claude.ai",
    description: "AI assistant optimized for reasoning, brainstorming, document analysis, and enhancing team productivity."
  },
  {
    name: "Grok",
    icon: "https://img.icons8.com/ios-filled/50/EBEBEB/grok.png",
    link: "https://x.ai",
    description: "AI focused on understanding and automating workflows, personal productivity, and knowledge management."
  },
  {
    name: "Perplexity",
    icon: "https://img.icons8.com/fluency/48/perplexity-ai.png",
    link: "https://www.perplexity.ai",
    description: "AI search and question-answering engine for quick information retrieval and research assistance."
  },
  {
    name: "Gemini",
    icon: "https://img.icons8.com/fluency/48/gemini-ai.png",
    link: "https://www.google.com/gemini",
    description: "AI platform for creative content generation, problem-solving, brainstorming, and productivity tasks."
  },
  {
    name: "Notion",
    icon: "https://img.icons8.com/ios-filled/50/EBEBEB/notion.png",
    link: "https://www.notion.so",
    description: "AI-powered workspace for notes, project management, documentation, and team collaboration."
  },
  
];