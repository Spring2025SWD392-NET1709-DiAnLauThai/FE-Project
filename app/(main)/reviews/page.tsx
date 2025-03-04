"use client";

import React, { useState } from "react";
import Comment from "@/components/reviews/comment";
import initialReviewsData from "@/components/reviews/comment-data";

interface Review {
  id: number;
  name: string;
  content: string;
  rating: number;
}

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(
    initialReviewsData.map((review, index) => ({ id: index + 1, ...review }))
  );
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(5);

  const handleAddReview = () => {
    if (!newReview) return;

    const newId = reviews.length + 1;
    const review: Review = {
      id: newId,
      name: "Anonymous", // Có thể thay đổi thành tên đăng nhập của người dùng
      content: newReview,
      rating: newRating,
    };
    setReviews([...reviews, review]);
    setNewReview("");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">User Reviews</h1>

      {/* Hiển thị danh sách đánh giá */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Comment key={review.id} review={review} />
        ))}
      </div>

      {/* Form thêm đánh giá mới */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add a Review</h2>
        <textarea
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          rows={4}
          placeholder="Write your review here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>

        <label className="block mb-2 font-medium">Rating:</label>
        <select
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          value={newRating}
          onChange={(e) => setNewRating(Number(e.target.value))}
        >
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>

        <button
          onClick={handleAddReview}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;

