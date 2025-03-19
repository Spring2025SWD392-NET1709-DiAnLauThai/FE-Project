"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialogStore } from "@/domains/stores";
import { useAuthForm } from "@/hooks/auth/use-auth-form";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { ForgotPasswordDialog } from "./forget-password";
import { AuthServices } from "@/domains/services/auth.services";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { openDialog } = useDialogStore();
  const { form, onSubmit, isLoading } = useAuthForm({ type: "login" });

  const handleLoginGoogle = async () => {
    const response = await AuthServices.loginWithGoogle();

    window.location.href = response.data;
  };

  return (
    <>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Login"
                        leftIcon={
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        }
                        id="email"
                        placeholder="Email or phone number"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Password"
                        leftIcon={
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        }
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch />
                <p className="text-muted-foreground text-sm">Remember me</p>
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  openDialog("forgotPassword");
                }}
                className="text-sm text-muted-foreground hover:text-primary hover:cursor-pointer"
              >
                Forgot password?
              </div>
            </div>
            <div></div>
            <Button
              type="submit"
              className="w-full"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-center space-x-2 ">
          <Separator className="text-muted-foreground w-1/2" />
          <p>Or</p>
          <Separator className="text-muted-foreground w-1/2" />
        </div>
        <Button className="w-full" onClick={handleLoginGoogle}>
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
      <ForgotPasswordDialog />
    </>
  );
}
