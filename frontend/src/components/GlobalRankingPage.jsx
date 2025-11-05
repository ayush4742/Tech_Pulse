import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Clock, GraduationCap } from 'lucide-react';
import { apiService } from '../services/api';
import './GlobalRankingPage.css';

const GlobalRankingPage = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await apiService.getRanking();
        setRanking(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching ranking:', err);
        setError('Failed to load ranking data');
      } finally {
        setLoading(false);
      }
    };

    // Initial load shows spinner
    setLoading(true);
    fetchRanking();
    // Refresh every 24 hours
    const interval = setInterval(fetchRanking, 86400000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Medal className="rank-icon gold" />;
    if (rank === 2) return <Medal className="rank-icon silver" />;
    if (rank === 3) return <Medal className="rank-icon bronze" />;
    return <Award className="rank-icon" />;
  };

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'rank-badge gold';
    if (rank === 2) return 'rank-badge silver';
    if (rank === 3) return 'rank-badge bronze';
    return 'rank-badge';
  };

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return timestamp;
    }
  };

  return (
    <section id="ranking" className="ranking-page">
      <div className="ranking-container">
        <motion.div
          className="ranking-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="ranking-title-section">
            <Trophy className="ranking-title-icon" size={48} />
            <h1 className="ranking-title">Global Ranking</h1>
            <p className="ranking-subtitle">
              Ranked by earliest submission time. Be among the first to contribute!
            </p>
          </div>
        </motion.div>

        {loading && (
          <div className="ranking-loading">
            <div className="loading-spinner"></div>
            <p>Loading rankings...</p>
          </div>
        )}

        {error && (
          <div className="ranking-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && ranking.length === 0 && (
          <div className="ranking-empty">
            <Trophy size={64} />
            <p>No rankings available yet. Be the first to submit!</p>
          </div>
        )}

        {!loading && !error && ranking.length > 0 && (
          <motion.div
            className="ranking-table-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="ranking-table">
              <div className="ranking-table-header">
                <div className="rank-header-cell">Rank</div>
                <div className="name-header-cell">Name</div>
                <div className="college-header-cell">College</div>
                <div className="score-header-cell">Score</div>
                <div className="time-header-cell">Submitted</div>
              </div>
              <div className="ranking-table-body">
                {ranking.map((entry, index) => (
                  <motion.div
                    key={index}
                    className={`ranking-row ${entry.rank <= 3 ? 'top-rank' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <div className="rank-cell">
                      <div className={getRankBadgeClass(entry.rank)}>
                        {getRankIcon(entry.rank)}
                        <span className="rank-number">#{entry.rank}</span>
                      </div>
                    </div>
                    <div className="name-cell">
                      <span className="name-text">{entry.name}</span>
                    </div>
                    <div className="college-cell">
                      <GraduationCap className="college-icon" size={16} />
                      <span className="college-text">{entry.college}</span>
                    </div>
                    <div className="score-cell">
                      <span className="score-badge">{typeof entry.score === 'number' ? entry.score : '-'}</span>
                    </div>
                    <div className="time-cell">
                      <Clock className="time-icon" size={16} />
                      <span className="time-text">{formatTimestamp(entry.timestamp)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {!loading && !error && ranking.length > 0 && (
          <motion.div
            className="ranking-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="ranking-footer-text">
              Total contributors: <strong>{ranking.length}</strong>
            </p>
            <p className="ranking-footer-note">
              Rankings update automatically as new submissions are received
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GlobalRankingPage;

