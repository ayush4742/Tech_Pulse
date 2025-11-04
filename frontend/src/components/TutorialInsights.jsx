import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Globe } from 'lucide-react';
import { apiService } from '../services/api';

const TopList = ({ title, items, icon: Icon, limit = 5 }) => {
  const list = (items || []).slice(0, limit);
  if (!list.length) return null;
  return (
    <div className="learning-item">
      <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {Icon ? <Icon size={16} /> : null} {title}
      </h4>
      <ul style={{ margin: 0, paddingLeft: '1rem' }}>
        {list.map((it) => (
          <li key={it.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{it.name}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{it.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TutorialInsights = () => {
  const [overall, setOverall] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState('');
  const [frameworkData, setFrameworkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const data = await apiService.getTutorialInsights();
        if (!mounted) return;
        setOverall(data.overall);
        setLoading(false);
      } catch (e) {
        if (!mounted) return;
        setError('Failed to load tutorials insights');
        setLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!selectedFramework) {
        setFrameworkData(null);
        return;
      }
      try {
        const data = await apiService.getTutorialInsights(selectedFramework);
        if (!mounted) return;
        setFrameworkData({
          topTool: data.topTool || null,
          topOnlineSource: data.topOnlineSource || null,
          otherTools: data.otherTools || [],
        });
      } catch (e) {
        if (!mounted) return;
        setFrameworkData(null);
      }
    };
    run();
    return () => { mounted = false; };
  }, [selectedFramework]);

  // Support either new overall.frameworks or legacy overall.topFrameworks
  const frameworks = useMemo(() => (overall?.frameworks || overall?.topFrameworks || []), [overall]);

  if (loading) return <div className="card-content">Loading…</div>;
  if (error) return <div className="card-content" style={{ color: 'var(--danger, #e57373)' }}>{error}</div>;

  return (
    <div className="card-content">
      {/* When using column-based logic, we primarily show framework list and deep-dive */}
      {overall.topFrameworks && (
        <div className="learning-items" style={{ marginBottom: '1rem' }}>
          <TopList title="Most used tools/frameworks" items={overall.topFrameworks} icon={Layers} />
          <TopList title="How people learned" items={overall.learningMethods} icon={BookOpen} />
          <TopList title="Top online sources" items={overall.onlineSources} icon={Globe} />
        </div>
      )}

      <div className="learning-item">
        <h4 style={{ marginBottom: 8 }}>Deep dive by framework</h4>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: '1px solid var(--card-border)' }}
          >
            <option value="">Select a framework…</option>
            {frameworks.slice(0, 30).map(f => (
              <option key={f.name} value={f.name}>{f.name}</option>
            ))}
          </select>
        </div>

        {selectedFramework && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1rem' }}>
            <div className="learning-items">
              {frameworkData?.topTool && (
                <div className="learning-item">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Layers size={16} /> Most used tool for {selectedFramework}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{frameworkData.topTool.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{frameworkData.topTool.count}</span>
                  </div>
                </div>
              )}
              {frameworkData?.topOnlineSource && (
                <div className="learning-item">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Globe size={16} /> Most used online source for {selectedFramework}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{frameworkData.topOnlineSource.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{frameworkData.topOnlineSource.count}</span>
                  </div>
                </div>
              )}
              {!!frameworkData?.otherTools?.length && (
                <div className="learning-item">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Layers size={16} /> Other tools people used for {selectedFramework}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    {frameworkData.otherTools.slice(0, 8).map(t => (
                      <li key={t.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t.name}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{t.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TutorialInsights;


