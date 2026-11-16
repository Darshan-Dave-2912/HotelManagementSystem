import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services'
import { useAuth } from './useAuth'

export function useLogout() {
  const { markUnauthenticated } = useAuth()

  return useMutation({
    mutationFn: authService.logout,
    onSettled: markUnauthenticated,
  })
}