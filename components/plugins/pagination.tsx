import React from "react";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParamStore } from "@/domains/stores/params-store";

interface IPaginationTable<T> {
  value: Pagination<T>;
}

const PaginationTable = <T,>({ value }: IPaginationTable<T>) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const { setValue, value: params } = useParamStore();

  React.useEffect(() => {
    setValue({
      ...params,
      page: pageNumber,
      size: pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  return (
    <Pagination className=" justify-end">
      <PaginationContent>
        <Select onValueChange={(value) => setPageNumber(Number(value))}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Pick page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Page</SelectLabel>
              {Array.from(
                { length: Math.ceil(value.totalItems / value.pageSize) },
                (_, i) => i + 1
              ).map((item) => (
                <SelectItem value={String(item)} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setPageSize(Number(value))}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Pick size page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Size page</SelectLabel>
              {["1", "2", "6", "8", "50"].map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="border border-slate-200 rounded-lg p-1.5 shadow-sm px-4">
          <span>
            {value.pageNumber} of {Math.ceil(value.totalItems / value.pageSize)}
          </span>
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTable;
