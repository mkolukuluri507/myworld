from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.portfolio import ChatMessage, ChatResponse, ChatSession
from services.anthropic_service import anthropic_service
import logging
import uuid

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["chat"])

# Database dependency will be injected
db: AsyncIOMotorDatabase = None

def set_database(database: AsyncIOMotorDatabase):
    global db
    db = database

@router.post("/", response_model=ChatResponse)
async def chat_with_ai(chat_message: ChatMessage):
    """Handle AI chat conversation"""
    try:
        # Generate session ID if not provided
        session_id = chat_message.session_id or str(uuid.uuid4())
        
        # Get AI response
        ai_result = await anthropic_service.get_chat_response(
            chat_message.message, 
            session_id
        )
        
        if not ai_result["success"]:
            raise HTTPException(status_code=500, detail=ai_result["response"])
        
        # Save chat session to database
        chat_session = ChatSession(
            session_id=session_id,
            user_message=chat_message.message,
            ai_response=ai_result["response"]
        )
        
        # Store in database
        chat_dict = chat_session.dict()
        await db.chat_sessions.insert_one(chat_dict)
        
        logger.info(f"Chat interaction saved for session: {session_id}")
        
        return ChatResponse(
            response=ai_result["response"],
            session_id=session_id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process chat message")

@router.get("/sessions/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        chat_history = await db.chat_sessions.find(
            {"session_id": session_id}
        ).sort("created_at", 1).to_list(100)
        
        return [ChatSession(**chat) for chat in chat_history]
        
    except Exception as e:
        logger.error(f"Error fetching chat history: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch chat history")

@router.delete("/sessions/{session_id}")
async def clear_chat_session(session_id: str):
    """Clear chat history for a session"""
    try:
        result = await db.chat_sessions.delete_many({"session_id": session_id})
        
        return {
            "success": True,
            "message": f"Cleared {result.deleted_count} messages from session",
            "session_id": session_id
        }
        
    except Exception as e:
        logger.error(f"Error clearing chat session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to clear chat session")