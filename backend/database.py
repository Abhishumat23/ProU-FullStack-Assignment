"""
Database configuration and session management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime, timedelta

# SQLite database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./prothink_app.db"

# Create engine with check_same_thread=False for SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    echo=True  # Set to False in production
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for declarative models
Base = declarative_base()


def get_db() -> Session:
    """
    Dependency function to get database session
    Yields a database session and closes it after use
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed_database():
    """
    Seed the database with initial demo data
    Only runs if database is empty
    """
    from models.employee import Employee
    from models.task import Task
    
    db = SessionLocal()
    try:
        # Check if data already exists
        if db.query(Employee).count() > 0:
            print("Database already seeded, skipping...")
            return
        
        print("Seeding database with initial data...")
        
        # Create demo employees
        employees = [
            Employee(
                name="Alice Johnson",
                email="alice.johnson@prothink.com",
                role="Engineering Manager",
                department="Engineering",
                status="active",
                date_joined=datetime.now() - timedelta(days=365)
            ),
            Employee(
                name="Bob Smith",
                email="bob.smith@prothink.com",
                role="Senior Developer",
                department="Engineering",
                status="active",
                date_joined=datetime.now() - timedelta(days=180)
            ),
            Employee(
                name="Carol White",
                email="carol.white@prothink.com",
                role="Product Manager",
                department="Product",
                status="active",
                date_joined=datetime.now() - timedelta(days=270)
            ),
            Employee(
                name="David Brown",
                email="david.brown@prothink.com",
                role="HR Specialist",
                department="HR",
                status="active",
                date_joined=datetime.now() - timedelta(days=90)
            ),
            Employee(
                name="Eve Davis",
                email="eve.davis@prothink.com",
                role="Sales Executive",
                department="Sales",
                status="inactive",
                date_joined=datetime.now() - timedelta(days=450)
            ),
        ]
        
        db.add_all(employees)
        db.commit()
        
        # Refresh to get IDs
        for emp in employees:
            db.refresh(emp)
        
        # Create demo tasks
        tasks = [
            Task(
                title="Implement user authentication",
                description="Add JWT-based authentication to the API",
                status="done",
                priority="high",
                due_date=datetime.now().date() - timedelta(days=10),
                employee_id=employees[1].id  # Bob
            ),
            Task(
                title="Design database schema",
                description="Create ERD for employee and task management system",
                status="done",
                priority="high",
                due_date=datetime.now().date() - timedelta(days=20),
                employee_id=employees[0].id  # Alice
            ),
            Task(
                title="Write API documentation",
                description="Document all REST endpoints with examples",
                status="in_progress",
                priority="medium",
                due_date=datetime.now().date() + timedelta(days=5),
                employee_id=employees[1].id  # Bob
            ),
            Task(
                title="Conduct user interviews",
                description="Interview 10 potential users about feature requirements",
                status="in_progress",
                priority="high",
                due_date=datetime.now().date() + timedelta(days=3),
                employee_id=employees[2].id  # Carol
            ),
            Task(
                title="Setup CI/CD pipeline",
                description="Configure GitHub Actions for automated testing and deployment",
                status="todo",
                priority="medium",
                due_date=datetime.now().date() + timedelta(days=15),
                employee_id=employees[1].id  # Bob
            ),
            Task(
                title="Create onboarding documentation",
                description="Prepare comprehensive onboarding guide for new hires",
                status="todo",
                priority="low",
                due_date=datetime.now().date() + timedelta(days=30),
                employee_id=employees[3].id  # David
            ),
            Task(
                title="Q4 sales report analysis",
                description="Analyze Q4 sales data and prepare presentation",
                status="todo",
                priority="high",
                due_date=datetime.now().date() + timedelta(days=7),
                employee_id=None  # Unassigned
            ),
            Task(
                title="Refactor legacy codebase",
                description="Improve code quality and remove technical debt",
                status="todo",
                priority="low",
                due_date=datetime.now().date() + timedelta(days=45),
                employee_id=None  # Unassigned
            ),
        ]
        
        db.add_all(tasks)
        db.commit()
        
        print(f"Successfully seeded {len(employees)} employees and {len(tasks)} tasks")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()
