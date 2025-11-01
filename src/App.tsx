import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursesIndex from "./pages/CoursesIndex";
import CoursePage from "./pages/CoursePage";
import ChapterPage from "./pages/ChapterPage";
import LessonPage from "./pages/LessonPage";
import LearningPage from "./pages/LearningPage";
import TaskPage from "./pages/TaskPage";
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
        <Route path="/courses" element={<ProtectedRoute><CoursesIndex /></ProtectedRoute>} />
        <Route path="/courses/:courseId" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/chapters/:chapterId" element={<ProtectedRoute><ChapterPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/chapters/:chapterId/lessons/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/chapters/:chapterId/lessons/:lessonId/learning/:topicId?" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />
        <Route path="/courses/:courseId/chapters/:chapterId/tasks/:taskId" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
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
