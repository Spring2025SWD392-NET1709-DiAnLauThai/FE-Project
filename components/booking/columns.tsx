"use client";

import { BookingResponse } from "@/domains/models/booking";
import { ColumnDef } from "@tanstack/react-table";
import BookingMenuAction from "./menu-action";

export const BookingColumn: ColumnDef<BookingResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    id: "action",
    cell: ({ row }) => {
      const booking = row.original;

      return <BookingMenuAction booking={booking} />;
    },
  },
];
