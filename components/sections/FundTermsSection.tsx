"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const terms = [
  { label: "Fund Category", value: "Category III AIF — Hedge Fund Strategy" },
  { label: "Liquidity", value: "Monthly / Quarterly redemptions" },
  { label: "Management Fee", value: "2% per annum" },
  { label: "Performance Fee", value: "20% of profits above hurdle" },
  { label: "Minimum Investment", value: "₹1 Crore" },
  { label: "Lock-in Period", value: "None — standard notice period applies" },
  { label: "Sponsor Commitment", value: "≥2.5% of corpus (skin in the game)" },
  { label: "Taxation", value: "At fund level, Category III AIF" },
];

export default function FundTermsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: "var(--bg-elevated)" }}
      aria-labelledby="fund-terms-heading"
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: heading */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-number mb-4"
            >
              Fund Structure
            </motion.p>

            <motion.h2
              id="fund-terms-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="font-display mb-6"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Transparent Terms.
              <br />
              Aligned Interests.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              EquiTrust operates as a SEBI-regulated Category III Alternative Investment Fund. The
              fund structure is designed for institutional and high-net-worth investors seeking
              hedged equity exposure in Indian markets.
            </motion.p>

            {/* Fundraising callout */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 p-5 rounded-sm"
              style={{ border: "0.5px solid var(--border-accent)", backgroundColor: "rgba(13,143,84,0.04)" }}
            >
              <p className="metric-label mb-3" style={{ color: "var(--accent-emerald)" }}>
                Current Raise — Investor Material
              </p>
              <p
                className="font-display mb-1"
                style={{ fontSize: "2.25rem", letterSpacing: "-0.025em", color: "var(--text-primary)", lineHeight: 1 }}
              >
                ₹200 Crore
              </p>
              <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                Target fund size
              </p>
              <div className="pt-3" style={{ borderTop: "0.5px solid var(--border-subtle)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>First Close Target</p>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>₹25 Crore by Q4 2026</p>
              </div>
              <p className="disclaimer-text mt-3">
                Figures presented in the EquiTrust investor material (2026). Not a guaranteed outcome.
              </p>
            </motion.div>
          </div>

          {/* Right: terms table */}
          <div className="lg:col-span-3">
            {/* Desktop table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <table className="fund-table" aria-label="Fund terms and conditions">
                <tbody>
                  {terms.map((term, i) => (
                    <motion.tr
                      key={term.label}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <td>{term.label}</td>
                      <td>{term.value}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile stacked cards */}
            <div className="md:hidden space-y-3">
              {terms.map((term, i) => (
                <motion.div
                  key={term.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                  className="p-4 rounded-sm"
                  style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-surface)" }}
                >
                  <p className="text-[0.65rem] font-medium tracking-widest uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>
                    {term.label}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {term.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
