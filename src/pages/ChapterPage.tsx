import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton } from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { fetchTasks, organizeTasks, Course, Chapter, calculateProgress, getCompletedTasks } from '@/lib/csv';
import { BookOpen, ChevronRight, Award, Clock } from 'lucide-react';

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRrzHdNL8FRSooYojNPyBU2f66Tgr-DgwA6xB_HAK-azRx_s8PvbKUwzO5OzjzVdPGw-qeNOl68Asx6/pub?output=csv';

export default function ChapterPage() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChapter();
  }, [courseId, chapterId]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      const tasks = await fetchTasks(CSV_URL);
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
      
      setCourse(foundCourse);
      setChapter(foundChapter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load chapter');
      console.error('Error loading chapter:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get completed tasks for a specific lesson
  const getLessonCompletedTasks = (lesson: any): string[] => {
    const allCompletedTasks = getCompletedTasks(courseId!);
    const lessonTaskIds = lesson.tasks.map((task: any) => task.id);
    
    // Only return completed tasks that actually belong to this lesson
    return allCompletedTasks.filter(taskId => lessonTaskIds.includes(taskId));
  };

if (loading) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Header />
      
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-45" style={{animationDelay: '0.5s', animationDuration: '2.8s'}}></div>
      </div>
      
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          {/* Large spinning ring with gradient effect */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-8 border-muted opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-pink-500 animate-spin"></div>
            <div className="absolute inset-4 rounded-full border-6 border-transparent border-b-purple-500 border-l-yellow-500 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            <div className="absolute inset-8 rounded-full border-4 border-transparent border-t-green-500 animate-spin" style={{animationDuration: '0.8s'}}></div>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-bold text-foreground mb-2 animate-pulse">Loading your courses...</p>
            <p className="text-sm text-muted-foreground animate-bounce">🎌 Preparing your anime learning adventure!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

  if (error || !course || !chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-destructive-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Chapter Not Found</h3>
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

  const completedTaskIds = getCompletedTasks(courseId!);
  const allChapterTasks = chapter.lessons.flatMap(l => l.tasks);
  const chapterProgress = calculateProgress(allChapterTasks, completedTaskIds);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/courses/${courseId}`} className="hover:text-foreground transition-colors">
              {course.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{chapter.name}</span>
          </div>
        </nav>

        {/* Chapter Header */}
        <div className="mb-12">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                {chapter.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Complete all lessons in this chapter to advance your healthcare administration skills.
              </p>
              
              {/* Chapter Progress */}
              <div className="max-w-md">
                <ProgressBar
                  value={chapterProgress.completionPercentage}
                  label="Chapter Progress"
                />
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-primary mb-1">
                {chapterProgress.earnedXP}
              </div>
              <div className="text-sm text-muted-foreground">
                / {chapterProgress.totalXP} XP
              </div>
            </div>
          </div>

          {/* Chapter Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{chapter.lessons.length}</div>
              <div className="text-sm text-muted-foreground">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{chapterProgress.completedTasks}</div>
              <div className="text-sm text-muted-foreground">Completed Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{Math.round(chapterProgress.completionPercentage)}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          Lessons
          </h2>
          
          <div className="grid gap-6">
            {chapter.lessons.map((lesson, index) => {
              // FIXED: Only use completed tasks that belong to this specific lesson
              const lessonCompletedTasks = getLessonCompletedTasks(lesson);
              const lessonProgress = calculateProgress(lesson.tasks, lessonCompletedTasks);
              
              return (
                <Card 
                  key={lesson.id}
                  variant="interactive"
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`
                          w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold
                          ${lessonProgress.completedTasks === lesson.tasks.length
                            ? 'bg-success text-success-foreground' 
                            : 'bg-surface text-muted-foreground'
                          }
                        `}>
                          {lessonProgress.completedTasks === lesson.tasks.length ? '✓' : index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {lesson.name}
                          </CardTitle>
                          <p className="text-muted-foreground mb-4">
                            {lesson.tasks.length} tasks • {lesson.tasks.reduce((sum, task) => sum + task.xp, 0)} XP
                          </p>
                          
                          <div className="max-w-md mb-4">
                            <ProgressBar
                              value={lessonProgress.completionPercentage}
                              label="Lesson Progress"
                              size="sm"
                            />
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span>{lessonProgress.earnedXP}/{lessonProgress.totalXP} XP</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>~{lesson.tasks.length * 15} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Link to={`/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}`}>
                          <PrimaryButton>
                            {lessonProgress.completedTasks > 0 ? 'Continue Lesson' : 'Start Lesson'}
                          </PrimaryButton>
                        </Link>
                        
                        {lessonProgress.completedTasks === lesson.tasks.length && (
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
    </div>
  );
}