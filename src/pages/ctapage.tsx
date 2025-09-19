import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Linkedin, Instagram, Globe, Target, BarChart, Users, FlaskConical, Trophy, BookOpen, Award } from "lucide-react";
import React from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { PrimaryButton } from "@/components/Button";
import ProgressBar from "@/components/ProgressBar";
import { fetchTasks, organizeTasks, Course, calculateProgress } from "@/lib/csv";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

function InfiniteHorizontalScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 2;
    let animationId: number;

    const scrollAnimation = () => {
      if (scrollContainer.scrollLeft >= scrollWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(scrollAnimation);
    };

    animationId = requestAnimationFrame(scrollAnimation);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex overflow-hidden w-full"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex animate-infinite-scroll whitespace-nowrap">
        {children}
        {children}
      </div>
    </div>
  );
}

function useScrollRiseAnimation(targetRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-rise-from-bottom');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [targetRef]);
}

function CTAPage() {
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation();
  const completedCourseId = location.state?.courseId;

  const heroRef = useRef<HTMLElement>(null);
  const upgradeSectionRef = useRef<HTMLElement>(null);
  const reviewRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const recommendedRef = useRef<HTMLElement>(null);

  useScrollRiseAnimation(upgradeSectionRef);
  useScrollRiseAnimation(reviewRef);
  useScrollRiseAnimation(featuresRef);
  useScrollRiseAnimation(socialRef);
  useScrollRiseAnimation(ctaRef);
  useScrollRiseAnimation(recommendedRef);

  // Scroll to Hero Section on mount or location change
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location.pathname]); // Trigger on location change

  useEffect(() => {
    setMounted(true);
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const tasks = await fetchTasks(CSV_URL);
      const organizedCourses = organizeTasks(tasks);
      
      const filteredCourses = organizedCourses.filter(course => {
        return (
          course.name &&
          course.name.trim() !== '' &&
          !course.name.toLowerCase().includes('dummy') &&
          !course.name.toLowerCase().includes('test') &&
          !course.name.toLowerCase().includes('sample') &&
          course.id &&
          course.id.trim() !== '' &&
          course.id !== completedCourseId &&
          course.chapters &&
          course.chapters.length > 0
        );
      });
      
      setCourses(filteredCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCompletedTasks = (courseId: string): string[] => {
    const completedKey = `course_${courseId}_completed_tasks`;
    const completed = sessionStorage.getItem(completedKey);
    return completed ? JSON.parse(completed) : [];
  };

  const getCourseStats = (course: Course) => {
    const allTasks = course.chapters.flatMap(chapter => chapter.lessons.flatMap(lesson => lesson.tasks));
    const completedTaskIds = getCompletedTasks(course.id);
    const progress = calculateProgress(allTasks, completedTaskIds);
    
    return {
      totalChapters: course.chapters.length,
      totalTasks: progress.totalTasks,
      completedTasks: progress.completedTasks,
      progressPercentage: progress.completionPercentage,
      totalXP: progress.totalXP,
      earnedXP: progress.earnedXP
    };
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <DotLottieReact
          src="/animations/animation.lottie"
          loop
          autoplay
          style={{ width: 400, height: 400 }}
        />
       
      </div>
    </div>
  );
}
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#1b1f28] to-[#0d1117] flex flex-col items-center px-4 sm:px-6 lg:px-8">
        
        {/* Confetti Overlay */}
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={2000}
            recycle={false}
            colors={['#3bf648ff', '#EF4444', '#6400c8ff', '#c77e00ff']}
          />
        )}

        {/* Hero Section */}
<section
  ref={heroRef}
  className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4"
>
  <h1 className="text-4xl sm:text-6xl md:text-9xl font-extrabold text-white mb-12 tracking-tight animate-rise-from-bottom">
    Congratulations!
  </h1>
  <p className="text-lg sm:text-3xl text-gray-300 mb-10 leading-relaxed animate-rise-from-bottom animate-delay-300">
    You've completed your Free Trial with{" "}
    <span className="text-blue-500 font-semibold">ΩMEGA</span>!
  </p>
  <p className="text-base sm:text-2xl text-gray-400 max-w-2xl mx-auto mt-4 animate-rise-from-bottom animate-delay-600">
    It’s time to turn your skills into a career!
  </p>

  {/* Down Arrow */}
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>
      {/* Upgrade Section */}
<motion.section
  ref={upgradeSectionRef}
  className="opacity-0 translate-y-10 w-full py-12 px-6"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div className="max-w-6xl mx-auto">
   {/* Heading */}
<motion.h2
  className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent text-center 
             animate-gradient-x"
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.4 }}
>
  Take the Next Step.
</motion.h2>
    {/* Subheading */}
    <motion.p
  className="text-lg text-center text-gray-300 max-w-2xl mx-auto mt-3"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
>
  Unlock the full experience with{" "}
  <span className="text-2xl text-red-700 font-semibold">Zane ProEd</span>’s Pro-Training Courses → Your next move to upskill, gain industry exposure, and become job-ready.
</motion.p>

    {/* Feature Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
  {[
    {
      title: "1-on-1 Mentorship",
      description: "Guidance from industry experts to fast-track your career.",
      icon: <Users className="w-8 h-8 text-purple-400 transition-colors duration-300" />,
    },
    {
      title: "Exclusive LMS Dashboard",
      description: "Track your progress, view analytics, and measure skill growth.",
      icon: <BarChart className="w-8 h-8 text-purple-400 transition-colors duration-300" />,
    },
    {
      title: "Real-World Simulations",
      description: "Experience how the job really feels-before Day 1.",
      icon: <FlaskConical className="w-8 h-8 text-purple-400 transition-colors duration-300" />,
    },
    {
      title: "Skill Challenges & Quizzes",
      description: "Practice solving real industry problems.",
      icon: <Target className="w-8 h-8 text-purple-400 transition-colors duration-300" />,
    },
    {
      title: "Certifications & Portfolio Proof",
      description: "Showcase your growth and attract recruiters.",
      icon: <Trophy className="w-8 h-8 text-purple-400 transition-colors duration-300" />,
    },
    {
      title: "6 Self-Paced Courses",
      description: "Learn at your own speed with mentorship support.",
      icon: <BookOpen className="w-8 h-8 text-purple-400 transition-colors duration-300" />,
    },
  ].map((feature, index) => (
    <motion.div
      key={index}
      className="p-6 bg-gray-800/30 border border-gray-700 rounded-2xl shadow-lg bg-opacity-50 transition-all duration-300 group hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
    >
      <div className="flex items-center gap-3 mb-3">
        {React.cloneElement(feature.icon, {
          className: feature.icon.props.className + " group-hover:text-blue-800",
        })}
        <h3 className="font-semibold text-lg text-white transition-colors duration-300 group-hover:text-blue-400">
          {feature.title}
        </h3>
      </div>
      <p className="text-gray-300 text-sm transition-colors duration-300 group-hover:text-gray-100">
        {feature.description}
      </p>
    </motion.div>
  ))}
</div>


{/* Discount & Social Proof */}
<motion.div
  className="backdrop-blur-md bg-white/10 border border-gray-400/30 rounded-xl p-8 shadow-xl mt-8"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
>
  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
    {/* Left text */}
    <div className="text-center sm:text-left">
      <h3 className="text-2xl font-semibold text-green-400">AVAIL UPTO 50% SCHOLARSHIP!!</h3>
      <p className="mt-2 text-gray-200">
        Drop a 5 star google review & get a chance to avail a scholarship of up to <span className="text-blue-400 font-bold">50% on any</span> pro training course!
      </p>
    </div>

    {/* Button with your Google Review link */}
    <a
      href="https://www.google.com/search?sca_esv=fed2f1198a559411&rlz=1C5MACD_enIN1164IN1164&sxsrf=AE3TifNMXX6HD5eZlXH_ynjNTHaVhkfZEw:1758167283249&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5QJkKLwyRzatmMuzKz9qcHJvnQ1ED2zh5Af_v6kgvLNIcHG0_5eirBWOthtY0FkHJOwegXvLezGoUJekP_77tUAac6w&q=ZANE+ProEd+Reviews&sa=X&ved=2ahUKEwi_v_7Cs-GPAxXAoGMGHbuXKccQ0bkNegQIHxAD&cshid=1758167286614497&biw=1960&bih=1108&dpr=1.5#lrd=0x2546bc9aff207035:0x8247e94bc20e966a,3,,,,"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white/90 text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300"
      aria-label="Leave a Google Review"
    >
      <img
        src="https://img.icons8.com/color/48/google-logo.png"
        alt="google-logo"
        className="w-6 h-6"
      />
      Google Review
    </a>
  </div>
</motion.div>
       </div>
     </motion.section> 
     

 {/* CTA Button */}
<motion.div
  className="text-center mt-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
>
  <a
    href="https://wa.me/message/FPKJUYH7SPHQE1"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block text-lg px-8 py-4 rounded-2xl bg-white text-black font-semibold shadow-lg 
               border border-gray-300 transition-all duration-300
               hover:bg-black hover:text-white hover:shadow-xl hover:scale-105
               focus:outline-none focus:ring-2 focus:ring-gray-400"
    aria-label="Upgrade to ProTraining"
  >
    Upgrade Now
  </a>
</motion.div>

<section
  ref={socialRef}
  className="opacity-0 translate-y-10 flex flex-col sm:flex-row gap-4 justify-center mb-16 mt-12"
>
  {[
    {
      href: "https://www.linkedin.com/company/zanelearning",
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      color: "hover:bg-blue-600",
      focusRing: "focus:ring-blue-500",
    },
    {
      href: "https://www.instagram.com/zaneproed",
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      color: "hover:bg-pink-600",
      focusRing: "focus:ring-pink-500",
    },
    {
      href: "https://zaneproed.com",
      icon: (
        <img
          src="https://static.wixstatic.com/media/6abdd9_d0e031399dad4c0caf608d0a6407ac4c~mv2.png" // <-- your hosted logo
          alt="ZANE ProEd logo"
          className="w-6 h-6"
        />
      ),
      label: "ZANE ProEd",
      color: "hover:bg-gray-700",
      focusRing: "focus:ring-gray-500",
    },
  ].map((social, index) => (
    <a
      key={index}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 ${social.color} hover:text-white transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 ${social.focusRing}`}
      aria-label={`Visit our ${social.label}`}
    >
      {social.icon}
      <span>{social.label}</span>
    </a>
  ))}
</section>

        {/* Recommended Free Trial Courses - Infinite Horizontal Scroll */}
        <section ref={recommendedRef} className="opacity-0 translate-y-10 max-w-6xl mx-auto mb-16 px-4 w-full">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center">
            Recommended Free Trial Courses
          </h2>
          {loading ? (
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-400">Loading courses...</p>
            </div>
          ) : error ? (
            <div className="text-center text-gray-400">
              <p>{error}</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No other courses available at the moment.</p>
            </div>
          ) : (
            <InfiniteHorizontalScroll>
              {courses.map((course, index) => {
                const stats = getCourseStats(course);
                return (
                  <div key={`${course.id}-${index}`} className="flex-shrink-0 w-80 mx-4">
                    <Card
                      variant="interactive"
                      className="h-full w-full"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-400">
                              {stats.earnedXP}
                            </div>
                            <div className="text-xs text-gray-400">
                              / {stats.totalXP} XP
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl text-white">
                          {course.name}
                        </CardTitle>
                        <CardDescription className="text-gray-300 break-words whitespace-normal">
  Comprehensive training program covering essential healthcare administration skills.
</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <ProgressBar
                            value={stats.progressPercentage}
                            label="Progress"
                            size="sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-1 text-gray-400">
                              <BookOpen className="w-4 h-4" />
                              <span className="text-xs">Chapters</span>
                            </div>
                            <div className="font-semibold text-white">
                              {stats.totalChapters}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-1 text-gray-400">
                              <BookOpen className="w-4 h-4" />
                              <span className="text-xs">Tasks</span>
                            </div>
                            <div className="font-semibold text-white">
                              {stats.completedTasks}/{stats.totalTasks}
                            </div>
                          </div>
                        </div>
                        <div className="pt-4">
  <a href={`/courses/${course.id}`} className="block">
    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
      {stats.completedTasks > 0 ? 'Continue Course' : 'Start Course'}
    </button>
  </a>
</div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </InfiniteHorizontalScroll>
          )}
        </section>
      </div>

      <style >{`
        @keyframes rise-from-bottom {
          0% {
            opacity: 0;
            transform: translateY(2rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-rise-from-bottom {
          animation: rise-from-bottom 0.8s ease-out forwards;
        }

        .animate-delay-300 {
          animation: rise-from-bottom 0.8s ease-out forwards;
          animation-delay: 0.3s;
        }

        .animate-delay-600 {
          animation: rise-from-bottom 0.8s ease-out forwards;
          animation-delay: 0.6s;
        }

        .animate-infinite-scroll {
          display: flex;
        }

        .animate-infinite-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </ErrorBoundary>
  );
}

export default CTAPage;