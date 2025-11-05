import React, { useEffect, useState } from 'react';
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
import { apiService } from '../services/api';
import { Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);

const dummy = {
  username: 'ayush_kumar4',
  fullName: 'Ayush Kumar',
  location: 'India',
  organization: 'Bangladesh Institute of Technology',
  email: 'ayush.kumar@example.com',
  phone: '+91-98100-12345',
  age: 22,
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

const ProfileEditForm = ({ initial, identifier, onSaved }) => {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSave = async () => {
    setSaving(true); setError(null);
    try {
      await apiService.updateUserProfile({ identifier, updates: form });
      await onSaved?.();
    } catch (e) {
      setError('Failed to save. Ensure your identifier matches the sheet row.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
      <div>
        <div className="stat-title">Name</div>
        <input value={form.name} onChange={update('name')} className="profile-input" />
      </div>
      <div>
        <div className="stat-title">Email</div>
        <input value={form.email} onChange={update('email')} className="profile-input" />
      </div>
      <div>
        <div className="stat-title">Phone</div>
        <input value={form.phone} onChange={update('phone')} className="profile-input" />
      </div>
      <div>
        <div className="stat-title">Age</div>
        <input value={form.age} onChange={update('age')} className="profile-input" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <div className="stat-title">College / Company</div>
        <input value={form.organization} onChange={update('organization')} className="profile-input" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <div className="stat-title">Location</div>
        <input value={form.location} onChange={update('location')} className="profile-input" />
      </div>
      {error && <div style={{ gridColumn: '1 / -1', color: '#ef4444', fontSize: '0.9rem' }}>{error}</div>}
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <button className="card-button primary" onClick={onSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  );
};

const ProfilePanel = ({ open, onClose, view }) => {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(() => {
    try { return localStorage.getItem('tp_user_id') || dummy.email || dummy.fullName; } catch { return dummy.email || dummy.fullName; }
  });
  const [isEditingId, setIsEditingId] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setFetchError(null);
        const isEmail = /@/.test(userId);
        const res = await apiService.getUserProfile(isEmail ? { email: userId } : { name: userId });
        if (mounted) setProfile(res || null);
      } catch (e) {
        if (mounted) setFetchError('Could not find your details in the sheet.');
      }
    };
    if (open && userId) load();
    return () => { mounted = false; };
  }, [open, userId]);

  const ProgressSection = () => {
    // Derived demo metrics
    const score = Math.min(100, Math.round(dummy.stats.totalResponses / 5 + dummy.stats.badges * 5 + Math.min(dummy.stats.streakDays, 60) * 0.5));
    const weekly = Array.from({ length: 7 }, (_, i) => 2 + ((i * 3) % 7));
    const monthly = Array.from({ length: 30 }, (_, i) => 1 + ((i * 5) % 9));

    return (
      <div className="drawer-grid">
        <div className="drawer-card">
          <div className="card-title">Overall Progress Score</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent)' }}>{score}</div>
            <div style={{ color: 'var(--text-secondary)' }}>out of 100
              <div style={{ fontSize: '0.85rem' }}>Based on velocity, quality, streak, goals</div>
            </div>
          </div>
        </div>

        <div className="drawer-card">
          <div className="card-title">Skill Graph / Learning Chart</div>
          <div className="mini-chart">
            <Radar
              data={{
                labels: Object.keys(dummy.skillsSelf),
                datasets: [
                  { label: 'You', data: Object.values(dummy.skillsSelf), backgroundColor: 'rgba(79, 195, 247, 0.2)', borderColor: 'rgba(79, 195, 247, 1)', pointBackgroundColor: 'rgba(79, 195, 247, 1)' },
                  { label: 'Community', data: Object.values(dummy.skillsCommunity), backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 1)', pointBackgroundColor: 'rgba(16, 185, 129, 1)' },
                ]
              }}
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cbd5e1' } } }, scales: { r: { angleLines: { color: 'rgba(61,90,127,0.3)' }, grid: { color: 'rgba(61,90,127,0.3)' }, pointLabels: { color: '#cbd5e1' }, ticks: { display: false } } } }}
            />
          </div>
        </div>

        <div className="drawer-card">
          <div className="card-title">Consistency / Streak</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{dummy.stats.streakDays} days</div>
            <div className="mini-chart" style={{ height: 80 }}>
              <Bar
                data={{
                  labels: weekly.map((_, i) => `D${i + 1}`),
                  datasets: [{ label: 'Weekly', data: weekly, backgroundColor: 'rgba(79, 195, 247, 0.6)', borderRadius: 6 }]
                }}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#cbd5e1' } }, y: { ticks: { color: '#cbd5e1' }, beginAtZero: true } } }}
              />
            </div>
          </div>
        </div>

        <div className="drawer-card">
          <div className="card-title">Badges & Achievements</div>
          <div className="chip-row">
            <span className="chip">Rising Star</span>
            <span className="chip">30-day Streak</span>
            <span className="chip">Top 10% Velocity</span>
            <span className="chip">Community Helper</span>
          </div>
        </div>

        <div className="drawer-card full">
          <div className="card-title">Weekly / Monthly Report</div>
          <div className="mini-chart" style={{ height: 220 }}>
            <Bar
              data={{
                labels: monthly.map((_, i) => `${i + 1}`),
                datasets: [{ label: 'Last 30 days', data: monthly, backgroundColor: 'rgba(250, 204, 21, 0.7)', borderColor: 'rgba(250, 204, 21, 1)', borderWidth: 1, borderRadius: 8 }]
              }}
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#cbd5e1' } } }, scales: { x: { ticks: { color: '#cbd5e1' } }, y: { ticks: { color: '#cbd5e1' }, beginAtZero: true } } }}
            />
          </div>
        </div>
      </div>
    );
  };

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

            {view === 'progress' ? (
              <ProgressSection />
            ) : (
            <div className="drawer-grid">
              <div className="drawer-card stats">
                <div className="stat-item"><BarChart3 size={18} /> <div><div className="stat-title">Total Responses</div><div className="stat-value">{dummy.stats.totalResponses}</div></div></div>
                <div className="stat-item"><Trophy size={18} /> <div><div className="stat-title">Badges</div><div className="stat-value">{dummy.stats.badges}</div></div></div>
                <div className="stat-item"><Flame size={18} /> <div><div className="stat-title">Streak</div><div className="stat-value">{dummy.stats.streakDays} days</div></div></div>
              </div>

              <div className="drawer-card">
                <div className="card-title">Personal Details</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Linked identifier: <strong>{userId}</strong>
                    {fetchError && <span style={{ color: '#ef4444', marginLeft: 8 }}>({fetchError})</span>}
                  </div>
                  <button className="card-button secondary" style={{ padding: '0.35rem 0.6rem' }} onClick={() => setIsEditingId(v => !v)}> {isEditingId ? 'Close' : 'Edit'} </button>
                </div>
                {isEditingId && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter your email or name as in the sheet"
                      style={{ flex: 1, background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.2)', borderRadius: 8, color: 'var(--text-primary)', padding: '0.5rem' }}
                    />
                    <button
                      className="card-button primary"
                      style={{ padding: '0.5rem 0.9rem' }}
                      onClick={() => { try { localStorage.setItem('tp_user_id', userId); } catch {}; setIsEditingId(false); setFetchError(null); }}
                    >Save</button>
                  </div>
                )}
                {!isEditingId ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <div className="stat-title">Name</div>
                      <div className="stat-value">{profile?.name || '—'}</div>
                    </div>
                    <div>
                      <div className="stat-title">Email</div>
                      <div className="stat-value">{profile?.email || '—'}</div>
                    </div>
                    <div>
                      <div className="stat-title">Phone</div>
                      <div className="stat-value">{profile?.phone || '—'}</div>
                    </div>
                    <div>
                      <div className="stat-title">Age</div>
                      <div className="stat-value">{profile?.age || '—'}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div className="stat-title">College / Company</div>
                      <div className="stat-value">{profile?.organization || '—'}</div>
                    </div>
                  </div>
                ) : (
                  <ProfileEditForm
                    initial={{
                      name: profile?.name || '',
                      email: profile?.email || '',
                      phone: profile?.phone || '',
                      age: profile?.age || '',
                      organization: profile?.organization || '',
                      location: profile?.location || ''
                    }}
                    identifier={userId}
                    onSaved={async () => {
                      setIsEditingId(false);
                      try {
                        const isEmail = /@/.test(userId);
                        const res = await apiService.getUserProfile(isEmail ? { email: userId } : { name: userId });
                        setProfile(res || null);
                      } catch {}
                    }}
                  />
                )}
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
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfilePanel;


