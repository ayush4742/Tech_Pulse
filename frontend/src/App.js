import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import RealTimeCounter from './components/RealTimeCounter';
import TechUsageChart from './components/TechUsageChart';
import LearningInterests from './components/LearningInterests';
import AIUsageChart from './components/AIUsageChart';
import LocationMap from './components/LocationMap';
import MLPredictions from './components/MLPredictions';
import { apiService } from './services/api';
import './App.css';

function App() {
  useEffect(() => {
    // Check API connection (for future use)
    const checkHealth = async () => {
      try {
        await apiService.healthCheck();
      } catch (error) {
        console.error('API health check failed:', error);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 10000); // Check every 10s

    return () => clearInterval(interval);
  }, []);

  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await apiService.getCount();
        if (mounted) setTotalCount(res.count);
      } catch (err) {
        // ignore
      }
    };
    fetch();
    const iv = setInterval(fetch, 5000);
    return () => { mounted = false; clearInterval(iv); };
  }, []);

  return (
    <div className="App">
      <Navigation />
      
      <section id="home">
        <HeroSection />
      </section>

      <main className="app-main" id="dashboard">
        <div className="container">
          <motion.div
            className="dashboard-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Row 1: Dashboard Card and Tutorials */}
            <div className="dashboard-card dashboard-welcome card-large">
              <div className="card-header">
                <h3><span className="heading-icon">📊</span> Dashboard</h3>
                <div className="card-icon">👤</div>
              </div>
              <div className="card-content">
                <h4>Your Dashboard</h4>
                <p>Hi, <strong>Nishant</strong> 👋 Ready to explore today's tech insights?</p>
                <div style={{ marginTop: '1rem' }}>
                  <div className="stat-number">{totalCount !== null ? totalCount.toLocaleString() : '...'}</div>
                  <div className="stat-sub">Total Responses (live)</div>
                </div>
                <motion.button
                  className="card-button primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} />
                  Explore Data
                </motion.button>
              </div>
            </div>

            <div className="dashboard-card tutorials-card card-small">
              <div className="card-header">
                <h3><span className="heading-icon">📚</span> Tutorials</h3>
              </div>
              <div className="card-content">
                <h4>Backend</h4>
                <p>Overview of backend development concepts and best practices</p>
                <motion.button
                  className="card-button secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW
                </motion.button>
              </div>
            </div>

            {/* Row 2: Global Ranking and Learning Plan */}
            <div className="dashboard-card ranking-card card-small">
              <div className="card-header">
                <h3><span className="heading-icon">🏆</span> Global Ranking</h3>
              </div>
              <div className="card-content">
                <div className="ranking-item">
                  <div className="ranking-profile">
                    <div className="profile-icon">👤</div>
                    <span>Top Contributors</span>
                  </div>
                  <div className="ranking-list">
                    <div className="rank-entry">
                      <span>Your Profile</span>
                      <span className="rank-number">#1</span>
                    </div>
                    <div className="rank-entry">
                      <span>Example College</span>
                      <span className="rank-number">#2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card learning-card card-medium">
              <div className="card-header">
                <h3><span className="heading-icon">🎯</span> Learning & Future Plan</h3>
              </div>
              <div className="card-content">
                <div className="learning-items">
                  <div className="learning-item">
                    <h4>Frontend</h4>
                    <p>Upcoming skill in high demand</p>
                  </div>
                  <div className="learning-item">
                    <h4>AI/ML</h4>
                    <p>Emerging technology</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Charts and Analytics */}
            <div className="dashboard-card full-width card-large">
              <div className="card-header">
                <h3><span className="heading-icon">📡</span> Live Tech Trends</h3>
              </div>
              <div className="card-content">
                <RealTimeCounter refreshInterval={5000} />
              </div>
            </div>

            <div className="dashboard-card card-medium">
              <div className="chart-container">
                <TechUsageChart refreshInterval={5000} />
              </div>
            </div>

            <div className="dashboard-card card-medium">
              <div className="chart-container">
                <LearningInterests refreshInterval={5000} />
              </div>
            </div>

            <div className="dashboard-card full-width card-large">
              <div className="chart-container">
                <AIUsageChart refreshInterval={5000} />
              </div>
            </div>

            <div className="dashboard-card full-width card-medium">
              <MLPredictions refreshInterval={30000} />
            </div>

            <div className="dashboard-card full-width card-medium">
              <LocationMap refreshInterval={5000} />
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ for TechPulse | Real-time analytics from live survey responses</p>
      </footer>
    </div>
  );
}

export default App;

