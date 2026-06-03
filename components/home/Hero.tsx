"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, textRef.current, buttonRef.current], {
        clearProps: "all",
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 80, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          clearProps: "transform,opacity,filter",
        },
      )
        .fromTo(
          textRef.current,
          { y: 40, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            clearProps: "transform,opacity,filter",
          },
          "-=0.5",
        )
        .fromTo(
          buttonRef.current,
          { scale: 0.85, opacity: 0, filter: "blur(6px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "back.out(1.7)",
            clearProps: "opacity,filter",
            onComplete: () => {
              floatTweenRef.current = gsap.to(buttonRef.current, {
                y: -5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              });
            },
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => {
      floatTweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden leading-[100%]"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#11111100] to-[#111111]" />

      {/* Content */}
      <div className="relative z-10 w-full h-screen px-4">
        {/* Hero Content */}
        <div className="flex items-center justify-center h-[calc(100%-100px)] px-7.5">
          <div className="max-w-[700px] text-center space-y-7">
            <h1
              ref={headingRef}
              className="text-[#FFFFFF] text-[32px] md:text-[60px] leading-[100%]"
            >
              The{" "}
              <span className="font-[family-name:var(--font-instrument-serif)] tracking-[0] font-normal italic">
                Better Way
              </span>{" "}
              To Sell Your Products Online
              <br />
              <span>SHARE&SELL</span>
            </h1>

            <p
              ref={textRef}
              className="text-[#FFFFFF] text-[16px] md:text-[20px] leading-[100%] tracking-[0%]"
            >
              Build your online storefront, share your link and start selling.
              <br className="md:block hidden" />
              No complex setup, no payment gateways, just you and your
              customers.
            </p>

            <Link href={"/create-account"}>
              <button
                ref={buttonRef}
                className="bg-[#68DB25] hover:bg-[#5FC91E] transition-colors text-black font-semibold px-4.5 py-2.5 rounded-full text-[14px] cursor-pointer"
              >
                Create Your Free Store
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </section>
  );
}
