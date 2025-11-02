import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import characterImage1 from '../assets/images/img1.png';
import characterImage2 from '../assets/images/img2.png';

const HeroSection = () => {
  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="hero-content">
        <div className="hero-left">
          <motion.div
            className="hero-illustration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img 
              src={characterImage1} 
              alt="TechPulse Character" 
              className="anime-character-image"
            />
          </motion.div>
        </div>
        <div className="hero-center">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to TechPulse
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            TechPulse is India's real-time tech insights platform, helping students and developers 
            to navigate the fast-evolving world of technology.
          </motion.p>
          <motion.a
            href="#dashboard"
            className="hero-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} />
            Get Started
          </motion.a>
        </div>
        <div className="hero-right">
          <motion.div
            className="hero-illustration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img 
              src={characterImage2} 
              alt="TechPulse Character" 
              className="anime-character-image"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;