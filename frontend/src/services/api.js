/**
 * API Service for Tech Pulse
 * Handles all API calls to the backend
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health check
  async healthCheck() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // Get total response count
  async getCount() {
    try {
      const response = await api.get('/count');
      return response.data;
    } catch (error) {
      console.error('Failed to get count:', error);
      throw error;
    }
  },

  // Get all dashboard data
  async getDashboardData() {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Failed to get dashboard data:', error);
      throw error;
    }
  },

  // Get tech usage
  async getTechUsage() {
    try {
      const response = await api.get('/tech-usage');
      return response.data;
    } catch (error) {
      console.error('Failed to get tech usage:', error);
      throw error;
    }
  },

  // Get learning interests
  async getLearningInterests() {
    try {
      const response = await api.get('/learning-interests');
      return response.data;
    } catch (error) {
      console.error('Failed to get learning interests:', error);
      throw error;
    }
  },

  // Get AI usage stats
  async getAIUsage() {
    try {
      const response = await api.get('/ai-usage');
      return response.data;
    } catch (error) {
      console.error('Failed to get AI usage:', error);
      throw error;
    }
  },

  // Get location data
  async getLocations() {
    try {
      const response = await api.get('/locations');
      return response.data;
    } catch (error) {
      console.error('Failed to get locations:', error);
      throw error;
    }
  },

  // Get ML predictions
  async getMLPredictions() {
    try {
      const response = await api.get('/ml/predictions');
      return response.data;
    } catch (error) {
      console.error('Failed to get ML predictions:', error);
      throw error;
    }
  },

  // Get Tutorials insights (optionally for one framework)
  async getTutorialInsights(framework) {
    try {
      const params = framework ? { framework } : undefined;
      const response = await api.get('/tutorials/insights', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to get tutorials insights:', error);
      throw error;
    }
  },

  // Get global ranking
  async getRanking() {
    try {
      const response = await api.get('/ranking');
      return response.data;
    } catch (error) {
      console.error('Failed to get ranking:', error);
      throw error;
    }
  },

  // Update a user's progress score used for ranking
  async setUserScore(userId, score) {
    try {
      const response = await api.post('/ranking/score', { userId, score });
      return response.data;
    } catch (error) {
      console.error('Failed to set user score:', error);
      throw error;
    }
  },

  // Get a user's profile by email or name
  async getUserProfile({ email, name }) {
    try {
      const params = email ? { email } : { name };
      const response = await api.get('/profile', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error;
    }
  },

  // Update a user's profile row
  async updateUserProfile({ identifier, updates }) {
    try {
      const response = await api.post('/profile', { identifier, updates });
      return response.data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  },
};

export default apiService;

