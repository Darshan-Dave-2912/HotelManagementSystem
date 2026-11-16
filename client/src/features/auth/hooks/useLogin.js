import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services'
import { setAccessToken } from '@/lib/tokenStore'
import { useAuth } from './useAuth'

export function useLogin() {
  const { markAuthenticated } = useAuth()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken)
      markAuthenticated()
    },
  })
}