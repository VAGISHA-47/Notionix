import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ChevronLeft, ChevronRight, Lightbulb, UserCheck
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils';

interface Event {
  id: string;
  title: string;
  category: 'Focus' | 'Meeting' | 'Personal' | 'Health';
  emoji: string;
  day: number; // day of Month (e.g. 1 to 31)
  time: string;
  duration: string;
}

export const Calendar: React.FC = () => {
  const { toast } = useToast();
  const [view, setView] = useState<'Month' | 'Week' | 'Day'>('Month');
  const currentMonth = 'July 2026';
  
  // Mock Calendar Events
  const [events, setEvents] = useState<Event[]>([
    { id: 'ev-1', title: 'Architecture Review', category: 'Focus', emoji: '💻', day: 12, time: '10:00 AM', duration: '90m' },
    { id: 'ev-2', title: 'Weekly Core Sync', category: 'Meeting', emoji: '👥', day: 12, time: '12:30 PM', duration: '45m' },
    { id: 'ev-3', title: 'Meditation & Gym', category: 'Health', emoji: '🏃', day: 14, time: '8:00 AM', duration: '60m' },
    { id: 'ev-4', title: 'Launch Celebration Dinner', category: 'Personal', emoji: '🎉', day: 18, time: '7:30 PM', duration: '120m' },
    { id: 'ev-5', title: 'Refactor Tailwind components', category: 'Focus', emoji: '🎨', day: 15, time: '2:00 PM', duration: '120m' },
  ]);

  // AI Suggestions Mock State
  const [aiSuggestions, setAiSuggestions] = useState([
    { 
      id: 'sug-1', 
      title: 'Optimal focus block detected', 
      description: 'You have no meetings on Wednesday afternoon. Schedule a 2-hour Deep Focus block?', 
      actionLabel: 'Schedule for 15th', 
      timeSlot: '2:00 PM', 
      day: 15,
      applied: false 
    },
    { 
      id: 'sug-2', 
      title: 'Habit synchronization', 
      description: 'Your meditation habit fits best before the Gym session on Tuesday morning. Schedule?', 
      actionLabel: 'Schedule for 14th', 
      timeSlot: '7:00 AM', 
      day: 14,
      applied: false 
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Focus' | 'Meeting' | 'Personal' | 'Health'>('Focus');
  const [newEmoji, setNewEmoji] = useState('💻');
  const [newTime, setNewTime] = useState('9:00 AM');

  // Basic Month configuration (July 2026 starts on Wednesday, 31 days)
  // Shift offsets: Wednesday is index 3 in [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
  const startingOffset = 3; 
  const totalDays = 31;
  const calendarCells = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingOffset + 1;
    return dayNumber > 0 && dayNumber <= totalDays ? dayNumber : null;
  });

  const handleApplySuggestion = (id: string, day: number, title: string, time: string) => {
    // Add event
    const newEvent: Event = {
      id: `ev-ai-${Math.random()}`,
      title: title.replace('Schedule', 'Focus Block'),
      category: 'Focus',
      emoji: '⚡',
      day,
      time,
      duration: '120m'
    };

    setEvents([...events, newEvent]);
    setAiSuggestions(prev => prev.map(s => s.id === id ? { ...s, applied: true } : s));
    toast('Event Scheduled via AI', `Added "${title}" to July ${day}`, 'success');
  };

  const handleCellClick = (day: number) => {
    setSelectedDay(day);
    setShowAddModal(true);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || selectedDay === null) return;

    const newEv: Event = {
      id: `ev-${Math.random().toString(36).substring(2, 9)}`,
      title: newTitle,
      category: newCategory,
      emoji: newEmoji,
      day: selectedDay,
      time: newTime,
      duration: '60m'
    };

    setEvents([...events, newEv]);
    setShowAddModal(false);
    setNewTitle('');
    setNewCategory('Focus');
    setNewEmoji('💻');
    setNewTime('9:00 AM');
    toast('Event Created', `"${newTitle}" added to calendar.`, 'success');
  };

  const categoryColors = {
    Focus: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/30',
    Meeting: 'bg-brand/10 text-brand dark:text-brand-secondary border-brand/20 dark:border-brand-secondary/20',
    Personal: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30',
    Health: 'bg-success/10 text-success border-success/20',
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
      
      {/* Left Pane: Main Calendar Display */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Calendar Navigation header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3.5 select-none">
            <h1 className="text-xl font-display font-extrabold text-text">{currentMonth}</h1>
            <div className="flex items-center border border-border rounded-apple-md bg-panel divide-x divide-border">
              <button className="p-2 hover:bg-border/20 text-text-muted hover:text-text transition-colors">
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 hover:bg-border/20 text-text-muted hover:text-text transition-colors">
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Toggle view Month/Week/Day */}
          <div className="flex p-0.5 bg-border/30 rounded-apple-lg border border-border/30 select-none">
            {['Month', 'Week', 'Day'].map(v => (
              <button
                key={v}
                onClick={() => setView(v as any)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-bold rounded-apple-md transition-all",
                  view === v ? "bg-panel text-brand shadow-sm" : "text-text-muted hover:text-text"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Body Grids */}
        <div className="flex-1 min-h-0 bg-panel border border-border rounded-apple-xl shadow-premium overflow-hidden">
          {/* Days labels */}
          <div className="grid grid-cols-7 border-b border-border bg-bg-light/45 dark:bg-bg-dark/30 py-3 text-center text-xs font-bold text-text-muted select-none">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Month Cell Grid */}
          <div className="grid grid-cols-7 grid-rows-6 h-[calc(100vh-18.5rem)] min-h-[380px] divide-x divide-y divide-border/60">
            {calendarCells.map((day, idx) => {
              const dayEvents = day ? events.filter(e => e.day === day) : [];
              const isToday = day === 11; // mock today's date
              
              return (
                <div
                  key={idx}
                  onClick={() => day && handleCellClick(day)}
                  className={cn(
                    "p-2.5 flex flex-col gap-1.5 hover:bg-border/10 transition-colors select-none group min-h-0 overflow-y-auto cursor-pointer",
                    !day && "bg-bg-light/35 dark:bg-bg-dark/15 text-transparent pointer-events-none"
                  )}
                >
                  {day && (
                    <div className="flex justify-between items-center mb-1">
                      <span className={cn(
                        "text-xs font-bold flex items-center justify-center w-6 h-6 rounded-full transition-all",
                        isToday 
                          ? "bg-brand text-white shadow-sm" 
                          : "text-text group-hover:text-brand"
                      )}>
                        {day}
                      </span>
                    </div>
                  )}

                  {/* Render events */}
                  {dayEvents.map(ev => (
                    <div
                      key={ev.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        toast(`Event Details`, `"${ev.title}" scheduled at ${ev.time}.`, 'info');
                      }}
                      className={cn(
                        "text-[10px] font-bold py-1 px-2 border rounded-apple-sm flex items-center gap-1 overflow-hidden truncate",
                        categoryColors[ev.category]
                      )}
                    >
                      <span className="shrink-0">{ev.emoji}</span>
                      <span className="truncate">{ev.title}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Pane: AI Assistant suggestions */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-5">
        <div className="flex items-center gap-2 px-1">
          <Sparkles className="w-5 h-5 text-brand" />
          <h3 className="text-sm font-extrabold text-text uppercase tracking-wide">AI Scheduler</h3>
        </div>

        <div className="flex flex-col gap-4">
          {aiSuggestions.map(sug => (
            <Card 
              key={sug.id}
              className={cn(
                "border border-border/80 relative transition-all",
                sug.applied ? "bg-success/5 border-success/20 opacity-70" : "bg-gradient-to-tr from-brand/5 to-transparent border-brand/10 hover:border-brand/20"
              )}
            >
              <div className="flex items-start gap-2.5 mb-2">
                <Lightbulb className={cn("w-4.5 h-4.5 shrink-0 mt-0.5", sug.applied ? "text-success" : "text-brand")} />
                <div>
                  <h4 className="text-xs font-bold text-text leading-tight">{sug.title}</h4>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{sug.description}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                <span className="text-[10px] font-bold text-text-muted bg-border/40 px-2 py-0.5 rounded">
                  {sug.timeSlot}
                </span>
                
                {sug.applied ? (
                  <span className="text-[10px] text-success font-bold flex gap-1 items-center">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Scheduled</span>
                  </span>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => handleApplySuggestion(sug.id, sug.day, sug.title, sug.timeSlot)}
                    className="h-7 text-[10px] font-bold px-2.5 bg-brand hover:bg-brand/90"
                  >
                    Accept Suggestion
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal to Add Event */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-panel border border-border w-full max-w-sm p-6 rounded-apple-xl shadow-premium z-10"
            >
              <h3 className="text-base font-bold text-text mb-4">Add Event for July {selectedDay}</h3>
              <form onSubmit={handleCreateEvent} className="flex flex-col gap-4">
                <Input
                  label="Event Title"
                  placeholder="e.g. Brainstorming session"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Category"
                    value={newCategory}
                    onChange={(val) => setNewCategory(val as any)}
                    options={[
                      { value: 'Focus', label: 'Focus block' },
                      { value: 'Meeting', label: 'Core Sync Meeting' },
                      { value: 'Personal', label: 'Personal Time' },
                      { value: 'Health', label: 'Health / Exercise' },
                    ]}
                  />
                  <Select
                    label="Emoji Marker"
                    value={newEmoji}
                    onChange={(val) => setNewEmoji(val)}
                    options={[
                      { value: '💻', label: '💻 Computer' },
                      { value: '👥', label: '👥 Meeting' },
                      { value: '🏃', label: '🏃 Fitness' },
                      { value: '🎉', label: '🎉 Social' },
                      { value: '⚡', label: '⚡ Deep focus' },
                    ]}
                  />
                </div>

                <Input
                  label="Start Time"
                  type="text"
                  placeholder="e.g. 10:30 AM"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />

                <div className="flex justify-end gap-2.5 mt-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowAddModal(false)}
                    className="h-10 text-sm px-4"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-10 text-sm px-4"
                  >
                    Create Event
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
