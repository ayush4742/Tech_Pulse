/**
 * Tech Pulse Backend Server
 * Real-time API for Tech Pulse Dashboard
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const mlRoutes = require('./routes/ml');
const sheetsService = require('./services/sheetsService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.use('/api/ml', mlRoutes);

// Initialize Google Sheets service
let serverReady = false;

async function startServer() {
  try {
    console.log('🚀 Starting Tech Pulse Backend...');
    console.log('📊 Initializing Google Sheets connection...');
    
    await sheetsService.initialize();
    serverReady = true;
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`\n📋 Available endpoints:`);
      console.log(`   GET /api/health - Health check`);
      console.log(`   GET /api/count - Total response count`);
      console.log(`   GET /api/dashboard - All aggregated data`);
      console.log(`   GET /api/tech-usage - Technology usage stats`);
      console.log(`   GET /api/learning-interests - Learning interests`);
      console.log(`   GET /api/ai-usage - AI usage statistics`);
      console.log(`   GET /api/locations - Location data`);
      console.log(`   GET /api/ml/predictions - ML predictions`);
      console.log(`\n💡 Make sure your .env file is configured with Google Sheets credentials!`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Check your .env file exists and has correct values');
    console.error('   2. Verify Google Sheets API is enabled in Google Cloud Console');
    console.error('   3. Ensure service account has access to your Google Sheet');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Shutting down server...');
  process.exit(0);
});

startServer();

