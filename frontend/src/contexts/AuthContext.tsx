import { createContext, useState, useEffect, ReactNode } from 'react'
import { AuthResponse } from '../types'

interface AuthContextType {
  isAuthenticated: boolean
  user: AuthResponse['user'] | null
  isLoading: boolean
  login: (authData: AuthResponse) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (authData: AuthResponse) => {
    localStorage.setItem('token', authData.access_token)
    localStorage.setItem('user', JSON.stringify(authData.user))
    setIsAuthenticated(true)
    setUser(authData.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
