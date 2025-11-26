"""
ProU Technology - Employee & Task Management API
FastAPI backend application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database import engine, Base, seed_database
from routers import employees, tasks, auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database and seed data on startup"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Seed initial data
    seed_database()
    
    yield
    
    # Cleanup (if needed)


app = FastAPI(
    title="ProU Employee & Task Management API",
    description="RESTful API for managing employees and tasks",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://pro-u-full-stack-assignment.vercel.app",
        "https://*.vercel.app",
        "https://*.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(employees.router, prefix="/api/employees", tags=["Employees"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])


@app.get("/")
def root():
    """Root endpoint - API health check"""
    return {
        "message": "ProU Employee & Task Management API",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
