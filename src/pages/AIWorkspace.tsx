import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, Paperclip, MessageSquare, History, Bookmark, 
  RefreshCw, FileText, BrainCircuit
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  formatted?: boolean;
}

export const AIWorkspace: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'm-1', 
      sender: 'assistant', 
      text: "Hello Vagisha! I'm your Notionix AI Workspace companion. I can summarize notes, write study planners, translate content, or generate code. What are we building today?", 
      timestamp: '08:40 AM' 
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [history] = useState([
    'Refactoring Tailwind Config variables',
    'Explaining transformer attention weights',
    'Drafting SaaS user personas',
  ]);

  const [model, setModel] = useState('Gemini 3.5 Flash');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      setIsTyping(false);
      let aiText = "I've processed your query.";
      
      if (text.toLowerCase().includes('roadmap') || text.toLowerCase().includes('study')) {
        aiText = `### 📚 Custom Study Roadmap: React State & Architecture\n\n1. **Phase 1: Component Architecture** (Days 1-2)\n   - Understand composition over inheritance.\n   - Set up custom primitives with proper typescript bindings.\n\n2. **Phase 2: Animation & Touch Performance** (Days 3-4)\n   - Coordinate Framer Motion layouts.\n   - Ensure smooth 200-300ms transitions on all views.\n\nWould you like me to schedule these blocks on your Notionix Calendar?`;
      } else if (text.toLowerCase().includes('summarize')) {
        aiText = `### 📝 Note Summary: Notionix Architecture\n- **Styling**: Structured using CSS variables inside \`index.css\` combined with custom Tailwind rules.\n- **Transitions**: Utilizing spring layout animations and custom transition speeds.\n- **Encryptions**: Note password decrypt toggles are active.`;
      } else if (text.toLowerCase().includes('translate')) {
        aiText = `Here is the translation of your note:\n\n*English*: "Draft technical specifications for database sync."\n\n*Spanish*: "Borrador de especificaciones técnicas para la sincronización de la base de datos."`;
      } else if (text.toLowerCase().includes('flashcard')) {
        aiText = `### 🧠 Flashcard Set Generated (3 cards)\n\n- **Card 1 (Tailwind v3 vs v4)**: \n  *Front*: Does Tailwind v4 require a config file?\n  *Back*: No, v4 relies entirely on CSS imports.\n\n- **Card 2 (Radix)**:\n  *Front*: What is the main benefit of Radix-UI?\n  *Back*: Unstyled, accessible primitives out of the box.`;
      } else {
        aiText = `I have updated your notes list with suggested updates. I can also help you format this into a checklist, generate a study planner, or add flashcards. What would you like to try next?`;
      }

      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        formatted: true
      };

      setMessages(prev => [...prev, aiMsg]);
      toast('AI Response received', undefined, 'success');
    }, 1800);
  };

  const handleTemplateClick = (type: 'summary' | 'roadmap' | 'translate' | 'flashcards') => {
    switch (type) {
      case 'summary':
        handleSendMessage('Summarize my architecture notes.');
        break;
      case 'roadmap':
        handleSendMessage('Generate a React Study Roadmap.');
        break;
      case 'translate':
        handleSendMessage('Translate: Draft technical specifications for database sync.');
        break;
      case 'flashcards':
        handleSendMessage('Generate flashcards for CSS variables.');
        break;
    }
  };

  return (
    <div className="flex-1 flex gap-6 h-[calc(100vh-8rem)] min-h-0 relative">
      
      {/* Prompt History Sidebar */}
      <div className="w-56 shrink-0 flex flex-col gap-4 hidden md:flex">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Prompt History</span>
          <History className="w-4 h-4 text-text-muted" />
        </div>

        <div className="flex flex-col gap-1.5 overflow-y-auto">
          {history.map((h, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(h)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-apple-md hover:bg-border/20 text-left text-xs font-semibold text-text-muted hover:text-text transition-all truncate"
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-text-muted/65" />
              <span className="truncate">{h}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0 bg-panel/30 border border-border rounded-apple-xl overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-border bg-panel flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-text">Notionix AI Copilot</h3>
              <p className="text-[10px] text-text-muted font-medium mt-0.5">Online & ready</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-muted font-medium">Model:</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-transparent border-0 text-xs font-bold text-brand focus:ring-0 outline-none cursor-pointer"
            >
              <option value="Gemini 3.5 Flash">Gemini 3.5 Flash</option>
              <option value="Gemini 3.5 Pro">Gemini 3.5 Pro</option>
            </select>
          </div>
        </div>

        {/* Message Log Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col max-w-[80%] rounded-apple-lg p-3.5 shadow-sm text-sm border",
                  m.sender === 'user'
                    ? "self-end bg-brand text-white border-transparent"
                    : "self-start bg-panel text-text border-border"
                )}
              >
                {m.formatted ? (
                  <div className="prose prose-sm dark:prose-invert leading-relaxed space-y-2">
                    {m.text.split('\n\n').map((para, pIdx) => {
                      if (para.startsWith('###')) {
                        return <h4 key={pIdx} className="text-sm font-bold text-text-display mb-1">{para.replace('###', '').trim()}</h4>;
                      }
                      if (para.includes('- **Card')) {
                        return (
                          <div key={pIdx} className="bg-border/20 rounded p-2.5 my-2 border border-border/40 font-mono text-xs">
                            {para}
                          </div>
                        );
                      }
                      return <p key={pIdx} className="text-xs leading-normal">{para}</p>;
                    })}
                  </div>
                ) : (
                  <p className="leading-relaxed text-xs">{m.text}</p>
                )}
                <span className={cn(
                  "text-[9px] mt-1.5 self-end select-none",
                  m.sender === 'user' ? "text-white/60" : "text-text-muted"
                )}>
                  {m.timestamp}
                </span>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="self-start bg-panel text-text border border-border rounded-apple-lg p-3.5 shadow-sm flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested AI templates widgets */}
        {messages.length === 1 && (
          <div className="px-6 py-2 grid grid-cols-2 lg:grid-cols-4 gap-3 select-none">
            <button
              onClick={() => handleTemplateClick('summary')}
              className="p-3 border border-border bg-panel hover:bg-border/20 text-left rounded-apple-lg transition-all group flex flex-col gap-1.5"
            >
              <FileText className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-text truncate">Summarize note</span>
              <span className="text-[9px] text-text-muted truncate">Extract key bullet points</span>
            </button>
            <button
              onClick={() => handleTemplateClick('roadmap')}
              className="p-3 border border-border bg-panel hover:bg-border/20 text-left rounded-apple-lg transition-all group flex flex-col gap-1.5"
            >
              <BrainCircuit className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-text truncate">Study Planner</span>
              <span className="text-[9px] text-text-muted truncate">Prepare a study roadmap</span>
            </button>
            <button
              onClick={() => handleTemplateClick('translate')}
              className="p-3 border border-border bg-panel hover:bg-border/20 text-left rounded-apple-lg transition-all group flex flex-col gap-1.5"
            >
              <RefreshCw className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-text truncate">Translate</span>
              <span className="text-[9px] text-text-muted truncate">English to Spanish</span>
            </button>
            <button
              onClick={() => handleTemplateClick('flashcards')}
              className="p-3 border border-border bg-panel hover:bg-border/20 text-left rounded-apple-lg transition-all group flex flex-col gap-1.5"
            >
              <Bookmark className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-bold text-text truncate">Make Flashcards</span>
              <span className="text-[9px] text-text-muted truncate">Quiz questions creator</span>
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-border bg-panel/75 backdrop-blur-md">
          <div className="flex gap-2.5 items-center">
            <button className="text-text-muted hover:text-text p-2 rounded-apple-md hover:bg-border/20 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
              placeholder="Ask anything or use command helpers..."
              className="flex-1 bg-bg-light/65 dark:bg-bg-dark/45 text-sm border border-border rounded-apple-md px-4 h-11 outline-none focus:border-brand/80"
            />
            <Button
              onClick={() => handleSendMessage(inputVal)}
              className="w-11 h-11 p-0 shrink-0 rounded-apple-md"
              disabled={!inputVal.trim()}
            >
              <Send className="w-4.5 h-4.5" />
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};
