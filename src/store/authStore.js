import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Действия для аутентификации
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Заменить на реальный API call
          console.log('Login attempt:', credentials)
          
          // Симуляция API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const mockUser = {
            id: 1,
            name: credentials.email.split('@')[0],
            email: credentials.email,
            avatar: null
          }
          
          const mockToken = 'mock-jwt-token-' + Date.now()
          
          set({ 
            user: mockUser, 
            token: mockToken, 
            isAuthenticated: true,
            isLoading: false 
          })
          
          return { success: true }
        } catch (error) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Заменить на реальный API call
          console.log('Register attempt:', userData)
          
          // Симуляция API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const mockUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            avatar: null
          }
          
          const mockToken = 'mock-jwt-token-' + Date.now()
          
          set({ 
            user: mockUser, 
            token: mockToken, 
            isAuthenticated: true,
            isLoading: false 
          })
          
          return { success: true }
        } catch (error) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          error: null
        })
      },
      
      clearError: () => {
        set({ error: null })
      },
      
      updateProfile: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...userData }
          })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
) 