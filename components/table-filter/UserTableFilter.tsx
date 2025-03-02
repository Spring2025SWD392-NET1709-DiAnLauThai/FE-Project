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

export interface FilterOptions {
  [key: string]: any;
}

export interface TableFilterProps {
  onFilterChange: (filters: any) => void;
  filters?: Record<string, any>;
}

export function TableFilter({
  onFilterChange,
  filters: filterConfig,
}: TableFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  // Đếm số lượng filters được áp dụng, không tính keyword
  const activeFiltersCount = Object.keys(filters).filter(
    (key) =>
      key !== "keyword" &&
      filters[key] !== undefined &&
      filters[key] !== "" &&
      filters[key] !== null
  ).length;

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };

    // Nếu giá trị rỗng, xóa filter
    if (value === "" || value === undefined || value === null) {
      delete updatedFilters[key];
    }

    setFilters(updatedFilters);
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
      keyword: "",
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
        value={filters.keyword || ""}
        onChange={(e) => {
          handleFilterChange("keyword", e.target.value);
          // Apply search filter immediately
          onFilterChange({ ...filters, keyword: e.target.value });
        }}
      />

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {/* Đây là nơi để thêm nội dung filter */}
          <div className="space-y-4">
            {filterConfig &&
              Object.entries(filterConfig).map(([key, config]) => {
                if (key === "keyword") return null; // Không hiển thị lại keyword trong popover

                if (config.type === "select") {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <label htmlFor={key} className="text-sm font-medium">
                        {config.label}
                      </label>
                      <select
                        id={key}
                        className="w-full border rounded p-2"
                        onChange={(e) =>
                          handleFilterChange(key, e.target.value)
                        }
                        value={filters[key] || ""}
                      >
                        <option value="">
                          {config.placeholder || "Select..."}
                        </option>
                        {config.options?.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                if (config.type === "date") {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <label htmlFor={key} className="text-sm font-medium">
                        {config.label}
                      </label>
                      <Input
                        id={key}
                        type="date"
                        value={
                          filters[key] instanceof Date
                            ? filters[key].toISOString().split("T")[0]
                            : filters[key] || ""
                        }
                        onChange={(e) => {
                          if (!e.target.value) {
                            handleFilterChange(key, null);
                          } else {
                            handleFilterChange(key, new Date(e.target.value));
                          }
                        }}
                      />
                    </div>
                  );
                }

                return null;
              })}

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
