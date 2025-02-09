"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

export function Header() {
  const router = useRouter();
  return (
    <header className=" w-full ">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="font-bold text-2xl">
          <Image
            src="/t&d.svg"
            alt="T-Shirt and Design"
            width={80}
            height={80}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/t-shirt" className="text-sm font-medium">
            T-Shirt
          </Link>
          <Link href="/deals" className="text-sm font-medium">
            Deals
          </Link>
          <Link href="/reviews" className="text-sm font-medium">
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
          <Button variant="default" onClick={() => router.push("/login")}>
            Login / Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
