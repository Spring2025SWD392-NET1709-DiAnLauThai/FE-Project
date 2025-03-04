import OrderForm from "@/components/order-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const MyOrderPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Order</h1>
      <Tabs defaultValue="order-list" className="">
        <TabsList className="">
          <TabsTrigger value="order-list">Order List</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="order-form">Order Form</TabsTrigger>
        </TabsList>

        {/* <TabsContent value="order-form">
          <div>Order Form</div>
        </TabsContent> */}
        <TabsContent value="order-list">
          <div>Order List</div>
          {/* <OrderList /> */}
        </TabsContent>
        <TabsContent value="transactions">
          <div>Transactions</div>
          {/* <Transactions /> */}
        </TabsContent>
        <TabsContent value="order-form">
          <OrderForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOrderPage;
