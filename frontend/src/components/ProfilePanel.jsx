import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Trophy, X, BarChart3, Flame, ArrowLeft } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);

const dummy = {
  username: 'ayush_kumar4',
  fullName: 'Ayush Kumar',
  location: 'India',
  organization: 'Bangladesh Institute of Technology',
  rank: 378840,
  stats: {
    totalResponses: 339,
    badges: 3,
    streakDays: 50,
    topScore: 1469,
  },
  topTechs: ['React', 'Node.js', 'Python', 'MongoDB', 'Docker', 'Next.js'],
  recentActivity: [
    { title: 'Unique Paths', time: '17 hours ago' },
    { title: 'House Robber', time: '17 hours ago' },
    { title: 'Find Peak Element', time: '17 hours ago' },
    { title: 'Search in a Binary Search Tree', time: '17 hours ago' },
  ],
  // mock of sheet aggregations
  techUsage: [
    { tech: 'React', count: 12 },
    { tech: 'Node.js', count: 9 },
    { tech: 'Python', count: 15 },
    { tech: 'Flask', count: 6 },
    { tech: 'Docker', count: 7 },
  ],
  learningInterests: [
    { domain: 'AI/ML', count: 8 },
    { domain: 'Backend', count: 6 },
    { domain: 'Frontend', count: 5 },
    { domain: 'Cloud/DevOps', count: 4 },
  ],
  skillsSelf: { Frontend: 70, Backend: 60, 'AI/ML': 40, DevOps: 35, DSA: 55 },
  skillsCommunity: { Frontend: 65, Backend: 62, 'AI/ML': 45, DevOps: 40, DSA: 50 },
  nextGoals: [
    { goal: 'Deepen React patterns', priority: 80 },
    { goal: 'APIs & Node.js scaling', priority: 70 },
    { goal: 'DSA weekly practice', priority: 65 },
    { goal: 'Docker & CI/CD basics', priority: 60 },
    { goal: 'Intro to ML workflows', priority: 50 },
  ],
};

const Heatmap = () => {
  const cells = Array.from({ length: 12 * 7 }, (_, i) => i);
  return (
    <div className="profile-heatmap">
      {cells.map((i) => (
        <div key={i} className={`heat-cell level-${(i % 5)}`}></div>
      ))}
    </div>
  );
};

const ProfilePanel = ({ open, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="profile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="profile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            role="dialog"
            aria-label="User profile"
          >
            <div className="drawer-header">
              <div className="drawer-user">
                <div className="drawer-avatar">AK</div>
                <div>
                  <div className="drawer-username">{dummy.username}</div>
                  <div className="drawer-sub">
                    <span><MapPin size={14} /> {dummy.location}</span>
                    <span>•</span>
                    <span><Building2 size={14} /> {dummy.organization}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button className="drawer-back" onClick={onClose} type="button">
                  <ArrowLeft size={16} />
                  <span>Back to Dashboard</span>
                </button>
                <button className="drawer-close" onClick={onClose} aria-label="Close profile"><X size={18} /></button>
              </div>
            </div>

            <div className="drawer-grid">
              <div className="drawer-card stats">
                <div className="stat-item"><BarChart3 size={18} /> <div><div className="stat-title">Total Responses</div><div className="stat-value">{dummy.stats.totalResponses}</div></div></div>
                <div className="stat-item"><Trophy size={18} /> <div><div className="stat-title">Badges</div><div className="stat-value">{dummy.stats.badges}</div></div></div>
                <div className="stat-item"><Flame size={18} /> <div><div className="stat-title">Streak</div><div className="stat-value">{dummy.stats.streakDays} days</div></div></div>
              </div>

              <div className="drawer-card">
                <div className="card-title">Activity (dummy)</div>
                <Heatmap />
              </div>

              <div className="drawer-card">
                <div className="card-title">Top Technologies</div>
                <div className="chip-row">
                  {dummy.topTechs.map(t => (<span key={t} className="chip">{t}</span>))}
                </div>
              </div>

              <div className="drawer-card">
                <div className="card-title">Where You Stand (dummy)</div>
                <div className="mini-chart">
                  <Radar
                    data={{
                      labels: Object.keys(dummy.skillsSelf),
                      datasets: [
                        {
                          label: 'You',
                          data: Object.values(dummy.skillsSelf),
                          backgroundColor: 'rgba(79, 195, 247, 0.2)',
                          borderColor: 'rgba(79, 195, 247, 1)',
                          pointBackgroundColor: 'rgba(79, 195, 247, 1)'
                        },
                        {
                          label: 'Community',
                          data: Object.values(dummy.skillsCommunity),
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          borderColor: 'rgba(16, 185, 129, 1)',
                          pointBackgroundColor: 'rgba(16, 185, 129, 1)'
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { labels: { color: '#cbd5e1' } } },
                      scales: { r: { angleLines: { color: 'rgba(61,90,127,0.3)' }, grid: { color: 'rgba(61,90,127,0.3)' }, pointLabels: { color: '#cbd5e1' }, ticks: { display: false } } }
                    }}
                  />
                </div>
              </div>

              <div className="drawer-card">
                <div className="card-title">Tech Usage (dummy)</div>
                <div className="mini-chart">
                  <Bar
                    data={{
                      labels: dummy.techUsage.map(t => t.tech),
                      datasets: [{
                        label: 'Count',
                        data: dummy.techUsage.map(t => t.count),
                        backgroundColor: 'rgba(79, 195, 247, 0.6)',
                        borderColor: 'rgba(79, 195, 247, 1)',
                        borderWidth: 1,
                        borderRadius: 8,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { x: { ticks: { color: '#cbd5e1' } }, y: { ticks: { color: '#cbd5e1' } } }
                    }}
                  />
                </div>
              </div>

              <div className="drawer-card">
                <div className="card-title">Learning Interests (dummy)</div>
                <div className="mini-chart">
                  <Doughnut
                    data={{
                      labels: dummy.learningInterests.map(i => i.domain),
                      datasets: [{
                        data: dummy.learningInterests.map(i => i.count),
                        backgroundColor: [
                          'rgba(79, 195, 247, 0.8)',
                          'rgba(129, 212, 250, 0.8)',
                          'rgba(16, 185, 129, 0.8)',
                          'rgba(250, 204, 21, 0.8)'
                        ],
                        borderColor: 'rgba(26,47,79,0.9)'
                      }]
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cbd5e1' } } } }}
                  />
                </div>
              </div>

              <div className="drawer-card full">
                <div className="card-title">Next Goals to Learn (dummy)</div>
                <div className="mini-chart" style={{ height: '220px' }}>
                  <Bar
                    data={{
                      labels: dummy.nextGoals.map(g => g.goal),
                      datasets: [{
                        label: 'Priority',
                        data: dummy.nextGoals.map(g => g.priority),
                        backgroundColor: 'rgba(250, 204, 21, 0.7)',
                        borderColor: 'rgba(250, 204, 21, 1)',
                        borderWidth: 1,
                        borderRadius: 8,
                      }]
                    }}
                    options={{
                      indexAxis: 'y',
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { x: { ticks: { color: '#cbd5e1' }, min: 0, max: 100 }, y: { ticks: { color: '#cbd5e1' } } }
                    }}
                  />
                </div>
              </div>

              <div className="drawer-card full">
                <div className="card-title">Recent Activity</div>
                <div className="activity-list">
                  {dummy.recentActivity.map(item => (
                    <div key={item.title} className="activity-item">
                      <span>{item.title}</span>
                      <span className="time">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfilePanel;


