"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const theses = [
  {
    number: "01",
    title: "Capture Growth",
    tagline: "Participate in India's structural growth.",
    description:
      "High-conviction long positions in quality Indian equities  businesses with strong fundamentals, sectoral tailwinds, and durable competitive advantages  form the core of the portfolio.",
    points: [
      "60–80% long-short equity exposure",
      "Bottom-up fundamental research",
      "Sector-diversified, max 10% single stock",
      "India-focused with structural growth bias",
    ],
    accentColor: "var(--accent-emerald)",
  },
  {
    number: "02",
    title: "Hedge Systematically",
    tagline: "Systematic downside protection — always on.",
    description:
      "Proprietary hedging is not reactive  it is structural. The fund employs overlapping hedge layers that respond dynamically to market conditions without requiring market timing.",
    points: [
      "Nifty / Sensex index put options",
      "Stock futures (tactical shorts)",
      "Currency derivatives (INR exposure)",
      "Pairs trading strategies",
    ],
    accentColor: "var(--accent-gold)",
  },
  {
    number: "03",
    title: "Seek Asymmetry",
    tagline: "Asymmetric outcomes: capped down, open up.",
    description:
      "By combining growth capture with systematic hedging, the strategy aims to deliver stronger risk-adjusted returns  with lower volatility and smaller drawdowns than unhedged exposure.",
    points: [
      "Lower drawdown target vs. Nifty 50",
      "Return objective: 15–25% p.a.*",
      "Consistent across bull and bear phases",
      "Risk-adjusted alpha as primary goal",
    ],
    accentColor: "rgba(148, 163, 184, 0.8)",
  },
];

export default function ThesisSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-elevated)" }}
      aria-labelledby="thesis-heading"
    >
      {/* Section header */}
      <div className="container-editorial mb-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-number mb-4"
        >
          Core Thesis
        </motion.p>
        <motion.h2
          id="thesis-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="font-display max-w-xl"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          Three pillars of an intelligent strategy.
        </motion.h2>
      </div>

      {/* Thesis cards — horizontal desktop, vertical mobile */}
      <div className="container-editorial">
        <div className="grid md:grid-cols-3 gap-0 md:gap-0">
          {theses.map((thesis, i) => (
            <motion.div
              key={thesis.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.19, 1, 0.22, 1] }}
              className="relative p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-b-0 last:border-r-0 group transition-colors duration-300"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.015)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {/* Number */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-display text-4xl"
                  style={{ color: "var(--border-subtle)", letterSpacing: "-0.03em" }}
                >
                  {thesis.number}
                </span>
                <span
                  className="h-px flex-1"
                  style={{ backgroundColor: thesis.accentColor, opacity: 0.4 }}
                />
              </div>

              {/* Title */}
              <h3
                className="font-display mb-2"
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)",
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                }}
              >
                {thesis.title}
              </h3>

              {/* Tagline */}
              <p
                className="text-xs font-medium tracking-wide mb-5 uppercase"
                style={{ color: thesis.accentColor, letterSpacing: "0.08em" }}
              >
                {thesis.tagline}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {thesis.description}
              </p>

              {/* Points */}
              <ul className="space-y-2">
                {thesis.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: thesis.accentColor, flexShrink: 0, marginTop: "2px" }}>
                      —
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: thesis.accentColor, opacity: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer for return objective */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="disclaimer-text mt-6 pt-4 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          * 15–25% p.a. is a return objective only. It is not guaranteed. Past, backtested, or
          illustrative performance does not represent future results. Investment involves risk of loss.
        </motion.p>
      </div>
    </section>
  );
}
