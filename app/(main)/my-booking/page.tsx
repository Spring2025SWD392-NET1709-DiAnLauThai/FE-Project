"use client";

import BookingTable from "@/components/booking/table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const MyOrderPage = () => {
  const router = useRouter();
  return (
    <main className="space-y-6">
      {/* header */}
      <section className="flex justify-between items-baseline px-4 bg-muted-foreground/20 py-6 rounded-sm">
        <h1 className="text-3xl font-bold ">My Booking</h1>
        <Button onClick={() => router.push("/my-booking/create")}>
          <CirclePlus className="h-4 w-4 mr-2" />
          <span>Register Design</span>
        </Button>
      </section>

      {/* table */}
      <section>
        <BookingTable />
      </section>
    </main>
  );
};

export default MyOrderPage;
