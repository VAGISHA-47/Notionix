import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { NAV_LINKS } from "./content";

interface NavbarProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

const Logo: React.FC = () => (
  <a href="#top" data-testid="nav-logo" className="flex items-center gap-2.5 group">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-glow transition-transform duration-300 group-hover:-translate-y-0.5">
      <Command className="h-4 w-4" strokeWidth={2.4} />
    </span>
    <span className="font-display text-lg font-semibold tracking-tight text-slate-900">Notionix</span>
  </a>
);

export const Navbar: React.FC<NavbarProps> = ({ onSignIn, onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div
          className={`mt-4 flex items-center justify-between rounded-full border px-4 py-2.5 transition-[background-color,box-shadow,border-color] duration-300 md:px-5 ${
            scrolled
              ? "border-slate-200/70 bg-white/75 shadow-ambient backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-900/5 hover:text-slate-900"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={onSignIn}
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 sm:block"
              data-testid="nav-signin"
            >
              Sign in
            </button>
            <button
              onClick={onGetStarted}
              data-testid="nav-get-started"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-ambient active:scale-95"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
