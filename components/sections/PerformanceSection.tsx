"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Simplified 2-point dataset from investor material
// Mar 2025 → Apr 15, 2026: Nifty +2%, ET Growth Fund +39.8%
// We create a plausible 12-month path using these two fixed endpoints

const chartData = [
  { month: "Mar '25", nifty: 0, et: 0 },
  { month: "May '25", nifty: -1.2, et: 6.8 },
  { month: "Jul '25", nifty: 0.5, et: 14.2 },
  { month: "Sep '25", nifty: -2.1, et: 19.5 },
  { month: "Nov '25", nifty: 1.8, et: 27.1 },
  { month: "Jan '26", nifty: 0.3, et: 32.4 },
  { month: "Apr '26", nifty: 2.0, et: 39.8 },
];

const W = 600;
const H = 220;
const PAD = { top: 20, right: 20, bottom: 36, left: 40 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

const allValues = chartData.flatMap((d) => [d.nifty, d.et]);
const minVal = Math.min(...allValues) - 3;
const maxVal = Math.max(...allValues) + 3;

function scaleX(i: number) {
  return PAD.left + (i / (chartData.length - 1)) * plotW;
}

function scaleY(v: number) {
  return PAD.top + plotH - ((v - minVal) / (maxVal - minVal)) * plotH;
}

function buildPath(key: "nifty" | "et"): string {
  return chartData
    .map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d[key]);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function PerformanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const niftyPath = buildPath("nifty");
  const etPath = buildPath("et");

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
      aria-labelledby="performance-heading"
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
            Performance
          </motion.p>

          {/* Editorial statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="mb-3"
          >
            <h2
              id="performance-heading"
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                lineHeight: 1.02,
              }}
            >
              Same Market.
              <br />
              <em
                className="not-italic"
                style={{ color: "var(--accent-emerald)" }}
              >
                Different Results.
              </em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm mt-4 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            The broader market remained relatively flat over the period. The strategy focused on
            opportunities beyond the index through intelligent hedging and high-conviction positioning.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Chart — takes 2 cols */}
          <div className="lg:col-span-2">
            {/* Performance disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-4"
            >
              <span
                className="text-[0.6rem] font-medium tracking-widest uppercase px-2 py-1 rounded-sm"
                style={{
                  color: "var(--accent-gold)",
                  border: "0.5px solid rgba(200,158,42,0.3)",
                  backgroundColor: "rgba(200,158,42,0.06)",
                }}
              >
                Performance Presented in Investor Material
              </span>
            </motion.div>

            {/* SVG Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full rounded-sm overflow-hidden"
              style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-surface)" }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                style={{ height: "auto", minHeight: "180px" }}
                aria-label="Performance chart comparing ET Growth Fund and Nifty 50"
                role="img"
              >
                {/* Grid lines */}
                {[-5, 0, 10, 20, 30, 40].map((v) => {
                  const y = scaleY(v);
                  if (y < PAD.top || y > H - PAD.bottom) return null;
                  return (
                    <g key={v}>
                      <line
                        x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
                        stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
                        strokeDasharray={v === 0 ? "none" : "3 6"}
                      />
                      <text
                        x={PAD.left - 6} y={y + 3}
                        fontSize="7" fill="rgba(168,176,188,0.4)"
                        textAnchor="end" fontFamily="Inter,monospace"
                      >
                        {v}%
                      </text>
                    </g>
                  );
                })}

                {/* X axis labels */}
                {chartData.map((d, i) => (
                  <text
                    key={i}
                    x={scaleX(i)} y={H - 6}
                    fontSize="7" fill="rgba(168,176,188,0.4)"
                    textAnchor="middle" fontFamily="Inter,monospace"
                  >
                    {d.month}
                  </text>
                ))}

                {/* Area fill ET */}
                <motion.path
                  d={`${etPath} L${scaleX(chartData.length - 1)},${scaleY(minVal)} L${scaleX(0)},${scaleY(minVal)} Z`}
                  fill="url(#etGradient)"
                  fillOpacity={0.15}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="etGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(46,196,127,0.4)" />
                    <stop offset="100%" stopColor="rgba(46,196,127,0)" />
                  </linearGradient>
                </defs>

                {/* Nifty line */}
                <motion.path
                  d={niftyPath}
                  fill="none"
                  stroke="rgba(100,116,139,0.6)"
                  strokeWidth="1.5"
                  pathLength={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, delay: 0.7, ease: "easeInOut" }}
                />

                {/* ET Growth Fund line */}
                <motion.path
                  d={etPath}
                  fill="none"
                  stroke="rgba(46,196,127,0.9)"
                  strokeWidth="2"
                  pathLength={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2.2, delay: 0.9, ease: "easeInOut" }}
                />

                {/* End point dots */}
                <motion.circle
                  cx={scaleX(chartData.length - 1)} cy={scaleY(2)}
                  r="3" fill="rgba(100,116,139,0.8)"
                  initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 2.5 }}
                />
                <motion.circle
                  cx={scaleX(chartData.length - 1)} cy={scaleY(39.8)}
                  r="3.5" fill="rgba(46,196,127,1)"
                  style={{ filter: "drop-shadow(0 0 4px rgba(46,196,127,0.6))" }}
                  initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 2.7 }}
                />

                {/* End labels */}
                <motion.text
                  x={scaleX(chartData.length - 1) + 6}
                  y={scaleY(2) + 3}
                  fontSize="8" fill="rgba(100,116,139,0.7)" fontFamily="Inter,monospace"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 2.8 }}
                >
                  +2%
                </motion.text>
                <motion.text
                  x={scaleX(chartData.length - 1) + 6}
                  y={scaleY(39.8) + 3}
                  fontSize="8" fill="rgba(46,196,127,0.9)" fontFamily="Inter,monospace" fontWeight="500"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 2.9 }}
                >
                  +39.8%
                </motion.text>
              </svg>

              {/* Legend */}
              <div className="flex items-center gap-6 px-5 py-3" style={{ borderTop: "0.5px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-px" style={{ backgroundColor: "rgba(46,196,127,0.9)", height: "2px" }} />
                  <span className="text-[0.65rem] font-medium" style={{ color: "var(--text-secondary)" }}>ET Growth Fund</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6" style={{ height: "1.5px", backgroundColor: "rgba(100,116,139,0.6)" }} />
                  <span className="text-[0.65rem]" style={{ color: "var(--text-muted)" }}>Nifty 50</span>
                </div>
                <span className="ml-auto text-[0.6rem]" style={{ color: "var(--text-subtle)" }}>Mar 2025 – Apr 2026</span>
              </div>
            </motion.div>

            <p className="disclaimer-text mt-3">
              Intermediate data points are illustrative. Only the start (0%) and end points (Nifty +2%, ET Growth Fund +39.8%) are
              from the investor material (March 2025 – April 15, 2026). Past, backtested, or illustrative performance
              does not guarantee future results. Investment involves risk of loss.
            </p>
          </div>

          {/* Right: stat cards */}
          <div className="space-y-4">
            {[
              { label: "ET Growth Fund", value: "+39.8%", period: "Mar '25 – Apr '26", color: "var(--accent-emerald)", badge: "Investor Material" },
              { label: "Nifty 50", value: "+2%", period: "Same period", color: "var(--text-secondary)", badge: "Investor Material" },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                className="p-6 rounded-sm"
                style={{ border: `0.5px solid ${i === 0 ? "var(--border-accent)" : "var(--border-subtle)"}`, backgroundColor: "var(--bg-surface)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{card.label}</span>
                  <span
                    className="text-[0.55rem] tracking-wider uppercase px-1.5 py-0.5 rounded-sm"
                    style={{ color: "var(--accent-gold)", border: "0.5px solid rgba(200,158,42,0.2)", backgroundColor: "rgba(200,158,42,0.05)" }}
                  >
                    {card.badge}
                  </span>
                </div>
                <p
                  className="font-display"
                  style={{ fontSize: "2.5rem", letterSpacing: "-0.03em", color: card.color, lineHeight: 1 }}
                >
                  {card.value}
                </p>
                <p className="text-xs mt-2" style={{ color: "var(--text-subtle)" }}>{card.period}</p>
              </motion.div>
            ))}

            {/* Return objective box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="p-5 rounded-sm"
              style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-elevated)" }}
            >
              <p className="text-[0.65rem] font-medium tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>
                Return Objective*
              </p>
              <p className="font-display text-2xl" style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                15–25%
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>Annualised — objective only</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
