import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- PATH CONFIG ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- CORS CONFIG ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://maloji-portfolio-frontend.vercel.app"
  "https://maloji-portfolio-backend.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true
  })
);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- STATIC IMAGES ---------------- */
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"))
);

/* ---------------- API ROUTES ---------------- */

// Portfolio API
app.get("/api/portfolio", (req, res) => {
  res.json({
    name: "Maloji Vijay Ghorpade",
    title: "B.E. Computer Engineering Student | Data Science & AI Enthusiast",
    bio: "Motivated Computer Engineering student skilled in Data Science, AI, and Web Development.",
    phone: "+91-9850841185",
    email: "malojighorpade07@gmail.com",

    education: {
      degree: "B.E. Computer Engineering",
      college: "Jaywantrao Sawant College of Engineering, Pune",
      university: "SPPU",
      cgpa: {
        sem1: "8.41",
        sem2: "8.95",
        sem3: "8.41",
        sem4: "8.77"
      },
      period: "2023 – 2027"
    },

    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 80 },
      { name: "JavaScript", level: 75 },
      { name: "React", level: 70 },
      { name: "Machine Learning", level: 80 }
    ],

    projects: [
      {
        id: 1,
        title: "RAG Based Video Search App",
        type: "Major Project",
        image: "https://maloji-portfolio-backend.onrender.com/images/Agriculture.png"
      },
      {
        id: 2,
        title: "Agriculture Dashboard (Power BI)",
        type: "Mini Project",
        image: "https://maloji-portfolio-backend.onrender.com/images/Agriculuredasbored.jpeg"
      },
      {
        id: 3,
        title: "Laptop Price Prediction",
        type: "Mini Project",
        image: "https://maloji-portfolio-backend.onrender.com/images/laptopprice.jpeg"
      }
    ],

    socialLinks: {
      linkedin: "https://www.linkedin.com/in/maloji-ghorpade-9ba716308",
      github: "https://github.com/malojighorpade",
      email: "malojighorpade07@gmail.com"
    }
  });
});

// Contact API
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email"
    });
  }

  console.log("Contact Form:", { name, email, subject, message });

  res.json({
    success: true,
    message: "Message sent successfully"
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
