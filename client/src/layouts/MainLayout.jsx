import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { NAVIGATION } from '@/constants/navigation'
import { useLogout, useMe, usePermissions } from '@/features/auth'
import AppHeader from '@/layouts/AppHeader'
import AppSidebar from '@/layouts/AppSidebar'

export default function MainLayout() {
  const { pathname } = useLocation()
  const { data: user } = useMe()
  const { can } = usePermissions()
  const logout = useLogout()

  // Sirf wahi menu items jinki VIEW permission is role ke paas hai
  const groups = useMemo(
    () =>
      NAVIGATION.map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => !item.permission || can(item.permission.module, item.permission.action),
        ),
      })).filter((group) => group.items.length > 0),
    [can],
  )

  return (
    <SidebarProvider>
      <AppSidebar groups={groups} pathname={pathname} />
      <SidebarInset>
        <AppHeader
          user={user}
          onLogout={() => logout.mutate()}
          isLoggingOut={logout.isPending}
        />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}