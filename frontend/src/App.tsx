import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import EmployeesList from './pages/EmployeesList'
import EmployeeDetail from './pages/EmployeeDetail'
import EmployeeForm from './pages/EmployeeForm'
import TasksList from './pages/TasksList'
import TaskForm from './pages/TaskForm'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<EmployeesList />} />
        <Route path="employees/new" element={<EmployeeForm />} />
        <Route path="employees/:id" element={<EmployeeDetail />} />
        <Route path="employees/:id/edit" element={<EmployeeForm />} />
        <Route path="tasks" element={<TasksList />} />
        <Route path="tasks/new" element={<TaskForm />} />
        <Route path="tasks/:id/edit" element={<TaskForm />} />
      </Route>
    </Routes>
  )
}

export default App
