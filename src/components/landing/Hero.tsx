import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Aurora } from "./Aurora";
import { KineticHeadline, FadeIn } from "./Reveal";
import { EmailCapture } from "./EmailCapture";

interface HeroProps {
  onRequestDemo: () => void;
}

const AVATARS = [
  { i: "MO", c: "from-indigo-400 to-violet-500" },
  { i: "DR", c: "from-violet-400 to-fuchsia-500" },
  { i: "AR", c: "from-emerald-400 to-indigo-500" },
  { i: "TV", c: "from-amber-400 to-rose-500" },
  { i: "JD?", c: "from-sky-400 to-indigo-500" },
];

export const Hero: React.FC<HeroProps> = ({ onRequestDemo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <motion.div style={{ y, opacity: fade }} className="absolute inset-0">
        <Aurora />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <FadeIn>
          <span
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 shadow-ambient backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered focus workspace
          </span>
        </FadeIn>

        <KineticHeadline
          lines={["Your second brain,", "finally organized."]}
          className="mx-auto mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.03] tracking-tight text-slate-900 md:text-7xl lg:text-[5.25rem]"
        />

        <FadeIn delay={0.5}>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg text-slate-600 md:text-xl">
            Notes, tasks, and calendar — unified by AI that actually understands your day.
            One calm workspace instead of ten open tabs.
          </p>
        </FadeIn>

        <FadeIn delay={0.65}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <EmailCapture source="hero" testid="hero-email" cta="Get started free" />
            <button
              onClick={onRequestDemo}
              data-testid="hero-request-demo"
              className="rounded-full border border-slate-300 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white active:scale-95"
            >
              Request demo
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a, i) => (
                <span
                  key={i}
                  className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${a.c} text-[10px] font-bold text-white ring-2 ring-slate-50`}
                >
                  {a.i}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Loved by thousands of creators. <span className="text-slate-400">No credit card required.</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
