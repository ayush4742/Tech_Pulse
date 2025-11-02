/**
 * API Routes for Tech Pulse Dashboard
 */

const express = require('express');
const router = express.Router();
const sheetsService = require('../services/sheetsService');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tech Pulse API is running' });
});

// Get total response count
router.get('/count', async (req, res) => {
  try {
    const count = await sheetsService.getTotalCount();
    res.json({ count, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error getting count:', error);
    res.status(500).json({ error: 'Failed to fetch count' });
  }
});

// Get all aggregated data
router.get('/dashboard', async (req, res) => {
  try {
    const data = await sheetsService.getAllAggregatedData();
    res.json(data);
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data', details: error.message });
  }
});

// Get tech usage stats
router.get('/tech-usage', async (req, res) => {
  try {
    const techUsage = await sheetsService.getTechUsage();
    res.json(techUsage);
  } catch (error) {
    console.error('Error getting tech usage:', error);
    res.status(500).json({ error: 'Failed to fetch tech usage' });
  }
});

// Get learning interests
router.get('/learning-interests', async (req, res) => {
  try {
    const interests = await sheetsService.getLearningInterests();
    res.json(interests);
  } catch (error) {
    console.error('Error getting learning interests:', error);
    res.status(500).json({ error: 'Failed to fetch learning interests' });
  }
});

// Get AI usage stats
router.get('/ai-usage', async (req, res) => {
  try {
    const aiStats = await sheetsService.getAIUsageStats();
    res.json(aiStats);
  } catch (error) {
    console.error('Error getting AI stats:', error);
    res.status(500).json({ error: 'Failed to fetch AI stats' });
  }
});

// Get location data
router.get('/locations', async (req, res) => {
  try {
    const locations = await sheetsService.getLocationData();
    res.json(locations);
  } catch (error) {
    console.error('Error getting locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

module.exports = router;

