// src/hooks/useOnboarding.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CallBackProps } from "react-joyride";
import { tutorialSteps } from "./tutorialSteps.tsx";
import { getFlag, setFlag } from "../lib/userOnboardingFlags";

const GLOBAL_TOUR_KEY = "full_onboarding";

export function useOnboarding(pageKey: string, email?: string | null) {
  const navigate = useNavigate();
  const [run, setRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const allSteps = tutorialSteps[GLOBAL_TOUR_KEY] || [];

  // Find where this page starts in the full tour
  const startIndex = allSteps.findIndex(
    (step) => step.page === pageKey || (!step.page && pageKey === "dashboard")
  );

  useEffect(() => {
    if (!email || !allSteps.length) return;

    (async () => {
      const { shown } = await getFlag(email, GLOBAL_TOUR_KEY);

      if (!shown) {
        const saved = localStorage.getItem(`onboarding_step_${email}`);
        const stepIndex = saved ? Number(saved) : startIndex;

        if (stepIndex >= 0 && stepIndex < allSteps.length) {
          setCurrentStep(stepIndex);
          setRun(true);
        }
      }
    })();
  }, [email, pageKey, allSteps.length, startIndex]);

  const handleCallback = async (data: CallBackProps) => {
    if (!email) return;

    const { index, action, type, status } = data;

    // User clicked "Next"
    if (type === "step:after" && action === "next") {
      const nextIndex = index + 1;
      localStorage.setItem(`onboarding_step_${email}`, String(nextIndex));

      const nextStep = allSteps[nextIndex];

      // Auto-navigate if needed
      if (nextStep?.action === "navigate" && nextStep.to) {
        let destination = nextStep.to;

        // Extract real IDs from current URL (e.g. /courses/abc123/chapters/xyz)
        const currentPath = window.location.pathname;
        const match = currentPath.match(
          /\/courses\/([^/]+)(?:\/chapters\/([^/]+))?(?:\/lessons\/([^/]+))?/
        );

        if (match) {
          const [, courseId, chapterId, lessonId] = match;
          destination = destination
            .replace(":courseId", courseId || "")
            .replace(":chapterId", chapterId || "")
            .replace(":lessonId", lessonId || "");
        }

        // Clean up any leftover placeholders
        destination = destination.replace(/:\w+/g, "");

        navigate(destination);
      }
    }

    // Tour finished (user clicked "Close", "Skip", or reached end)
    if (type === "tour:end" || status === "finished" || status === "skipped") {
      await setFlag(email, GLOBAL_TOUR_KEY);
      localStorage.removeItem(`onboarding_step_${email}`);
      setRun(false);
    }
  };

  // Show only steps for current page, starting from saved progress
  const currentPageSteps = allSteps.filter(
    (step) => !step.page || step.page === pageKey
  );

  const stepsToShow = currentPageSteps.slice(
    Math.max(0, currentStep - startIndex),
    currentStep - startIndex + currentPageSteps.length
  );

  return {
    run,
    steps: stepsToShow,
    handleFinish: handleCallback,
  };
}