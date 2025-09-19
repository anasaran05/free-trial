import { MdDone } from "react-icons/md";
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, Award, BarChart3, Zap, Users, Briefcase, Shield, FileText, Clock, CheckCircle, Users as UsersIcon } from 'lucide-react';
import { GlowButton } from '@/components/Button';
import CircularText from '@/components/Reactbits/CircularText';
import { ChevronDown } from "lucide-react";
import LiquidEther from '@/components/Reactbits/LiquidEther';
import { WordRotate } from "@/components/Reactbits/word-rotate";
import { MorphingText } from "@/components/Reactbits/morphing-text";
import { Globe } from "../components/ui/globe";
// Define types for custom components
interface GlowButtonProps {
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}

interface CircularTextProps {
  text: string;
  className?: string;
}

interface LiquidEtherProps {
  colors: string[];
  mouseForce: number;
  cursorSize: number;
  isViscous: boolean;
  viscous: number;
  iterationsViscous: number;
  iterationsPoisson: number;
  resolution: number;
  isBounce: boolean;
  autoDemo: boolean;
  autoSpeed: number;
  autoIntensity: number;
  takeoverDuration: number;
  autoResumeDelay: number;
  autoRampDuration: number;
}

// Define types for data structures
interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Step {
  step: string;
  desc: string;
}

interface BenefitItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface Benefit {
  for: string;
  items: BenefitItem[];
}

interface PlatformFeature {
  title: string;
  items: string[];
  iconUrl?: string;
}

interface FAQ {
  q: string;
  a: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Interactive Learning',
    description: 'Engage in active tasks like form completion and mock case intake to retain knowledge.'
  },
  {
    icon: Clock,
    title: 'Simulation-First',
    description: 'Timed scenarios and role-played cases mirror real healthcare workflows.'
  },
  {
    icon: Users,
    title: 'Industry Mentorship',
    description: 'Weekly clinics with experienced pros who review your work and offer career tips.'
  },
  {
    icon: Briefcase,
    title: 'Proven Progress',
    description: 'Build verifiable e-portfolios with case studies and demo reports for employers.'
  }
];

const steps: Step[] = [
  { 
    step: 'Skills Diagnostics', 
    desc: '• AI-powered pre-assessment evaluates your current knowledge, tool proficiency, and decision-making skills.\n• Generates a skills snapshot highlighting strengths, gaps, and role-aligned potential.'
  },
  { 
    step: 'Personalized Learning Path', 
    desc: '• Dynamic curriculum crafted using AI to match your learning style, pace, and career goal.\n• Integrates interactive videos, role-based simulations, tool labs, and ethical decision modules.'
  },
  { 
    step: 'AI-Driven Simulation Labs', 
    desc: '• Hands-on real-world workflows in pharma, healthcare, and engineering domains.\n• Tasks escalate from core operations to complex, multi-stakeholder projects, all monitored by AI.\n• Continuous performance tracking with instant corrective guidance ensures mastery.'
  },
  { 
    step: 'Mentor Clinics & Peer Collaboration', 
    desc: '• Live mentorship sessions with industry veterans.\n• AI highlights areas for improvement and suggests discussion points for peers.\n• Peer reviews and collaborative exercises mimic real workplace team dynamics.'
  },
  { 
    step: 'Capstone Portfolio & Verified Projects', 
    desc: '• Complete 2–3 full-scale projects per course with AI-assisted quality checks.\n• Build a verified, recruiter-ready portfolio of real-world work demonstrating expertise and impact.'
  },
  { 
    step: 'Placement-Focused Coaching', 
    desc: '• Mock interviews, resume optimization, and AI-backed role simulations for interview prep.\n• Direct introductions to hiring partners and recruiters aligned with your certified skill portfolio.'
  }
];

const benefits: Benefit[] = [
  {
    for: 'Learners',
    items: [
      { icon: CheckCircle, text: 'Faster job-readiness with practical task practice.' },
      { icon: CheckCircle, text: 'Lower onboarding time by mastering workflows.' },
      { icon: CheckCircle, text: 'Verifiable portfolio instead of a generic resume.' },
      { icon: CheckCircle, text: 'Real mentor connections and references.' }
    ]
  },
  {
    for: 'Employers',
    items: [
      { icon: CheckCircle, text: 'Safer hiring with proven task experience.' },
      { icon: CheckCircle, text: 'Reduced training costs with pre-trained candidates.' },
      { icon: CheckCircle, text: 'Scalable upskilling via standardized simulations.' }
    ]
  }
];

const platformFeatures: PlatformFeature[] = [
  {
    title: 'Learning & Content',
    items: [
      'Modular lessons with videos, micro-assignments, and checklists.',
      'Deep simulation cases modeling real healthcare operations.',
      'Resource library with forms, SOPs, and regulatory checklists.'
    ],
    iconUrl: "https://img.icons8.com/ios/50/storytelling.png"
  },
  {
    title: 'Simulation Engine',
    items: [
      'Time-limited scenarios with branching decisions.',
      'Multi-role simulations for diverse perspectives.',
      'Replay and debrief tools with mentor annotations.'
    ],
    iconUrl: "https://img.icons8.com/ios/50/jet-engine.png"
  },
  {
    title: 'Assessment & Credentials',
    items: [
      'Skills-based checkpoints with task-level scoring.',
      'Downloadable e-portfolio with mentor notes.',
      'Micro-credentials for specific workflows.'
    ],
    iconUrl: "https://img.icons8.com/ios/50/google-sheets.png"
  },
  {
    title: 'Mentor & Industry',
    items: [
      'Live mentor clinics and recorded feedback.',
      'Employer-facing demo mode for capstone sharing.'
    ],
    iconUrl: "https://img.icons8.com/ios/50/personal-trainer.png"
  }
];

const faqs: FAQ[] = [
  { q: 'Why should I choose ZANE OMEGA over other training platforms?', a: 'ZANE OMEGA TRANSFORMS YOU INTO A TOP PROFESSIONAL with advanced AI simulations and expert mentorship, surpassing all competitors in preparing you for the real world.' },
  { q: 'How will ZANE OMEGA help me learn practical skills as a fresher?', a: 'Through PRACTICAL, HANDS-ON TRAINING with industry tools, AI-enhanced learning materials, and tailored feedback, ZANE OMEGA builds your skills quickly, setting you apart from the start.' },
  { q: 'What if I don’t know where to begin my career?', a: 'ZANE OMEGA’s NEXT-GENERATION ZANE NEFXFLOW CAREER MAPPING guides you to the perfect course, offering clear role-based training and mentor support to confidently chart your path, avoiding confusion unlike other options.' },
  { q: 'Is ZANE OMEGA worth the investment for a beginner?', a: 'ZANE ΩMEGA by ZANE ProEd delivers unmatched value — every penny counts Try our free trial and see why we outshine every competitor in both effectiveness and career advancement. All you need is a laptop, an internet connection, and the readiness to crush timed role-plays.' }
];

const Index: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollRef.current;
    if (!section || !scroller) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop >= scroller.scrollHeight - scroller.clientHeight;

      if (delta > 0 && !atBottom) {
        e.preventDefault();
        scroller.scrollTop += delta;
      } else if (delta < 0 && !atTop) {
        e.preventDefault();
        scroller.scrollTop += delta;
      }
      // else let it propagate to page scroll
    };

    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleStartTraining = () => navigate('/courses');
  const handleSignIn = () => navigate('/signin');
  const handleExploreCapstones = () => navigate('/capstones');
  const handleEmployerPilot = () => navigate('/employer-pilot');

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* LiquidEther Background Wrapper */}
      <div className="relative">
        {/* LiquidEther Background */}
        <div className="absolute inset-0 z-0">
         <LiquidEther
            colors={['#4C0027', '#7B0323', '#BF0A30']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.25}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        {/* Fade Overlay starting halfway through the "Why Choose ZANE ΩMEGA?" section */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black z-5 pointer-events-none" />

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
          <div className="relative z-10 theme-container flex flex-col justify-center flex-grow py-24 lg:py-32">
            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-7xl font-heading font-bold mb-6">
                <span className="text-white">ZANE</span>{' '}
                <span className="text-primary">ΩMEGA</span>
              </h1>
              <h2 className="text-3xl lg:text-4xl font-heading font-semibold mb-6">
                World’s 1st and most advanced AI-powered learning platform.
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Blends real industry workflows, tools & mentorship all in one place.
              </p>
              <button
                onClick={handleStartTraining}
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full border border-white bg-white text-black shadow-lg transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl"
              >
                Get started, for free
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
          <div className="relative z-2 flex justify-center pb-2">
            <div className="relative w-24 h-24">
              <CircularText
                text="SCROLL*DOWN*"
                className="w-24 h-24 animate-spin-slow text-white"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </section>
{/* What ZANE ΩMEGA Really Is */}
<section className="relative py-40 text-white">
  <div className="theme-container max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Left Column */}
    <div className="space-y-6">
      <h2 className="text-5xl font-extrabold tracking-tight text-gray-100">
        What ZANE ΩMEGA Really Is ?
      </h2>
      <p className="text-2xl leading-relaxed text-gray-300">
        Forget boring courses — <span className="font-semibold text-white">ZANE <span className="font-bold text-red-600">ΩMEGA</span></span> is the 
        <span className="text-2xl text-gray-600 font-bold"> world’s first and most advanced AI-powered learning platform </span> 
         <span className="text-gray-400 font-semibold"> that seamlessly blends real industry workflows, tools, and mentorship all in one place</span>.
      </p>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      <p className="text-2xl leading-relaxed text-gray-600">
        <span className="font-bold text-red-600">ΩMEGA</span> brings real industry exposure to the palm of your hand, giving you <span className="font-semibold text-white">real-time workplace experience.</span> Every task, decision, and simulation is designed to make you <span className="font-semibold text-white">job-ready.</span>
      </p>
      <p className="text-lg leading-relaxed text-gray-200">
        Learn by doing, not just by watching, and step confidently into your <span className="font-semibold text-white">future career</span>.
      </p>
    </div>

  </div>
</section>

        {/* Why Choose ZANE ΩMEGA? */}
        <section className="relative py-16 text-white">
          <div className="theme-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-12">
              Why <span className="font-bold text-primary">ΩMEGA?</span> 
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group rounded-2xl bg-transparent backdrop-blur-xl shadow-lg border border-white/20 
                             transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent opacity-70 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  <div className="relative p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#7B0323] to-[#BF0A30] rounded-full mb-4 shadow-md">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-gray-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

 {/* How It Works - Static Left / Scrollable Right */}
<section ref={sectionRef} className="relative py-24 bg-black text-white">
  <div className="theme-container grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Left Column (static on scroll) */}
    <div className="flex flex-col justify-center sticky top-24 self-start">
      <h2 className="text-3xl lg:text-5xl font-heading font-semibold leading-tight flex flex-col">
        <span>How</span>
        <div className="min-h-[3rem] lg:min-h-[4rem] flex items-center">
          <WordRotate
            words={["Industry Training", "ZANE ΩMEGA"]}
            className="text-3xl lg:text-5xl font-bold"
            getClassName={(word) =>
              word.includes("ZANE") ? "text-primary" : "text-blue-500"
            }
          />
        </div>
        <span>Works</span>
      </h2>

      <p className="mt-4 text-white/70 text-lg">
        Follow a step-by-step AI-powered learning journey that takes you from skill
        diagnostics to job placement — all in one seamless flow.
      </p>
    </div>

    {/* Right Column (scrolls) */}
    <div className="space-y-12">
      {steps.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col group animate-fade-in"
        >
          <div className="relative p-6 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent opacity-40 rounded-t-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent rounded-b-2xl pointer-events-none" />

            <h3 className="text-lg font-semibold mb-4 transition-colors duration-300 group-hover:text-primary">
              {item.step}
            </h3>

            <ul className="list-disc list-inside space-y-2 text-white/80">
              {item.desc.split("\n").map((line, i) => (
                <li key={i}>{line.replace(/^•\s*/, "")}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
    {/* Benefits Section - Centered Content but Left-Aligned List */}
<section className="relative py-20 bg-black text-white">
  <div className="theme-container">
    <h2 className="text-3xl lg:text-5xl font-heading font-bold text-center mb-16">
      Benefits for Learners & Employers
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {benefits.map((group, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-center items-center p-10 min-h-[350px] bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-2xl shadow-xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] group overflow-hidden"
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

          {/* Centered Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm">
            <h3 className="text-4xl font-semibold mb-6">{`For ${group.for}`}</h3>

            {/* Bullet List - Left Aligned */}
            <ul className="space-y-4 text-left w-full">
              {group.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-white/90 hover:text-gray-200 transition-colors duration-300"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/80 shadow-sm"></span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    {/* Platform Specifications & Features - Hover Effect */}
<section className="relative py-24 bg-black text-white">
  <div className="theme-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    
    {/* Left Section - Feature Cards */}
    <div className="space-y-6 order-2 lg:order-1">
      {platformFeatures.map((feature, index) => (
        <div
          key={index}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all transform hover:-translate-y-2 hover:shadow-2xl group"
        >
          <h3 className="text-2xl font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-blue-600">
            {feature.title}
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {feature.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Right Section - Headline & Description (Vertically Centered) */}
<div className="flex flex-col justify-center space-y-6 text-center lg:text-left order-1 lg:order-2">
  <h2 className="text-4xl lg:text-5xl font-heading font-bold text-blue-500">
    <MorphingText texts={["Specifications", "Features"]} />
  </h2>
</div>
  </div>
</section>

     

      {/* FAQs */}
<section className="py-16 text-white bg-black">
  <div className="theme-container">
    <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
      FAQs
    </h2>
    <div className="space-y-6 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="relative p-6 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl overflow-hidden group"
        >
          {/* Top and bottom gradients */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none rounded-t-2xl" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />

          {/* Question */}
          <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
            {faq.q}
          </h3>

          {/* Answer - smooth slide down */}
          <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-96 group-hover:opacity-100">
            <p className="text-white/80 mt-2">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

     {/* Call to Action */}
<section className="relative py-28 text-white bg-black overflow-hidden">
  {/* Decorative floating blobs */}
  <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl animate-blob"></div>
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

  <div className="theme-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
      Ready to <span className="text-primary">Stop Pretending</span> and Do the Work?
    </h2>
    
{/* Start Training Button */}
<div className="text-center mt-8">
  <button
    onClick={handleStartTraining}
    className="bg-white text-black px-12 py-5 rounded-full font-semibold shadow-lg transition-colors duration-300 hover:bg-black hover:text-white"
  >
    Start Training
  </button>
</div>
    
  </div>
</section>
    </div>
  );
};

export default Index;