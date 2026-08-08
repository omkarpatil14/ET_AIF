import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import MetricsStrip from "@/components/sections/MetricsStrip";

// Dynamically import sections below the fold to reduce initial load time and JS payload
const VolatilitySection = dynamic(() => import("@/components/sections/VolatilitySection"));
const OpportunitySection = dynamic(() => import("@/components/sections/OpportunitySection"));
const ThesisSection = dynamic(() => import("@/components/sections/ThesisSection"));
const StrategySection = dynamic(() => import("@/components/sections/StrategySection"));
const RiskSection = dynamic(() => import("@/components/sections/RiskSection"));
const PerformanceSection = dynamic(() => import("@/components/sections/PerformanceSection"));
const FundTermsSection = dynamic(() => import("@/components/sections/FundTermsSection"));
const TeamSection = dynamic(() => import("@/components/sections/TeamSection"));
const WhyEquitrustSection = dynamic(() => import("@/components/sections/WhyEquitrustSection"));
const InvestorCTA = dynamic(() => import("@/components/sections/InvestorCTA"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <VolatilitySection />
      <OpportunitySection />
      <ThesisSection />
      <StrategySection />
      <RiskSection />
      <PerformanceSection />
      <FundTermsSection />
      <TeamSection />
      <WhyEquitrustSection />
      {/* <InvestorCTA />
      <ContactSection /> */}
    </>
  );
}
