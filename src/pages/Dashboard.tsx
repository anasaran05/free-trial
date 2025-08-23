import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { PrimaryButton } from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import { Activity, BookOpen, Clock, Award, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProgressData {
  CourseId: string;
  ChapterId: string;
  LessonId: string;
  QuizScore?: number;
  SimulationUnlocked?: boolean;
  TaskId: string;
  TaskCompleted?: boolean;
  LessonCompleted?: boolean;
}

interface OptimisticUpdate {
  id: string;
  data: ProgressData;
  pending: boolean;
  error?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [optimisticUpdates, setOptimisticUpdates] = useState<OptimisticUpdate[]>([]);

  // Debounced write queue
  const [writeQueue, setWriteQueue] = useState<ProgressData[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        loadProgress(session.user.id);
      } else {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProgress(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Process write queue with debouncing
  useEffect(() => {
    const processQueue = async () => {
      if (writeQueue.length === 0 || isProcessingQueue || !user) return;

      setIsProcessingQueue(true);
      
      try {
        // Batch write operations
        const uniqueUpdates = writeQueue.reduce((acc, item) => {
          const key = `${item.CourseId}_${item.ChapterId}_${item.TaskId}`;
          acc[key] = item; // Last write wins
          return acc;
        }, {} as Record<string, ProgressData>);

        for (const progressItem of Object.values(uniqueUpdates)) {
          await writeProgress(user.id, progressItem);
        }

        // Clear processed items from queue
        setWriteQueue([]);
        
        // Clear completed optimistic updates
        setOptimisticUpdates(prev => 
          prev.filter(update => update.pending)
        );

      } catch (error) {
        console.error('Error processing write queue:', error);
        toast.error('Failed to sync progress data');
        
        // Mark optimistic updates as errored
        setOptimisticUpdates(prev =>
          prev.map(update => ({
            ...update,
            pending: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          }))
        );
      } finally {
        setIsProcessingQueue(false);
      }
    };

    const debounceTimer = setTimeout(processQueue, 2000); // 2 second debounce
    return () => clearTimeout(debounceTimer);
  }, [writeQueue, isProcessingQueue, user]);

  const loadProgress = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`/functions/v1/sheets-progress/api/progress/${userId}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load progress');
      }

      const result = await response.json();
      setProgressData(result.data || []);
      
    } catch (err) {
      console.error('Error loading progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to load progress');
      toast.error('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const writeProgress = async (userId: string, data: ProgressData) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`/functions/v1/sheets-progress/api/progress/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update progress');
    }

    return response.json();
  };

  const updateProgress = useCallback((data: ProgressData) => {
    if (!user) return;

    const updateId = `${data.CourseId}_${data.ChapterId}_${data.TaskId}_${Date.now()}`;

    // Optimistic UI update
    setOptimisticUpdates(prev => [...prev, {
      id: updateId,
      data,
      pending: true
    }]);

    // Update local state immediately
    setProgressData(prev => {
      const existingIndex = prev.findIndex(
        item => item.CourseId === data.CourseId && 
                item.ChapterId === data.ChapterId && 
                item.TaskId === data.TaskId
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...data };
        return updated;
      } else {
        return [...prev, data];
      }
    });

    // Add to write queue
    setWriteQueue(prev => [...prev, data]);

    toast.success('Progress updated!');
  }, [user]);

  const handleTaskCompletion = useCallback((courseId: string, chapterId: string, lessonId: string, taskId: string) => {
    updateProgress({
      CourseId: courseId,
      ChapterId: chapterId,
      LessonId: lessonId,
      TaskId: taskId,
      TaskCompleted: true
    });
  }, [updateProgress]);

  const handleLessonCompletion = useCallback((courseId: string, chapterId: string, lessonId: string) => {
    updateProgress({
      CourseId: courseId,
      ChapterId: chapterId,
      LessonId: lessonId,
      TaskId: `lesson_${lessonId}`,
      LessonCompleted: true
    });
  }, [updateProgress]);

  const rollbackOptimisticUpdate = useCallback((updateId: string) => {
    setOptimisticUpdates(prev => prev.filter(update => update.id !== updateId));
    // In a real app, you'd also revert the local state
    toast.info('Change rolled back');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Please Sign In</h3>
              <p className="text-muted-foreground mb-4">You need to be signed in to view your progress.</p>
              <PrimaryButton>
                Sign In
              </PrimaryButton>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-destructive-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Progress</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <PrimaryButton onClick={() => loadProgress(user.id)}>
                Try Again
              </PrimaryButton>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Calculate overall statistics
  const totalTasks = progressData.length;
  const completedTasks = progressData.filter(item => item.TaskCompleted).length;
  const completedLessons = progressData.filter(item => item.LessonCompleted).length;
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Progress Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
              <ProgressBar value={overallProgress} size="sm" className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">out of {totalTasks} total tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessons}</div>
              <p className="text-xs text-muted-foreground">lessons finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Demo Progress Actions</CardTitle>
            <CardDescription>
              Test the progress tracking system with these sample actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <PrimaryButton 
                onClick={() => handleTaskCompletion("course1", "chapter1", "lesson1", "task1")}
                size="sm"
              >
                Complete Sample Task 1
              </PrimaryButton>
              
              <PrimaryButton 
                onClick={() => handleTaskCompletion("course1", "chapter1", "lesson1", "task2")}
                size="sm"
              >
                Complete Sample Task 2
              </PrimaryButton>
              
              <PrimaryButton 
                onClick={() => handleLessonCompletion("course1", "chapter1", "lesson1")}
                size="sm"
              >
                Complete Sample Lesson
              </PrimaryButton>
            </div>
          </CardContent>
        </Card>

        {/* Progress Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Details</CardTitle>
            <CardDescription>
              Your detailed progress across all courses and tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            {progressData.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Progress Data</h3>
                <p className="text-muted-foreground">
                  Start completing tasks to see your progress here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Course</th>
                      <th className="text-left p-2 font-medium">Chapter</th>
                      <th className="text-left p-2 font-medium">Lesson</th>
                      <th className="text-left p-2 font-medium">Task</th>
                      <th className="text-left p-2 font-medium">Task Status</th>
                      <th className="text-left p-2 font-medium">Lesson Status</th>
                      <th className="text-left p-2 font-medium">Quiz Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progressData.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.CourseId}</td>
                        <td className="p-2">{item.ChapterId}</td>
                        <td className="p-2">{item.LessonId}</td>
                        <td className="p-2">{item.TaskId}</td>
                        <td className="p-2">
                          {item.TaskCompleted ? (
                            <span className="text-success flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Pending</span>
                          )}
                        </td>
                        <td className="p-2">
                          {item.LessonCompleted ? (
                            <span className="text-success flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Pending</span>
                          )}
                        </td>
                        <td className="p-2">{item.QuizScore || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Optimistic Updates Status */}
        {optimisticUpdates.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm">Pending Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {optimisticUpdates.map((update) => (
                  <div key={update.id} className="flex items-center justify-between text-sm">
                    <span>
                      {update.data.CourseId} / {update.data.TaskId}
                    </span>
                    <div className="flex items-center gap-2">
                      {update.pending ? (
                        <span className="text-muted-foreground">Syncing...</span>
                      ) : update.error ? (
                        <>
                          <span className="text-destructive">{update.error}</span>
                          <button 
                            onClick={() => rollbackOptimisticUpdate(update.id)}
                            className="text-xs text-primary hover:underline"
                          >
                            Rollback
                          </button>
                        </>
                      ) : (
                        <span className="text-success">Synced</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <Link to="/courses">
            <PrimaryButton>
              Back to Courses
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}