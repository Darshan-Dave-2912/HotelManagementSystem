import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ColumnFilter } from '@/components/common';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function DataTable({
  columns,
  data,
  isLoading = false,
  isFetching = false,
  sort,
  onSort,
  emptyMessage = 'No records found',
  skeletonRows = 5,
}) {
  return (
    <div className={`rounded-lg border transition-opacity ${isFetching && !isLoading ? 'opacity-60' : ''}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => {
              const sortable = Boolean(col.sortKey && onSort)
              const active = sortable && sort?.sortBy === col.sortKey
              const SortIcon = !active ? ArrowUpDown : sort.sortOrder === 'ASC' ? ArrowUp : ArrowDown

              return (
                <TableHead key={col.key} className={col.headClassName}>
                  <div className="flex items-center">
                    {sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort(col.sortKey)}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      {col.header}
                      <SortIcon className={`size-3.5 ${active ? '' : 'text-muted-foreground/60'}`} />
                    </button>
                  ) : (
                    col.header
                  )}
                  {col.filter && <ColumnFilter {...col.filter} />}
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.cell ? col.cell(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}