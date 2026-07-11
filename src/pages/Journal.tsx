import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Image as ImageIcon, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils';

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  photos: string[];
  aiSummary?: string;
}

export const Journal: React.FC = () => {
  const { toast } = useToast();
  
  // Mood levels mock config
  const moods = [
    { emoji: '🎯', label: 'Focused', color: 'text-indigo-500 bg-indigo-50' },
    { emoji: '😃', label: 'Happy', color: 'text-amber-500 bg-amber-50' },
    { emoji: '😌', label: 'Calm', color: 'text-success bg-emerald-50' },
    { emoji: '⚡', label: 'Energetic', color: 'text-violet-500 bg-violet-50' },
    { emoji: '😴', label: 'Tired', color: 'text-slate-500 bg-slate-50' },
  ];

  const [selectedMood, setSelectedMood] = useState('Focused');
  const [contentVal, setContentVal] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummaryResult, setAiSummaryResult] = useState('');

  // Mock past entries
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 'j-1',
      date: 'Yesterday, July 10',
      mood: '😌 Calm',
      content: 'Finished coding the custom primitive theme bindings. Walked in Golden Gate park in the afternoon, it was clear and breezy. Listened to a podcast on tech scaling.',
      photos: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80'],
      aiSummary: 'You spent a peaceful day balancing codebase implementations and outdoor nature walks, indicating high cognitive recovery.'
    },
    {
      id: 'j-2',
      date: 'July 9, 2026',
      mood: '🎯 Focused',
      content: 'Configured Tailwind config files and resolved CSS rules. Set up the Vite TS scaffolding. Managed to sync packages in under 30 seconds.',
      photos: [],
      aiSummary: 'Highly productive technical session focus. Recommending early rest hours to buffer visual strain.'
    }
  ]);

  const [showPhotoDrawer, setShowPhotoDrawer] = useState(false);

  const mockPhotosList = [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=300&q=80',
  ];

  const togglePhotoSelection = (url: string) => {
    if (selectedPhotos.includes(url)) {
      setSelectedPhotos(prev => prev.filter(u => u !== url));
    } else {
      setSelectedPhotos(prev => [...prev, url]);
    }
  };

  const handleSaveEntry = () => {
    if (!contentVal.trim()) {
      toast('Cannot save empty journal', 'Write down something first.', 'warning');
      return;
    }

    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: 'Today, July 11',
      mood: `${moods.find(m => m.label === selectedMood)?.emoji} ${selectedMood}`,
      content: contentVal,
      photos: [...selectedPhotos],
      aiSummary: aiSummaryResult || undefined
    };

    setEntries([newEntry, ...entries]);
    setContentVal('');
    setSelectedPhotos([]);
    setAiSummaryResult('');
    toast('Journal Saved', 'Daily entry added to timeline.', 'success');
  };

  const triggerAISummary = () => {
    if (!contentVal.trim()) {
      toast('Empty content', 'Write content before summarizing.', 'warning');
      return;
    }
    
    setIsSummarizing(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setAiSummaryResult(
        `AI Review: You felt "${selectedMood}" today. Writing highlights a focus on tech workspace construction. Balance coding timelines with regular hydration blocks.`
      );
      toast('AI Reflection Generated', 'Ready to save.', 'success');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-display font-extrabold text-text flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-brand" />
            <span>Reflections & Journal</span>
          </h1>
          <p className="text-xs text-text-muted mt-1 font-medium">Log thoughts, capture memories, and study daily focus trends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Create Entry */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Card padding="md">
            {/* Mood selector */}
            <div className="mb-6">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-3">How do you feel today?</span>
              <div className="flex flex-wrap gap-2.5">
                {moods.map(m => {
                  const isActive = m.label === selectedMood;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setSelectedMood(m.label)}
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-apple-lg border transition-all hover:scale-102 active:scale-98",
                        isActive 
                          ? "border-brand ring-2 ring-brand/10 bg-brand/5 text-brand" 
                          : "border-border text-text hover:bg-border/25"
                      )}
                    >
                      <span className="text-sm">{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Textarea */}
            <div className="mb-5">
              <Textarea
                label="Daily Reflections"
                value={contentVal}
                onChange={(e) => setContentVal(e.target.value)}
                placeholder="What is on your mind? Document thoughts, blockers, or wins..."
                className="min-h-[160px]"
              />
            </div>

            {/* Photo selections & AI buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-border/45">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowPhotoDrawer(!showPhotoDrawer)}
                  className="h-10 text-xs px-3.5 flex gap-1.5 items-center"
                >
                  <ImageIcon className="w-4 h-4 text-brand" />
                  <span>Attach Memories ({selectedPhotos.length})</span>
                </Button>
                
                <Button
                  type="button"
                  variant="secondary"
                  onClick={triggerAISummary}
                  className="h-10 text-xs px-3.5 text-brand flex gap-1.5 items-center bg-brand/5 border-brand/10 hover:bg-brand/10"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Reflection</span>
                </Button>
              </div>

              <Button onClick={handleSaveEntry} className="h-10 text-xs px-5">
                Save Reflection
              </Button>
            </div>

            {/* Photo Drawer */}
            {showPhotoDrawer && (
              <div className="mt-4 p-4 border border-border rounded-apple-lg bg-bg/50 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Select photo memoirs</span>
                <div className="grid grid-cols-4 gap-3">
                  {mockPhotosList.map(url => {
                    const isSelected = selectedPhotos.includes(url);
                    return (
                      <div 
                        key={url}
                        onClick={() => togglePhotoSelection(url)}
                        className={cn(
                          "relative h-20 rounded-apple-md overflow-hidden cursor-pointer border-2 transition-all",
                          isSelected ? "border-brand scale-95" : "border-transparent hover:scale-102"
                        )}
                      >
                        <img src={url} alt="Memoir thumbnail" className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand/20 flex items-center justify-center text-white">
                            <Check className="w-6 h-6 stroke-[3px]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Review container */}
            <AnimatePresence>
              {(isSummarizing || aiSummaryResult) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 p-4 border border-brand/20 bg-brand/5 rounded-apple-lg flex flex-col gap-2 relative"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Review Reflection</span>
                  </div>
                  
                  {isSummarizing ? (
                    <div className="flex gap-1 py-1">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <p className="text-xs text-text leading-relaxed font-medium">{aiSummaryResult}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* Right Side: Timeline History */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-extrabold text-text-muted uppercase tracking-wider px-1">Memoirs Timeline</span>
          
          <div className="flex flex-col gap-4">
            {entries.map(e => (
              <Card key={e.id} padding="md" className="border border-border/80 flex flex-col gap-3">
                <div className="flex justify-between items-center select-none border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-text">{e.date}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-border/40 rounded-full">{e.mood}</span>
                </div>
                
                <p className="text-xs text-text-muted leading-relaxed font-medium">{e.content}</p>

                {e.photos.length > 0 && (
                  <div className="flex gap-2.5 mt-1 select-none">
                    {e.photos.map((p, idx) => (
                      <img key={idx} src={p} alt="Reflections memoirs" className="w-14 h-14 object-cover rounded-apple-md border border-border/50" />
                    ))}
                  </div>
                )}

                {e.aiSummary && (
                  <div className="bg-brand/5 border border-brand/10 p-2.5 rounded-apple-md text-[10px] text-brand font-semibold leading-relaxed flex gap-1.5 items-start">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{e.aiSummary}</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
