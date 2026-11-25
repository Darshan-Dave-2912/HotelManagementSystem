import api from '@/lib/axios'

export const getUsers = (params) => api.get('/users', { params }).then((res) => res.data)
export const getUserById = (id) => api.get(`/users/${id}`).then((res) => res.data)
export const createUser = (payload) => api.post('/users', payload).then((res) => res.data)
export const updateUser = (id, payload) => api.patch(`/users/${id}`, payload).then((res) => res.data)
export const deleteUser = (id) => api.delete(`/users/${id}`).then((res) => res.data)