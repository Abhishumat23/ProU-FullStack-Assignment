# ProU Setup Guide

Quick setup guide for the ProU Employee & Task Management System.

## Prerequisites

- Python 3.9+
- Node.js 16+
- npm 8+

## Step-by-Step Setup

### 1. Clone/Download the Project

```bash
cd ProU
```

### 2. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

✅ Backend should now be running at `http://localhost:8000`

Visit `http://localhost:8000/docs` to see the API documentation.

### 3. Frontend Setup (Terminal 2)

Open a NEW terminal window:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

✅ Frontend should now be running at `http://localhost:5173`

### 4. Login to the Application

Open your browser to `http://localhost:5173`

Use these credentials:
- **Email**: admin@prothink.com
- **Password**: password123

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :8000   # Windows
```

**Database issues:**
```bash
# Delete the database file and restart
rm prothink_app.db
python main.py
```

### Frontend Issues

**Port 5173 already in use:**
- Vite will automatically try the next available port (5174, etc.)

**Module not found errors:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Cannot connect to backend:**
- Verify backend is running on port 8000
- Check `.env` file has correct API URL
- Check browser console for CORS errors

## Testing the Application

1. **Login** with demo credentials
2. **Dashboard** - View statistics and charts
3. **Employees** - Add, edit, view, delete employees
4. **Tasks** - Create tasks, assign to employees, track status
5. **Filters** - Try filtering by status, department, priority
6. **Search** - Search employees by name/email

## Production Build

### Backend
```bash
# Use gunicorn or similar for production
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Frontend
```bash
# Build static files
npm run build

# Preview production build
npm run preview

# Serve dist/ folder with any static server
```

## Environment Variables

### Backend
No environment variables needed for demo. For production:
- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - JWT secret key
- `CORS_ORIGINS` - Allowed CORS origins

### Frontend
Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Next Steps

- Explore the API documentation at `/docs`
- Check out the comprehensive README.md
- Try creating employees and tasks
- Test the filtering and search features
- View the dashboard analytics

## Need Help?

- Check the main README.md for detailed documentation
- Review API docs at `http://localhost:8000/docs`
- Check browser console for errors
- Verify both backend and frontend are running

---

**Happy Coding! 🚀**
