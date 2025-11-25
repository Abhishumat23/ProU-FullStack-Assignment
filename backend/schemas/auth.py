"""
Pydantic schemas for authentication
"""
from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    """Schema for login request"""
    email: EmailStr
    password: str


class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: dict
