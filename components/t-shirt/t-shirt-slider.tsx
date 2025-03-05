"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Female from "@/public/images/male.png";
import "./index.css";

import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Smart T-Shirt",
    price: "40$",
    quality: "Best quality",
    rating: 5,
    reviews: "1k",
    image: Female,
  },
  {
    id: 2,
    name: "Smart T-Shirt",
    price: "40$",
    quality: "Best quality",
    rating: 5,
    reviews: "1k",
    image: Female,
  },
  {
    id: 3,
    name: "Smart T-Shirt",
    price: "40$",
    quality: "Best quality",
    rating: 5,
    reviews: "1k",
    image: Female,
  },
  {
    id: 4,
    name: "Smart T-Shirt",
    price: "40$",
    quality: "Best quality",
    rating: 5,
    reviews: "1k",
    image: Female,
  },
  {
    id: 5,
    name: "Smart T-Shirt",
    price: "40$",
    quality: "Best quality",
    rating: 5,
    reviews: "1k",
    image: Female,
  },
  {
    id: 6,
    name: "Smart T-Shirt",
    price: "40$",
    quality: "Best quality",
    rating: 5,
    reviews: "1k",
    image: Female,
  },
  {
    id: 6,
    name: "Smart T-Shirt",
    price: "40$",
    quality: "Best quality",
    rating: 5,
    reviews: "1k",
    image: Female,
  },
];

export default function TShirtSlider() {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden bg-blue-200">
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={24}
        slidesPerView="auto"
        className="product-swiper !overflow-visible  bg-orange-300"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!w-[280px] ">
            <div
              className="group cursor-pointer"
              onClick={() => router.push(`/t-shirt/${product.id}`)}
            >
              <div className="relative bg-foreground/10 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg tracking-tight">
                      {product.name}
                    </h3>
                    <p className="font-bold text-lg">{product.price}</p>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {product.quality}
                  </p>

                  <div className="flex items-center gap-1.5">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
