"use client";

import { ColumnDef } from "@tanstack/react-table";
import BookingMenuAction from "./menu-action";
import {
  formatFromISOStringVN,
  formatPriceToVND,
  FormatType,
} from "@/lib/format";
import { Badge } from "../ui/badge";
import { TransactionResponse } from "@/domains/models/transaction";
import TransactionMenuAction from "../screen/transaction/menu-action";

export const TransactionColumns: ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: "transactionName",
    header: "Transaction Name",
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <Badge variant="outline">
          {formatPriceToVND(transaction.transactionAmount)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <Badge variant="outline">
          {formatFromISOStringVN(
            transaction.transactionDate,
            FormatType.DATETIME
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "bankCode",
    header: "Bank Code",
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const transaction = row.original;

      return transaction.reason || "N/A";
    },
  },
  {
    accessorKey: "transactionMethod",
    header: "Method",
  },
  {
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => {
      const transaction = row.original;

      return transaction.transactionType || "N/A";
    },
  },
  {
    accessorKey: "transactionStatus",
    header: "Status",
    cell: ({ row }) => {
      const transaction = row.original;
      const status = transaction.transactionStatus;

      // Define status color variants with proper typing
      let variant:
        | "default"
        | "secondary"
        | "destructive"
        | "outline"
        | "success"
        | "warning" = "default";

      switch (status?.toLowerCase()) {
        case "completed":
        case "success":
          variant = "success";
          break;
        case "pending":
        case "processing":
          variant = "warning";
          break;
        case "failed":
        case "cancelled":
          variant = "destructive";
          break;
        default:
          variant = "secondary";
      }

      return <Badge variant={variant}>{status || "Unknown"}</Badge>;
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
