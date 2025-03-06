"use client";

import React, { useState } from "react";
import Comment from "@/components/designs-review/comment";
import initialReviewsData from "@/components/designs-review/comment-data";

interface Review {
  id: number;
  name: string;
  content: string;
  rating: number;
}

const ServiceReviewPage: React.FC = () => {
  const [reviews] = useState<Review[]>(initialReviewsData.map((review, index) => ({ id: index + 1, ...review })));
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Service Reviews</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Comment key={review.id} review={review} />
        ))}
      </div>
      </div>
    
  );
};

export default ServiceReviewPage;
