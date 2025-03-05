"use client";

import { useParamStore } from "@/domains/stores/params-store";
import { useKeyQueryStore } from "@/domains/stores/use-key-query";
import { useDebounce } from "@/hooks/plugins/use-debounce";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  keyValue: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ keyValue, ...props }) => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { setKeyword } = useKeyQueryStore();
  const { setValue } = useParamStore();
  const debouncedValue = useDebounce(searchValue, 500);

  React.useEffect(() => {
    if (keyValue) {
      setKeyword(keyValue);
    }
  }, [keyValue, setKeyword]);

  React.useEffect(() => {
    if (debouncedValue) {
      setValue({
        page: 1,
        size: 10,
        keyword: debouncedValue,
      });
    }
  }, [debouncedValue, setValue]);

  return (
    <div
      className={cn(
        "flex items-center px-2 border border-muted-foreground rounded-lg py-1",
        props.className
      )}
    >
      <div className=" inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Search className="size-4 text-gray-400" />
      </div>
      <input
        {...props}
        value={searchValue}
        onChange={(e) => {
          console.log("e.target.value", e.target.value);

          if (e.target.value === "") {
            setValue({
              page: 1,
              size: 10,
              keyword: "",
            });
          }

          setSearchValue(e.target.value);
        }}
        type="search"
        className="focus:outline-none focus:border-none"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
