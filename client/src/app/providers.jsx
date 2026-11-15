import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/app/queryClient'

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}