import {
  FileText, ListChecks, CalendarDays, Sparkles, Flame,
  BookHeart, Command, Lock,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const FEATURES = [
  {
    icon: FileText,
    title: "Notes",
    copy: "A rich editor with folders, tags and one-tap AI actions — plus backgrounds that make blank pages feel yours.",
    span: "lg:col-span-2 lg:row-span-2",
    accent: "indigo" as const,
  },
  {
    icon: ListChecks,
    title: "Tasks",
    copy: "A calm daily list. Priorities, reminders, nothing shouting for attention.",
    span: "",
    accent: "violet" as const,
  },
  {
    icon: CalendarDays,
    title: "Calendar",
    copy: "Month, week and day views with AI that suggests when to actually do the work.",
    span: "",
    accent: "indigo" as const,
  },
  {
    icon: Sparkles,
    title: "AI Workspace",
    copy: "Chat, summarize, generate flashcards and build study plans — grounded in your own notes.",
    span: "lg:col-span-2",
    accent: "violet" as const,
  },
  {
    icon: Flame,
    title: "Habit Tracker",
    copy: "Streaks, a weekly heatmap and progress rings that keep momentum visible.",
    span: "",
    accent: "success" as const,
  },
  {
    icon: BookHeart,
    title: "Journal",
    copy: "A daily mood check-in with gentle AI summaries of how your week really went.",
    span: "",
    accent: "warning" as const,
  },
  {
    icon: Command,
    title: "Command Bar",
    copy: "Jump anywhere and run any action from a single keystroke. No mouse required.",
    span: "",
    accent: "indigo" as const,
  },
  {
    icon: Lock,
    title: "Encryption",
    copy: "Lock private notes behind a passphrase. Yours to read, no one else's.",
    span: "",
    accent: "danger" as const,
  },
];

export const MANIFESTO = [
  {
    n: "01",
    title: "One workspace, not ten tabs.",
    copy: "Your notes, tasks, calendar and journal live in the same calm space — so context never gets lost between apps.",
  },
  {
    n: "02",
    title: "AI that understands your day.",
    copy: "Not a chatbot bolted on. An assistant that reads your notes, plans your week and clears the busywork.",
  },
  {
    n: "03",
    title: "Fast enough to disappear.",
    copy: "Keyboard-first, instant everywhere. The best tool is the one you stop thinking about.",
  },
  {
    n: "04",
    title: "Private by default.",
    copy: "Passphrase-locked notes and local encryption mean your second brain stays exactly that — yours.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "I closed six apps the week I switched. My notes, planning and daily review finally live in one place.",
    name: "Maya Okafor",
    role: "Design Lead, Northwind",
    initials: "MO",
    from: "from-indigo-100", to: "to-violet-100", text: "text-indigo-700",
  },
  {
    quote: "The AI actually plans my week from my notes. It feels less like a tool and more like a sharp assistant.",
    name: "Daniel Reyes",
    role: "Founder, Loopcraft",
    initials: "DR",
    from: "from-violet-100", to: "to-fuchsia-100", text: "text-violet-700",
  },
  {
    quote: "Command bar plus encrypted notes is the combo I didn't know I needed. Fast, private, calm.",
    name: "Aisha Rahman",
    role: "PhD Researcher",
    initials: "AR",
    from: "from-emerald-100", to: "to-indigo-100", text: "text-emerald-700",
  },
  {
    quote: "It's the first productivity app my whole team actually kept using after month one.",
    name: "Tomás Vidal",
    role: "Ops Manager, Cadence",
    initials: "TV",
    from: "from-amber-100", to: "to-violet-100", text: "text-amber-700",
  },
];

export const PLANS = [
  {
    name: "Starter Canvas",
    monthly: 0,
    yearly: 0,
    tagline: "Everything you need to start thinking clearly.",
    features: [
      "Unlimited basic notes",
      "Standard checklist views",
      "Manual styling modes",
      "Calendar day view",
    ],
    cta: "Get started free",
    popular: false,
  },
  {
    name: "Workspace Pro",
    monthly: 8,
    yearly: 5.6,
    tagline: "For people who live inside their workspace.",
    features: [
      "All notes, folders & tags",
      "Local passphrase encryption",
      "AI study roadmap builder",
      "Weekly habit streak heatmap",
      "Priority timeline view",
    ],
    cta: "Start Pro trial",
    popular: true,
  },
  {
    name: "Ecosystem Team",
    monthly: 20,
    yearly: 14,
    tagline: "Shared brainpower for whole teams.",
    features: [
      "Shared command palettes",
      "Admin roles & permissions",
      "Custom wallpaper uploads",
      "Priority support",
      "Uncapped AI assistant prompts",
    ],
    cta: "Talk to us",
    popular: false,
  },
];

export const FAQS = [
  {
    q: "Is my note encryption password secure?",
    a: "Passphrase-locked notes are encrypted locally on your device before they ever sync. We never store your passphrase, which also means we can't recover it — so keep it somewhere safe.",
  },
  {
    q: "How does the AI Workspace schedule calendar events?",
    a: "The assistant reads your tasks, deadlines and notes, then proposes time blocks around your existing calendar. Nothing is added until you approve it — you always stay in control.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your data stays yours. You can export everything to Markdown and JSON at any time, and we keep your workspace read-accessible for 30 days after cancellation so nothing is lost.",
  },
  {
    q: "Can I use Notionix on mobile?",
    a: "Yes. Notionix works across desktop and mobile with full sync, offline support and the same command bar wherever you are.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. The Starter Canvas plan is free forever and the Pro trial doesn't ask for a card until you decide to upgrade.",
  },
];
