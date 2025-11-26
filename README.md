# ProU Technology - Employee & Task Management System

A production-quality fullstack web application for managing employees and tasks, built for the ProU Technology Internship Coding Challenge – Fullstack Track.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.13+-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)

## 🚀 Live Demo

**Frontend**: https://pro-u-full-stack-assignment.vercel.app  
**Backend API**: https://prou-fullstack-assignment.onrender.com  
**API Documentation**: https://prou-fullstack-assignment.onrender.com/docs

### Demo Credentials
- **Admin**: `admin@prothink.com` / `password123`
- **Manager**: `manager@prothink.com` / `manager123`

> **Note**: Backend may take 30-60 seconds to wake up on first request (Render free tier).

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)

---

## 🎯 Overview

This fullstack application provides a comprehensive solution for HR and management teams to manage employees and tasks. It features a modern, responsive UI built with React and a robust REST API powered by FastAPI with SQLite database persistence.

**Deployed on**: Render (Backend) + Vercel (Frontend)

---

### Core Features

#### Employee Management
- ✅ **CRUD Operations**: Create, read, update, and delete employees
- ✅ **Advanced Filtering**: Filter by status (active/inactive), department, role
- ✅ **Search Functionality**: Search employees by name or email
- ✅ **Pagination**: Efficient data loading with configurable page sizes
- ✅ **Employee Details**: View detailed employee information with assigned tasks
- ✅ **Validation**: Email format validation and unique email constraints

#### Task Management
- ✅ **CRUD Operations**: Full task lifecycle management
- ✅ **Task Assignment**: Assign/unassign tasks to employees
- ✅ **Status Tracking**: Track tasks through todo → in_progress → done
- ✅ **Priority Levels**: Categorize tasks as low, medium, or high priority
- ✅ **Due Dates**: Set and track task deadlines
- ✅ **Advanced Filtering**: Filter by status, priority, assigned employee, and date ranges
- ✅ **Rich Descriptions**: Support for detailed task descriptions

#### Dashboard & Analytics
- ✅ **Summary Statistics**: Overview of employees, tasks, and statuses
- ✅ **Data Visualizations**:
  - Pie chart for task status distribution
  - Bar chart for tasks by department
  - Priority breakdown summary
- ✅ **Real-time Updates**: Automatically refreshed data using React Query

### 🎁 Bonus Features

#### 1. Authentication & Security
- ✅ **JWT-based Authentication**: Secure token-based authentication
- ✅ **Protected Routes**: Frontend route protection
- ✅ **Demo Credentials**:
  - **Admin**: `admin@prothink.com` / `password123`
  - **Manager**: `manager@prothink.com` / `manager123`
- ✅ **Session Management**: Persistent login with localStorage
- ✅ **Automatic Token Handling**: Axios interceptors for auth headers

#### 2. Advanced UI/UX Features
- ✅ **Responsive Design**: Mobile-first, fully responsive interface
- ✅ **Loading States**: Skeleton screens and loading indicators
- ✅ **Error Handling**: User-friendly error messages and retry mechanisms
- ✅ **Toast Notifications**: Success/error feedback for all actions
- ✅ **Client-side Validation**: Real-time form validation
- ✅ **Sidebar Navigation**: Intuitive navigation with active states
- ✅ **Inline Task Assignment**: Quick assign/unassign from tasks table

#### 3. Data Visualization
- ✅ **Interactive Charts**: Recharts library integration
- ✅ **Task Status Pie Chart**: Visual breakdown of task completion
- ✅ **Department Bar Chart**: Tasks distributed across departments
- ✅ **Priority Indicators**: Color-coded priority levels
- ✅ **Status Badges**: Visual status indicators throughout the app

#### 4. Developer Experience
- ✅ **TypeScript**: Full type safety across frontend
- ✅ **API Client Layer**: Centralized API calls with Axios
- ✅ **Custom Hooks**: Reusable data fetching hooks with React Query
- ✅ **Error Boundaries**: Graceful error handling
- ✅ **Hot Module Replacement**: Fast development with Vite
- ✅ **Code Organization**: Clean, modular architecture

---

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI 0.109.0
- **Server**: Uvicorn (ASGI)
- **ORM**: SQLAlchemy 2.0.36
- **Validation**: Pydantic 2.9.2
- **Authentication**: PyJWT 2.8.0
- **Database**: SQLite (file-based)
- **Deployment**: Render

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.12
- **Language**: TypeScript 5.3.3
- **Routing**: React Router DOM 6.21.3
- **State Management**: TanStack React Query 5.17.19
- **HTTP Client**: Axios 1.6.5
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.309.0
- **Charts**: Recharts 2.10.4
- **Notifications**: React Hot Toast 2.4.1
- **Deployment**: Vercel

### Development Tools
- **Linting**: ESLint with TypeScript plugins
- **CSS Processing**: PostCSS + Autoprefixer
- **Type Checking**: TypeScript strict mode

---

## 📁 Project Structure

```
ProU/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── employee.py          # Employee SQLAlchemy model
│   │   └── task.py              # Task SQLAlchemy model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── employee.py          # Employee Pydantic schemas
│   │   ├── task.py              # Task Pydantic schemas
│   │   └── auth.py              # Authentication schemas
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── employees.py         # Employee CRUD endpoints
│   │   ├── tasks.py             # Task CRUD endpoints
│   │   └── auth.py              # Authentication endpoints
│   ├── main.py                  # FastAPI application
│   ├── database.py              # Database configuration & seeding
│   └── requirements.txt         # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts        # Axios instance & interceptors
│   │   │   ├── auth.ts          # Auth API calls
│   │   │   ├── employees.ts     # Employee API calls
│   │   │   └── tasks.ts         # Task API calls
│   │   ├── components/
│   │   │   ├── Layout.tsx       # Main layout with sidebar
│   │   │   ├── Loading.tsx      # Loading component
│   │   │   └── ErrorMessage.tsx # Error display component
│   │   ├── hooks/
│   │   │   ├── useAuth.ts       # Authentication hook
│   │   │   ├── useEmployees.ts  # Employee data hooks
│   │   │   └── useTasks.ts      # Task data hooks
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx    # Login page
│   │   │   ├── Dashboard.tsx    # Dashboard with charts
│   │   │   ├── EmployeesList.tsx    # Employee list view
│   │   │   ├── EmployeeDetail.tsx   # Employee detail view
│   │   │   ├── EmployeeForm.tsx     # Employee create/edit
│   │   │   ├── TasksList.tsx        # Task list view
│   │   │   └── TaskForm.tsx         # Task create/edit
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript interfaces
│   │   ├── App.tsx              # Root component with routes
│   │   ├── main.tsx             # Application entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Python**: 3.9 or higher
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`
   
   **API Documentation**: Visit `http://localhost:8000/docs` for interactive Swagger UI

5. **Database Seeding**
   - The database is automatically created and seeded with demo data on first run
   - Demo data includes 5 employees and 8 tasks
   - Database file: `prothink_app.db` (SQLite)

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL** (optional)
   - Default: `http://localhost:8000/api`
   - To change, create `.env` file:
     ```
     VITE_API_BASE_URL=http://localhost:8000/api
     ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

### Login Credentials

Use these demo credentials to access the application:

- **Admin User**
  - Email: `admin@prothink.com`
  - Password: `password123`

- **Manager User**
  - Email: `manager@prothink.com`
  - Password: `manager123`

---

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication

#### POST `/auth/login`
Login with credentials and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@prothink.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "email": "admin@prothink.com",
    "name": "Admin User",
    "role": "Administrator"
  }
}
```

#### GET `/auth/verify`
Verify JWT token validity (requires Authorization header).

### Employees

#### GET `/employees`
List all employees with optional filters and pagination.

**Query Parameters:**
- `status` (optional): Filter by status (`active`, `inactive`)
- `department` (optional): Filter by department
- `role` (optional): Filter by role
- `search` (optional): Search by name or email
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 50, max: 100)

**Example:**
```
GET /employees?status=active&department=Engineering&page=1&page_size=10
```

#### GET `/employees/{id}`
Get single employee by ID with their assigned tasks.

**Response:**
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice.johnson@prothink.com",
  "role": "Engineering Manager",
  "department": "Engineering",
  "status": "active",
  "date_joined": "2023-11-25T00:00:00",
  "created_at": "2024-11-25T10:30:00",
  "updated_at": "2024-11-25T10:30:00",
  "tasks": [
    {
      "id": 1,
      "title": "Design database schema",
      "status": "done",
      "priority": "high",
      "due_date": "2024-11-20"
    }
  ]
}
```

#### POST `/employees`
Create a new employee.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@prothink.com",
  "role": "Software Engineer",
  "department": "Engineering",
  "status": "active",
  "date_joined": "2024-11-25T00:00:00"
}
```

#### PUT `/employees/{id}`
Update an employee (full update).

#### PATCH `/employees/{id}`
Partially update an employee.

#### DELETE `/employees/{id}`
Delete an employee (cascades to their tasks).

### Tasks

#### GET `/tasks`
List all tasks with optional filters and pagination.

**Query Parameters:**
- `status` (optional): Filter by status (`todo`, `in_progress`, `done`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `employee_id` (optional): Filter by assigned employee
- `due_before` (optional): Filter tasks due before date (YYYY-MM-DD)
- `due_after` (optional): Filter tasks due after date (YYYY-MM-DD)
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 50, max: 100)

#### GET `/tasks/{id}`
Get single task by ID with employee information.

#### POST `/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "Implement user dashboard",
  "description": "Create a comprehensive dashboard with charts",
  "status": "todo",
  "priority": "high",
  "due_date": "2024-12-01",
  "employee_id": 2
}
```

#### PUT `/tasks/{id}`
Update a task (full update).

#### PATCH `/tasks/{id}`
Partially update a task.

#### DELETE `/tasks/{id}`
Delete a task.

#### POST `/tasks/{id}/assign`
Assign a task to an employee.

**Request Body:**
```json
{
  "employee_id": 3
}
```

#### POST `/tasks/{id}/unassign`
Remove employee assignment from a task.

### Response Codes

- `200 OK`: Successful GET/PUT/PATCH request
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid authentication
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## 🚀 Deployment

This application is deployed and live at:

- **Frontend**: https://pro-u-full-stack-assignment.vercel.app
- **Backend API**: https://prou-fullstack-assignment.onrender.com
- **API Docs**: https://prou-fullstack-assignment.onrender.com/docs

### Deployment Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   Vercel        │         │     Render       │
│   (Frontend)    │────────▶│   (Backend API)  │
│   React + Vite  │  HTTPS  │   FastAPI        │
└─────────────────┘         └──────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │   SQLite DB      │
                            │   (File-based)   │
                            └──────────────────┘
```

### Deployment Configuration

#### Backend (Render)
- **Service**: Web Service
- **Runtime**: Python 3.13
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Auto-deploy**: Enabled from GitHub main branch

#### Frontend (Vercel)
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: `VITE_API_BASE_URL=https://prou-fullstack-assignment.onrender.com/api`
- **Auto-deploy**: Enabled from GitHub main branch

### Deploy Your Own

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

Quick deploy:
1. Fork this repository
2. Deploy backend to Render (free tier)
3. Deploy frontend to Vercel (free tier)
4. Update environment variables with your backend URL

---

## 📸 Screenshots

Place screenshots in a `screenshots/` folder in the project root:

1. **Login Page** - `screenshots/login.png`
2. **Dashboard** - `screenshots/dashboard.png`
3. **Employees List** - `screenshots/employees-list.png`
4. **Employee Detail** - `screenshots/employee-detail.png`
5. **Employee Form** - `screenshots/employee-form.png`
6. **Tasks List** - `screenshots/tasks-list.png`
7. **Task Form** - `screenshots/task-form.png`

---

## 🎨 Design Decisions

### Architecture Choices

1. **FastAPI for Backend**
   - Modern, fast (high-performance)
   - Automatic API documentation with Swagger
   - Built-in data validation with Pydantic
   - Async support for scalability
   - Easy to test and maintain

2. **React + TypeScript for Frontend**
   - Type safety prevents runtime errors
   - Better IDE support and autocomplete
   - Scalable component architecture
   - Industry-standard tech stack

3. **SQLite Database**
   - Zero configuration required
   - File-based for easy setup and demo
   - Full SQL capabilities
   - Easy migration to PostgreSQL/MySQL for production

4. **React Query (TanStack Query)**
   - Automatic caching and background refetching
   - Optimistic updates
   - Built-in loading and error states
   - Reduces boilerplate code significantly

5. **Tailwind CSS**
   - Utility-first approach for rapid development
   - Consistent design system
   - Responsive by default
   - Small production bundle size

### API Design

- **RESTful conventions**: Standard HTTP methods and status codes
- **Consistent response format**: All endpoints follow same structure
- **Comprehensive validation**: Input validation at multiple layers
- **Error handling**: Descriptive error messages for debugging
- **Pagination**: Prevents performance issues with large datasets

### Database Schema

- **Proper relationships**: One-to-many (Employee → Tasks)
- **Soft delete option**: Preserves data integrity
- **Timestamps**: Audit trail with created_at/updated_at
- **Enums**: Type-safe status and priority fields
- **Indexes**: Optimized queries on frequently searched fields

### Security Considerations

- **JWT tokens**: Stateless authentication
- **Password hashing**: Should use bcrypt in production (demo uses plain text)
- **CORS configuration**: Restricted to specific origins
- **Input validation**: Protection against injection attacks
- **HTTP-only cookies**: Should be implemented for production

### Trade-offs

1. **SQLite vs PostgreSQL**
   - **Chose**: SQLite for simplicity and demo purposes
   - **Trade-off**: Limited concurrent writes, no advanced features
   - **Mitigation**: Easy to migrate to PostgreSQL for production

2. **Simple Auth vs OAuth**
   - **Chose**: Simple JWT for demo
   - **Trade-off**: Less secure, no password recovery
   - **Mitigation**: Documented as demo-only, easy to add OAuth

3. **Client-side vs Server-side Pagination**
   - **Chose**: Server-side pagination
   - **Trade-off**: More API calls
   - **Benefit**: Better performance with large datasets

4. **Monorepo vs Separate Repos**
   - **Chose**: Monorepo structure
   - **Trade-off**: Both services in one repo
   - **Benefit**: Easier to manage for demo/internship project

---

## 🔮 Future Improvements

### High Priority

1. **Enhanced Authentication**
   - Password hashing with bcrypt
   - Password reset functionality
   - Email verification
   - OAuth integration (Google, GitHub)
   - Role-based access control (RBAC)

2. **Advanced Features**
   - Task comments and activity log
   - File attachments for tasks
   - Task dependencies and subtasks
   - Recurring tasks
   - Email notifications for due dates
   - Task templates

3. **Performance Optimizations**
   - Database query optimization
   - Response caching with Redis
   - Image optimization and CDN
   - Code splitting and lazy loading
   - Service worker for offline support

4. **Testing**
   - Unit tests for API endpoints (pytest)
   - Integration tests
   - Frontend component tests (Jest, React Testing Library)
   - End-to-end tests (Playwright/Cypress)
   - Test coverage reports

### Medium Priority

5. **UI/UX Enhancements**
   - Dark mode support
   - Drag-and-drop task boards (Kanban view)
   - Calendar view for tasks
   - Advanced filtering with saved filters
   - Bulk operations (multi-select)
   - Export data (CSV, PDF)

6. **Analytics & Reporting**
   - Employee performance reports
   - Task completion trends
   - Department productivity metrics
   - Custom report builder
   - Data export and scheduling

7. **Collaboration Features**
   - Real-time updates (WebSockets)
   - Team chat or comments
   - @mentions and notifications
   - Activity feed
   - Task sharing

### Low Priority

8. **DevOps & Deployment**
   - Docker containerization
   - CI/CD pipeline (GitHub Actions)
   - Automated testing in CI
   - Staging environment
   - Monitoring and logging (Sentry, LogRocket)
   - Database migrations (Alembic)

9. **Internationalization**
   - Multi-language support (i18n)
   - Date/time localization
   - Currency formatting

10. **Accessibility**
    - WCAG 2.1 compliance
    - Keyboard navigation improvements
    - Screen reader optimization
    - High contrast mode

---

## 🤝 Contributing

This is a coding challenge submission, but suggestions and feedback are welcome!

---

## 📄 License

This project is created for the ProU Technology Internship Coding Challenge.

---

## 🙏 Acknowledgments

- ProU Technology for the internship opportunity
- FastAPI and React communities for excellent documentation
- All open-source contributors whose libraries made this project possible

---

**Built with ❤️ for ProU Technology Internship Challenge**
