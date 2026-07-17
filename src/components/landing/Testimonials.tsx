import React from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "./content";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export const Testimonials: React.FC = () => (
  <section className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <Reveal className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Loved in the wild</span>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-slate-900 md:text-5xl">
          The last productivity app they&apos;ll try.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.07 }}
            data-testid={`testimonial-${i}`}
            className="flex flex-col justify-between rounded-[24px] border border-slate-200/80 bg-white p-7 shadow-ambient transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-ambient-lg"
          >
            <blockquote className="text-[15px] leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${t.from} ${t.to} text-xs font-bold ${t.text}`}>
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{t.name}</span>
                <span className="block text-xs text-slate-500">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
