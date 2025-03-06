"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import BackImg from "@/public/images/your-background.jpg";
import { Header } from "@/components/homepage/header";

// Import động để tối ưu hiệu suất
const DesignReviewPage = dynamic(() => import("@/components/designs-review"));
const ServiceReviewPage = dynamic(() => import("@/components/service-review"));

const ReviewPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"design" | "service">("design");

  return (
    <div> <Header />
    <div className="flex min-h-screen">
      
      {/* Phần hình ảnh bên trái */}
      <div className="w-1/2 relative">
        <Image
          src={BackImg}
          alt="user-profile-background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      
      {/* Phần review bên phải */}
      <div className="w-1/2 p-6 bg-gray-100 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">User Reviews</h1>

        {/* Tabs để chọn loại review */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setSelectedTab("design")}
            className={`py-2 px-4 rounded-lg ${selectedTab === "design" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Design Reviews
          </button>
          <button
            onClick={() => setSelectedTab("service")}
            className={`py-2 px-4 rounded-lg ${selectedTab === "service" ? "bg-green-500 text-white" : "bg-gray-300"}`}
          >
            Service Reviews
          </button>
        </div>

        {/* Render trang dựa trên tab đã chọn */}
        {selectedTab === "design" ? <DesignReviewPage /> : <ServiceReviewPage />}
      </div>
    </div>
    </div>
  );
};

export default ReviewPage;