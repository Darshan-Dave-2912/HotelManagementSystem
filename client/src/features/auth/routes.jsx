import AuthLayout from '@/layouts/AuthLayout'
import LoginPage from './pages/LoginPage'

export const authRoutes = [
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
]