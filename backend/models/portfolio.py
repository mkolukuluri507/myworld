from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Contact Models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., regex=r'^[^@]+@[^@]+\.[^@]+$')
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")  # "new", "read", "replied"

# Project Models
class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    challenges: str
    status: str
    type: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    challenges: str
    status: str
    type: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Certification Models
class CertificationCreate(BaseModel):
    name: str
    issuer: str
    year: str
    category: str
    verified: bool = False
    status: Optional[str] = None
    certificate_url: Optional[str] = None

class Certification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    issuer: str
    year: str
    category: str
    verified: bool
    status: Optional[str] = None
    certificate_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Tech Stack Models
class TechItem(BaseModel):
    name: str
    level: str
    icon: Optional[str] = None

class TechCategory(BaseModel):
    category: str
    technologies: List[TechItem]

class TechStack(BaseModel):
    backend: List[TechItem]
    frontend: List[TechItem]
    dataTools: List[TechItem]
    cloud: List[TechItem]
    ai: List[TechItem]

# About Models
class AboutInfo(BaseModel):
    introduction: str
    experience: str
    currentLearning: str
    interests: List[str]

# Chat Models
class ChatMessage(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

class ChatSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_message: str
    ai_response: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Gallery Models
class GalleryImage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    caption: str
    category: str

# Personal Info Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    email: str
    location: str
    experience: str
    resumeUrl: str

class SocialLinks(BaseModel):
    github: str
    linkedin: str
    email: str