"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: string;
  label: string;
  note?: string;
}

const stats: Stat[] = [
  { value: "₹15.74L Cr", label: "AIF Commitments as of Dec 2025", note: "Total industry" },
  { value: "20.6%", label: "Year-on-Year Growth", note: "AIF industry" },
  { value: "~30%", label: "5-Year CAGR", note: "Industry AUM" },
  { value: "55%+", label: "Domestic Capital Share", note: "Of AIF flows" },
  { value: "1,700+", label: "Registered AIFs in India", note: "" },
];

function AnimatedStat({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.19, 1, 0.22, 1] }}
      className="py-6 border-b"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div
        className="font-display mb-1"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}
      >
        {stat.value}
      </div>
      <p className="text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>
        {stat.label}
      </p>
      {stat.note && (
        <p className="text-[0.65rem] mt-0.5" style={{ color: "var(--text-subtle)" }}>
          {stat.note}
        </p>
      )}
    </motion.div>
  );
}

export default function OpportunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
      aria-labelledby="opportunity-heading"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative container-editorial">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-number mb-5"
            >
              The Opportunity
            </motion.p>

            <motion.h2
              id="opportunity-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="font-display mb-8"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
                color: "var(--text-primary)",
                lineHeight: 1.08,
              }}
            >
              India&apos;s AIF Industry
              <br />
              Is{" "}
              <em className="not-italic" style={{ color: "var(--accent-emerald)" }}>
                Accelerating.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              Alternative Investment Funds are rapidly becoming the preferred vehicle for India&apos;s
              most sophisticated investors. Category III hedge-fund strategies — like EquiTrust&apos;s
              — are at the forefront of this structural shift.
            </motion.p>

            {/* Headline stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="p-6 rounded-sm mb-4"
              style={{
                border: "0.5px solid var(--border-accent)",
                backgroundColor: "rgba(13, 143, 84, 0.04)",
              }}
            >
              <p
                className="font-display mb-2"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                ₹100L Cr
              </p>
              <p className="text-sm" style={{ color: "var(--accent-emerald)" }}>
                Projected AIF Industry AUM by 2030
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
                From ₹15.74 lakh crore as of December 2025
              </p>
            </motion.div>

            <p className="disclaimer-text">
              Source: Figures presented in the EquiTrust investor material (2026). Projections are
              estimates and do not represent guaranteed outcomes.
            </p>
          </div>

          {/* Right: stats list */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs font-medium tracking-widest uppercase mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Key Industry Metrics
            </motion.p>

            <div className="mb-8">
              {stats.map((stat, i) => (
                <AnimatedStat key={stat.label} stat={stat} index={i} inView={inView} />
              ))}
            </div>

            {/* Bar chart: simplified visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-4 rounded-sm"
              style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-elevated)" }}
            >
              <p className="metric-label mb-4">Industry AUM Growth — Illustrative Trajectory</p>
              <div className="flex items-end gap-2 h-20">
                {[18, 28, 38, 52, 68, 85, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.07, ease: "easeOut" }}
                    className="flex-1 rounded-sm origin-bottom"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 6 ? "var(--accent-emerald)" : "var(--bg-overlay)",
                      border: "0.5px solid var(--border-subtle)",
                      opacity: 0.5 + (i / 6) * 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[0.6rem]" style={{ color: "var(--text-subtle)" }}>2024</span>
                <span className="text-[0.6rem]" style={{ color: "var(--accent-emerald)" }}>2030P</span>
              </div>
              <p className="text-[0.6rem] mt-2" style={{ color: "var(--text-subtle)" }}>
                Illustrative. P = Projected estimate. Not guaranteed.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
