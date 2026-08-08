"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    label: "Skin in the Game",
    description: "Sponsor commits ≥2.5% of the fund corpus — interests fully aligned with investors.",
  },
  {
    label: "Transparent Risk",
    description: "Every hedging decision is documented. Risk oversight is independent and continuous.",
  },
  {
    label: "Protection + Performance",
    description: "A single vehicle that simultaneously pursues return and manages downside — not a trade-off.",
  },
  {
    label: "Investor Alignment",
    description: "Performance fees only on profits above hurdle. We earn when you earn.",
  },
  {
    label: "High Conviction",
    description: "Concentrated positions in ideas we deeply understand — not passive index exposure.",
  },
  {
    label: "India-Specific",
    description: "Built for Indian market dynamics: VIX spikes, FII flows, rupee volatility — all accounted for.",
  },
];

export default function WhyEquitrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-surface)" }}
      aria-labelledby="why-heading"
    >
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.025 } : {}}
          transition={{ duration: 1.5 }}
          className="font-display text-[clamp(4rem,18vw,16rem)] whitespace-nowrap"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
        >
          PROTECTION
        </motion.span>
      </div>

      <div className="relative container-editorial">
        {/* Hero headline */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-number mb-5"
          >
            Why EquiTrust
          </motion.p>

          <motion.h2
            id="why-heading"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.02,
              maxWidth: "18ch",
            }}
          >
            Protection + Performance.
            <br />
            <em className="not-italic" style={{ color: "var(--accent-emerald)" }}>
              One Vehicle.
            </em>
          </motion.h2>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: "easeOut" }}
              className="group p-6 rounded-sm transition-all duration-300 relative overflow-hidden"
              style={{
                border: "0.5px solid var(--border-subtle)",
                backgroundColor: "var(--bg-base)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              {/* Number */}
              <span
                className="text-[0.55rem] font-medium tracking-widest uppercase mb-4 block"
                style={{ color: "var(--accent-emerald)" }}
              >
                0{i + 1}
              </span>

              <h3
                className="font-medium mb-3 text-sm leading-snug"
                style={{ color: "var(--text-primary)", letterSpacing: "0.01em" }}
              >
                {pillar.label}
              </h3>

              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {pillar.description}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: "var(--accent-emerald)", opacity: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
