"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserProfileForm } from "@/hooks/user/use-profile-user-form";
import { Skeleton } from "@/components/ui/skeleton";

const LeftSection: React.FC = () => {
  const {
    form,
    onSubmit,
    isLoading,
    isLoadingUser,
    userData,
    error,
    profileImage,
    handleImageUpload,
  } = useUserProfileForm();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (isLoadingUser) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <Skeleton className="h-48 w-48 rounded-full" />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
            <Skeleton className="h-10 w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Failed to load profile</h2>
          <p className="text-gray-500">Please try refreshing the page</p>
          <p className="text-red-500 mt-2">{String(error)}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Profile Information
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Profile Picture */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div
            className="relative mb-6 cursor-pointer group"
            onClick={handleImageClick}
          >
            <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
              <Image
                src={profileImage || "/images/Default.png"}
                alt="User Profile"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium px-3 py-1 bg-black bg-opacity-50 rounded-md">
                Change Photo
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <p className="text-gray-500 text-sm text-center max-w-[250px]">
            Click on the image to update your profile picture
          </p>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-2/3">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number (e.g., 0987654321)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isDirty || isLoading}
                  variant={form.formState.isDirty ? "default" : "outline"}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
