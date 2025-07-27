"""
Database seeding script
Run this to populate the database with initial data
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from seed_data import (
    PROJECTS_DATA, CERTIFICATIONS_DATA, TECH_STACK_DATA,
    ABOUT_DATA, PERSONAL_INFO_DATA, SOCIAL_LINKS_DATA, GALLERY_DATA
)
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def seed_database():
    """Seed the database with initial data"""
    try:
        # Connect to MongoDB
        mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
        client = AsyncIOMotorClient(mongo_url)
        db = client[os.environ.get('DB_NAME', 'portfolio_db')]
        
        logger.info("Connected to MongoDB")
        
        # Clear existing data (optional - comment out to preserve existing data)
        # await db.projects.delete_many({})
        # await db.certifications.delete_many({})
        # await db.tech_stack.delete_many({})
        # await db.about.delete_many({})
        # await db.personal_info.delete_many({})
        # await db.social_links.delete_many({})
        # await db.gallery.delete_many({})
        # logger.info("Cleared existing data")
        
        # Seed projects
        if await db.projects.count_documents({}) == 0:
            await db.projects.insert_many(PROJECTS_DATA)
            logger.info(f"Seeded {len(PROJECTS_DATA)} projects")
        else:
            logger.info("Projects already exist, skipping...")
        
        # Seed certifications
        if await db.certifications.count_documents({}) == 0:
            await db.certifications.insert_many(CERTIFICATIONS_DATA)
            logger.info(f"Seeded {len(CERTIFICATIONS_DATA)} certifications")
        else:
            logger.info("Certifications already exist, skipping...")
        
        # Seed tech stack (replace if exists)
        await db.tech_stack.replace_one(
            {"type": "main"}, 
            TECH_STACK_DATA, 
            upsert=True
        )
        logger.info("Seeded tech stack")
        
        # Seed about info (replace if exists)
        await db.about.replace_one(
            {"type": "main"}, 
            ABOUT_DATA, 
            upsert=True
        )
        logger.info("Seeded about info")
        
        # Seed personal info (replace if exists)
        await db.personal_info.replace_one(
            {"type": "main"}, 
            PERSONAL_INFO_DATA, 
            upsert=True
        )
        logger.info("Seeded personal info")
        
        # Seed social links (replace if exists)
        await db.social_links.replace_one(
            {"type": "main"}, 
            SOCIAL_LINKS_DATA, 
            upsert=True
        )
        logger.info("Seeded social links")
        
        # Seed gallery
        if await db.gallery.count_documents({}) == 0:
            await db.gallery.insert_many(GALLERY_DATA)
            logger.info(f"Seeded {len(GALLERY_DATA)} gallery images")
        else:
            logger.info("Gallery already exists, skipping...")
        
        logger.info("Database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())