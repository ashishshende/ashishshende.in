import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isInitialized: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isInitialized: false,
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user))
    }
    set({ user, token, isInitialized: true })
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    }
    set({ user: null, token: null, isInitialized: true })
    window.location.href = '/'
  },
  initAuth: () => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token')
      const userStr = sessionStorage.getItem('user')
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr)
          set({ user, token, isInitialized: true })
        } catch {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('user')
          set({ user: null, token: null, isInitialized: true })
        }
      } else {
        set({ isInitialized: true })
      }
    }
  },
}))