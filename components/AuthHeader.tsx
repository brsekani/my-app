"use client";

import Link from "next/link";
import curveArrow from "@/assets/svgs/Curved arrow.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const pathname = usePathname();

  const isCreateAccount = pathname === "/create-account";

  return (
    <header className="w-full">
      <nav className="px-[15px] py-3 sm:py-4   flex items-center justify-between">
        <Link
          href="/"
          className="py-[14px] px-[18px] w-[100px] h-[39px] flex justify-center items-center gap-4 rounded-full bg-[#004466] text-white"
        >
          Login
        </Link>

        {isCreateAccount && (
          <Link
            href="/"
            className="text-sm text-gray-500 flex items-center gap-2"
          >
            <Image src={curveArrow} alt="Curve arrow" width={24} height={24} />
            <span className="font-semibold text-[14px] sm:text-[16px] leading-[100%] underline text-black">
              Back to Homepage
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
}
