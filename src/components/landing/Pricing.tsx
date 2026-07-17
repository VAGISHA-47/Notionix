import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PLANS } from "./content";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1];

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Pricing</span>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-slate-900 md:text-5xl">
            Simple pricing. Real value.
          </h2>
          <p className="mt-4 text-lg text-slate-600">Start free. Upgrade only when your second brain outgrows it.</p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 shadow-ambient">
            <button
              onClick={() => setYearly(false)}
              data-testid="pricing-toggle-monthly"
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${!yearly ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              data-testid="pricing-toggle-yearly"
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${yearly ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Yearly
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">Save 30%</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                data-testid={`pricing-card-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={`relative flex flex-col rounded-[24px] border p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 ${
                  p.popular
                    ? "border-indigo-300 bg-white shadow-glow ring-1 ring-indigo-200 lg:-mt-4 lg:mb-4"
                    : "border-slate-200/80 bg-white shadow-ambient hover:shadow-ambient-lg"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{p.tagline}</p>
                <div className="mt-6 flex items-end gap-1.5">
                  <span className="font-display text-5xl font-bold tracking-tight text-slate-900">${price}</span>
                  <span className="mb-1.5 text-sm text-slate-500">{price === 0 ? "forever" : yearly ? "/mo billed yearly" : "/month"}</span>
                </div>
                <button
                  onClick={() => onSelectPlan(p.name)}
                  data-testid={`pricing-cta-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`mt-7 w-full rounded-full px-6 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    p.popular
                      ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-glow hover:shadow-[0_14px_46px_-6px_rgba(79,70,229,0.6)]"
                      : "border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:shadow-ambient"
                  }`}
                >
                  {p.cta}
                </button>
                <ul className="mt-8 space-y-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
