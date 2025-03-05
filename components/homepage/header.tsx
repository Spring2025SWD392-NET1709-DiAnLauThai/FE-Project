"use client";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className=" w-full ">
      <div className=" flex items-center justify-between h-16 px-4">
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
            {/* <Input
              className="border-none placeholder-foreground "
              placeholder="Looking for something?"
              rightIcon={<Search className="w-4 h-4 ml-2" />}
            /> */}
            {/* <span className="text-sm">Looking for something?</span> */}
          </div>
          <Button variant="default" onClick={() => router.push("/login")}>
            Login / Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
