import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import LearningPlan from './LearningPlan';

const LearningPlanPage = () => {
  return (
    <section id="learning" style={{ padding: '4rem 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="dashboard-card full-width card-large"
        >
          <div className="card-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="heading-icon">🎯</span>
              Learning & Future Plan
            </h3>
            <div className="card-icon"><Target size={18} /></div>
          </div>
          <div className="card-content">
            <LearningPlan profile={{
              skills: { Frontend: 75, Backend: 55, 'AI/ML': 20, DevOps: 30, DSA: 60 },
              interests: ['AI/ML', 'Backend'],
              role: 'Full‑stack developer',
            }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningPlanPage;


