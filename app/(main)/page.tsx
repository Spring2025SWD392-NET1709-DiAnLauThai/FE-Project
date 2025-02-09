"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

export const Dynamic = "static";

const HomePage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
};

export default HomePage;
