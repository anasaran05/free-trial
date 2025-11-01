import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton } from '@/components/Button';
import { InteractiveHoverButton } from "../components/Buttons/interactive-hover-button";
import ProgressBar from '@/components/ProgressBar';
import { fetchTasks, organizeTasks, Course, Chapter, Lesson, calculateProgress } from '@/lib/csv';
import { fetchTopics, organizeTopics, getTopicsForLesson, getWatchedTopics, isQuizPassed } from '@/lib/learning';
import { BookOpen, ChevronRight, Award, Clock, Play, Lock } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

export default function LessonPage() {
  const { courseId, chapterId, lessonId } = useParams<{ courseId: string; chapterId: string; lessonId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLearningContent, setHasLearningContent] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [courseId, chapterId, lessonId, location.search]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      const [tasks, topicRows] = await Promise.all([
        fetchTasks(CSV_URL),
        fetchTopics().catch(() => [])
      ]);
      
      const courses = organizeTasks(tasks);
      const foundCourse = courses.find(c => c.id === courseId);
      
      if (!foundCourse) {
        setError('Course not found');
        return;
      }
      
      const foundChapter = foundCourse.chapters.find(ch => ch.id === chapterId);
      if (!foundChapter) {
        setError('Chapter not found');
        return;
      }
      
      const foundLesson = foundChapter.lessons.find(l => l.id === lessonId);
      if (!foundLesson) {
        setError('Lesson not found');
        return;
      }
      
      setCourse(foundCourse);
      setChapter(foundChapter);
      setLesson(foundLesson);
      
      // Check for learning content and redirect if found UNLESS the caller explicitly requested tasks view
      if (topicRows.length > 0) {
        const topics = organizeTopics(topicRows);
        const lessonTopics = getTopicsForLesson(topics, lessonId!);
        
        if (lessonTopics.length > 0) {
          setHasLearningContent(true);

          // detect override: either state or query param ?tab=tasks
          const forcedTab = (location.state as any)?.defaultTab
            || new URLSearchParams(location.search).get('tab');

          const forceTasks = forcedTab === 'tasks';


          // Only redirect if user did NOT request tasks explicitly
          if (!forceTasks) {
            navigate(`/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/learning`);
            return;
          }
          // else: do NOT navigate — stay on this page and show tasks list
        }
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lesson');
      console.error('Error loading lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCompletedTasks = (): string[] => {
    const completedKey = `course_${courseId}_completed_tasks`;
    const completed = sessionStorage.getItem(completedKey);
    return completed ? JSON.parse(completed) : [];
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50 w-screen h-screen">
        <DotLottieReact
          src="/animations/animation.lottie"
          loop
          autoplay
          style={{ width: 400, height: 400 }}
        />
      </div>
    );
  }

  if (error || !course || !chapter || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-destructive-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Lesson Not Found</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Link to="/courses">
                <PrimaryButton>Back to Courses</PrimaryButton>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const completedTaskIds = getCompletedTasks();
  const lessonProgress = calculateProgress(lesson.tasks, completedTaskIds);
  const quizPassed = isQuizPassed(lessonId!);

  // If we reach here, there's no learning content, so show tasks directly
  return (
    <div className="min-h-screen bg-background">
     
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Breadcrumb Navigation - Mobile Optimized */}
        <nav className="mb-4 sm:mb-8">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
            <Link to="/courses" className="hover:text-foreground transition-colors whitespace-nowrap">
              Courses
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <Link to={`/courses/${courseId}`} className="hover:text-foreground transition-colors whitespace-nowrap">
              {course.name}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <Link to={`/courses/${courseId}/chapters/${chapterId}`} className="hover:text-foreground transition-colors whitespace-nowrap">
              {chapter.name}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-foreground whitespace-nowrap">{lesson.name}</span>
          </div>
        </nav>

        {/* Lesson Header - Mobile Optimized */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2 sm:mb-4 leading-tight">
                {lesson.name}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Complete all tasks in this lesson to advance your healthcare skills.
              </p>
             
              {/* Lesson Progress */}
              <div className="w-full sm:max-w-md">
                <ProgressBar
                  value={lessonProgress.completionPercentage}
                  label="Lesson Progress"
                />
              </div>
            </div>
           
            {/* XP Display - Mobile Optimized */}
            <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 w-full sm:w-auto justify-center sm:justify-start text-center sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {lessonProgress.earnedXP}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                / {lessonProgress.totalXP} XP
              </div>
            </div>
          </div>

          {/* Lesson Stats - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-foreground">{lesson.tasks.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-foreground">{lessonProgress.completedTasks}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-foreground">{Math.round(lessonProgress.completionPercentage)}%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </div>

        {/* Tasks - Mobile Optimized */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-4 sm:mb-6">Lesson Tasks</h2>
         
          <div className="grid gap-4 sm:gap-6">
            {lesson.tasks.map((task, index) => {
              const isCompleted = completedTaskIds.includes(task.id);
             
              return (
                <Card
                  key={task.id}
                  variant="interactive"
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      {/* Task Content - No Number Indicator */}
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                        {/* Removed the number/checkmark circle entirely */}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm sm:text-xl mb-2 leading-tight">
                            {task.title}
                          </CardTitle>
                          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                            {task.scenario.substring(0, 120)}...
                          </p>
                         
                          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{task.xp} XP</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>~15 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                      {/* Button and Status - Mobile Optimized */}
                      <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                        <Link to={`/courses/${courseId}/chapters/${chapterId}/tasks/${task.id}`} className="w-full sm:w-auto">
                          {isCompleted ? (
                            <PrimaryButton className="w-full sm:w-auto text-sm sm:text-base px-4 py-2">
                              Review Task
                            </PrimaryButton>
                          ) : (
                             <InteractiveHoverButton
                              className="relative w-full flex items-center justify-center
                                         rounded-lg sm:rounded-xl font-semibold px-3 py-2 sm:px-4 sm:py-3
                                         bg-gray-200 text-black
                                         hover:bg-black hover:text-white
                                         transition-all duration-300 ease-in-out shadow-sm
                                         text-sm sm:text-base"
                            >
                              ㅤㅤStart Task
                            </InteractiveHoverButton>
                          )}
                        </Link>
                       
                        {isCompleted && (
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

          {/* Button to go to learning content if all tasks are complete and learning content exists */}
          {lessonProgress.completionPercentage === 100 && hasLearningContent && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <PrimaryButton
                onClick={() => navigate(`/courses/${courseId}/chapters/${chapterId}`)}
                className="w-full sm:w-auto text-sm sm:text-base px-6 py-3"
              >
                Go to Lesson Content <Play className="ml-2 h-4 w-4 sm:h-5 sm:w-5"/>
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}