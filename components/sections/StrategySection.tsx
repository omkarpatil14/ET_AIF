"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface StrategyLayer {
  id: string;
  label: string;
  allocation: string;
  description: string;
  details: string[];
  color: string;
  bgOpacity: string;
}

const strategyLayers: StrategyLayer[] = [
  {
    id: "equity",
    label: "Long / Short Equity",
    allocation: "60–80%",
    description:
      "High-conviction long positions in quality Indian equities, combined with tactical short positions to profit from and hedge against specific market exposures.",
    details: [
      "Bottom-up fundamental research",
      "Sector-diversified exposure",
      "Max 10% single-stock concentration",
      "Long bias with tactical shorts",
    ],
    color: "var(--accent-emerald)",
    bgOpacity: "rgba(46, 196, 127, 0.05)",
  },
  {
    id: "hedge",
    label: "Dynamic Hedging",
    allocation: "20–40%",
    description:
      "Multi-layered hedging using index options, futures overlays, covered calls, and currency derivatives — adjusted dynamically based on market conditions.",
    details: [
      "Nifty / Sensex put options",
      "Futures overlays & covered calls",
      "Currency derivatives (INR)",
      "Pairs trading strategies",
    ],
    color: "var(--accent-gold)",
    bgOpacity: "rgba(200, 158, 42, 0.05)",
  },
  {
    id: "risk",
    label: "Risk Overlay",
    allocation: "Always On",
    description:
      "A continuous risk management layer that monitors VaR, stress scenarios, and hedge ratios — rebalanced weekly with daily monitoring.",
    details: [
      "Real-time Value at Risk (VaR)",
      "Weekly risk overlay rebalancing",
      "Daily portfolio monitoring",
      "Up to 2x NAV leverage (conservative)",
    ],
    color: "rgba(148, 163, 184, 0.8)",
    bgOpacity: "rgba(148, 163, 184, 0.03)",
  },
];

export default function StrategySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [activeLayer, setActiveLayer] = useState<string>("equity");

  const active = strategyLayers.find((l) => l.id === activeLayer) ?? strategyLayers[0];

  return (
    <section
      id="strategy"
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: "var(--bg-base)" }}
      aria-labelledby="strategy-heading"
    >
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-number mb-4"
            >
              Investment Strategy
            </motion.p>
            <motion.h2
              id="strategy-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Portfolio Architecture
            </motion.h2>
          </div>


        </div>

        {/* Interactive architecture diagram */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left: layer selectors */}
          <div className="lg:col-span-2 space-y-2">
            {strategyLayers.map((layer, i) => {
              const isActive = layer.id === activeLayer;
              return (
                <motion.button
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  onClick={() => setActiveLayer(layer.id)}
                  className="w-full text-left p-5 rounded-sm transition-all duration-300 group"
                  style={{
                    border: `0.5px solid ${isActive ? layer.color : "var(--border-subtle)"}`,
                    backgroundColor: isActive ? layer.bgOpacity : "transparent",
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="text-xs font-medium tracking-widest uppercase mb-1"
                        style={{ color: isActive ? layer.color : "var(--text-muted)" }}
                      >
                        {layer.allocation}
                      </p>
                      <p
                        className="font-medium text-sm"
                        style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
                      >
                        {layer.label}
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full mt-1 flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? layer.color : "var(--border-default)",
                        boxShadow: isActive ? `0 0 8px ${layer.color}` : "none",
                      }}
                    />
                  </div>
                </motion.button>
              );
            })}

            {/* Arrow connector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="py-4 text-center"
            >
              <span
                className="text-xs tracking-widest uppercase font-medium"
                style={{ color: "var(--accent-emerald)" }}
              >
                = Resilient Portfolio
              </span>
            </motion.div>
          </div>

          {/* Right: detail panel */}
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-3 p-8 lg:p-10 rounded-sm h-full"
            style={{
              border: `0.5px solid ${active.color}`,
              backgroundColor: active.bgOpacity,
              minHeight: "320px",
            }}
          >
            {/* Allocation badge */}
            <div className="flex items-center justify-between mb-6">
              <span
                className="text-xs font-medium tracking-widest uppercase px-2 py-1 rounded-sm"
                style={{
                  color: active.color,
                  border: `0.5px solid ${active.color}`,
                  backgroundColor: "transparent",
                }}
              >
                {active.allocation} of Portfolio
              </span>
              <span
                className="font-display text-5xl"
                style={{ color: active.color, opacity: 0.15, letterSpacing: "-0.04em" }}
                aria-hidden="true"
              >
                {active.allocation.replace("–", "-").split("–")[0]}
              </span>
            </div>

            <h3
              className="font-display mb-4"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.015em",
                color: "var(--text-primary)",
              }}
            >
              {active.label}
            </h3>

            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {active.description}
            </p>

            <div className="space-y-3">
              {active.details.map((detail) => (
                <div
                  key={detail}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span style={{ color: active.color, flexShrink: 0 }}>→</span>
                  {detail}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional strategy specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-0"
          style={{ border: "0.5px solid var(--border-subtle)", backgroundColor: "var(--bg-surface)" }}
        >
          {[
            { label: "Max Single Stock", value: "10%", note: "Concentration limit" },
            { label: "Leverage", value: "≤2×", note: "NAV — conservative" },
            { label: "Rebalancing", value: "Weekly", note: "Risk overlay" },
            { label: "Monitoring", value: "Daily", note: "Portfolio & risk" },
          ].map((spec, i) => (
            <div
              key={spec.label}
              className="p-6 border-r last:border-r-0"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <p
                className="font-display mb-1"
                style={{
                  fontSize: "1.75rem",
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                {spec.value}
              </p>
              <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-secondary)" }}>
                {spec.label}
              </p>
              <p className="text-[0.65rem]" style={{ color: "var(--text-subtle)" }}>
                {spec.note}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
