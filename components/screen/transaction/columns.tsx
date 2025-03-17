"use client";

import { TransactionResponse } from "@/domains/models/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../ui/badge";
import TransactionMenuAction from "./menu-action";

export const TransactionColumns: ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "bankCode",
    header: "Bank Code",
    cell: ({ row }) => {
      const bankCode = row.original.bankCode;
      return <span>{bankCode}</span>;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const reason = row.original.reason;
      return <span>{reason}</span>;
    },
  },
  {
    accessorKey: "transactionStatus",
    header: "Status",
    cell: ({ row }) => {
      const transactionStatus = row.original.transactionStatus;
      return <Badge variant="default">{transactionStatus}</Badge>;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const transaction = row.original;
      return <TransactionMenuAction transaction={transaction} />;
    },
  },
];
