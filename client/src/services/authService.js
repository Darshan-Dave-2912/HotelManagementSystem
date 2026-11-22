import api from '@/lib/axios'

export const login = (payload) => api.post('/auth/login', payload).then((res) => res.data)
export const logout = () => api.post('/auth/logout').then((res) => res.data)
export const getMe = () => api.get('/auth/me').then((res) => res.data)
export const getMyPermissions = () => api.get('/auth/me/permissions').then((res) => res.data)