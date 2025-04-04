import TransactionCustomerTable from "@/components/transaction-customer/table";
import React from "react";

const TransactionPage = () => {
  return (
    <main>
      <section className="flex justify-start items-baseline px-4 bg-muted-foreground/20 py-6 rounded-sm">
        <h1 className="text-3xl font-bold ">My Transaction</h1>
      </section>
      
      <section className="mt-10">
        <TransactionCustomerTable />
      </section>
    </main>
  );
};

export default TransactionPage;
