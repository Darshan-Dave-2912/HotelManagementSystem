import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usersService } from '@/services'
import { useDebounce } from '@/hooks/useDebounce'
import { userKeys } from '../queryKeys'

const DEFAULT_SORT = { sortBy: 'createdAt', sortOrder: 'DESC' }

export function useUsersTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [roleId, setRoleId] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState(DEFAULT_SORT)

  const debouncedSearch = useDebounce(search.trim(), 400)

  const params = {
    page,
    limit,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(roleId !== 'all' && { roleId: Number(roleId) }),
    ...(status !== 'all' && { isActive: status === 'active' }),
  }

  const query = useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => usersService.getUsers(params),
    placeholderData: keepPreviousData,
  })

  const users = query.data?.data ?? []
  const pagination = query.data?.pagination

  const changeSearch = (value) => {
    setSearch(value)
    setPage(1)
  }

  const changeRole = (value) => {
    setRoleId(value)
    setPage(1)
  }

  const changeStatus = (value) => {
    setStatus(value)
    setPage(1)
  }

  const changeLimit = (value) => {
    setLimit(value)
    setPage(1)
  }

  const toggleSort = (sortBy) => {
    setSort((prev) =>
      prev.sortBy === sortBy
        ? { sortBy, sortOrder: prev.sortOrder === 'ASC' ? 'DESC' : 'ASC' }
        : { sortBy, sortOrder: 'ASC' },
    )
    setPage(1)
  }

  const resetFilters = () => {
    setSearch('')
    setRoleId('all')
    setStatus('all')
    setPage(1)
  }

  const handleDeleted = () => {
    if (users.length === 1 && page > 1) setPage((p) => p - 1)
  }

  return {
    users,
    pagination,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    search,
    roleId,
    status,
    sort,
    hasFilters: search !== '' || roleId !== 'all' || status !== 'all',
    setPage,
    changeSearch,
    changeRole,
    changeStatus,
    changeLimit,
    toggleSort,
    resetFilters,
    handleDeleted,
  }
}