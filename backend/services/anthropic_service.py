import os
import json
import logging
from typing import Optional, Dict, Any
import httpx
from datetime import datetime

logger = logging.getLogger(__name__)

class AnthropicService:
    def __init__(self):
        self.api_key = os.getenv('ANTHROPIC_API_KEY')
        self.base_url = "https://api.anthropic.com/v1/messages"
        self.model = "claude-3-5-sonnet-20241022"
        self.max_tokens = 1000
        
        # Portfolio context for the AI
        self.portfolio_context = """
You are an AI assistant for Mourya Varma's portfolio website. You should answer questions about:

ABOUT MOURYA:
- Software Engineer with 3+ years experience in backend development
- Specializes in Java, Spring Boot, Angular, and REST API development
- Currently learning Data Engineering tools: Apache Spark, Hadoop, Apache Airflow, Kafka
- Exploring Generative AI and Agentic AI applications
- Background in WMS (Warehouse Management Systems)
- Email: varmamourya3@gmail.com

TECHNICAL SKILLS:
Backend: Java (Expert), Spring Boot (Expert), REST APIs (Expert), Kafka (Intermediate)
Frontend: Angular (Advanced), JavaScript (Advanced), TypeScript (Advanced)
Data Tools: Apache Spark (Learning), Hadoop (Learning), Apache Airflow (Learning), SQL (Intermediate)
Cloud: Google Cloud (Learning), Azure (Learning), AWS (Basic)
AI/ML: Generative AI (Learning), Agentic AI (Learning)

PROJECTS:
1. Extensibility REST API - Scalable API framework for WMS functionalities
2. Kafka POC - Real-time data streaming implementation
3. Saved Views UI Enhancement - Angular interface improvements
4. Upcoming: Spark Data Pipeline for warehouse data processing

CERTIFICATIONS:
- Programming in Java (NPTEL) - 2023
- Programming in Python (NPTEL) - 2023
- AWS Academy Cloud Foundations - 2022
- Working on: Apache Spark Certification (Databricks)

Keep responses concise, professional, and helpful. If asked about topics outside Mourya's expertise, politely redirect to his contact information.
        """

    async def get_chat_response(self, user_message: str, session_id: str) -> Dict[str, Any]:
        """Get AI response for user message"""
        try:
            if not self.api_key:
                return {
                    "success": False,
                    "response": "AI chatbot is currently unavailable. Please contact Mourya directly at varmamourya3@gmail.com",
                    "session_id": session_id
                }

            # Prepare the message with context
            messages = [
                {
                    "role": "user",
                    "content": f"{self.portfolio_context}\n\nUser question: {user_message}"
                }
            ]

            # Make request to Anthropic API
            headers = {
                "Content-Type": "application/json",
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01"
            }

            payload = {
                "model": self.model,
                "max_tokens": self.max_tokens,
                "messages": messages
            }

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.base_url,
                    headers=headers,
                    json=payload
                )

            if response.status_code == 200:
                result = response.json()
                ai_response = result["content"][0]["text"]
                
                logger.info(f"AI response generated for session: {session_id}")
                
                return {
                    "success": True,
                    "response": ai_response,
                    "session_id": session_id
                }
            else:
                logger.error(f"Anthropic API error: {response.status_code} - {response.text}")
                return {
                    "success": False,
                    "response": "I'm having trouble processing your request right now. Please contact Mourya directly at varmamourya3@gmail.com",
                    "session_id": session_id
                }

        except Exception as e:
            logger.error(f"Error in AI chat service: {str(e)}")
            return {
                "success": False,
                "response": "Sorry, I'm experiencing technical difficulties. Please contact Mourya at varmamourya3@gmail.com for assistance.",
                "session_id": session_id
            }

    def generate_session_id(self) -> str:
        """Generate unique session ID"""
        import uuid
        return str(uuid.uuid4())

# Global anthropic service instance
anthropic_service = AnthropicService()