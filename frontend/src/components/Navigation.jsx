import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutDashboard, BookOpen, User, Trophy, Target, Bell, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ProfileMenu from './ProfileMenu';
import ProfilePanel from './ProfilePanel';

const Navigation = () => {
  const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '#dashboard' },
    { name: 'Tutorials', icon: BookOpen, href: '#tutorials' },
    { name: 'Profile', icon: User, href: '#profile' },
    { name: 'Global Ranking', icon: Trophy, href: '#ranking' },
    { name: 'Learning & Future Plan', icon: Target, href: '#learning' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(typeof window !== 'undefined' ? (window.location.hash || '#home') : '#home');

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
            const isActive = activeHash === item.href;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveHash(item.href)}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="nav-actions" style={{ position: 'relative' }}>
          <div className="nav-search">
            <Search size={16} />
            <input type="search" placeholder="Search dashboard" />
          </div>
          <button className="nav-bell" aria-label="notifications">
            <Bell size={18} />
            <span className="notif-dot" />
          </button>
          <button
            className="nav-avatar"
            title="User profile"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            style={{ cursor: 'pointer' }}
          >
            <div className="avatar-initials">AK</div>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <div style={{ position: 'absolute', right: 0, top: '52px' }}>
                <ProfileMenu onClose={() => setIsMenuOpen(false)} onOpenProfile={() => setIsProfileOpen(true)} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ProfilePanel open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </nav>
  );
};

export default Navigation;

