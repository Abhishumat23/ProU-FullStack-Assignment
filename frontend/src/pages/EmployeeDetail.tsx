import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEmployee, useDeleteEmployee } from '../hooks/useEmployees'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { ArrowLeft, Edit, Trash2, Mail, Briefcase, Building2, Calendar, CheckSquare } from 'lucide-react'

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const employeeId = parseInt(id!)
  
  const { data: employee, isLoading, error } = useEmployee(employeeId)
  const deleteEmployee = useDeleteEmployee()

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${employee?.name}?`)) {
      await deleteEmployee.mutateAsync(employeeId)
      navigate('/employees')
    }
  }

  if (isLoading) return <Loading message="Loading employee details..." />
  if (error || !employee) return <ErrorMessage message="Employee not found" />

  const statusColor = employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/employees" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-2" />
          Back to Employees
        </Link>
        <div className="flex space-x-3">
          <Link
            to={`/employees/${employeeId}/edit`}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Edit size={18} />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger flex items-center space-x-2"
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Employee Info Card */}
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-gray-600 mt-1">{employee.role}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColor}`}>
            {employee.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Briefcase className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{employee.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Building2 className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{employee.department}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Date Joined</p>
              <p className="font-medium">{new Date(employee.date_joined).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <CheckSquare className="mr-2" size={24} />
            Assigned Tasks ({employee.tasks?.length || 0})
          </h2>
          <Link
            to={`/tasks/new?employee_id=${employeeId}`}
            className="btn btn-primary"
          >
            Add Task
          </Link>
        </div>

        {employee.tasks && employee.tasks.length > 0 ? (
          <div className="space-y-3">
            {employee.tasks.map((task) => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}/edit`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    {task.due_date && (
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === 'done'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No tasks assigned yet
          </div>
        )}
      </div>
    </div>
  )
}
