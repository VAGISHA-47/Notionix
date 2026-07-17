import React from "react";

interface AuroraProps {
  className?: string;
}

export const Aurora: React.FC<AuroraProps> = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
    <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-indigo-500/25 blur-[120px] animate-aurora-1" />
    <div className="absolute top-10 right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-violet-500/25 blur-[130px] animate-aurora-2" />
    <div className="absolute bottom-[-14rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-400/20 blur-[120px] animate-aurora-1" />
    <div className="absolute inset-0 grain opacity-[0.035]" />
  </div>
);
