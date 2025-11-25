import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesAPI, EmployeeFilters } from '../api/employees'
import { EmployeeCreate } from '../types'
import toast from 'react-hot-toast'

export const useEmployees = (filters?: EmployeeFilters) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => employeesAPI.getAll(filters),
  })
}

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => employeesAPI.getById(id),
    enabled: !!id,
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (employee: EmployeeCreate) => employeesAPI.create(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create employee')
    },
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EmployeeCreate> }) =>
      employeesAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update employee')
    },
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => employeesAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete employee')
    },
  })
}
