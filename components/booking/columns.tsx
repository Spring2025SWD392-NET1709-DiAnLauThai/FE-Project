"use client";

import { BookingResponse } from "@/domains/models/booking";
import { ColumnDef } from "@tanstack/react-table";
import BookingMenuAction from "./menu-action";
import {
  formatFromISOString,
  formatPriceToVND,
  FormatType,
} from "@/lib/format";
import { Badge } from "../ui/badge";

export const BookingColumn: ColumnDef<BookingResponse>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <Badge variant="default">{formatPriceToVND(booking.totalPrice)}</Badge>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <Badge variant="default">
          {formatFromISOString(booking.startDate, FormatType.DATETIME)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <Badge variant="default">
          {formatFromISOString(booking.endDate, FormatType.DATETIME)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const booking = row.original;

      return <Badge variant="default">{booking.status}</Badge>;
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const booking = row.original;

      return <BookingMenuAction booking={booking} />;
    },
  },
];
