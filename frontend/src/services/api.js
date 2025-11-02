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
};

export default apiService;

