from fastapi import APIRouter, HTTPException, BackgroundTasks
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.portfolio import Contact, ContactCreate
from services.email import email_service
import logging
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["contact"])

# Database dependency will be injected
db: AsyncIOMotorDatabase = None

def set_database(database: AsyncIOMotorDatabase):
    global db
    db = database

@router.post("/", response_model=dict)
async def submit_contact(contact_data: ContactCreate, background_tasks: BackgroundTasks):
    """Handle contact form submission"""
    try:
        # Create contact object
        contact = Contact(**contact_data.dict())
        
        # Save to database
        contact_dict = contact.dict()
        result = await db.contacts.insert_one(contact_dict)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to save contact")
        
        # Add background tasks for email notifications
        background_tasks.add_task(
            email_service.send_contact_notification, 
            contact_dict
        )
        background_tasks.add_task(
            email_service.send_auto_reply,
            contact.email,
            contact.name
        )
        
        logger.info(f"Contact form submitted by: {contact.email}")
        
        return {
            "success": True,
            "message": "Thank you for your message! I'll get back to you soon.",
            "contact_id": contact.id
        }
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process contact form")

@router.get("/", response_model=list)
async def get_contacts():
    """Get all contacts (admin endpoint)"""
    try:
        contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
        return [Contact(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

@router.put("/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """Update contact status (admin endpoint)"""
    try:
        if status not in ["new", "read", "replied"]:
            raise HTTPException(status_code=400, detail="Invalid status")
            
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        return {"success": True, "message": "Status updated"}
        
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update status")