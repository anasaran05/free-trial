'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Joyride, { Step } from 'react-joyride';
import { useTaskOnboarding } from "@/components/onboarding/useTaskOnboarding";
import Card, { CardContent, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton, GlowButton } from '@/components/Button';
import TaskResourceButton from '@/components/TaskResourceButton';
import { fetchTasks, organizeTasks, findTask, Task } from '@/lib/csv';
import { fetchTopics, organizeTopics, getTopicsForLesson, isQuizPassed } from '@/lib/learning';
import { BookOpen, ChevronRight, Award, CheckCircle, FileText, Lock, GraduationCap } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ToolsPanel from '@/Tools/ToolsPanel.tsx';
import { getCourseBySlug } from '@/lib/csv';

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

export default function TaskPage() {
const { courseSlug, chapterId, taskId } = useParams<{ courseSlug: string; chapterId: string; taskId: string }>();
  const navigate = useNavigate();

  const email = localStorage.getItem("omega_email")?.trim() || null;
  const { run: rawRun, steps, handleFinish } = useTaskOnboarding(email);
  const [run, setRun] = useState(false);

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitedResources, setVisitedResources] = useState<Set<string>>(new Set());
  const [showCompleted, setShowCompleted] = useState(false);
  const [hasLearningContent, setHasLearningContent] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  
  // Track screen size purely for Tour Logic
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Immediate check
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- JOYRIDE LOGIC START ---
  
  // 1. Dynamic Steps: Automatically append -mobile or -desktop to targets
  // This ensures Joyride looks for the EXACT ID that is currently visible
  const tourSteps = useMemo(() => {
    const suffix = isMobile ? '-mobile' : '-desktop';
    
    // List of targets that have duplicate views (Mobile/Desktop)
    const responsiveTargets = [
      'reference-documents-card',
      'fillable-documents-card',
      'first-resource-btn',
      'answer-key-card',
      'progress-card',
      'complete-task-btn'
    ];

    return steps.map((step) => {
      // Extract the raw ID from the selector (e.g. "[data-tour='xyz']" -> "xyz")
      const cleanTarget = (typeof step.target === 'string' ? step.target : '')
        .replace('[data-tour="', '')
        .replace('"]', '');

      if (responsiveTargets.includes(cleanTarget)) {
        return {
          ...step,
          target: `[data-tour="${cleanTarget}${suffix}"]`,
        };
      }
      return step;
    });
  }, [steps, isMobile]);

  // 2. Safe Start: Poll the DOM to ensure elements exist before running
  useEffect(() => {
    if (rawRun && task && !loading) {
      const intervalId = setInterval(() => {
        // We check if the KEY elements are actually in the DOM
        const scenario = document.querySelector('[data-tour="scenario-card"]');
        // We check one responsive element based on current view
        const suffix = window.innerWidth < 1024 ? '-mobile' : '-desktop';
        const progress = document.querySelector(`[data-tour="progress-card${suffix}"]`);

        if (scenario && progress) {
          console.log("Joyride Targets Found - Starting Tour");
          setRun(true);
          clearInterval(intervalId);
        }
      }, 500); // Check every 500ms

      // Timeout after 5 seconds to stop checking
      const timeoutId = setTimeout(() => clearInterval(intervalId), 5000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [rawRun, task, loading]);

  // --- JOYRIDE LOGIC END ---

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
  }, [courseSlug, chapterId, taskId]);

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

  useEffect(() => {
    if (requiredResourceIds.size === 0) {
      setShowCompleted(true);
      return;
    }
    const allVisited = Array.from(requiredResourceIds).every(id => visitedResources.has(id));
    setShowCompleted(allVisited);
  }, [visitedResources, requiredResourceIds]);

  const [scenarioText, deliverablesText] = useMemo(() => {
    if (!task?.scenario) return ["", ""];
    const parts = task.scenario.split(/Deliverables/i);
    return parts.length > 1
      ? [parts[0].trim(), parts.slice(1).join("Deliverables").trim()]
      : [task.scenario.trim(), ""];
  }, [task?.scenario]);

  const loadTask = async () => {
    try {
      setLoading(true);
      setError(null);

      const tasks = await fetchTasks(CSV_URL);
      const courses = organizeTasks(tasks);
     const course = getCourseBySlug(courseSlug!);
if (!course) {
  setError('Course not found');
  return;
}

const found = findTask(courses, course.id, chapterId!, taskId!);

      if (!found) {
        setError('Task not found');
        setTask(null);
        return;
      }

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
    if (courseSlug && taskId) {
      try {
        const completedKey = `course_${courseSlug}_completed_tasks`;
        const completed = sessionStorage.getItem(completedKey);
        const arr = completed ? (JSON.parse(completed) as string[]) : [];

        if (!arr.includes(taskId)) {
          arr.push(taskId);
          sessionStorage.setItem(completedKey, JSON.stringify(arr));
        }

        navigate('/cta', { state: { courseSlug } });
      } catch (error) {
        console.error('Error in handleTaskCompleted:', error);
      }
    }
  };

  const visitedRequiredCount = Array.from(requiredResourceIds).filter(id => visitedResources.has(id)).length;
  const requiredCount = requiredResourceIds.size;

  return (
    <>
      {/* Pass tourSteps (dynamic) instead of static steps */}
      {!loading && task && run && tourSteps.length > 0 && (
        <Joyride
          run={run}
          steps={tourSteps}
          continuous
          showSkipButton
          scrollToFirstStep
          scrollOffset={120}
          scrollDuration={800}
          callback={handleFinish}
          disableScrolling={false}
          hideCloseButton
          spotlightPadding={10}
          floaterProps={{ disableAnimation: true }}
          styles={{
            options: {
              zIndex: 10000,
              primaryColor: '#6C63FF',
              backgroundColor: '#0d0d0d',
              textColor: '#ffffff',
              arrowColor: '#0d0d0d',
            },
            tooltip: { borderRadius: '12px', padding: '20px' },
            buttonNext: { backgroundColor: '#6C63FF', borderRadius: '8px' },
          }}
          locale={{ skip: 'Skip Tour', last: 'Finish' }}
        />
      )}

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 w-screen h-screen">
          <DotLottieReact src="/animations/animation.lottie" loop autoplay style={{ width: 200, height: 200 }} />
        </div>
      ) : error || !task ? (
        <div className="min-h-screen bg-background">
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
      ) : hasLearningContent && !quizPassed ? (
        <div className="min-h-screen bg-background">
          {/* Learning content screen (omitted for brevity, assume unchanged) */}
           <div className="container mx-auto px-4 py-12">
            <nav className="mb-8">
              {/* Breadcrumbs for locked state */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link>
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
                <Link to={`/courses/${courseSlug}/chapters/${chapterId}/lessons/${task.lessonId}/learning`}>
                  <PrimaryButton className="text-lg px-8 py-3">Start Learning Journey</PrimaryButton>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-12">
            <nav className="mb-8" data-tour="breadcrumb">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to={`/courses/${courseSlug}`} className="hover:text-foreground transition-colors">Course</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to={`/courses/${courseSlug}/chapters/${chapterId}`} className="hover:text-foreground transition-colors">Chapter</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">{task.title}</span>
              </div>
            </nav>

            {/* Tools Panel */}
            <div className="mb-8 flex items-center gap-3">
              <div data-tour="tools-panel">
                <ToolsPanel courseId={courseSlug} lessonId={task?.lessonId} />
              </div>
            </div>

            {/* Task Title */}
            <div className="mb-12">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-heading font-bold text-foreground mb-4" data-tour="task-title">
                    {task.title}
                  </h1>
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

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Scenario - Always Visible */}
                <Card data-tour="scenario-card">
                  <CardHeader>
                    <CardTitle><span className="text-4xl font-bold text-white">Scenario</span></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed whitespace-pre-line mb-6">{scenarioText}</p>
                    {deliverablesText && (
                      <div className="mt-8">
                        <h3 className="text-3xl font-bold text-gray-200 mb-4">Deliverables</h3>
                        <div className="space-y-3 text-foreground">
                          {deliverablesText.split('\n').map(line => line.trim()).filter(Boolean).map((line, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-white font-medium mt-0.5">•</span>
                              <span className="leading-relaxed">{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* DESKTOP RESOURCES: Added -desktop suffix */}
                <div className="space-y-6 lg:block hidden">
                  {task.resources?.pdfs?.length > 0 && (
                    <Card data-tour="reference-documents-card-desktop">
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
                            data-tour={index === 0 ? "first-resource-btn-desktop" : undefined}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {task.resources?.forms?.length > 0 && (
                    <Card data-tour="fillable-documents-card-desktop">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">Fillable Documents</CardTitle>
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
                    <Card data-tour="answer-key-card-desktop">
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

              {/* Desktop Right Sidebar */}
              <div className="lg:space-y-6 hidden lg:block">
                <Card data-tour="instructions-card">
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
                          {/* Fallback instructions */}
                          <div className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>Complete instructions not available.</span></div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* DESKTOP PROGRESS: Added -desktop suffix */}
                <Card data-tour="progress-card-desktop">
                  <CardHeader>
                    <CardTitle><span className="text-2xl font-bold text-white">Task Progress</span></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{visitedRequiredCount}</div>
                        <div className="text-sm text-muted-foreground">/ {requiredCount} Resources Completed</div>
                      </div>
                      <div className={`transition-all duration-300 ease-out ${showCompleted ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                        <GlowButton 
                          className="w-full" 
                          icon={<CheckCircle className="w-5 h-5" />} 
                          onClick={handleTaskCompleted} 
                          data-tour="complete-task-btn-desktop"
                        >
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

            {/* MOBILE: Instructions */}
            <div className="block lg:hidden mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 !text-2xl !font-bold text-white">
                    <FileText className="w-5 h-5" /> Instructions for Completion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                     {/* Mobile Instructions content same as desktop... */}
                     {task.instructions ? (
                        task.instructions.split('\n').map((line: string, i: number) => (
                           <div key={i} className="flex items-start gap-2"><span className="text-primary font-medium">•</span><span>{line.trim()}</span></div>
                        ))
                     ) : null}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* MOBILE RESOURCES: Added -mobile suffix */}
            <div className="block lg:hidden space-y-6 mb-8">
              {task.resources?.pdfs?.length > 0 && (
                <Card data-tour="reference-documents-card-mobile">
                  <CardHeader>
                    <CardTitle className="!text-2xl !font-bold text-white">Reference Documents</CardTitle>
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
                        data-tour={index === 0 ? "first-resource-btn-mobile" : undefined}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}

              {task.resources?.forms?.length > 0 && (
                <Card data-tour="fillable-documents-card-mobile">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">Fillable Documents</CardTitle>
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
                <Card data-tour="answer-key-card-mobile">
                  <CardHeader>
                    <CardTitle>Answer Key</CardTitle>
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

            {/* MOBILE PROGRESS: Added -mobile suffix */}
            <div className="block lg:hidden">
              <Card data-tour="progress-card-mobile">
                <CardHeader>
                  <CardTitle><span className="text-2xl font-bold text-white">Task Progress</span></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{visitedRequiredCount}</div>
                      <div className="text-sm text-muted-foreground">/ {requiredCount} Resources Completed</div>
                    </div>
                    <div className={`transition-all duration-300 ease-out ${showCompleted ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                      <GlowButton 
                        className="w-full" 
                        icon={<CheckCircle className="w-5 h-5" />} 
                        onClick={handleTaskCompleted} 
                        data-tour="complete-task-btn-mobile"
                      >
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
      )}
    </>
  );
}