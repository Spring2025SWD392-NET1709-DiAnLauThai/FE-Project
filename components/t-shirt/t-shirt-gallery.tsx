"use client";

import Image, { StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper/types";

// tslint:disable-next-line: no-default-export

interface TShirtImageGalleryProps {
  images: StaticImageData[];
  title: string;
  isNew?: boolean;
}

export function TShirtImageGallery({
  images,
  title,
  isNew,
}: TShirtImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  return (
    <div className="space-y-4">
      <div className="relative">
        <Swiper
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Pagination, Thumbs]}
          className="aspect-square rounded-lg overflow-hidden"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {isNew && (
          <Badge className="absolute left-4 top-4 z-10 bg-blue-500 hover:bg-blue-600">
            New
          </Badge>
        )}
      </div>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="thumbs-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-square rounded-md overflow-hidden cursor-pointer">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
