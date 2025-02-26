// components/table/Menu.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState, ReactNode } from "react";

interface BaseEntity {
  id: string;
}

export interface MenuAction<T extends BaseEntity> {
  label: string;
  onClick?: (entity: T) => void;
  renderContent?: (entity: T, close: () => void) => ReactNode;
  dialogTitle?: string;
  danger?: boolean;
}

interface MenuActionsProps<T extends BaseEntity> {
  entity: T;
  entityType: string;
  actions: MenuAction<T>[];
}

export function MenuActions<T extends BaseEntity>({
  entity,
  entityType,
  actions,
}: MenuActionsProps<T>) {
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);

  const handleOpenChange = (open: boolean, index: number) => {
    if (!open) {
      setOpenDialogIndex(null);
    } else {
      setOpenDialogIndex(index);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {actions.map((action, index) => (
          <Dialog
            key={`${entityType}-action-${index}`}
            open={openDialogIndex === index}
            onOpenChange={(open) => handleOpenChange(open, index)}
          >
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  if (action.onClick && !action.renderContent) {
                    action.onClick(entity);
                  }
                }}
                className={action.danger ? "text-red-600" : ""}
              >
                {action.label}
              </DropdownMenuItem>
            </DialogTrigger>

            {action.renderContent && (
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>
                    {action.dialogTitle || action.label}
                  </DialogTitle>
                </DialogHeader>
                {action.renderContent(entity, () => setOpenDialogIndex(null))}
              </DialogContent>
            )}
          </Dialog>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
