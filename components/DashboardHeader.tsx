import Link from "next/link";
import profileDropdown from "@/assets/svgs/profile-dropdown.svg";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <header className="w-full leading-[100%] px-5 py-3 sm:py-4 max-w-[1440px] mx-auto flex items-center justify-between">
      <Link
        href="/"
        className="py-[14px] px-[18px] w-[100px] h-[39px] flex justify-center items-center gap-4 rounded-full bg-[#004466] text-white"
      >
        Logo
      </Link>

      <Image src={profileDropdown} alt="profile-icon" />
    </header>
  );
}
