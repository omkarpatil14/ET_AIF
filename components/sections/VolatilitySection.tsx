"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const volatilityFactors = [
  {
    id: "vix",
    label: "India VIX",
    description:
      "India's volatility index has seen recurring spikes, reflecting heightened uncertainty in equity markets — from geopolitical flashpoints to monetary policy shifts.",
    stat: "↑ Elevated",
    color: "var(--accent-emerald)",
  },
  {
    id: "rupee",
    label: "Rupee Volatility",
    description:
      "The Indian Rupee has faced persistent pressure from global dollar strength, current account dynamics, and FII outflows — introducing currency risk into equity returns.",
    stat: "₹/$ Pressure",
    color: "var(--accent-gold)",
  },
  {
    id: "fii",
    label: "FII Flow Volatility",
    description:
      "Foreign Institutional Investor flows have become increasingly erratic, creating sharp dislocations in Indian equity and currency markets.",
    stat: "Unpredictable",
    color: "rgba(118, 123, 136, 0.9)",
  },
  {
    id: "geo",
    label: "Geopolitical Risk",
    description:
      "Regional tensions, global trade realignments, and supply chain disruptions have added structural volatility beyond traditional market cycles.",
    stat: "Rising",
    color: "rgba(200, 158, 42, 0.7)",
  },
  {
    id: "drawdowns",
    label: "Sharp Corrections",
    description:
      "Unhedged equity portfolios have experienced drawdowns exceeding 25–35% during stress events — without systematic protection, recovery timelines are extended.",
    stat: ">25% Events",
    color: "rgba(220, 38, 38, 0.8)",
  },
];

export default function VolatilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgTextOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, 0.06, 0]);
  const bgTextScale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: "var(--bg-surface)" }}
      aria-labelledby="volatility-heading"
    >
      {/* Large background VOLATILITY text */}
      <motion.div
        style={{ opacity: bgTextOpacity, scale: bgTextScale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display text-[clamp(5rem,20vw,18rem)] font-normal tracking-tighter"
          style={{ color: "var(--text-primary)", whiteSpace: "nowrap" }}
        >
          VOLATILITY
        </span>
      </motion.div>

      {/* Animated horizontal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 0.04 } : {}}
            transition={{ duration: 1.5, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 h-px origin-left"
            style={{ top: `${pos * 100}%`, backgroundColor: "var(--accent-gold)" }}
          />
        ))}
      </div>

      <div className="relative container-editorial">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-number mb-4"
          >
            The Problem
          </motion.p>

          <motion.h2
            id="volatility-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="font-display mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Volatility Is{" "}
            <em className="not-italic" style={{ color: "var(--accent-emerald)" }}>
              Rising.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Indian markets face a new era of structural volatility. Rising India VIX, rupee
            pressure, erratic FII flows, and geopolitical uncertainty have made unhedged equity
            exposure increasingly risky. Traditional portfolios are ill-equipped for this
            environment.
          </motion.p>
        </div>

        {/* Interactive factor list */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-0">
            {volatilityFactors.map((factor, i) => (
              <motion.button
                key={factor.id}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full text-left py-5 border-b group transition-all duration-300"
                style={{
                  borderColor: activeIndex === i ? "var(--border-accent)" : "var(--border-subtle)",
                }}
                aria-expanded={activeIndex === i}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[0.6rem] font-medium tracking-widest tabular-nums"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="text-sm font-medium tracking-wide transition-colors duration-200"
                      style={{
                        color: activeIndex === i ? "var(--text-primary)" : "var(--text-secondary)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {factor.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[0.65rem] font-medium tracking-wide"
                      style={{ color: factor.color }}
                    >
                      {factor.stat}
                    </span>
                    <span
                      className="text-lg transition-transform duration-200"
                      style={{
                        color: "var(--text-muted)",
                        transform: activeIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>

                {/* Expanded description */}
                <motion.div
                  initial={false}
                  animate={{ height: activeIndex === i ? "auto" : 0, opacity: activeIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    className="mt-4 pl-7 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {factor.description}
                  </p>
                </motion.div>
              </motion.button>
            ))}
          </div>

          {/* Right: editorial visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div
              className="relative h-80 rounded-sm overflow-hidden"
              style={{ border: "0.5px solid var(--border-subtle)" }}
            >
              {/* SVG volatility illustration */}
              <svg
                viewBox="0 0 400 200"
                className="w-full h-full"
                style={{ backgroundColor: "var(--bg-elevated)" }}
                aria-hidden="true"
              >
                {/* Grid */}
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(20,20,25,0.06)" strokeWidth="0.5" />
                ))}
                {[80, 160, 240, 320].map((x) => (
                  <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(20,20,25,0.06)" strokeWidth="0.5" />
                ))}

                {/* Volatile market path */}
                <motion.path
                  d="M0,120 C30,90 50,140 80,100 C110,60 120,150 150,110 C180,70 190,160 220,85 C250,20 260,140 290,70 C320,10 340,130 370,60 L400,50"
                  fill="none"
                  stroke="rgba(118,123,136,0.5)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.5, delay: 0.6, ease: "easeInOut" }}
                />

                {/* Hedged path */}
                <motion.path
                  d="M0,120 C40,115 80,108 120,100 C160,92 200,84 240,74 C280,64 320,55 360,48 L400,44"
                  fill="none"
                  stroke="rgba(166,121,15,0.85)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
                />

                {/* Labels */}
                <text x="8" y="195" fontSize="7" fill="rgba(118,123,136,0.7)" fontFamily="Inter,monospace" letterSpacing="1">
                  UNHEDGED
                </text>
                <text x="8" y="185" fontSize="7" fill="rgba(166,121,15,0.9)" fontFamily="Inter,monospace" letterSpacing="1">
                  HEDGED
                </text>
              </svg>

              {/* Overlay caption */}
              <div className="absolute bottom-4 right-4">
                <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--text-subtle)" }}>
                  Conceptual illustration
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-sm" style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-elevated)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Traditional unhedged portfolios absorb the full impact of market dislocations.
                A systematic hedging approach aims to reduce drawdown severity while maintaining
                participation in recovery.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
