"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function InvestorCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
      aria-labelledby="investor-cta-heading"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(13,143,84,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative container-editorial">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-number mb-6 justify-center"
          >
            Current Raise — Investor Material
          </motion.p>

          <motion.h2
            id="investor-cta-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="font-display mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
            }}
          >
            Discuss the Opportunity.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            EquiTrust is currently raising ₹200 crore, with a first close target of ₹25 crore by Q4 2026.
            First-year deployment is planned at 70–80% into hedged equity strategies, as described
            in the investor material.
          </motion.p>

          {/* Metrics row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto"
          >
            {[
              { label: "Fund Target", value: "₹200 Cr" },
              { label: "First Close", value: "₹25 Cr" },
              { label: "Deployment Y1", value: "70–80%" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-sm text-center"
                style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-surface)" }}
              >
                <p
                  className="font-display mb-1"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1 }}
                >
                  {item.value}
                </p>
                <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary group">
              Investor Enquiry
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link href="/strategy" className="btn-secondary group">
              Read the Strategy
              <ArrowUpRight
                size={14}
                className="opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="disclaimer-text mt-8 max-w-md mx-auto"
          >
            Fundraising figures and deployment plans are described in the EquiTrust investor
            material (2026) and do not represent guaranteed outcomes. Investment involves risk.
            Investors should conduct their own due diligence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
