import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ListTodo, Gauge, Star, FlaskConical, Package, PlaySquare, Settings, Palette, LogOut } from 'lucide-react';

const quickItems = [
  { label: 'My Lists', icon: ListTodo },
  { label: 'Notebook', icon: BookOpen },
  { label: 'Progress', icon: Gauge },
  { label: 'Points', icon: Star },
];

const linkItems = [
  { label: 'Try New Features', icon: FlaskConical },
  { label: 'Orders', icon: Package },
  { label: 'My Playgrounds', icon: PlaySquare },
  { label: 'Settings', icon: Settings },
  { label: 'Appearance', icon: Palette },
  { label: 'Sign Out', icon: LogOut, danger: true },
];

const ProfileMenu = ({ onClose, onOpenProfile }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      className="profile-menu-panel"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      role="dialog"
      aria-label="Profile menu"
    >
      <button className="profile-menu-header" onClick={() => { onOpenProfile?.(); onClose?.(); }} type="button" style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left', padding: 0 }}>
        <div className="profile-menu-avatar">AK</div>
        <div className="profile-menu-meta">
          <div className="profile-menu-name">ayush_kumar4</div>
          <div className="profile-menu-sub">Access all features with our Premium subscription!</div>
        </div>
      </button>

      <div className="profile-menu-quick">
        {quickItems.map((q) => {
          const Icon = q.icon;
          return (
            <button key={q.label} className="profile-quick-item" type="button">
              <div className="profile-quick-icon"><Icon size={18} /></div>
              <div className="profile-quick-label">{q.label}</div>
            </button>
          );
        })}
      </div>

      <div className="profile-menu-links">
        {linkItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`profile-link ${item.danger ? 'danger' : ''}`}
              type="button"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProfileMenu;


