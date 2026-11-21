import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FullScreenLoader } from '@/components/common'
import { useAuth, useMe, usePermissions } from '@/features/auth'

export default function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()
  const me = useMe()
  const permissions = usePermissions()

  if (status === 'loading') return <FullScreenLoader />

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (me.isLoading || permissions.isLoading) return <FullScreenLoader />

  if (me.isError || permissions.isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <p>Could not load your account details.</p>
        <Button
          onClick={() => {
            me.refetch()
            permissions.refetch()
          }}
        >
          Retry
        </Button>
      </div>
    )
  }

  return <Outlet />
}