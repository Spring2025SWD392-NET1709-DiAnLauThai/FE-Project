"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { ForgotPasswordDialog } from "./forget-password";
import { useDialogStore } from "@/domains/stores";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { openDialog } = useDialogStore();

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Nice to see you again
          </h1>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              label="Login"
              leftIcon={<Mail className="h-5 w-5 text-muted-foreground" />}
              id="email"
              placeholder="Email or phone number"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <div className="relative space-y-2">
            <Input
              label="Password"
              leftIcon={<Lock className="h-5 w-5 text-muted-foreground" />}
              rightIcon={
                showPassword ? (
                  <EyeOff
                    className="h-5 w-5 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="h-5 w-5 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
              id="password"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch />
              <p className="text-muted-foreground text-sm">Remember me</p>
            </div>
            <button
              onClick={() => openDialog("forgotPassword")}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Forgot password?
            </button>
          </div>
          <div></div>
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            onClick={() => router.push("/")}
          >
            Sign in
          </Button>

          <div className="flex items-center justify-center space-x-2 ">
            <Separator className="text-muted-foreground w-1/2" />
            <p>Or</p>
            <Separator className="text-muted-foreground w-1/2" />
          </div>
          <Button className="w-full">
            <Image
              className="dark:invert"
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
            />
            Or Sign in with Google
          </Button>
          <div className="text-center text-sm">
            {"Don't have an account? "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <ForgotPasswordDialog />
    </>
  );
}
