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

export default function UserViewDialog({ open, onOpenChange, user }) {
  const role = user?.role
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>User details</DialogTitle>
          <DialogDescription>Read-only view of this user.</DialogDescription>
        </DialogHeader>

        {user && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Detail label="Username">{user.userName}</Detail>
            <Detail label="Status">
              <StatusBadge active={user.isActive} />
            </Detail>
            <Detail label="Email">
              <span className="break-all">{user.email}</span>
            </Detail>
            <Detail label="Phone">{user.phone}</Detail>
            <Detail label="Role">{role?.name ?? '—'}</Detail>
            <Detail label="Role code">
              {role?.code ? (
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{role.code}</code>
              ) : (
                '—'
              )}
            </Detail>
            <Detail label="Last login">
              {user.lastLoginAt ? (
                formatDateTime(user.lastLoginAt)
              ) : (
                <span className="text-muted-foreground">Never logged in</span>
              )}
            </Detail>
            <Detail label="Created">{formatDateTime(user.createdAt)}</Detail>
            <Detail label="Last updated">{formatDateTime(user.updatedAt)}</Detail>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}