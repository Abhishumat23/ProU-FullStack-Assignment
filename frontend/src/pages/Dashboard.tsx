import { useEmployees } from '../hooks/useEmployees'
import { useTasks } from '../hooks/useTasks'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { Users, UserCheck, CheckSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const { data: employees, isLoading: employeesLoading, error: employeesError } = useEmployees()
  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useTasks()

  if (employeesLoading || tasksLoading) {
    return <Loading message="Loading dashboard..." />
  }

  if (employeesError || tasksError) {
    return <ErrorMessage message="Failed to load dashboard data" />
  }

  // Calculate stats
  const totalEmployees = employees?.length || 0
  const activeEmployees = employees?.filter(e => e.status === 'active').length || 0
  const totalTasks = tasks?.length || 0
  const todoTasks = tasks?.filter(t => t.status === 'todo').length || 0
  const inProgressTasks = tasks?.filter(t => t.status === 'in_progress').length || 0
  const doneTasks = tasks?.filter(t => t.status === 'done').length || 0

  // Task status data for pie chart
  const taskStatusData = [
    { name: 'To Do', value: todoTasks, color: '#ef4444' },
    { name: 'In Progress', value: inProgressTasks, color: '#f59e0b' },
    { name: 'Done', value: doneTasks, color: '#10b981' },
  ]

  // Tasks by department
  const departmentStats = employees?.reduce((acc: any, emp) => {
    const dept = emp.department
    const empTasks = tasks?.filter(t => t.employee_id === emp.id).length || 0
    acc[dept] = (acc[dept] || 0) + empTasks
    return acc
  }, {}) || {}

  const departmentData = Object.entries(departmentStats).map(([name, value]) => ({
    name,
    tasks: value
  }))

  // Priority distribution
  const highPriority = tasks?.filter(t => t.priority === 'high').length || 0
  const mediumPriority = tasks?.filter(t => t.priority === 'medium').length || 0
  const lowPriority = tasks?.filter(t => t.priority === 'low').length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of employees and tasks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Employees</p>
              <p className="text-3xl font-bold mt-2">{totalEmployees}</p>
            </div>
            <Users size={48} className="text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Employees</p>
              <p className="text-3xl font-bold mt-2">{activeEmployees}</p>
            </div>
            <UserCheck size={48} className="text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold mt-2">{totalTasks}</p>
            </div>
            <CheckSquare size={48} className="text-purple-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold mt-2">{inProgressTasks}</p>
            </div>
            <Clock size={48} className="text-orange-200" />
          </div>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 font-medium">To Do</p>
              <p className="text-2xl font-bold text-red-900 mt-1">{todoTasks}</p>
            </div>
            <AlertCircle className="text-red-400" size={32} />
          </div>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 font-medium">In Progress</p>
              <p className="text-2xl font-bold text-yellow-900 mt-1">{inProgressTasks}</p>
            </div>
            <Clock className="text-yellow-400" size={32} />
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-900 mt-1">{doneTasks}</p>
            </div>
            <CheckCircle className="text-green-400" size={32} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
          {totalTasks > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No tasks available</p>
          )}
        </div>

        {/* Tasks by Department */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Tasks by Department</h2>
          {departmentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No data available</p>
          )}
        </div>
      </div>

      {/* Priority Summary */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Task Priority Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">{highPriority}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-600">Medium Priority</p>
              <p className="text-2xl font-bold text-gray-900">{mediumPriority}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-600">Low Priority</p>
              <p className="text-2xl font-bold text-gray-900">{lowPriority}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
