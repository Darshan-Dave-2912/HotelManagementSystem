import axios from 'axios'
import { getAccessToken, setAccessToken, clearAccessToken } from '@/lib/tokenStore'
import { ApiError } from '@/lib/apiError'

const baseURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({ baseURL, withCredentials: true })

// refresh ke liye alag instance, taaki interceptor mein loop na bane
const refreshClient = axios.create({ baseURL, withCredentials: true })

// In endpoints ke 401 par refresh try nahi karna
const AUTH_URLS = ['/auth/login', '/auth/refresh', '/auth/logout']

let onUnauthorized = null
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler
}

// Single-flight: ek time par sirf ek refresh call, baaki sab usi ka wait karte hain
let refreshPromise = null
export const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post('/auth/refresh')
      .then((res) => {
        const token = res.data.data.accessToken
        setAccessToken(token)
        return token
      })
      .catch((error) => {
        clearAccessToken()
        throw error
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error.response?.status
    const isAuthUrl = AUTH_URLS.some((url) => original?.url?.includes(url))

    if (status === 401 && original && !original._retry && !isAuthUrl) {
      original._retry = true
      try {
        const token = await refreshAccessToken()
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      } catch {
        onUnauthorized?.()
      }
    }

    const body = error.response?.data
    return Promise.reject(
      new ApiError({
        message: body?.message || (error.response ? 'Something went wrong' : 'Network error. Please check your connection'),
        status,
        errors: body?.errors || [],
        isNetworkError: !error.response,
      }),
    )
  },
)

export default api