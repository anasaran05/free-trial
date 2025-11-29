'use client';

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Joyride from 'react-joyride'; // ← Added
import { useOnboarding } from '@/components/onboarding/useOnboarding'; // ← Added
import { getCourseBySlug } from '@/lib/csv';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton } from '@/components/Button';
import { InteractiveHoverButton } from "../components/Buttons/interactive-hover-button";
import ProgressBar from '@/components/ProgressBar';
import { fetchTasks, organizeTasks, Course, Chapter, calculateProgress, getCompletedTasks } from '@/lib/csv';
import { BookOpen, ChevronRight, Award, Clock } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

export default function ChapterPage() {
  const { courseSlug, chapterId } = useParams<{ courseSlug: string; chapterId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ONBOARDING — Same as all other pages
  const email = localStorage.getItem("omega_email")?.trim() || null;
  const { run, steps, handleFinish } = useOnboarding("chapter_page", email);

  useEffect(() => {
    loadChapter();
  }, [courseSlug, chapterId]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      const tasks = await fetchTasks(CSV_URL);
      const courses = organizeTasks(tasks);
      const foundCourse = getCourseBySlug(courseSlug || '');
      
      if (!foundCourse) {
        setError('Course not found');
        return;
      }
      
      const foundChapter = foundCourse.chapters.find(ch => ch.id === chapterId);
      if (!foundChapter) {
        setError('Chapter not found');
        return;
      }
      
      setCourse(foundCourse);
      setChapter(foundChapter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load chapter');
      console.error('Error loading chapter:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLessonCompletedTasks = (lesson: any): string[] => {
    const allCompletedTasks = getCompletedTasks(courseSlug!);
    const lessonTaskIds = lesson.tasks.map((task: any) => task.id);
    return allCompletedTasks.filter(taskId => lessonTaskIds.includes(taskId));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="text-center">
          <DotLottieReact
            src="/animations/animation.lottie"
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        </div>
      </div>
    );
  }

  if (error || !course || !chapter) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
          <Card className="max-w-sm sm:max-w-md mx-auto text-center">
            <CardContent className="p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-destructive-foreground" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Chapter Not Found</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">{error}</p>
              <Link to="/courses">
                <PrimaryButton className="w-full sm:w-auto">Back to Courses</PrimaryButton>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const completedTaskIds = getCompletedTasks(courseSlug!);
  const allChapterTasks = chapter.lessons.flatMap(l => l.tasks);
  const chapterProgress = calculateProgress(allChapterTasks, completedTaskIds);

  return (
    <>
      {/* JOYRIDE TOUR — Always mounted */}
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
          styles={{ options: { zIndex: 10000 } }}
          locale={{
            back: 'Back',
            close: 'Close',
            last: 'Finish',
            next: 'Next',
            skip: 'Skip Tour',
          }}
        />
      )}

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8" data-tour="breadcrumb">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
              <Link to="/courses" className="hover:text-foreground transition-colors whitespace-nowrap">Courses</Link>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <Link to={`/courses/${courseSlug}`} className="hover:text-foreground transition-colors whitespace-nowrap">{course.name}</Link>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-foreground whitespace-nowrap">{chapter.name}</span>
            </div>
          </nav>

          {/* Chapter Header */}
          <div className="mb-8 sm:mb-12" data-tour="chapter-header">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 sm:mb-3 sm:mb-4 leading-tight">
                  {chapter.name}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  Complete all lessons in this chapter to advance your healthcare skills.
                </p>
                <div className="w-full sm:max-w-md">
                  <ProgressBar value={chapterProgress.completionPercentage} label="Chapter Progress" />
                </div>
              </div>
              <div className="text-center sm:text-right w-full sm:w-auto flex-shrink-0" data-tour="xp-display">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {chapterProgress.earnedXP}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  / {chapterProgress.totalXP} XP
                </div>
              </div>
            </div>

            {/* Chapter Stats */}
            <div className="chapter-stats grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6" data-tour="chapter-stats">
              <div className="text-center p-2 sm:p-0">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{chapter.lessons.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total Lessons</div>
              </div>
              <div className="text-center p-2 sm:p-0">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{chapterProgress.completedTasks}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Completed Tasks</div>
              </div>
              <div className="text-center p-2 sm:p-0">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-success">{Math.round(chapterProgress.completionPercentage)}%</div>
                <div className="text-xs sm:text-sm text-success">Progress</div>
              </div>
            </div>
          </div>

          {/* Lessons Section */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-4 sm:mb-6" data-tour="lessons-title">
              Lessons
            </h2>
           
            <div className="grid gap-4 sm:gap-6">
              {chapter.lessons.map((lesson, index) => {
                const lessonCompletedTasks = getLessonCompletedTasks(lesson);
                const lessonProgress = calculateProgress(lesson.tasks, lessonCompletedTasks);
                const isLessonFullyComplete = lessonProgress.completedTasks === lesson.tasks.length;
                
                return (
                  <Card
                    key={lesson.id}
                    variant="interactive"
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-tour="lesson-card"
                  >
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full min-w-0">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg mb-2 leading-tight">
                              {lesson.name}
                            </CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                              {lesson.tasks.length} tasks • {lesson.tasks.reduce((sum, task) => sum + task.xp, 0)} XP
                            </p>
                            <div className="max-w-full sm:max-w-md mb-3 sm:mb-4">
                              <ProgressBar value={lessonProgress.completionPercentage} label="Lesson Progress" size="sm" />
                            </div>
                            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Award className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>{lessonProgress.earnedXP}/{lessonProgress.totalXP} XP</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>~{lesson.tasks.length * 15} min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                       
                        <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                         <Link 
  to={`/courses/${course.slug}/chapters/${chapterId}/lessons/${lesson.id}/learning`}
  className="w-full sm:w-auto"
>
                            {isLessonFullyComplete ? (
                              <PrimaryButton className="w-full sm:w-auto text-sm sm:text-base px-3 sm:px-4 py-2">
                                Review
                              </PrimaryButton>
                            ) : lessonProgress.completedTasks > 0 ? (
                              <PrimaryButton
                                className="w-full sm:w-auto text-sm sm:text-base px-3 sm:px-4 py-2"
                                data-tour="start-lesson-btn"
                              >
                                Continue
                              </PrimaryButton>
                            ) : (
                              <InteractiveHoverButton
                                className="relative w-full flex items-center justify-center rounded-lg sm:rounded-xl font-semibold px-3 py-2 sm:px-4 sm:py-3 bg-gray-200 text-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out shadow-sm text-sm sm:text-base"
                                data-tour="start-lesson-btn"
                              >
                                  ㅤㅤㅤStart Lesson
                              </InteractiveHoverButton>
                            )}
                          </Link>
                         
                          {isLessonFullyComplete && (
                            <span className="text-xs text-success-foreground bg-success/10 px-2 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Your original <style> block — unchanged */}
        <style>{`
          @media screen and (max-width: 768px) {
            .chapter-stats {
              display: flex !important;
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
              gap: 12px !important;
              padding: 8px 0 !important;
              flex-wrap: nowrap !important;
            }
            .chapter-stats > div { flex: 1 !important; text-align: center !important; padding: 4px 2px !important; min-width: 0 !important; }
            .chapter-stats > div > div:first-child { font-size: 16px !important; font-weight: 700 !important; color: #1f2937 !important; }
            .chapter-stats > div > div:last-child { font-size: 10px !important; color: #6b7280 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; text-transform: uppercase !important; }
            .chapter-stats > div:last-child > div:first-child { font-size: 18px !important; color: #059669 !important; }
            .chapter-stats > div:last-child > div:last-child { color: #059669 !important; }
          }
          @media screen and (min-width: 769px) {
            .chapter-stats { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 1.5rem !important; }
            .chapter-stats > div { display: block !important; padding: 0 !important; text-align: center !important; }
          }
        `}</style>
      </div>
    </>
  );
}