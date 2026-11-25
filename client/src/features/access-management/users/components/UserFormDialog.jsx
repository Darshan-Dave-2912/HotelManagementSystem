import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { LabeledField } from '@/components/common'
import { userCreateSchema, userUpdateSchema } from '../schemas/users.schema'

function UserForm({ user, roles, rolesLoading, rolesError, onRetryRoles, onSubmit, onCancel }) {
  const isEdit = Boolean(user)
  const [formError, setFormError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isEdit ? userUpdateSchema : userCreateSchema),
    defaultValues: {
      roleId: user?.roleId != null ? String(user.roleId) : '',
      userName: user?.userName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      ...(!isEdit && { password: '' }),
      isActive: user?.isActive ?? true,
    },
  })

  // Naye assignment ke liye sirf active roles; edit me current role (inactive ho tab bhi) dikhta rahe
  const roleChoices = roles.filter(
    (role) => role.isActive || String(role.id) === String(user?.roleId),
  )

  const submit = handleSubmit(async (values) => {
    setFormError('')
    try {
      await onSubmit({ ...values, roleId: Number(values.roleId) })
    } catch (error) {
      if (error.errors?.length) {
        error.errors.forEach(({ field, message }) => setError(field, { type: 'server', message }))
      } else {
        setFormError(error.message)
      }
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4">
      <LabeledField label="Role" htmlFor="roleId" required error={errors.roleId?.message}>
        <Controller
          name="roleId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={rolesLoading}>
              <SelectTrigger id="roleId" className="w-full">
                <SelectValue placeholder={rolesLoading ? 'Loading roles...' : 'Select a role'} />
              </SelectTrigger>
              <SelectContent>
                {roleChoices.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {rolesError && (
          <p className="text-xs text-destructive">
            Could not load roles.{' '}
            <button type="button" className="underline" onClick={onRetryRoles}>
              Retry
            </button>
          </p>
        )}
      </LabeledField>

      <LabeledField label="Username" htmlFor="userName" required error={errors.userName?.message}>
        <Input id="userName" placeholder="e.g. hotel_manager" autoComplete="off" {...register('userName')} />
      </LabeledField>

      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledField label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" placeholder="manager@example.com" {...register('email')} />
        </LabeledField>

        <LabeledField label="Phone" htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" placeholder="9876543210" {...register('phone')} />
        </LabeledField>
      </div>

      {!isEdit && (
        <LabeledField
          label="Password"
          htmlFor="password"
          required
          hint="8–72 characters with uppercase, lowercase, number and special character"
          error={errors.password?.message}
        >
          <Input id="password" type="password" autoComplete="new-password" {...register('password')} />
        </LabeledField>
      )}

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <p className="text-sm font-medium">Active</p>
          <p className="text-xs text-muted-foreground">Inactive users cannot log in</p>
        </div>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} aria-label="Active" />
          )}
        />
      </div>

      {formError && <p className="text-sm text-destructive">{formError}</p>}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant={isEdit ? 'success' : 'default'} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEdit ? 'Save changes' : 'Create user'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export default function UserFormDialog({
  open,
  onOpenChange,
  user,
  roles,
  rolesLoading,
  rolesError,
  onRetryRoles,
  onSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit user' : 'Add user'}</DialogTitle>
          <DialogDescription>
            {user ? 'Update the user details.' : 'Create a new user for your hotel system.'}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          user={user}
          roles={roles}
          rolesLoading={rolesLoading}
          rolesError={rolesError}
          onRetryRoles={onRetryRoles}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}