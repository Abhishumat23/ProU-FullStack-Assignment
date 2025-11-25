"""
Employee SQLAlchemy model
"""
from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from database import Base


class EmployeeStatus(str, enum.Enum):
    """Employee status enumeration"""
    ACTIVE = "active"
    INACTIVE = "inactive"


class Employee(Base):
    """
    Employee model representing an employee in the organization
    """
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False, index=True)
    status = Column(Enum(EmployeeStatus), default=EmployeeStatus.ACTIVE, nullable=False)
    date_joined = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationship with tasks
    tasks = relationship("Task", back_populates="employee", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Employee(id={self.id}, name='{self.name}', email='{self.email}')>"
