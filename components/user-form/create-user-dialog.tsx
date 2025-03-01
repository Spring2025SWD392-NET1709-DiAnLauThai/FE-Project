// components/create-user-form/create-user-dialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserForm } from "@/hooks/user/use-user-form";
import { UserForm } from "@/components/user-form/user-form";

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isLoading, reset } = useUserForm({
    type: "create",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(e);
    if (success) {
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(openState) => {
        setOpen(openState);
        if (!openState) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="ml-auto">Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new user account.
          </DialogDescription>
        </DialogHeader>

        <UserForm
          form={form}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          type="create"
          isAdminUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
}
