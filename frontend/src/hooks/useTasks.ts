import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksAPI, TaskFilters } from '../api/tasks'
import { TaskCreate } from '../types'
import toast from 'react-hot-toast'

export const useTasks = (filters?: TaskFilters) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => tasksAPI.getAll(filters),
  })
}

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => tasksAPI.getById(id),
    enabled: !!id,
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: TaskCreate) => tasksAPI.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Task created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create task')
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TaskCreate> }) =>
      tasksAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Task updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update task')
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => tasksAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Task deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete task')
    },
  })
}

export const useAssignTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, employeeId }: { taskId: number; employeeId: number }) =>
      tasksAPI.assign(taskId, employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Task assigned successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to assign task')
    },
  })
}

export const useUnassignTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskId: number) => tasksAPI.unassign(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Task unassigned successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to unassign task')
    },
  })
}
