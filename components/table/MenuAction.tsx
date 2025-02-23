import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface RowActionsProps<TData> {
  row: TData;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onView?: (row: TData) => void;
}

export function RowActions<TData>({
  row,
  onEdit,
  onDelete,
  onView,
}: RowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={() => onView(row)}>View</DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={() => onDelete(row)}>
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
