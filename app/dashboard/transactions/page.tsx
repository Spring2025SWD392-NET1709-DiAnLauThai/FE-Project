import React from "react";
import TransactionTable from "@/components/screen/transaction/table";

const TransactionPage = () => {
  return (
    <main>
      <section className="flex justify-start items-baseline px-4 bg-muted-foreground/20 py-6 rounded-sm">
        <h1 className="text-3xl font-bold">System Transactions</h1>
      </section>

      <section className="mt-6 px-4">
        <TransactionTable />
      </section>
    </main>
  );
};

export default TransactionPage;
