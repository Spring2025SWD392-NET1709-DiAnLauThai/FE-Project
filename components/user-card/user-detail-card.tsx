// components/user/user-detail-card.tsx
"use client";

import { format } from "date-fns";
import { User, UserStatus } from "@/domains/models/user";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User as UserIcon,
  ShieldCheck,
} from "lucide-react";

interface UserDetailCardProps {
  user: User;
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "Not set";
    return format(new Date(date), "dd MMM yyyy");
  };

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return "bg-green-500 hover:bg-green-600 text-white";
      case UserStatus.INACTIVE:
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header with name and status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 bg-primary text-primary-foreground">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">{user.role}</Badge>
              <Badge className={getStatusBadgeClass(user.status)}>
                {user.status || UserStatus.ACTIVE}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* User information grid */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email</span>
              </div>
              <p className="text-sm">{user.email}</p>

              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Phone</span>
              </div>
              <p className="text-sm">{user.phone}</p>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Address</span>
              </div>
              <p className="text-sm">{user.address || "Not set"}</p>

              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Date of Birth</span>
              </div>
              <p className="text-sm">{formatDate(user.dateOfBirth)}</p>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Role</span>
              </div>
              <p className="text-sm">{user.role}</p>

              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Account Created</span>
              </div>
              <p className="text-sm">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
