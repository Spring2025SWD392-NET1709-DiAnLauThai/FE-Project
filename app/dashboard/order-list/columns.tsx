"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { BookingResponse, BookingStatus } from "@/domains/models/booking";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDetailModal } from "@/components/booking-detail-card";
import { useState } from "react";

export const columns: ColumnDef<BookingResponse>[] = [
  {
    accessorKey: "code",
    header: "Booking Code",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "totalQuantity",
    header: "Quantity",
  },

  {
    accessorKey: "assignedDesigner",
    header: "Assigned to",
    cell: ({ row }) => {
      const designer = row.getValue("assignedDesigner");
      return designer ? designer : "N/A";
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice"));
      // Format as currency
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
      return formatted;
    },
  },
  {
    accessorKey: "createdDate",
    header: "Created at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdDate"));
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "updateDate",
    header: "Updated at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updateDate"));
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as BookingStatus;

      // Define colors based on status
      let badgeClass;
      switch (status) {
        case BookingStatus.PENDING:
          badgeClass = "bg-yellow-500 hover:bg-yellow-600 text-white";
          break;
        case BookingStatus.CONFIRMED:
          badgeClass = "bg-green-500 hover:bg-green-600 text-white";
          break;
        case BookingStatus.COMPLETE:
          badgeClass = "bg-blue-500 hover:bg-blue-600 text-white";
          break;
        case BookingStatus.DEPOSIT_PAID:
          badgeClass = "bg-purple-500 hover:bg-purple-600 text-white";
          break;
        case BookingStatus.REFUNDED:
          badgeClass = "bg-orange-500 hover:bg-orange-600 text-white";
          break;
        case BookingStatus.UNPAID:
          badgeClass = "bg-red-500 hover:bg-red-600 text-white";
          break;
        default:
          badgeClass = "bg-gray-500 hover:bg-gray-600 text-white";
      }

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">View details</span>
            <Eye className="h-4 w-4" />
          </Button>          
        </div>
      );
    },
  },
];
