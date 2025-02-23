"use client"

import { UserResponse } from "@/domains/models/user"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface MenuActionsProps {
  user: UserResponse;
}

export function MenuActions({ user }: MenuActionsProps) {
  const [editedUser, setEditedUser] = useState(user)

  const handleInputChange = (field: keyof UserResponse, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        
        {/* Edit Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User Profile</DialogTitle>
              <DialogDescription>
                Make changes to user profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Name field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                
                {/* Phone field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editedUser.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                
                {/* Address field */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={editedUser.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>

                {/* Date of Birth field */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={editedUser.dateOfBirth ? new Date(editedUser.dateOfBirth).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                
                {/* Role field */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={editedUser.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="DESIGNER">Designer</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status field */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedUser.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => console.log("Saving user:", editedUser)}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog>
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
                Are you sure you want to delete this user? This action cannot be undone.
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
  )
}