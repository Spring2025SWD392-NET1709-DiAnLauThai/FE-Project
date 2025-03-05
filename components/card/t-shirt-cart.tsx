"use client";

import Image, { StaticImageData } from "next/image";
import { Heart, Star, SquareArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface TShirtCartProps {
  id: number;
  title: string;
  brand: string;
  price: number;
  sizes: number;
  colors: number;
  printProviders: number;
  rating: number;
  reviews: number;
  imageUrl: StaticImageData;
  isNew?: boolean;
}

export default function TShirtCart({
  id,
  title,
  brand,
  rating,
  reviews,
  imageUrl,
  isNew = false,
}: TShirtCartProps) {
  const { push } = useRouter();

  return (
    <div className="group relative rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* New Badge */}
        {isNew && (
          <Badge className="absolute left-4 top-4 bg-blue-500 hover:bg-blue-600">
            New
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Brand & Title */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{brand}</p>
          <h3 className="font-medium leading-tight">{title}</h3>
        </div>

        {/* Specs */}
        {/* <div className="flex justify-start text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>{sizes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span>{colors}</span>
          </div>
          <div className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            <span>{printProviders}</span>
          </div>
        </div> */}

        <div className="flex justify-between items-center">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>

          {/* Price */}
          {/* <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">${price.toFixed(2)}</span>
          </div> */}
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full gap-2" onClick={() => push(`/t-shirt/${id}`)}>
          <SquareArrowUpRight className="h-4 w-4" />
          <span>View Product</span>
        </Button>
      </div>
    </div>
  );
}
