import React from "react";
import SearchInput from "../plugins/search-input";

const BookingTable = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />
        <div className="flex items-center space-x-4">
          {/* <PaginationTable
            value={
              listManuFactureQuery.data?.value ?? {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                hasNext: false,
              }
            }
          /> */}
        </div>
      </div>

      {/* <DataTable
        columns={ManufacturerColumns}
        data={listManuFactureQuery.data?.value?.items ?? []}
        isLoading={listManuFactureQuery.isLoading}
      /> */}
    </div>
  );
};

export default BookingTable;
