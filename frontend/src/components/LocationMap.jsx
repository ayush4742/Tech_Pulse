import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { apiService } from '../services/api';

const LocationMap = ({ refreshInterval = 5000 }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getLocations();
        setLocations(data.slice(0, 15)); // Top 15
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
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
        Loading location data...
      </div>
    );
  }

  const maxCount = Math.max(...locations.map(l => l.count), 1);

  return (
    <div style={{ padding: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <MapPin size={20} color="var(--accent)" />
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Geo Distribution</h3>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '1rem',
        maxHeight: '400px',
        overflowY: 'auto',
      }}>
        {locations.map((location, index) => {
          const intensity = (location.count / maxCount) * 100;

          return (
            <motion.div
              key={location.location}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              style={{
                padding: '1rem',
                background: `rgba(79, 195, 247, ${Math.max(0.2, intensity / 100)})`,
                borderRadius: '12px',
                borderLeft: '4px solid var(--accent)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                {location.location.length > 25 ? location.location.substring(0, 25) + '...' : location.location}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{location.count}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>responses</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationMap;

