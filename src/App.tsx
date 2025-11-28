// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Your pages
import Tutorial from "./pages/Tutorial";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursesIndex from "./pages/CoursesIndex";
import ChaptersPage from "./pages/ChaptersPage";
import LessonPage from "./pages/LessonPage";
import TaskListPage from "./pages/TaskListPage";
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
import ProfilePage from "@/components/ProfilePage";
import HelpDeskPage from "./components/HelpDesk";
import MentorshipPage from "./components/MentorshipPage";
import ToolsPage from "./components/ToolsPage.tsx";
import InboxPage from "./components/InboxPage.tsx";

// STORY PAGES
import StoryLibraryPage from "@/pages/playground/Page";           // ← Library
import NarrativeStoryPage from "@/pages/playground/story/Page";     // ← Player

// CONTEXT PROVIDER ← THIS WAS MISSING!
import { StoryProvider } from "@/context/StoryContext";

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

        {/* Courses */}
        <Route path="/courses" element={<ProtectedRoute><CoursesIndex /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug" element={<ProtectedRoute><ChaptersPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId/lessons/:lessonId" element={<ProtectedRoute><TaskListPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId/lessons/:lessonId/learning/:topicId?" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId/tasks/:taskId" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId/tasks/:taskId/simulation" element={<ProtectedRoute><SimulationTaskPage /></ProtectedRoute>} />
        <Route path="/courses/:courseSlug/chapters/:chapterId/tasks/:taskId/consulting" element={<ProtectedRoute><ConsultingTaskPage /></ProtectedRoute>} />

        <Route path="/cta" element={<ProtectedRoute><CTAPage /></ProtectedRoute>} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/helpdesk" element={<ProtectedRoute><HelpDeskPage /></ProtectedRoute>} />
        <Route path="/mentorship" element={<ProtectedRoute><MentorshipPage /></ProtectedRoute>} />
        <Route path="/tools" element={<ProtectedRoute><ToolsPage /></ProtectedRoute>} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* STORY ROUTES — NOW WRAPPED IN StoryProvider BELOW */}
        <Route path="/playground" element={<ProtectedRoute><StoryLibraryPage /></ProtectedRoute>} />
        <Route path="/playground/story" element={<ProtectedRoute><NarrativeStoryPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StoryProvider>        {/* ← THIS WAS MISSING! */}
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </StoryProvider>
      <Toaster />
      <Sonner />
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;