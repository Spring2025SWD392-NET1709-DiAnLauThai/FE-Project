import { useState } from "react";
import { useAuth } from "./use-auth";

export function useGoogleAuth() {
  const { useGoogleLogin } = useAuth();
  const googleLoginQuery = useGoogleLogin();

  const signInWithGoogle = () => {
    googleLoginQuery.refetch();
  };

  return {
    signInWithGoogle,
    isLoading: googleLoginQuery.isLoading,
    error: googleLoginQuery.error,
  };
}
