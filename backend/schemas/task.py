"""
Pydantic schemas for Task endpoints
"""
from pydantic import BaseModel, Field
from datetime import datetime, date
from typing import Optional

from models.task import TaskStatus, TaskPriority


class TaskBase(BaseModel):
    """Base task schema with common fields"""
    title: str = Field(..., min_length=1, max_length=200, description="Task title")
    description: Optional[str] = Field(None, description="Task description")
    status: TaskStatus = Field(default=TaskStatus.TODO, description="Task status")
    priority: TaskPriority = Field(default=TaskPriority.MEDIUM, description="Task priority")
    due_date: Optional[date] = Field(None, description="Task due date")
    employee_id: Optional[int] = Field(None, description="Assigned employee ID")


class TaskCreate(TaskBase):
    """Schema for creating a new task"""
    pass


class TaskUpdate(BaseModel):
    """Schema for updating a task (partial updates allowed)"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    due_date: Optional[date] = None
    employee_id: Optional[int] = None


class TaskResponse(TaskBase):
    """Schema for task response"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class EmployeeSummary(BaseModel):
    """Minimal employee info for task response"""
    id: int
    name: str
    email: str
    department: str
    
    class Config:
        from_attributes = True


class TaskWithEmployee(TaskResponse):
    """Task response with employee information"""
    employee: Optional[EmployeeSummary] = None
    
    class Config:
        from_attributes = True


class TaskAssign(BaseModel):
    """Schema for assigning a task to an employee"""
    employee_id: int = Field(..., description="Employee ID to assign task to")
