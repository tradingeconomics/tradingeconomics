"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"
import { roles, statuses } from "../data/data"
import { Download } from "lucide-react"
import { downloadToExcel } from "@/lib/xlsx"

interface DataItem {
  CategoryGroup: string;
  // other properties as needed
} 


interface DataTableToolbarProps<TData > {
  table: Table<TData>
  data: TData[]
}
function createRoles(categoryGroups: string[]) {
  return categoryGroups.map(group => ({
    label: group,
    value: group

  }));
}

export function DataTableToolbar<TData>({
  table,
  data
}: DataTableToolbarProps<TData>) {
  // @ts-ignore
  const catArray = Array.from(new Set(data.map((item) => item.CategoryGroup)));
  const categoryGroups = createRoles(catArray); 
    const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search & filter indicator..."
          value={(table.getColumn("Title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
       
        {table.getColumn("CategoryGroup") && (
          <DataTableFacetedFilter
            column={table.getColumn("CategoryGroup")}
            title="Sort Category"
            options={categoryGroups}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button
      onClick={()=>downloadToExcel(data)}
          variant="outline"
          size="sm"
          className="ml-auto mr-4 hidden h-8 lg:flex border-green-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      <DataTableViewOptions table={table} />
    </div>
  )
}
