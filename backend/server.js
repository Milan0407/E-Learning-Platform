// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables from .env file
dotenv.config();

const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error('Missing required environment variables:', missingEnv.join(', '));
  process.exit(1);
}

// --- ROUTE IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const debugRoutes = require('./routes/debugRoutes');

// Initialize Express app
const app = express();

const allowedOrigins = [
  'https://e-learning-platform-gules.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim()) : [])
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow any Vercel preview URL for this project.
    const isVercelPreview = /^https:\/\/e-learning-platform-.*\.vercel\.app$/.test(origin);
    if (isVercelPreview) {
      return callback(null, true);
    }

    console.log('Blocked by CORS:', origin);
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true
};

// --- UPDATED CORS CONFIGURATION ---
if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
} else {
  // Development: allow all origins to make local dev easier
  app.use(cors());
}

// Increase the limit for JSON requests and form data to handle large video uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Simple request logger for debugging (prints method, URL and body)
app.use((req, res, next) => {
  try {
    console.log(`--> ${req.method} ${req.originalUrl}`);
    if (req.method !== 'GET') {
      // Be careful logging sensitive data like passwords in production
      // console.log('    body:', JSON.stringify(req.body)); 
    }
  } catch (e) {
    // ignore logging errors
  }
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Unable to connect to MongoDB. Shutting down.');
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Mount debug routes only in development
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/_debug', debugRoutes);
}

// Health endpoint for quick checks
app.get('/api/_health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
