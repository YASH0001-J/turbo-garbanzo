import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import apiRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS: allow local dev and the deployed frontend (set FRONTEND_URL in env to override)
const allowedOrigins = [process.env.FRONTEND_URL, 'https://turbo-garbanzo-sigma.vercel.app'].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser clients like curl/postman
    if (allowedOrigins.includes(origin) || /^http:\/\/localhost:\d{4}$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: origin not allowed'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'ZYM Dashboard Backend is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start Server (attempt DB connection but don't crash if unavailable)
const startServer = async () => {
  try {
    const dbOk = await connectDB();
    if (dbOk) {
      app.locals.dbConnected = true;
      console.log('✅ Database connected');
    } else {
      app.locals.dbConnected = false;
      console.warn('⚠️ Database unavailable — continuing without DB.');
    }
  } catch (err) {
    // Unexpected error while attempting to check DB — do not crash the server.
    app.locals.dbConnected = false;
    console.warn('⚠️ Unexpected error when checking DB — continuing without DB.');
    console.warn(err && err.message ? err.message : err);
  }

  const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 API health: http://localhost:${PORT}/api/health`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      console.error('   Another backend is already running. Options:');
      console.error('   1. Use that terminal (backend is already up), or');
      console.error('   2. Stop the old process, then run npm run dev again.');
      console.error(`   PowerShell: Get-NetTCPConnection -LocalPort ${PORT} | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }`);
      // Do NOT exit the process; allow the environment (e.g. Render) to manage restarts.
      // If the port is in use the server could not start listening — this is informational.
      return;
    }
    throw err;
  });
};

startServer();
