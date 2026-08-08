"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/animations/CountUp";

interface Metric {
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  badge: string;
}

const metrics: Metric[] = [
  {
    prefix: "",
    value: "15–25",
    suffix: "%",
    label: "15–25%",
    sublabel: "Annualised Return Objective",
    badge: "Objective",
  },
  {
    prefix: "≤",
    numericValue: 12,
    suffix: "%",
    value: "12",
    label: "≤12%",
    sublabel: "Historical Backtested Max Drawdown",
    badge: "Historical Backtest",
  },
  {
    prefix: "",
    value: "60–80",
    suffix: "%",
    label: "60–80%",
    sublabel: "Long-Short Equity Exposure",
    badge: "Illustrative",
  },
  {
    prefix: "",
    value: "20–40",
    suffix: "%",
    label: "20–40%",
    sublabel: "Dynamic Hedging Allocation",
    badge: "Illustrative",
  },
  {
    prefix: "₹",
    value: "1 Cr",
    label: "₹1 Crore",
    sublabel: "Minimum Investment",
    badge: "Fund Terms",
  },
];

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col justify-between py-6 px-5 lg:px-6 border-r last:border-r-0"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Badge */}
      <span
        className="inline-block text-[0.55rem] font-medium tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-sm mb-4 self-start"
        style={{
          color: "var(--accent-gold)",
          backgroundColor: "rgba(200, 158, 42, 0.08)",
          border: "0.5px solid rgba(200, 158, 42, 0.2)",
        }}
      >
        {metric.badge}
      </span>

      {/* Value */}
      <div
        className="font-display mb-1"
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}
        aria-label={metric.label}
      >
        {metric.prefix && (
          <span style={{ color: "var(--text-secondary)" }}>{metric.prefix}</span>
        )}
        {metric.value}
        {metric.suffix && (
          <span style={{ color: "var(--accent-emerald)", fontSize: "0.6em" }}>
            {metric.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
        {metric.sublabel}
      </p>
    </motion.div>
  );
}

export default function MetricsStrip() {
  return (
    <section
      className="relative"
      style={{ borderTop: "0.5px solid var(--border-subtle)", borderBottom: "0.5px solid var(--border-subtle)" }}
      aria-label="Fund metrics"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--bg-surface)" }}
      />
      <div className="relative container-editorial">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="relative container-editorial pb-4">
        <p className="disclaimer-text border-t pt-3" style={{ borderColor: "var(--border-subtle)" }}>
          These figures are objectives, historical backtests, or illustrative figures as described in the fund&apos;s investor material.
          They do not represent guaranteed future results. Past or backtested performance is not indicative of future returns.
          Investment involves risk.
        </p>
      </div>
    </section>
  );
}
