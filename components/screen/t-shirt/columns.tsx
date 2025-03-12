"use client";

import { TShirtResponse } from "@/domains/models/tshirt";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../ui/badge";
import { formatPriceToVND } from "@/lib/format";
import TShirtMenuAction from "./menu-action";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

const isValidUrl = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

const ImagePlaceholder = () => (
  <div className="w-[100px] h-[100px] bg-muted rounded-md flex items-center justify-center border border-dashed border-foreground">
    <ImageIcon className="w-8 h-8 text-muted-foreground" />
  </div>
);

export const TShirtColumns: ColumnDef<TShirtResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const tshirt = row.original;
      const isValidImage = tshirt.imageUrl && isValidUrl(tshirt.imageUrl);

      console.log("isValidImage", isValidImage);

      if (!isValidImage) {
        return <ImagePlaceholder />;
      }

      return (
        <Image
          src={tshirt.imageUrl!}
          alt={tshirt.name}
          width={100}
          height={100}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const placeholder = document.createElement("div");
            placeholder.className = target.className;
            placeholder.innerHTML =
              '<div class="w-full h-full bg-muted rounded-md flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>';
            target.parentNode?.replaceChild(placeholder, target);
          }}
          className="object-cover rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const tshirt = row.original;
      return <Badge variant="default">{tshirt.status}</Badge>;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const tshirt = row.original;
      return <TShirtMenuAction tshirt={tshirt} />;
    },
  },
];
