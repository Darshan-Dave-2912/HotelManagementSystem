export default function ForbiddenPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-2xl font-semibold">403 - Access denied</h1>
      <p className="text-muted-foreground">You do not have permission to view this page.</p>
    </div>
  )
}