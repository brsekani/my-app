"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function KeyBenefits() {
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

      tl.from(".benefits-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".benefits-badge",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .from(
          ".benefit-card-center",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          ".benefit-card-left",
          {
            x: -120,
            rotation: -35,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".benefit-card-right",
          {
            x: 120,
            rotation: 35,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1",
        );

      gsap.to(".benefit-card-left", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".benefit-card-center", {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".benefit-card-right", {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-5 overflow-hidden w-full"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Heading */}
        <div className="text-center">
          <h2 className="benefits-heading text-[#111111] text-[28px] md:text-[40px] leading-[100%] max-w-[886px] mx-auto px-5 lg:px-0">
            Put your products somewhere customers can always find them.
          </h2>

          <div className="benefits-badge lg:mt-10 mt-5">
            <span className="inline-flex items-center justify-center h-[33px] px-5 rounded-[24px] border border-[#E5E5E5] bg-[#F5F5F5] text-[14px] uppercase text-[#111111]">
              Key Benefits
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="lg:relative lg:mt-10 mt-5 flex justify-center flex-col lg:flex-row gap-6 items-center lg:items-start min-h-[402px] py-5 lg:py-7.5 w-full">
          {/* Left Card */}
          <div className="benefit-card-left lg:absolute left-0 md:left-[9%] top-10 md:top-[20%] lg:rotate-[-20deg] z-10 w-full md:w-fit">
            <div className="w-full md:w-[356.02px] h-[242.95px] bg-white border border-[#D8D8D8] rounded-[4px] shadow-sm overflow-hidden">
              <div className="h-[180px] md:h-[201.55px] bg-[#4D4BCC] flex items-center justify-center">
                <Image
                  src="/benefit-icon.svg"
                  alt="Benefit"
                  width={160}
                  height={160}
                  className="w-[100px] md:w-[160px] h-auto"
                />
              </div>

              <div className="py-2.5 px-6">
                <p className="text-center uppercase font-semibold text-[#111111] text-[14px] md:text-[18px]">
                  CUSTOMERS CONTACT YOU DIRECTLY
                </p>
              </div>
            </div>
          </div>

          {/* Center Card */}
          <div className="benefit-card-center lg:relative z-20 w-full md:w-fit">
            <div className="w-full md:w-[413.33px] h-[282px] bg-white border border-[#D8D8D8] rounded-[4px] shadow-lg overflow-hidden">
              <div className="h-[234px] bg-[#4D4BCC] flex items-center justify-center">
                <Image
                  src="/benefit-icon.svg"
                  alt="Benefit"
                  width={180}
                  height={180}
                  className="w-[120px] md:w-[180px] h-auto"
                />
              </div>

              <div className="py-2.5 px-6">
                <p className="text-center uppercase font-semibold text-[#111111] text-[14px] md:text-[18px]">
                  ONE SHAREABLE STORE LINK
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="benefit-card-right lg:absolute right-0 md:right-[9%] top-10 md:top-[20%] lg:rotate-[20deg] z-10 w-full md:w-fit">
            <div className="w-[320px] md:w-[356.02px] h-[242.95px] bg-white border border-[#D8D8D8] rounded-[4px] shadow-sm overflow-hidden w-full">
              <div className="h-[180px] md:h-[201.55px] bg-[#4D4BCC] flex items-center justify-center">
                <Image
                  src="/benefit-icon.svg"
                  alt="Benefit"
                  width={135.23}
                  height={135.23}
                  className="w-[100px] md:w-[135.23px] h-auto"
                />
              </div>

              <div className="py-2.5 px-6">
                <p className="text-center uppercase font-semibold text-[#111111] text-[14px] md:text-[18px]">
                  CLEAN PRODUCT SHOWCASE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
