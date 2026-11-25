import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { usersService } from '@/services'
import { userKeys } from '../queryKeys'

export function useUserMutations() {
  const queryClient = useQueryClient()
  const refreshList = () => queryClient.invalidateQueries({ queryKey: userKeys.lists() })

  const createUser = useMutation({
    mutationFn: usersService.createUser,
    onSuccess: (res) => {
      toast.success(res.message || 'User created successfully')
      refreshList()
    },
  })

  const updateUser = useMutation({
    mutationFn: ({ id, payload }) => usersService.updateUser(id, payload),
    onSuccess: (res) => {
      toast.success(res.message || 'User updated successfully')
      refreshList()
    },
  })

  const deleteUser = useMutation({
    mutationFn: usersService.deleteUser,
    onSuccess: (res) => {
      toast.success(res.message || 'User deleted successfully')
      refreshList()
    },
    onError: (error) => toast.error(error.message),
  })

  return { createUser, updateUser, deleteUser }
}