import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

function ActionButton({ label, icon: Icon, onClick, className = '' }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={className}
          onClick={onClick}
          aria-label={label}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export default function RowActions({ onView, onEdit, onDelete }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center justify-end gap-1">
        {onView && <ActionButton label="View" icon={Eye} onClick={onView} className='text-sky-600 hover:bg-sky-50 hover:text-sky-700' />}
        {onEdit && <ActionButton label="Edit" icon={Pencil} onClick={onEdit} />}
        {onDelete && (
          <ActionButton
            label="Delete"
            icon={Trash2}
            onClick={onDelete}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          />
        )}
      </div>
    </TooltipProvider>
  )
}