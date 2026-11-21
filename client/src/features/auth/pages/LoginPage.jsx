import { LoginForm } from '@/features/auth/components'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { useLoginForm } from '@/features/auth/hooks/useLoginForm'

export default function LoginPage() {
  const form = useLoginForm()
  const login = useLogin()

  const onSubmit = form.handleSubmit((values) => {
    login.mutate(values, {
      onError: (error) => {
        // Backend ke field errors form ke fields par dikhao
        error.errors?.forEach(({ field, message }) => form.setError(field, { message }))
      },
    })
  })

  return (
    <LoginForm
      form={form}
      onSubmit={onSubmit}
      isPending={login.isPending}
      serverError={login.error && !login.error.errors?.length ? login.error.message : null}
    />
  )
}