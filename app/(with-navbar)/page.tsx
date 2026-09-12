import AboutSection from "@/components/home/AboutSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import GlobalSection from "@/components/home/GlobalSection";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import KeyBenefits from "@/components/home/KeyBenefits";
import StorefrontShowcase from "@/components/home/StorefrontShowcase";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main>
        <Hero />
        <StorefrontShowcase />
        <AboutSection />
        <HowItWorks />
        <GlobalSection />
        <KeyBenefits />
        <FinalCTASection />
      </main>
    </div>
  );
}
