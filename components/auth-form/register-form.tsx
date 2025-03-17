"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useAuthForm } from "@/hooks/auth/use-auth-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isLoading } = useAuthForm({ type: "register" });

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">
          Hello! Welcome to T&D
        </h1>
      </div>
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Full name"
                      leftIcon={
                        <User className="h-5 w-5 text-muted-foreground" />
                      }
                      id="name"
                      placeholder="Enter your full name"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Email"
                      leftIcon={
                        <Mail className="h-5 w-5 text-muted-foreground" />
                      }
                      id="email"
                      placeholder="Enter your email"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Phone number"
                      leftIcon={
                        <Phone className="h-5 w-5 text-muted-foreground" />
                      }
                      id="email"
                      placeholder="Enter your phone number"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
          </form>
        </Form>

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
          Or Sign up with Google
        </Button>
        <div className="text-center text-sm">
          {"If you already have an account, "}
          <Link href="/login" className="text-primary hover:underline">
            Let`s sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
