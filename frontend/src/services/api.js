import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Contact API
export const contactApi = {
  submitContact: async (contactData) => {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  },
  
  getContacts: async () => {
    const response = await apiClient.get('/contact');
    return response.data;
  }
};

// Portfolio API
export const portfolioApi = {
  getProjects: async () => {
    const response = await apiClient.get('/portfolio/projects');
    return response.data;
  },
  
  getCertifications: async () => {
    const response = await apiClient.get('/portfolio/certifications');
    return response.data;
  },
  
  getTechStack: async () => {
    const response = await apiClient.get('/portfolio/tech-stack');
    return response.data;
  },
  
  getAbout: async () => {
    const response = await apiClient.get('/portfolio/about');
    return response.data;
  },
  
  getPersonalInfo: async () => {
    const response = await apiClient.get('/portfolio/personal-info');
    return response.data;
  },
  
  getSocialLinks: async () => {
    const response = await apiClient.get('/portfolio/social-links');
    return response.data;
  },
  
  getGallery: async () => {
    const response = await apiClient.get('/portfolio/gallery');
    return response.data;
  }
};

// Chat API
export const chatApi = {
  sendMessage: async (message, sessionId = null) => {
    const response = await apiClient.post('/chat', {
      message,
      session_id: sessionId
    });
    return response.data;
  },
  
  getChatHistory: async (sessionId) => {
    const response = await apiClient.get(`/chat/sessions/${sessionId}`);
    return response.data;
  },
  
  clearChatSession: async (sessionId) => {
    const response = await apiClient.delete(`/chat/sessions/${sessionId}`);
    return response.data;
  }
};

// Files API
export const filesApi = {
  downloadResume: async () => {
    const response = await apiClient.get('/files/resume/download', {
      responseType: 'blob'
    });
    return response;
  },
  
  getAsset: async (filename) => {
    const response = await apiClient.get(`/files/assets/${filename}`, {
      responseType: 'blob'
    });
    return response;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'unhealthy', error: error.message };
  }
};

export default apiClient;