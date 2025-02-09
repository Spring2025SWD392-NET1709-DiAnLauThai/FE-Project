"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Hello! Welcome to T&D
        </h1>
      </div>
      <div className="space-y-4">
        <Input
          label="Full name"
          leftIcon={<User className="h-5 w-5 text-muted-foreground" />}
          id="email"
          placeholder="Enter your full name"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          required
        />
        <Input
          label="Email"
          leftIcon={<Mail className="h-5 w-5 text-muted-foreground" />}
          id="email"
          placeholder="Enter your email"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          required
        />
        <Input
          label="Phone number"
          leftIcon={<Mail className="h-5 w-5 text-muted-foreground" />}
          id="email"
          placeholder="Enter your phone number"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          required
        />
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
        <Button
          type="submit"
          className="w-full"
          variant="primary"
          onClick={() => router.push("/")}
        >
          Sign up
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
