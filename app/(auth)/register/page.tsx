"use client";

import React from "react";
import { HeaderTitle } from "@/components/auth-form/header-title";
import Background from "@/public/images/background.png";
import Image from "next/image";
import { RegisterForm } from "@/components/auth-form/register-form";

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen">
      {/* Left section - Image */}
      <div className="relative hidden w-2/3 lg:block">
        <Image
                  src="/T-Shirt.gif"
                  alt="Login background"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                  draggable={false}
                />
      </div>

      {/* Right section - Login form */}
      <div className="flex w-full flex-col items-center justify-center p-4 lg:w-1/2">
        <div className="w-full max-w-sm space-y-6">
          <HeaderTitle />
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
