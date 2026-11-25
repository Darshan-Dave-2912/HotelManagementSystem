import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/common'

export default function UsersFilters({ search, onSearchChange, hasFilters, onReset }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search by username, email or phone..."
        className="w-full sm:max-w-sm"
      />

      {hasFilters && (
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  )
}