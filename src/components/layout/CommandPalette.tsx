import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Command, LayoutDashboard, FileText, CheckSquare, Calendar, Sparkles, Activity, BookOpen, Settings, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const items = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: <LayoutDashboard className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/dashboard') },
    { id: 'notes', label: 'Open Notes Editor', icon: <FileText className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/notes') },
    { id: 'tasks', label: 'View Tasks Board', icon: <CheckSquare className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/tasks') },
    { id: 'calendar', label: 'Open Calendar View', icon: <Calendar className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/calendar') },
    { id: 'ai', label: 'Access AI Assistant Workspace', icon: <Sparkles className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/ai') },
    { id: 'habits', label: 'Track Habits', icon: <Activity className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/habits') },
    { id: 'journal', label: 'Write daily Journal', icon: <BookOpen className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/journal') },
    { id: 'settings', label: 'Settings & Preferences', icon: <Settings className="w-4.5 h-4.5" />, category: 'Navigation', action: () => navigate('/app/settings') },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/35 backdrop-blur-xs"
          />

          {/* Search Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-panel/90 border border-border rounded-apple-xl shadow-premium z-10 overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 border-b border-border h-14">
              <Search className="w-5 h-5 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or page name..."
                className="w-full bg-transparent text-text outline-none text-base placeholder:text-text-muted/50"
              />
              <div className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded bg-border/40 text-[10px] font-semibold text-text-muted">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto max-h-[350px] p-2">
              {filteredItems.length > 0 ? (
                Object.entries(
                  filteredItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                  }, {} as Record<string, typeof items>)
                ).map(([category, categoryItems]) => (
                  <div key={category} className="mb-2">
                    <h4 className="text-[11px] font-bold text-text-muted/65 uppercase tracking-wider px-3 py-1.5 select-none">
                      {category}
                    </h4>
                    <div className="flex flex-col gap-0.5">
                      {categoryItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-apple-md hover:bg-brand/5 text-left transition-all group text-sm text-text font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-text-muted group-hover:text-brand transition-colors">
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-brand transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-text-muted">
                  No matching commands found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
