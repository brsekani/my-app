"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <div className="text-[12px] text-[#111111] flex gap-4">
      <Link
        href="/settings/profile"
        className={`py-2 px-4 rounded-full font-semibold transition-colors ${
          pathname === "/settings/profile"
            ? "bg-[#E5E5E5]"
            : "hover:bg-[#F5F5F5]"
        }`}
      >
        Profile
      </Link>

      <Link
        href="/settings/security"
        className={`py-2 px-4 rounded-full font-semibold transition-colors ${
          pathname === "/settings/security"
            ? "bg-[#E5E5E5]"
            : "hover:bg-[#F5F5F5]"
        }`}
      >
        Security
      </Link>
    </div>
  );
}
