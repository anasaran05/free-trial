import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton, GlowButton } from '@/components/Button';
import TaskResourceButton from '@/components/TaskResourceButton';
import { fetchTasks, organizeTasks, findTask, Task } from '@/lib/csv';
import { fetchTopics, organizeTopics, getTopicsForLesson, isQuizPassed } from '@/lib/learning';
import { BookOpen, ChevronRight, Award, CheckCircle, FileText, Lock, GraduationCap } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CSV_URL = import.meta.env.VITE_CSV_URL
  || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';
const WIX_RETURN_URL = import.meta.env.VITE_WIX_RETURN_URL || 'https://example.com/return';

export default function TaskPage() {
  const { courseId, chapterId, taskId } = useParams<{ courseId: string; chapterId: string; taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitedResources, setVisitedResources] = useState<Set<string>>(new Set());
  const [showCompleted, setShowCompleted] = useState(false);
  const [hasLearningContent, setHasLearningContent] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Compute required resource IDs based on normalized task.resources
  const requiredResourceIds = useMemo(() => {
    const set = new Set<string>();
    if (!task?.resources) return set;
    const pdfs = Array.isArray(task.resources.pdfs) ? task.resources.pdfs : [];
    const forms = Array.isArray(task.resources.forms) ? task.resources.forms : [];
    pdfs.forEach((_, i) => set.add(`pdf_${i}`));
    forms.forEach((_, i) => set.add(`form_${i}`));
    return set;
  }, [task]);

  useEffect(() => {
    loadTask();
  }, [courseId, chapterId, taskId]);

  // Check learning requirements
  useEffect(() => {
    checkLearningRequirements();
  }, [task]);

  const checkLearningRequirements = async () => {
    if (!task?.lessonId) return;
    
    try {
      const topicRows = await fetchTopics().catch(() => []);
      if (topicRows.length > 0) {
        const topics = organizeTopics(topicRows);
        const lessonTopics = getTopicsForLesson(topics, task.lessonId);
        
        if (lessonTopics.length > 0) {
          setHasLearningContent(true);
          const passed = isQuizPassed(task.lessonId);
          setQuizPassed(passed);
          
        }
      }
    } catch (error) {
      console.error('Error checking learning requirements:', error);
    }
  };

  // Load visited flags for required resources
  useEffect(() => {
    if (!taskId || requiredResourceIds.size === 0) {
      setVisitedResources(new Set());
      return;
    }
    const v = new Set<string>();
    requiredResourceIds.forEach(id => {
      const key = `task_${taskId}_resource_${id}_visited`;
      if (sessionStorage.getItem(key) === 'true') v.add(id);
    });
    setVisitedResources(v);
  }, [taskId, requiredResourceIds]);

  // Completion check
  useEffect(() => {
    if (requiredResourceIds.size === 0) {
      setShowCompleted(true);
      return;
    }
    const allVisited = Array.from(requiredResourceIds).every(id => visitedResources.has(id));
    setShowCompleted(allVisited);
  }, [visitedResources, requiredResourceIds]);

  const loadTask = async () => {
    try {
      setLoading(true);
      setError(null);

      const tasks = await fetchTasks(CSV_URL);
      const courses = organizeTasks(tasks);
      const found = findTask(courses, courseId!, chapterId!, taskId!);

      if (!found) {
        setError('Task not found');
        setTask(null);
        return;
      }

      // Defensive normalization
      const raw: any = found as any;
      const normalizeList = (v: any) => {
        if (!v && v !== '') return [];
        if (Array.isArray(v)) return v;
        if (typeof v === 'string') return v.split(';').map((s: string) => s.trim()).filter(Boolean);
        return [];
      };

      const normalized: Task = {
        ...found,
        title: (raw.title || raw.taskTitle || '') as any,
        lessonId: raw.lessonId || raw.lesson || (found as any).lessonId,
        xp: raw.xp ?? (raw.XP ? Number(raw.XP) : 0),
        resources: {
          pdfs: normalizeList(raw.resources?.pdfs ?? raw.pdfUrls ?? raw.pdfUrlsString ?? raw.pdfUrlsList),
          forms: normalizeList(raw.resources?.forms ?? raw.tallyUrls ?? raw.forms ?? raw.tallyUrlsString),
          answerKey: raw.resources?.answerKey ?? raw.answerKeyUrl ?? raw.answerKey ?? ''
        },
        instructions:
          typeof raw.instructions === 'string'
            ? raw.instructions.replace(/\\n/g, '\n')
            : (raw.instructions ?? raw.instructionsText ?? raw.instruction ?? '')
      };

      setTask(normalized);
    } catch (err) {
      console.error('Error loading task:', err);
      setError(err instanceof Error ? err.message : 'Failed to load task');
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceVisited = (resourceId: string) => {
    if (!taskId) return;
    const key = `task_${taskId}_resource_${resourceId}_visited`;
    sessionStorage.setItem(key, 'true');
    setVisitedResources(prev => {
      const next = new Set(prev);
      next.add(resourceId);
      return next;
    });
  };

  const handleTaskCompleted = () => {
    if (courseId && taskId) {
      try {
        const completedKey = `course_${courseId}_completed_tasks`;
        const completed = sessionStorage.getItem(completedKey);
        const arr = completed ? (JSON.parse(completed) as string[]) : [];

        if (!arr.includes(taskId)) {
          arr.push(taskId);
          sessionStorage.setItem(completedKey, JSON.stringify(arr));
        }

        
        navigate('/cta', { state: { courseId } });
      } catch (error) {
        console.error('Error in handleTaskCompleted:', error);
      }
    }
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

  if (error || !task) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-destructive-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Task Not Found</h3>
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

  // If learning content exists but quiz not passed, show blocker
  if (hasLearningContent && !quizPassed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/courses/${courseId}`} className="hover:text-foreground transition-colors">Course</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/courses/${courseId}/chapters/${chapterId}`} className="hover:text-foreground transition-colors">Chapter</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{task.title}</span>
            </div>
          </nav>

          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-amber-600" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Learning Required</h1>
              <p className="text-xl text-muted-foreground mb-6">
                You must complete the learning content and pass the quiz (80% or higher) before accessing this simulation task.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Learning Flow</h3>
                </div>
                <div className="text-blue-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Watch video lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Take the lesson quiz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Score 80% or higher to unlock tasks</span>
                  </div>
                </div>
              </div>

              <Link to={`/courses/${courseId}/chapters/${chapterId}/lessons/${task.lessonId}/learning`}>
                <PrimaryButton className="text-lg px-8 py-3">
                  Start Learning Journey
                </PrimaryButton>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const visitedRequiredCount = Array.from(requiredResourceIds).filter(id => visitedResources.has(id)).length;
  const requiredCount = requiredResourceIds.size;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/courses/${courseId}`} className="hover:text-foreground transition-colors">Course</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/courses/${courseId}/chapters/${chapterId}`} className="hover:text-foreground transition-colors">Chapter</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{task.title}</span>
          </div>
        </nav>

        {/* Top Content - Course, Chapter, Task Info */}
        <div className="mb-12">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">{task.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{task.xp ?? 0} XP</span>
                </div>
                {hasLearningContent && quizPassed && (
                  <div className="flex items-center gap-1 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span>Learning Requirements Met</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Desktop keeps original layout, Mobile shows Scenario + Instructions + Resources */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Scenario + Resources (Desktop), Scenario only (Mobile) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scenario Card - Always visible */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="text-4xl font-bold text-white">Scenario</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{task.scenario}</p>
              </CardContent>
            </Card>

            {/* Desktop Resources - Only show on desktop */}
            <div className="space-y-6 lg:block hidden">
              {task.resources?.pdfs?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="!text-2xl !font-bold text-white">Reference Documents</CardTitle>
                    <p className="text-muted-foreground">Review these documents before proceeding with the task.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {task.resources.pdfs.map((pdfUrl: string, index: number) => (
                      <TaskResourceButton
                        key={`pdf_${index}`}
                        title={`Document ${index + 1}`}
                        url={pdfUrl}
                        type="pdf"
                        taskId={taskId!}
                        resourceId={`pdf_${index}`}
                        required={true}
                        onVisited={handleResourceVisited}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}

              {task.resources?.forms?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <span className="text-2xl font-bold text-white">
                        Fillable Documents
                      </span>
                    </CardTitle>
                    <p className="text-muted-foreground">Complete these forms as part of your task.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {task.resources.forms.map((formUrl: string, index: number) => (
                      <TaskResourceButton
                        key={`form_${index}`}
                        title={`Form ${index + 1}`}
                        url={formUrl}
                        type="form"
                        taskId={taskId!}
                        resourceId={`form_${index}`}
                        required={true}
                        onVisited={handleResourceVisited}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}

              {task.resources?.answerKey && (
                <Card>
                  <CardHeader>
                    <CardTitle>Answer Key</CardTitle>
                    <p className="text-muted-foreground">Reference material for review (optional).</p>
                  </CardHeader>
                  <CardContent>
                    <TaskResourceButton
                      title="Answer Key"
                      url={task.resources.answerKey}
                      type="pdf"
                      taskId={taskId!}
                      resourceId="answer_key"
                      required={false}
                      onVisited={handleResourceVisited}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - Instructions + Progress (Desktop only) */}
          <div className="lg:space-y-6 hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 !text-2xl !font-bold text-white">
                  <FileText className="w-5 h-5" /> Instructions for Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {task.instructions ? (
                    task.instructions.split('\n').map((line: string, i: number) => {
                      const t = line.trim();
                      if (!t) return null;
                      return (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-primary font-medium">•</span>
                          <span>{t}</span>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Compare the versions using the provided SOP headers.</span></div>
                      <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Confirm which version should be marked "Active" based on the latest effective date.</span></div>
                      <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Fill the Document Master Register template accordingly.</span></div>
                      <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Clearly mark the older version as "Archived" and note the archive location.</span></div>
                      <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Submit the completed register to your supervisor for review.</span></div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="text-2xl font-bold text-white">
                    Task Progress
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{visitedRequiredCount}</div>
                    <div className="text-sm text-muted-foreground">/ {requiredCount} Resources Completed</div>
                  </div>

                  <div className={`
                    transition-all duration-300 ease-out
                    ${showCompleted ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2 pointer-events-none'}
                  `}>
                    <GlowButton className="w-full" icon={<CheckCircle className="w-5 h-5" />} onClick={handleTaskCompleted}>
                      Task Completed
                    </GlowButton>
                  </div>

                  {!showCompleted && (
                    <p className="text-xs text-muted-foreground text-center">Complete all required resources to finish this task</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Layout: Instructions Card - AFTER Scenario Card */}
        <div className="block lg:hidden mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 !text-2xl !font-bold text-white">
                <FileText className="w-5 h-5" /> Instructions for Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                {task.instructions ? (
                  task.instructions.split('\n').map((line: string, i: number) => {
                    const t = line.trim();
                    if (!t) return null;
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>{t}</span>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Compare the versions using the provided SOP headers.</span></div>
                    <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Confirm which version should be marked "Active" based on the latest effective date.</span></div>
                    <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Fill the Document Master Register template accordingly.</span></div>
                    <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Clearly mark the older version as "Archived" and note the archive location.</span></div>
                    <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Submit the completed register to your supervisor for review.</span></div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile: Resources Section - After Instructions */}
        <div className="block lg:hidden space-y-6 mb-8">
          {task.resources?.pdfs?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="!text-2xl !font-bold text-white">Reference Documents</CardTitle>
                <p className="text-muted-foreground">Review these documents before proceeding with the task.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {task.resources.pdfs.map((pdfUrl: string, index: number) => (
                  <TaskResourceButton
                    key={`pdf_${index}`}
                    title={`Document ${index + 1}`}
                    url={pdfUrl}
                    type="pdf"
                    taskId={taskId!}
                    resourceId={`pdf_${index}`}
                    required={true}
                    onVisited={handleResourceVisited}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {task.resources?.forms?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="text-2xl font-bold text-white">
                    Fillable Documents
                  </span>
                </CardTitle>
                <p className="text-muted-foreground">Complete these forms as part of your task.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {task.resources.forms.map((formUrl: string, index: number) => (
                  <TaskResourceButton
                    key={`form_${index}`}
                    title={`Form ${index + 1}`}
                    url={formUrl}
                    type="form"
                    taskId={taskId!}
                    resourceId={`form_${index}`}
                    required={true}
                    onVisited={handleResourceVisited}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {task.resources?.answerKey && (
            <Card>
              <CardHeader>
                <CardTitle>Answer Key</CardTitle>
                <p className="text-muted-foreground">Reference material for review (optional).</p>
              </CardHeader>
              <CardContent>
                <TaskResourceButton
                  title="Answer Key"
                  url={task.resources.answerKey}
                  type="pdf"
                  taskId={taskId!}
                  resourceId="answer_key"
                  required={false}
                  onVisited={handleResourceVisited}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mobile: Task Progress - At the bottom */}
        <div className="block lg:hidden">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-2xl font-bold text-white">
                  Task Progress
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{visitedRequiredCount}</div>
                  <div className="text-sm text-muted-foreground">/ {requiredCount} Resources Completed</div>
                </div>

                <div className={`
                  transition-all duration-300 ease-out
                  ${showCompleted ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2 pointer-events-none'}
                `}>
                  <GlowButton className="w-full" icon={<CheckCircle className="w-5 h-5" />} onClick={handleTaskCompleted}>
                    Task Completed
                  </GlowButton>
                </div>

                {!showCompleted && (
                  <p className="text-xs text-muted-foreground text-center">Complete all required resources to finish this task</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}