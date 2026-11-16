import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { refreshAccessToken, setUnauthorizedHandler } from '@/lib/axios'
import { clearAccessToken } from '@/lib/tokenStore'
import { AuthContext } from './auth.context'

export function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('loading') // loading | authenticated | unauthenticated

  const markAuthenticated = useCallback(() => setStatus('authenticated'), [])

  const markUnauthenticated = useCallback(() => {
    clearAccessToken()
    queryClient.clear()
    setStatus('unauthenticated')
  }, [queryClient])

  // App load par refresh cookie se session restore karna
  useEffect(() => {
    refreshAccessToken()
      .then(() => setStatus('authenticated'))
      .catch(() => setStatus('unauthenticated'))
  }, [])

  // Axios jab refresh fail kare to yahan se logout state set hogi
  useEffect(() => {
    setUnauthorizedHandler(markUnauthenticated)
  }, [markUnauthenticated])

  const value = useMemo(
    () => ({ status, markAuthenticated, markUnauthenticated }),
    [status, markAuthenticated, markUnauthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}