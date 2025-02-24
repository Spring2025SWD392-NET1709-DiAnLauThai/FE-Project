import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
  searchColumn?: keyof TData;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}
