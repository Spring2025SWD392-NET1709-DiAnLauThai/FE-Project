import { LogOut, MoveUpRight, Settings, FileText } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { UserResponse } from "@/domains/models/user";
import { Role } from "@/domains/enums";

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  role: string[];
}

interface Profile01Props {
  user: UserResponse;
}

export default function Profile({ user }: Profile01Props) {
  const { logout, role } = useAuthStore();
  const menuItems: MenuItem[] = [
    {
      label: "Profile Settings",
      href: "user-profile",
      icon: <Settings className="w-4 h-4" />,
      role: [Role.ADMIN, Role.CUSTOMER, Role.DESIGNER, Role.MANAGER],
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: <FileText className="w-4 h-4" />,
      external: true,
      role: [Role.CUSTOMER],
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <Avatar>
                {user.image_url ? (
                  <AvatarImage
                    src={user.image_url}
                    alt={user.name || "User avatar"}
                  />
                ) : null}
                <AvatarFallback>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {user.name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {user.role}
              </p>
            </div>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />
          <div className="space-y-2">
            {menuItems
              .filter((item) => item.role.includes(role as Role))
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between p-2 
                                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                    rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {item.value && (
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">
                        {item.value}
                      </span>
                    )}
                    {item.external && <MoveUpRight className="w-4 h-4" />}
                  </div>
                </Link>
              ))}
            <button
              type="button"
              onClick={() => logout()}
              className="w-full flex items-center justify-between p-2 
                                hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Logout
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
