import { useMe } from '@/features/auth'

export default function DashboardPage() {
  const { data: user } = useMe()

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {user?.userName}</p>
    </div>
  )
}