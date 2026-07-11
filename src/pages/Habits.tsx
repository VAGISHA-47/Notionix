import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Plus, Calendar, Check, Target
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils';

interface Habit {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  streak: number;
  history: Record<string, boolean>; // 'YYYY-MM-DD' key
}

export const Habits: React.FC = () => {
  const { toast } = useToast();
  
  // Mock Habits State
  const [habits, setHabits] = useState<Habit[]>([
    { 
      id: 'h-1', 
      name: 'Hydration Intake', 
      category: 'Health', 
      currentValue: 3, 
      targetValue: 4, 
      unit: 'glasses', 
      streak: 8, 
      history: { 'Mon': true, 'Tue': true, 'Wed': false, 'Thu': true } 
    },
    { 
      id: 'h-2', 
      name: 'Deep Focus Coding', 
      category: 'Work', 
      currentValue: 2, 
      targetValue: 3, 
      unit: 'hours', 
      streak: 15, 
      history: { 'Mon': true, 'Tue': true, 'Wed': true, 'Thu': true } 
    },
    { 
      id: 'h-3', 
      name: 'Read Technical Docs', 
      category: 'Study', 
      currentValue: 0, 
      targetValue: 1, 
      unit: 'session', 
      streak: 5, 
      history: { 'Mon': false, 'Tue': true, 'Wed': true, 'Thu': false } 
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTarget, setNewTarget] = useState('1');
  const [newUnit, setNewUnit] = useState('times');

  // Interactive Heatmap Days Grid (0: Empty, 1: Low, 2: Medium, 3: High compliance)
  const [heatmapData, setHeatmapData] = useState([
    { day: 'M', completed: [2, 3, 0, 2] },
    { day: 'T', completed: [3, 2, 3, 1] },
    { day: 'W', completed: [0, 2, 3, 0] },
    { day: 'T', completed: [3, 3, 2, 3] },
    { day: 'F', completed: [2, 0, 3, 3] },
    { day: 'S', completed: [0, 0, 2, 0] },
    { day: 'S', completed: [3, 1, 0, 3] },
  ]);

  // Overall compliance calculations tied to interactive grid cells
  const totalCells = 7 * 4;
  const maxScore = totalCells * 3;
  const currentScore = heatmapData.reduce((sum, row) => sum + row.completed.reduce((a, b) => a + b, 0), 0);
  const compliancePercentage = Math.round((currentScore / maxScore) * 100);

  const toggleHeatmapCell = (rowIdx: number, colIdx: number) => {
    setHeatmapData(prev => prev.map((row, rI) => {
      if (rI === rowIdx) {
        const nextCompleted = [...row.completed];
        // Cycle levels: 0 (none) -> 1 (low) -> 2 (medium) -> 3 (high) -> 0
        nextCompleted[colIdx] = (nextCompleted[colIdx] + 1) % 4;
        return { ...row, completed: nextCompleted };
      }
      return row;
    }));
  };

  const getCellClassName = (level: number) => {
    return cn(
      "w-7 h-7 rounded border transition-all cursor-pointer active:scale-90 select-none",
      level === 0 && "bg-border/20 border-border/40 hover:bg-border/30",
      level === 1 && "bg-success/20 border-success/30 hover:bg-success/25",
      level === 2 && "bg-success/50 border-success/40 hover:bg-success/55",
      level === 3 && "bg-success/85 border-success/60 hover:bg-success/90"
    );
  };

  const getTodayIndices = () => {
    const today = new Date();
    const jsDay = today.getDay(); // 0 is Sunday, 1 is Monday...
    const dayRowMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
    const rowIdx = dayRowMap[jsDay] !== undefined ? dayRowMap[jsDay] : 0;
    
    const dayOfMonth = today.getDate();
    let colIdx = 0;
    if (dayOfMonth <= 7) colIdx = 0;
    else if (dayOfMonth <= 14) colIdx = 1;
    else if (dayOfMonth <= 21) colIdx = 2;
    else colIdx = 3;
    
    return { rowIdx, colIdx };
  };

  const incrementHabit = (id: string) => {
    const h = habits.find(habit => habit.id === id);
    if (!h) return;
    if (h.currentValue >= h.targetValue) return;

    const nextVal = h.currentValue + 1;
    const isCompletedNow = nextVal === h.targetValue;

    // Update habits state first
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        return { 
          ...habit, 
          currentValue: nextVal,
          streak: isCompletedNow ? habit.streak + 1 : habit.streak 
        };
      }
      return habit;
    }));

    if (isCompletedNow) {
      // 1. Automatically increment the completion level of today's cell in the matrix
      const { rowIdx, colIdx } = getTodayIndices();
      setHeatmapData(prevGrid => prevGrid.map((row, rI) => {
        if (rI === rowIdx) {
          const nextCompleted = [...row.completed];
          nextCompleted[colIdx] = Math.min(nextCompleted[colIdx] + 1, 3);
          return { ...row, completed: nextCompleted };
        }
        return row;
      }));

      // 2. Trigger ring reset after completion pulse delay
      setTimeout(() => {
        setHabits(currentHabits => currentHabits.map(habit => {
          if (habit.id === id) {
            return { ...habit, currentValue: 0 };
          }
          return habit;
        }));
        toast('Habit Completed!', `"${h.name}" progress reset for the next cycle.`, 'success');
      }, 850);
    }
  };

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newH: Habit = {
      id: `h-${Math.random()}`,
      name: newName,
      category: 'Life',
      currentValue: 0,
      targetValue: parseInt(newTarget) || 1,
      unit: newUnit,
      streak: 0,
      history: {}
    };

    setHabits([...habits, newH]);
    setShowAddModal(false);
    setNewName('');
    setNewTarget('1');
    setNewUnit('times');
    toast('Habit Created', `"${newName}" has been added to tracker.`, 'success');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-10">
      {/* Header Overview Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-display font-extrabold text-text flex items-center gap-2">
            <Target className="w-5.5 h-5.5 text-brand" />
            <span>Habit & Streaks Workspace</span>
          </h1>
          <p className="text-xs text-text-muted mt-1 font-medium">
            Build consistency. Current overall compliance: <span className="text-brand font-bold">{compliancePercentage}%</span>.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} className="h-10 text-xs px-4 flex gap-1.5 items-center">
          <Plus className="w-4.5 h-4.5" />
          <span>New Habit</span>
        </Button>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Habits list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {habits.map(h => {
            const pct = Math.min((h.currentValue / h.targetValue) * 100, 100);
            const radius = 24;
            const circumference = 2 * Math.PI * radius;
            const strokeOffset = circumference - (pct / 100) * circumference;

            return (
              <Card 
                key={h.id} 
                className="flex items-center justify-between p-5 hover:border-brand/20 transition-all select-none"
              >
                <div className="flex items-center gap-4">
                  {/* SVG Circular Progress Ring clickable to increment */}
                  <motion.div 
                    onClick={() => incrementHabit(h.id)}
                    animate={pct === 100 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="relative w-14 h-14 cursor-pointer flex items-center justify-center group shrink-0"
                  >
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="28" cy="28" r={radius} fill="none" stroke="var(--border)" strokeWidth="3" />
                      <motion.circle 
                        cx="28" 
                        cy="28" 
                        r={radius} 
                        fill="none" 
                        stroke={pct === 100 ? "var(--success)" : "var(--primary)"} 
                        strokeWidth="3" 
                        strokeDasharray={circumference}
                        animate={{ strokeDashoffset: strokeOffset }}
                        transition={{ duration: 0.4 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text group-hover:text-brand transition-colors">
                      {pct === 100 ? <Check className="w-5 h-5 text-success" /> : `+1`}
                    </div>
                  </motion.div>

                  <div>
                    <h4 className="text-sm font-bold text-text">{h.name}</h4>
                    <span className="text-[10px] text-text-muted mt-1 font-semibold flex items-center gap-1">
                      <span>Logged: {h.currentValue}/{h.targetValue} {h.unit}</span>
                      <span>•</span>
                      <span className="text-brand">{h.category}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs font-bold text-warning bg-warning/10 px-3 py-1.5 rounded-full shadow-sm">
                    <Flame className="w-4 h-4 fill-warning" />
                    <span>{h.streak}d streak</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Side: Heatmap Matrix */}
        <div className="flex flex-col gap-6">
          
          {/* Heatmap Card */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-extrabold text-text uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand" />
                <span>Weekly Grid Matrix</span>
              </h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Heatmap Matrix grid */}
              <div className="grid grid-cols-5 gap-2">
                <div className="text-[10px] font-bold text-text-muted select-none">Day</div>
                {[1, 2, 3, 4].map(w => (
                  <div key={w} className="text-[10px] font-bold text-text-muted text-center">W{w}</div>
                ))}

                {heatmapData.map((row, rIdx) => (
                  <React.Fragment key={rIdx}>
                    <div className="text-[10px] font-bold text-text-muted select-none self-center">{row.day}</div>
                    {row.completed.map((level, cIdx) => (
                      <div 
                        key={cIdx}
                        onClick={() => toggleHeatmapCell(rIdx, cIdx)}
                        className={getCellClassName(level)}
                        title={`Compliance Level ${level}/3 — Click to cycle`}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-[10px] text-text-muted font-bold mt-2 select-none border-t border-border/40 pt-2.5">
                <span>Less Focus</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-border/20 border border-border/40" />
                  <div className="w-2.5 h-2.5 rounded bg-success/20 border border-success/30" />
                  <div className="w-2.5 h-2.5 rounded bg-success/50 border border-success/40" />
                  <div className="w-2.5 h-2.5 rounded bg-success/85 border border-success/60" />
                </div>
                <span>High Compliance</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal for creating a new Habit */}
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
              <h3 className="text-base font-bold text-text mb-4">Create New Habit</h3>
              <form onSubmit={handleCreateHabit} className="flex flex-col gap-4">
                <Input
                  label="Habit Name"
                  placeholder="e.g. Read 15 pages, drink water"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  autoFocus
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Daily Goal"
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    required
                  />
                  <Input
                    label="Unit Name"
                    placeholder="e.g. glasses, hours"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    required
                  />
                </div>

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
                    Start Habit
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
