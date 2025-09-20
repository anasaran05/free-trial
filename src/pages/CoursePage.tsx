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
import { BookOpen, ChevronRight } from 'lucide-react';
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
        <div className="text-right mt-2 sm:mt-0">
          <div className="text-xl sm:text-3xl font-bold text-primary mb-1">
            {progress.earnedXP}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            / {progress.totalXP} XP
          </div>
        </div>
      </div>

      {/* Stats in a single line on mobile */}
      <div className="flex flex-wrap sm:grid sm:grid-cols-4 gap-2 sm:gap-6">
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

  return (
    <Card
      variant="elevated"
      className="animate-fade-in p-2 sm:p-4 md:p-6"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg sm:text-xl mb-1 sm:mb-2">
              Chapter {index + 1}: {chapter.name}
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
              {chapter.lessons.length} lessons • {allTasks.length} tasks •{' '}
              {allTasks.reduce((sum, task) => sum + task.xp, 0)} XP
            </p>
            <div className="max-w-full sm:max-w-md">
              <ProgressBar
                value={chapterProgress.completionPercentage}
                label="Chapter Progress"
                size="sm"
              />
            </div>
          </div>

          {/* Button moved right for mobile */}
        <div className="flex mb-4 mt-6 sm:mt-0 justify-end pr-2 sm:pr-0">
  <Link to={`/courses/${courseId}/chapters/${chapter.id}`}>
    <InteractiveHoverButton
          className="relative w-full flex items-center justify-center
                     rounded-lg sm:rounded-xl font-semibold px-3 py-2 sm:px-4 sm:py-3
                     bg-gray-200 text-black
                     hover:bg-black hover:text-white
                     transition-all duration-300 ease-in-out shadow-sm
                     text-sm sm:text-base"
        >
      {chapterProgress.completedTasks > 0 ? 'Continue' : 'Start Chapter'}
    </InteractiveHoverButton>
  </Link>
</div>


        </div>
      </CardHeader>

      <CardContent className="space-y-1 sm:space-y-2">
        {chapter.lessons.slice(0, 3).map((lesson) => {
          const lessonProgress = calculateProgress(lesson.tasks, completedTaskIds);
          const isCompleted = lessonProgress.completedTasks === lesson.tasks.length;
          return (
            <div
              key={lesson.id}
              className="flex items-center gap-2 sm:gap-3 p-1 sm:p-2 rounded-lg hover:bg-surface-elevated transition-colors"
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : 'bg-surface text-muted-foreground'
                }`}
              >
                {isCompleted ? '✓' : lesson.tasks.reduce((sum, task) => sum + task.xp, 0)}
              </div>
              <span
                className={`text-xs sm:text-sm flex-1 ${
                  isCompleted ? 'text-success-foreground' : 'text-foreground'
                }`}
              >
                {lesson.name}
              </span>
            </div>
          );
        })}
        {chapter.lessons.length > 3 && (
          <div className="text-center pt-1 sm:pt-2">
            <Link
              to={`/courses/${courseId}/chapters/${chapter.id}`}
              className="text-xs sm:text-sm text-primary hover:text-primary/80"
            >
              View all {chapter.lessons.length} lessons
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}