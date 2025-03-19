"use client";

import { TShirtResponse } from "@/domains/models/tshirt";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Edit, MoreHorizontal, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface TShirtMenuActionProps {
  tshirt: TShirtResponse;
}

const TShirtMenuAction: React.FC<TShirtMenuActionProps> = ({ tshirt }) => {
  const { push } = useRouter();

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
          onClick={() => push(`/dashboard/t-shirt/${tshirt.tshirtId}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View Detail</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TShirtMenuAction;
