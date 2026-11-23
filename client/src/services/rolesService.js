import api from '@/lib/axios'

export const getRoles = (params) => api.get('/roles', { params }).then((res) => res.data)
export const createRole = (payload) => api.post('/roles', payload).then((res) => res.data)
export const updateRole = (id, payload) => api.put(`/roles/${id}`, payload).then((res) => res.data)
export const deleteRole = (id) => api.delete(`/roles/${id}`).then((res) => res.data)