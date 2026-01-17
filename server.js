import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);   // 🔹 CURRENT FILE PATH
const __dirname = path.dirname(__filename);
app.use(
  "/images",                                         // 🔹 URL PATH (used in browser)
  express.static(
    path.join(__dirname, "public/images")            // 🔹 ACTUAL FOLDER PATH
  )
);
// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
    name: "Maloji Vijay Ghorpade",
    title: "B.E. Computer Engineering Student | Data Science & AI Enthusiast",
    bio: "Motivated B.E. Computer Engineering student skilled in Python, SQL, Data Analysis, and Machine Learning. Passionate about building intelligent, AI-driven systems and modern web applications.",
    phone: "+91-9850841185",
    email: "malojighorpade07@gmail.com",
    education: {
      degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
      college: "Jaywantrao Sawant College of Engineering (JSCOE), Hadapsar, Pune",
      university: "Savitribai Phule Pune University (SPPU)",
      cgpa: {
        sem1: "8.41",
        sem2: "8.95",
        sem3: "8.41",
        sem4: "8.77"
      },
      period: "2023 – Present (Expected 2027)"
    },
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 80 },
      { name: "JavaScript", level: 75 },
      { name: "React.js", level: 70 },
      { name: "Data Science", level: 85 },
      { name: "Machine Learning", level: 80 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "Scikit-learn", level: 80 },
      { name: "Power BI", level: 85 },
      { name: "Flask", level: 75 }
    ],
    projects: [
      {
        id: 1,
        title: "Video Content Search Application (RAG-based Model)",
        description: "Built a video content search app with semantic search and AI-generated responses. Implemented RAG pipeline with embeddings and LLMs for context-aware answers. Frontend developed with Streamlit and optimized metadata-based retrieval.",
        technologies: ["Retrieval-Augmented Generation", "Streamlit", "NLP", "LLMs"],
        image: "http://localhost:5000/images/Agriculture.png",
        link: "#",
        github: "#",
        type: "Major Project",
        period: "Jan 2025 – Sep 2025"
      },
      {
        id: 2,
        title: "VidSnapAI - AI Powered TikTok/REEL Generator",
        description: "Developed an AI-based system that converts text into speech using ElevenLabs API and generates short videos by combining images and audio using FFmpeg. Built the web application using Flask, Jinja templates, and CSS.",
        technologies: ["Flask", "ElevenLabs API", "FFmpeg", "Python", "Jinja Templates"],
        image: "https://via.placeholder.com/400x250?text=VidSnapAI+AI+Generator",
        link: "#",
        github: "#",
        type: "Project"
      },
      {
        id: 3,
        title: "Agriculture Data Dashboard – Power BI",
        description: "Designed a Power BI dashboard analyzing crop data; focused on visualization and insights for VOIS.",
        technologies: ["Power BI", "Data Visualization", "Data Analysis"],
        image: "http://localhost:5000/images/Agriculuredasbored.jpeg",
        link: "#",
        github: "#",
        type: "Mini Project"
      },
      {
        id: 4,
        title: "Image Recognition AI",
        description: "Built an image recognition model using deep learning; learned computer vision and neural networks as part of DevTown Bootcamp.",
        technologies: ["Deep Learning", "Computer Vision", "Neural Networks"],
        image: "https://via.placeholder.com/400x250?text=Image+Recognition+AI",
        link: "#",
        github: "#",
        type: "Mini Project"
      },
      {
        id: 5,
        title: "Laptop Price Prediction",
        description: "Regression model predicting laptop prices using Scikit-learn and machine learning algorithms.",
        technologies: ["Python", "Scikit-learn", "Regression", "Machine Learning"],
        image: "http://localhost:5000/images/laptopprice.jpeg",
        link: "#",
        github: "#",
        type: "Mini Project"
      },
      {
        id: 6,
        title: "Movie Recommendation System",
        description: "Content-based recommender system using cosine similarity for movie recommendations.",
        technologies: ["Python", "Cosine Similarity", "Recommendation Systems"],
        image: "http://localhost:5000/images/MovieRecomdetionjpeg.jpeg",
        link: "#",
        github: "#",
        type: "Mini Project"
      },
      {
        id: 7,
        title: "MGFOOD – E-commerce App (Flutter)",
        description: "Flutter app for selling organic vegetables and desi ghee under 'MG Productions' brand.",
        technologies: ["Flutter", "Mobile Development", "E-commerce"],
        image: "http://localhost:5000/images/fluuterecommmerece.jpeg",
        link: "#",
        github: "#",
        type: "Mini Project"
      }
    ],
    certifications: [
      "Oracle OCI - Data Science Professional",
      "Ultimate Data Science – CodeWithHarry",
      "Learn Python from scratch – CodeWithHarry",
      "AI Internship – Adverk Technology (1 Month)",
      "Image Recognition Project Completion – DevTown",
      "Data Visualization: Empowering Business with Effective Insights – TATA Forage Virtual Experience"
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/maloji-ghorpade-9ba716308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/malojighorpade",
      email: "malojighorpade07@gmail.com"
    }
  };

  res.json(portfolioData);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  // In a real application, you would send an email here using nodemailer
  // For now, we'll just log the data and return success
  console.log('Contact Form Submission:', {
    name,
    email,
    subject: subject || 'No subject',
    message,
    timestamp: new Date().toISOString()
  });

  // Simulate async operation
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
  }, 500);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
