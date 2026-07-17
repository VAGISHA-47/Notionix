import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "./content";
import { Reveal } from "./Reveal";

interface ItemProps {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
  idx: number;
}

const Item: React.FC<ItemProps> = ({ faq, open, onToggle, idx }) => (
  <div className="border-b border-slate-200">
    <button
      onClick={onToggle}
      data-testid={`faq-question-${idx}`}
      className="flex w-full items-center justify-between gap-6 py-6 text-left"
    >
      <span className="font-display text-lg font-medium tracking-tight text-slate-900 md:text-xl">{faq.q}</span>
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-200 ${open ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}
      >
        <Plus className="h-4 w-4" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p data-testid={`faq-answer-${idx}`} className="max-w-2xl pb-7 text-[15px] leading-relaxed text-slate-600">
            {faq.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Questions</span>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-slate-900 md:text-5xl">
            Good to know.
          </h2>
          <p className="mt-4 text-lg text-slate-600">Everything you might wonder before making Notionix your home base.</p>
        </Reveal>
        <div className="lg:col-span-8">
          {FAQS.map((faq, i) => (
            <Item key={i} idx={i} faq={faq} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};
