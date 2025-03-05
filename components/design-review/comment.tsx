"use client";

import React from "react";

interface Review {
    id: number;
    name: string;
    content: string;
    rating: number;
}

interface CommentProps {
    review: Review;
}

const Comment: React.FC<CommentProps> = ({ review }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{review.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
                Rating: {review.rating} / 5 ⭐
            </p>
            <p>{review.content}</p>
        </div>
    );
};

export default Comment;
