"use client";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Profile from "./profile";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <header className=" w-full ">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="gap-4 flex items-center">
          {pathname !== "/t-shirt" && pathname !== "/" && (
            <ArrowLeft onClick={() => router.back()} />
          )}
          <Link href="/" className="font-bold text-2xl">
            <Image
              src="/t&d.svg"
              alt="T-Shirt and Design"
              width={80}
              height={80}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-24">
          <Link href="/t-shirt" className="text-md font-semibold">
            T-Shirt
          </Link>
          <Link href="/my-order" className="text-md font-semibold">
            My Order
          </Link>
          <Link href="/reviews" className="text-md font-semibold">
            Reviews
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Input
              className="border-none placeholder-foreground "
              placeholder="Looking for something?"
              rightIcon={<Search className="w-4 h-4 ml-2" />}
            />
            {/* <span className="text-sm">Looking for something?</span> */}
          </div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar>
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
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
          ) : (
            <Button variant="default" onClick={() => router.push("/login")}>
              Login / Sign up
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
