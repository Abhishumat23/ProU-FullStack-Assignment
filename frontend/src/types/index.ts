export interface Employee {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  date_joined: string
  created_at: string
  updated_at: string
}

export interface EmployeeWithTasks extends Employee {
  tasks: TaskSummary[]
}

export interface EmployeeCreate {
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  date_joined?: string
}

export interface Task {
  id: number
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  employee_id: number | null
  created_at: string
  updated_at: string
}

export interface TaskWithEmployee extends Task {
  employee: EmployeeSummary | null
}

export interface TaskCreate {
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  employee_id?: number
}

export interface TaskSummary {
  id: number
  title: string
  status: string
  priority: string
  due_date: string | null
}

export interface EmployeeSummary {
  id: number
  name: string
  email: string
  department: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: {
    email: string
    name: string
    role: string
  }
}

export interface DashboardStats {
  totalEmployees: number
  activeEmployees: number
  totalTasks: number
  tasksByStatus: {
    todo: number
    in_progress: number
    done: number
  }
}
