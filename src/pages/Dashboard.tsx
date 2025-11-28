'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joyride from 'react-joyride';
import { useOnboarding } from '@/onboarding/useOnboarding';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import {
  Flame, Trophy, Calendar, Zap, Target, CheckCircle2, Lock, ChevronRight, Clock, BookOpen, Award, Newspaper
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Sidebar from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import { fetchTasks, organizeTasks, Course } from '@/lib/csv';

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

interface DashboardCourse extends Course {
  isLocked: boolean;
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<DashboardCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvedCourses, setApprovedCourses] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState("Loading…");
const [showLoader, setShowLoader] = useState(true);
  // Dynamic Stats
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [globalRank, setGlobalRank] = useState(0);
  const [activeCoursesCount, setActiveCoursesCount] = useState(0);

  const email = localStorage.getItem("omega_email")?.trim() || null;
  const { run, steps, handleFinish } = useOnboarding("dashboard", email);

  // Calendar
  const [currentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Realistic To-Do List
 const todos = [
  { task: "Review AE case narrative for oncology trial", time: "10:00 AM", done: false },
  { task: "Reconcile EDC queries for Phase II dataset", time: "03:00 PM", done: false },
  { task: "Update MedDRA coding for new submissions", time: null, done: true },
  { task: "Attend live session: Regulatory dossier writing", time: "06:30 PM", done: false },
  { task: "Prepare Investigator site follow-up notes", time: null, done: false },
];

  // Mock Recent Activities
  const recentActivities = [
  {
    icon: Newspaper,
    text: "Analyzed 12 adverse event cases from Phase III diabetes trial",
    time: "3 hours ago",
    color: "text-red-600"
  },
  {
    icon: Award,
    text: "Earned badge: “Safety Reviewer Level 1”",
    time: "8 hours ago",
    color: "text-green-600"
  },
  {
    icon: CheckCircle2,
    text: "Closed 17 EDC data queries in cardiovascular study",
    time: "Yesterday",
    color: "text-blue-600"
  },
  {
    icon: Clock,
    text: "Joined session: “Regulatory Labeling & Submission Pathways”",
    time: "2 days ago",
    color: "text-orange-600"
  },
];

  // Fetch user + stats
  useEffect(() => {
    const fetchUserAndStats = async () => {
      if (!email) return;

      const { data: userData } = await supabase
        .from("form_users")
        .select("name, approved_courses")
        .eq("email", email)
        .single();

      if (userData) {
        setDisplayName(userData.name?.trim() || "Student");
        setApprovedCourses((userData.approved_courses as string[]) ?? []);
      }
    };

    fetchUserAndStats();
  }, [email]);


  // REPLACE the entire useEffect that fetches from "form_users" with this:
useEffect(() => {
  const fetchUserName = async () => {
    if (!email) {
      setDisplayName("Student");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Profile fetch error:', error);
      }

      if (data?.full_name?.trim()) {
        setDisplayName(data.full_name.trim());
      } else {
        // Fallback to email prefix
        const namePart = email.split('@')[0];
        setDisplayName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
      }
    } catch (err) {
      console.error('Failed to load name:', err);
      const namePart = email.split('@')[0];
      setDisplayName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
    }
  };

  fetchUserName();
}, [email]);


  // Load courses + calculate real stats
  useEffect(() => {
    const loadAndCalculate = async () => {
      try {
        const tasks = await fetchTasks(CSV_URL);
        const organized = organizeTasks(tasks);
        const validCourses = organized.filter(c =>
          c.id && c.name && c.slug && !c.name.match(/dummy|test|sample/i)
        );

        const withLockStatus = validCourses.map(c => ({
          ...c,
          isLocked: !approvedCourses.includes(c.id),
        }));

        setCourses(withLockStatus.sort((a, b) => Number(a.isLocked) - Number(b.isLocked)));

        // === REAL STATS CALCULATION ===
        let xp = 0;
        let completedTasks = 0;
        let active = 0;

        withLockStatus.forEach(course => {
          if (course.isLocked) return;

          const stored = sessionStorage.getItem(`course_${course.slug || course.id}_completed_tasks`);
          const completed = stored ? JSON.parse(stored) : [];

          completedTasks += completed.length;
          xp += completed.length * 50;

          const totalTasks = course.chapters
            .flatMap(ch => ch.lessons)
            .flatMap(l => l.tasks).length;

          if (completed.length > 0 && completed.length < totalTasks) active++;
          if (completed.length === totalTasks) active++;
        });

        setTotalXP(xp);
        setActiveCoursesCount(active);
        setStreak(Math.min(28, Math.floor(xp / 300)));
        const rankEstimate = Math.max(0, Math.floor(0 - (xp / 200)));
        setGlobalRank(rankEstimate);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (approvedCourses.length > 0 || email === null) {
      loadAndCalculate();
    }
  }, [approvedCourses, email]);

  const getCompletedTasks = (slug: string) => {
    const stored = sessionStorage.getItem(`course_${slug}_completed_tasks`);
    return stored ? JSON.parse(stored) : [];
  };

  const getCourseProgress = (course: Course) => {
    const all = course.chapters.flatMap(ch => ch.lessons).flatMap(l => l.tasks).map(t => t.id);
    const done = getCompletedTasks(course.slug || course.id);
    const completed = all.filter(id => done.includes(id)).length;
    return all.length > 0 ? Math.round((completed / all.length) * 100) : 0;
  };

useEffect(() => {
  if (!loading) {
    const timer = setTimeout(() => setShowLoader(false), 300);
    return () => clearTimeout(timer);
  }
}, [loading]);

if (showLoader) {
  return (
    <div className={`fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center">
        <DotLottieReact
          src="/animations/animation.lottie"
          loop
          autoplay
          className="w-64 h-64 mx-auto max-w-full"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))' }}
        />
        <p className="mt-8 text-2xl font-medium text-foreground animate-pulse">
          Loading your dashboard...
        </p>
        <p className="mt-2 text-lg text-muted-foreground">
          Hang tight, {displayName.split(" ")[0] || "Student"}!
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      {run && steps.length > 0 && (
        <Joyride run={run} steps={steps} continuous showSkipButton callback={handleFinish} />
      )}

      <div className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
  Welcome back, {displayName.split(" ")[0]}! 👋🏻
</h1>
            <p className="text-muted-foreground mt-2">Keep pushing — you're doing great!</p>
          </div>
          
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Left: Main Content (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Compact Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-background text-white border-2">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-200 text-xs">Total XP</p>
                      <p className="text-2xl font-bold">{totalXP.toLocaleString()}</p>
                    </div>
                    <Zap className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

             <Card className="bg-background text-white border-2">
  <CardContent className="p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-orange-200 text-xs">Streak</p>
        <p className="text-2xl font-bold">{streak}</p>
      </div>
      <Flame className="h-7 w-7 opacity-80" />
    </div>
  </CardContent>
</Card>

              <Card className="bg-background text-white border-2">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-200 text-xs">Global Rank</p>
                      <p className="text-2xl font-bold">#{globalRank}</p>
                    </div>
                    <Trophy className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background text-white border-2">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-xs">Active Courses</p>
                      <p className="text-2xl font-bold">{activeCoursesCount}</p>
                    </div>
                    <Target className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            

         {/* Continue Learning – with red diagonal category ribbon in top-left */}
<div>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold">Continue Learning</h2>
    <Button variant="ghost" onClick={() => navigate('/courses')}>
      View All <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
    {courses.slice(0, 4).map((course) => {
      const progress = getCourseProgress(course);
      const isLocked = course.isLocked;
      const quizScore = isLocked ? 0 : progress > 0 ? Math.min(100, progress + Math.floor(Math.random() * 18)) : 0;

      const getStatusStyle = () => {
        if (isLocked)       return { text: "Locked",     bg: "bg-surface-elevated", border: "border-border",       textColor: "text-muted-foreground", fill: "bg-muted" };
        if (progress === 100) return { text: "Completed",  bg: "bg-success/20",       border: "border-success/50",   textColor: "text-success-foreground", fill: "bg-success" };
        if (progress > 0)   return { text: "In Progress", bg: "bg-primary/10",       border: "border-primary/50",   textColor: "text-primary",            fill: "bg-primary" };
        return               { text: "Not Started", bg: "bg-primary",  border: "border-destructive/50", textColor: "text-white",       fill: "bg-destructive" };
      };

      const status = getStatusStyle();

      return (
      <Card
  key={course.id}
  className={`relative overflow-hidden rounded-2xl transition-all duration-500
    ${isLocked 
      ? 'bg-surface-elevated/80 border border-border opacity-60 grayscale' 
      : 'bg-card border border-border/50 shadow-xl hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 cursor-pointer'
    }
  `}
  onClick={() => !isLocked && navigate(`/courses/${course.slug}`)}
>
  {/* Subtle glow */}
  {!isLocked && (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-700" />
  )}

  {/* CATEGORY BADGE – Top Right */}
  {course.category && (
    <div className="absolute top-3 right-3 z-30 pointer-events-none select-none">
      <div className="bg-primary text-white text-[6px] font-bold px-3 py-0.5 rounded-full shadow-md border border-white/40">
        {course.category.trim().toUpperCase()}
      </div>
    </div>
  )}

  {/* LOCK ICON – Centered when course is locked */}
  {isLocked && (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50">
        <Lock className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )}

  <CardContent className="p-6 space-y-5 relative z-10">
    {/* Removed pt-10 since lock is now centered and doesn't need top padding */}
    <h3 className={`text-xl font-bold line-clamp-2 pr-8 leading-tight
      ${isLocked ? 'text-muted-foreground' : 'text-green-600'}
    `}>
      {course.name}
    </h3>

    {/* Progress */}
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className={`font-medium ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
          {progress}%
        </span>
      </div>
      <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-out ${
            isLocked ? 'bg-muted' : progress === 0 ? 'bg-destructive/30' : 'bg-primary/40'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>

    {/* Status Pill */}
    <div className={`relative h-11 rounded-full overflow-hidden ${status.bg} ${status.border}`}>
      <div
        className={`absolute inset-0 ${status.fill} transition-all duration-1000 ease-out`}
        style={{ width: `${isLocked ? 100 : quizScore}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${status.textColor} drop-shadow-lg`}>
          {status.text}
        </span>
      </div>
    </div>
  </CardContent>
</Card>
      );
    })}
  </div>
</div>
           {/* Recent Activity */}
<Card className="relative bg-card/30 backdrop-blur-md">
  <CardHeader>
    <CardTitle className="text-xl">Recent Activity</CardTitle>
  </CardHeader>

  {/* Blur + lock on content only */}
  <div className="relative">
    <CardContent className="space-y-4 opacity-30 pointer-events-none select-none">
      {recentActivities.map((activity, i) => {
        const Icon = activity.icon;
        return (
          <div key={i} className="flex items-start gap-4">
            <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        );
      })}
    </CardContent>

    {/* Lock overlay */}
    <div className="absolute inset-0 flex items-center justify-center bg-background/40 rounded-lg z-10">
      <Lock className="h-7 w-7 text-muted-foreground" />
    </div>
  </div>
</Card>
          </div>

          {/* Right Sidebar: Calendar + Tasks */}
          <div className="space-y-6">
            {/* Mini Calendar */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {format(currentMonth, 'MMMM yyyy')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                    <div key={d} className="font-medium text-muted-foreground py-2">{d}</div>
                  ))}
                  {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {monthDays.map(day => (
                    <div
                      key={day.toString()}
                      className={`py-2 text-sm rounded-lg transition-colors ${
                        isToday(day)
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {format(day, 'd')}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todos.map((todo, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Checkbox checked={todo.done} disabled />
                    <div className="flex-1">
                      <p className={`text-sm ${todo.done ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                        {todo.task}
                      </p>
                      {todo.time && <p className="text-xs text-muted-foreground">{todo.time}</p>}
                    </div>
                    {todo.done && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}