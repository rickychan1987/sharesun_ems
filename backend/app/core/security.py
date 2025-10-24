from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
import hashlib
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

#Swicth to Argon2 for password hashing [if you get error about: 72-byte limit:]
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def hash_password(password: str) -> str:
    # Pre-hash with SHA256 to handle any length password
    pre_hash = hashlib.sha256(password.encode()).hexdigest()
    return pwd_context.hash(pre_hash)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Pre-hash before verification
    pre_hash = hashlib.sha256(plain_password.encode()).hexdigest()
    return pwd_context.verify(pre_hash, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password with SHA256 first, then bcrypt"""
    # Pre-hash with SHA256 to handle any length password
    password_sha256 = hashlib.sha256(password.encode('utf-8')).hexdigest()
    return pwd_context.hash(password_sha256)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception
