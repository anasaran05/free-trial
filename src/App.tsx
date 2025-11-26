import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursesIndex from "./pages/CoursesIndex";        // List of all courses
import ChaptersPage from "./pages/ChaptersPage";          // ← This shows chapters (correct name!)
import LessonPage from "./pages/LessonPage";           // ← This shows lessons in a chapter
import TaskListPage from "./pages/TaskListPage";          // ← This shows tasks in a lesson
import LearningPage from "./pages/LearningPage";
import TaskPage from "./pages/Taskpages/TaskPage";
import SimulationTaskPage from "./pages/Taskpages/SimulationTaskPage";
import ConsultingTaskPage from "./pages/Taskpages/ConsultingTaskPage";
import CTAPage from "./pages/ctapage";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const hideHeader = ['/', '/signin', '/signup'].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* 1. All courses */}
        <Route path="/courses" element={<ProtectedRoute><CoursesIndex /></ProtectedRoute>} />

        {/* 2. Course → Shows Chapters */}
        <Route path="/courses/:courseSlug" element={<ProtectedRoute><ChaptersPage /></ProtectedRoute>} />

        {/* 3. Chapter → Shows Lessons */}
        <Route path="/courses/:courseSlug/chapters/:chapterId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />

        {/* 4. Lesson → Shows Tasks */}
        <Route path="/courses/:courseSlug/chapters/:chapterId/lessons/:lessonId" element={<ProtectedRoute><TaskListPage /></ProtectedRoute>} />

        {/* 5. Learning content inside lesson */}
        <Route path="/courses/:courseSlug/chapters/:chapterId/lessons/:lessonId/learning/:topicId?" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />

        {/* 6. Task Pages */}
        <Route path="/courses/:courseSlug/chapters/:chapterId/tasks/:taskId" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId/tasks/:taskId/simulation" element={<ProtectedRoute><SimulationTaskPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId/tasks/:taskId/consulting" element={<ProtectedRoute><ConsultingTaskPage /></ProtectedRoute>} />

        <Route path="/cta" element={<ProtectedRoute><CTAPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;