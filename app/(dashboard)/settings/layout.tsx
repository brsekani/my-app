"use client";

import back from "@/assets/svgs/back.svg";
import SettingsNavigation from "@/components/settings/SettingsNavigation";
import Image from "next/image";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 leading-[100%]">
      <Link href={"/dashboard"} className="flex items-center md:gap-2 gap-1">
        <Image src={back} alt="back" />

        <p className="text-[16px] font-medium text-[#111111] underline">Back</p>
      </Link>

      <hr className="w-full border-[#E5E5E5]" />

      <div className="text-[14px]">
        <h6 className="text-[#111111] font-medium">SETTINGS</h6>
        <p className="text-[#777777]">
          Manage your personal details and keep your account information up to
          date.
        </p>
      </div>
      <SettingsNavigation />

      {children}
    </div>
  );
}
