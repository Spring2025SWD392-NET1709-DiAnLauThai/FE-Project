"use client";

import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { useGoogleCallback } = useAuth();

  // Call useGoogleCallback with the code from URL parameters
  const { isLoading, error } = useGoogleCallback(code || "");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="ml-2">Completing authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-700">
            Authentication Failed
          </h2>
          <p className="text-red-600">{(error as Error).message}</p>
          <button
            className="mt-4 rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
            onClick={() => (window.location.href = "/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="ml-2">Redirecting...</p>
    </div>
  );
}
