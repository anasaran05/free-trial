import { MdDone } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, Award, BarChart3, Zap, Users, Briefcase, Shield, FileText, Clock, CheckCircle, Users as UsersIcon } from 'lucide-react';
import { GlowButton } from '@/components/Button';
import CircularText from '@/components/Reactbits/CircularText';
import { ChevronDown } from "lucide-react";
import LiquidEther from '@/components/Reactbits/LiquidEther';

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
  { step: 'Skills Snapshot', desc: 'Short pre-assessment to map your starting point.' },
  { step: 'Personalized Path', desc: 'Tailored curriculum with simulations and mentor sessions.' },
  { step: 'Simulation Labs', desc: 'Progressive tasks from basic operations to complex projects.' },
  { step: 'Mentor Clinics', desc: 'Live feedback from industry pros and peer reviews.' },
  { step: 'Capstone Portfolio', desc: 'Compile 3–5 verified work samples for recruiters.' },
  { step: 'Interview Prep', desc: 'Coaching and introductions to hiring partners.' }
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
  { q: 'How long until I’m job-ready?', a: '8–16 weeks depending on your starting level. Track progress in your dashboard.' },
  { q: 'Is this an accredited degree?', a: 'No, it’s practical training with micro-credentials employers value.' },
  { q: 'Do you help with placements?', a: 'Yes, with demos, coaching, and intros for top performers.' },
  { q: 'What equipment do I need?', a: 'Laptop, internet, and readiness for timed role-play.' }
];

const Index: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
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
                Next-Gen Healthcare Workplace Simulator
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Run real workflows. Solve real problems. Build a portfolio that makes
                employers hit “hire.”
              </p>
              <button
                onClick={handleStartTraining}
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full border border-white bg-white text-black shadow-lg transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl"
              >
                Start Training
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
<section className="relative py-20 text-white">
  <div className="theme-container max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div className="space-y-6">
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-100">
        What ZANE ΩMEGA Really Is
      </h2>
      <p className="text-lg leading-relaxed text-gray-300">
        Forget boring courses — <span className="font-semibold text-white">ZANE ΩMEGA</span> is a 
        <span className="text-red-300 font-semibold"> full-on healthcare workplace simulator </span> 
        & <span className="text-red-200 font-semibold"> career launchpad</span>.
      </p>
    </div>
    <div className="space-y-6">
      <p className="text-base leading-relaxed text-gray-300">
        You’ll run <span className="font-semibold text-white">real workflows</span>, 
        solve <span className="font-semibold text-white">real problems</span>, 
        and experience the same decision-making pressure as healthcare teams do every day.
      </p>
      <p className="text-base leading-relaxed text-gray-300">
        When you finish, you’ll have a <span className="font-semibold text-white">portfolio </span> 
        that makes recruiters stop scrolling and start reaching out — because you’ve already 
        proven you can do the work.
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

      {/* Core Idea */}
      <section className="py-16 text-white bg-black">
        <div className="theme-container">
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
            The Core Idea
          </h2>
          <div className="relative max-w-3xl mx-auto p-8 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none rounded-t-2xl" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />
            <p className="text-lg text-white/80 text-center">
              Bridge the gap between college and career. Turn theory into repeatable workplace practice with realistic simulations and measurable performance tracking.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 text-white bg-black">
        <div className="theme-container">
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
            How Industry Training Works
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent hidden md:block"></div>
            <div className="space-y-12">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row md:items-start md:gap-8 group animate-fade-in"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-500 text-white font-bold text-lg md:mt-1 shadow-md">
                    {index + 1}
                  </div>
                  <div className="mt-4 md:mt-0 flex-1 relative p-6 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none rounded-t-2xl" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />
                    <h3 className="text-lg font-semibold mb-2">{item.step}</h3>
                    <p className="text-white/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 text-white bg-black">
        <div className="theme-container">
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
            Benefits for Learners & Employers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {benefits.map((group, index) => (
              <div
                key={index}
                className="relative p-8 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                <h3 className="text-2xl font-semibold mb-6 text-center">{`For ${group.for}`}</h3>
                <ul className="space-y-4">
                  {group.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-white/90 cursor-pointer transition-colors duration-300 hover:text-primary"
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Specifications & Features */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="theme-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 w-full max-w-4xl">
              {platformFeatures.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center group transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none rounded-t-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md mb-4">
                    <img
                      src={feature.iconUrl}
                      alt={feature.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-center text-white transition-colors duration-300 group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <div className="mt-4 w-full text-center">
                    <ul className="space-y-2 text-gray-300">
                      {feature.items.map((item, i) => (
                        <li key={i} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-center my-12 text-blue-700">
              Platform Specifications & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 w-full max-w-4xl">
              {platformFeatures.slice(2, 4).map((feature, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center group transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none rounded-t-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md mb-4">
                    <img
                      src={feature.iconUrl}
                      alt={feature.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-center text-white transition-colors duration-300 group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <div className="mt-4 w-full text-center">
                    <ul className="space-y-2 text-gray-300">
                      {feature.items.map((item, i) => (
                        <li key={i} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentors, Partners & Hiring Support */}
      <section className="py-16 bg-black text-white">
        <div className="theme-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-12">
            Mentors, Partners & Hiring Support
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-8">
            Gain insights from experienced healthcare professionals, including CRAs, data managers, and QA leads, while receiving dedicated hiring support through demo-sharing, employer pilot programs, and curated introductions to top opportunities.
          </p>
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
                className="relative p-6 bg-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl overflow-hidden group animate-fade-in"
              >
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none rounded-t-2xl" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />
                <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
                  {faq.q}
                </h3>
                <p className="text-white/80">{faq.a}</p>
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
    <p className="text-lg text-gray-100 max-w-3xl mx-auto mb-12">
      ZANE ΩMEGA is built for real healthcare training. Start with a trial, run a simulation, or explore capstone samples.
    </p>
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