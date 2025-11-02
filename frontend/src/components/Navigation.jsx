import React from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutDashboard, BookOpen, User, Trophy, Target, Bell, Search } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '#dashboard', active: true },
    { name: 'Tutorials', icon: BookOpen, href: '#tutorials' },
    { name: 'Profile', icon: User, href: '#profile' },
    { name: 'Global Ranking', icon: Trophy, href: '#ranking' },
    { name: 'Learning & Future Plan', icon: Target, href: '#learning' },
  ];

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <div className="nav-logo">
          <div className="logo-icon">💎</div>
          <span className="logo-text">TechPulse</span>
        </div>
        <div className="nav-links">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                className={`nav-link ${item.active ? 'active' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="nav-actions">
          <div className="nav-search">
            <Search size={16} />
            <input type="search" placeholder="Search dashboard" />
          </div>
          <button className="nav-bell" aria-label="notifications">
            <Bell size={18} />
            <span className="notif-dot" />
          </button>
          <div className="nav-avatar" title="User profile">
            <div className="avatar-initials">NS</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

