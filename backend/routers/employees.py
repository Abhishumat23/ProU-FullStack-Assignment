"""
Employee router - CRUD endpoints for employees
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database import get_db
from models.employee import Employee, EmployeeStatus
from schemas.employee import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeResponse,
    EmployeeWithTasks
)

router = APIRouter()


@router.get("", response_model=List[EmployeeResponse])
def list_employees(
    status: Optional[EmployeeStatus] = Query(None, description="Filter by status"),
    department: Optional[str] = Query(None, description="Filter by department"),
    role: Optional[str] = Query(None, description="Filter by role"),
    search: Optional[str] = Query(None, description="Search by name or email"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """
    Get list of employees with optional filters and pagination
    """
    query = db.query(Employee)
    
    # Apply filters
    if status:
        query = query.filter(Employee.status == status)
    
    if department:
        query = query.filter(Employee.department == department)
    
    if role:
        query = query.filter(Employee.role == role)
    
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (Employee.name.ilike(search_pattern)) | 
            (Employee.email.ilike(search_pattern))
        )
    
    # Apply pagination
    offset = (page - 1) * page_size
    employees = query.offset(offset).limit(page_size).all()
    
    return employees


@router.get("/{employee_id}", response_model=EmployeeWithTasks)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    """
    Get single employee by ID with their assigned tasks
    """
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return employee


@router.post("", response_model=EmployeeResponse, status_code=201)
def create_employee(
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new employee
    """
    # Check if email already exists
    existing = db.query(Employee).filter(Employee.email == employee_data.email).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail=f"Employee with email {employee_data.email} already exists"
        )
    
    # Create new employee
    employee = Employee(
        name=employee_data.name,
        email=employee_data.email,
        role=employee_data.role,
        department=employee_data.department,
        status=EmployeeStatus(employee_data.status),
        date_joined=employee_data.date_joined or datetime.utcnow()
    )
    
    db.add(employee)
    db.commit()
    db.refresh(employee)
    
    return employee


@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: int,
    employee_data: EmployeeUpdate,
    db: Session = Depends(get_db)
):
    """
    Full update of an employee (PATCH for partial update)
    """
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Update fields
    update_data = employee_data.model_dump(exclude_unset=True)
    
    # Check email uniqueness if email is being updated
    if "email" in update_data and update_data["email"] != employee.email:
        existing = db.query(Employee).filter(Employee.email == update_data["email"]).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail=f"Employee with email {update_data['email']} already exists"
            )
    
    # Convert status string to enum if present
    if "status" in update_data:
        update_data["status"] = EmployeeStatus(update_data["status"])
    
    for key, value in update_data.items():
        setattr(employee, key, value)
    
    employee.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(employee)
    
    return employee


@router.patch("/{employee_id}", response_model=EmployeeResponse)
def partial_update_employee(
    employee_id: int,
    employee_data: EmployeeUpdate,
    db: Session = Depends(get_db)
):
    """
    Partial update of an employee
    """
    return update_employee(employee_id, employee_data, db)


@router.delete("/{employee_id}", status_code=204)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete an employee (cascades to their tasks)
    """
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(employee)
    db.commit()
    
    return None
