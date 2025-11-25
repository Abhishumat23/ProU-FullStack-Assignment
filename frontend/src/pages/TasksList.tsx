import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTasks, useDeleteTask, useAssignTask, useUnassignTask } from '../hooks/useTasks'
import { useEmployees } from '../hooks/useEmployees'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { Plus, Edit, Trash2, Search, User, X } from 'lucide-react'

export default function TasksList() {
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done' | ''>('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>('')
  const [employeeId, setEmployeeId] = useState('')
  const [search, setSearch] = useState('')
  const [assigningTask, setAssigningTask] = useState<number | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const { data: tasks, isLoading, error, refetch } = useTasks({
    status: status || undefined,
    priority: priority || undefined,
    employee_id: employeeId ? parseInt(employeeId) : undefined,
  })

  const { data: employees } = useEmployees({ status: 'active' })
  const deleteTask = useDeleteTask()
  const assignTask = useAssignTask()
  const unassignTask = useUnassignTask()

  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteTask.mutateAsync(id)
    }
  }

  const handleAssign = async (taskId: number) => {
    if (selectedEmployee) {
      await assignTask.mutateAsync({ taskId, employeeId: parseInt(selectedEmployee) })
      setAssigningTask(null)
      setSelectedEmployee('')
    }
  }

  const handleUnassign = async (taskId: number) => {
    if (window.confirm('Are you sure you want to unassign this task?')) {
      await unassignTask.mutateAsync(taskId)
    }
  }

  if (isLoading) return <Loading message="Loading tasks..." />
  if (error) return <ErrorMessage message="Failed to load tasks" onRetry={refetch} />

  // Filter tasks by search term
  const filteredTasks = tasks?.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description?.toLowerCase().includes(search.toLowerCase())
  )

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800',
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-2">Manage and track all tasks</p>
        </div>
        <Link to="/tasks/new" className="btn btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Task</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="select"
            >
              <option value="">All Status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="select"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="label">Assigned To</label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="select"
            >
              <option value="">All Employees</option>
              <option value="unassigned">Unassigned</option>
              {employees?.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks?.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {task.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[task.status]}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {task.employee ? (
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/employees/${task.employee.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          {task.employee.name}
                        </Link>
                        <button
                          onClick={() => handleUnassign(task.id)}
                          className="ml-2 text-red-600 hover:text-red-900"
                          title="Unassign"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : assigningTask === task.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={selectedEmployee}
                          onChange={(e) => setSelectedEmployee(e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="">Select...</option>
                          {employees?.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleAssign(task.id)}
                          disabled={!selectedEmployee}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => {
                            setAssigningTask(null)
                            setSelectedEmployee('')
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAssigningTask(task.id)}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-900"
                      >
                        <User size={16} />
                        <span>Assign</span>
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/tasks/${task.id}/edit`}
                        className="text-primary-600 hover:text-primary-900"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id, task.title)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTasks?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tasks found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
