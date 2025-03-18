"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Search } from "lucide-react";
import PaginationTable from "../plugins/pagination";
import { useParamStore } from "@/domains/stores/params-store";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";
import { usePublicTShirtsQuery } from "@/hooks/t-shirt/use-tshirt";
import { TShirtResponse, TShirtPublicResponse } from "@/domains/models/tshirt";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TShirtGrid = () => {
  const router = useRouter();
  const { value } = useParamStore();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(value.page ?? 1);
  const [currentKeyword, setCurrentKeyword] = useState(value.keyword ?? "");

  const { queryPublicTShirts, isLoading } = usePublicTShirtsQuery({
    params: {
      page: currentPage,
      size: value.size ?? 12,
      sortBy: "createdAt",
      sortDir: "asc",
      keyword: currentKeyword,
    },
  });

  // Handle search function
  const handleSearch = () => {
    setCurrentKeyword(searchKeyword);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle pagination change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const hasData =
    queryPublicTShirts.data?.data?.content &&
    queryPublicTShirts.data.data.content.length > 0;

  const tshirts = queryPublicTShirts.data?.data?.content || [];

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search by name"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center">
          <PaginationTable
            value={
              queryPublicTShirts.data?.data ??
              ({
                content: [],
                totalElements: 0,
                totalPages: 0,
                pageSize: 0,
                pageNumber: 0,
              } as Pagination<TShirtPublicResponse>)
            }
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <LoadingDots size="lg" color="primary" />
        </div>
      ) : hasData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tshirts.map((tshirt: TShirtPublicResponse) => (
            <div
              key={tshirt.id}
              className="group cursor-pointer rounded-lg border bg-card shadow-sm hover:shadow-md transition-all duration-300"
              // onClick={() => router.push(`/t-shirt/${tshirt.id}`)}
            >
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={tshirt.imageUrl || "/placeholder.svg"}
                  alt={tshirt.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-base line-clamp-1">
                    {tshirt.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    New
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-1">
                  By {tshirt.accountName}
                </p>

                <div className="flex items-center gap-1">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => {
                        const rating = parseFloat(tshirt.rating || "0");
                        return (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        );
                      })}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({tshirt.rating || "0.0"})
                  </span>
                </div>

                {/* <Button variant="default" className="w-full mt-2">
                  View Details
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <div className="text-xl font-semibold text-muted-foreground mb-2">
            No T-Shirts Found
          </div>
          <p className="text-muted-foreground">
            {currentKeyword
              ? `No T-Shirts matching "${currentKeyword}" were found.`
              : "There are no T-Shirts available at the moment."}
          </p>
        </div>
      )}
    </div>
  );
};

export default TShirtGrid;
