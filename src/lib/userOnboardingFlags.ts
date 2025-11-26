// src/lib/userOnboardingFlags.ts
import { supabase } from "@/integrations/supabase/client";

const ONBOARDING_TABLE = "user_onboarding";

type FlagsObject = Record<string, boolean>;

export async function getFlag(email: string, key: string) {
  const { data, error } = await supabase
    .from(ONBOARDING_TABLE)
    .select("flags")
    .eq("email", email)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Unexpected onboarding fetch error:", error);
  }

  const flags = (data?.flags || {}) as FlagsObject;
  return { shown: !!flags[key] };
}

export async function setFlag(email: string, key: string) {
  // 1. fetch existing flags
  const { data } = await supabase
    .from(ONBOARDING_TABLE)
    .select("flags")
    .eq("email", email)
    .maybeSingle();

  // 2. cast json → object
  const existingFlags = (data?.flags || {}) as FlagsObject;

  // 3. merge
  const updatedFlags: FlagsObject = {
    ...existingFlags,
    [key]: true,
  };

  const { error } = await supabase
    .from(ONBOARDING_TABLE)
    .upsert(
      {
        email,
        flags: updatedFlags,
      },
      { onConflict: "email" }
    );

  if (error) {
    console.error("Failed to save onboarding flag:", error);
  }
}