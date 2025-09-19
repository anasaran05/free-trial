
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

const CSV_URL =
  import.meta.env.VITE_CSV_URL ||
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRrzHdNL8FRSooYojNPyBU2f66Tgr-DgwA6xB_HAK-azRx_s8PvbKUwzO5OzjzVdPGw-qeNOl68Asx6/pub?output=csv';

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Helpers **/
  const completedKey = `course_${courseId}_completed_tasks`;
  const getCompletedTasks = (): string[] =>
    JSON.parse(sessionStorage.getItem(completedKey) || '[]');

  const getChapterProgress = (chapter: Chapter) => {
    const allTasks = chapter.lessons.flatMap(l => l.tasks);
    return calculateProgress(allTasks, getCompletedTasks());
  };

  /** Data fetch **/
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
  /** Initial Loading Animation **/ 
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

  /** Render states **/
  if (loading) {
    return (
      <PageWrapper>
        <LoadingState />
      </PageWrapper>
    );
  }

  if (error || !course) {
    return (
      <PageWrapper>
        <ErrorState message={error} />
      </PageWrapper>
    );
  }

  /** Progress **/
  const completedTaskIds = getCompletedTasks();
  const allTasks = course.chapters.flatMap((ch) => ch.lessons.flatMap(l => l.tasks));
  const overallProgress = calculateProgress(allTasks, completedTaskIds);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Breadcrumb courseName={course.name} />

        {/* Course Header */}
        <div className="mb-12">
          <CourseHeader course={course} progress={overallProgress} />
        </div>

        {/* Chapters */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
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

function LoadingState() {
  return (
    <div className="text-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
      <p className="text-muted-foreground">Loading course...</p>
    </div>
  );
}



function ErrorState({ message }: { message: string | null }) {
  return (
    <Card className="max-w-md mx-auto text-center">
      <CardContent className="p-8">
        <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-6 h-6 text-destructive-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Course Not Found
        </h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        <Link to="/courses">
          <PrimaryButton>Back to Courses</PrimaryButton>
        </Link>
      </CardContent>
    </Card>
  );
}

function Breadcrumb({ courseName }: { courseName: string }) {
  return (
    <nav className="mb-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/courses" className="hover:text-foreground transition-colors">
          Courses
        </Link>
        <ChevronRight className="w-4 h-4" />
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
      <div className="flex items-start gap-6 mb-6">
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            {course.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Comprehensive healthcare training with practical simulations and
            expert guidance.
          </p>
          <div className="max-w-md">
            <ProgressBar
              value={progress.completionPercentage}
              label="Overall Progress"
            />
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary mb-1">
            {progress.earnedXP}
          </div>
          <div className="text-sm text-muted-foreground">
            / {progress.totalXP} XP
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
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
    <div className="text-center">
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
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
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">
              Chapter {index + 1}: {chapter.name}
            </CardTitle>
            <p className="text-muted-foreground mb-4">
              {chapter.lessons.length} lessons • {allTasks.length} tasks •{' '}
              {allTasks.reduce((sum, task) => sum + task.xp, 0)} XP
            </p>
            <div className="max-w-md">
              <ProgressBar
                value={chapterProgress.completionPercentage}
                label="Chapter Progress"
                size="sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {chapterProgress.earnedXP}
              </div>
              <div className="text-xs text-muted-foreground">
                / {chapterProgress.totalXP} XP
              </div>
            </div>
            <Link to={`/courses/${courseId}/chapters/${chapter.id}`}>
              <PrimaryButton>
                {chapterProgress.completedTasks > 0 ? 'Continue' : 'Start Chapter'}
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {chapter.lessons.slice(0, 3).map((lesson) => {
            const lessonProgress = calculateProgress(lesson.tasks, completedTaskIds);
            const isCompleted = lessonProgress.completedTasks === lesson.tasks.length;
            return (
              <div
                key={lesson.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-elevated transition-colors"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : 'bg-surface text-muted-foreground'
                  }`}
                >
                  {isCompleted ? '✓' : lesson.tasks.reduce((sum, task) => sum + task.xp, 0)}
                </div>
                <span
                  className={`text-sm flex-1 ${
                    isCompleted
                      ? 'text-success-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {lesson.name}
                </span>
              </div>
            );
          })}
          {chapter.lessons.length > 3 && (
            <div className="text-center pt-2">
              <Link
                to={`/courses/${courseId}/chapters/${chapter.id}`}
                className="text-sm text-primary hover:text-primary/80"
              >
                View all {chapter.lessons.length} lessons
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
