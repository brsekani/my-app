import AboutSection from "@/components/home/AboutSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import Footer from "@/components/home/Footer";
import GlobalSection from "@/components/home/GlobalSection";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import KeyBenefits from "@/components/home/KeyBenefits";
import Navbar from "@/components/home/Navbar";
import StorefrontShowcase from "@/components/home/StorefrontShowcase";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="">
        <Hero />
        <StorefrontShowcase />
        <AboutSection />
        <HowItWorks />
        <GlobalSection />
        <KeyBenefits />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  );
}
