import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FullScreenLoader } from '@/components/common'
import { useAuth } from '@/features/auth'

export default function PublicRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return <FullScreenLoader />

  if (status === 'authenticated') {
    return <Navigate to={location.state?.from?.pathname ?? '/'} replace />
  }

  return <Outlet />
}