"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const TEUrl = 'https://tradingeconomics.com';

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility: { url: false },
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex items-center flex-1 gap-4 flex-wrap">
          <Input
            placeholder="Search by symbol..."
            value={
              (table.getColumn("symbol")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("symbol")?.setFilterValue(event.target.value)
            }
            className="max-w-[15rem]"
          />
          <Select
            value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => {
              table.getColumn("type")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by market type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bonds">Bonds</SelectItem>
              <SelectItem value="currency">Currency</SelectItem>
              <SelectItem value="index">Index</SelectItem>
              <SelectItem value="stocks">Stocks</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={(table.getColumn("state")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => {
              table.getColumn("state")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by market state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="close">Close</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => table.resetColumnFilters()}>
          Clear Filters
        </Button>
      </div>
      <div className="flex-1 min-h-[calc(100lvh_-_18rem)] py-8">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    window.open(
                      `${TEUrl}${row.getValue("url")}`,
                      "_blank",
                      "noreferrer=true"
                    );
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        hasNextPage={table.getCanNextPage()}
        hasPrevPage={table.getCanPreviousPage()}
        handleNextClick={() => table.nextPage()}
        handlePrevClick={() => table.previousPage()}
      />
    </div>
  );
}
