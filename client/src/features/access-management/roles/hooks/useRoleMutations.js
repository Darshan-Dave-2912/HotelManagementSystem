import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { rolesService } from '@/services'
import { roleKeys } from '../queryKeys'

export function useRoleMutations() {
  const queryClient = useQueryClient()
  const refreshList = () => queryClient.invalidateQueries({ queryKey: roleKeys.lists() })

  // create/update ke errors form dialog khud dikhata hai (field-wise)
  const createRole = useMutation({
    mutationFn: rolesService.createRole,
    onSuccess: (res) => {
      toast.success(res.message || 'Role created successfully')
      refreshList()
    },
  })

  const updateRole = useMutation({
    mutationFn: ({ id, payload }) => rolesService.updateRole(id, payload),
    onSuccess: (res) => {
      toast.success(res.message || 'Role updated successfully')
      refreshList()
    },
  })

  const deleteRole = useMutation({
    mutationFn: rolesService.deleteRole,
    onSuccess: (res) => {
      toast.success(res.message || 'Role deleted successfully')
      refreshList()
    },
    onError: (error) => toast.error(error.message),
  })

  return { createRole, updateRole, deleteRole }
}