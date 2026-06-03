"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".final-cta-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          ".final-cta-title",
          {
            y: 45,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.45",
        )
        .from(
          ".final-cta-button",
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.55,
            ease: "back.out(1.8)",
          },
          "-=0.35",
        )
        .from(
          ".final-cta-text",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.25",
        );

      gsap.to(".final-cta-button", {
        y: -5,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="p-5 overflow-hidden w-full">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="final-cta-card relative min-h-[309px] flex flex-col items-center justify-center text-center md:px-5 px-10 overflow-visible">
          {/* Black Card */}
          <div className="absolute inset-0 bg-[#111111] rounded-[8px]" />

          {/* Grid */}
          <div className="absolute inset-0 rounded-[8px] bg-[linear-gradient(to_right,#FFFFFF08_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF08_1px,transparent_1px)] bg-[size:112px_153px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="final-cta-title text-white text-[32px] md:text-[52px] uppercase leading-[100%]">
              CREATE A SIMPLE STORE YOU CAN SHARE
              <br />
              <span className="font-[family-name:var(--font-instrument-serif)] font-normal ">
                Anytime, Anywhere.
              </span>
            </h2>

            <Link
              href="/create-account"
              className="final-cta-button inline-flex mt-5 bg-[#68DB25] hover:bg-[#5cc11f] transition-colors text-black font-semibold px-[20px] py-3 rounded-full text-[14px]"
            >
              Create Your Free Store
            </Link>

            <p className="final-cta-text mt-5 text-[16px] text-[#8D8D8D]">
              PRODUCT NAME is here for you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
