import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, BookOpen, Award, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import {
  fetchTopics,
  fetchQuiz,
  organizeTopics,
  organizeQuiz,
  getTopicsForLesson,
  getQuizForLesson,
  getWatchedTopics,
  markTopicWatched,
  getQuizScore,
  setQuizScore,
  isQuizPassed,
  setQuizPassed,
  Topic,
  QuizQuestion
} from "@/lib/learning";
import { fetchTasks, organizeTasks, findLesson } from "@/lib/csv";

const CSV_URL = import.meta.env.VITE_CSV_URL || 'https://raw.githubusercontent.com/anasaran05/zane-omega/refs/heads/main/public/data/freetrail-task%20-%20Sheet1.csv';

export default function LearningPage() {
  const { courseId, chapterId, lessonId, topicId } = useParams<{
    courseId: string;
    chapterId: string;
    lessonId: string;
    topicId?: string;
  }>();
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessonName, setLessonName] = useState<string>('');
  
  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScoreState] = useState(0);
  
  useEffect(() => {
    loadLearningData();
  }, [courseId, chapterId, lessonId, topicId]);

  const loadLearningData = async () => {
    if (!courseId || !chapterId || !lessonId) return;
    
    try {
      setLoading(true);
      setError(null);
      const startTime = Date.now(); // Track loading start time
      
      console.log('🔄 Loading learning data for:', { courseId, chapterId, lessonId });
      
      // Load topics and quiz data
      const [topicRows, quizRows, taskRows] = await Promise.all([
        fetchTopics(),
        fetchQuiz(),
        fetchTasks(CSV_URL)
      ]);
      
      console.log('📊 Raw topics loaded:', topicRows.length);
      console.log('📊 Raw quiz loaded:', quizRows.length);
      
      const allTopics = organizeTopics(topicRows);
      const allQuiz = organizeQuiz(quizRows);
      const courses = organizeTasks(taskRows);
      
      console.log('📊 Organized topics:', allTopics.length);
      console.log('📊 Organized quiz:', allQuiz.length);
      
      // Filter for current lesson
      const lessonTopics = getTopicsForLesson(allTopics, lessonId);
      const lessonQuiz = getQuizForLesson(allQuiz, lessonId);
      
      console.log('📊 Topics for lesson:', lessonTopics.length, lessonId);
      console.log('📊 Quiz for lesson:', lessonQuiz.length, lessonId);
      
      // Get lesson name
      const lesson = findLesson(courses, courseId, chapterId, lessonId);
      console.log('📊 Found lesson:', lesson?.name);
      
      if (lesson) {
        setLessonName(lesson.name);
      } else {
        console.warn('⚠️ Lesson not found in tasks CSV');
        setLessonName('Unknown Lesson');
      }
      
      setTopics(lessonTopics);
      setQuizQuestions(lessonQuiz);
      
      // Check if quiz was already completed
      const existingScore = getQuizScore(lessonId);
      if (existingScore !== null) {
        setQuizScoreState(existingScore);
        setQuizCompleted(true);
        console.log('📊 Quiz already completed with score:', existingScore);
      }
      
      // Set current topic
      if (topicId) {
        const topic = lessonTopics.find(t => t.id === topicId);
        if (topic) {
          console.log('📺 Setting current topic:', topic.title);
          setCurrentTopic(topic);
          markTopicWatched(lessonId, topicId);
        } else {
          console.warn('⚠️ Topic not found:', topicId);
        }
      } else if (lessonTopics.length > 0) {
        console.log('📺 Setting first topic:', lessonTopics[0].title);
        setCurrentTopic(lessonTopics[0]);
      } else {
        console.warn('⚠️ No topics found for lesson:', lessonId);
        setCurrentTopic(null);
      }
      
      if (lessonTopics.length === 0 && lessonQuiz.length === 0) {
        setError(`No learning content found for lesson: ${lessonId}. Please check the topics and quiz CSV files.`);
      }
      
      // Calculate elapsed time and ensure minimum loading duration
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 2000; // 2 seconds
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      // Wait for remaining time if needed
      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
      
    } catch (err) {
      console.error('❌ Error loading learning data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load learning data');
      console.error("Error loading learning data:", err);
     
      // Still respect minimum loading time even on error
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleTopicSelect = async (topic: Topic) => {
    console.log('🎯 Topic selected:', topic.title);
    setCurrentTopic(topic);
    if (lessonId && topic.id) {
      markTopicWatched(lessonId, topic.id);
      // Check if all topics are now watched
      const updatedWatchedTopics = getWatchedTopics(lessonId);
      if (updatedWatchedTopics.length === topics.length && topics.length > 0) {
        // All topics watched - sync learning completion
        try {
          if (courseId && chapterId && lessonId) {
            // You can implement syncLearningDone here if needed
            console.log('✅ All topics completed');
          }
        } catch (error) {
          console.error('⚠️ Failed to sync learning completion:', error);
        }
      }
      window.dispatchEvent(new Event("progress:updated")); // 🔥 notify chapter
    }
    navigate(`/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/learning/${topic.id}`);
  };

  const handleQuizStart = () => {
    console.log('🎓 Starting quiz');
    setShowQuiz(true);
    setCurrentQuizQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuizQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    console.log('✅ Answer selected:', answerIndex, 'for question:', currentQuizQuestion);
  };

  const handleNextQuestion = async () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Calculate final score
      let correct = 0;
      selectedAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctIndex) {
          correct++;
        }
      });
      const scorePercentage = (correct / quizQuestions.length) * 100;
      const passed = scorePercentage >= 80;
      
      console.log('📊 Quiz completed. Score:', scorePercentage, 'Passed:', passed);
      
      setQuizScoreState(scorePercentage);
      setQuizScore(lessonId!, scorePercentage);
      setQuizPassed(lessonId!, passed);
      setQuizCompleted(true);
      
      toast({
        title: passed ? "🎉 Quiz Passed!" : "📚 Quiz Not Passed",
        description: passed 
          ? "Congratulations! You can now access the simulation tasks."
          : "You need 80% to pass. You can retake the quiz anytime.",
      });

      try {
        // Notify chapter page to update progress
        window.dispatchEvent(new Event("progress:updated"));
      } catch (err) {
        console.error("❌ Error in quiz completion:", err);
      }
    }
  };

  const handleStartSimulation = async () => {
    try {
      console.log('🚀 Starting simulation');
      // Load tasks to find the first task for this lesson
      const taskRows = await fetchTasks(CSV_URL);
      const courses = organizeTasks(taskRows);
      const lesson = findLesson(courses, courseId!, chapterId!, lessonId!);
      
      if (lesson && lesson.tasks.length > 0) {
        // Use route state (preferred)
        navigate(
          `/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
          { state: { defaultTab: 'tasks', from: 'quiz' } }
        );
      } else {
        toast({
          title: "No Tasks Available",
          description: "No simulation tasks found for this lesson.",
        });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load simulation tasks.",
      });
    }
  };

  const watchedTopics = getWatchedTopics(lessonId || '');
  const isQuizUnlocked = topics.length > 0 && watchedTopics.length === topics.length;
  const isPassed = isQuizPassed(lessonId || '');

  // Debug info for development
  console.log('📋 Current state:', {
    topicsCount: topics.length,
    quizCount: quizQuestions.length,
    currentTopic: currentTopic?.title,
    watchedTopics,
    isQuizUnlocked,
    lessonId
  });

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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-destructive-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Learning Content Not Found</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="space-y-2 mb-4">
                <p className="text-xs text-muted-foreground">Debug info:</p>
                <p className="text-xs text-muted-foreground">Course: {courseId}</p>
                <p className="text-xs text-muted-foreground">Chapter: {chapterId}</p>
                <p className="text-xs text-muted-foreground">Lesson: {lessonId}</p>
              </div>
              <Link to={`/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`}>
                <Button>Back to Lesson</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showQuiz && !quizCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb Navigation for Quiz */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:text-foreground transition-colors">
                Courses
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/courses/${courseId}`} className="hover:text-foreground transition-colors">
                Course
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/courses/${courseId}/chapters/${chapterId}`} className="hover:text-foreground transition-colors">
                Chapter
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`} className="hover:text-foreground transition-colors">
                {lessonName}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Quiz</span>
            </div>
          </nav>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Lesson Quiz - {lessonName}</span>
                  <Badge variant="outline">
                    {currentQuizQuestion + 1} / {quizQuestions.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Progress value={((currentQuizQuestion + 1) / quizQuestions.length) * 100} />
                 
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {quizQuestions[currentQuizQuestion]?.question || 'Question not available'}
                    </h3>
                   
                    <div className="space-y-3">
                      {quizQuestions[currentQuizQuestion]?.options.map((option, index) => (
                        <div
                          key={index}
                          className={`w-full p-4 rounded-md border cursor-pointer transition-colors min-h-[3rem] ${
                            selectedAnswers[currentQuizQuestion] === index
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background border-border hover:bg-accent hover:text-accent-foreground'
                          }`}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          <div className="text-left break-words whitespace-normal leading-relaxed">
                            {option}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setShowQuiz(false)}
                    >
                      Back to Learning
                    </Button>
                   
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswers[currentQuizQuestion] === undefined}
                    >
                      {currentQuizQuestion === quizQuestions.length - 1 ? "Complete Quiz" : "Next Question"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
     
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation for Learning */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/courses/${courseId}`} className="hover:text-foreground transition-colors">
              Course
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/courses/${courseId}/chapters/${chapterId}`} className="hover:text-foreground transition-colors">
              Chapter
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`} className="hover:text-foreground transition-colors">
              {lessonName}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Learning</span>
          </div>
        </nav>

        {topics.length === 0 && quizQuestions.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Learning Content</h3>
              <p className="text-muted-foreground mb-4">
                No topics or quiz questions found for this lesson. Please check the CSV data files.
              </p>
              <div className="text-xs text-muted-foreground mb-4">
                <p>Looking for: {lessonId}</p>
                <p>Topics found: {topics.length}</p>
                <p>Quiz questions found: {quizQuestions.length}</p>
              </div>
              <Link to={`/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`}>
                <Button>Back to Lesson</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {/* Video Player */}
              <Card>
                <CardContent className="p-0">
                  {currentTopic?.youtubeId ? (
                    <>
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${currentTopic.youtubeId}?modestbranding=1&controls=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&end=${Math.floor(Math.random() * 1000) + 1}`}
                          title={currentTopic.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-t-lg"
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">{currentTopic.title}</h2>
                        <p className="text-muted-foreground">{currentTopic.description}</p>
                      </div>
                    </>
                  ) : currentTopic ? (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <div className="text-center p-6">
                        <Play className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{currentTopic.title}</h3>
                        <p className="text-muted-foreground mb-4">{currentTopic.description}</p>
                        <p className="text-sm text-destructive">Video URL not available</p>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Please select a topic to begin learning</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quiz Results - Desktop View (hidden on mobile) */}
              {quizCompleted && (
                <Card className="mt-6 hidden lg:block">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Quiz Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Your Score:</span>
                        <Badge variant={isPassed ? "default" : "destructive"}>
                          {quizScore}%
                        </Badge>
                      </div>
                      <Progress value={quizScore} />
                     
                      <div className="space-y-4">
                        {isPassed ? (
                          <>
                            <p className="text-success">Congratulations! You passed the quiz.</p>
                            <Button onClick={handleStartSimulation} className="w-full">
                              Start Workplace Simulation
                            </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-destructive">You need 80% to pass. Try again!</p>
                            <Button onClick={handleQuizStart} variant="outline" className="w-full">
                              Retake Quiz
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Topics List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Topics ({topics.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {topics.length > 0 ? (
                    <div className="space-y-2">
                      {topics.map((topic) => (
                        <Button
                          key={topic.id}
                          variant={currentTopic?.id === topic.id ? "default" : "ghost"}
                          className="w-full justify-start text-left h-auto p-3 whitespace-normal break-words"
                          onClick={() => handleTopicSelect(topic)}
                        >
                          <div className="flex items-start gap-3">
                            {watchedTopics.includes(topic.id) ? (
                              <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            ) : (
                              <Play className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="font-medium break-words text-sm">{topic.title}</div>
                              <div className="text-xs text-muted-foreground">
                                Topic {topic.order} • {topic.youtubeId ? 'Video Available' : 'Reading Only'}
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-4">No topics available</p>
                  )}
                </CardContent>
              </Card>

              {/* Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Topics Completed</span>
                        <span>{watchedTopics.length}/{topics.length}</span>
                      </div>
                      <Progress value={topics.length > 0 ? (watchedTopics.length / topics.length) * 100 : 0} />
                    </div>

                    {topics.length > 0 ? (
                      isQuizUnlocked ? (
                        <Button 
                          onClick={handleQuizStart} 
                          className="w-full"
                          disabled={showQuiz}
                        >
                          {quizCompleted ? "Retake Quiz" : "Take Quiz"}
                        </Button>
                      ) : (
                        <Button disabled className="w-full">
                          Complete All Topics to Unlock Quiz
                        </Button>
                      )
                    ) : (
                      <Button disabled className="w-full">
                        No Quiz Available
                      </Button>
                    )}

                    {isPassed && (
                      <div className="text-center">
                        <Badge className="mb-2" variant="default">Quiz Passed!</Badge>
                        <p className="text-sm text-muted-foreground">
                          You can now access simulation tasks
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quiz Results - Mobile View (at bottom, only visible on mobile) */}
        {quizCompleted && (
          <Card className="mt-6 lg:hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Quiz Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Your Score:</span>
                  <Badge variant={isPassed ? "default" : "destructive"}>
                    {quizScore}%
                  </Badge>
                </div>
                <Progress value={quizScore} />
               
                <div className="space-y-4">
                  {isPassed ? (
                    <>
                      <p className="text-success">Congratulations! You passed the quiz.</p>
                      <Button onClick={handleStartSimulation} className="w-full">
                        Start Workplace Simulation
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-destructive">You need 80% to pass. Try again!</p>
                      <Button onClick={handleQuizStart} variant="outline" className="w-full">
                        Retake Quiz
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}