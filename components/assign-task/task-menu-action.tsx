"use client";

import { useState } from "react";
import { Task } from "@/domains/models/tasks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

interface TaskMenuActionProps {
  task: Task;
}

export default function TaskMenuAction({ task }: TaskMenuActionProps) {
  const { replace } = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => replace(`/task-designer/${task.taskId}`)}>
                    <ClipboardList
                     />
                    <span>View Detail</span>
                  </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      
    </>
  );
}
