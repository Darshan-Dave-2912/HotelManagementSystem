import { DataTable, RowActions, StatusBadge } from '@/components/common'
import { formatDate } from '@/utils/formatDate'



export default function RolesTable({
  roles,
  isLoading,
  isFetching,
  sort,
  onSort,
  onView,
  onEdit,
  onDelete,
  status,
  onStatusChange
}) {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      sortKey: 'name',
      className: 'font-medium',
    },
    {
      key: 'code',
      header: 'Code',
      sortKey: 'code',
      cell: (role) => <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{role.code}</code>,
    },
    {
      key: 'description',
      header: 'Description',
      cell: (role) => (
        <span className="line-clamp-1 max-w-xs text-muted-foreground">{role.description || '—'}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      cell: (role) => <StatusBadge active={role.isActive} />,
      filter: {
      value: status,
      onChange: onStatusChange,
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortKey: 'createdAt',
      cell: (role) => formatDate(role.createdAt),
    },
    {
      key: 'actions',
      header: 'Actions',
      headClassName: 'text-right',
      cell: (role) => (
        <RowActions
          onView={onView && (() => onView(role))}
          onEdit={onEdit && (() => onEdit(role))}
          onDelete={onDelete && (() => onDelete(role))}
        />
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={roles}
      isLoading={isLoading}
      isFetching={isFetching}
      sort={sort}
      onSort={onSort}
      emptyMessage="No roles found"
    />
  )
}