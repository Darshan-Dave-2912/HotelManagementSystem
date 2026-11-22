import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services'
import { authKeys } from '../queryKeys'
import { useAuth } from './useAuth'

export function useMe() {
  const { status } = useAuth()

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authService.getMe,
    select: (res) => res.data,
    enabled: status === 'authenticated',
    staleTime: 5 * 60 * 1000,
  })
}