// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables from .env file
dotenv.config();

// --- CORRECT ROUTE IMPORTS ---
// Make sure these paths point to the 'routes' directory
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const debugRoutes = require('./routes/debugRoutes');

// Initialize Express app
const app = express();

// CORS Configuration: allow dev origins or configurable production origins
if (process.env.NODE_ENV === 'production') {
  // Read allowed origins from env var (comma-separated). Example:
  // CORS_ALLOWED_ORIGINS=https://app.vercel.app,https://admin.example.com
  const corsEnv = process.env.CORS_ALLOWED_ORIGINS || '';
  const allowedOrigins = corsEnv
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Fallback to the original default if none provided
  if (allowedOrigins.length === 0) {
    allowedOrigins.push('https://coer-hacathon.onrender.com');
  }

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, server-to-server, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
      }
      return callback(null, true);
    }
  }));
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
      console.log('    body:', JSON.stringify(req.body));
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
    console.warn('Continuing without database connection for development purposes.');
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

