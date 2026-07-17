import React from "react";

const WORDS = ["FLEXIBILITY", "PRECISION", "WARMTH", "SPEED", "FOCUS", "CLARITY"];

export const Ribbon: React.FC = () => {
  // Triple the list to ensure the seamless loop covers standard screen widths
  const loopedWords = [...WORDS, ...WORDS, ...WORDS];

  return (
    <section className="relative border-y border-slate-200/70 bg-white/50 py-6 overflow-hidden" aria-hidden="true">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {loopedWords.map((w, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span className="font-display text-3xl font-semibold tracking-tight text-slate-300 md:text-5xl">
              {w}
            </span>
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500" />
          </span>
        ))}
      </div>
    </section>
  );
};
