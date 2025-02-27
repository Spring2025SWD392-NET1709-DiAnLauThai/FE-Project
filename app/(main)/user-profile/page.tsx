"use client";

import React from "react";
import LeftSection from "@/components/user profile/leftsection";
import RightSection from "@/components/user profile/rightsection";


const UserProfilePage: React.FC = () => {
    return (
        <div className="flex min-h-screen">
            <LeftSection />
            <RightSection />
        </div>
    );
};

export default UserProfilePage;

