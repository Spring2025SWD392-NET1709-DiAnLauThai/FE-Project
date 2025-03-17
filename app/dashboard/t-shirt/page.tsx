"use client";

import TShirtTable from "@/components/screen/t-shirt/table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const TShirtListPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          T-Shirt Management
        </h2>
        <Button>
          <CirclePlus className="w-4 h-4 mr-2" />
          <Link href="/dashboard/t-shirt/create">Create T-shirt</Link>
        </Button>
      </div>
      <div className="mt-8">
        <TShirtTable />
      </div>
    </div>
  );
};

export default TShirtListPage;
