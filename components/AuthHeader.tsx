"use client";

import Link from "next/link";
import curveArrow from "@/assets/svgs/curved-arrow.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const pathname = usePathname();
  const isCreateAccount =
    pathname === "/create-account" || pathname === "/login";

  return (
    <header className="w-full leading-[100%] md:px-15 px-5 py-3 sm:py-4   flex items-center justify-between">
      <Link
        href="/"
        className="py-[14px] px-[18px] w-[100px] h-[39px] flex justify-center items-center gap-4 rounded-full bg-[#004466] text-white"
      >
        Logo
      </Link>

      {isCreateAccount && (
        <Link href="/" className="flex items-center gap-2">
          <Image src={curveArrow} alt="Curve arrow" width={24} height={24} />
          <span className="font-semibold text-[14px] sm:text-[16px] leading-[100%] underline text-black">
            Back to Homepage
          </span>
        </Link>
      )}
    </header>
  );
}
