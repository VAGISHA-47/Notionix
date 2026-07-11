import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Bell, MoreHorizontal, ArrowUpDown, ChevronDown, 
  ChevronRight, Trash2, Edit2, Copy, Clock, Sparkles, Calendar
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils';

type Priority = 'Low' | 'Medium' | 'High';
type Category = 'Work' | 'Personal' | 'Ideas' | 'Urgent';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // e.g. "Today", "Yesterday" (Overdue), "Jul 14", "Jul 18"
  isOverdue?: boolean;
  priority: Priority;
  category: Category;
  hasReminder: boolean;
  done: boolean;
  createdTime: number; // timestamp for sorting
}

export const Tasks: React.FC = () => {
  const { toast } = useToast();
  
  // Mock Reminders State
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 't-1', 
      title: 'Refactor layout variables in tailwind.config.js', 
      description: 'Align custom border-radius properties with visual mockup guidelines.', 
      dueDate: 'Today', 
      priority: 'High', 
      category: 'Work', 
      hasReminder: true, 
      done: false,
      createdTime: Date.now() - 3600000 
    },
    { 
      id: 't-2', 
      title: 'Schedule AI deep focus study sessions', 
      description: 'Let the suggestions assistant allocate calendar blocks.', 
      dueDate: 'Jul 14', 
      priority: 'Medium', 
      category: 'Work', 
      hasReminder: false, 
      done: false,
      createdTime: Date.now() - 7200000 
    },
    { 
      id: 't-3', 
      title: 'Buy fresh blueberries and organic coffee beans', 
      description: 'Grab organic eggs and local raw honey as well.', 
      dueDate: 'Yesterday', 
      isOverdue: true, 
      priority: 'Low', 
      category: 'Personal', 
      hasReminder: true, 
      done: false,
      createdTime: Date.now() - 10800000 
    },
    { 
      id: 't-4', 
      title: 'Draft technical database synchronization guidelines', 
      description: 'Detail standard sync intervals and fallback routines.', 
      dueDate: 'Jul 10', 
      priority: 'High', 
      category: 'Work', 
      hasReminder: false, 
      done: true,
      createdTime: Date.now() - 14400000 
    },
    { 
      id: 't-5', 
      title: 'Set up encrypted notes folder access', 
      description: 'Validate password unlock screens.', 
      dueDate: 'Jul 9', 
      priority: 'High', 
      category: 'Urgent', 
      hasReminder: true, 
      done: true,
      createdTime: Date.now() - 18000000 
    },
  ]);

  // UI state
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState<'Today' | 'Upcoming' | 'Completed' | 'All'>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'alphabetical' | 'recent'>('recent');
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Dropdown states
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form states for Create/Edit
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDate, setFormDate] = useState('Today');
  const [formPriority, setFormPriority] = useState<Priority>('Medium');
  const [formCategory, setFormCategory] = useState<Category>('Work');
  const [formReminder, setFormReminder] = useState(false);

  // Collapsible completed list
  const [completedExpanded, setCompletedExpanded] = useState(true);

  // Refs for click outside
  const sortRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
      if (activeMenuId) {
        const activeMenu = menuRefs.current[activeMenuId];
        if (activeMenu && !activeMenu.contains(e.target as Node)) {
          setActiveMenuId(null);
        }
      }
    }
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, [activeMenuId]);

  // Toggle checklist task state
  const toggleTaskDone = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextDone = !t.done;
        return { ...t, done: nextDone };
      }
      return t;
    }));
  };

  // Delete Task
  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast('Task Deleted', 'Removed from list.', 'error');
    setActiveMenuId(null);
  };

  // Duplicate Task
  const handleDuplicateTask = (task: Task) => {
    const duplicated: Task = {
      ...task,
      id: `t-${Math.random()}`,
      title: `${task.title} (Copy)`,
      createdTime: Date.now()
    };
    setTasks(prev => [...prev, duplicated]);
    toast('Task Duplicated', undefined, 'success');
    setActiveMenuId(null);
  };

  // Snooze Task (mock push due date)
  const handleSnoozeTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        toast('Task Snoozed', 'Due date moved to Tomorrow.', 'info');
        return { ...t, dueDate: 'Tomorrow', isOverdue: false };
      }
      return t;
    }));
    setActiveMenuId(null);
  };

  // Create Task Action
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newTask: Task = {
      id: `t-${Math.random()}`,
      title: formTitle,
      description: formDesc || undefined,
      dueDate: formDate,
      isOverdue: formDate === 'Yesterday' ? true : false,
      priority: formPriority,
      category: formCategory,
      hasReminder: formReminder,
      done: false,
      createdTime: Date.now()
    };

    setTasks(prev => [newTask, ...prev]);
    setShowCreateModal(false);
    resetForm();
    toast('Task Created', `"${formTitle}" added to checklist.`, 'success');
  };

  // Open Edit Dialog
  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDesc(task.description || '');
    setFormDate(task.dueDate);
    setFormPriority(task.priority);
    setFormCategory(task.category);
    setFormReminder(task.hasReminder);
    setShowEditModal(true);
    setActiveMenuId(null);
  };

  // Edit Task Action
  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !formTitle.trim()) return;

    setTasks(prev => prev.map(t => {
      if (t.id === editingTask.id) {
        return {
          ...t,
          title: formTitle,
          description: formDesc || undefined,
          dueDate: formDate,
          isOverdue: formDate === 'Yesterday' ? true : false,
          priority: formPriority,
          category: formCategory,
          hasReminder: formReminder
        };
      }
      return t;
    }));
    setShowEditModal(false);
    setEditingTask(null);
    resetForm();
    toast('Task Updated', 'Changes applied successfully.', 'success');
  };

  const resetForm = () => {
    setFormTitle('');
    setFormDesc('');
    setFormDate('Today');
    setFormPriority('Medium');
    setFormCategory('Work');
    setFormReminder(false);
  };

  // Filter Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      // Search check
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
        (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
      
      if (!matchesSearch) return false;

      // Chip check
      if (activeChip === 'Today') return !t.done && (t.dueDate === 'Today' || t.isOverdue);
      if (activeChip === 'Upcoming') return !t.done && t.dueDate !== 'Today' && !t.isOverdue;
      if (activeChip === 'Completed') return t.done;
      
      return true; // All
    });
  }, [tasks, search, activeChip]);

  // Sort Logic
  const sortedTasks = useMemo(() => {
    const list = [...filteredTasks];
    
    return list.sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'priority') {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      if (sortBy === 'dueDate') {
        const dateWeight = (d: string) => {
          if (d === 'Yesterday') return 1;
          if (d === 'Today') return 2;
          if (d === 'Tomorrow') return 3;
          if (d.startsWith('Jul')) return 4;
          return 5;
        };
        return dateWeight(a.dueDate) - dateWeight(b.dueDate);
      }
      // default: recent
      return b.createdTime - a.createdTime;
    });
  }, [filteredTasks, sortBy]);

  // Split Active vs Completed tasks
  const activeList = sortedTasks.filter(t => !t.done);
  const completedList = sortedTasks.filter(t => t.done);

  // Category Color badges helper
  const categoryDots = {
    Work: 'bg-indigo-500',
    Personal: 'bg-emerald-500',
    Ideas: 'bg-amber-500',
    Urgent: 'bg-danger'
  };

  const sortLabels = {
    recent: 'Recently Added',
    dueDate: 'Due Date',
    priority: 'Priority',
    alphabetical: 'Alphabetical'
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto pb-20 relative min-h-[calc(100vh-10rem)]">
      
      {/* Top Toolbar */}
      <div className="flex flex-col gap-5 border-b border-border pb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-extrabold text-text">Tasks</h1>
          <Button 
            onClick={() => { resetForm(); setShowCreateModal(true); }}
            className="h-10 text-xs px-4 flex gap-1.5 items-center"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>New Task</span>
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-text-muted/65" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-panel border border-border text-sm rounded-apple-xl pl-11 pr-4 h-12 outline-none focus:border-brand/80 focus:ring-2 focus:ring-brand/10 transition-all shadow-sm"
          />
        </div>

        {/* Filters and sorting Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 select-none">
          {/* Chips */}
          <div className="flex items-center gap-1.5">
            {(['All', 'Today', 'Upcoming', 'Completed'] as const).map(chip => {
              const isActive = activeChip === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveChip(chip)}
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold rounded-full border transition-all",
                    isActive 
                      ? "bg-brand text-white border-transparent shadow-sm" 
                      : "bg-panel text-text-muted hover:text-text border-border"
                  )}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* Quiet Sort Menu */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-apple-md border border-border bg-panel text-xs font-bold text-text-muted hover:text-text transition-all hover:scale-102"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort: {sortLabels[sortBy]}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", sortDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {sortDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-1.5 w-44 bg-panel border border-border rounded-apple-lg shadow-premium z-40 p-1 flex flex-col gap-0.5"
                >
                  {(['recent', 'dueDate', 'priority', 'alphabetical'] as const).map(option => (
                    <li key={option}>
                      <button
                        onClick={() => {
                          setSortBy(option);
                          setSortDropdownOpen(false);
                          toast('List Sorted', `Sorting applied by ${sortLabels[option]}.`, 'info');
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs font-semibold rounded-apple-md transition-colors hover:bg-border/20",
                          sortBy === option && "text-brand bg-brand/5 dark:bg-brand/10"
                        )}
                      >
                        {sortLabels[option]}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Checklist Grid Rows */}
      <div className="flex-1 flex flex-col gap-0.5">
        
        {/* Active List */}
        <div className="flex flex-col">
          {activeList.length > 0 ? (
            activeList.map(task => (
              <TaskRow 
                key={task.id} 
                task={task} 
                onToggleDone={toggleTaskDone} 
                categoryDots={categoryDots}
                activeMenuId={activeMenuId}
                setActiveMenuId={setActiveMenuId}
                menuRefs={menuRefs}
                onDelete={handleDeleteTask}
                onDuplicate={handleDuplicateTask}
                onSnooze={handleSnoozeTask}
                onEdit={handleOpenEdit}
              />
            ))
          ) : (
            activeChip !== 'Completed' && (
              <div className="py-14 text-center text-xs text-text-muted font-medium select-none">
                No active tasks found. Have a calm morning! 🌅
              </div>
            )
          )}
        </div>

        {/* Completed Collapsible Section */}
        {completedList.length > 0 && (activeChip === 'All' || activeChip === 'Completed') && (
          <div className="mt-6 flex flex-col">
            <button
              onClick={() => setCompletedExpanded(!completedExpanded)}
              className="flex items-center gap-1 text-[11px] font-bold text-text-muted hover:text-text uppercase tracking-wider select-none py-2 mb-2 w-fit"
            >
              {completedExpanded ? <ChevronDown className="w-4.5 h-4.5" /> : <ChevronRight className="w-4.5 h-4.5" />}
              <span>Completed ({completedList.length})</span>
            </button>

            <AnimatePresence>
              {completedExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex flex-col gap-0.5"
                >
                  {completedList.map(task => (
                    <TaskRow 
                      key={task.id} 
                      task={task} 
                      onToggleDone={toggleTaskDone} 
                      categoryDots={categoryDots}
                      activeMenuId={activeMenuId}
                      setActiveMenuId={setActiveMenuId}
                      menuRefs={menuRefs}
                      onDelete={handleDeleteTask}
                      onDuplicate={handleDuplicateTask}
                      onSnooze={handleSnoozeTask}
                      onEdit={handleOpenEdit}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { resetForm(); setShowCreateModal(true); }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-brand to-brand-secondary text-white flex items-center justify-center shadow-lg shadow-brand/25 dark:shadow-brand/15 z-30 pointer-events-auto transition-all"
        aria-label="Add new task"
      >
        <Plus className="w-6 h-6 stroke-[2.5px]" />
      </motion.button>

      {/* Modal - Create Task */}
      <AnimatePresence>
        {showCreateModal && (
          <TaskDialog 
            title="New Task"
            onSubmit={handleCreateTask}
            onClose={() => setShowCreateModal(false)}
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            formDesc={formDesc}
            setFormDesc={setFormDesc}
            formDate={formDate}
            setFormDate={setFormDate}
            formPriority={formPriority}
            setFormPriority={setFormPriority}
            formCategory={formCategory}
            setFormCategory={setFormCategory}
            formReminder={formReminder}
            setFormReminder={setFormReminder}
          />
        )}
      </AnimatePresence>

      {/* Modal - Edit Task */}
      <AnimatePresence>
        {showEditModal && (
          <TaskDialog 
            title="Edit Task"
            onSubmit={handleEditTask}
            onClose={() => { setShowEditModal(false); setEditingTask(null); }}
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            formDesc={formDesc}
            setFormDesc={setFormDesc}
            formDate={formDate}
            setFormDate={setFormDate}
            formPriority={formPriority}
            setFormPriority={setFormPriority}
            formCategory={formCategory}
            setFormCategory={setFormCategory}
            formReminder={formReminder}
            setFormReminder={setFormReminder}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

// --- Subcomponent: TaskRow ---
interface TaskRowProps {
  task: Task;
  onToggleDone: (id: string) => void;
  categoryDots: Record<Category, string>;
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  menuRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onDelete: (id: string) => void;
  onDuplicate: (task: Task) => void;
  onSnooze: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onToggleDone,
  categoryDots,
  activeMenuId,
  setActiveMenuId,
  menuRefs,
  onDelete,
  onDuplicate,
  onSnooze,
  onEdit
}) => {
  const isMenuOpen = activeMenuId === task.id;

  const priorityBadges = {
    High: 'bg-rose-500/10 text-rose-600 border border-rose-200/50 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800/30 text-[10px] rounded-apple-md px-2.5 py-0.5',
    Medium: 'bg-amber-500/10 text-amber-600 border border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800/30 text-[10px] rounded-apple-md px-2.5 py-0.5',
    Low: 'bg-slate-500/10 text-slate-600 border border-slate-200/50 dark:bg-slate-800/20 dark:text-slate-400 dark:border-slate-700/30 text-[10px] rounded-apple-md px-2.5 py-0.5'
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between px-4 py-3 h-14 border-b border-border bg-transparent transition-all group duration-150 relative cursor-pointer",
        "hover:bg-border/10 dark:hover:bg-border/5",
        task.done ? "opacity-60" : "opacity-100"
      )}
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        {/* Large touch-friendly checkbox (40x40px clickable wrapper) */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleDone(task.id); }}
          className="relative flex items-center justify-center shrink-0 w-10 h-10 -ml-2 rounded-full cursor-pointer hover:bg-border/20 transition-colors outline-none select-none"
          aria-label={task.done ? "Mark incomplete" : "Mark complete"}
        >
          <motion.div
            initial={false}
            animate={{ 
              backgroundColor: task.done ? 'var(--primary)' : 'rgba(0,0,0,0)',
              borderColor: task.done ? 'var(--primary)' : 'var(--border)'
            }}
            transition={{ duration: 0.2 }}
            className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center relative text-white transition-colors"
          >
            {/* Drawing checkmark */}
            <motion.svg 
              width="11" 
              height="9" 
              viewBox="0 0 11 9" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="shrink-0"
            >
              <motion.path
                d="M1.5 4.5L4 7L9.5 1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: task.done ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            </motion.svg>
          </motion.div>
        </button>

        {/* Text content details */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span 
            className={cn(
              "text-sm font-bold text-text truncate transition-all duration-300",
              task.done && "line-through text-text-muted/70 font-medium"
            )}
          >
            {task.title}
          </span>
          {task.description && (
            <span className="text-xs text-text-muted/80 truncate max-w-xs font-medium">
              {task.description}
            </span>
          )}
        </div>
      </div>

      {/* Metadata tags */}
      <div className="flex items-center gap-4 shrink-0 select-none">
        
        {/* Due date with Calendar icon */}
        <div className="flex items-center gap-1.5 text-text-muted/65 text-[10px] font-bold">
          <Calendar className="w-3.5 h-3.5 text-text-muted/60" />
          <span 
            className={cn(
              task.isOverdue && !task.done 
                ? "text-danger font-extrabold" 
                : ""
            )}
          >
            {task.dueDate}
          </span>
        </div>

        {/* Priority Badge */}
        <span className={cn(
          "text-[10px] font-extrabold px-2.5 py-0.5 rounded-apple-md select-none",
          priorityBadges[task.priority]
        )}>
          {task.priority}
        </span>

        {/* Category Dot tag */}
        <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold">
          <span className={cn("w-2 h-2 rounded-full", categoryDots[task.category])} />
          <span className="hidden md:inline">{task.category}</span>
        </div>

        {/* Reminder bell icon with hover tooltip */}
        {task.hasReminder && (
          <span title="Reminder alert active" className="cursor-help">
            <Bell className="w-4.5 h-4.5 text-brand/70 hover:text-brand transition-colors" />
          </span>
        )}

        {/* Action menu button */}
        <div 
          className="relative" 
          ref={el => { menuRefs.current[task.id] = el; }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setActiveMenuId(isMenuOpen ? null : task.id)}
            className="p-1 text-text-muted hover:text-text rounded hover:bg-border/20 md:opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* Popover action list */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-1.5 w-36 bg-panel border border-border rounded-apple-lg shadow-premium z-40 p-1 flex flex-col gap-0.5"
              >
                <li>
                  <button
                    onClick={() => onEdit(task)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-text rounded-apple-md hover:bg-border/20 text-left transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-text-muted" />
                    <span>Edit Task</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onDuplicate(task)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-text rounded-apple-md hover:bg-border/20 text-left transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-text-muted" />
                    <span>Duplicate</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSnooze(task.id)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-text rounded-apple-md hover:bg-border/20 text-left transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5 text-text-muted" />
                    <span>Snooze</span>
                  </button>
                </li>
                <li className="border-t border-border/40 mt-1 pt-1">
                  <button
                    onClick={() => onDelete(task.id)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-danger rounded-apple-md hover:bg-danger/10 text-left transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};



// --- Subcomponent: TaskDialog ---
interface TaskDialogProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  formTitle: string;
  setFormTitle: (val: string) => void;
  formDesc: string;
  setFormDesc: (val: string) => void;
  formDate: string;
  setFormDate: (val: string) => void;
  formPriority: Priority;
  setFormPriority: (val: Priority) => void;
  formCategory: Category;
  setFormCategory: (val: Category) => void;
  formReminder: boolean;
  setFormReminder: (val: boolean) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  title,
  onSubmit,
  onClose,
  formTitle,
  setFormTitle,
  formDesc,
  setFormDesc,
  formDate,
  setFormDate,
  formPriority,
  setFormPriority,
  formCategory,
  setFormCategory,
  formReminder,
  setFormReminder
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-panel border border-border w-full max-w-md p-6 rounded-apple-xl shadow-premium z-10"
      >
        <div className="flex items-center gap-1.5 mb-4 border-b border-border/40 pb-3 select-none">
          <Sparkles className="w-4.5 h-4.5 text-brand" />
          <h3 className="text-base font-bold text-text">{title}</h3>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            label="What needs to be done?"
            placeholder="e.g. Read tech blog post"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            autoFocus
            required
          />

          <Input
            label="One-line Description (optional)"
            placeholder="e.g. Focus on composition & layout margins"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority Level"
              value={formPriority}
              onChange={(val) => setFormPriority(val as Priority)}
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' }
              ]}
            />

            <Select
              label="Category"
              value={formCategory}
              onChange={(val) => setFormCategory(val as Category)}
              options={[
                { value: 'Work', label: 'Work' },
                { value: 'Personal', label: 'Personal' },
                { value: 'Ideas', label: 'Ideas' },
                { value: 'Urgent', label: 'Urgent' }
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Due Date"
              value={formDate}
              onChange={(val) => setFormDate(val)}
              options={[
                { value: 'Today', label: 'Today' },
                { value: 'Tomorrow', label: 'Tomorrow' },
                { value: 'Yesterday', label: 'Yesterday (Overdue)' },
                { value: 'Jul 14', label: 'Jul 14' },
                { value: 'Jul 18', label: 'Jul 18' }
              ]}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-muted select-none">Reminders</label>
              <div className="flex items-center h-11 border border-border rounded-apple-md bg-panel px-4">
                <input
                  type="checkbox"
                  id="reminderToggle"
                  checked={formReminder}
                  onChange={(e) => setFormReminder(e.target.checked)}
                  className="rounded text-brand focus:ring-brand"
                />
                <label htmlFor="reminderToggle" className="text-xs font-semibold text-text ml-2 cursor-pointer select-none">
                  Set alert
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 mt-4 border-t border-border/40 pt-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="h-10 text-sm px-4"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="h-10 text-sm px-5"
            >
              Save Task
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
