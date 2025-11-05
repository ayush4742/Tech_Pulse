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

// Tutorials insights
router.get('/tutorials/insights', async (req, res) => {
  try {
    const framework = (req.query.framework || '').trim();
    const data = await sheetsService.getTutorialInsights(framework || null);
    res.json(data);
  } catch (error) {
    console.error('Error getting tutorials insights:', error);
    res.status(500).json({ error: 'Failed to fetch tutorials insights' });
  }
});

// Get global ranking
router.get('/ranking', async (req, res) => {
  try {
    const ranking = await sheetsService.getRanking();
    res.json(ranking);
  } catch (error) {
    console.error('Error getting ranking:', error);
    res.status(500).json({ error: 'Failed to fetch ranking' });
  }
});

// Update a user's progress score (0-100) used for ranking
router.post('/ranking/score', async (req, res) => {
  try {
    const { userId, score } = req.body || {};
    const result = sheetsService.setUserScore(userId, Number(score));
    if (!result) return res.status(400).json({ error: 'userId and numeric score are required' });
    res.json({ ok: true, ...result });
  } catch (error) {
    console.error('Error setting user score:', error);
    res.status(500).json({ error: 'Failed to set user score' });
  }
});

// (Optional) Get all user scores (for debugging/admin)
router.get('/ranking/scores', (req, res) => {
  try {
    res.json(sheetsService.getUserScores());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

// Get a user's profile (by email or name)
router.get('/profile', async (req, res) => {
  try {
    const { email, name } = req.query || {};
    if (!email && !name) return res.status(400).json({ error: 'email or name is required' });
    const profile = await sheetsService.getUserProfile({ email, name });
    if (!profile) return res.status(404).json({ error: 'User not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update a user's profile
router.post('/profile', async (req, res) => {
  try {
    const { identifier, updates } = req.body || {};
    if (!identifier || !updates) return res.status(400).json({ error: 'identifier and updates are required' });
    const result = await sheetsService.updateUserProfile({ identifier, updates });
    res.json(result);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;

