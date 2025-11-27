import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton } from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { fetchTasks, organizeTasks, Course, calculateProgress } from '@/lib/csv';
import { BookOpen, Clock, Award, Lock } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { InteractiveHoverButton } from "../components/Buttons/interactive-hover-button";
import { supabase } from '@/integrations/supabase/client';


const CSV_URL =
  import.meta.env.VITE_CSV_URL ||
  'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

// extend Course with UI flag
type UICourse = Course & { isLocked?: boolean };

export default function CoursesIndex() {
  const [courses, setCourses] = useState<UICourse[]>([]);
  const [approvedCourses, setApprovedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const email = localStorage.getItem("omega_email")?.trim() || null;
  

  if (!email) {
    return <div>Please log in to continue</div>;
  }
 


  // fetch approved course IDs for this email
  useEffect(() => {
    const fetchApproved = async () => {
      const { data, error } = await supabase
        .from("form_users")
        .select("approved_courses")
        .eq("email", email)
        .single();

      if (error) {
        console.warn("Error loading approved_courses", error);
        return;
      }

      if (Array.isArray(data?.approved_courses)) {
        setApprovedCourses(data.approved_courses as string[]);
      }
    };

    fetchApproved();
  }, [email]);

  // load CSV and mark courses as locked/unlocked
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const tasks = await fetchTasks(CSV_URL);
        const organized = organizeTasks(tasks);
        console.log("COURSE IDS:", organized.map(c => ({ id: c.id, name: c.name })));

        const validCourses = organized.filter(course => {
          return (
            course.id &&
            course.name &&
            course.chapters?.length > 0 &&
            !course.name.toLowerCase().includes("dummy") &&
            !course.name.toLowerCase().includes("test") &&
            !course.name.toLowerCase().includes("sample")
          );
        });

        // map to add isLocked flag instead of filtering them out
        const withLockFlag: UICourse[] = validCourses.map(course => ({
          ...course,
          isLocked: !approvedCourses.includes(course.id),
        }));

     setCourses(
  withLockFlag.sort((a, b) => Number(a.isLocked) - Number(b.isLocked))
);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [approvedCourses]);

  // categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(courses.map(c => c.category || 'uncategorized').filter(Boolean))];
    return cats;
  }, [courses]);

  // category filter
  const displayedCourses = useMemo(() => {
    if (selectedCategory === 'all') return courses;
    return courses.filter(c => (c.category || 'uncategorized') === selectedCategory);
  }, [courses, selectedCategory]);

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
    const allTasks = course.chapters
      .flatMap(ch => ch.lessons)
      .flatMap(l => l.tasks)
      .map(t => t.id);

    const completed = getCompletedTasks(course.slug || course.id); // fallback to id if slug missing
    const completedTasks = allTasks.filter(id => completed.includes(id)).length;

    const totalXP = course.chapters
      .flatMap(ch => ch.lessons)
      .flatMap(l => l.tasks)
      .reduce((sum, t) => sum + (t.xp || 0), 0);

    const earnedXP = course.chapters
      .flatMap(ch => ch.lessons)
      .flatMap(l => l.tasks)
      .filter(t => completed.includes(t.id))
      .reduce((sum, t) => sum + (t.xp || 0), 0);

    const progressPercentage = allTasks.length > 0
      ? Math.round((completedTasks / allTasks.length) * 100)
      : 0;

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
    try {
      const tasks = await fetchTasks(CSV_URL);
      const organizedCourses = organizeTasks(tasks);
      const validCourses = organizedCourses.filter(course => {
        return (
          course.name &&
          course.name.trim() !== '' &&
          !course.name.toLowerCase().includes('dummy') &&
          !course.name.toLowerCase().includes('test') &&
          !course.name.toLowerCase().includes('sample') &&
          course.id && course.id.trim() !== '' &&
          course.chapters && course.chapters.length > 0
        );
      });

      const withLockFlag: UICourse[] = validCourses.map(course => ({
        ...course,
        isLocked: !approvedCourses.includes(course.id),
      }));

      setCourses(withLockFlag);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center">
            <DotLottieReact
              src="/animations/animation.lottie"
              loop
              autoplay
              className="w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72"
            />
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-24">
            <Card className="max-w-md mx-auto text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-destructive-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Courses</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <PrimaryButton onClick={retryLoad}>Try Again</PrimaryButton>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-flex-left">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Pro-Training Courses
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose from our comprehensive healthcare training programs
            </p>
          </div>

          <div className="flex flex-left gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                {...(cat === 'all' ? { 'data-tour': 'category-tabs' } : {})}
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

          {displayedCourses.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses in this category yet</h3>
                <p className="text-muted-foreground">Try selecting "All Courses" or check back later.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-tour="course-grid">
              {displayedCourses.map((course, index) => {
                const stats = getCourseStats(course);
                const locked = course.isLocked;

                return (
       <Card
  key={course.id}
  variant="interactive"
  className={`relative h-full animate-fade-in bg-backdrop-blur-xl border border-white/10 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-2xl p-4 sm:p-6 md:p-8 ${
    locked ? "opacity-80 backdrop-blur-md" : ""
  }`}
  style={{ animationDelay: `${index * 100}ms` }}
>
  {locked && (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Lock className="w-14 h-14 text-red-700 opacity-70" />
    </div>
  )}

  <CardHeader>
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-primary/80 backdrop-blur-md rounded-lg flex items-center justify-center">
        <Award className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">{stats.earnedXP}</div>
        <div className="text-xs text-muted-foreground">/ {stats.totalXP} XP</div>
      </div>
    </div>

    <CardTitle className={`text-xl ${locked ? "text-muted-foreground" : "text-green-600"}`}>
      {course.name}
    </CardTitle>

    <CardDescription>
      {course.description || "No description available."}
    </CardDescription>

    {course.category && course.category !== "all" && (
      <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
        {course.category}
        {locked && " · Locked"}
      </span>
    )}
  </CardHeader>

  <CardContent className="space-y-6">
    <ProgressBar
      value={stats.progressPercentage}
      label="Progress"
      size="sm"
      data-tour="progress-bar"
    />

    <div className="grid grid-cols-2 gap-4 text-center text-sm">
      <div>
        <div className="flex items-center justify-center gap-1 text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>Chapters</span>
        </div>
        <div className="font-semibold text-foreground">{stats.totalChapters}</div>
      </div>

      <div>
        <div className="flex items-center justify-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Tasks</span>
        </div>
        <div className="font-semibold text-foreground">
          {stats.completedTasks}/{stats.totalTasks}
        </div>
      </div>
    </div>

    <div className="pt-6">
      {locked ? (
        <a
  href={`https://wa.me/919342205876?text=${encodeURIComponent(
    `Hi! Please unlock the "${course.name}" course for me!\nSlug: ${course.slug}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-700 text-white text-center border border-red-700 backdrop-blur-[2px] bg-opacity-90 hover:bg-white hover:text-red-700 transition-colors"
>
  Contact to Unlock
</a>
      ) : (
       <Link 
  to={`/courses/${course.slug || course.id}`} 
  className="block"
>
          <InteractiveHoverButton
            data-tour="start-btn"
            className="w-full bg-white text-black border border-gray-300 hover:bg-primary hover:text-white hover:border-primary"
          >
            {stats.completedTasks > 0 ? "Continue Course" : "Start Course"}
          </InteractiveHoverButton>
        </Link>
      )}
    </div>
  </CardContent>
</Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}