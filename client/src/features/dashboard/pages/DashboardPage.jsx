import { Button } from '@/components/ui/button'
import { useMe, usePermissions, useLogout } from '@/features/auth'

export default function DashboardPage() {
  const { data: user } = useMe()
  const { permissions } = usePermissions()
  const logout = useLogout()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>{user ? `${user.userName} (${user.role?.name})` : 'Not logged in'}</p>
      <p>Permissions: {permissions.join(', ')}</p>
      <Button onClick={() => logout.mutate()}>Logout</Button>
    </div>
  )
}