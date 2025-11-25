import api from './client'
import { Task, TaskWithEmployee, TaskCreate } from '../types'

export interface TaskFilters {
  status?: 'todo' | 'in_progress' | 'done'
  priority?: 'low' | 'medium' | 'high'
  employee_id?: number
  due_before?: string
  due_after?: string
  page?: number
  page_size?: number
}

export const tasksAPI = {
  getAll: async (filters?: TaskFilters): Promise<TaskWithEmployee[]> => {
    const { data } = await api.get<TaskWithEmployee[]>('/tasks', { params: filters })
    return data
  },

  getById: async (id: number): Promise<TaskWithEmployee> => {
    const { data } = await api.get<TaskWithEmployee>(`/tasks/${id}`)
    return data
  },

  create: async (task: TaskCreate): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', task)
    return data
  },

  update: async (id: number, task: Partial<TaskCreate>): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${id}`, task)
    return data
  },

  partialUpdate: async (id: number, task: Partial<TaskCreate>): Promise<Task> => {
    const { data } = await api.patch<Task>(`/tasks/${id}`, task)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },

  assign: async (id: number, employeeId: number): Promise<Task> => {
    const { data } = await api.post<Task>(`/tasks/${id}/assign`, { employee_id: employeeId })
    return data
  },

  unassign: async (id: number): Promise<Task> => {
    const { data } = await api.post<Task>(`/tasks/${id}/unassign`)
    return data
  },
}
