// components/table/TableFilter.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { UserRole } from "@/domains/models/user";

export type FilterOptions = {
  role?: string;
  status?: string;
  createdFrom?: Date;
  createdTo?: Date;
  search?: string;
};

interface TableFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function TableFilter({ onFilterChange }: TableFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      if (!value) delete updated[key];
      return updated;
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };


   const resetAndApplyFilters = () => {
     // Create a consistent empty filters object with all fields explicitly set
     const emptyFilters: FilterOptions = {
       role: undefined,
       status: undefined,
       createdFrom: undefined,
       createdTo: undefined,
       search: "",
     };

     // Update local state with the same object we'll send to parent
     setFilters(emptyFilters);

     // Send the explicitly defined empty filters to parent
     onFilterChange(emptyFilters);
     setIsOpen(false);
   };


  return (
    <div className="flex items-center gap-2 pb-5">
      <Input
        placeholder="Search users..."
        className="max-w-sm"
        value={filters.search || ""}
        onChange={(e) => {
          handleFilterChange("search", e.target.value);
          // Apply search filter immediately
          onFilterChange({ ...filters, search: e.target.value });
        }}
      />

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
              <h4 className="font-medium leading-none">Role</h4>
              <Select
                value={filters.role || undefined}
                onValueChange={(value) => handleFilterChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL_ROLES">All Roles</SelectItem>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
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

            <div className="flex items-center justify-center pt-2">
              
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAndApplyFilters}
                >
                  Reset & Apply
                </Button>
                <Button size="sm" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
