import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import TutorialInsights from './TutorialInsights';

const TutorialsPage = () => {
  return (
    <section id="tutorials" style={{ padding: '4rem 0' }}>
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
              <span className="heading-icon">📚</span>
              Welcome to Tutorials
            </h3>
            <div className="card-icon"><BookOpen size={18} /></div>
          </div>
          <TutorialInsights />
        </motion.div>
      </div>
    </section>
  );
};

export default TutorialsPage;


