import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useTask, useCreateTask, useUpdateTask } from '../hooks/useTasks'
import { useEmployees } from '../hooks/useEmployees'
import Loading from '../components/Loading'
import { ArrowLeft, Save } from 'lucide-react'

export default function TaskForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isEditing = !!id
  const taskId = id ? parseInt(id) : 0

  const { data: task, isLoading } = useTask(taskId)
  const { data: employees } = useEmployees({ status: 'active' })
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const preselectedEmployeeId = searchParams.get('employee_id')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'in_progress' | 'done',
    priority: 'medium' as 'low' | 'medium' | 'high',
    due_date: '',
    employee_id: preselectedEmployeeId || '',
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        due_date: task.due_date || '',
        employee_id: task.employee_id?.toString() || '',
      })
    }
  }, [task])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const submitData = {
        ...formData,
        employee_id: formData.employee_id ? parseInt(formData.employee_id) : undefined,
        due_date: formData.due_date || undefined,
        description: formData.description || undefined,
      }

      if (isEditing) {
        await updateTask.mutateAsync({ id: taskId, data: submitData })
      } else {
        await createTask.mutateAsync(submitData)
      }
      navigate('/tasks')
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  if (isLoading && isEditing) {
    return <Loading message="Loading task..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/tasks" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-2" />
          Back to Tasks
        </Link>
      </div>

      <div className="card max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="label">
              Task Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="input"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input min-h-[120px]"
              placeholder="Enter task description (optional)"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="label">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="label">
                Priority *
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="due_date" className="label">
                Due Date
              </label>
              <input
                id="due_date"
                name="due_date"
                type="date"
                value={formData.due_date}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="employee_id" className="label">
                Assign To
              </label>
              <select
                id="employee_id"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                className="select"
              >
                <option value="">Unassigned</option>
                {employees?.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={createTask.isPending || updateTask.isPending}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Save size={20} />
              <span>
                {createTask.isPending || updateTask.isPending
                  ? 'Saving...'
                  : 'Save Task'}
              </span>
            </button>
            <Link to="/tasks" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
