// components/table/Menu.tsx
"use client";

import { User, UserPayload } from "@/domains/models/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useState } from "react"; // Removed useEffect
import { UserDetailCard } from "@/components/user-card/user-detail-card";
import { useUserForm } from "@/hooks/user/use-user-form";
import { UserForm } from "@/components/user-form/user-form";

interface MenuActionsProps {
  user: User;
}

export function MenuActions({ user }: MenuActionsProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Transform the user to match UserPayload format
  const userAsPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: Number(user.phone),
    address: user.address || "",
    dateOfBirth: user.dateOfBirth,
    role: user.role,
    status: user.status,
  } as UserPayload;

  const { form, onSubmit, isLoading, reset } = useUserForm({
    type: "update",
    defaultData: userAsPayload,
  });


  const handleEditOpen = (isOpen: boolean) => {
    setOpenEdit(isOpen);
    // Only reset form when opening the dialog
    if (isOpen) {
      reset(userAsPayload);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(e);
    if (success) {
      setOpenEdit(false);
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

        {/* View Details Dialog */}
        <Dialog open={openView} onOpenChange={setOpenView}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              View Details
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <UserDetailCard user={user} />
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEdit} onOpenChange={handleEditOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit User Profile</DialogTitle>
              <DialogDescription>
                Make changes to user profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <UserForm
              form={form}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              type="update"
            />
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => console.log("Deleting user:", user.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
