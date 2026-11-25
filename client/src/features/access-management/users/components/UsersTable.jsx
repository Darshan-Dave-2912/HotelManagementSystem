import { DataTable, RowActions, StatusBadge } from '@/components/common'
import { formatDate, formatDateTime } from '@/utils/formatDate'

export default function UsersTable({
  users,
  isLoading,
  isFetching,
  sort,
  onSort,
  onView,
  onEdit,
  onDelete,
  roleId,
  onRoleChange,
  roleOptions,
  status,
  onStatusChange,
}) {
  const columns = [
    {
      key: 'userName',
      header: 'Username',
      sortKey: 'userName',
      className: 'font-medium',
    },
    {
      key: 'email',
      header: 'Email',
      sortKey: 'email',
    },
    {
      key: 'phone',
      header: 'Phone',
      sortKey: 'phone',
    },
    {
      key: 'role',
      header: 'Role',
      cell: (user) => user.role?.name ?? '—',
      filter: {
        value: roleId,
        onChange: onRoleChange,
        label: 'Filter by role',
        options: [
          { label: 'All roles', value: 'all' },
          ...roleOptions.map((role) => ({ label: role.name, value: String(role.id) })),
        ],
      },
    },
    {
      key: 'isActive',
      header: 'Status',
      cell: (user) => <StatusBadge active={user.isActive} />,
      filter: {
        value: status,
        onChange: onStatusChange,
        label: 'Filter by status',
        options: [
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
      },
    },
    {
      key: 'lastLoginAt',
      header: 'Last login',
      sortKey: 'lastLoginAt',
      cell: (user) =>
        user.lastLoginAt ? (
          formatDateTime(user.lastLoginAt)
        ) : (
          <span className="text-muted-foreground">Never</span>
        ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortKey: 'createdAt',
      cell: (user) => formatDate(user.createdAt),
    },
    {
      key: 'actions',
      header: 'Actions',
      headClassName: 'text-right',
      cell: (user) => (
        <RowActions
          onView={onView && (() => onView(user))}
          onEdit={onEdit && (() => onEdit(user))}
          onDelete={onDelete && (() => onDelete(user))}
        />
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      isFetching={isFetching}
      sort={sort}
      onSort={onSort}
      emptyMessage="No users found"
    />
  )
}