import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton } from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { fetchTasks, organizeTasks, Course } from '@/lib/csv';
import { BookOpen, Clock, Award, Lock } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { InteractiveHoverButton } from "../components/Buttons/interactive-hover-button";
import { supabase } from '@/integrations/supabase/client';
import Sidebar from '@/components/sidebar'; // ← Your existing sidebar

const CSV_URL =
  import.meta.env.VITE_CSV_URL ||
  'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

type UICourse = Course & { isLocked?: boolean };

export default function CoursesIndex() {
  const [courses, setCourses] = useState<UICourse[]>([]);
  const [approvedCourses, setApprovedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const email = localStorage.getItem("omega_email")?.trim() || null;

  if (!email) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-2xl">
        Please log in to continue
      </div>
    );
  }

  // Fetch approved courses from Supabase
  useEffect(() => {
    const fetchApproved = async () => {
      const { data, error } = await supabase
        .from("form_users")
        .select("approved_courses")
        .eq("email", email)
        .single();

      if (!error && Array.isArray(data?.approved_courses)) {
        setApprovedCourses(data.approved_courses as string[]);
      }
    };
    fetchApproved();
  }, [email]);

  // Load courses from CSV + apply lock status
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const tasks = await fetchTasks(CSV_URL);
        const organized = organizeTasks(tasks);

        const validCourses = organized.filter(course =>
          course.id &&
          course.name &&
          !course.name.toLowerCase().includes("dummy") &&
          !course.name.toLowerCase().includes("test") &&
          !course.name.toLowerCase().includes("sample") &&
          course.chapters?.length > 0
        );

        const withLockFlag: UICourse[] = validCourses.map(course => ({
          ...course,
          isLocked: !approvedCourses.includes(course.id),
        }));

        setCourses(withLockFlag.sort((a, b) => Number(a.isLocked) - Number(b.isLocked)));
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [approvedCourses]);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(courses.map(c => c.category || 'uncategorized').filter(Boolean))];
    return cats;
  }, [courses]);

  const displayedCourses = useMemo(() => {
    return selectedCategory === 'all'
      ? courses
      : courses.filter(c => (c.category || 'uncategorized') === selectedCategory);
  }, [courses, selectedCategory]);

  const getCompletedTasks = (courseSlug: string): string[] => {
    const key = `course_${courseSlug}_completed_tasks`;
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  const getCourseStats = (course: Course) => {
    const allTasks = course.chapters.flatMap(ch => ch.lessons).flatMap(l => l.tasks).map(t => t.id);
    const completed = getCompletedTasks(course.slug || course.id);
    const completedTasks = allTasks.filter(id => completed.includes(id)).length;

    const totalXP = course.chapters.flatMap(ch => ch.lessons).flatMap(l => l.tasks).reduce((s, t) => s + (t.xp || 0), 0);
    const earnedXP = course.chapters.flatMap(ch => ch.lessons).flatMap(l => l.tasks)
      .filter(t => completed.includes(t.id))
      .reduce((s, t) => s + (t.xp || 0), 0);

    const progressPercentage = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0;

    return {
      totalChapters: course.chapters.length,
      totalLessons: course.chapters.reduce((s, ch) => s + ch.lessons.length, 0),
      totalTasks: allTasks.length,
      completedTasks,
      progressPercentage,
      totalXP,
      earnedXP,
    };
  };

  const retryLoad = async () => {
    setLoading(true);
    setError(null);
    // Same logic as above...
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />

      {/* Main Content Area - Takes remaining space */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <DotLottieReact
                src="/animations/animation.lottie"
                loop
                autoplay
                className="w-48 h-48"
              />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-center justify-center min-h-screen">
              <Card className="max-w-md text-center">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Failed to Load Courses</h3>
                  <p className="text-muted-foreground mb-6">{error}</p>
                  <PrimaryButton onClick={retryLoad}>Try Again</PrimaryButton>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          {!loading && !error && (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-foreground mb-3">
                  Pro-Training Courses
                </h1>
                <p className="text-xl text-muted-foreground">
                  Choose from our comprehensive healthcare training programs
                </p>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-3 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {cat === 'all' ? 'All Courses' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    {cat !== 'all' && (
                      <span className="ml-2 opacity-70">
                        ({courses.filter(c => (c.category || 'uncategorized') === cat).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Course Grid */}
              {displayedCourses.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold">No courses found</h3>
                  <p className="text-muted-foreground mt-2">Try another category.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedCourses.map((course, index) => {
                    const stats = getCourseStats(course);
                    const locked = course.isLocked;

                    return (
                      <Card
                        key={course.id}
                        className={`relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl ${
                          locked ? 'opacity-75' : ''
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {locked && (
                          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className="bg-background/80 backdrop-blur-sm rounded-full p-6">
                              <Lock className="w-16 h-16 text-destructive" />
                            </div>
                          </div>
                        )}

                        <CardHeader>
                          <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Award className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">{stats.earnedXP}</div>
                              <div className="text-sm text-muted-foreground">/ {stats.totalXP} XP</div>
                            </div>
                          </div>

                          <CardTitle className={locked ? 'text-white' : 'text-green-600 dark:text-green-400'}>
                            {course.name}
                          </CardTitle>
                          <CardDescription>{course.description || "No description."}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          <ProgressBar value={stats.progressPercentage} size="sm" />

                          <div className="grid grid-cols-2 gap-4 text-center text-sm">
                            <div>
                              <div className="text-muted-foreground">Chapters</div>
                              <div className="font-bold text-lg">{stats.totalChapters}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Tasks</div>
                              <div className="font-bold text-lg">{stats.completedTasks}/{stats.totalTasks}</div>
                            </div>
                          </div>

                          {locked ? (
                            <a
                              href={`https://wa.me/919342205876?text=${encodeURIComponent(
                                `Hi! Please unlock "${course.name}" course for me!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-center py-3 bg-destructive text-white rounded-lg font-medium hover:bg-destructive/90 transition"
                            >
                              Contact to Unlock
                            </a>
                          ) : (
                            <Link to={`/courses/${course.slug || course.id}`} className="block">
                              <InteractiveHoverButton className="w-full">
                                {stats.completedTasks > 0 ? "Continue Course" : "ㅤStart Course"}
                              </InteractiveHoverButton>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}