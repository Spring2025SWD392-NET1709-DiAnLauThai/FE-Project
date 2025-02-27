"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import UserPro from "@/public/images/profile-picture.jpg";

interface UserProfileData {
    id: string;
    email: string;
    name: string;
    phone: string;
    address: string;
    date_of_birth: string;
    profile_picture: string;
}

const LeftSection: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

    useEffect(() => {
        const mockUserProfile: UserProfileData = {
            id: "1",
            email: "example@example.com",
            name: "John Doe",
            phone: "123-456-7890",
            address: "123 Main Street, City, Country",
            date_of_birth: "1990-01-01",
            profile_picture: "/profile-picture.jpg",
        };
        setTimeout(() => {
            setUserProfile(mockUserProfile);
        }, 1000);
    }, []);

    if (!userProfile) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="w-1/2 bg-white p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <Image
                src={UserPro}
                alt="user-profile"
                className="w-1/2 relative rounded-full"
            />
            <div className="w-full max-w-md">
                <label className="block font-medium mb-2">Name:</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={userProfile.name}
                    readOnly
                />

                <label className="block font-medium mb-2">Email:</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={userProfile.email}
                    readOnly
                />

                <label className="block font-medium mb-2">Phone Number:</label>
                <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={userProfile.phone}
                    readOnly
                />

                <label className="block font-medium mb-2">Address:</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={userProfile.address}
                    readOnly
                />

                <label className="block font-medium mb-2">Date of Birth:</label>
                <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={userProfile.date_of_birth}
                    readOnly
                />

                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default LeftSection;
