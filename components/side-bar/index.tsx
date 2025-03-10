"use client";

import {
  Wallet,
  Users2,
  Settings,
  HelpCircle,
  Menu,
  LucideIcon,
  Shirt,
  Archive,
  ClipboardList,
  PaintBucket,
} from "lucide-react";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  roles: string[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { Role } from "@/domains/enums";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { role } = useAuthStore();

  const navSections: NavSection[] = [
    {
      title: "Overview",
      items: [
        {
          href: "/dashboard",
          icon: Home,
          label: "Dashboard",
          roles: [Role.ADMIN, Role.MANAGER],
        },
        {
          href: "/dashboard/users",
          icon: Users2,
          label: "User Account",
          roles: [Role.ADMIN],
        },
        {
          href: "/t-shirt",
          icon: Shirt,
          label: "T-Shirt",
          roles: [Role.CUSTOMER],
        },
        {
          href: "/task-designer",
          icon: Shirt,
          label: "Task",
          roles: [Role.DESIGNER],
        },
        {
          href: "/saved-color",
          icon: PaintBucket,
          label: "Saved Color",
          roles: [Role.DESIGNER],
        },
        {
          href: "/my-booking",
          icon: Archive,
          label: "My Booking",
          roles: [Role.CUSTOMER],
        },
        {
          href: "/my-booking/create",
          icon: ClipboardList,
          label: "Booking Design",
          roles: [Role.CUSTOMER],
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          href:
            role !== Role.CUSTOMER
              ? "/dashboard/transactions"
              : "/transactions",
          icon: Wallet,
          label: "Transactions",
          roles: [Role.ADMIN, Role.MANAGER, Role.CUSTOMER],
        },
      ],
    },
    {
      title: "Workplace",
      items: [
        {
          href: "/dashboard/tasks",
          icon: ClipboardList,
          label: "Task List",
          roles: [Role.ADMIN],
        },
        {
          href: "/dashboard/order-list",
          icon: Archive,
          label: "Order List",
          roles: [Role.ADMIN, Role.MANAGER],
        },
      ],
    },
  ];

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: LucideIcon;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    );
  }

  function renderNavItems() {
    return navSections.map(({ title, items }) => {
      const filteredItems = items.filter((item) =>
        item.roles.includes(role as Role)
      );
      if (filteredItems.length === 0) return null;
      return (
        <div key={title}>
          <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {title}
          </div>
          <div className="space-y-1">
            {filteredItems.map(({ href, icon, label }) => (
              <NavItem key={href} href={href} icon={icon}>
                {label}
              </NavItem>
            ))}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="https://kokonutui.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/t&d.svg"
                alt="Acme"
                width={32}
                height={32}
                className="flex-shrink-0 hidden dark:block"
              />
              <Image
                src="/t&d.svg"
                alt="Acme"
                width={32}
                height={32}
                className="flex-shrink-0 block dark:hidden"
              />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                T&D
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">{renderNavItems()}</div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
