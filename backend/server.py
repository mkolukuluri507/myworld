from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import route modules
from routes import contact, portfolio, chat, files

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Create the main app
app = FastAPI(title="Mourya Varma Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Set database for route modules
contact.set_database(db)
portfolio.set_database(db)
chat.set_database(db)

# Include route modules
api_router.include_router(contact.router)
api_router.include_router(portfolio.router)
api_router.include_router(chat.router)
api_router.include_router(files.router)

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Mourya Varma Portfolio API",
        "version": "1.0.0"
    }

# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Mourya Varma Portfolio API",
        "version": "1.0.0",
        "endpoints": {
            "contact": "/api/contact",
            "portfolio": "/api/portfolio", 
            "chat": "/api/chat",
            "files": "/api/files",
            "health": "/api/health"
        }
    }

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database connection and run seeding if needed"""
    logger.info("Starting Portfolio API server...")
    
    # Test database connection
    try:
        await db.command("ping")
        logger.info("Successfully connected to MongoDB")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise
    
    # Run database seeding
    try:
        from data.seed_database import seed_database
        await seed_database()
        logger.info("Database seeding completed")
    except Exception as e:
        logger.warning(f"Database seeding failed (this may be normal): {e}")

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection"""
    logger.info("Shutting down Portfolio API server...")
    client.close()