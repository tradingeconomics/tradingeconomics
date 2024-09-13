'use client'
import { CountrySnapshot } from '@/types/types'
import {ColumnDef} from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { roles } from '../data/data'


export const columns : ColumnDef<CountrySnapshot>[] = [
  // {
  //   header: "ID",
  //   accessorKey : "id"
  // },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Indicator" />
    ),
    accessorKey : "Title"
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last" />
    ),
    accessorKey : "LatestValue"
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Previous" />
    ),
    accessorKey : "PreviousValue"
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    accessorKey : "Unit",

    

  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Group" />
    ),
    accessorKey: "CategoryGroup",
 
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  }

  
]