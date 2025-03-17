import { LoginForm } from "@/components/auth-form/login-form";
import { HeaderTitle } from "@/components/auth-form/header-title";
import Background from "@/public/images/background.png";
import Image from "next/image";

export default function LoginPage() {

  

  return (
    <main className="flex min-h-screen">
      {/* Left section - Image */}
      <div className="relative hidden w-2/3 lg:block">
        <Image
          src="/T-Shirt.gif"
          alt="Login background"
          fill
          className="object-cover size-80"
          priority
          unoptimized
          draggable={false}
        />
      </div>

      {/* Right section - Login form */}
      <div className="flex w-full flex-col items-center justify-center p-4 lg:w-1/2">
        <div className="w-full max-w-sm space-y-6">
          <HeaderTitle />
          <div className="space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">
              Nice to see you again
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
