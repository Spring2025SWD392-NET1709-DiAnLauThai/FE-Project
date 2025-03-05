"use client";

import React, { useState } from "react";
import Comment from "@/components/service-review/comment";
import initialReviewsData from "@/components/service-review/comment-data";

interface Review {
  id: number;
  name: string;
  content: string;
  rating: number;
}

const ServiceReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviewsData.map((review, index) => ({ id: index + 1, ...review })));
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(5);

  const handleAddReview = () => {
    if (!newReview) return;

    const newId = reviews.length + 1;
    const review: Review = {
      id: newId,
      name: "Anonymous",
      content: newReview,
      rating: newRating,
    };
    setReviews([...reviews, review]);
    setNewReview("");
    setNewRating(5); // Reset rating
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Service Reviews</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Comment key={review.id} review={review} />
        ))}
      </div>

      {/* Form thêm đánh giá */}
      <div className="mt-6">
        {/* Hệ thống đánh giá sao - đặt TRÊN ô nhập review */}
        <div className="flex flex-col items-start mb-4">
          <label className="font-medium mb-2">Your Rating:</label>
          <div className="rating flex flex-row-reverse">
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={newRating === star}
                  onChange={() => setNewRating(star)}
                  className="hidden peer"
                />
                <label
                  htmlFor={`star${star}`}
                  className="cursor-pointer text-3xl text-gray-300 transition-colors duration-200 peer-checked:text-yellow-400 hover:text-yellow-400"
                >
                  ★
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Ô nhập review */}
        <textarea
          className="w-full border p-2 rounded-lg mb-4"
          rows={4}
          placeholder="Write your review here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>

        <button
          onClick={handleAddReview}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ServiceReviewPage;
