import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      const access = localStorage.getItem("omega_access");
      const email = localStorage.getItem("omega_email");

      if (!access || !email) {
        setAllowed(false);
        return;
      }

      // Validate from Supabase table
      const { data } = await supabase
        .from("form_users")
        .select("email")
        .eq("email", email)
        .single();

      setAllowed(!!data);
    }

    check();
  }, []);

  if (allowed === null) return null;

  return allowed ? children : <Navigate to="/signin" replace />;
}