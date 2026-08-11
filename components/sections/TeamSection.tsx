"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const team = [
  {
    name: "Rubina Singla",
    title: "Director",
    focus: "Sales, Marketing & Portfolio Strategy",
    initials: "RS",
    description:
      "Leads investor relations, marketing strategy, and portfolio communication at EquiTrust.",
    accentColor: "var(--accent-emerald)",
  },
  {
    name: "Shiva Grover",
    title: "Director",
    focus: "Research, Market Insights & Investment Strategy",
    initials: "SG",
    description:
      "Leads research, market intelligence, and investment strategy formulation at EquiTrust.",
    accentColor: "var(--accent-gold)",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: "var(--bg-base)" }}
      id="team"
      aria-labelledby="team-heading"
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
            The Team
          </motion.p>
          <motion.h2
            id="team-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="font-display max-w-xl"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Guided by focused expertise.
          </motion.h2>
        </div>

        {/* Team cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.19, 1, 0.22, 1] }}
              className="group relative p-8 rounded-sm transition-all duration-400 overflow-hidden"
              style={{
                border: "0.5px solid var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = member.accentColor;
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-elevated)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-surface)";
              }}
            >
              {/* Monogram placeholder */}
              <div
                className="w-16 h-16 rounded-sm flex items-center justify-center mb-6 transition-transform duration-400 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-overlay)",
                  border: `0.5px solid ${member.accentColor}`,
                }}
              >
                <span
                  className="font-display text-2xl"
                  style={{ color: member.accentColor, letterSpacing: "-0.02em" }}
                  aria-hidden="true"
                >
                  {member.initials}
                </span>
              </div>

              {/* Accent line (appears on hover) */}
              <div
                className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: member.accentColor, opacity: 0.6 }}
              />

              {/* Name & title */}
              <div className="mb-4">
                <h3
                  className="font-display mb-1 transition-colors duration-200"
                  style={{
                    fontSize: "1.5rem",
                    letterSpacing: "-0.015em",
                    color: "var(--text-primary)",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs font-medium tracking-widest uppercase"
                  style={{ color: member.accentColor }}
                >
                  {member.title}
                </p>
              </div>

              {/* Focus */}
              <p
                className="text-sm font-medium mb-3 leading-snug"
                style={{ color: "var(--text-secondary)" }}
              >
                {member.focus}
              </p>

              {/* Description */}
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {member.description}
              </p>

              {/* Contact if available */}
              {member.contact && (
                <a
                  href={`mailto:${member.contact}`}
                  className="inline-flex items-center gap-1.5 text-[0.7rem] transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = member.accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {member.contact}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
