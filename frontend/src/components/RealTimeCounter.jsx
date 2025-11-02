import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp } from 'lucide-react';
import { apiService } from '../services/api';

const RealTimeCounter = ({ refreshInterval = 5000 }) => {
  const [count, setCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const countRef = useRef(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data = await apiService.getCount();
        setPreviousCount(countRef.current);
        setCount(data.count);
        countRef.current = data.count;
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch count');
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchCount();

    // Set up polling
    const interval = setInterval(fetchCount, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const hasIncreased = count > previousCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="real-time-counter"
      style={{
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Users size={28} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Total Responses</h2>
      </div>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: '3rem', fontWeight: 'bold' }}
          >
            ...
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#ef4444' }}
          >
            {error}
          </motion.div>
        ) : (
          <motion.div
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: hasIncreased ? [1, 1.2, 1] : 1, 
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            {count.toLocaleString()}
            {hasIncreased && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ color: '#10b981' }}
              >
                <TrendingUp size={32} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Live data updates every {refreshInterval / 1000}s
      </p>
    </motion.div>
  );
};

export default RealTimeCounter;

