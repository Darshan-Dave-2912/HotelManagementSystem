import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfirmDialog, PageHeader, TablePagination } from '@/components/common'
import { ACTION_CODES, MODULE_CODES } from '@/constants/permissionCodes'
import { usePermissions } from '@/features/auth'
import { RoleFormDialog, RolesFilters, RolesTable, RoleViewDialog } from '../components'
import { useRoleMutations } from '../hooks/useRoleMutations'
import { useRolesTable } from '../hooks/useRolesTable'

export default function RolesPage() {
  const { can } = usePermissions()
  const canCreate = can(MODULE_CODES.ROLES, ACTION_CODES.CREATE)
  const canUpdate = can(MODULE_CODES.ROLES, ACTION_CODES.UPDATE)
  const canDelete = can(MODULE_CODES.ROLES, ACTION_CODES.DELETE)

  const table = useRolesTable()
  const { createRole, updateRole, deleteRole } = useRoleMutations()

  const [formState, setFormState] = useState({ open: false, role: null })
  const [viewState, setViewState] = useState({ open: false, role: null })
  const [deleteState, setDeleteState] = useState({ open: false, role: null })

  const handleSave = async (payload) => {
    if (formState.role) {
      await updateRole.mutateAsync({ id: formState.role.id, payload })
    } else {
      await createRole.mutateAsync(payload)
    }
    setFormState((state) => ({ ...state, open: false }))
  }

  const handleDelete = async () => {
    try {
      await deleteRole.mutateAsync(deleteState.role.id)
      table.handleDeleted()
    } catch {
      // error toast useRoleMutations me already dikh jata hai
    } finally {
      setDeleteState((state) => ({ ...state, open: false }))
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Roles"
        description="Manage the roles used across the hotel system."
        action={
          canCreate && (
            <Button onClick={() => setFormState({ open: true, role: null })}>
              <Plus className="size-4" />
              Add role
            </Button>
          )
        }
      />

      <RolesFilters
        search={table.search}
        onSearchChange={table.changeSearch}
        status={table.status}
        onStatusChange={table.changeStatus}
        hasFilters={table.hasFilters}
        onReset={table.resetFilters}
      />

      {table.isError ? (
        <div className="space-y-3 rounded-lg border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            {table.error?.message || 'Could not load roles.'}
          </p>
          <Button variant="outline" onClick={() => table.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <RolesTable
            roles={table.roles}
            isLoading={table.isLoading}
            isFetching={table.isFetching}
            sort={table.sort}
            onSort={table.toggleSort}
            onView={(role) => setViewState({ open: true, role })}
            onEdit={canUpdate ? (role) => setFormState({ open: true, role }) : undefined}
            onDelete={canDelete ? (role) => setDeleteState({ open: true, role }) : undefined}
          />
          <TablePagination
            pagination={table.pagination}
            onPageChange={table.setPage}
            onLimitChange={table.changeLimit}
          />
        </>
      )}

      <RoleFormDialog
        open={formState.open}
        onOpenChange={(open) => setFormState((state) => ({ ...state, open }))}
        role={formState.role}
        onSubmit={handleSave}
      />

      <RoleViewDialog
        open={viewState.open}
        onOpenChange={(open) => setViewState((state) => ({ ...state, open }))}
        role={viewState.role}
      />

      <ConfirmDialog
        open={deleteState.open}
        onOpenChange={(open) => setDeleteState((state) => ({ ...state, open }))}
        title="Delete role?"
        description={`Are you sure you want to delete the role "${deleteState.role?.name ?? ''}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={deleteRole.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}