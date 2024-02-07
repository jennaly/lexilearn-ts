import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

type SignupResult = {
  signup: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean | null;
  error: string | null;
};

export const useSignup = (): SignupResult => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://lexilearn-server.cyclic.app/api/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));

      // Update auth context
      dispatch({ type: "LOGIN", payload: data });
    } catch (error: string | any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
