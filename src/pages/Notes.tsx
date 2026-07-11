import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Folder, FolderPlus, Plus, Star, Lock, Unlock, 
  Sparkles, Palette, Bold, Italic, List, Code, Image as ImageIcon,
  Upload, X, RotateCcw, Check, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils';

type WallpaperType = 'color' | 'gradient' | 'gallery' | 'custom';
type LayoutWidth = 'compact' | 'comfortable' | 'wide';

interface NoteWallpaper {
  type: WallpaperType;
  value: string; // color code, gradient string, or gallery/custom key
  opacity: number; // 0-100
  blur: number; // 0-20
  brightness: number; // 0-200
  font: string; // Inter, Geist, Poppins, IBM Plex, Merriweather
  width: LayoutWidth;
}

interface Note {
  id: string;
  title: string;
  body: string;
  folder: string;
  tags: string[];
  wallpaperSettings?: NoteWallpaper;
  isFavorite: boolean;
  isLocked: boolean;
  isDecrypted?: boolean; // session state
}

const defaultWallpaperSettings: NoteWallpaper = {
  type: 'color',
  value: '#FFFFFF',
  opacity: 100,
  blur: 0,
  brightness: 100,
  font: 'Inter',
  width: 'comfortable'
};

// --- Local CSS Wallpaper Gallery Presets (High-Resolution Photographic scenery with solid fallbacks) ---
const galleryList = [
  { 
    name: 'Paper texture', 
    url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: '#FAF6EE', 
      backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 0)', 
      backgroundSize: '12px 12px' 
    } 
  },
  { 
    name: 'Minimal grid', 
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: '#FFFFFF', 
      backgroundImage: 'linear-gradient(#E8ECF3 1px, transparent 1px), linear-gradient(90deg, #E8ECF3 1px, transparent 1px)', 
      backgroundSize: '14px 14px' 
    } 
  },
  { 
    name: 'Dotted journal', 
    url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: '#FCFBF9', 
      backgroundImage: 'radial-gradient(#D1D5DB 1px, transparent 0)', 
      backgroundSize: '14px 14px' 
    } 
  },
  { 
    name: 'Ruled notebook', 
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: '#FCF9F2', 
      backgroundImage: 'linear-gradient(#E5E7EB 1px, transparent 1px)', 
      backgroundSize: '100% 22px' 
    } 
  },
  { 
    name: 'Leather notebook', 
    url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(135deg, #6B3E26 0%, #3D2214 100%)' 
    } 
  },
  { 
    name: 'Marble', 
    url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 60%, #C7D2FE 100%)' 
    } 
  },
  { 
    name: 'Wood texture', 
    url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(to bottom, #854D0E, #451A03)' 
    } 
  },
  { 
    name: 'Clouds', 
    url: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(to top, #E0F2FE, #93C5FD)' 
    } 
  },
  { 
    name: 'Galaxy', 
    url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'radial-gradient(circle at center, #312E81 0%, #030712 100%)' 
    } 
  },
  { 
    name: 'Mountains', 
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(to bottom, #4B5563, #1F2937)' 
    } 
  },
  { 
    name: 'Rain', 
    url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(to bottom, #6B7280, #374151)' 
    } 
  },
  { 
    name: 'Forest', 
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(135deg, #065F46 0%, #022C22 100%)' 
    } 
  },
  { 
    name: 'Coffee', 
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(135deg, #DDB892 0%, #7F5539 100%)' 
    } 
  },
  { 
    name: 'Dark paper', 
    url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: '#1F2937', 
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0)', 
      backgroundSize: '16px 16px' 
    } 
  },
  { 
    name: 'Glass aesthetic', 
    url: 'https://images.unsplash.com/photo-1618005198143-e52834643521?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(135deg, #E0E7FF 0%, #F5F7FA 100%)' 
    } 
  },
  { 
    name: 'Ocean', 
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=85',
    style: { 
      background: 'linear-gradient(to top, #BAE6FD, #0284C7)' 
    } 
  },
];

const getWallpaperStyle = (type: WallpaperType, value: string): React.CSSProperties => {
  if (type === 'color') return { backgroundColor: value };
  if (type === 'gradient') return { background: value };
  if (type === 'gallery') {
    const item = galleryList.find(g => g.name === value);
    if (item) {
      return {
        backgroundImage: `url(${item.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return { backgroundColor: '#FFFFFF' };
  }
  if (type === 'custom') {
    return {
      backgroundImage: `url(${value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }
  return { backgroundColor: '#FFFFFF' };
};

export const Notes: React.FC = () => {
  const { toast } = useToast();
  
  // Folders & Notes Mock State
  const [folders, setFolders] = useState(['Productivity', 'Personal', 'Work', 'Ideas']);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null); // null represents "All Notes"
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarsCollapsed, setSidebarsCollapsed] = useState(false);
  
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: '1', 
      title: 'Notionix Architecture Design', 
      body: 'Building the component primitive library using Radix-inspired styles. Framer motion details: spring timing 400ms, hover lifts, slide-up modals, and Raycast search bar implementation details.',
      folder: 'Productivity', 
      tags: ['SaaS', 'React'], 
      wallpaperSettings: {
        type: 'gradient',
        value: 'linear-gradient(135deg, #E9D5FF 0%, #C084FC 100%)', // Purple Dream
        opacity: 90,
        blur: 1,
        brightness: 105,
        font: 'Poppins',
        width: 'comfortable'
      },
      isFavorite: true, 
      isLocked: false 
    },
    { 
      id: '2', 
      title: 'Personal Study Roadmap - AI & LLMs', 
      body: 'Enter the passphrase "1234" to decrypt this critical roadmap of studies. Focus on neural attention weights, transformers from scratch, and structural database bindings.', 
      folder: 'Productivity', 
      tags: ['AI', 'Guide'], 
      wallpaperSettings: {
        type: 'color',
        value: '#F5F2FC', // Soft Lavender
        opacity: 100,
        blur: 0,
        brightness: 100,
        font: 'Geist',
        width: 'compact'
      },
      isFavorite: true, 
      isLocked: true 
    },
    { 
      id: '3', 
      title: 'Weekly Grocery List', 
      body: 'Avocado, almond milk, organic eggs, dark chocolate (85%), blueberries, local honey, Greek yogurt, and coffee beans.', 
      folder: 'Personal', 
      tags: ['Life'], 
      wallpaperSettings: {
        type: 'gallery',
        value: 'Paper texture', // The key in our local galleryList
        opacity: 95,
        blur: 0,
        brightness: 98,
        font: 'IBM Plex',
        width: 'comfortable'
      },
      isFavorite: false, 
      isLocked: false 
    },
    { 
      id: '4', 
      title: 'SaaS Pitch deck bullets', 
      body: '1. Problem: Disconnected productivity tools. 2. Solution: Premium integrated workspaces with micro-AI assistance. 3. Target: Devs, founders, designers.', 
      folder: 'Ideas', 
      tags: ['SaaS', 'Pitch'], 
      wallpaperSettings: {
        type: 'color',
        value: '#FAF3EC', // Peach
        opacity: 100,
        blur: 0,
        brightness: 100,
        font: 'Inter',
        width: 'wide'
      },
      isFavorite: false, 
      isLocked: false 
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>('1');
  const [passphraseInput, setPassphraseInput] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const activeNote = notes.find(n => n.id === activeNoteId);

  // Dynamic textarea height calculation ref/effect
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && activeNote) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [activeNote?.body, activeNoteId]);

  // File Upload Helpers
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateWallpaperSettings({
            type: 'custom',
            value: reader.result
          });
          toast('Wallpaper Uploaded', 'Custom background set successfully.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectNote = (id: string) => {
    setActiveNoteId(id);
    setPassphraseInput('');
  };

  const handleUpdateNoteText = (bodyText: string) => {
    setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, body: bodyText } : n));
  };

  const handleUpdateNoteTitle = (titleText: string) => {
    setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, title: titleText } : n));
  };

  const toggleFavorite = (id: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id === id) {
        const status = !n.isFavorite;
        toast(status ? 'Added to Favorites' : 'Removed from Favorites', undefined, 'success');
        return { ...n, isFavorite: status };
      }
      return n;
    }));
  };

  // Note encryption actions
  const handleToggleEncryption = (id: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id === id) {
        const nextLockedState = !n.isLocked;
        toast(
          nextLockedState ? 'Note Encrypted' : 'Note Decrypted',
          nextLockedState ? 'This note now requires a passphrase to unlock.' : 'Encryption removed from note.',
          'success'
        );
        return { 
          ...n, 
          isLocked: nextLockedState,
          isDecrypted: !nextLockedState ? true : false 
        };
      }
      return n;
    }));
  };

  const handleDecryptNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphraseInput === '1234') {
      setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, isDecrypted: true } : n));
      toast('Note unlocked', 'Passphrase correct.', 'success');
    } else {
      toast('Incorrect passphrase', 'Try "1234" to decrypt.', 'error');
    }
  };

  const handleCreateNote = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newNote: Note = {
      id: newId,
      title: 'Untitled Note',
      body: 'Start writing here...',
      folder: selectedFolder || 'Productivity',
      tags: ['Draft'],
      wallpaperSettings: { ...defaultWallpaperSettings },
      isFavorite: false,
      isLocked: false
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newId);
    toast('Note created', `Added to folder: ${selectedFolder || 'Productivity'}`, 'success');
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim() && !folders.includes(newFolderName)) {
      setFolders([...folders, newFolderName]);
      setSelectedFolder(newFolderName);
      setShowFolderModal(false);
      setNewFolderName('');
      toast('Folder Created', `Folder "${newFolderName}" is active.`, 'success');
    }
  };

  // Update specific wallpaper details
  const updateWallpaperSettings = (updates: Partial<NoteWallpaper>) => {
    setNotes(prev => prev.map(n => {
      if (n.id === activeNoteId) {
        const current = n.wallpaperSettings || { ...defaultWallpaperSettings };
        return {
          ...n,
          wallpaperSettings: { ...current, ...updates }
        };
      }
      return n;
    }));
  };

  // AI Prompt actions
  const triggerAISummarize = () => {
    if (!activeNote) return;
    const summary = `\n\n**AI Summary**: This note details the roadmap/contents for "${activeNote.title}". Key highlights cover system primitives, component layouts, and encryption workflows.`;
    handleUpdateNoteText(activeNote.body + summary);
    toast('AI Summary Generated', 'Added to note contents.', 'success');
  };

  const filteredNotes = notes.filter(n => 
    (selectedFolder === null || n.folder === selectedFolder) && 
    (n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     n.body.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- Solid Color Swatches ---
  const solidsList = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Cream', value: '#FCFBF7' },
    { name: 'Soft Lavender', value: '#F5F2FC' },
    { name: 'Sky Blue', value: '#F0F6FC' },
    { name: 'Mint', value: '#F2F9F5' },
    { name: 'Peach', value: '#FAF3EC' },
    { name: 'Rose', value: '#FAF1F2' },
    { name: 'Slate', value: '#F1F5F9' },
  ];

  // --- Gradients ---
  const gradientsList = [
    { name: 'Purple Dream', value: 'linear-gradient(135deg, #E9D5FF 0%, #C084FC 100%)' },
    { name: 'Ocean', value: 'linear-gradient(135deg, #BAE6FD 0%, #38BDF8 100%)' },
    { name: 'Sunset', value: 'linear-gradient(135deg, #FFEDD5 0%, #FB923C 100%)' },
    { name: 'Aurora', value: 'linear-gradient(135deg, #CCFBF1 0%, #2DD4BF 100%)' },
    { name: 'Midnight', value: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)' },
    { name: 'Emerald', value: 'linear-gradient(135deg, #D1FAE5 0%, #34D399 100%)' },
    { name: 'Cotton Candy', value: 'linear-gradient(135deg, #FCE7F3 0%, #F472B6 100%)' },
    { name: 'Cherry Blossom', value: 'linear-gradient(135deg, #FFE4E6 0%, #FB7185 100%)' },
  ];

  const currentSettings = (activeNote && activeNote.wallpaperSettings) || defaultWallpaperSettings;

  return (
    <div className="flex-1 flex gap-6 relative items-start min-h-[calc(100vh-8rem)]">
      
      {/* Collapsed Sidebars Bar Affordance (thin edge tab when collapsed) */}
      {sidebarsCollapsed && (
        <button
          onClick={() => setSidebarsCollapsed(false)}
          className="w-5 hover:w-7 h-[calc(100vh-8rem)] bg-panel border-r border-border flex items-center justify-center text-text-muted hover:text-text hover:bg-border/25 transition-all shrink-0 cursor-pointer select-none rounded-l-apple-md"
          title="Expand sidebars panel"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}

      {/* 1st Column: Folders Navigation (Sticky to top of viewport) */}
      <AnimatePresence initial={false}>
        {!sidebarsCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 208, opacity: 1 }} // 208px = w-52
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 flex flex-col justify-between hidden md:flex h-[calc(100vh-8rem)] sticky top-0 overflow-y-auto pr-1 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Folders</span>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setShowFolderModal(true)}
                    className="text-text-muted hover:text-brand transition-colors p-0.5 rounded-full hover:bg-border/20"
                    title="Create folder"
                  >
                    <FolderPlus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setSidebarsCollapsed(true)}
                    className="text-text-muted hover:text-brand transition-colors p-0.5 rounded-full hover:bg-border/20"
                    title="Collapse panels"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-0.5">
                {/* All Notes folder option */}
                <button
                  onClick={() => setSelectedFolder(null)}
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-apple-md text-sm font-semibold transition-all text-left w-full ${
                    selectedFolder === null
                      ? 'bg-border/30 text-brand'
                      : 'text-text-muted hover:text-text hover:bg-border/10'
                  }`}
                >
                  <Folder className="w-4.5 h-4.5 shrink-0" />
                  <span>All Notes</span>
                </button>

                {folders.map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedFolder(f)}
                    className={`flex items-center gap-3.5 px-3 py-2.5 rounded-apple-md text-sm font-semibold transition-all text-left w-full ${
                      f === selectedFolder 
                        ? 'bg-border/30 text-brand' 
                        : 'text-text-muted hover:text-text hover:bg-border/10'
                    }`}
                  >
                    <Folder className="w-4.5 h-4.5 shrink-0" />
                    <span>{f}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2nd Column: Notes List (Sticky to top of viewport) */}
      <AnimatePresence initial={false}>
        {!sidebarsCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 288, opacity: 1 }} // 288px = w-72
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 border-r border-border pr-5 flex flex-col gap-4 min-w-0 h-[calc(100vh-8rem)] sticky top-0 overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full bg-panel border border-border text-xs rounded-apple-md pl-9 pr-3 h-10 outline-none focus:border-brand/80"
                />
              </div>
              <Button onClick={handleCreateNote} className="h-10 w-10 p-0 shrink-0">
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1">
              {filteredNotes.length > 0 ? (
                filteredNotes.map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelectNote(n.id)}
                    className={`p-4 border rounded-apple-lg cursor-pointer transition-all ${
                      n.id === activeNoteId 
                        ? 'border-brand ring-2 ring-brand/10 shadow-md bg-panel' 
                        : 'border-border bg-panel hover:border-border-light'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-1.5 min-w-0">
                      {/* Thumbnail preview next to title - CONDTIONALLY HIDDEN unless a folder is specifically selected */}
                      {n.id === activeNoteId && n.wallpaperSettings && selectedFolder !== null && (
                        <div 
                          className="w-7 h-7 rounded shrink-0 border border-border/60 shadow-sm transition-all"
                          style={getWallpaperStyle(n.wallpaperSettings.type, n.wallpaperSettings.value)}
                        />
                      )}
                      <h4 className="text-sm font-bold text-text truncate flex-1 leading-snug self-center">
                        {n.title}
                      </h4>
                      <div className="flex items-center gap-1 shrink-0 self-center">
                        {n.isLocked && <Lock className="w-3.5 h-3.5 text-warning" />}
                        {n.isFavorite && <Star className="w-3.5 h-3.5 text-warning fill-warning" />}
                      </div>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {n.isLocked && !n.isDecrypted ? 'This note is locked. Decrypt to read details.' : n.body}
                    </p>
                    <div className="flex gap-1.5 mt-3.5">
                      {n.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold bg-border/40 text-text-muted/80 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs text-text-muted">
                  No notes found.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3rd Column Layout: Rich Text Editor Card + Right Customizer Drawer (Flows naturally in height, scrollable at layout level) */}
      <div className="flex-1 flex flex-row min-w-0 bg-panel border border-border rounded-apple-xl overflow-hidden relative min-h-[calc(100vh-8rem)] h-fit">
        {activeNote ? (
          <>
            {/* Writing Canvas wrapper (Background spans the full dynamic height) */}
            <div className="flex-1 flex flex-col min-w-0 p-6 relative overflow-hidden min-h-[calc(100vh-8rem)] h-fit">
              
              {/* Wallpaper Canvas Background layers (Spans full edge to edge and top to bottom height) */}
              <div 
                className="absolute inset-0 transition-all duration-300 pointer-events-none"
                style={{
                  ...getWallpaperStyle(currentSettings.type, currentSettings.value),
                  filter: `blur(${currentSettings.blur}px) brightness(${currentSettings.brightness}%)`,
                  opacity: currentSettings.opacity / 100,
                }}
              />

              {/* Texture Layer (Subtle grid/paper grain overlay) */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,0,0,0.4) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Automatic Contrast Text Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: currentSettings.type === 'color' && currentSettings.value === '#FFFFFF'
                    ? 'transparent'
                    : currentSettings.brightness > 115 
                    ? 'rgba(0, 0, 0, 0.02)'
                    : currentSettings.brightness < 85
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'transparent'
                }}
              />

              {/* Note Controls Top Bar (Sticky/Fixed at the top of the card during page scrolling) */}
              <div className="flex items-center justify-between border-b border-border/45 pb-4 mb-4 select-none relative z-20 sticky top-0 py-1 backdrop-blur-xs">
                <div className="flex items-center gap-3">
                  {/* Star Favorite Button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleFavorite(activeNote.id)}
                    className="h-9 px-2.5 text-text-muted hover:text-warning"
                  >
                    <Star className={`w-4.5 h-4.5 ${activeNote.isFavorite ? 'text-warning fill-warning' : ''}`} />
                  </Button>
                  
                  {/* Encrypt Toggle Button */}
                  <button
                    onClick={() => handleToggleEncryption(activeNote.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                      activeNote.isLocked 
                        ? 'bg-warning/15 text-warning border border-warning/25' 
                        : 'bg-border/55 text-text-muted hover:text-text border border-transparent'
                    }`}
                  >
                    {activeNote.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    <span>{activeNote.isLocked ? 'Encrypt Active' : 'Encrypt Note'}</span>
                  </button>

                  {/* Customize Icon Button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCustomizerOpen(!customizerOpen)}
                    className={cn(
                      "h-9 px-2.5 text-text-muted hover:text-brand", 
                      customizerOpen && "text-brand bg-brand/5 border border-brand/10 shadow-sm"
                    )}
                    title="Customize background and layout"
                  >
                    <Palette className="w-4.5 h-4.5" />
                  </Button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={triggerAISummarize}
                    className="h-9 text-xs px-3 bg-gradient-to-tr from-brand to-brand-secondary text-white flex gap-1.5 items-center shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Summarize AI</span>
                  </Button>
                </div>
              </div>

              {/* Main Editor Area (Content flows naturally, stretching parents and driving page-level scrolling) */}
              <div className="flex-1 flex flex-col min-h-0 relative">
                {activeNote.isLocked && !activeNote.isDecrypted ? (
                  /* Passphrase screen */
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 backdrop-blur-md">
                    <div className="w-14 h-14 bg-warning/10 rounded-full flex items-center justify-center text-warning mb-4 shadow-sm border border-warning/20">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-text mb-1">Passphrase Protected</h3>
                    <p className="text-xs text-text-muted max-w-xs mb-6">This note details are encrypted. (Default passphrase: 1234)</p>
                    
                    <form onSubmit={handleDecryptNote} className="flex gap-2 w-full max-w-sm">
                      <Input
                        type="password"
                        placeholder="Enter passphrase"
                        value={passphraseInput}
                        onChange={(e) => setPassphraseInput(e.target.value)}
                        className="h-10 text-sm focus:ring-warning/20 focus:border-warning"
                      />
                      <Button type="submit" className="h-10 px-4 bg-warning hover:bg-warning/90 shrink-0 text-sm">
                        Unlock
                      </Button>
                    </form>
                  </div>
                ) : (
                  /* Full Editor Canvas */
                  <div 
                    className={cn(
                      "flex-1 flex flex-col gap-4 mx-auto w-full transition-all duration-300 relative z-10 pr-1.5",
                      currentSettings.width === 'compact' && "max-w-xl",
                      currentSettings.width === 'comfortable' && "max-w-3xl",
                      currentSettings.width === 'wide' && "max-w-full"
                    )}
                    style={{
                      fontFamily: currentSettings.font === 'Merriweather'
                        ? "'Merriweather', serif"
                        : currentSettings.font === 'Poppins'
                        ? "'Poppins', sans-serif"
                        : currentSettings.font === 'IBM Plex'
                        ? "'IBM Plex Sans', sans-serif"
                        : currentSettings.font === 'Geist'
                        ? "'Geist', sans-serif"
                        : "'Inter', sans-serif"
                    }}
                  >
                    {/* Note Title Input */}
                    <input
                      value={activeNote.title}
                      onChange={(e) => handleUpdateNoteTitle(e.target.value)}
                      className="w-full bg-transparent font-display font-extrabold text-xl md:text-2xl text-text outline-none border-b border-transparent focus:border-border/30 pb-2 shrink-0"
                      placeholder="Title your note..."
                    />

                    {/* Rich Editing Toolbar Simulation */}
                    <div className="flex items-center gap-1 py-1 px-2 bg-panel/75 border border-border/20 rounded-apple-md w-fit select-none shadow-sm shrink-0">
                      <button className="p-1.5 hover:bg-border/20 rounded text-text-muted hover:text-text"><Bold className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-border/20 rounded text-text-muted hover:text-text"><Italic className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-border/20 rounded text-text-muted hover:text-text"><List className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-border/20 rounded text-text-muted hover:text-text"><Code className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-border/20 rounded text-text-muted hover:text-text"><ImageIcon className="w-4 h-4" /></button>
                    </div>

                    {/* Note Body Text (Auto-growing to fit contents, removing all inner box scrollbars) */}
                    <textarea
                      ref={textareaRef}
                      value={activeNote.body}
                      onChange={(e) => handleUpdateNoteText(e.target.value)}
                      className="w-full bg-transparent text-sm leading-relaxed text-text outline-none resize-none placeholder:text-text-muted/30 pb-10 overflow-y-hidden shrink-0"
                      placeholder="Write anything..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Customizer Drawer (Sticky to top of viewport inside editor layout) */}
            <AnimatePresence>
              {customizerOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 330, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  className="w-[330px] shrink-0 border-l border-border bg-panel flex flex-col overflow-hidden relative z-20 h-[calc(100vh-8rem)] sticky top-0"
                >
                  {/* Drawer Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between select-none shrink-0 bg-panel">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4.5 h-4.5 text-brand" />
                      <span className="text-xs font-bold text-text uppercase tracking-wider">Customize Note</span>
                    </div>
                    <button 
                      onClick={() => setCustomizerOpen(false)}
                      className="p-1 hover:bg-border/20 text-text-muted hover:text-text rounded-apple-sm transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Drawer Scrollable Panel (One continuous scrollable body for all 8 sections) */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 select-none">
                    
                    {/* Section 1 — Solid Colors */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Section 1 — Solid Colors</span>
                      <div className="grid grid-cols-4 gap-2">
                        {solidsList.map((sol) => {
                          const isSelected = currentSettings.type === 'color' && currentSettings.value === sol.value;
                          return (
                            <button
                              key={sol.name}
                              onClick={() => updateWallpaperSettings({ type: 'color', value: sol.value })}
                              className={cn(
                                "w-11 h-11 rounded-apple-sm border relative transition-all active:scale-95 hover:scale-105 hover:shadow-sm",
                                isSelected ? "border-brand ring-2 ring-brand/10 shadow-sm" : "border-border/60 hover:border-brand/35"
                              )}
                              style={{ backgroundColor: sol.value }}
                              title={sol.name}
                            >
                              {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-apple-sm">
                                  <Check className="w-4 h-4 text-brand" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 2 — Gradients */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Section 2 — Gradients</span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {gradientsList.map((grad) => {
                          const isSelected = currentSettings.type === 'gradient' && currentSettings.value === grad.value;
                          return (
                            <button
                              key={grad.name}
                              onClick={() => updateWallpaperSettings({ type: 'gradient', value: grad.value })}
                              className={cn(
                                "h-14 rounded-apple-md border flex flex-col justify-end p-2 relative overflow-hidden transition-all active:scale-98 hover:scale-103 hover:shadow-sm",
                                isSelected ? "border-brand ring-2 ring-brand/10 shadow-sm" : "border-border hover:border-brand/35"
                              )}
                            >
                              <div className="absolute inset-0" style={{ background: grad.value }} />
                              <div className="relative z-10 flex justify-between items-center w-full">
                                <span className="text-[9px] font-bold text-white drop-shadow-sm truncate">{grad.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-sm" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 3 — Wallpaper Gallery */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Section 3 — Wallpaper Gallery</span>
                      <div className="grid grid-cols-3 gap-2">
                        {galleryList.map((gal) => {
                          const isSelected = currentSettings.type === 'gallery' && currentSettings.value === gal.name;
                          return (
                            <button
                              key={gal.name}
                              onClick={() => updateWallpaperSettings({ type: 'gallery', value: gal.name })}
                              className={cn(
                                "aspect-[4/3] rounded-apple-md border relative overflow-hidden transition-all active:scale-95 shadow-sm hover:scale-105 hover:shadow-md cursor-pointer",
                                isSelected ? "border-brand ring-2 ring-brand/10" : "border-border hover:border-brand/35"
                              )}
                              title={gal.name}
                            >
                              {/* Fallback CSS styling for offline safety */}
                              <div className="absolute inset-0 w-full h-full" style={gal.style} />

                              {/* Photographic preview image with graceful error handling */}
                              <img 
                                src={gal.url} 
                                alt={gal.name} 
                                className="absolute inset-0 w-full h-full object-cover z-10 rounded-apple-md"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                              
                              <div className="absolute inset-x-0 bottom-0 bg-black/20 backdrop-blur-xs flex items-center p-1 z-20">
                                <span className="text-[8px] font-bold text-white truncate max-w-full drop-shadow-sm leading-none">{gal.name}</span>
                              </div>
                              {isSelected && (
                                <div className="absolute inset-0 bg-brand/15 flex items-center justify-center z-20">
                                  <Check className="w-4.5 h-4.5 text-brand drop-shadow-md" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 4 — Upload Wallpaper */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Section 4 — Upload Wallpaper</span>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border/80 hover:border-brand/40 rounded-apple-lg p-4 text-center cursor-pointer transition-colors bg-panel/30 active:scale-[0.99]"
                      >
                        <Upload className="w-5 h-5 text-text-muted mx-auto mb-1.5" />
                        <span className="text-[10px] font-semibold text-text-muted">Drag an image or click to upload</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Section 5 — Adjustments */}
                    <div className="flex flex-col gap-3 border-t border-border/40 pt-3">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Section 5 — Adjustments</span>
                      
                      {/* Opacity */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[9px] font-bold text-text-muted">
                          <span>Opacity</span>
                          <span>{currentSettings.opacity}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={currentSettings.opacity}
                          onChange={(e) => updateWallpaperSettings({ opacity: Number(e.target.value) })}
                          className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                      </div>

                      {/* Wallpaper Blur */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[9px] font-bold text-text-muted">
                          <span>Wallpaper Blur</span>
                          <span>{currentSettings.blur}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={currentSettings.blur}
                          onChange={(e) => updateWallpaperSettings({ blur: Number(e.target.value) })}
                          className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                      </div>

                      {/* Brightness */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[9px] font-bold text-text-muted">
                          <span>Brightness</span>
                          <span>{currentSettings.brightness}%</span>
                        </div>
                        <input
                          type="range"
                          min="40"
                          max="160"
                          value={currentSettings.brightness}
                          onChange={(e) => updateWallpaperSettings({ brightness: Number(e.target.value) })}
                          className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                      </div>
                    </div>

                    {/* Section 6 — Font */}
                    <div className="flex flex-col gap-2 border-t border-border/40 pt-3">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Section 6 — Font</span>
                      <select
                        value={currentSettings.font}
                        onChange={(e) => updateWallpaperSettings({ font: e.target.value })}
                        className="w-full bg-panel border border-border text-xs rounded-apple-md px-3 h-10 outline-none focus:border-brand/80"
                      >
                        <option value="Inter">Inter (Sans-Serif)</option>
                        <option value="Geist">Geist (Modern Sans)</option>
                        <option value="Poppins">Poppins (Geometric)</option>
                        <option value="IBM Plex">IBM Plex (Technical)</option>
                        <option value="Merriweather">Merriweather (Classic Serif)</option>
                      </select>
                    </div>

                    {/* Section 7 — Layout */}
                    <div className="flex flex-col gap-2 border-t border-border/40 pt-3">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Section 7 — Layout</span>
                      <div className="grid grid-cols-3 gap-1 bg-border/20 p-1 rounded-apple-md">
                        {(['compact', 'comfortable', 'wide'] as const).map((widthVal) => (
                          <button
                            key={widthVal}
                            onClick={() => updateWallpaperSettings({ width: widthVal })}
                            className={cn(
                              "py-1.5 text-[9px] font-bold uppercase rounded-apple-sm transition-all",
                              currentSettings.width === widthVal
                                ? "bg-panel text-brand shadow-sm"
                                : "text-text-muted hover:text-text"
                            )}
                          >
                            {widthVal}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Section 8 — Reset Theme */}
                    <div className="border-t border-border/45 mt-2 pt-4 flex justify-center shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          updateWallpaperSettings({ ...defaultWallpaperSettings });
                          toast('Theme Reset', 'Restored editor to default light details.', 'info');
                        }}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-danger hover:underline hover:text-danger/90 uppercase tracking-wider"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Default</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8 text-text-muted text-sm select-none">
            Select a note or create a new one.
          </div>
        )}
      </div>

      {/* Modal for creating a new Folder */}
      <AnimatePresence>
        {showFolderModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFolderModal(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-panel border border-border w-full max-w-sm p-6 rounded-apple-xl shadow-premium z-10"
            >
              <h3 className="text-base font-bold text-text mb-4 select-none">Create Folder</h3>
              <form onSubmit={handleCreateFolder} className="flex flex-col gap-4">
                <Input
                  label="Folder Name"
                  placeholder="e.g. Finance, Architecture"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end gap-2.5">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowFolderModal(false)}
                    className="h-10 text-sm px-4"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-10 text-sm px-4"
                  >
                    Create
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
