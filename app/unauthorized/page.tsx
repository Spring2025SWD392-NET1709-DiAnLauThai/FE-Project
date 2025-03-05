import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">401</h1>
        <p className="text-lg font-medium">Unauthorized</p>
      </div>

      <Button>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};

export default Unauthorized;
