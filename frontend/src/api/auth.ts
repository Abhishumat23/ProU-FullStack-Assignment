import api from './client'
import { LoginCredentials, AuthResponse } from '../types'

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  verify: async (): Promise<{ valid: boolean; user: any }> => {
    const { data } = await api.get('/auth/verify')
    return data
  },
}
