import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const ProgressPage = () => {
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, goals: 0 });

  useEffect(() => {
    // Placeholder: replace with real API when available
    setStats({ completed: 12, inProgress: 5, goals: 20 });
  }, []);

  return (
    <section id="progress" style={{ padding: '4rem 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="dashboard-card full-width card-large"
        >
          <div className="card-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="heading-icon">📈</span>
              Progress
            </h3>
            <div className="card-icon"><TrendingUp size={18} /></div>
          </div>
          <div className="card-content" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div className="metric-card">
              <div className="metric-value">{stats.completed}</div>
              <div className="metric-label">Completed</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{stats.inProgress}</div>
              <div className="metric-label">In Progress</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{stats.goals}</div>
              <div className="metric-label">Goals</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgressPage;


