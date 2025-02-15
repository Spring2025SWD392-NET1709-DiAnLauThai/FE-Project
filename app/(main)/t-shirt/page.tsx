import TShirtGrid from "@/components/card/t-shirt-grid";
import Sidebar from "@/components/layout/home-sidebar";
import React from "react";

const TShirtPage = () => {
  return (
    <main className="flex gap-20">
      <Sidebar />
      <TShirtGrid />
    </main>
  );
};

export default TShirtPage;
