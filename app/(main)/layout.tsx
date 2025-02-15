"use client";
import { Header } from "@/components/homepage/header";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <div>
      {path !== "/" && <Header />}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
