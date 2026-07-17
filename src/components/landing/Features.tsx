import React from "react";
import { motion } from "framer-motion";
import { FEATURES } from "./content";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const ACCENT = {
  indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
  violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
  success: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  warning: "bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
  danger: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
};

export const Features: React.FC = () => (
  <section id="features" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <Reveal className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Everything, together</span>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-slate-900 md:text-5xl">
          Eight tools that finally feel like one.
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Each piece is powerful on its own — but the magic is how they share context, so your work never gets lost between them.
        </p>
      </Reveal>

      <div className="mt-14 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.06 }}
              data-testid={`feature-card-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-7 shadow-ambient transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-ambient-lg ${f.span}`}
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-300 ${ACCENT[f.accent]}`}>
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div className="mt-8">
                <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.copy}</p>
              </div>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/0 to-violet-500/0 blur-2xl transition-colors duration-500 group-hover:from-indigo-500/10 group-hover:to-violet-500/10" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
