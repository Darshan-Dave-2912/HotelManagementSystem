import { Filter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function ColumnFilter({ value, onChange, options, label = 'Filter' }) {
  const active = value !== options[0].value

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={`relative ml-1 inline-flex size-6 items-center justify-center rounded hover:bg-muted ${
            active ? 'text-primary' : 'text-muted-foreground/60'
          }`}
        >
          <Filter className="size-3.5" />
          {active && <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-primary" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}