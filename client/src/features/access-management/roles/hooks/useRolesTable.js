import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { rolesService } from '@/services'
import { useDebounce } from '@/hooks/useDebounce'
import { roleKeys } from '../queryKeys'

const DEFAULT_SORT = { sortBy: 'createdAt', sortOrder: 'DESC' }

export function useRolesTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all') // all | active | inactive
  const [sort, setSort] = useState(DEFAULT_SORT)

  const debouncedSearch = useDebounce(search.trim(), 400)

  const params = {
    page,
    limit,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(status !== 'all' && { isActive: status === 'active' }),
  }

  const query = useQuery({
    queryKey: roleKeys.list(params),
    queryFn: () => rolesService.getRoles(params),
    placeholderData: keepPreviousData,
  })

  const roles = query.data?.data ?? []
  const pagination = query.data?.pagination

  const changeSearch = (value) => {
    setSearch(value)
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
    setStatus('all')
    setPage(1)
  }

  // page ka last record delete hone par ek page peeche jao
  const handleDeleted = () => {
    if (roles.length === 1 && page > 1) setPage((p) => p - 1)
  }

  return {
    roles,
    pagination,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    search,
    status,
    sort,
    hasFilters: search !== '' || status !== 'all',
    setPage,
    changeSearch,
    changeStatus,
    changeLimit,
    toggleSort,
    resetFilters,
    handleDeleted,
  }
}