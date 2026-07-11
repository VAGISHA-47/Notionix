import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Command } from 'lucide-react';
import { cn } from '../../utils';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, className }) => {
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Deriving title from route
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || '';
    if (!path) return 'Notionix';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const notificationList = [
    { id: 1, title: 'AI Assistant', message: 'Your weekly study roadmap has been generated.', time: '10m ago' },
    { id: 2, title: 'Habits Tracker', message: 'Streak alert! Complete your journal entry to maintain the mood streak.', time: '2h ago' },
  ];

  return (
    <header className={cn(
      "h-16 border-b border-border bg-panel px-6 flex items-center justify-between z-20 sticky top-0",
      className
    )}>
      {/* Page Title / Breadcrumbs */}
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-text font-display">
          {getPageTitle()}
        </h2>
      </div>

      {/* Action Items */}
      <div className="flex items-center gap-4">
        {/* Fake Search Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-apple-md bg-bg-light/65 border border-border text-text-muted hover:text-text text-sm transition-all w-48 md:w-60 shadow-sm"
        >
          <Search className="w-4 h-4 text-text-muted/65" />
          <span className="flex-1 text-left text-xs font-medium placeholder:text-text-muted/50">Search actions...</span>
          <div className="flex items-center gap-1 bg-border/40 px-1 py-0.5 rounded leading-none text-[9px] font-semibold">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-apple-md border border-border bg-panel hover:bg-border/20 text-text transition-all relative hover:scale-105"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setNotificationsOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-80 bg-panel border border-border rounded-apple-lg shadow-premium z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-text uppercase tracking-wide">Notifications</h3>
                  <button 
                    onClick={() => setNotificationsOpen(false)} 
                    className="text-[10px] text-brand hover:underline font-semibold"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-col gap-2.5">
                  {notificationList.map(n => (
                    <div key={n.id} className="p-2.5 rounded-apple-md bg-bg-light/50 hover:bg-border/10 transition-colors border border-border/50">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-xs font-semibold text-text">{n.title}</span>
                        <span className="text-[9px] text-text-muted">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-text-muted leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar */}
        <button className="relative w-8 h-8 rounded-full overflow-hidden border border-border hover:ring-2 hover:ring-brand/20 transition-all">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="User profile" 
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
