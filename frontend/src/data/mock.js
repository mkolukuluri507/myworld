// Mock data for the portfolio - will be replaced with backend integration

export const personalInfo = {
  name: "Mourya Varma",
  title: "Software Engineer & Aspiring Data Engineer",
  email: "varmamourya3@gmail.com",
  location: "India",
  experience: "3+ years",
  resumeUrl: "/resume-mourya-varma.pdf" // Will be served from backend
};

export const aboutData = {
  introduction: "Passionate Software Engineer with 3+ years of experience in building scalable backend systems and intuitive frontend applications. Currently expanding expertise into Data Engineering and Generative AI to create intelligent, data-driven solutions.",
  experience: "Specialized in WMS (Warehouse Management Systems), REST API development, and real-time data processing with technologies like Java, Spring Boot, Angular, and Kafka.",
  currentLearning: "Currently learning tools like Apache Spark, Hadoop, Apache Airflow, Kafka, and cloud platforms (GCP, Azure) to transition into Data Engineering and explore Generative & Agentic AI applications.",
  interests: ["Data Engineering", "Generative AI", "Distributed Systems", "Cloud Architecture", "Real-time Processing"]
};

export const techStack = {
  backend: [
    { name: "Java", level: "Expert", icon: "☕" },
    { name: "Spring Boot", level: "Expert", icon: "🍃" },
    { name: "REST APIs", level: "Expert", icon: "🔗" },
    { name: "Kafka", level: "Intermediate", icon: "📡" }
  ],
  frontend: [
    { name: "Angular", level: "Advanced", icon: "🅰️" },
    { name: "JavaScript", level: "Advanced", icon: "🟨" },
    { name: "TypeScript", level: "Advanced", icon: "🔷" },
    { name: "HTML/CSS", level: "Advanced", icon: "🎨" }
  ],
  dataTools: [
    { name: "Apache Spark", level: "Learning", icon: "⚡" },
    { name: "Hadoop", level: "Learning", icon: "🐘" },
    { name: "Apache Airflow", level: "Learning", icon: "🌊" },
    { name: "SQL", level: "Intermediate", icon: "🗃️" }
  ],
  cloud: [
    { name: "Google Cloud", level: "Learning", icon: "☁️" },
    { name: "Azure", level: "Learning", icon: "🔵" },
    { name: "AWS", level: "Basic", icon: "🟠" }
  ],
  ai: [
    { name: "Generative AI", level: "Learning", icon: "🤖" },
    { name: "Agentic AI", level: "Learning", icon: "🧠" },
    { name: "Machine Learning", level: "Learning", icon: "📊" }
  ]
};

export const projects = [
  {
    id: 1,
    title: "Extensibility REST API",
    description: "Built a scalable REST API framework that allows dynamic extension of WMS functionalities. Implemented custom middleware for request processing and response transformation.",
    technologies: ["Java", "Spring Boot", "REST", "PostgreSQL"],
    challenges: "Designed flexible architecture to support multiple client configurations without code changes",
    status: "Completed",
    type: "Backend Development"
  },
  {
    id: 2,
    title: "Kafka POC Implementation",
    description: "Developed a proof-of-concept for real-time data streaming using Apache Kafka. Implemented producers and consumers for order processing workflows.",
    technologies: ["Kafka", "Java", "Spring Boot", "Event Streaming"],
    challenges: "Handled message ordering, fault tolerance, and exactly-once processing guarantees",
    status: "Completed",
    type: "Data Streaming"
  },
  {
    id: 3,
    title: "Saved Views UI Enhancement",
    description: "Enhanced user interface for saving and managing custom data views. Improved user experience with drag-and-drop functionality and real-time filters.",
    technologies: ["Angular", "TypeScript", "RxJS", "CSS3"],
    challenges: "Optimized performance for large datasets and complex filtering operations",
    status: "Completed",
    type: "Frontend Development"
  },
  {
    id: 4,
    title: "Spark Data Pipeline (Upcoming)",
    description: "Planning to build a comprehensive data pipeline using Apache Spark for processing large-scale warehouse data and generating business insights.",
    technologies: ["Apache Spark", "Python", "Hadoop", "Airflow"],
    challenges: "Learning distributed computing concepts and optimizing data processing workflows",
    status: "Planned",
    type: "Data Engineering"
  }
];

export const certifications = [
  {
    id: 1,
    name: "Programming in Java",
    issuer: "NPTEL",
    year: "2023",
    category: "Programming",
    verified: true
  },
  {
    id: 2,
    name: "Programming in Python", 
    issuer: "NPTEL",
    year: "2023",
    category: "Programming",
    verified: true
  },
  {
    id: 3,
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2022",
    category: "Cloud",
    verified: true
  },
  {
    id: 4,
    name: "Apache Spark Certification",
    issuer: "Databricks",
    year: "2024",
    category: "Data Engineering",
    verified: false,
    status: "In Progress"
  }
];

export const galleryImages = [
  {
    id: 1,
    url: "https://customer-assets.emergentagent.com/job_767b250e-b13c-4dc8-afa9-46ee1fa9ad2c/artifacts/kx2shqz8_WhatsApp%20Image%202025-07-27%20at%2022.18.56.jpeg",
    caption: "Casual outdoor moment",
    category: "lifestyle"
  },
  {
    id: 2,
    url: "https://customer-assets.emergentagent.com/job_767b250e-b13c-4dc8-afa9-46ee1fa9ad2c/artifacts/mt7myirw_WhatsApp%20Image%202025-07-27%20at%2022.18.57.jpeg",
    caption: "Green spaces and growth mindset",
    category: "personal"
  }
];

export const socialLinks = {
  github: "https://github.com/mouryavarma",
  linkedin: "https://linkedin.com/in/mourya-varma",
  email: "varmamourya3@gmail.com"
};

export const blogPosts = [
  {
    id: 1,
    title: "How I built my first Kafka pipeline",
    excerpt: "Journey from understanding Kafka concepts to implementing a production-ready streaming solution",
    readTime: "8 min read",
    category: "Data Engineering",
    status: "draft"
  },
  {
    id: 2,
    title: "From Java Dev to Data Engineer: My Learning Path",
    excerpt: "Transition strategies, resources, and lessons learned while expanding into data engineering",
    readTime: "12 min read",
    category: "Career",
    status: "draft"
  },
  {
    id: 3,
    title: "Agentic AI & Me: Exploring Intelligent Automation",
    excerpt: "Experimenting with AI agents and their potential in software development workflows",
    readTime: "10 min read",
    category: "AI/ML",
    status: "draft"
  }
];