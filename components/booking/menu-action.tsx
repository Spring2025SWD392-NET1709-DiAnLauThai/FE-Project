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
import {
  ClipboardList,
  ClipboardX,
  CreditCardIcon,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRepayBooking } from "@/hooks/booking/use-booking-form";
import { Form } from "react-hook-form";

interface BookingMenuActionProps {
  booking: BookingResponse;
}

const BookingMenuAction: React.FC<BookingMenuActionProps> = ({ booking }) => {
  const { replace } = useRouter();
  const { onSubmit, isLoading } = useRepayBooking(booking.id);


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
        <DropdownMenuItem onClick={() => replace(`/my-booking/${booking.id}`)}>
          <ClipboardList />
          <span>View Detail</span>
        </DropdownMenuItem>
        {booking.status === "UNPAID" && (
          
          <DropdownMenuItem
            onClick={onSubmit}
            disabled={isLoading}
          >
                <CreditCardIcon />
                <span>Repay</span>
              </DropdownMenuItem>
            
        )}

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default BookingMenuAction;
