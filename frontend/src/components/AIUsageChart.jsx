import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Sparkles, TrendingUp } from 'lucide-react';
import { apiService } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AIUsageChart = ({ refreshInterval = 5000 }) => {
  const [aiStats, setAIStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getAIUsage();
        setAIStats(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch AI usage:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const total = Object.values(aiStats).reduce((sum, val) => sum + val, 0) || 1;

  const chartData = {
    labels: ['Never', 'Weekly', 'Daily', 'Multiple Times/Day'],
    datasets: [
      {
        label: 'Users',
        data: [
          aiStats.never || 0,
          aiStats.weekly || 0,
          aiStats.daily || 0,
          aiStats.multiple || 0,
        ],
        borderColor: 'rgba(79, 195, 247, 1)',
        backgroundColor: 'rgba(79, 195, 247, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(79, 195, 247, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 95, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: '#3d5a7f',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} users (${percentage}%)`;
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#e0e0e0',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(61, 90, 127, 0.3)',
        },
      },
      y: {
        ticks: {
          color: '#e0e0e0',
          stepSize: 1,
        },
        grid: {
          color: 'rgba(61, 90, 127, 0.3)',
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="chart-card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading AI usage data...
      </div>
    );
  }

  const activeUsers = (aiStats.daily || 0) + (aiStats.multiple || 0);
  const activePercentage = total > 0 ? ((activeUsers / total) * 100).toFixed(1) : 0;

  return (
    <div style={{ padding: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <Sparkles size={20} color="var(--accent)" />
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>AI Usage Tracker</h3>
      </div>

      <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(79, 195, 247, 0.15)', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
          <TrendingUp size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
            <strong>{activeUsers}</strong> users ({activePercentage}%) use AI tools daily or multiple times per day
          </span>
        </div>
      </div>

      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AIUsageChart;

