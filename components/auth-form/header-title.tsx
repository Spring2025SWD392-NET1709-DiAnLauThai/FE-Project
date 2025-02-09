import TAndD from "@/public/t&d.svg";
import Image from "next/image";

export function HeaderTitle() {
  return (
    <div className="flex items-center space-x-2">
      <Image src={TAndD} alt="T-Shirt and Design" />
      <span className="text-3xl font-semibold">T-Shirt& Design</span>
    </div>
  );
}
