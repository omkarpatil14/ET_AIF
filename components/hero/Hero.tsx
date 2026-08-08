"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import MarketVisualization from "./MarketVisualization";

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      aria-label="EquiTrust hero section"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: "var(--bg-base)" }}>
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(13, 143, 84, 0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(200, 158, 42, 0.04) 0%, transparent 60%)",
          }}
        />

        {/* Canvas visualization */}
        <MarketVisualization />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-editorial pt-28 pb-16">
        {/* Top label */}
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={textReveal}
          className="flex items-center gap-3 mb-10"
        >
          <span className="section-number">Category III Alternative Investment Fund</span>
          <span
            className="h-px flex-1 max-w-[60px]"
            style={{ backgroundColor: "var(--accent-emerald)", opacity: 0.4 }}
          />
          <span className="section-number" style={{ color: "var(--text-muted)" }}>
            India-Focused
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="max-w-4xl">
          <motion.h1
            custom={0.35}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="font-display leading-[1.02] mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            Master Volatility.{" "}
            <br />
            <em
              className="not-italic"
              style={{ color: "var(--accent-emerald)", opacity: 0.9 }}
            >
              Capture Opportunity.
            </em>
          </motion.h1>

          <motion.p
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="text-base lg:text-lg leading-relaxed max-w-2xl mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            EquiTrust is a Category III AIF employing long-short equity strategies and dynamic
            hedging to seek asymmetric returns — participating in India&apos;s growth while
            systematically managing downside risk.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.65}
            initial="hidden"
            animate="visible"
            variants={textReveal}
            className="flex flex-wrap gap-4"
          >
            <Link href="/strategy" className="btn-primary group">
              Explore the Strategy
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link href="/contact" className="btn-secondary group">
              Investor Enquiry
              <ArrowUpRight
                size={14}
                className="opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>

        {/* Bottom row: tagline + scroll cue */}
        <motion.div
          custom={0.85}
          initial="hidden"
          animate="visible"
          variants={textReveal}
          className="mt-16 lg:mt-24 flex items-end justify-between"
        >
          <div>
            <p
              className="text-xs font-medium tracking-[0.18em] uppercase mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              Since 2026
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--text-subtle)" }}
            >
              Sector 26, Chandigarh
            </p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span
              className="text-[0.6rem] tracking-widest uppercase"
              style={{ color: "var(--text-subtle)" }}
            >
              Scroll
            </span>
            <ArrowDown size={12} style={{ color: "var(--text-subtle)" }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Hedge concept label — right edge, vertical */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span
          className="writing-mode-vertical text-[0.6rem] tracking-[0.2em] uppercase"
          style={{
            color: "var(--text-muted)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          Volatility → Intelligence → Hedging → Resilience
        </span>
        <span
          className="h-16 w-px"
          style={{ backgroundColor: "var(--accent-emerald)", opacity: 0.25 }}
        />
      </motion.div>
    </section>
  );
}
