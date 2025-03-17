"use client";

import { BookingResponse } from "@/domains/models/booking";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ClipboardList, ClipboardX, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
interface BookingDashboardMenuActionProps {
  booking: BookingResponse;
}

const BookingDashboardMenuAction: React.FC<BookingDashboardMenuActionProps> = ({
  booking,
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/order-list/${booking.id}`)}
        >
          <ClipboardList />
          <span>View Detail</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default BookingDashboardMenuAction;
