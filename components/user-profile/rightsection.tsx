"use client";

import React from "react";
import Image from "next/image";
import UserBack from "@/public/images/female.png";

const RightSection: React.FC = () => {
    return (
        <Image
            src={UserBack}
            alt="user-profile-background"
            className="w-1/2 relative rounded-lg"
        />
    );
};

export default RightSection;

