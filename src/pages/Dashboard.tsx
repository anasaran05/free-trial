'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, BookOpen, Trophy, Award, Activity, Settings, Lock, 
  Zap, CheckCircle, TrendingUp, ChevronRight 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, AreaChart, Area 
} from 'recharts';

// Your real data logic
import { fetchTasks, organizeTasks, Course, calculateProgress } from '@/lib/csv';

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const tasks = await fetchTasks(CSV_URL);
        const organized = organizeTasks(tasks);
        const realCourses = organized.filter(c => 
          c.name && 
          !c.name.toLowerCase().includes('dummy') &&
          !c.name.toLowerCase().includes('test') &&
          c.chapters?.length > 0
        );
        setCourses(realCourses);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const getCompletedTasks = (courseId: string): string[] => {
    const key = `course_${courseId}_completed_tasks`;
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  const getCourseStats = (course: Course) => {
    const allTasks = course.chapters.flatMap(ch => ch.lessons.flatMap(l => l.tasks));
    const completed = getCompletedTasks(course.id);
    const progress = calculateProgress(allTasks, completed);

    return {
      title: course.name,
      progress: progress.completionPercentage,
      lessons: `${progress.completedTasks}/${progress.totalTasks} Tasks`,
      xp: progress.earnedXP,
      totalXP: progress.totalXP,
      color: progress.completionPercentage >= 90 ? 'bg-green-500' :
             progress.completionPercentage >= 60 ? 'bg-blue-500' :
             progress.completionPercentage >= 30 ? 'bg-amber-500' : 'bg-purple-500'
    };
  };

  // === CHARTS DATA (You can make these dynamic later with real activity) ===
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
      {/* Sidebar */}
<aside
  className={`
    ${sidebarOpen ? 'w-64' : 'w-20'}
    hidden md:flex
    fixed left-0 top-16 z-40
    h-[calc(100vh-64px)]
    bg-background/95 backdrop-blur
    border-r border-border
    transition-all duration-300
  `}
>
  <div className="flex h-full flex-col">

    {/* Collapse Button */}
    <div className="flex items-center justify-end px-4 py-4">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
      >
        {sidebarOpen ? '<' : '>'}
      </button>
    </div>

    {/* Navigation */}
    <nav className="flex-1 space-y-1 px-3 mt-2">

      {navItems.map((item) => {
        const Icon = item.icon;
        const isProLocked = item.pro;
        const active = item.active;

        return (
          <button
            key={item.label}
            onClick={() => handleNavClick(item)}
            disabled={isProLocked}
            className={`
              flex items-center
              w-full
              rounded-md
              py-3 px-3
              text-sm font-medium
              transition-all
              ${
                isProLocked
                  ? 'text-muted-foreground cursor-not-allowed'
                  : active
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }
            `}
          >
            <Icon
              className={`
                h-5 w-5 shrink-0
                ${sidebarOpen ? '' : 'mx-auto'}
              `}
            />

            {/* Label */}
            <span
              className={`
                ml-3
                ${sidebarOpen ? 'block' : 'hidden'}
              `}
            >
              {item.label}
            </span>

            {/* PRO badge */}
            {isProLocked && (
              <span
                className={`
                  ml-auto mr-1 text-red-700 text-xs font-bold
                  ${sidebarOpen ? 'block' : 'hidden'}
                `}
              >
                PRO
              </span>
            )}
          </button>
        );
      })}

    </nav>

  </div>
</aside>

      {/* Main Content */}
      <div
  className={`
    flex-1
${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}
    transition-all duration-300
  `}
>
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-semibold">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">Your learning analytics and performance insights</p>
            </div>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-6 lg:p-12">
          {/* KPI Strip */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          {courses.reduce((sum, course) => {
            const stats = getCourseStats(course);
            const completed = parseInt(stats.lessons.split('/')[0], 10) || 0;
            return sum + completed;
          }, 0)}
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

          {/* Charts Section - FULLY RESTORED */}
          <div className="mb-12 grid gap-6 lg:grid-cols-3">
            <Card>
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

            <Card>
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

            <Card>
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

          {/* Continue Learning - Real Courses */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Continue Learning</h2>
            {courses.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-4">No courses enrolled yet</p>
                  <Button onClick={() => navigate('/courses')} size="lg">
                    Explore Courses
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {courses.slice(0, 4).map((course) => {
                  const stats = getCourseStats(course);
                  return (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg line-clamp-2">{stats.title}</CardTitle>
                          <Badge variant="secondary">{stats.xp} XP</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{Math.round(stats.progress)}%</span>
                            </div>
                            <Progress value={stats.progress} className="h-2" />
                          </div>
                          <p className="text-xs text-muted-foreground">{stats.lessons}</p>
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={() => navigate(`/courses/${course.id}`)}
                          >
                            Continue Learning
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
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