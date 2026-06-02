"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorefrontShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(imageRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".storefront-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".storefront-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-5 px-5 leading-[100%]">
      <div
        className="max-w-[1440px] mx-auto overflow-hidden rounded-[8px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/lamp-bg.png')" }}
      >
        <div className="grid lg:grid-cols-2 md:gap-10 gap-2.5 items-end min-h-[612px] px-6 lg:px-16 py-6 md:py-0">
          {/* IMAGE FIRST ON MOBILE */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <Image
              src="/laptop-mockups.png"
              alt="Storefront"
              width={800}
              height={500}
              className="w-full max-w-[800px] h-auto hidden lg:block"
            />

            <Image
              src="/phone-mockup.png"
              alt="Storefront"
              width={500}
              height={500}
              className="w-full max-w-[400px] h-auto block lg:hidden"
            />
          </div>

          {/* TEXT SECOND ON MOBILE */}
          <div ref={textRef} className="order-2 lg:order-1 md:pb-10">
            <h2 className="storefront-title text-[16px] lg:text-[24px] font-semibold text-[#111111] uppercase leading-[100%]">
              A SIMPLE PAGE FOR ALL YOUR PRODUCTS
            </h2>

            <p className="storefront-text mt-3 text-[16px] lg:text-[20px] font-normal text-[#111111] max-w-[550px] tracking-[0%] leading-[100%]">
              Give your customers a clean page to browse all your products in
              one place. No repeated posts, no confusion.
              <br />
              Customers can explore and contact you directly, all in one view.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
