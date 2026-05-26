import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import apiRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || /^http:\/\/localhost:\d{4}$/,
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
    await connectDB();
    app.locals.dbConnected = true;
    console.log('✅ Database connected');
  } catch (err) {
    // Temporary: do not crash the server if DB is not available (e.g., XAMPP not running)
    app.locals.dbConnected = false;
    console.warn('⚠️ Database connection failed — continuing without DB.');
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
      process.exit(1);
    }
    throw err;
  });
};

startServer();
