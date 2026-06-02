"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const navRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        headingRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.3",
      )
      .from(
        textRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        buttonRef.current,
        {
          scale: 0.85,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );

    gsap.to(buttonRef.current, {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
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
        {/* Navbar */}
        <div className="flex justify-center pt-8">
          <div
            ref={navRef}
            className="w-full h-[47px] max-w-[500px] bg-[#FFFFFF80] backdrop-blur-sm rounded-full p-1 flex items-center justify-between"
          >
            <Link
              href="/"
              className="h-full px-[37px] w-[100px] flex justify-center items-center gap-4 rounded-full bg-[#004466] text-white"
            >
              Logo
            </Link>

            <button className="bg-[#68DB25] hover:bg-[#5FC91E] transition-colors text-[14px] font-semibold px-8 h-full rounded-full text-[#111111]">
              Get Started
            </button>
          </div>
        </div>

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

            <button
              ref={buttonRef}
              className="bg-[#68DB25] hover:bg-[#5FC91E] transition-colors text-black font-semibold px-4.5 py-2.5 rounded-full text-[14px] cursor-pointer"
            >
              Create Your Free Store
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </section>
  );
}
