import { Header } from "@/components/homepage/header";
import { SizeSelector } from "@/components/homepage/size-selector";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

import MalePic from "@/public/images/male.png";
import FemalePic from "@/public/images/female.png";
import { Layout } from "@/components/layout/layout-home";

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <main className="container mx-auto px-12  grid grid-cols-8 grid-rows-2 ">
        <div className="col-span-3  flex flex-col justify-start gap-2  col-start-1 row-start-2  pl-32 h-72 ">
          <h1 className="text-4xl font-bold">Create your own T-shirt</h1>
          <p className="text-gray-600">
            All of our t-shirt, designs are print-ready-perfect for your custom
            print-on-demand products
          </p>
          <div className="space-y-8">
            <SizeSelector />
            <Button className="bg-black text-white hover:bg-black/90">
              Start designing
            </Button>
          </div>
        </div>
        <div className="col-span-5 relative row-span-2 col-start-5 row-start-1 ">
          <div className="flex justify-center ">
            <Image
              src={MalePic}
              alt="male-clothing"
              className="w-80 absolute right-20 rounded-lg shadow-2xl"
            />
            <Image
              src={FemalePic}
              alt="female-clothing"
              className="w-80 absolute left-10 bottom-0 rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
