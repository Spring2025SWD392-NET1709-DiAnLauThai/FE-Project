"use client";

import { BookingResponse } from "@/domains/models/booking";
import { ColumnDef } from "@tanstack/react-table";
import {
  formatFromISOString,
  formatPriceToVND,
  FormatType,
} from "@/lib/format";
import { Badge } from "../ui/badge";
import BookingDashboardMenuAction from "./menu-action";
import { SelectedDesigner } from "./selected-designer";

export const BookingDashboardColumn: ColumnDef<BookingResponse>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "title",
    header: "Title",
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

      return <BookingDashboardMenuAction booking={booking} />;
    },
  },
];
