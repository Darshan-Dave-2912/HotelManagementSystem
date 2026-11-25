import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ProtectedRoute from '@/routes/ProtectedRoute'
import PublicRoute from '@/routes/PublicRoute'
import { authRoutes } from '@/features/auth'
import { DashboardPage } from '@/features/dashboard'
import { NotFoundPage, ErrorPage } from '@/features/errors'
import PermissionRoute from '@/routes/PermissionRoute'
import { ACTION_CODES, MODULE_CODES } from '@/constants/permissionCodes'
import { rolesRoutes } from '@/features/access-management/roles'
import { usersRoutes } from '@/features/access-management/users'

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      { element: <PublicRoute />, children: authRoutes },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
                { index: true, element: <DashboardPage /> },
                { 
                  element: <PermissionRoute module={MODULE_CODES.ROLES} action={ACTION_CODES.VIEW} />,
                  children: rolesRoutes,
                },
                {
                  element: <PermissionRoute module={MODULE_CODES.USERS} action={ACTION_CODES.VIEW} />,
                  children: usersRoutes,
                },
              ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])