import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfirmDialog, PageHeader, TablePagination } from '@/components/common'
import { ACTION_CODES, MODULE_CODES } from '@/constants/permissionCodes'
import { usePermissions } from '@/features/auth'
import { UserFormDialog, UsersFilters, UsersTable, UserViewDialog } from '../components'
import { useRoleOptions } from '../hooks/useRoleOptions'
import { useUserMutations } from '../hooks/useUserMutations'
import { useUsersTable } from '../hooks/useUsersTable'

export default function UsersPage() {
  const { can } = usePermissions()
  const canCreate = can(MODULE_CODES.USERS, ACTION_CODES.CREATE)
  const canUpdate = can(MODULE_CODES.USERS, ACTION_CODES.UPDATE)
  const canDelete = can(MODULE_CODES.USERS, ACTION_CODES.DELETE)

  const table = useUsersTable()
  const roleOptions = useRoleOptions()
  const { createUser, updateUser, deleteUser } = useUserMutations()

  const [formState, setFormState] = useState({ open: false, user: null })
  const [viewState, setViewState] = useState({ open: false, user: null })
  const [deleteState, setDeleteState] = useState({ open: false, user: null })

  const handleSave = async (payload) => {
    if (formState.user) {
      await updateUser.mutateAsync({ id: formState.user.id, payload })
    } else {
      await createUser.mutateAsync(payload)
    }
    setFormState((state) => ({ ...state, open: false }))
  }

  const handleDelete = async () => {
    try {
      await deleteUser.mutateAsync(deleteState.user.id)
      table.handleDeleted()
    } catch {
      // error toast useUserMutations me already dikh jata hai
    } finally {
      setDeleteState((state) => ({ ...state, open: false }))
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Users"
        description="Manage the users who can access the hotel system."
        action={
          canCreate && (
            <Button onClick={() => setFormState({ open: true, user: null })}>
              <Plus className="size-4" />
              Add user
            </Button>
          )
        }
      />

      <UsersFilters
        search={table.search}
        onSearchChange={table.changeSearch}
        hasFilters={table.hasFilters}
        onReset={table.resetFilters}
      />

      {table.isError ? (
        <div className="space-y-3 rounded-lg border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            {table.error?.message || 'Could not load users.'}
          </p>
          <Button variant="outline" onClick={() => table.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <UsersTable
            users={table.users}
            isLoading={table.isLoading}
            isFetching={table.isFetching}
            sort={table.sort}
            onSort={table.toggleSort}
            roleId={table.roleId}
            onRoleChange={table.changeRole}
            roleOptions={roleOptions.roles}
            status={table.status}
            onStatusChange={table.changeStatus}
            onView={(user) => setViewState({ open: true, user })}
            onEdit={canUpdate ? (user) => setFormState({ open: true, user }) : undefined}
            onDelete={canDelete ? (user) => setDeleteState({ open: true, user }) : undefined}
          />
          <TablePagination
            pagination={table.pagination}
            onPageChange={table.setPage}
            onLimitChange={table.changeLimit}
          />
        </>
      )}

      <UserFormDialog
        open={formState.open}
        onOpenChange={(open) => setFormState((state) => ({ ...state, open }))}
        user={formState.user}
        roles={roleOptions.roles}
        rolesLoading={roleOptions.isLoading}
        rolesError={roleOptions.isError}
        onRetryRoles={roleOptions.refetch}
        onSubmit={handleSave}
      />

      <UserViewDialog
        open={viewState.open}
        onOpenChange={(open) => setViewState((state) => ({ ...state, open }))}
        user={viewState.user}
      />

      <ConfirmDialog
        open={deleteState.open}
        onOpenChange={(open) => setDeleteState((state) => ({ ...state, open }))}
        title="Delete user?"
        description={`Are you sure you want to delete the user "${deleteState.user?.userName ?? ''}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={deleteUser.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}