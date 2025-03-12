"use client";

import { TransactionResponse } from "@/domains/models/transaction";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface TransactionMenuActionProps {
  transaction: TransactionResponse;
}

const TransactionMenuAction: React.FC<TransactionMenuActionProps> = ({
  transaction,
}) => {
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
          onClick={() => replace(`/transactions/${transaction.id}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View Detail</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionMenuAction;
