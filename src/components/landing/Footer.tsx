import React from "react";
import { Command } from "lucide-react";
import { Aurora } from "./Aurora";
import { EmailCapture } from "./EmailCapture";
import { Reveal } from "./Reveal";

const COLUMNS = [
  { title: "Product", links: ["Features", "Pricing", "Command Bar", "Encryption", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA", "Status"] },
];

interface SocialProps {
  label: string;
  d: string;
}

const Social: React.FC<SocialProps> = ({ label, d }) => (
  <a
    href="#top"
    aria-label={label}
    data-testid={`social-${label.toLowerCase()}`}
    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600"
  >
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d={d} /></svg>
  </a>
);

export const Footer: React.FC = () => (
  <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
    {/* Closing CTA */}
    <section className="relative overflow-hidden">
      <Aurora className="opacity-70" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Think less about tools.<br />Think more about your work.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Join thousands building a calmer, sharper workspace. Free to start, no credit card.
          </p>
          <div className="mt-9 flex justify-center">
            <EmailCapture source="footer-cta" testid="footer-email" cta="Get started free" />
          </div>
        </Reveal>
      </div>
    </section>

    <div className="relative mx-auto max-w-7xl px-6 md:px-10">
      <div className="grid grid-cols-2 gap-10 border-t border-slate-200 py-16 md:grid-cols-6">
        <div className="col-span-2 md:col-span-3">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
              <Command className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-slate-900">Notionix</span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-slate-500">
            The AI-powered workspace for notes, tasks, calendar and focus. notionix.app
          </p>
          <div className="mt-6 flex gap-3">
            <Social label="Twitter" d="M18.9 1.2h3.7l-8 9.1L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.4h2L6.5 3.3H4.3l13.3 17.3Z" />
            <Social label="GitHub" d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            <Social label="LinkedIn" d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.4H3.5V9h3.6v11.4Z" />
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Massive wordmark */}
      <div className="relative select-none overflow-hidden pb-6">
        <span className="block bg-gradient-to-b from-slate-200 to-slate-50 bg-clip-text text-center font-display text-[22vw] font-bold leading-none tracking-tighter text-transparent">
          Notionix
        </span>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-8 text-sm text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} Notionix. All rights reserved.</p>
        <p>Made for people with too many tabs open.</p>
      </div>
    </div>
  </footer>
);
