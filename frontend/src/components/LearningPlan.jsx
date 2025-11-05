import React, { useState } from 'react';
import { Target, Brain, Database, Server, Wrench, Trophy } from 'lucide-react';

const LearningPlan = ({ profile }) => {
  const skills = profile?.skills || { Frontend: 75, Backend: 55, 'AI/ML': 20, DevOps: 30, DSA: 60 };
  const interests = profile?.interests || ['AI/ML', 'Backend'];
  const targetRole = profile?.role || 'Full‑stack developer';

  const focus = [
    { name: 'AI/ML', reason: 'Low score + high interest + portfolio gap', icon: Brain },
    { name: 'Backend', reason: 'High interest + strong FS role alignment', icon: Server },
  ];

  const next7 = [
    { title: 'NumPy/Pandas basics + EDA notebook', domain: 'AI/ML', hours: 3 },
    { title: 'Train baseline model + metrics (accuracy/F1)', domain: 'AI/ML', hours: 2 },
    { title: 'REST API with auth + validation (Node/Express)', domain: 'Backend', hours: 2 },
    { title: 'Add 3 integration tests (Jest/Supertest)', domain: 'Backend', hours: 1 },
  ];

  const next30 = [
    { milestone: 'Compare models + feature engineering + CV; save best model', domain: 'AI/ML' },
    { milestone: 'API: pagination, Redis cache, rate limiting; deploy to free tier', domain: 'Backend' },
    { milestone: 'DSA: 25 problems (arrays/strings/hash, +5 graph)', domain: 'DSA' },
  ];

  const next90 = [
    { capstone: 'Full‑stack app (React+Node+Postgres) with analytics dashboard & CI/CD', domain: 'Full‑stack' },
    { capstone: 'Add ML feature (recs or classifier) + simple monitoring', domain: 'AI/ML' },
  ];

  const kpis = {
    velocity: '≥6 commits/week',
    streak: '≥14 days/month',
    quizzes: 'AI/ML quizzes ≥75%',
    backend: '≥80% route coverage, 1 deploy/month',
    portfolio: '1 README/blog/month',
  };

  const [activeTab, setActiveTab] = useState('Overview'); // 'Overview' | '7' | '30' | '90' | 'KPIs'

  const Chip = ({ children }) => (
    <span className="chip">{children}</span>
  );

  return (
    <div className="learning-items" style={{ gap: '1rem' }}>
      {/* Tab bar */}
      <div className="learning-item" style={{ padding: 0, background: 'transparent', border: 'none' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Overview', '7', '30', '90', 'KPIs'].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="card-button secondary"
              style={{
                background: activeTab === tab ? 'var(--accent)' : 'rgba(79,195,247,0.14)',
                color: activeTab === tab ? '#fff' : 'var(--text-primary)'
              }}
            >
              {tab === 'Overview' ? 'Overview' : (tab === 'KPIs' ? 'KPIs' : `${tab} days`) }
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeTab === 'Overview' && (
        <>
          <div className="learning-item">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Target size={16} /> Focus domains</h4>
            <p>Role: {targetRole}</p>
            <div className="chip-row">
              {focus.map(f => {
                const Icon = f.icon || Target;
                return <Chip key={f.name}><Icon size={14} /> {f.name} · <span style={{ opacity: 0.8 }}>{f.reason}</span></Chip>;
              })}
            </div>
          </div>

          <div className="learning-item">
            <h4>Current skills & interests</h4>
            <div className="chip-row">
              {Object.entries(skills).map(([k, v]) => (
                <Chip key={k}>{k}: {v}</Chip>
              ))}
            </div>
            <p style={{ marginTop: 8 }}>Interests: {interests.join(', ')}</p>
          </div>
        </>
      )}

      {/* 7 days */}
      {activeTab === '7' && (
        <div className="learning-item">
          <h4><Wrench size={16} /> Next 7 days</h4>
          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
            {next7.map((t, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <strong>{t.domain}</strong>: {t.title} <span style={{ color: 'var(--text-secondary)' }}>({t.hours} hrs)</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 30 days */}
      {activeTab === '30' && (
        <div className="learning-item">
          <h4><Database size={16} /> Next 30 days</h4>
          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
            {next30.map((m, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <strong>{m.domain}</strong>: {m.milestone}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 90 days */}
      {activeTab === '90' && (
        <div className="learning-item">
          <h4><Trophy size={16} /> Next 90 days (capstones)</h4>
          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
            {next90.map((c, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <strong>{c.domain}</strong>: {c.capstone}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* KPIs */}
      {activeTab === 'KPIs' && (
        <div className="learning-item">
          <h4>KPIs to track</h4>
          <div className="chip-row">
            <Chip>Velocity: {kpis.velocity}</Chip>
            <Chip>Streak: {kpis.streak}</Chip>
            <Chip>AI/ML: {kpis.quizzes}</Chip>
            <Chip>Backend: {kpis.backend}</Chip>
            <Chip>Portfolio: {kpis.portfolio}</Chip>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPlan;


