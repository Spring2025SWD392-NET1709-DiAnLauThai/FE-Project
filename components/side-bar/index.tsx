"use client";

import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  LucideIcon,
  Shirt,
  Archive,
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
        href: "/dashboard/tasks",
        icon: Folder,
        label: "Tasks Manage",
        roles: [Role.ADMIN, Role.DESIGNER],
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
        href: "/my-order",
        icon: Archive,
        label: "My Order",
        roles: [Role.CUSTOMER],
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        href: "#",
        icon: Wallet,
        label: "Transactions",
        roles: [Role.ADMIN, Role.MANAGER, Role.CUSTOMER],
      },
      {
        href: "#",
        icon: Receipt,
        label: "Invoices",
        roles: [Role.ADMIN, Role.MANAGER],
      },
      {
        href: "#",
        icon: CreditCard,
        label: "Payments",
        roles: [Role.ADMIN, Role.MANAGER],
      },
    ],
  },
  {
    title: "Team",
    items: [
      {
        href: "#",
        icon: Users2,
        label: "Members",
        roles: [Role.ADMIN, Role.MANAGER],
      },
      { href: "#", icon: Shield, label: "Permissions", roles: [Role.ADMIN] },
      {
        href: "#",
        icon: MessagesSquare,
        label: "Chat",
        roles: [Role.ADMIN, Role.MANAGER, Role.DESIGNER],
      },
      {
        href: "#",
        icon: Video,
        label: "Meetings",
        roles: [Role.ADMIN, Role.MANAGER, Role.DESIGNER],
      },
    ],
  },
];

import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { Role } from "@/domains/enums";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { role } = useAuthStore();

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
      const filteredItems = items.filter((item) => item.roles.includes(role));
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
            {/* <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/dashboard/tasks" icon={Folder}>
                    Tasks Manage
                  </NavItem>
                  <NavItem href="/dashboard/users" icon={Users2}>
                    User Account
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Finance
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Wallet}>
                    Transactions
                  </NavItem>
                  <NavItem href="#" icon={Receipt}>
                    Invoices
                  </NavItem>
                  <NavItem href="#" icon={CreditCard}>
                    Payments
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Team
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Users2}>
                    Members
                  </NavItem>
                  <NavItem href="#" icon={Shield}>
                    Permissions
                  </NavItem>
                  <NavItem href="#" icon={MessagesSquare}>
                    Chat
                  </NavItem>
                  <NavItem href="#" icon={Video}>
                    Meetings
                  </NavItem>
                </div>
              </div>
            </div> */}
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
