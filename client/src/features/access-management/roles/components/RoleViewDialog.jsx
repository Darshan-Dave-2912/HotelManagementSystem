import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { StatusBadge } from '@/components/common'
import { formatDateTime } from '@/utils/formatDate'

function Detail({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  )
}

export default function RoleViewDialog({ open, onOpenChange, role }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Role details</DialogTitle>
          <DialogDescription>Read-only view of this role.</DialogDescription>
        </DialogHeader>

        {role && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Detail label="Name">{role.name}</Detail>
            <Detail label="Code">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{role.code}</code>
            </Detail>
            <Detail label="Status">
              <StatusBadge active={role.isActive} />
            </Detail>
            <Detail label="Created">{formatDateTime(role.createdAt)}</Detail>
            <div className="sm:col-span-2">
              <Detail label="Description">{role.description || '—'}</Detail>
            </div>
            <Detail label="Last updated">{formatDateTime(role.updatedAt)}</Detail>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}