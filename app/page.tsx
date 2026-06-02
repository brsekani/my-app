import AboutSection from "@/components/home/AboutSection";
import Hero from "@/components/home/Hero";
import StorefrontShowcase from "@/components/home/StorefrontShowcase";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <Hero />
      <StorefrontShowcase />
      <AboutSection />
    </div>
  );
}
