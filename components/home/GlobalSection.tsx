"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalSection() {
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

      tl.from(".global-small-text", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".global-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.45",
        )
        .from(
          ".global-image",
          {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".global-description",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen py-10 md:py-[80px] overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#EDEDED_1px,transparent_1px),linear-gradient(to_bottom,#EDEDED_1px,transparent_1px)] bg-[size:112px_153px]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-[60px] grid grid-cols-1 md:grid-cols-3 md:gap-10.5 gap-11">
        <div className="flex items-start flex-col gap-4 md:justify-between">
          <p className="global-small-text text-[12px] md:text-[14px] text-[#777777] uppercase leading-[100%]">
            NO LOCATION RESTRICTIONS. NO SPECIAL SETUP.
          </p>

          <h2 className="global-title text-[28px] md:text-[44px] text-[#111111] uppercase font-medium leading-[120%] max-w-[430px]">
            BUILT FOR SELLERS EVERYWHERE
          </h2>
        </div>

        <div className="global-image">
          <Image
            src="/global-bag.png"
            alt="Global sellers"
            width={373}
            height={377}
            className="w-full h-auto max-w-[350px] md:max-w-[373px] mx-auto rounded-[6px] object-cover"
          />
        </div>

        <p className="global-description md:text-[16px] md:leading-[100%] text-[18px] leading-[24px] text-[#111111] md:self-end pr-10 md:pr-0">
          Whether you sell locally or to customers abroad, your store link works
          anywhere. Anyone with the link can browse your products and contact
          you directly.
        </p>
      </div>
    </section>
  );
}
