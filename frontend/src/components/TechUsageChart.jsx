import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Code } from 'lucide-react';
import { apiService } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TechUsageChart = ({ refreshInterval = 5000 }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('bar'); // 'bar' or 'doughnut'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const techUsage = await apiService.getTechUsage();
        setData(techUsage.slice(0, 15)); // Top 15
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch tech usage:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const chartData = {
    labels: data.map(item => item.tech.length > 20 ? item.tech.substring(0, 20) + '...' : item.tech),
    datasets: [
      {
        label: 'Usage Count',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(79, 195, 247, 0.8)',
          'rgba(129, 212, 250, 0.8)',
          'rgba(41, 182, 246, 0.8)',
          'rgba(3, 169, 244, 0.8)',
          'rgba(2, 136, 209, 0.8)',
          'rgba(25, 118, 210, 0.8)',
          'rgba(13, 71, 161, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(79, 195, 247, 1)',
          'rgba(129, 212, 250, 1)',
          'rgba(41, 182, 246, 1)',
          'rgba(3, 169, 244, 1)',
          'rgba(2, 136, 209, 1)',
          'rgba(25, 118, 210, 1)',
          'rgba(13, 71, 161, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: viewMode === 'doughnut',
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 95, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: '#3d5a7f',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: viewMode === 'bar' ? {
      x: {
        ticks: {
          color: '#e0e0e0',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(61, 90, 127, 0.3)',
        },
      },
      y: {
        ticks: {
          color: '#e0e0e0',
        },
        grid: {
          color: 'rgba(61, 90, 127, 0.3)',
        },
      },
    } : {},
  };

  if (isLoading) {
    return (
      <div className="chart-card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading tech usage data...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Code size={20} color="var(--accent)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>Live Tech Popularity</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setViewMode('bar')}
            style={{
              padding: '0.5rem 1rem',
              background: viewMode === 'bar' ? 'var(--accent)' : 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Bar
          </button>
          <button
            onClick={() => setViewMode('doughnut')}
            style={{
              padding: '0.5rem 1rem',
              background: viewMode === 'doughnut' ? 'var(--accent)' : 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Pie
          </button>
        </div>
      </div>

      <div style={{ height: '300px' }}>
        {viewMode === 'bar' ? (
          <Bar data={chartData} options={options} />
        ) : (
          <Doughnut data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default TechUsageChart;

