import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services'
import { authKeys } from '../queryKeys'
import { useAuth } from './useAuth'

const EMPTY = []

export function usePermissions() {
  const { status } = useAuth()

  const query = useQuery({
    queryKey: authKeys.permissions(),
    queryFn: authService.getMyPermissions,
    select: (res) => res.data.permissions,
    enabled: status === 'authenticated',
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })

  const permissions = query.data ?? EMPTY

  const can = useCallback(
    (moduleCode, actionCode) => permissions.includes(`${moduleCode}:${actionCode}`),
    [permissions],
  )

return {
  permissions,
  can,
  isLoading: query.isLoading,
  isError: query.isError,
  refetch: query.refetch,
}
}