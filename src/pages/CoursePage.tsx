import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton } from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  fetchTasks,
  organizeTasks,
  Course,
  Chapter,
  calculateProgress,
} from '@/lib/csv';
import { BookOpen, ChevronRight, Award, Clock } from 'lucide-react';
import { InteractiveHoverButton } from "../components/Buttons/interactive-hover-button";

const CSV_URL =
  import.meta.env.VITE_CSV_URL ||
  'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const completedKey = `course_${courseId}_completed_tasks`;
  const getCompletedTasks = (): string[] =>
    JSON.parse(sessionStorage.getItem(completedKey) || '[]');

  const getChapterProgress = (chapter: Chapter) => {
    const allTasks = chapter.lessons.flatMap(l => l.tasks);
    return calculateProgress(allTasks, getCompletedTasks());
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const tasks = await fetchTasks(CSV_URL);
        const courses = organizeTasks(tasks);
        const found = courses.find((c) => c.id === courseId);
        if (!found) throw new Error('Course not found');
        setCourse(found);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course');
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <DotLottieReact
          src="/animations/animation.lottie"
          loop
          autoplay
          className="w-32 h-32 sm:w-60 sm:h-60 md:w-72 md:h-72"
        />
      </div>
    );
  }

  if (error || !course) {
    return (
      <PageWrapper>
        <ErrorState message={error} />
      </PageWrapper>
    );
  }

  const completedTaskIds = getCompletedTasks();
  const allTasks = course.chapters.flatMap(ch => ch.lessons.flatMap(l => l.tasks));
  const overallProgress = calculateProgress(allTasks, completedTaskIds);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Breadcrumb courseName={course.name} />

        {/* Course Header */}
        <div className="mb-8 sm:mb-12">
          <CourseHeader course={course} progress={overallProgress} />
        </div>

        {/* Chapters */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-4 sm:mb-6">
            Course Chapters
          </h2>
          {course.chapters.map((chapter, index) => {
            const chapterProgress = getChapterProgress(chapter);
            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                courseId={courseId!}
                index={index}
                chapterProgress={chapterProgress}
                completedTaskIds={completedTaskIds}
              />
            );
          })}
        </div>
      </div>

      <style >{`
        /* Course Stats - Mobile Horizontal Layout */
        @media screen and (max-width: 768px) {
          .course-stats {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 8px 0 !important;
            flex-wrap: nowrap !important;
          }
          
          .course-stats > div {
            flex: 1 !important;
            text-align: center !important;
            padding: 4px 2px !important;
            min-width: 0 !important;
          }
          
          .course-stats > div > div:first-child {
            font-size: 16px !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
            margin-bottom: 1px !important;
            color: #1f2937 !important;
          }
          
          .course-stats > div > div:last-child {
            font-size: 10px !important;
            line-height: 1.1 !important;
            color: #6b7280 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            text-transform: uppercase !important;
            letter-spacing: 0.025em !important;
          }
          
          /* Special styling for Progress percentage */
          .course-stats > div:last-child > div:first-child {
            font-size: 18px !important;
            color: #059669 !important;
          }
          
          .course-stats > div:last-child > div:last-child {
            color: #059669 !important;
          }
        }

        /* Ensure desktop layout remains unchanged */
        @media screen and (min-width: 769px) {
          .course-stats {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 1.5rem !important;
          }
          
          .course-stats > div {
            display: block !important;
            padding: 0 !important;
            text-align: center !important;
          }
        }

        /* Chapter Card Mobile Optimizations - Matching ChapterPage Lesson Cards */
        @media screen and (max-width: 768px) {
          .chapter-card-header {
            padding: 16px !important;
          }
          
          .chapter-card-content {
            padding: 0 16px 16px 16px !important;
          }
          
          .chapter-card-title {
            font-size: 16px !important;
            line-height: 1.3 !important;
            margin-bottom: 8px !important;
          }
          
          .chapter-card-description {
            font-size: 12px !important;
            line-height: 1.4 !important;
            margin-bottom: 12px !important;
          }
          
          .chapter-card-progress-container {
            margin-bottom: 12px !important;
            max-width: 100% !important;
          }
          
          .chapter-card-meta {
            font-size: 12px !important;
            line-height: 1.3 !important;
          }
          
          .chapter-card-meta > div {
            margin-bottom: 4px !important;
          }
          
          .chapter-card-button {
            padding: 12px 16px !important;
            font-size: 14px !important;
          }
          
          .lesson-item {
            padding: 8px !important;
            margin-bottom: 4px !important;
          }
          
          .lesson-item span {
            font-size: 13px !important;
            line-height: 1.3 !important;
          }
        }
      `}</style>
    </div>
  );
}

/** Sub-components **/

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-24">{children}</div>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <Card className="max-w-md mx-auto text-center p-2 sm:p-8">
      <CardContent>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-4">
          <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-destructive-foreground" />
        </div>
        <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
          Course Not Found
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">{message}</p>
        <Link to="/courses">
          <PrimaryButton className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base">Back to Courses</PrimaryButton>
        </Link>
      </CardContent>
    </Card>
  );
}

function Breadcrumb({ courseName }: { courseName: string }) {
  return (
    <nav className="mb-4 sm:mb-8">
      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link to="/courses" className="hover:text-foreground transition-colors">
          Courses
        </Link>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-foreground">{courseName}</span>
      </div>
    </nav>
  );
}

function CourseHeader({
  course,
  progress,
}: {
  course: Course;
  progress: ReturnType<typeof calculateProgress>;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:gap-6 mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-lg flex items-center justify-center mb-2 sm:mb-0">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-foreground mb-2 sm:mb-4">
            {course.name}
          </h1>
          <p className="text-sm sm:text-xl text-muted-foreground mb-2 sm:mb-6">
            Comprehensive healthcare training with practical simulations and expert guidance.
          </p>
          <div className="max-w-full sm:max-w-md">
            <ProgressBar value={progress.completionPercentage} label="Overall Progress" size="sm" />
          </div>
        </div>
        {/* Removed XP display as requested */}
      </div>

      {/* Course Stats - Mobile Optimized */}
      <div className="course-stats flex flex-wrap sm:grid sm:grid-cols-4 gap-2 sm:gap-6">
        <Stat value={course.chapters.length} label="Chapters" />
        <Stat value={course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)} label="Total Lessons" />
        <Stat value={progress.completedTasks} label="Completed" />
        <Stat value={`${Math.round(progress.completionPercentage)}%`} label="Progress" />
      </div>
    </>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="text-center flex-1">
      <div className="text-lg sm:text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function ChapterCard({
  chapter,
  index,
  courseId,
  chapterProgress,
  completedTaskIds,
}: {
  chapter: Chapter;
  index: number;
  courseId: string;
  chapterProgress: ReturnType<typeof calculateProgress>;
  completedTaskIds: string[];
}) {
  const allTasks = chapter.lessons.flatMap(l => l.tasks);
  const totalChapterXP = allTasks.reduce((sum, task) => sum + task.xp, 0);
  const estimatedTime = chapter.lessons.length * 15; // 15 min per lesson

  const isChapterFullyComplete = chapterProgress.completedTasks === allTasks.length;

  return (
    <Card
      variant="interactive"
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header - Optimized for mobile like ChapterPage */}
      <CardHeader className="chapter-card-header p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
          {/* Chapter Content - No Number Indicator */}
          <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full min-w-0">
            <div className="flex-1 min-w-0">
              <CardTitle className="chapter-card-title text-sm sm:text-base mb-2 leading-tight">
                Chapter {index + 1}: {chapter.name}
              </CardTitle>
              <p className="chapter-card-description text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                {chapter.lessons.length} lessons • {allTasks.length} tasks • {totalChapterXP} XP
              </p>
             
              {/* Chapter Progress Bar - Full width on mobile */}
              <div className="chapter-card-progress-container max-w-full sm:max-w-md mb-3 sm:mb-4">
                <ProgressBar
                  value={chapterProgress.completionPercentage}
                  label="Chapter Progress"
                  size="sm"
                />
              </div>
             
              {/* Meta Information - Same as ChapterPage lesson cards */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 chapter-card-meta text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{chapterProgress.earnedXP}/{chapterProgress.totalXP} XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>~{estimatedTime} min</span>
                </div>
              </div>
            </div>
          </div>
         
          {/* Button and Status - Mobile Optimized like ChapterPage */}
          <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
            <Link to={`/courses/${courseId}/chapters/${chapter.id}`} className="w-full sm:w-auto">
              {isChapterFullyComplete ? (
                <PrimaryButton className="w-full sm:w-auto chapter-card-button text-sm sm:text-base px-3 sm:px-4 py-2">
                  Review
                </PrimaryButton>
              ) : chapterProgress.completedTasks > 0 ? (
                <PrimaryButton className="w-full sm:w-auto chapter-card-button text-sm sm:text-base px-3 sm:px-4 py-2">
                  Continue
                </PrimaryButton>
              ) : (
                <InteractiveHoverButton
                  className="relative w-full flex items-center justify-center chapter-card-button
                             rounded-lg sm:rounded-xl font-semibold px-3 py-2 sm:px-4 sm:py-3
                             bg-gray-200 text-black
                             hover:bg-black hover:text-white
                             transition-all duration-300 ease-in-out shadow-sm
                             text-sm sm:text-base"
                >
                  Start Chapter
                </InteractiveHoverButton>
              )}
            </Link>
           
            {isChapterFullyComplete && (
              <span className="text-xs text-success-foreground bg-success/10 px-2 py-1 rounded-full">
                Completed
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Content - Lesson list - Only on mobile, hidden on desktop */}
      <CardContent className="chapter-card-content space-y-1 sm:space-y-2 pb-0 sm:pb-2 sm:hidden">
        {chapter.lessons.slice(0, 3).map((lesson) => {
          const lessonProgress = calculateProgress(lesson.tasks, completedTaskIds);
          const isCompleted = lessonProgress.completedTasks === lesson.tasks.length;
          return (
            <div
              key={lesson.id}
              className="lesson-item flex items-center gap-2 p-1 rounded-lg hover:bg-surface-elevated transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : 'bg-surface text-muted-foreground'
                }`}
              >
                {isCompleted ? '✓' : lesson.tasks.reduce((sum, task) => sum + task.xp, 0)}
              </div>
              <span
                className={`text-xs flex-1 ${
                  isCompleted ? 'text-success-foreground' : 'text-foreground'
                }`}
              >
                {lesson.name}
              </span>
            </div>
          );
        })}
        {chapter.lessons.length > 3 && (
          <div className="text-center pt-1 pb-2">
            <Link
              to={`/courses/${courseId}/chapters/${chapter.id}`}
              className="text-xs text-primary hover:text-primary/80"
            >
              View all {chapter.lessons.length} lessons
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}