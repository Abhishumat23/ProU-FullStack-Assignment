# Backend - ProU Employee & Task Management API

FastAPI-based REST API for the Employee & Task Management System.

## Quick Start

1. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run server**
   ```bash
   python main.py
   ```

Server runs on `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

## Features

- RESTful API with FastAPI
- SQLAlchemy ORM with SQLite
- Pydantic validation
- JWT authentication
- Automatic API documentation
- CORS enabled for frontend
- Database seeding with demo data

## Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/verify` - Verify token

### Employees
- `GET /api/employees` - List employees (with filters)
- `GET /api/employees/{id}` - Get employee details
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `PATCH /api/employees/{id}` - Partial update
- `DELETE /api/employees/{id}` - Delete employee

### Tasks
- `GET /api/tasks` - List tasks (with filters)
- `GET /api/tasks/{id}` - Get task details
- `POST /api/tasks` - Create task
- `PUT /api/tasks/{id}` - Update task
- `PATCH /api/tasks/{id}` - Partial update
- `DELETE /api/tasks/{id}` - Delete task
- `POST /api/tasks/{id}/assign` - Assign task to employee
- `POST /api/tasks/{id}/unassign` - Unassign task

## Database

- **Type**: SQLite
- **File**: `prothink_app.db`
- **Auto-seeded**: Yes, on first run

## Development

```bash
# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
