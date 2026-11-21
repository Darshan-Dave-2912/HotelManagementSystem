import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ProtectedRoute from '@/routes/ProtectedRoute'
import PublicRoute from '@/routes/PublicRoute'
import { authRoutes } from '@/features/auth'
import { DashboardPage } from '@/features/dashboard'
import { NotFoundPage, ErrorPage } from '@/features/errors'

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
            children: [{ index: true, element: <DashboardPage /> }],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])