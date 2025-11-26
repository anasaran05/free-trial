// src/onboarding/useTaskOnboarding.ts
import { useEffect, useState } from "react";
import { getFlag, setFlag } from "@/lib/userOnboardingFlags";
import { taskPageSteps } from "./taskPageSteps";
import type { CallBackProps } from "react-joyride";

const TASK_ONBOARDING_KEY = "task_page_onboarding_v1";

export function useTaskOnboarding(email: string | null) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!email) return;

    (async () => {
      const { shown } = await getFlag(email, TASK_ONBOARDING_KEY);
      if (!shown) {
        setRun(true); // Only start if not shown
      }
    })();
  }, [email]);

  const handleCallback = async (data: CallBackProps) => {
    const { type, status } = data;

    // Only mark as complete when tour is actually finished
    if (type === "tour:end" || status === "finished" || status === "skipped") {
      if (email) {
        await setFlag(email, TASK_ONBOARDING_KEY);
      }
      setRun(false);
    }
  };

  return {
    run,
    steps: taskPageSteps,
    handleFinish: handleCallback, // ← This is now safe
  };
}