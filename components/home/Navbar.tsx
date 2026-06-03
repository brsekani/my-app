"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      {
        y: -80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
    );

    // Scroll animation
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 50) {
        gsap.to(navRef.current, {
          scale: 0.96,
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(navRef.current, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-5">
      <div
        ref={navRef}
        className="w-full h-[47px] max-w-[500px] bg-[#FFFFFF80] backdrop-blur-md rounded-full p-1 flex items-center justify-between border border-white/20 shadow-lg"
      >
        <Link
          href="/"
          className="h-full px-[37px] w-[100px] flex justify-center items-center gap-4 rounded-full bg-[#004466] text-white"
        >
          Logo
        </Link>

        <Link href={"/create-account"} className="h-full">
          <button className="bg-[#68DB25] hover:bg-[#5FC91E] transition-colors text-[14px] font-semibold px-8 h-full rounded-full text-[#111111]">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
