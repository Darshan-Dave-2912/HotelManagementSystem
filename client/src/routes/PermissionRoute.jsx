import { Outlet } from 'react-router-dom'
import { usePermissions } from '@/features/auth'
import { ForbiddenPage } from '@/features/errors'

export default function PermissionRoute({ module, action }) {
  const { can } = usePermissions()

  // Permissions ProtectedRoute me pehle hi load ho chuki hoti hain
  if (!can(module, action)) return <ForbiddenPage />

  return <Outlet />
}