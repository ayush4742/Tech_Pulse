/**
 * ML Prediction API Routes
 */

const express = require('express');
const router = express.Router();
const sheetsService = require('../services/sheetsService');
const { spawn } = require('child_process');
const path = require('path');

// Simple in-memory prediction (can be replaced with actual ML model)
router.get('/predictions', async (req, res) => {
  try {
    const data = await sheetsService.getData();
    const techUsage = await sheetsService.getTechUsage();
    
    // Simple trend prediction based on growth rate
    const predictions = techUsage.slice(0, 10).map((tech, index) => {
      // Simulate growth prediction
      const growthRate = 1.05 + (Math.random() * 0.15); // 5-20% growth
      const predictedCount = Math.round(tech.count * growthRate);
      const growthPercent = Math.round((predictedCount - tech.count) / tech.count * 100);
      
      return {
        tech: tech.tech,
        currentCount: tech.count,
        predictedCount,
        growthPercent,
        trend: growthPercent > 10 ? 'high' : growthPercent > 5 ? 'medium' : 'low',
      };
    });

    res.json({
      predictions: predictions.slice(0, 5), // Top 5
      nextMonthForecast: {
        totalResponses: Math.round(data.length * 1.15),
        aiAdoptionGrowth: '25%',
        topTrendingDomain: predictions[0]?.tech || 'N/A',
      },
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error getting predictions:', error);
    res.status(500).json({ error: 'Failed to generate predictions' });
  }
});

module.exports = router;

