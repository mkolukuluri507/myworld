from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.portfolio import (
    Project, ProjectCreate, 
    Certification, CertificationCreate,
    TechStack, AboutInfo, PersonalInfo, SocialLinks, GalleryImage
)
from typing import List
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/portfolio", tags=["portfolio"])

# Database dependency will be injected
db: AsyncIOMotorDatabase = None

def set_database(database: AsyncIOMotorDatabase):
    global db
    db = database

@router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    try:
        projects = await db.projects.find().sort("created_at", -1).to_list(100)
        return [Project(**project) for project in projects]
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@router.get("/certifications", response_model=List[Certification])
async def get_certifications():
    """Get all certifications"""
    try:
        certifications = await db.certifications.find().sort("year", -1).to_list(100)
        return [Certification(**cert) for cert in certifications]
    except Exception as e:
        logger.error(f"Error fetching certifications: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch certifications")

@router.get("/tech-stack", response_model=TechStack)
async def get_tech_stack():
    """Get tech stack information"""
    try:
        tech_stack = await db.tech_stack.find_one({"type": "main"})
        if not tech_stack:
            raise HTTPException(status_code=404, detail="Tech stack not found")
        return TechStack(**tech_stack)
    except Exception as e:
        logger.error(f"Error fetching tech stack: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch tech stack")

@router.get("/about", response_model=AboutInfo)
async def get_about():
    """Get about information"""
    try:
        about = await db.about.find_one({"type": "main"})
        if not about:
            raise HTTPException(status_code=404, detail="About info not found")
        return AboutInfo(**about)
    except Exception as e:
        logger.error(f"Error fetching about info: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch about info")

@router.get("/personal-info", response_model=PersonalInfo)
async def get_personal_info():
    """Get personal information"""
    try:
        personal = await db.personal_info.find_one({"type": "main"})
        if not personal:
            raise HTTPException(status_code=404, detail="Personal info not found")
        return PersonalInfo(**personal)
    except Exception as e:
        logger.error(f"Error fetching personal info: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch personal info")

@router.get("/social-links", response_model=SocialLinks)
async def get_social_links():
    """Get social media links"""
    try:
        social = await db.social_links.find_one({"type": "main"})
        if not social:
            raise HTTPException(status_code=404, detail="Social links not found")
        return SocialLinks(**social)
    except Exception as e:
        logger.error(f"Error fetching social links: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch social links")

@router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery():
    """Get gallery images"""
    try:
        images = await db.gallery.find().to_list(100)
        return [GalleryImage(**image) for image in images]
    except Exception as e:
        logger.error(f"Error fetching gallery: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch gallery")

# Admin endpoints for updating data
@router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate):
    """Create new project (admin endpoint)"""
    try:
        project = Project(**project_data.dict())
        project_dict = project.dict()
        result = await db.projects.insert_one(project_dict)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to create project")
            
        return project
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")

@router.post("/certifications", response_model=Certification)
async def create_certification(cert_data: CertificationCreate):
    """Create new certification (admin endpoint)"""
    try:
        certification = Certification(**cert_data.dict())
        cert_dict = certification.dict()
        result = await db.certifications.insert_one(cert_dict)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to create certification")
            
        return certification
    except Exception as e:
        logger.error(f"Error creating certification: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create certification")