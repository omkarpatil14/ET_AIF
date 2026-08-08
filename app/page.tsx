import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import MetricsStrip from "@/components/sections/MetricsStrip";
import VolatilitySection from "@/components/sections/VolatilitySection";
import OpportunitySection from "@/components/sections/OpportunitySection";
import ThesisSection from "@/components/sections/ThesisSection";
import StrategySection from "@/components/sections/StrategySection";
import RiskSection from "@/components/sections/RiskSection";
import PerformanceSection from "@/components/sections/PerformanceSection";
import FundTermsSection from "@/components/sections/FundTermsSection";
import TeamSection from "@/components/sections/TeamSection";
import WhyEquitrustSection from "@/components/sections/WhyEquitrustSection";
import InvestorCTA from "@/components/sections/InvestorCTA";
import ContactSection from "@/components/sections/ContactSection";

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
