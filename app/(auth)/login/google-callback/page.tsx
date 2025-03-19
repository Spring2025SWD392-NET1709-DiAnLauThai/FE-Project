"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authServices } from "@/domains/services/GoogleAuth.services";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function GoogleCallbackPage() {
    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const code = searchParams.get("code");

        if (!code) {
            setStatus("error");
            setErrorMessage("Authorization code is missing");
            return;
        }

        const handleGoogleCallback = async () => {
            try {
                const response = await authServices.handleGoogleCallback(code);

                // Lưu token vào localStorage hoặc cookie
                localStorage.setItem("auth_token", response.token);

                // Chuyển hướng người dùng đến trang Dashboard hoặc trang chính
                setStatus("success");

                // Chuyển hướng sau 2 giây
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);

            } catch (error) {
                console.error("Google Callback Error:", error);
                setStatus("error");
                setErrorMessage("Failed to authenticate with Google. Please try again.");
            }
        };

        handleGoogleCallback();
    }, [searchParams, router]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-lg">Authenticating with Google...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl mb-4">Authentication Failed</div>
                <p className="mb-6">{errorMessage}</p>
                <Button onClick={() => router.push("/login")}>Back to Login</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-green-500 text-xl mb-4">Authentication Successful!</div>
            <p className="mb-6">You are now logged in with Google.</p>
            <p>Redirecting to dashboard...</p>
        </div>
    );
}