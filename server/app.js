import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import skillRoutes from './src/routes/skillRoutes.js';
import aboutRoutes from './src/routes/aboutRoutes.js';
import experienceRoutes from './src/routes/experienceRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';

import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js';

const app = express();

// Security & Optimization Middlewares
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : '*',
  credentials: true
}));
app.use(express.json());

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/messages', messageRoutes);

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
