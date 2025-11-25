"""
Authentication router
Simple JWT-based authentication for demo purposes
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
import jwt

from schemas.auth import LoginRequest, Token

router = APIRouter()
security = HTTPBearer()

# Demo credentials (in production, use proper password hashing)
DEMO_USERS = {
    "admin@prothink.com": {
        "password": "password123",
        "name": "Admin User",
        "role": "Administrator"
    },
    "manager@prothink.com": {
        "password": "manager123",
        "name": "Manager User",
        "role": "Manager"
    }
}

# JWT settings (in production, use environment variables)
SECRET_KEY = "prothink-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours


def create_access_token(data: dict) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Verify JWT token and return payload"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/login", response_model=Token)
def login(credentials: LoginRequest):
    """
    Login endpoint
    Demo credentials:
    - admin@prothink.com / password123
    - manager@prothink.com / manager123
    """
    user = DEMO_USERS.get(credentials.email)
    
    if not user or user["password"] != credentials.password:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )
    
    # Create token payload
    token_data = {
        "email": credentials.email,
        "name": user["name"],
        "role": user["role"]
    }
    
    # Generate token
    access_token = create_access_token(token_data)
    
    return Token(
        access_token=access_token,
        user={
            "email": credentials.email,
            "name": user["name"],
            "role": user["role"]
        }
    )


@router.get("/verify")
def verify(payload: dict = Depends(verify_token)):
    """Verify token endpoint"""
    return {
        "valid": True,
        "user": payload
    }
