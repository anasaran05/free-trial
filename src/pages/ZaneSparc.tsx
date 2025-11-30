// src/pages/SparcOverview.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/sidebar';
import { X, Calendar, Users, Beaker, FileText, TrendingUp, CheckCircle2, Lock, Sprout,  Newspaper, Hammer } from 'lucide-react';

// Types
interface PremiumMember {
  id: string;
  name: string;
  division: string;
  role: string;
  avatar: string;
  string;
  achievements: string[];
}

interface ResearchEntry {
  id: string;
  title: string;
  division: string;
  thumbnail: string;
  abstract: string;
  publishedAt: string;
  mentorVerified: boolean;
  upgraded?: boolean;
}

interface OngoingProject {
  id: string;
  company: string;
  domain: string;
  regulatory: string;
  progress: number;
  description: string;
  team: string[];

}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  author: string;
  createdAt: string;
  excerpt: string;
  upgraded?: boolean;
}

export default function SparcOverview() {
  const [modalResearch, setModalResearch] = useState<ResearchEntry | null>(null);
  const [modalProject, setModalProject] = useState<OngoingProject | null>(null);
  const [modalBlog, setModalBlog] = useState<BlogPost | null>(null);

  // HERO STATS
  const heroStats = {
    Members: 2000,
    researchPublished: 42,
    ongoingProjects: 16,
    activeDomains: 7
  };

  // PREMIUM MEMBERS
  const premiumMembers: PremiumMember[] = [
    {
        id: 'p1',
        name: 'Sai Jasti',
        division: 'Clinical Analytics',
        role: 'Chief Data Officer, US Commercial Pharmaceuticals',
        avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHVnwWbMSAm7A/profile-displayphoto-shrink_200_200/B4EZZBWVqzHYAY-/0/1744853097732?e=1766016000&v=beta&t=xXYr9JXrkNMjwbu7SwNz9eG8OYiszQWmHXejTbNzkXQ',
        achievements: ['Led advanced analytics initiatives at GlaxoSmithKline delivering 10% net impact on top and bottom lines', 'Pioneered AI-driven predictive insights for therapy optimization and pharmacovigilance', 'Expert in mining electronic medical records for clinical research and risk mitigation'],
        string: undefined
    },
    {
        id: 'p2',
        name: 'Neda Cvijetic',
        division: 'QA-GMP Automation',
        role: 'Senior Vice President and Global Head of Robotics and Digital R&D, MedTech',
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQG1gDQyCsctZA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1583340234325?e=1766016000&v=beta&t=0zp6eAX1cOB326gJwVU2yCIy8UGP7N69RKZvzF-uQgk',
        achievements: ['Developed physical AI applications for optimizing surgical procedures and training at Johnson & Johnson', 'Automated compliance and risk-based monitoring in GMP environments reducing manual errors by 50%', 'Led digital transformation for 21 CFR Part 11 compliant systems in pharmaceutical manufacturing'],
        string: undefined
    },
    {
        id: 'p3',
        name: 'Regina Barzilay',
        division: 'Bioinformatics',
        role: 'Delta Electronics Professor of Computer Science, MIT CSAIL',
        avatar: 'https://media.licdn.com/dms/image/v2/C5603AQGBJY55GZeT-Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1624289220148?e=1766016000&v=beta&t=5oh5dW55uOliNaC98v3Q3PzQy4Af3bhMny1F_BfHX5o',
        achievements: ['Co-led MIT Jameel Clinic for Machine Learning in Health advancing genomics AI for oncology', 'Developed deep learning models for variant calling and biomarker discovery in clinical trials', 'Published seminal work on generative AI for protein structure prediction impacting biotech pipelines'],
        string: undefined
    },
    {
        id: 'p4',
        name: 'David Lim',
        division: 'Regulatory Sciences',
        role: 'President and Principal, Regulatory Doctor',
        avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQFFpPR4O0w6MA/profile-displayphoto-shrink_200_200/B4EZaObGIbHkAY-/0/1746146190357?e=1766016000&v=beta&t=paX4MawD1-WPYinhhwm1rvmfIMkTpZSUxQINbWRmHI4',
        achievements: ['Pioneered AI-based GMP compliance frameworks for FDA and EMA guidelines', 'Authored whitepapers on AI integration in regulatory submissions and pharmacovigilance', 'Advised over 100 pharma firms on ethical AI governance and 21 CFR Part 11 validation'],
        string: undefined
    },
    {
        id: 'p5',
        name: 'Suresh Munuswamy',
        division: 'Data Engineering',
        role: 'Technical Lead, Data Engineering',
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQGuphTC7rJlrA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722679724035?e=1766016000&v=beta&t=nwUIi-C8zt9Cu6Y7Vlp9BjLy5YDphA61-TmNzxTc7Xg',
        achievements: ['Architected centralized analytics platforms at OhioHealth integrating EHR and real-world data', 'Led cloud migrations to AWS HIPAA-compliant environments for 2B+ records', 'Optimized ETL pipelines reducing data processing time by 70% for population health analytics'],
        string: undefined
    },
    {
        id: 'p6',
        name: 'Jane Reed',
        division: 'Medical Writing AI',
        role: 'Director of Life Science, IQVIA NLP',
        avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQG6EmYlrJ1p4Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730838439870?e=1766016000&v=beta&t=m7f0HVJLbE7jblo5dBhj2AgRURcZL9uF-ETRmPNjz0o',
        achievements: ['Developed NLP solutions for regulatory affairs and safety reporting at IQVIA', 'Co-authored AI tools for automating CSR drafting and MedDRA coding with 94% F1 score', 'Trained 500+ professionals in generative AI for compliant medical documentation'],
        string: undefined
    }
];

  // RESEARCH
  const researchEntries: ResearchEntry[] = [
    {
      id: 'r1',
      title: 'Unsupervised Anomaly Detection in Deviation Logs Using Transformer-Based Autoencoders',
      division: 'QA-GMP',
      thumbnail: 'https://www.qad.com/blog/wp-content/uploads/2018/11/CEBOS_Migration_Images_Risks_of_no_QMS.png',
      abstract: 'Zero-shot deviation clustering achieving 93.4% alignment with senior QA experts across three global manufacturers. CAPA acceptance rate: 87%.',
      publishedAt: '2025-11-18',
      mentorVerified: true,
      upgraded: true
    },
    {
      id: 'r2',
      title: 'Survival Curve Extrapolation via Bayesian Hierarchical Modeling in Oncology',
      division: 'Clinical Analytics',
      thumbnail: 'https://www.drugdiscoverytrends.com/wp-content/uploads/2019/09/ddd1708_clinical_research.jpg',
      abstract: 'Mixture cure model improves long-term OS prediction by 41% vs standard methods. Validated on 12 Phase II/III datasets.',
      publishedAt: '2025-10-29',
      mentorVerified: true,
      upgraded: true
    },
    {
      id: 'r3',
      title: 'Foundation Model Fine-Tuning for MedDRA Coding at Scale',
      division: 'Medical Writing AI',
      thumbnail: 'https://engineering.fb.com/wp-content/uploads/2019/05/grid-AI.jpg',
      abstract: 'BioLinkBERT fine-tuned on 1.2M narratives → F1 0.943, reducing manual coding workload by 83%.',
      publishedAt: '2025-10-12',
      mentorVerified: true,
      upgraded: true
    },
    {
      id: 'r4',
      title: 'Digital Twin for Continuous Manufacturing Using Physics-Informed Neural Networks',
      division: 'Process Development',
      thumbnail: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
      abstract: 'Real-time CQA prediction with <1% deviation from physical sensors across tablet compression lines.',
      publishedAt: '2025-09-27',
      mentorVerified: true,
      upgraded: true
    }
  ];

  // ONGOING PROJECTS
  const ongoingProjects: OngoingProject[] = [
    {
      id: 'pr1',
      company: 'Biovex Therapeutics',
      domain: 'Automated CAPA & Deviation Management',
      regulatory: '21 CFR Part 11 • EU Annex 11 • GAMP 5',
      progress: 0.78,
      description: 'Full deployment of unsupervised deviation clustering + generative CAPA across 14 global sites.',
      team: ['Rohan Desai', 'Maya Patel', 'Alan Chen']
    },
    {
      id: 'pr2',
      company: 'Novagen Oncology',
      domain: 'Adaptive Trial Design Platform',
      regulatory: 'ICH E6(R3) • FDA Complex Innovative Designs',
      progress: 0.61,
      description: 'Live Bayesian response-adaptive randomization engine powering two Phase II basket trials.',
      team: ['Dr. Priya Malhotra', 'Yusuf Khan', 'Aisha Rahman']
    },
    {
      id: 'pr3',
      company: 'GlobalCDMO Corp',
      domain: 'Continuous Manufacturing Digital Twin',
      regulatory: 'FDA Process Validation • PAT',
      progress: 0.44,
      description: 'Physics-informed neural network twin for tablet compression line with real-time control loop.',
      team: ['Alan Chen', 'Rohan Desai']
    },
    {
      id: 'pr4',
      company: 'HealthSync AI',
      domain: 'RWE Synthetic Control Arms',
      regulatory: 'FDA RWE Program • ENCePP',
      progress: 0.53,
      description: 'Regulatory-grade synthetic controls from federated EHR + claims data. First submission Q1 2026.',
      team: ['Dr. Priya Malhotra', 'Yusuf Khan']
    }
  ];

  // BLOGS
  const blogPosts: BlogPost[] = [
    {
      id: 'b1',
      title: 'Why FDA’s New AI/ML Guidance Changes Everything in 2025',
      category: 'Regulatory',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      author: 'Aishwarya Rohan',
      createdAt: '2025-11-20',
      excerpt: 'Deep dive into FDA’s final AI/ML-based SaMD guidance — what’s enforceable and how to future-proof your submission.',
      upgraded: true
    },
    {
      id: 'b2',
      title: 'Building GMP-Compliant Data Pipelines: A Practitioner’s Guide',
      category: 'QA/GMP',
      thumbnail: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1200&q=80',
      author: 'Gayathri',
      createdAt: '2025-11-10',
      excerpt: 'From raw sensor data to validated training sets — audit-ready pipelines that pass BSI inspections.',
      upgraded: true
    },
    {
      id: 'b3',
      title: 'The Rise of Foundation Models in Drug Safety',
      category: 'Pharmacovigilance',
      thumbnail: 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41591-024-03233-x/MediaObjects/41591_2024_3233_Fig1_HTML.png',
      author: 'Hanish',
      createdAt: '2025-10-28',
      excerpt: 'How instruction-tuned LLMs reduce MedDRA coding time from days to minutes — real results from top-20 pharma.',
      upgraded: true
    },
    {
      id: 'b4',
      title: 'From Prototype to Production: Deploying Clinical AI in 2025',
      category: 'MLOps',
      thumbnail: 'https://www.biopharmaservices.com/wp-content/uploads/2024/02/The-Role-of-AI-in-Clinical-Trials-blog-image.png',
      author: 'Raashik',
      createdAt: '2025-10-15',
      excerpt: 'The unspoken challenges of taking a Jupyter notebook to a locked-down, validated GxP system.',
      upgraded: true
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white flex">
        <Sidebar />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-20">

            {/* HERO */}
            <motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="pt-12"
>
  <h1 className="text-5xl lg:text-7xl font-light tracking-tight">
    ZANE <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">SPARC</span>
  </h1>

  <p className="mt-4 text-xl text-zinc-400 max-w-2xl">
    Advancing regulatory-grade AI in life sciences through collaboration, research, and real-world impact.
  </p>

  <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { icon: Users, label: "Members", value: heroStats.Members, color: "from-blue-500 to-cyan-400" },
      { icon: Newspaper, label: "Research Published", value: heroStats.researchPublished, color: "from-purple-500 to-pink-400" },
      { icon: Hammer, label: "Ongoing Projects", value: heroStats.ongoingProjects, color: "from-emerald-500 to-teal-400" },
      { icon: Sprout, label: "Seeded Ventures", value: heroStats.activeDomains, color: "from-orange-500 to-red-400" },
    ].map((stat, i) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 + 0.4 }}
        className="group"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/80 backdrop-blur-xl border border-zinc-800 p-8 transition-all group-hover:border-zinc-600">
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
          <stat.icon className="w-10 h-10 mb-4 text-zinc-400 group-hover:scale-110 transition-transform" />
          <div className="text-4xl font-bold">
            {stat.value}+
          </div>
          <div className="text-sm text-zinc-500 mt-2">{stat.label}</div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.section>

            {/* PREMIUM MEMBERS */}
         <Section title="Premium Members" subtitle="Leaders driving innovation">
  <div className="relative">
    {/* blurred card grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-none">
      {premiumMembers.map((m, i) => (
       <Card key={m.id} delay={i * 0.1}>
  <div className="flex items-start gap-5">
    <img
      src={m.avatar}
      alt={m.name}
      className="w-20 h-20 rounded-2xl object-cover ring-2 ring-zinc-800"
      loading="lazy"
    />

    <div className="flex-1 relative">
      <div className="filter blur-sm select-none pointer-events-none">
        <h3 className="text-lg font-semibold">{m.name}</h3>
        <p className="text-sm text-zinc-400">
          {m.division} • {m.role}
        </p>
      </div>

      <div className="absolute top-0 left-0">
        <span className="text-xs font-semibold bg-amber-500/80 text-black px-2 py-0.5 rounded">
          Upgrade
        </span>
      </div>
    </div>
  </div>

  <div className="mt-4 flex flex-col gap-2">
    {m.achievements.map((a, idx) => (
      <div key={idx} className="text-xs text-zinc-400 flex items-center gap-2">
        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        {a}
      </div>
    ))}
  </div>
</Card>
      ))}
    </div>
  </div>
</Section>

            {/* RESEARCH */}
            <Section title="Recently Published Research" subtitle="Peer-validated breakthroughs">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {researchEntries.map((r, i) => (
                <motion.div
  key={r.id}
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.15 }}
  onClick={() => setModalResearch(r)}
  className="group cursor-pointer"
>
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/60 to-zinc-950/80 backdrop-blur-xl border border-zinc-800 transition-all group-hover:border-zinc-600 group-hover:scale-[1.015]">
    <div className="aspect-[6/3] overflow-hidden">
      <img
        src={r.thumbnail}
        alt={r.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

    <div className="relative p-5">
     <div className="flex items-center gap-2 mb-2">
  <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">
    {r.division}
  </span>

  {r.mentorVerified && (
    <span className="text-[10px] flex items-center gap-1 text-emerald-400">
      <CheckCircle2 className="w-3 h-3" /> Verified
    </span>
  )}

  {r.upgraded && (
    <span className="text-[10px] px-2 py-0.5 bg-blue-600/25 text-blue-300 rounded-full">
      Upgrade
    </span>
  )}
</div>

      <h3 className="text-lg font-semibold leading-snug line-clamp-1">{r.title}</h3>
      <p className="mt-2 text-zinc-400 text-sm line-clamp-2">{r.abstract}</p>
      <p className="mt-3 text-xs text-zinc-500 flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {new Date(r.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  </div>
</motion.div>
                ))}
              </div>
            </Section>

            {/* ONGOING PROJECTS */}
            <Section title="Ongoing Industry Projects" subtitle="Real-world deployment in regulated environments">
              <div className="space-y-6">
                {ongoingProjects.map((p, i) => (
                 <Card
  key={p.id}
  delay={i * 0.1}
  onClick={() => setModalProject(p)}
  className="cursor-pointer relative"
>
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

    {/* LEFT SIDE BLURRED */}
    <div className="flex-1 relative">
      <div className="filter blur-sm select-none pointer-events-none">
        <h3 className="text-2xl font-bold">{p.company}</h3>
        <p className="text-zinc-400 mt-1">{p.domain} • {p.regulatory}</p>
        <p className="mt-4 text-zinc-300">{p.description}</p>
        <p className="mt-4 text-sm text-zinc-500">
          Team: <span className="text-zinc-300">{p.team.join(' • ')}</span>
        </p>
      </div>

      <div className="absolute top-0 left-0">
        <span className="text-xs font-semibold bg-amber-500/80 text-black px-2 py-0.5 rounded">
          Upgrade
        </span>
      </div>
    </div>

    {/* RIGHT SIDE NOT BLURRED */}
    <div className="lg:w-80">
      <div className="text-right mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        {Math.round(p.progress * 100)}%
      </div>
      <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${p.progress * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
        />
      </div>
    </div>
  </div>
</Card>
                ))}
              </div>
            </Section>

            {/* BLOGS */}
            <Section title="SPARC Insights & Publications" subtitle="Knowledge from the frontier">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((b, i) => (
                  <Card key={b.id} delay={i * 0.1} onClick={() => setModalBlog(b)} className="cursor-pointer">
                    <img
                      src={b.thumbnail}
                      alt={b.title}
                      className="w-full h-48 object-cover rounded-2xl"
                      loading="lazy"
                    />
                    <div className="mt-5">
                      <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">{b.category}</span>
                      <h4 className="mt-4 text-lg font-semibold leading-tight">{b.title}</h4>
                      <p className="mt-3 text-sm text-zinc-400 line-clamp-3">{b.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                        <span>{b.author}</span>
                        <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

          </div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {modalResearch && (
          <Modal onClose={() => setModalResearch(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <img src={modalResearch.thumbnail} alt={modalResearch.title} className="w-full h-80 object-cover rounded-2xl" loading="lazy" />
              <div className="mt-8">
                <h2 className="text-3xl font-bold">{modalResearch.title}</h2>
               <div className="flex items-center gap-4 mt-3 text-zinc-400">
  <span>{modalResearch.division}</span>
  <span>•</span>
  <span>{new Date(modalResearch.publishedAt).toLocaleDateString()}</span>

  {modalResearch.mentorVerified && (
    <span className="flex items-center gap-1 text-emerald-400">
      <CheckCircle2 className="w-5 h-5" /> Mentor Verified
    </span>
  )}

  {modalResearch.upgraded && (
    <span className="text-xs px-2 py-0.5 bg-blue-600/25 text-blue-300 rounded-full">
      Upgrade
    </span>
  )}
</div>
                <p className="mt-6 text-zinc-300 leading-relaxed">{modalResearch.abstract}</p>
              </div>
            </motion.div>
          </Modal>
        )}

        {modalProject && (
          <Modal onClose={() => setModalProject(null)}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <h2 className="text-4xl font-bold">{modalProject.company}</h2>
              <p className="mt-3 text-xl text-zinc-400">{modalProject.domain}</p>
              <p className="mt-2 text-zinc-500">{modalProject.regulatory}</p>
              <p className="mt-8 text-lg leading-relaxed text-zinc-300">{modalProject.description}</p>
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">Team</p>
                <p className="text-lg font-medium text-zinc-200">{modalProject.team.join(' • ')}</p>
              </div>
            </motion.div>
          </Modal>
        )}

        {modalBlog && (
          <Modal onClose={() => setModalBlog(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <img src={modalBlog.thumbnail} alt={modalBlog.title} className="w-full h-64 object-cover rounded-2xl" loading="lazy" />
              <h2 className="mt-8 text-3xl font-bold">{modalBlog.title}</h2>
             <div className="mt-4 flex items-center gap-4 text-zinc-400">
  <span>{modalBlog.category}</span>
  <span>•</span>
  <span>{modalBlog.author}</span>
  <span>•</span>
  <span>{new Date(modalBlog.createdAt).toLocaleDateString()}</span>

  {modalBlog.upgraded && (
    <span className="text-xs px-2 py-0.5 bg-blue-600/25 text-blue-300 rounded-full">
      Upgrade
    </span>
  )}
</div>
              <p className="mt-8 text-lg leading-relaxed text-zinc-300">{modalBlog.excerpt}</p>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

// Reusable Components
function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-12">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-3 text-xl text-zinc-400">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}

function Card({ children, delay = 0, onClick, className = "" }: { children: React.ReactNode; delay?: number; onClick?: () => void; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/30 backdrop-blur-xl border border-zinc-800 p-8 transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-500/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-10 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}