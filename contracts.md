# Portfolio Backend Integration Contracts

## API Endpoints & Data Contracts

### 1. Contact Form API
**Endpoint**: `POST /api/contact`
**Purpose**: Handle contact form submissions and send email notifications

```javascript
// Frontend Request
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}

// Backend Response
{
  "success": boolean,
  "message": "string",
  "contact_id": "string" // for tracking
}
```

**Mock Data Replacement**: Remove mock alert in Contact.jsx, implement real API call

---

### 2. Resume Download API
**Endpoint**: `GET /api/resume/download`
**Purpose**: Serve resume file for download

```javascript
// Frontend Implementation
const handleDownloadResume = async () => {
  const response = await fetch(`${API}/resume/download`);
  const blob = await response.blob();
  // Create download link
};
```

**Mock Data Replacement**: Replace mock alert in Hero.jsx with actual file download

---

### 3. Portfolio Data APIs
**Endpoints**: 
- `GET /api/portfolio/projects` - Get all projects
- `GET /api/portfolio/certifications` - Get all certifications  
- `GET /api/portfolio/tech-stack` - Get tech stack data
- `GET /api/portfolio/about` - Get about information

**Mock Data Replacement**: Replace imports from `/data/mock.js` with API calls

---

### 4. AI Chatbot API
**Endpoint**: `POST /api/chat`
**Purpose**: Anthropic Claude integration for portfolio Q&A

```javascript
// Frontend Request
{
  "message": "string",
  "session_id": "string" // for conversation context
}

// Backend Response  
{
  "response": "string",
  "session_id": "string"
}
```

**Implementation**: Add floating chat widget to portfolio

---

## Database Models

### Contact Model
```python
class Contact(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    status: str  # "new", "read", "replied"
```

### Project Model
```python
class Project(BaseModel):
    id: str
    title: str
    description: str
    technologies: List[str]
    challenges: str
    status: str
    type: str
    github_url: Optional[str]
    demo_url: Optional[str]
    created_at: datetime
```

### Certification Model
```python
class Certification(BaseModel):
    id: str
    name: str
    issuer: str
    year: str
    category: str
    verified: bool
    status: Optional[str]
    certificate_url: Optional[str]
```

### Chat Session Model
```python
class ChatSession(BaseModel):
    id: str
    session_id: str
    user_message: str
    ai_response: str
    created_at: datetime
```

---

## Frontend Integration Changes

### 1. API Service Setup
Create `/src/services/api.js` with centralized API calls

### 2. State Management
- Add loading states for API calls
- Error handling for failed requests
- Success notifications using toast

### 3. Components to Update
- **Hero.jsx**: Real resume download
- **Contact.jsx**: Real form submission
- **About.jsx**: Fetch from API
- **TechStack.jsx**: Fetch from API  
- **Projects.jsx**: Fetch from API
- **Certifications.jsx**: Fetch from API

### 4. New Components
- **ChatBot.jsx**: Floating AI assistant
- **LoadingSpinner.jsx**: For API loading states
- **ErrorBoundary.jsx**: Error handling

---

## Environment Variables Needed

### Backend (.env)
```
ANTHROPIC_API_KEY=your_claude_api_key
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
RESUME_FILE_PATH=/app/static/resume-mourya-varma.pdf
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=existing_value
REACT_APP_ENABLE_CHAT=true
```

---

## File Structure Changes

### New Backend Files
- `/models/portfolio.py` - Database models
- `/routes/contact.py` - Contact form handling
- `/routes/portfolio.py` - Portfolio data endpoints
- `/routes/chat.py` - AI chatbot endpoints
- `/routes/files.py` - File serving endpoints
- `/services/email.py` - Email service
- `/services/anthropic.py` - Claude AI service
- `/static/resume-mourya-varma.pdf` - Resume file

### New Frontend Files
- `/src/services/api.js` - API service layer
- `/src/components/ChatBot.jsx` - AI assistant
- `/src/hooks/useApi.js` - Custom API hook
- `/src/utils/notifications.js` - Toast notifications

---

## Testing Strategy

### Backend Testing
- Contact form submission
- File download functionality
- AI chatbot responses
- Database operations
- Email sending

### Frontend Testing  
- Form validation and submission
- API loading states
- Error handling
- Chat functionality
- File downloads

---

## Deployment Considerations

### Static Files
- Resume PDF storage and serving
- Optimized image delivery
- File upload handling

### Email Configuration
- SMTP settings for contact form
- Email templates
- Rate limiting

### AI Integration
- Anthropic API key management
- Conversation context storage
- Response streaming (optional)

---

## Migration from Mock Data

1. **Phase 1**: Set up database models and seed with mock data
2. **Phase 2**: Create API endpoints returning database data
3. **Phase 3**: Update frontend to use APIs instead of mock imports
4. **Phase 4**: Add new features (chat, file serving)
5. **Phase 5**: Testing and refinement