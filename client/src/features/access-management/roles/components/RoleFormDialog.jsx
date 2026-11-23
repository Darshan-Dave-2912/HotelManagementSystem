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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { LabeledField } from '@/components/common'
import { roleSchema } from '../schemas/roles.schema'

function RoleForm({ role, onSubmit, onCancel }) {
  const isEdit = Boolean(role)
  const [formError, setFormError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name ?? '',
      code: role?.code ?? '',
      description: role?.description ?? '',
      isActive: role?.isActive ?? true,
    },
  })

  const submit = handleSubmit(async (values) => {
    setFormError('')
    try {
      await onSubmit({ ...values, description: values.description || null })
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
      <LabeledField label="Role name" htmlFor="name" required error={errors.name?.message}>
        <Input id="name" placeholder="e.g. Hotel Manager" {...register('name')} />
      </LabeledField>

      <LabeledField
        label="Role code"
        htmlFor="code"
        required
        hint="Max 6 characters, e.g. MANAGE"
        error={errors.code?.message}
      >
        <Input id="code" placeholder="e.g. MANAGE" {...register('code')} />
      </LabeledField>

      <LabeledField label="Description" htmlFor="description" error={errors.description?.message}>
        <Textarea id="description" rows={3} {...register('description')} />
      </LabeledField>

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <p className="text-sm font-medium">Active</p>
          <p className="text-xs text-muted-foreground">Inactive roles cannot be assigned to users</p>
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
          {isSubmitting ? 'Saving...' : isEdit ? 'Save changes' : 'Create role'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export default function RoleFormDialog({ open, onOpenChange, role, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit role' : 'Add role'}</DialogTitle>
          <DialogDescription>
            {role ? 'Update the role details.' : 'Create a new role for your hotel staff.'}
          </DialogDescription>
        </DialogHeader>
        <RoleForm role={role} onSubmit={onSubmit} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}