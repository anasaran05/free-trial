'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joyride from 'react-joyride';
import { useOnboarding } from '@/onboarding/useOnboarding';
import { 
  Home, BookOpen, Trophy, Award, Activity, Settings, 
  Zap, CheckCircle, TrendingUp, ChevronRight 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, AreaChart, Area 
} from 'recharts';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const email = localStorage.getItem("omega_email")?.trim() || null;
  const { run, steps, handleFinish } = useOnboarding("dashboard", email);
  const [approvedCourses, setApprovedCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchApproved = async () => {
      const { data, error } = await supabase
        .from("form_users")
        .select("approved_courses")
        .eq("email", email)
        .single();

      if (error) return;
      if (Array.isArray(data?.approved_courses)) {
        setApprovedCourses(data.approved_courses as string[]);
      }
    };

    fetchApproved();
  }, [email]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const tasks = await fetchTasks(CSV_URL);
        const organized = organizeTasks(tasks);

        const validCourses = organized.filter(c =>
          c.id &&
          c.name &&
          c.slug &&
          c.chapters?.length > 0 &&
          !c.name.toLowerCase().includes('dummy') &&
          !c.name.toLowerCase().includes('test') &&
          !c.name.toLowerCase().includes('sample')
        );

        const withFlag = validCourses.map(c => ({
          ...c,
          isLocked: !approvedCourses.includes(c.id),
        }));

        setCourses(
          withFlag.sort((a, b) => Number(a.isLocked) - Number(b.isLocked))
        );
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [approvedCourses]);

  const getCompletedTasks = (courseSlug: string): string[] => {
    const key = `course_${courseSlug}_completed_tasks`;
    const stored = sessionStorage.getItem(key);
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const getCourseStats = (course: Course) => {
    const allTaskIds = course.chapters
      .flatMap(ch => ch.lessons)
      .flatMap(l => l.tasks)
      .map(t => t.id);

    const completedTaskIds = getCompletedTasks(course.slug || course.id);
    const completedCount = allTaskIds.filter(id => completedTaskIds.includes(id)).length;

    const totalXP = course.chapters
      .flatMap(ch => ch.lessons)
      .flatMap(l => l.tasks)
      .reduce((sum, t) => sum + (t.xp || 0), 0);

    const earnedXP = course.chapters
      .flatMap(ch => ch.lessons)
      .flatMap(l => l.tasks)
      .filter(t => completedTaskIds.includes(t.id))
      .reduce((sum, t) => sum + (t.xp || 0), 0);

    const progressPercentage = allTaskIds.length > 0
      ? Math.round((completedCount / allTaskIds.length) * 100)
      : 0;

    return {
      title: course.name,
      progress: progressPercentage,
      lessons: `${completedCount}/${allTaskIds.length} Tasks`,
      xp: earnedXP,
      totalXP,
      color: progressPercentage >= 90 ? 'bg-green-500' :
             progressPercentage >= 60 ? 'bg-blue-500' :
             progressPercentage >= 30 ? 'bg-amber-500' : 'bg-purple-500'
    };
  };

  const pieData = [
    { name: 'Analytics', value: 35, color: '#8b5cf6' },
    { name: 'AI Skills', value: 28, color: '#3b82f6' },
    { name: 'Simulations', value: 22, color: '#10b981' },
    { name: 'Decision Rooms', value: 15, color: '#f59e0b' },
  ];

  const weeklyData = [
    { day: 'Mon', activity: 68 },
    { day: 'Tue', activity: 92 },
    { day: 'Wed', activity: 45 },
    { day: 'Thu', activity: 88 },
    { day: 'Fri', activity: 105 },
    { day: 'Sat', activity: 72 },
    { day: 'Sun', activity: 60 },
  ];

  const momentumData = [
    { day: 1, momentum: 20 },
    { day: 2, momentum: 35 },
    { day: 3, momentum: 30 },
    { day: 4, momentum: 65 },
    { day: 5, momentum: 80 },
    { day: 6, momentum: 95 },
    { day: 7, momentum: 88 },
  ];

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Trophy, label: 'Learning Path', pro: true },
    { icon: Award, label: 'Achievements', pro: true },
    { icon: Activity, label: 'Activity Log', pro: true },
    { icon: Settings, label: 'Settings', pro: true },
  ];

  const handleNavClick = (item: any) => {
    if (item.path && !item.pro) {
      navigate(item.path);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto"></div>
          <p className="mt-6 text-xl text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {run && steps.length > 0 && (
        <Joyride
          run={run}
          steps={steps}
          continuous
          showSkipButton
          scrollToFirstStep
          spotlightClicks
          disableScrolling={false}
          callback={handleFinish}
          styles={{
            options: { zIndex: 10000 },
            overlay: { backgroundColor: "rgba(0,0,0,0.6)" },
            tooltip: {
              backgroundColor: "#121212",
              borderRadius: "12px",
              color: "#f2f2f2",
              padding: "18px 20px",
              border: "1px solid rgba(255,255,255,0.08)"
            },
            buttonNext: { background: "#2563eb", borderRadius: "8px" },
          }}
          locale={{ back: 'Back', close: 'Close', last: 'Finish', next: 'Next', skip: 'Skip Tour' }}
        />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden md:flex fixed left-0 top-16 z-40 h-[calc(100vh-64px)] bg-background/95 backdrop-blur border-r border-border transition-all duration-300`} data-tour="sidebar">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-end px-4 py-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-accent">
              {sidebarOpen ? '<' : '>'}
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-3 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  disabled={item.pro}
                  className={`flex items-center w-full rounded-md py-3 px-3 text-sm font-medium transition-all ${
                    item.pro ? 'text-muted-foreground cursor-not-allowed' :
                    item.active ? 'bg-accent text-accent-foreground' :
                    'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${sidebarOpen ? '' : 'mx-auto'}`} />
                  <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
                  {item.pro && <span className={`ml-auto mr-1 text-red-700 text-xs font-bold ${sidebarOpen ? 'block' : 'hidden'}`}>PRO</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} flex-1 transition-all duration-300`}>
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur" data-tour="dashboard-header">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-semibold">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">Your learning analytics and performance insights</p>
            </div>
            <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
          </div>
        </header>

        <main className="p-6 lg:p-12">
          {/* KPI Strip - FIXED SYNTAX ERROR HERE */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-tour="kpi-cards">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total XP Earned</p>
                    <p className="text-4xl font-bold">
                      {courses.reduce((sum, c) => sum + getCourseStats(c).xp, 0).toLocaleString()}
                    </p>
                  </div>
                  <Zap className="h-10 w-10 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Courses in Progress</p>
                    <p className="text-4xl font-bold">
                      {courses.filter(c => getCourseStats(c).progress > 0 && getCourseStats(c).progress < 100).length}
                    </p>
                  </div>
                  <BookOpen className="h-10 w-10 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    <p className="text-4xl font-bold">
                      {courses.reduce((sum, c) => sum + parseInt(getCourseStats(c).lessons.split('/')[0] || '0'), 0)}
                    </p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Completion</p>
                    <p className="text-4xl font-bold">
                      {courses.length > 0 
                        ? Math.round(courses.reduce((sum, c) => sum + getCourseStats(c).progress, 0) / courses.length)
                        : 0}%
                    </p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-amber-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="mb-12 grid gap-6 lg:grid-cols-3">
            <Card data-tour="xp-pie-chart">
              <CardHeader>
                <CardTitle className="text-lg">XP Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card data-tour="weekly-activity">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fill: '#888' }} />
                    <YAxis tick={{ fill: '#888' }} />
                    <Bar dataKey="activity" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card data-tour="learning-momentum">
              <CardHeader>
                <CardTitle className="text-lg">Learning Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={momentumData}>
                    <defs>
                      <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fill: '#888' }} />
                    <YAxis tick={{ fill: '#888' }} />
                    <Area type="monotone" dataKey="momentum" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMomentum)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Continue Learning Section */}
          <section className="mb-12" data-tour="continue-learning">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Continue Learning</h2>
              {courses.length > 4 && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/courses')}>
                  View All ({courses.length}) <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>

            {courses.length === 0 ? (
              <Card className="text-center py-16 border-dashed">
                <CardContent>
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">No courses enrolled yet</p>
                  <Button onClick={() => navigate('/courses')} size="lg">Explore Courses</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.slice(0, 4).map((course) => {
                  const stats = getCourseStats(course);
                  const isCompleted = stats.progress >= 100;

                  return (
                    <Card
                      key={course.id}
                      className="cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group overflow-hidden"
                      onClick={() => {
                        if (!course.isLocked) {
                          navigate(`/courses/${course.slug}`);
                        }
                      }}
                      data-tour="continue-card"
                    >
                      <div className="h-2 bg-primary" />
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-bold text-lg leading-tight line-clamp-2 pr-2">
                            {stats.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs font-semibold flex items-center gap-1">
                            <Zap className="h-3 w-3" /> {stats.xp} XP
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-semibold">{Math.round(stats.progress)}%</span>
                            </div>
                            <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                              <div
                                className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
                                style={{
                                  width: `${stats.progress}%`,
                                  backgroundColor:
                                    stats.progress >= 90 ? '#10b981' :
                                    stats.progress >= 60 ? '#3b82f6' :
                                    stats.progress >= 30 ? '#f59e0b' : '#8b5cf6',
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Tasks Completed</span>
                            <span className="font-medium text-foreground">{stats.lessons}</span>
                          </div>

                          <div className="pt-2">
                            <Badge
                              variant={isCompleted ? "default" : "secondary"}
                              className={`w-full justify-center py-1.5 text-xs font-medium ${
                                isCompleted ? "bg-green-500 text-white" : "bg-blue-500/10 text-blue-600"
                              }`}
                            >
                              {isCompleted ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                        </div>

                        <Button
                          className="w-full mt-4"
                          size="sm"
                          disabled={course.isLocked}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!course.isLocked) {
                              navigate(`/courses/${course.slug}`);
                            }
                          }}
                        >
                          {course.isLocked ? "Locked" : isCompleted ? "Review Course" : "Continue Learning"}
                          {!course.isLocked && <ChevronRight className="ml-1 h-4 w-4" />}
                        </Button>
                      </CardContent>
                      {course.isLocked && (
                        <Badge variant="destructive" className="absolute top-2 right-2 text-xs">Locked</Badge>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}