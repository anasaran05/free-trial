// src/onboarding/tutorialSteps.tsx
import React from "react";
import type { Step } from "react-joyride";
import { IntroVideo } from "./IntroVideo";

interface CustomStep extends Step {
  page?: string;
  action?: "navigate";
  to?: string;
}

export const tutorialSteps: { full_onboarding: CustomStep[] } = {
  full_onboarding: [
    {
      target: "body",
      content: "Welcome to ZANE ΩMEGA. This walkthrough shows how learning flows from dashboard to real tasks.",
      placement: "center",
      disableBeacon: true,
    },
    {
      target: '[data-tour="kpi-cards"]',
      content: "Your performance metrics. View progress, XP, and recent activity.",
      page: "dashboard",
      disableBeacon: true,
      spotlightPadding: 60,
    },
    {
      target: '[data-tour="continue-btn"]:first-of-type',
      content: "Resume from your last active course or module.",
      page: "dashboard",
    },
    {
      target: '[data-tour="category-tabs"]',
      content: "Filter courses by skill domain or track.",
      page: "course_index",
      disableBeacon: true,
    },
    {
      target: '[data-tour="course-grid"]',
      content: "All available learning programs. Select one to open its overview.",
      page: "course_index",
    },
    {
      target: '[data-tour="start-btn"]:first-of-type',
      content: "Open a course to see its chapters and requirements.",
      page: "course_index",
      action: "navigate",
      to: "/courses/:courseId",
    },
    {
      target: '[data-tour="course-header"]',
      content: "Course overview. Objectives, duration, and what you will deliver.",
      page: "course_chapters",
    },
    {
      target: '[data-tour="chapters-title"]',
      content: "Chapters are sequenced for mastery. Complete them in order.",
      page: "course_chapters",
    },
    {
      target: '[data-tour="start-chapter-btn"]:first-of-type',
      content: "Enter a chapter to access its lessons and assessments.",
      page: "course_chapters",
      action: "navigate",
      to: "/courses/:courseId/chapters/:chapterId",
    },
    {
      target: '[data-tour="start-lesson-btn"]:first-of-type',
      content: "Lessons contain videos, briefs, and reference content.",
      page: "chapter_page",
      action: "navigate",
      to: "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/learning",
    },
    {
      target: '[data-tour="video-player"]',
      content: "Core learning material. Complete the full video content.",
      page: "learning_page",
    },
    {
      target: '[data-tour="topics-sidebar"]',
      content: "Each topic builds competency. Finish topics to unlock assessments.",
      page: "learning_page",
    },
    {
      target: '[data-tour="take-quiz-btn"]',
      content: "Assessment validates readiness. Passing unlocks simulation tasks.",
      page: "learning_page",
    },

    // TASK PAGE STEPS — NOW WORKING
    {
      target: '[data-tour="task-title"]',
      content: "This is your mission. Read carefully.",
      placement: "bottom",
      page: "task_page",
      disableBeacon: true,
    },
    {
      target: '[data-tour="scenario-card"]',
      content: "The scenario simulates a real-world environment.",
      placement: "top",
      page: "task_page",
    },
    {
      target: '[data-tour="first-resource-btn"]',
      content: "Click to open required documents. You must view all.",
      placement: "bottom",
      page: "task_page",
    },
    {
      target: '[data-tour="complete-task-btn"]',
      content: "When all resources are viewed → this button appears. Click to earn XP!",
      placement: "top",
      page: "task_page",
      disableBeacon: true,
    },
    {
      target: "body",
      content: "Congratulations! You now know the full learning → simulation → mastery flow.",
      placement: "center",
      page: "task_page",
      disableBeacon: true,
    },
  ],
};