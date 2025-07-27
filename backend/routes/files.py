from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
import os
import mimetypes
import logging
from pathlib import Path

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/files", tags=["files"])

# Static files directory
STATIC_DIR = Path(__file__).parent.parent / "static"
STATIC_DIR.mkdir(exist_ok=True)

@router.get("/resume/download")
async def download_resume():
    """Download Mourya's resume"""
    try:
        # Look for resume file
        resume_files = [
            "resume-mourya-varma.pdf",
            "mourya-varma-resume.pdf", 
            "resume.pdf"
        ]
        
        resume_path = None
        for filename in resume_files:
            potential_path = STATIC_DIR / filename
            if potential_path.exists():
                resume_path = potential_path
                break
        
        if not resume_path:
            # Create a placeholder resume file
            placeholder_content = """
Mourya Varma - Software Engineer & Aspiring Data Engineer

Contact: varmamourya3@gmail.com
LinkedIn: https://linkedin.com/in/mourya-varma
GitHub: https://github.com/mouryavarma

EXPERIENCE:
• 3+ years in Backend Development (Java, Spring Boot)
• REST API design and WMS systems
• Real-time data processing with Kafka

CURRENT LEARNING:
• Apache Spark, Hadoop, Apache Airflow
• Cloud platforms: GCP, Azure
• Generative AI & Agentic AI

CERTIFICATIONS:
• Programming in Java (NPTEL)
• Programming in Python (NPTEL)  
• AWS Academy Cloud Foundations

Please contact directly for detailed resume.
            """
            
            placeholder_path = STATIC_DIR / "resume-mourya-varma.txt"
            with open(placeholder_path, "w") as f:
                f.write(placeholder_content)
            
            return FileResponse(
                path=placeholder_path,
                filename="mourya-varma-resume.txt",
                media_type="text/plain"
            )
        
        # Determine mime type
        mime_type, _ = mimetypes.guess_type(str(resume_path))
        if not mime_type:
            mime_type = "application/octet-stream"
        
        return FileResponse(
            path=resume_path,
            filename=resume_path.name,
            media_type=mime_type
        )
        
    except Exception as e:
        logger.error(f"Error serving resume file: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to download resume")

@router.get("/assets/{filename}")
async def get_asset(filename: str):
    """Serve static assets"""
    try:
        file_path = STATIC_DIR / filename
        
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="File not found")
        
        # Security check - ensure file is within static directory
        if not str(file_path.resolve()).startswith(str(STATIC_DIR.resolve())):
            raise HTTPException(status_code=403, detail="Access denied")
        
        mime_type, _ = mimetypes.guess_type(str(file_path))
        if not mime_type:
            mime_type = "application/octet-stream"
        
        return FileResponse(
            path=file_path,
            media_type=mime_type
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error serving asset {filename}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to serve file")

@router.post("/upload/resume")
async def upload_resume():
    """Upload resume file (admin endpoint)"""
    # This would handle file uploads in a real implementation
    # For now, return a placeholder response
    return {
        "message": "Resume upload endpoint - implement with multipart/form-data handling",
        "status": "placeholder"
    }

@router.get("/health")
async def files_health_check():
    """Health check for files service"""
    return {
        "status": "healthy",
        "static_dir": str(STATIC_DIR),
        "static_dir_exists": STATIC_DIR.exists()
    }