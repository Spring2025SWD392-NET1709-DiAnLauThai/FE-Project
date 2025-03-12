"use client";

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
import { TransactionResponse } from "@/domains/models/transaction";

interface TransactionMenuProps {
  transaction: TransactionResponse;
}

const BookingMenuAction: React.FC<TransactionMenuProps> = ({ transaction }) => {
  const { replace } = useRouter();

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
          onClick={() => replace(`/transaction/${transaction.id}`)}
        >
          <ClipboardList />
          <span>View Detail</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ClipboardX />
          <span>Cancel</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default BookingMenuAction;
