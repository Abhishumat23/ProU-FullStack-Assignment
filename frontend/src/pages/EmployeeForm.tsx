import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEmployee, useCreateEmployee, useUpdateEmployee } from '../hooks/useEmployees'
import Loading from '../components/Loading'
import { ArrowLeft, Save } from 'lucide-react'

export default function EmployeeForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = !!id
  const employeeId = id ? parseInt(id) : 0

  const { data: employee, isLoading } = useEmployee(employeeId)
  const createEmployee = useCreateEmployee()
  const updateEmployee = useUpdateEmployee()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'active' as 'active' | 'inactive',
    date_joined: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
        status: employee.status,
        date_joined: new Date(employee.date_joined).toISOString().split('T')[0],
      })
    }
  }, [employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isEditing) {
        await updateEmployee.mutateAsync({ id: employeeId, data: formData })
      } else {
        await createEmployee.mutateAsync(formData)
      }
      navigate('/employees')
    } catch (error) {
      console.error('Error saving employee:', error)
    }
  }

  if (isLoading && isEditing) {
    return <Loading message="Loading employee..." />
  }

  const departments = ['Engineering', 'Product', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']
  const roles = [
    'Software Engineer',
    'Senior Developer',
    'Engineering Manager',
    'Product Manager',
    'Designer',
    'Sales Executive',
    'Marketing Specialist',
    'HR Specialist',
    'Accountant',
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/employees" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-2" />
          Back to Employees
        </Link>
      </div>

      <div className="card max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Employee' : 'Add New Employee'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="label">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="label">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="label">
                Role *
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                list="roles-list"
                className="input"
                required
              />
              <datalist id="roles-list">
                {roles.map(role => (
                  <option key={role} value={role} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="department" className="label">
                Department *
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label htmlFor="date_joined" className="label">
                Date Joined *
              </label>
              <input
                id="date_joined"
                name="date_joined"
                type="date"
                value={formData.date_joined}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={createEmployee.isPending || updateEmployee.isPending}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Save size={20} />
              <span>
                {createEmployee.isPending || updateEmployee.isPending
                  ? 'Saving...'
                  : 'Save Employee'}
              </span>
            </button>
            <Link to="/employees" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
