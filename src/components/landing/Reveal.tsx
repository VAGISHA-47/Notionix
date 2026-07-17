import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 28, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

interface KineticHeadlineProps {
  lines: string[];
  className?: string;
}

// Masked line-by-line kinetic reveal for hero headlines
export const KineticHeadline: React.FC<KineticHeadlineProps> = ({ lines, className = "" }) => (
  <h1 className={className} aria-label={lines.join(" ")}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.12em]" aria-hidden="true">
        <motion.span
          className="block"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.12 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </h1>
);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);
