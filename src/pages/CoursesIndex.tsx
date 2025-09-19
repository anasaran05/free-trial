import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import Button, { PrimaryButton } from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { fetchTasks, organizeTasks, Course, calculateProgress } from '@/lib/csv';
import { BookOpen, Clock, Award } from 'lucide-react';
import Footer from "../components/Footer";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Use environment variable or fallback to sample data
const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

export default function CoursesIndex() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const tasks = await fetchTasks(CSV_URL);
        const organizedCourses = organizeTasks(tasks);
        
        // Filter out dummy courses
        const filteredCourses = organizedCourses.filter(course => {
          return (
            course.name && // Has a name
            course.name.trim() !== '' && // Name is not empty
            !course.name.toLowerCase().includes('dummy') && // Doesn't contain 'dummy'
            !course.name.toLowerCase().includes('test') && // Doesn't contain 'test'
            !course.name.toLowerCase().includes('sample') && // Doesn't contain 'sample'
            course.id && course.id.trim() !== '' && // Has a valid ID
            course.chapters && course.chapters.length > 0 // Has actual content
          );
        });
        
        setCourses(filteredCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
        console.error('Error loading courses:', err);
      }
    };

    // Ensure loading screen shows for at least 5 seconds
    const startTime = Date.now();
    Promise.all([
      loadCourses(),
      new Promise(resolve => setTimeout(resolve, 5000)) // Minimum 5-second delay
    ]).finally(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 5000 - elapsedTime;

      // If fetching took less than 5 seconds, wait for the remaining time
      if (remainingTime > 0) {
        setTimeout(() => setLoading(false), remainingTime);
      } else {
        setLoading(false);
      }
    });
  }, []);

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
      totalLessons: course.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0),
      totalTasks: progress.totalTasks,
      completedTasks: progress.completedTasks,
      progressPercentage: progress.completionPercentage,
      totalXP: progress.totalXP,
      earnedXP: progress.earnedXP
    };
  };

  if (loading) {
  return (
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
  );
}

  if (error) {
    async function loadCourses() {
      try {
      const tasks = await fetchTasks(CSV_URL);
      const organizedCourses = organizeTasks(tasks);

      // Filter out dummy courses
      const filteredCourses = organizedCourses.filter(course => {
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

      setCourses(filteredCourses);
      setError(null);
      } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
      console.error('Error loading courses:', err);
      } finally {
      setLoading(false);
      }
    }
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-destructive-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Courses</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <PrimaryButton onClick={() => {
                setLoading(true);
                loadCourses();
              }}>
                Try Again
              </PrimaryButton>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Pro-Training Courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose from our comprehensive healthcare training programs
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Courses Available</h3>
              <p className="text-muted-foreground">
                Check your CSV data source or contact your administrator.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const stats = getCourseStats(course);

              return (
                <Card 
                  key={course.id}
                  variant="interactive"
                  className="h-full animate-fade-in bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/80 backdrop-blur-md rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {stats.earnedXP}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          / {stats.totalXP} XP
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl">
                      {course.name}
                    </CardTitle>
                    
                    <CardDescription>
                      Comprehensive training program covering essential healthcare administration skills.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Progress */}
                    <div>
                      <ProgressBar
                        value={stats.progressPercentage}
                        label="Progress"
                        size="sm"
                      />
                    </div>
                    
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-xs">Chapters</span>
                        </div>
                        <div className="font-semibold text-foreground">
                          {stats.totalChapters}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">Tasks</span>
                        </div>
                        <div className="font-semibold text-foreground">
                          {stats.completedTasks}/{stats.totalTasks}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="pt-4">
                      <Link to={`/courses/${course.id}`} className="block">
                        <Button className="w-full bg-green-700 hover:bg-blue-500 text-white">
                          {stats.completedTasks > 0 ? 'Continue Course' : 'Start Course'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>  
  ); 
}