import { useRouteError } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">An unexpected error occurred. Please try again.</p>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </div>
  )
}