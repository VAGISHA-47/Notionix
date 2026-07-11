import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, CheckSquare, Sparkles, Activity, Calendar, 
  TrendingUp, Award, Quote, CloudSun, ArrowRight, Zap, CheckCircle2, Circle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Habit Streaks Mock State
  const [habits, setHabits] = useState([
    { id: 1, name: 'Read 15 mins', completed: true, streak: 12 },
    { id: 2, name: 'Meditation', completed: false, streak: 5 },
    { id: 3, name: 'Leetcode Daily', completed: true, streak: 19 },
  ]);

  // Tasks Mock State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Refactor state selector in AppShell', done: false, time: '11:00 AM' },
    { id: 2, title: 'Draft technical specifications for database sync', done: true, time: '1:30 PM' },
    { id: 3, title: 'AI Workspace wireframe review', done: false, time: '4:00 PM' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextDone = !t.done;
        return { ...t, done: nextDone };
      }
      return t;
    }));
  };

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nextState = !h.completed;
        const newStreak = nextState ? h.streak + 1 : h.streak - 1;
        return { ...h, completed: nextState, streak: newStreak };
      }
      return h;
    }));
  };

  // Productivity Chart Mock Data
  const data = [
    { name: 'Mon', focusHours: 4.5 },
    { name: 'Tue', focusHours: 6.2 },
    { name: 'Wed', focusHours: 8.0 },
    { name: 'Thu', focusHours: 5.8 },
    { name: 'Fri', focusHours: 7.5 },
    { name: 'Sat', focusHours: 3.0 },
    { name: 'Sun', focusHours: 4.2 },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Warm Greeting Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-display font-extrabold text-text leading-tight tracking-tight"
          >
            Good morning, Vagisha.
          </motion.h1>
          <p className="text-sm text-text-muted mt-1 font-medium">
            Let's build something exceptional today. You have 2 tasks remaining.
          </p>
        </div>

        {/* Quick weather & Quote Widget */}
        <div className="flex items-center gap-3.5 bg-panel border border-border px-4 py-2.5 rounded-apple-lg shadow-sm">
          <div className="flex items-center gap-2 pr-3.5 border-r border-border">
            <CloudSun className="w-5 h-5 text-warning shrink-0" />
            <div className="text-right">
              <span className="text-xs font-bold text-text block">San Francisco</span>
              <span className="text-[10px] text-text-muted font-medium">68°F • Sunny</span>
            </div>
          </div>
          <div className="flex items-center gap-2 max-w-[200px] text-xs text-text-muted italic leading-snug">
            <Quote className="w-4 h-4 text-brand shrink-0 rotate-180 opacity-40" />
            <span>"Simplicity is the ultimate sophistication."</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          variant="secondary"
          onClick={() => navigate('/app/notes')}
          className="flex items-center justify-center gap-2.5 h-12 text-sm bg-panel"
        >
          <Plus className="w-4.5 h-4.5 text-brand" />
          <span>New Note</span>
        </Button>
        <Button 
          variant="secondary"
          onClick={() => navigate('/app/tasks')}
          className="flex items-center justify-center gap-2.5 h-12 text-sm bg-panel"
        >
          <CheckSquare className="w-4.5 h-4.5 text-brand" />
          <span>Add Task</span>
        </Button>
        <Button 
          variant="secondary"
          onClick={() => navigate('/app/ai')}
          className="flex items-center justify-center gap-2.5 h-12 text-sm bg-panel"
        >
          <Sparkles className="w-4.5 h-4.5 text-brand" />
          <span>Ask AI</span>
        </Button>
        <Button 
          variant="secondary"
          onClick={() => navigate('/app/habits')}
          className="flex items-center justify-center gap-2.5 h-12 text-sm bg-panel"
        >
          <Activity className="w-4.5 h-4.5 text-brand" />
          <span>Log Habit</span>
        </Button>
      </div>

      {/* Core Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Tasks & Habits */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Today's Tasks Card */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-brand" />
                <span>Today's Checklist</span>
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/app/tasks')}
                className="h-8 text-xs font-semibold px-2 text-brand flex gap-1 items-center"
              >
                <span>Full board</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              {tasks.map(t => (
                <div 
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className="flex items-center gap-3.5 p-3 rounded-apple-md hover:bg-border/10 cursor-pointer border border-transparent hover:border-border transition-all select-none"
                >
                  <button className="text-text-muted hover:text-brand transition-colors">
                    {t.done ? (
                      <CheckCircle2 className="w-5 h-5 text-success fill-success/10" />
                    ) : (
                      <Circle className="w-5 h-5 text-border" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-relaxed truncate ${t.done ? 'line-through text-text-muted' : 'text-text'}`}>
                      {t.title}
                    </p>
                    <span className="text-[10px] text-text-muted">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Productivity Chart Card */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand" />
                  <span>Focus Performance</span>
                </h3>
                <p className="text-xs text-text-muted mt-0.5">Average focus: 5.7 hrs/day</p>
              </div>
              <div className="flex items-center gap-1 text-success text-xs font-bold bg-success/10 px-2 py-0.5 rounded-full">
                <Zap className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--text-muted)" 
                    opacity={0.5} 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="var(--text-muted)" 
                    opacity={0.5} 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--panel)', 
                      borderColor: 'var(--border)',
                      borderRadius: '12px',
                      color: 'var(--text)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="focusHours" 
                    stroke="var(--primary)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#focusGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right column: AI Assistant, Calendar Preview & Habit widgets */}
        <div className="flex flex-col gap-6">
          
          {/* AI Assistant Quick Card */}
          <Card className="bg-gradient-to-tr from-brand/10 via-brand-secondary/5 to-transparent border border-brand/20">
            <div className="flex items-center gap-2 mb-3.5">
              <Sparkles className="w-5 h-5 text-brand" />
              <h3 className="text-sm font-extrabold text-text">AI Companion</h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Vagisha, I've analyzed your notes on "System Design". Would you like me to generate a 5-step mock interview plan for this afternoon?
            </p>
            <div className="mt-4 flex gap-2.5">
              <Button size="sm" onClick={() => navigate('/app/ai')} className="text-xs h-8 px-3">
                Yes, build it
              </Button>
              <Button size="sm" variant="ghost" className="text-xs h-8 px-3 text-text-muted hover:text-text">
                Dismiss
              </Button>
            </div>
          </Card>

          {/* Habits widget */}
          <Card padding="md">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand" />
              <span>Habit Tracker</span>
            </h3>
            
            <div className="flex flex-col gap-3">
              {habits.map(h => (
                <div 
                  key={h.id}
                  onClick={() => toggleHabit(h.id)}
                  className="flex items-center justify-between p-3 rounded-apple-md bg-bg-light/60 dark:bg-bg-dark/30 border border-border/50 cursor-pointer hover:border-brand/35 transition-all select-none"
                >
                  <div className="flex items-center gap-3">
                    {/* Compact Circle Progress */}
                    <div className="relative w-5 h-5">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="10" cy="10" r="8" fill="none" stroke="var(--border)" strokeWidth="2" />
                        <circle 
                          cx="10" 
                          cy="10" 
                          r="8" 
                          fill="none" 
                          stroke={h.completed ? "var(--success)" : "var(--primary)"} 
                          strokeWidth="2" 
                          strokeDasharray={2 * Math.PI * 8}
                          strokeDashoffset={h.completed ? 0 : 2 * Math.PI * 8 * 0.4}
                          className="transition-all duration-300"
                        />
                      </svg>
                    </div>
                    <span className={`text-xs font-semibold ${h.completed ? 'text-text-muted line-through' : 'text-text'}`}>
                      {h.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-text-muted bg-border/40 px-2 py-0.5 rounded-full">
                    {h.streak}d streak
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Calendar Preview Widget */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand" />
                <span>Up Next</span>
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/app/calendar')}
                className="h-8 text-xs font-semibold px-2 text-brand"
              >
                Calendar
              </Button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-start border-l-2 border-brand pl-3">
                <div className="shrink-0 text-right">
                  <span className="text-xs font-bold text-text block">12:30 PM</span>
                  <span className="text-[9px] text-text-muted font-medium">45 mins</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text">Weekly Design Sync</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">Focus: Component primitives & layout rhythms</p>
                </div>
              </div>

              <div className="flex gap-3 items-start border-l-2 border-border pl-3">
                <div className="shrink-0 text-right">
                  <span className="text-xs font-bold text-text block">3:00 PM</span>
                  <span className="text-[9px] text-text-muted font-medium">60 mins</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text">Review Study Flashcards</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">Subject: Cryptography & Node Encryptions</p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
