"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const storesRef = useRef<HTMLSpanElement>(null);
  const listingsRef = useRef<HTMLSpanElement>(null);
  const sellersRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".about-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".about-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".about-card",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".about-icon",
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.8)",
          },
          "-=0.8",
        );

      // Count animations
      const counters = [
        { ref: storesRef, value: 500 },
        { ref: listingsRef, value: 5230 },
        { ref: sellersRef, value: 260 },
      ];

      counters.forEach(({ ref, value }) => {
        const obj = { count: 0 };

        gsap.to(obj, {
          count: value,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent =
                Math.floor(obj.count).toLocaleString() + "+";
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="md:py-8 py-10 md:px-[60px] px-5">
      <div className="max-w-[1420px] mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 md:gap-10 gap-2 mb-10">
          <h2 className="about-title text-[18px] md:text-[20px] text-[#111111] uppercase leading-[100%]">
            ABOUT{" "}
            <span className="text-[#8D8D8D] font-bold">NAME OF PRODUCT</span>
          </h2>

          <p className="about-description text-[16px] md:text-[20px] leading-[22px] text-[#111111] max-w-[658px] md:leading-[100%]">
            Create a simple product page you can share with customers. Let them
            choose first, then chat you on later.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="about-card rounded-[8px] overflow-hidden">
            <div className="bg-[#E8E8E8] h-[197.5px] p-5 flex items-start">
              <h3 className="text-[20px] font-semibold text-[#111111]">
                <span ref={storesRef}>0+</span>
              </h3>
            </div>

            <div className="bg-[#68DB25] h-[197.5px] p-5 flex flex-col justify-between">
              <Image
                src="/store-icon.png"
                alt="Stores"
                width={64}
                height={78}
                className="about-icon w-[64px] h-auto"
              />

              <h4 className="text-[18px] md:text-[20px] font-semibold uppercase text-[#111111]">
                Stores
              </h4>
            </div>
          </div>

          {/* Card 2 */}
          <div className="about-card rounded-[8px] overflow-hidden flex flex-col-reverse md:flex-col">
            <div className="bg-[#68DB25] h-[197.5px] p-5 flex flex-col justify-between">
              <Image
                src="/listing-icon.png"
                alt="Listings"
                width={64}
                height={85}
                className="about-icon w-[64px] h-auto"
              />

              <h4 className="text-[18px] md:text-[20px] font-semibold uppercase text-[#111111]">
                Listings
              </h4>
            </div>

            <div className="bg-[#E8E8E8] h-[197.5px] p-5 flex items-end">
              <h3 className="text-[20px] font-semibold text-[#111111]">
                <span ref={listingsRef}>0+</span>
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="about-card rounded-[8px] overflow-hidden">
            <div className="bg-[#E8E8E8] h-[197.5px] p-5 flex items-start">
              <h3 className="text-[20px] font-semibold text-[#111111]">
                <span ref={sellersRef}>0+</span>
              </h3>
            </div>

            <div className="bg-[#68DB25] h-[197.5px] p-5 flex flex-col justify-between">
              <Image
                src="/seller-icon.png"
                alt="Sellers"
                width={64}
                height={78}
                className="about-icon w-[64px] h-auto"
              />

              <h4 className="text-[18px] md:text-[20px] font-semibold uppercase text-[#111111]">
                Sellers
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
