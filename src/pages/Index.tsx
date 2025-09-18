import { MdDone } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlowButton } from '@/components/Button';
import { Play, BookOpen, Award, BarChart3, Zap, Users, Briefcase, Shield, FileText, Clock, CheckCircle, Users as UsersIcon } from 'lucide-react';
import CircularText from "/workspaces/learnflow-zenith-83/src/components/Reactbits/CircularText";
import { ChevronDown } from "lucide-react";
const features = [
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

const steps = [
  { step: 'Skills Snapshot', desc: 'Short pre-assessment to map your starting point.' },
  { step: 'Personalized Path', desc: 'Tailored curriculum with simulations and mentor sessions.' },
  { step: 'Simulation Labs', desc: 'Progressive tasks from basic operations to complex projects.' },
  { step: 'Mentor Clinics', desc: 'Live feedback from industry pros and peer reviews.' },
  { step: 'Capstone Portfolio', desc: 'Compile 3–5 verified work samples for recruiters.' },
  { step: 'Interview Prep', desc: 'Coaching and introductions to hiring partners.' }
];

const benefits = [
  { for: 'Learners', items: [
    { icon: CheckCircle, text: 'Faster job-readiness with practical task practice.' },
    { icon: CheckCircle, text: 'Lower onboarding time by mastering workflows.' },
    { icon: CheckCircle, text: 'Verifiable portfolio instead of a generic resume.' },
    { icon: CheckCircle, text: 'Real mentor connections and references.' }
  ]},
  { for: 'Employers', items: [
    { icon: CheckCircle, text: 'Safer hiring with proven task experience.' },
    { icon: CheckCircle, text: 'Reduced training costs with pre-trained candidates.' },
    { icon: CheckCircle, text: 'Scalable upskilling via standardized simulations.' }
  ]}
];

const platformFeatures = [
  {
    title: 'Learning & Content',
    items: [
      'Modular lessons with videos, micro-assignments, and checklists.',
      'Deep simulation cases modeling real healthcare operations.',
      'Resource library with forms, SOPs, and regulatory checklists.'
    ]
  },
  {
    title: 'Simulation Engine',
    items: [
      'Time-limited scenarios with branching decisions.',
      'Multi-role simulations for diverse perspectives.',
      'Replay and debrief tools with mentor annotations.'
    ]
  },
  {
    title: 'Assessment & Credentials',
    items: [
      'Skills-based checkpoints with task-level scoring.',
      'Downloadable e-portfolio with mentor notes.',
      'Micro-credentials for specific workflows.'
    ]
  },
  {
    title: 'Mentor & Industry',
    items: [
      'Live mentor clinics and recorded feedback.',
      'Employer-facing demo mode for capstone sharing.'
    ]
  }
];

const curriculum = [
  { title: 'Foundations (4 weeks)', desc: 'Admin basics, communication, data hygiene, micro-sims.' },
  { title: 'Core Role Track (8–12 weeks)', desc: 'Role-specific workflows, case libraries, mentor clinics.' },
  { title: 'Capstone (2–4 weeks)', desc: 'End-to-end project with grading and employer-ready demo.' }
];

const faqs = [
  { q: 'How long until I’m job-ready?', a: '8–16 weeks depending on your starting level. Track progress in your dashboard.' },
  { q: 'Is this an accredited degree?', a: 'No, it’s practical training with micro-credentials employers value.' },
  { q: 'Do you help with placements?', a: 'Yes, with demos, coaching, and intros for top performers.' },
  { q: 'What equipment do I need?', a: 'Laptop, internet, and readiness for timed role-play.' }
];

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartTraining = () => navigate('/course');
  const handleSignIn = () => navigate('/signin');
  const handleExploreCapstones = () => navigate('/capstones');
  const handleEmployerPilot = () => navigate('/employer-pilot');

  return (
   <div className="min-h-screen bg-background text-foreground">
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-elevated" />

    {/* Hero Content */}
    <div className="relative theme-container text-center flex-1 flex flex-col justify-center py-24 lg:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in">
          <span className="text-white">ZANE</span>{' '}
          <span className="text-primary">ΩMEGA</span>
        </h1>

        {/* Punchline */}
        <h2 className="text-3xl lg:text-4xl font-heading font-semibold mb-6 animate-fade-in">
          Next-Gen Healthcare Workplace Simulator
        </h2>

        {/* Subheading */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
          Run real workflows. Solve real problems. Build a portfolio that makes
          employers hit “hire.”
        </p>

        {/* Single CTA */}
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

    {/* Scroll Text pinned to bottom of hero */}
    <div className="absolute bottom-10 w-full flex justify-center">
      <CircularText
  text="SCROLL*DOWN*TO*EXPLORE*"
  centerContent="→"
  className="text-muted-foreground w-24 h-24"
/>
    </div>
  </section>


      {/* What ZANE ΩMEGA Is */}
<section className="py-20 bg-gradient-to-b from-background to-surface">
  <div className="theme-container max-w-5xl mx-auto text-center">
    <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
      What ZANE ΩMEGA Really Is
    </h2>
    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
      Forget boring courses — <span className="font-semibold text-foreground">ZANE ΩMEGA</span> is a full-on healthcare workplace simulator & career launchpad.
      You’ll run real workflows, solve real problems, and leave with a portfolio that makes recruiters stop scrolling.
    </p>
    
  </div>
</section>

     {/* Why Choose ZANE */}
<section className="py-16 bg-background">
  <div className="theme-container">
    <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
      Why Choose ZANE ΩMEGA?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative group rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

          {/* Content */}
          <div className="relative p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4 shadow-md">
              <feature.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>

          {/* Optional hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-xl"></div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Core Idea */}
      <section className="py-16 bg-surface">
        <div className="theme-container">
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
            The Core Idea
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">
            Bridge the gap between college and career. Turn theory into repeatable workplace practice with realistic simulations and measurable performance tracking.
          </p>
        </div>
      </section>

     {/* How It Works */}
<section className="py-16 bg-background">
  <div className="theme-container">
    <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
      How Industry Training Works
    </h2>

    <div className="relative max-w-3xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent hidden md:block"></div>

      <div className="space-y-12">
        {steps.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-start md:gap-8 relative animate-fade-in"
          >
            {/* Step number / circle */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg md:mt-1">
              {index + 1}
            </div>

            {/* Step content */}
            <div className="mt-4 md:mt-0">
              <h3 className="text-lg font-semibold">{item.step}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

     {/* Benefits */}
<section className="py-16 bg-background">
  <div className="theme-container">
    <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
      Benefits for Learners & Employers
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {benefits.map((group, index) => (
        <div
          key={index}
          className="relative p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl animate-fade-in"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-white">{`For ${group.for}`}</h3>
          
          <ul className="space-y-4">
            {group.items.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 group cursor-pointer transition-colors hover:text-primary"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white text-lg shadow-md group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-white/90">{item.text}</span>
              </li>
            ))}
          </ul>

          {/* Optional hover glow */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </div>
      ))}
    </div>
  </div>
</section>

     {/* Platform Specs - Aesthetic Floating Bubbles */}
<section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
  <div className="theme-container relative z-10">
    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-16">
      Platform Specs & Features
    </h2>

    <div className="flex flex-wrap justify-center gap-16 md:gap-24">
      {platformFeatures.map((feature, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center group animate-fade-in"
        >
          {/* Floating gradient circle */}
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-2xl transform transition-transform group-hover:scale-110">
            <MdDone className="w-10 h-10 text-white" />
          </div>

          {/* Feature title */}
          <h3 className="mt-5 text-xl font-semibold text-center">{feature.title}</h3>

          {/* Feature items in subtle floating bubble */}
          <div className="mt-3 w-60 text-center bg-white/10 backdrop-blur-md rounded-xl p-4 text-white/90 space-y-1 shadow-lg group-hover:shadow-2xl transition-shadow">
            <ul className="space-y-2">
              {feature.items.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Decorative floating blobs */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
</section>
   

      {/* Mentors & Hiring Support */}
      <section className="py-16 bg-background">
        <div className="theme-container">
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
            Mentors, Partners & Hiring Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">
            Learn from healthcare pros (CRAs, data managers, QA leads) and get hiring support through demo-sharing, employer pilots, and curated introductions.
          </p>
        </div>
      </section>

     

    {/* Pricing & Enrollment */}
<section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
  <div className="theme-container relative z-10">
    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-16">
      Pricing & Enrollment
    </h2>

    <div className="flex flex-col md:flex-row justify-center gap-12 max-w-5xl mx-auto">
      {[
        {
          title: 'Trial',
          desc: 'Access foundations, one simulation, and a group mentor clinic.',
          gradient: 'from-blue-500 via-purple-500 to-pink-500'
        },
        {
          title: 'Career Track',
          desc: 'Full path from foundations to employer demo.',
          gradient: 'from-green-400 via-teal-500 to-blue-500'
        },
        {
          title: 'Team / Employer Pilot',
          desc: 'Custom simulations and dashboards for teams.',
          gradient: 'from-yellow-400 via-orange-500 to-red-500'
        }
      ].map((plan, index) => (
        <div
          key={index}
          className={`relative p-8 rounded-3xl shadow-2xl bg-gradient-to-tr ${plan.gradient} text-white flex-1 transform transition-transform hover:scale-105 hover:shadow-3xl animate-fade-in`}
        >
          <h3 className="text-2xl font-semibold mb-4 text-center">{plan.title}</h3>
          <p className="text-center text-white/90">{plan.desc}</p>

          {/* Decorative glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr opacity-30 blur-3xl pointer-events-none animate-pulse"></div>
        </div>
      ))}
    </div>

    <p className="text-center text-white/60 mt-12">
      Pricing is customized. Book a quick chat for a transparent quote.
    </p>
  </div>

  {/* Floating decorative blobs */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-blob"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
</section>

      {/* FAQs */}
      <section className="py-16 bg-surface">
        <div className="theme-container">
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-center mb-12">
            FAQs
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-surface-elevated rounded-lg shadow-md animate-fade-in">
                <h3 className="text-lg font-semibold">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Call to Action */}
<section className="relative py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
  {/* Decorative floating blobs */}
  <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

  <div className="theme-container relative z-10 text-center">
    <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-text-gradient">
      Ready to Stop Pretending and Do the Work?
    </h2>
    <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12">
      ZANE ΩMEGA is built for real healthcare training. Start with a trial, run a simulation, or explore capstone samples.
    </p>

    {/* Glowing CTA Button */}
    <GlowButton
      size="lg"
      icon={<Play className="w-5 h-5" />}
      className="bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/40 hover:scale-105 transition-transform duration-300"
      onClick={handleStartTraining}
    >
      Start Training
    </GlowButton>
  </div>
</section>
    </div>
  );
}