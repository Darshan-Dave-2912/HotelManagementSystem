
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function TablePagination({
  pagination,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 50],
}) {
  if (!pagination) return null

  const {
    page,
    limit,
    totalRecords,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = pagination

  const from = totalRecords === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, totalRecords)

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">

      {/* Rows per page - Left */}
      <div className="flex items-center gap-2 justify-self-start">
        <span className="text-sm text-muted-foreground">
          Rows per page
        </span>

        <Select
          value={String(limit)}
          onValueChange={(v) => onLimitChange(Number(v))}
        >
          <SelectTrigger className="w-[72px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {limitOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls - Center */}
      <div className="flex items-center gap-2 justify-self-center">
        <Button
          variant="outline"
          size="icon"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="text-sm whitespace-nowrap">
          Page {page} of {Math.max(totalPages, 1)}
        </span>

        <Button
          variant="outline"
          size="icon"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Record Information - Right */}
      <p className="text-sm text-muted-foreground sm:justify-self-end">
        Showing {from}–{to} of {totalRecords}
      </p>

    </div>
  )
}
