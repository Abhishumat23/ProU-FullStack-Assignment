"""
Task router - CRUD endpoints for tasks
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, date

from database import get_db
from models.task import Task, TaskStatus, TaskPriority
from models.employee import Employee
from schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
    TaskWithEmployee,
    TaskAssign
)

router = APIRouter()


@router.get("", response_model=List[TaskWithEmployee])
def list_tasks(
    status: Optional[TaskStatus] = Query(None, description="Filter by status"),
    priority: Optional[TaskPriority] = Query(None, description="Filter by priority"),
    employee_id: Optional[int] = Query(None, description="Filter by assigned employee"),
    due_before: Optional[date] = Query(None, description="Filter tasks due before date"),
    due_after: Optional[date] = Query(None, description="Filter tasks due after date"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """
    Get list of tasks with optional filters and pagination
    """
    query = db.query(Task)
    
    # Apply filters
    if status:
        query = query.filter(Task.status == status)
    
    if priority:
        query = query.filter(Task.priority == priority)
    
    if employee_id is not None:
        query = query.filter(Task.employee_id == employee_id)
    
    if due_before:
        query = query.filter(Task.due_date <= due_before)
    
    if due_after:
        query = query.filter(Task.due_date >= due_after)
    
    # Apply pagination
    offset = (page - 1) * page_size
    tasks = query.offset(offset).limit(page_size).all()
    
    return tasks


@router.get("/{task_id}", response_model=TaskWithEmployee)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    """
    Get single task by ID with employee information if assigned
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return task


@router.post("", response_model=TaskResponse, status_code=201)
def create_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new task
    """
    # Validate employee_id if provided
    if task_data.employee_id:
        employee = db.query(Employee).filter(Employee.id == task_data.employee_id).first()
        if not employee:
            raise HTTPException(
                status_code=400,
                detail=f"Employee with ID {task_data.employee_id} not found"
            )
    
    # Create new task
    task = Task(
        title=task_data.title,
        description=task_data.description,
        status=task_data.status,
        priority=task_data.priority,
        due_date=task_data.due_date,
        employee_id=task_data.employee_id
    )
    
    db.add(task)
    db.commit()
    db.refresh(task)
    
    return task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db)
):
    """
    Full update of a task
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update fields
    update_data = task_data.model_dump(exclude_unset=True)
    
    # Validate employee_id if being updated
    if "employee_id" in update_data and update_data["employee_id"]:
        employee = db.query(Employee).filter(Employee.id == update_data["employee_id"]).first()
        if not employee:
            raise HTTPException(
                status_code=400,
                detail=f"Employee with ID {update_data['employee_id']} not found"
            )
    
    for key, value in update_data.items():
        setattr(task, key, value)
    
    task.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(task)
    
    return task


@router.patch("/{task_id}", response_model=TaskResponse)
def partial_update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db)
):
    """
    Partial update of a task
    """
    return update_task(task_id, task_data, db)


@router.delete("/{task_id}", status_code=204)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a task
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    
    return None


@router.post("/{task_id}/assign", response_model=TaskResponse)
def assign_task(
    task_id: int,
    assign_data: TaskAssign,
    db: Session = Depends(get_db)
):
    """
    Assign a task to an employee
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    employee = db.query(Employee).filter(Employee.id == assign_data.employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=400,
            detail=f"Employee with ID {assign_data.employee_id} not found"
        )
    
    task.employee_id = assign_data.employee_id
    task.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(task)
    
    return task


@router.post("/{task_id}/unassign", response_model=TaskResponse)
def unassign_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    """
    Unassign a task (remove employee assignment)
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.employee_id = None
    task.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(task)
    
    return task
