import React from 'react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: ViewState.DASHBOARD, icon: 'home', label: 'Home', activeIcon: 'dashboard' },
    { view: ViewState.EXPLORE, icon: 'school', label: 'Courses', activeIcon: 'school' },
    { view: ViewState.PROFILE, icon: 'person', label: 'Profile', activeIcon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around font-medium px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          // Dashboard maps to Home icon in logic but "Dashboard" visually in some screens, 
          // but let's stick to standard navigation behavior.
          return (
            <button
              key={item.view}
              onClick={() => onChangeView(item.view)}
              className={`group inline-flex flex-col items-center justify-center w-full h-full gap-1 ${
                isActive ? 'text-primary' : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl ${isActive ? 'fill-icon' : ''}`}>
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;