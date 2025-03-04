"use client";

import React from "react";

const RightSection: React.FC = () => {
    return (
        <div
            className="w-1/2"
            style={{
                backgroundImage: "url('/your-background.jpg')", // Thay đổi đường dẫn hình ảnh
                backgroundSize: "cover",
                backgroundPosition: "right",
            }}
        ></div>
    );
};

export default RightSection;
