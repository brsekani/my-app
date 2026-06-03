"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
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

      tl.from(".how-title", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".how-description",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".how-card",
          {
            y: 70,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .from(
          ".how-number",
          {
            scale: 0,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "back.out(1.8)",
          },
          "-=0.7",
        )
        .from(
          ".how-icon",
          {
            scale: 0.75,
            rotate: -8,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        )
        .from(
          ".how-cta",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.45",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="p-5 md:px-[60px]">
      <div className="max-w-[1400px] mx-auto bg-[#111111] rounded-[8px] text-white p-5 md:p-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 md:gap-8 gap-2 mb-5">
          <h2 className="how-title md:text-[20px] text-[18px] uppercase leading-[100%]">
            How It Works
          </h2>

          <p className="how-description md:text-[20px] text-[16px] md:leading-[100%] leading-[22px] max-w-[658px]">
            Instead of posting products repeatedly, create a clean product page
            once. Share your store link anywhere and let customers browse before
            messaging you.
          </p>
        </div>

        <div className="hidden md:block">
          {/* Top Cards */}
          <div className="grid md:grid-cols-3 border-x border-b border-[#FFFFFF]">
            {/* Card 1 */}
            <div className="how-card relative min-h-[316px] border-b md:border-b-0 md:border-r border-[#FFFFFF] p-6 flex flex-col items-center justify-center">
              <div className="how-number absolute top-6 left-6 w-10 h-10 rounded-full bg-[#FFFFFF12] flex items-center justify-center font-semibold">
                1
              </div>

              <div>
                <Image
                  src="/create-store-icon.png"
                  alt="Create Store"
                  width={80}
                  height={80}
                  className="how-icon mb-4"
                />

                <h3 className="text-[18px] md:text-[20px] font-semibold text-center">
                  Create your store
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="how-card relative min-h-[316px] border-b md:border-b-0 md:border-r border-[#FFFFFF] p-6 flex flex-col items-center justify-center">
              <div className="how-number absolute top-6 left-6 w-10 h-10 rounded-full bg-[#FFFFFF12] flex items-center justify-center font-semibold">
                2
              </div>

              <div>
                <Image
                  src="/add-products-icon.png"
                  alt="Add Products"
                  width={80}
                  height={80}
                  className="how-icon mb-4"
                />

                <h3 className="text-[18px] md:text-[20px] font-semibold text-center">
                  Add your products
                </h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="how-card relative min-h-[316px] p-6 flex flex-col items-center justify-center">
              <div className="how-number absolute top-6 left-6 w-10 h-10 rounded-full bg-[#FFFFFF12] flex items-center justify-center font-semibold">
                3
              </div>

              <div>
                <Image
                  src="/share-link-icon.png"
                  alt="Share Store Link"
                  width={80}
                  height={80}
                  className="how-icon mb-6"
                />

                <h3 className="text-[18px] md:text-[20px] font-semibold text-center">
                  Share your store link
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 border border-t-0 border-[#FFFFFF]">
            {/* Step 4 */}
            <div className="how-card min-h-[316px] border-b md:border-b-0 md:border-r border-[#FFFFFF] p-6 flex flex-col items-center justify-start">
              <div className="how-number bg-[#FFFFFF12] rounded-full h-[40px] px-2 flex items-center justify-between max-w-[620px] w-full mb-6">
                <span className="font-semibold text-[16px]">4(Finale)</span>

                <Image
                  src="/check-icon.svg"
                  alt="Completed"
                  width={24}
                  height={24}
                />
              </div>

              <div className="flex flex-col items-start w-fit">
                <Image
                  src="/orders-icon.png"
                  alt="Orders"
                  width={80}
                  height={80}
                  className="how-icon mb-4"
                />

                <h3 className="text-[16px] md:text-[20px] font-semibold text-center">
                  Get orders on LINKED SOCIALS
                </h3>
              </div>
            </div>

            {/* CTA */}
            <div className="how-card min-h-[316px] flex items-center justify-center p-6 leading-8">
              <div className="how-cta">
                <p className="text-[20px]">NO apps for customers.</p>

                <p className="text-[20px] leading-[160%]">
                  NO learning curve..
                </p>

                <p className="text-[26px] md:text-[20px] font-semibold uppercase">
                  JUST CLICK AND{" "}
                  <span className="text-[#68DB25]">START...</span>
                </p>

                <Link
                  href="/signup"
                  className="inline-flex mt-5 bg-[#68DB25] hover:bg-[#5cc11f] transition-colors text-black font-semibold px-[18px] py-2.5 rounded-full text-[14px] leading-[100%]"
                >
                  Create Your Free Store
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="grid grid-cols-2 border-x border-b border-white">
            {/* STEP 1 */}
            <div className="how-card h-[194px] border-r border-b border-white p-4">
              <div className="how-number w-10 h-10 rounded-full bg-[#FFFFFF12] flex items-center justify-center text-[12px] font-semibold">
                1
              </div>

              <div className="h-full flex flex-col justify-center">
                <Image
                  src="/create-store-icon.png"
                  alt="Create Store"
                  width={80}
                  height={80}
                  className="how-icon w-[44px] h-[44px] mb-4"
                />

                <h3 className="text-[16px] font-semibold leading-[120%]">
                  Create your
                  <br />
                  store
                </h3>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="how-card h-[194px] border-b border-white p-4">
              <div className="how-number w-10 h-10 rounded-full bg-[#FFFFFF12] flex items-center justify-center text-[12px] font-semibold">
                2
              </div>

              <div className="h-full flex flex-col justify-center">
                <Image
                  src="/add-products-icon.png"
                  alt="Add Products"
                  width={80}
                  height={80}
                  className="how-icon w-[44px] h-[44px] mb-4"
                />

                <h3 className="text-[16px] font-semibold leading-[120%]">
                  Add your
                  <br />
                  products
                </h3>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="how-card h-[213px] border-r border-white p-4">
              <div className="how-number w-10 h-10 rounded-full bg-[#FFFFFF12] flex items-center justify-center text-[12px] font-semibold">
                3
              </div>

              <div className="h-full flex flex-col justify-center">
                <Image
                  src="/share-link-icon.png"
                  alt="Share Link"
                  width={80}
                  height={80}
                  className="how-icon w-[44px] h-[44px] mb-4"
                />

                <h3 className="text-[16px] font-semibold leading-[120%]">
                  Share your
                  <br />
                  store link
                </h3>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="how-card h-[213px] p-4">
              <div className="how-number bg-[#FFFFFF12] rounded-full h-[40px] px-2 flex items-center justify-between w-full mb-6">
                <span className="text-[12px] font-semibold">4(Finale)</span>

                <Image
                  src="/check-icon.svg"
                  alt="Completed"
                  width={18}
                  height={18}
                />
              </div>

              <Image
                src="/orders-icon.png"
                alt="Orders"
                width={80}
                height={80}
                className="how-icon w-[44px] h-[44px] mb-4"
              />

              <h3 className="text-[16px] font-semibold leading-[100%]">
                Get orders on
                <br />
                LINKED
                <br />
                SOCIALS
              </h3>
            </div>
          </div>

          {/* MOBILE CTA */}
          <div className="how-card border-x border-b border-white px-8 h-[220px] flex items-center">
            <div className="how-cta max-w-[260px]">
              <p className="text-[16px]">NO apps for customers.</p>

              <p className="text-[16px]">NO learning curve..</p>

              <p className="text-[18px] font-semibold uppercase">
                JUST CLICK AND <span className="text-[#68DB25]">START...</span>
              </p>

              <Link
                href="/signup"
                className="inline-flex mt-6 bg-[#68DB25] hover:bg-[#5cc11f] transition-colors text-black font-semibold px-[18px] py-2.5 rounded-full text-[14px]"
              >
                Create Your Free Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
