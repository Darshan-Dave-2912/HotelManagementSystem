import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}