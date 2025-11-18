import { create } from 'zustand'

const STORAGE_KEY = 'wellnesshub-auth'

const getInitialState = () => {
  if (typeof window === 'undefined') return { user: null, token: null }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { user: null, token: null }
  } catch {
    return { user: null, token: null }
  }
}

const persistState = (state) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const useAuthStore = create((set) => ({
  ...getInitialState(),
  loading: false,
  error: null,
  login: async (credentials) => {
    set({ loading: true, error: null })
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    const mockResponse = {
      token: 'mock-jwt-token',
      user: {
        id: 'user-123',
        name: credentials.name ?? 'Alex Morgan',
        email: credentials.email,
        role: credentials.role ?? 'patient',
        consent: true,
      },
    }

    persistState(mockResponse)
    set({ ...mockResponse, loading: false })
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    set({ user: null, token: null })
  },
  updateProfile: (updates) =>
    set((state) => {
      if (!state.user) return state
      const updatedUser = { ...state.user, ...updates }
      persistState({ user: updatedUser, token: state.token })
      return { ...state, user: updatedUser }
    }),
}))


