"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../theme-provide/theme-toggle";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Profile from "../homepage/profile";
import { Role } from "@/domains/enums";
import { ColorPickerNav } from "@/components/color-picker/ColorPickerNav"; // Import ColorPickerNav

export default function TopNav() {
  const { user, role } = useAuthStore();
  const pathname = usePathname();
  // Tách đường dẫn thành các segment, bỏ các chuỗi rỗng
  const segments = pathname.split("/").filter((seg) => seg.length > 0);

  // Breadcrumb tĩnh đầu tiên là "T&D"
  const staticBreadcrumb = {
    label: "T&D",
    href: role === Role.CUSTOMER ? "/t-shirt" : "/dashboard",
  };

  // Tạo breadcrumb động dựa theo URL (nếu có)
  const dynamicBreadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });

  // Ghép mảng breadcrumb: cũ + dynamic
  const breadcrumbs = [staticBreadcrumb, ...dynamicBreadcrumbs];

  // Kiểm tra xem người dùng có phải là Designer không
  const isDesigner = role === Role.DESIGNER;

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        {/* Chỉ hiển thị ColorPicker cho Designer */}
        {isDesigner && <ColorPickerNav />}

        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>

        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
            >
              <Profile user={user} />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
