import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp } from 'lucide-react';
import { apiService } from '../services/api';

const LearningInterests = ({ refreshInterval = 5000 }) => {
  const [interests, setInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getLearningInterests();
        setInterests(data.slice(0, 5)); // Top 5
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch learning interests:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  if (isLoading) {
    return (
      <div className="chart-card" style={{ padding: '2rem', textAlign: 'center' }}>
        Loading emerging trends...
      </div>
    );
  }

  return (
    <div style={{ padding: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <Target size={20} color="var(--accent)" />
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Emerging Trends</h3>
        <span style={{ fontSize: '0.75rem', opacity: 0.7, color: 'var(--text-secondary)' }}>(Top 5)</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {interests.map((interest, index) => {
          const maxCount = Math.max(...interests.map(i => i.count));
          const percentage = (interest.count / maxCount) * 100;

          return (
            <motion.div
              key={interest.domain}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
                style={{
                  padding: '1rem',
                  background: 'rgba(79, 195, 247, 0.1)',
                  borderRadius: '12px',
                  borderLeft: '4px solid var(--accent)',
                }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    background: 'var(--accent)', 
                    color: '#fff', 
                    borderRadius: '50%', 
                    width: '24px', 
                    height: '24px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </span>
                  <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{interest.domain}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                  <TrendingUp size={18} />
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{interest.count}</span>
                  <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>people</span>
                </div>
              </div>
              <div style={{
                height: '8px',
                background: 'var(--bg-primary)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningInterests;

