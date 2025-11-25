"""
Pydantic schemas for Employee endpoints
"""
from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime, date
from typing import List, Optional, Literal, Union


class EmployeeBase(BaseModel):
    """Base employee schema with common fields"""
    name: str = Field(..., min_length=1, max_length=100, description="Employee name")
    email: EmailStr = Field(..., description="Employee email address")
    role: str = Field(..., min_length=1, max_length=100, description="Employee role")
    department: str = Field(..., min_length=1, max_length=100, description="Department")
    status: Literal["active", "inactive"] = Field(default="active", description="Employee status")


class EmployeeCreate(EmployeeBase):
    """Schema for creating a new employee"""
    date_joined: Optional[Union[datetime, date, str]] = Field(default=None, description="Date employee joined")
    
    @field_validator('date_joined', mode='before')
    @classmethod
    def parse_date_joined(cls, v):
        if v is None:
            return None
        if isinstance(v, (datetime, date)):
            return v
        if isinstance(v, str):
            # Try parsing as date first (YYYY-MM-DD)
            try:
                return datetime.strptime(v, '%Y-%m-%d')
            except ValueError:
                # Try parsing as datetime
                try:
                    return datetime.fromisoformat(v.replace('Z', '+00:00'))
                except ValueError:
                    return v
        return v


class EmployeeUpdate(BaseModel):
    """Schema for updating an employee (partial updates allowed)"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    role: Optional[str] = Field(None, min_length=1, max_length=100)
    department: Optional[str] = Field(None, min_length=1, max_length=100)
    status: Optional[Literal["active", "inactive"]] = None
    date_joined: Optional[Union[datetime, date, str]] = None
    
    @field_validator('date_joined', mode='before')
    @classmethod
    def parse_date_joined(cls, v):
        if v is None:
            return None
        if isinstance(v, (datetime, date)):
            return v
        if isinstance(v, str):
            try:
                return datetime.strptime(v, '%Y-%m-%d')
            except ValueError:
                try:
                    return datetime.fromisoformat(v.replace('Z', '+00:00'))
                except ValueError:
                    return v
        return v


class EmployeeResponse(BaseModel):
    """Schema for employee response"""
    id: int
    name: str
    email: str
    role: str
    department: str
    status: str
    date_joined: datetime
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class TaskSummary(BaseModel):
    """Minimal task info for employee response"""
    id: int
    title: str
    status: str
    priority: str
    due_date: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class EmployeeWithTasks(EmployeeResponse):
    """Employee response with associated tasks"""
    tasks: List[TaskSummary] = []
    
    class Config:
        from_attributes = True
