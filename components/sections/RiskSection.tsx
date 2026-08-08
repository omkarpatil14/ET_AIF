"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Scenario = "normal" | "volatile" | "shock";

const scenarios: { id: Scenario; label: string; description: string; equity: number; hedge: number; cash: number; response: string }[] = [
  {
    id: "normal",
    label: "Normal Market",
    description: "Stable conditions, moderate volatility, constructive macro environment.",
    equity: 75,
    hedge: 20,
    cash: 5,
    response:
      "Higher equity participation. Hedge maintained at minimum structural levels. Long bias to capture upside.",
  },
  {
    id: "volatile",
    label: "Volatile Market",
    description: "Elevated VIX, rising uncertainty, increased correlation across assets.",
    equity: 60,
    hedge: 35,
    cash: 5,
    response:
      "Hedge allocation increases. Equity exposure reduced at the margins. Pairs trading and options overlays activated.",
  },
  {
    id: "shock",
    label: "Extreme Shock",
    description: "Systemic stress — 2008-style or COVID-scale volatility event.",
    equity: 45,
    hedge: 50,
    cash: 5,
    response:
      "Maximum downside protection emphasis. Put options and futures overlays prioritized. Capital preservation is the primary objective.",
  },
];

const riskMetrics = [
  { label: "VaR", sublabel: "Value at Risk — real-time monitoring", angle: -60 },
  { label: "Stress", sublabel: "Scenario stress testing", angle: -20 },
  { label: "Hedge Ratio", sublabel: "Dynamic hedge coverage", angle: 20 },
  { label: "Drawdown", sublabel: "Max drawdown tracking", angle: 60 },
  { label: "Exposure", sublabel: "Net / gross exposure limits", angle: 100 },
  { label: "VaR Limit", sublabel: "SEBI-aligned risk boundaries", angle: 140 },
];

export default function RiskSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [activeScenario, setActiveScenario] = useState<Scenario>("normal");

  const scenario = scenarios.find((s) => s.id === activeScenario)!;

  return (
    <section
      id="risk"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-surface)" }}
      aria-labelledby="risk-heading"
    >
      <div className="container-editorial">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-number mb-4"
          >
            Risk Management
          </motion.p>
          <motion.h2
            id="risk-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="font-display max-w-2xl"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Protection Is Part of{" "}
            <em className="not-italic" style={{ color: "var(--accent-emerald)" }}>
              the Strategy.
            </em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Risk management is not a backstop — it is woven into every layer of portfolio construction.
            Independent oversight, real-time monitoring, and stress-tested scenarios are the
            foundation of every investment decision.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Risk Engine Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{ border: "0.5px dashed rgba(46,196,127,0.1)" }}
              />
              {/* Inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full"
                style={{ border: "0.5px dashed rgba(200,158,42,0.12)" }}
              />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="text-center p-6 rounded-full"
                  style={{
                    width: "40%",
                    height: "40%",
                    backgroundColor: "var(--bg-elevated)",
                    border: "0.5px solid var(--border-accent)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    className="text-[0.55rem] font-medium tracking-[0.14em] uppercase"
                    style={{ color: "var(--accent-emerald)" }}
                  >
                    Risk
                  </p>
                  <p
                    className="text-[0.55rem] font-medium tracking-[0.14em] uppercase"
                    style={{ color: "var(--accent-emerald)" }}
                  >
                    Engine
                  </p>
                </div>
              </div>

              {/* Metric labels arranged in circle */}
              {riskMetrics.map((metric, i) => {
                const angle = (i / riskMetrics.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 43; // percentage radius
                const x = 50 + r * Math.cos(rad);
                const y = 50 + r * Math.sin(rad);
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                    className="absolute text-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <p
                      className="text-[0.5rem] font-medium tracking-[0.1em] uppercase leading-tight"
                      style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}
                    >
                      {metric.label}
                    </p>
                  </motion.div>
                );
              })}

              {/* Spoke lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                {riskMetrics.map((_, i) => {
                  const angle = (i / riskMetrics.length) * 360 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const r1 = 22, r2 = 38;
                  const x1 = 50 + r1 * Math.cos(rad);
                  const y1 = 50 + r1 * Math.sin(rad);
                  const x2 = 50 + r2 * Math.cos(rad);
                  const y2 = 50 + r2 * Math.sin(rad);
                  return (
                    <motion.line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="rgba(46,196,127,0.15)"
                      strokeWidth="0.3"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.07 }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Risk features list */}
            <div className="mt-8 space-y-3">
              {[
                "Real-time Value at Risk (VaR) monitoring",
                "2008-style and COVID-scenario stress tests",
                "Independent risk officer oversight",
                "SEBI-mandated custodian oversight",
                "Maximum drawdown backtest: ≤12% (historical)",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.5 }}
                  className="flex items-start gap-3 text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent-emerald)", flexShrink: 0 }}>✓</span>
                  {item}
                </motion.div>
              ))}
              <p className="disclaimer-text pt-2">
                ≤12% maximum drawdown is a historical backtest figure. It does not guarantee future performance.
              </p>
            </div>
          </motion.div>

          {/* Right: Scenario Selector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
              Conceptual Scenario Response
            </p>
            <p className="disclaimer-text mb-6">
              The following is a conceptual illustration of how the strategy is designed to respond
              to different market conditions. It does not represent a guaranteed trading outcome.
            </p>

            {/* Scenario tabs */}
            <div
              className="flex rounded-sm overflow-hidden mb-6"
              style={{ border: "0.5px solid var(--border-subtle)" }}
            >
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(s.id)}
                  className="flex-1 px-3 py-2.5 text-xs font-medium transition-all duration-300"
                  style={{
                    backgroundColor: activeScenario === s.id ? "var(--accent-emerald-dim)" : "transparent",
                    color: activeScenario === s.id ? "var(--text-primary)" : "var(--text-muted)",
                    borderRight: "0.5px solid var(--border-subtle)",
                    letterSpacing: "0.04em",
                  }}
                  aria-pressed={activeScenario === s.id}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Scenario detail */}
            <motion.div
              key={activeScenario}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="p-6 rounded-sm mb-6"
              style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-elevated)" }}
            >
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                {scenario.description}
              </p>

              {/* Allocation bars */}
              <div className="space-y-3 mb-5">
                {[
                  { label: "Equity Exposure", value: scenario.equity, color: "var(--accent-emerald)" },
                  { label: "Hedge Allocation", value: scenario.hedge, color: "var(--accent-gold)" },
                  { label: "Cash / Liquidity", value: scenario.cash, color: "var(--text-muted)" },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[0.65rem] font-medium" style={{ color: "var(--text-secondary)" }}>
                        {bar.label}
                      </span>
                      <span className="text-[0.65rem] font-medium" style={{ color: bar.color }}>
                        ~{bar.value}%
                      </span>
                    </div>
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--bg-overlay)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.value}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: bar.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--text-secondary)" }}>Strategy response: </strong>
                {scenario.response}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
