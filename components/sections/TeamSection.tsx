"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Rubina Singla",
    title: "Sales & Marketing",
    image: "/team/rubina-singla.jpeg",
    objectPosition: "50% 18%",
    description:
      "Rubina Singla is an MBA graduate with extensive experience in banking, portfolio management, and entrepreneurship. She has previously worked with an ex-HDFC Bank team and has served as a Mutual Fund Portfolio Manager, managing assets worth INR 1000 million.\n\nA successful two-time entrepreneur, Rubina brings a deep understanding of investor communication, customer engagement, and market positioning. At EquiTrust, she leads sales and marketing initiatives with a strong emphasis on trust, clarity, and long-term relationships.",
    accentColor: "var(--accent-emerald)",
  },
  {
    name: "Shiva Grover",
    title: "Research & Analysis",
    image: "/team/shiva-grover.jpeg",
    objectPosition: "50% 15%",
    description:
      "Shiva Grover is a B.Com graduate with NISM certifications in Derivatives and Research Analysis. He brings over 15 years of experience working with established financial institutions, including Anagram Rathi and Aditya Birla.\n\nWith an AUM of INR 500 million, Shiva specializes in research-based analysis, market insights, and risk-aware investment frameworks. At EquiTrust, he plays a key role in developing structured research processes and educational insights that promote rational and informed financial decision-making.",
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

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.19, 1, 0.22, 1] }}
              className="group relative overflow-hidden rounded-sm flex flex-col"
              style={{
                border: "0.5px solid var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              {/* Centered headshot — square crop locked on the face */}
              <div className="flex justify-center pt-6 px-5">
                <div
                  className="relative overflow-hidden rounded-sm shrink-0"
                  style={{
                    width: "148px",
                    height: "148px",
                    backgroundColor: "var(--bg-overlay)",
                    border: `0.5px solid ${member.accentColor}`,
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ objectPosition: member.objectPosition }}
                    sizes="148px"
                    priority={i === 0}
                  />
                </div>
              </div>

              <div className="relative px-5 pt-4 pb-5 flex flex-col flex-1 text-center">
                <h3
                  className="font-display mb-1"
                  style={{
                    fontSize: "1.25rem",
                    letterSpacing: "-0.015em",
                    color: "var(--text-primary)",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[0.65rem] font-medium tracking-widest uppercase mb-3"
                  style={{ color: member.accentColor }}
                >
                  {member.title}
                </p>

                <div className="space-y-2.5 text-left">
                  {member.description.split("\n\n").map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
