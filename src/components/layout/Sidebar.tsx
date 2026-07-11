import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, CheckSquare, Calendar, Sparkles, 
  Activity, BookOpen, Settings, ChevronLeft, ChevronRight, Command
} from 'lucide-react';
import { cn } from '../../utils';

interface SidebarProps {
  className?: string;
  onOpenCommandPalette: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onOpenCommandPalette }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 shrink-0" /> },
    { to: '/app/notes', label: 'Notes', icon: <FileText className="w-5 h-5 shrink-0" />, badge: 4 },
    { to: '/app/tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5 shrink-0" /> },
    { to: '/app/calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5 shrink-0" /> },
    { to: '/app/ai', label: 'AI Workspace', icon: <Sparkles className="w-5 h-5 shrink-0" />, highlight: true },
    { to: '/app/habits', label: 'Habits', icon: <Activity className="w-5 h-5 shrink-0" /> },
    { to: '/app/journal', label: 'Journal', icon: <BookOpen className="w-5 h-5 shrink-0" /> },
    { to: '/app/settings', label: 'Settings', icon: <Settings className="w-5 h-5 shrink-0" /> },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 260 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={cn(
        "h-screen bg-panel border-r border-border flex flex-col justify-between relative select-none shrink-0 z-30",
        className
      )}
    >
      {/* Top Header */}
      <div>
        <div className={cn(
          "h-16 flex items-center justify-between border-b border-border transition-all px-4",
          isCollapsed ? "justify-center" : "px-5"
        )}>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-apple-md bg-gradient-to-tr from-brand to-brand-secondary flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-base tracking-wider">N</span>
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-text via-text to-text-muted bg-clip-text text-transparent">
                Notionix
              </span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-apple-md bg-gradient-to-tr from-brand to-brand-secondary flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-base">N</span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-panel border border-border flex items-center justify-center text-text-muted hover:text-text shadow-sm hover:scale-105 transition-transform"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 p-3">
          {/* Quick Search cmd+K option */}
          <button
            onClick={onOpenCommandPalette}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-apple-md text-text-muted hover:text-text hover:bg-border/20 transition-all text-sm mb-3",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Command className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span className="font-medium text-xs">Search...</span>
                <span className="text-[10px] bg-border/40 px-1.5 py-0.5 rounded leading-none">⌘K</span>
              </div>
            )}
          </button>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex items-center gap-3.5 px-3 py-2.5 rounded-apple-md font-medium text-sm transition-all relative group",
                isActive 
                  ? "bg-brand/10 text-brand" 
                  : "text-text-muted hover:text-text hover:bg-border/20",
                item.highlight && !isActive && "text-brand/80"
              )}
            >
              {({ isActive }) => (
                <>
                  <span className={cn(
                    "transition-colors",
                    isActive ? "text-brand" : "text-text-muted group-hover:text-text",
                    item.highlight && "text-brand"
                  )}>
                    {item.icon}
                  </span>
                  
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="flex-1 flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 min-w-[16px] text-center leading-none">
                          {item.badge}
                        </span>
                      )}
                    </motion.span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-16 px-2.5 py-1.5 bg-panel border border-border text-xs rounded-apple-sm opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all z-50 shadow-premium">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Pinned User Widget */}
      <div className="p-3 border-t border-border">
        <div className={cn(
          "flex items-center gap-3.5 p-2 rounded-apple-lg hover:bg-border/15 transition-all",
          isCollapsed ? "justify-center" : "px-3"
        )}>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="User profile" 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand/15"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success ring-2 ring-panel" />
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex-1 min-w-0"
            >
              <h4 className="text-xs font-semibold text-text truncate">Vagisha S.</h4>
              <p className="text-[10px] text-text-muted truncate">vagisha@notionix.com</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
