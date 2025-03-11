import TAndD from "@/public/t&d.svg";
import Image from "next/image";
import Link from "next/link";

export function HeaderTitle() {
  return (
    <div className="flex items-center space-x-2">
      <Link href="/">
      <Image src={TAndD} alt="T-Shirt and Design" />
      </Link>
      <span className="text-3xl font-semibold">T-Shirt& Design</span>
    </div>
  );
}
