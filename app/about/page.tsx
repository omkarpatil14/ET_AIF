import type { Metadata } from "next";
import ThesisSection from "@/components/sections/ThesisSection";
import WhyEquitrustSection from "@/components/sections/WhyEquitrustSection";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Investment Philosophy",
  description:
    "EquiTrust's investment philosophy: participate in India's structural growth while systematically managing downside risk through intelligent hedging.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="section-padding pt-36" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="container-editorial">
          <FadeIn>
            <p className="section-number mb-4">Investment Philosophy</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                maxWidth: "16ch",
              }}
            >
              Calm in{" "}
              <em className="not-italic" style={{ color: "var(--accent-emerald)" }}>
                Volatility.
              </em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-base leading-relaxed max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              EquiTrust was founded on the conviction that Indian markets are entering a new era of
              structural volatility — and that a new kind of investment vehicle is needed. One that
              participates in growth without exposing investors to unmitigated downside.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy editorial */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-surface)" }}>
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeIn>
              <div>
                <h2
                  className="font-display mb-6"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}
                >
                  India Is Changing. The Approach Must Change.
                </h2>
                <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <p>
                    India&apos;s equity markets offer compelling structural growth opportunities —
                    driven by demographics, digitization, manufacturing re-shoring, and expanding
                    domestic consumption. This growth is real. It is structural. It is long-term.
                  </p>
                  <p>
                    But the path is not smooth. Rising India VIX, rupee volatility, erratic FII
                    flows, geopolitical dislocations, and global trade shifts mean that
                    traditional buy-and-hold equity exposure has become increasingly punishing
                    during stress events.
                  </p>
                  <p>
                    EquiTrust&apos;s philosophy is simple: capture the growth, systematically
                    hedge the tail risk.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <h2
                  className="font-display mb-6"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}
                >
                  Intelligent Hedging Is Not Caution. It Is Precision.
                </h2>
                <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <p>
                    Many investors conflate hedging with reduced returns. EquiTrust believes the
                    opposite: a well-constructed hedge does not reduce returns — it improves the
                    quality and consistency of returns by reducing extreme drawdowns.
                  </p>
                  <p>
                    By deploying 20–40% of the portfolio into dynamic hedging instruments —
                    index puts, futures overlays, covered calls, currency derivatives — the fund
                    aims to create a portfolio that performs across market cycles, not just in
                    bull markets.
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                    Illustrative allocations. Actual allocations vary based on market conditions and risk assessment.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <ThesisSection />
      <WhyEquitrustSection />
    </>
  );
}
