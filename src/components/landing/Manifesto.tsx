import React from "react";
import { motion } from "framer-motion";
import { MANIFESTO } from "./content";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1];

export const Manifesto: React.FC = () => (
  <section id="manifesto" className="relative py-28 md:py-36">
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <Reveal className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">The idea</span>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-slate-900 md:text-5xl">
          We didn&apos;t need another app. We needed fewer of them.
        </h2>
      </Reveal>

      <div className="mt-16 divide-y divide-slate-200">
        {MANIFESTO.map((m) => (
          <motion.div
            key={m.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-4">
              <span className="font-display text-7xl font-bold tracking-tighter text-slate-900/[0.08] md:text-8xl">
                {m.n}
              </span>
            </div>
            <div className="md:col-span-8 md:pt-3">
              <h3 className="font-display text-2xl font-medium tracking-tight text-slate-900 md:text-3xl">
                {m.title}
              </h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600">{m.copy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
