"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Sidebar from "../side-bar";
import TopNav from "../side-bar/top-nav";
import { useAuthStore } from "@/domains/stores/use-auth-store";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { user } = useAuthStore();

  console.log("user", user);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">
          {children}
        </main>
      </div>
    </div>
  );
}
