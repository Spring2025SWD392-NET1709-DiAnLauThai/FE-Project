// components/table/TaskTableFilter.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, FilterIcon, X } from "lucide-react";
import { format } from "date-fns";
import { TaskStatus } from "@/domains/models/tasks";

export type TaskFilterOptions = {
  status?: TaskStatus;
  createdFrom?: Date;
  createdTo?: Date;
  search?: string;
};

interface TaskTableFilterProps {
  onFilterChange: (filters: TaskFilterOptions) => void;
}

export function TaskTableFilter({ onFilterChange }: TaskTableFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<TaskFilterOptions>({});

  const handleFilterChange = (key: keyof TaskFilterOptions, value: any) => {
    setFilters((prev) => {
      // If value is ALL_STATUSES, remove the status filter
      if (key === "status" && value === "ALL_STATUSES") {
        const { status, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  };

  const resetFilters = () => {
    setFilters({});
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4" />
            Filters
            {Object.keys(filters).length > 0 &&
              filters.search === undefined && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {Object.keys(filters).length}
                </span>
              )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Status</h4>
              <Select
                value={filters.status || undefined}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL_STATUSES">All Statuses</SelectItem>
                  {Object.values(TaskStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium leading-none">Created From</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.createdFrom ? (
                      format(filters.createdFrom, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.createdFrom}
                    onSelect={(date) => handleFilterChange("createdFrom", date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium leading-none">Created To</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.createdTo ? (
                      format(filters.createdTo, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.createdTo}
                    onSelect={(date) => handleFilterChange("createdTo", date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-1" /> Reset
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
