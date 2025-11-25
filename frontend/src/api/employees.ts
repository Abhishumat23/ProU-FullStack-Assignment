import api from './client'
import { Employee, EmployeeWithTasks, EmployeeCreate } from '../types'

export interface EmployeeFilters {
  status?: 'active' | 'inactive'
  department?: string
  role?: string
  search?: string
  page?: number
  page_size?: number
}

export const employeesAPI = {
  getAll: async (filters?: EmployeeFilters): Promise<Employee[]> => {
    const { data } = await api.get<Employee[]>('/employees', { params: filters })
    return data
  },

  getById: async (id: number): Promise<EmployeeWithTasks> => {
    const { data } = await api.get<EmployeeWithTasks>(`/employees/${id}`)
    return data
  },

  create: async (employee: EmployeeCreate): Promise<Employee> => {
    const { data } = await api.post<Employee>('/employees', employee)
    return data
  },

  update: async (id: number, employee: Partial<EmployeeCreate>): Promise<Employee> => {
    const { data } = await api.put<Employee>(`/employees/${id}`, employee)
    return data
  },

  partialUpdate: async (id: number, employee: Partial<EmployeeCreate>): Promise<Employee> => {
    const { data } = await api.patch<Employee>(`/employees/${id}`, employee)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`)
  },
}
