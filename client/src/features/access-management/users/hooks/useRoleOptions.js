import { useQuery } from '@tanstack/react-query'
import { rolesService } from '@/services'
import { userKeys } from '../queryKeys'

export function useRoleOptions() {
  const query = useQuery({
    queryKey: userKeys.roleOptions(),
    queryFn: () => rolesService.getRoles({ limit: 100, sortBy: 'name', sortOrder: 'ASC' }),
    select: (res) => res.data,
    staleTime: 60_000,
  })

  return {
    roles: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  }
}