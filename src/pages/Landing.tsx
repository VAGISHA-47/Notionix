import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Command, 
  ArrowRight, Check, ChevronDown, Activity, Quote,
  Layers, Clock, Calendar, Target
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  


  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Active Storyline Tab State
  const [activeStoryTab, setActiveStoryTab] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Chronological storyline: A Day in Notionix
  const dayStoryline = [
    {
      time: "08:00 AM",
      title: "Morning Alignment",
      subtitle: "Launch Raycast Command Bar",
      desc: "Tap Cmd+K from anywhere. Instantly search tasks, create a new folder, or decrypt private notes. Your fingers never leave the keyboard.",
      icon: <Command className="w-5 h-5 text-brand" />,
      color: "from-brand/10 to-transparent",
      accentColor: "text-brand"
    },
    {
      time: "02:00 PM",
      title: "Deep Work Scheduling",
      subtitle: "AI Reclaims Your Calendar",
      desc: "Contextual AI suggestions aggregate empty blocks on your calendar and prompt you to reserve focus times for high-priority coding.",
      icon: <Sparkles className="w-5 h-5 text-warning" />,
      color: "from-warning/10 to-transparent",
      accentColor: "text-warning"
    },
    {
      time: "08:00 PM",
      title: "Daily Reflections",
      subtitle: "Sync Matrix Heatmaps",
      desc: "Check off your logged habits (Hydration, Study). Progress circles scale, reset for tomorrow, and update your compliance matrix instantly.",
      icon: <Activity className="w-5 h-5 text-success" />,
      color: "from-success/10 to-transparent",
      accentColor: "text-success"
    }
  ];

  // Testimonials Array
  const testimonials = [
    {
      quote: "Notionix completely replaced three separate tools for me. The command palette makes creating notes instantly fast, and the calendar suggestions are incredibly smart.",
      author: "Sarah Jenkins",
      initials: "SJ",
      role: "Founder, AlphaFlow"
    },
    {
      quote: "I love the local encryption option. Being able to write down confidential roadmaps knowing they are secure behind passphrase padlocks is a massive game changer.",
      author: "Marcus Chen",
      initials: "MC",
      role: "Principal Architect, CoreOS"
    },
    {
      quote: "The habit tracker heatmap is highly addictive. Clicking cells to adjust my daily compliance and watching progress metrics sync instantly is exactly the loop I needed.",
      author: "Elena Rostova",
      initials: "ER",
      role: "Product Designer"
    }
  ];



  const faqData = [
    { 
      q: 'Is my note encryption password secure?', 
      a: 'Yes! Notionix encryption relies on local-first passphrase locks. We never upload or save your passwords to external databases. Try decryption using the standard password "1234".' 
    },
    { 
      q: 'How does the AI Workspace schedule calendar events?', 
      a: 'The AI assistant analyzes your current tasks priority levels and calendar slots, suggesting focused study blocks. You can accept or deny suggestions instantly in the calendar sidebar.' 
    },
    { 
      q: 'What visual customizers are supported in settings?', 
      a: 'Notionix features a premium Apple-inspired light theme with custom canvas backdrops, general preferences, notification alerts, auto-encryption security, and keyboard shortcut maps.' 
    },
  ];

  return (
    <div className="bg-bg text-text min-h-screen relative overflow-x-hidden flex flex-col font-sans transition-colors duration-300">
      
      {/* Decorative Aurora Blur Spheres (Soft mesh blobs drifting slowly) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[600px] h-[600px] bg-brand/3 rounded-full filter blur-[130px] top-[-10%] left-[15%]"
        />
        <motion.div
          animate={{
            x: [0, -60, 50, 0],
            y: [0, 80, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[500px] h-[500px] bg-brand-secondary/3 rounded-full filter blur-[130px] top-[15%] right-[10%]"
        />
      </div>

      {/* Nav bar */}
      <header className="h-20 max-w-7xl mx-auto w-full px-6 flex items-center justify-between border-b border-border/40 select-none z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-apple-md bg-gradient-to-tr from-brand to-brand-secondary flex items-center justify-center shadow-md">
            <span className="text-white font-black text-base">N</span>
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-text via-text to-text-muted bg-clip-text text-transparent">
            Notionix
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/auth')} 
            className="text-xs font-semibold h-10 px-3.5"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/auth')} 
            className="text-xs font-semibold h-10 px-4"
          >
            Launch App
          </Button>
        </div>
      </header>

      {/* Hero Section: Asymmetrical Split Layout */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-12 md:pt-20 pb-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Bold Typography & CTAs */}
        <div className="lg:col-span-7 text-left flex flex-col items-start">
          
          {/* Eyebrow Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold tracking-wider uppercase mb-6 select-none border border-brand/15">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI-Powered Focus Workspace</span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl tracking-tight leading-[1.05] text-text">
            Your second brain,<br />
            <span className="bg-gradient-to-r from-brand via-brand-secondary to-[#F43F5E] bg-clip-text text-transparent">
              finally organized.
            </span>
          </h1>
          
          <p className="text-sm md:text-base text-text-muted mt-6 max-w-xl leading-relaxed font-semibold">
            Notes, tasks, and calendar — unified by AI that actually understands your day. Notionix brings your focus into a single calm, intelligent flow.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => navigate('/auth')} 
                className="h-12 px-6 text-sm flex gap-1.5 items-center bg-gradient-to-tr from-brand to-brand-secondary shadow-md hover:shadow-brand/20 transition-shadow duration-300"
              >
                <span>Get started free</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
            <Button 
              variant="secondary"
              onClick={() => navigate('/auth')} 
              className="h-12 px-6 text-sm bg-panel border-border"
            >
              Request demo
            </Button>
          </div>

          {/* Abstract Placeholder Avatars & Trust Signal Strip */}
          <div className="mt-6 flex items-center gap-3 select-none text-[11px] font-bold text-text-muted">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full border border-bg bg-brand-secondary/20 flex items-center justify-center text-[8px] font-extrabold text-brand-secondary">SJ</div>
              <div className="w-6 h-6 rounded-full border border-bg bg-brand/25 flex items-center justify-center text-[8px] font-extrabold text-brand">MC</div>
              <div className="w-6 h-6 rounded-full border border-bg bg-[#F43F5E]/20 flex items-center justify-center text-[8px] font-extrabold text-[#F43F5E]">ER</div>
            </div>
            <span>Loved by 12,000+ creators. No credit card required.</span>
          </div>
        </div>

        {/* Right Side: Interactive Abstract "Productivity Mindmap" (NO APP UI) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm aspect-square bg-panel/35 border border-border/80 rounded-apple-2xl relative overflow-hidden flex items-center justify-center p-6 backdrop-blur-md select-none shadow-[0_30px_70px_rgba(91,77,255,0.04)]">
            
            {/* Ambient background grid inside mindmap */}
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{
                backgroundImage: 'linear-gradient(#5B4DFF 1px, transparent 1px), linear-gradient(90deg, #5B4DFF 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Connecting SVG wires */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-45">
              <motion.line x1="50%" y1="50%" x2="25%" y2="25%" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" />
              <motion.line x1="50%" y1="50%" x2="75%" y2="25%" stroke="var(--primary)" strokeWidth="1.5" />
              <motion.line x1="50%" y1="50%" x2="75%" y2="75%" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" />
              <motion.line x1="50%" y1="50%" x2="25%" y2="75%" stroke="var(--primary)" strokeWidth="1.5" />
            </svg>

            {/* Central Node: AI Brain */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="absolute z-20 w-16 h-16 bg-gradient-to-tr from-brand to-brand-secondary rounded-full flex items-center justify-center shadow-lg text-white"
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
            </motion.div>

            {/* Node 1: Notes (Top-Left) */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              className="absolute top-[12%] left-[12%] z-10 bg-panel border border-border/80 rounded-apple-xl p-3 flex items-center gap-2 shadow-premium cursor-pointer"
            >
              <div className="w-7 h-7 bg-brand/10 rounded flex items-center justify-center text-brand">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-text uppercase tracking-wider">Notes</span>
            </motion.div>

            {/* Node 2: Tasks (Top-Right) */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              className="absolute top-[12%] right-[12%] z-10 bg-panel border border-border/80 rounded-apple-xl p-3 flex items-center gap-2 shadow-premium cursor-pointer"
            >
              <div className="w-7 h-7 bg-warning/10 rounded flex items-center justify-center text-warning">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-text uppercase tracking-wider">Tasks</span>
            </motion.div>

            {/* Node 3: Calendar (Bottom-Right) */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              className="absolute bottom-[12%] right-[12%] z-10 bg-panel border border-border/80 rounded-apple-xl p-3 flex items-center gap-2 shadow-premium cursor-pointer"
            >
              <div className="w-7 h-7 bg-success/10 rounded flex items-center justify-center text-success">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-text uppercase tracking-wider">Calendar</span>
            </motion.div>

            {/* Node 4: AI Command Palette (Bottom-Left) */}
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              className="absolute bottom-[12%] left-[12%] z-10 bg-panel border border-border/80 rounded-apple-xl p-3 flex items-center gap-2 shadow-premium cursor-pointer"
            >
              <div className="w-7 h-7 bg-brand-secondary/10 rounded flex items-center justify-center text-brand-secondary">
                <Command className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-text uppercase tracking-wider">Commands</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Storyline Section: A Day In Notionix */}
      <section className="bg-panel/40 border-y border-border/60 py-20 z-10">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="text-center mb-12 select-none">
            <span className="text-[9px] font-bold text-brand uppercase tracking-wider">The Notionix Routine</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text mt-1.5">
              A Day In Notionix.
            </h2>
            <p className="text-xs text-text-muted mt-2 font-medium">Follow how context and productivity merge throughout the day.</p>
          </div>

          {/* Interactive tabs representing timeline events */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
            
            {/* Left side: Timeline Nav buttons */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {dayStoryline.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStoryTab(idx)}
                  className={cn(
                    "p-4 rounded-apple-xl border text-left transition-all flex gap-4 select-none cursor-pointer",
                    activeStoryTab === idx
                      ? "border-brand bg-panel ring-2 ring-brand/10 shadow-premium"
                      : "border-border/60 bg-panel/30 hover:bg-panel/60"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-apple-md flex items-center justify-center shrink-0 shadow-sm",
                    activeStoryTab === idx ? "bg-brand text-white" : "bg-border/60 text-text-muted"
                  )}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{item.time}</span>
                    <h4 className="text-xs font-extrabold text-text mt-0.5">{item.title}</h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Right side: Detailed Tab Display */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStoryTab}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-panel border border-border p-8 rounded-apple-2xl shadow-premium relative overflow-hidden"
                >
                  {/* Decorative background shadow */}
                  <div className={cn("absolute inset-0 bg-gradient-to-tr opacity-[0.03] pointer-events-none", dayStoryline[activeStoryTab].color)} />

                  <span className="text-[10px] font-extrabold text-brand uppercase tracking-wider block">
                    {dayStoryline[activeStoryTab].subtitle}
                  </span>
                  
                  <h3 className="font-display font-extrabold text-lg md:text-xl text-text mt-2">
                    {dayStoryline[activeStoryTab].title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed font-semibold mt-4">
                    {dayStoryline[activeStoryTab].desc}
                  </p>

                  <div className="mt-8 flex gap-3 border-t border-border/30 pt-5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Triggers automatically</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 max-w-7xl mx-auto w-full px-6 z-10 border-b border-border/40">
        <div className="text-center mb-12 select-none">
          <span className="text-[9px] font-bold text-brand uppercase tracking-wider">Simple Pricing</span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text mt-1.5">
            Start free. Upgrade when ready.
          </h2>
          <p className="text-xs text-text-muted mt-2 font-medium">No credit card required. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">

          {/* Card 1: Free (4 months) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <Card className="bg-panel border-border p-7 flex flex-col justify-between h-full">
              <div>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block mb-1">Free Trial</span>
                <h3 className="text-base font-bold text-text mb-1">Starter</h3>
                <p className="text-xs text-text-muted font-medium mb-6">Try everything free for 4 months.</p>
                <div className="flex items-end gap-1.5 mb-2">
                  <span className="text-4xl font-display font-extrabold text-text">$0</span>
                  <span className="text-xs text-text-muted font-bold mb-1">/ 4 months</span>
                </div>
                <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full inline-block mb-6">Free for 4 months</span>
                <ul className="flex flex-col gap-3">
                  {['Unlimited notes & folders', 'Tasks & calendar view', 'Basic AI suggestions', 'Journal & habit tracker'].map(f => (
                    <li key={f} className="flex gap-2.5 items-center text-xs text-text font-medium">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => navigate('/auth')} variant="secondary" className="w-full h-11 text-xs font-semibold mt-8 border-border">
                Get started free
              </Button>
            </Card>
          </motion.div>

          {/* Card 2: $5/month — Popular */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="bg-panel border-brand ring-4 ring-brand/10 shadow-[0_15px_40px_rgba(91,77,255,0.07)] scale-[1.02] p-7 flex flex-col justify-between h-full relative">
              <span className="absolute top-4 right-4 bg-brand text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Most Popular</span>
              <div>
                <span className="text-[9px] font-bold text-brand uppercase tracking-wider block mb-1">Pro</span>
                <h3 className="text-base font-bold text-text mb-1">Workspace Pro</h3>
                <p className="text-xs text-text-muted font-medium mb-6">Everything you need to stay in flow.</p>
                <div className="flex items-end gap-1.5 mb-6">
                  <span className="text-4xl font-display font-extrabold text-text">$5</span>
                  <span className="text-xs text-text-muted font-bold mb-1">/ month</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {['All Starter features', 'Local passphrase encryption', 'AI scheduling assistant', 'Priority weekly heatmaps', 'Custom wallpaper uploads'].map(f => (
                    <li key={f} className="flex gap-2.5 items-center text-xs text-text font-medium">
                      <Check className="w-4 h-4 text-brand shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => navigate('/auth')} className="w-full h-11 text-xs font-bold mt-8 bg-gradient-to-tr from-brand to-brand-secondary shadow-md">
                Start Pro
              </Button>
            </Card>
          </motion.div>

          {/* Card 3: $10/month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="bg-panel border-border p-7 flex flex-col justify-between h-full">
              <div>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block mb-1">Team</span>
                <h3 className="text-base font-bold text-text mb-1">Ecosystem Team</h3>
                <p className="text-xs text-text-muted font-medium mb-6">Collaborate and scale with your team.</p>
                <div className="flex items-end gap-1.5 mb-6">
                  <span className="text-4xl font-display font-extrabold text-text">$10</span>
                  <span className="text-xs text-text-muted font-bold mb-1">/ month</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {['All Pro features', 'Shared command palettes', 'Admin roles & permissions', 'Uncapped AI assistant', 'Priority email support'].map(f => (
                    <li key={f} className="flex gap-2.5 items-center text-xs text-text font-medium">
                      <Check className="w-4 h-4 text-brand-secondary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => navigate('/auth')} variant="secondary" className="w-full h-11 text-xs font-semibold mt-8 border-border">
                Start Team
              </Button>
            </Card>
          </motion.div>

        </div>
      </section>

      {/* Elegant Testimonials (Signature Spotlight style) */}
      <section className="py-20 bg-bg z-10 border-b border-border/40">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="text-center mb-16 select-none">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text">
              Loved by creators.
            </h2>
            <p className="text-xs text-text-muted mt-2 font-medium">Uncompromising reviews from designers, developers, and founders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((test, idx) => (
              <motion.div
                key={test.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card 
                  className="bg-panel border-border p-6 flex flex-col justify-between h-full relative"
                >
                  <Quote className="absolute top-5 right-5 w-8 h-8 text-border/40 stroke-[1.5] rotate-180" />
                  
                  <p className="text-xs leading-relaxed text-text font-semibold italic relative z-10 mb-6">
                    "{test.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border border-border select-none",
                      idx === 0 && "bg-brand/10 text-brand",
                      idx === 1 && "bg-brand-secondary/10 text-brand-secondary",
                      idx === 2 && "bg-[#F43F5E]/10 text-[#F43F5E]"
                    )}>
                      {test.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-text">{test.author}</h4>
                      <span className="text-[9px] font-bold text-text-muted">{test.role}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 border-t border-border/40 max-w-3xl mx-auto w-full px-6 z-10">
        <h2 className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-text text-center mb-10 select-none">
          Frequently asked questions
        </h2>

        <div className="flex flex-col gap-3 select-none">
          {faqData.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-border rounded-apple-lg bg-panel overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-text text-left outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-text-muted transition-transform duration-200", isOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 pt-1 text-xs text-text-muted leading-relaxed font-semibold border-t border-border/10">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="mt-auto border-t border-border/40 bg-panel/30 py-10 select-none text-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-text-muted font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-brand to-brand-secondary flex items-center justify-center text-white text-[8px] font-bold">N</div>
            <span>© 2026 Notionix Workspace Inc. All rights reserved.</span>
          </div>
          
          <div className="flex gap-5">
            <a href="#" className="hover:text-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
