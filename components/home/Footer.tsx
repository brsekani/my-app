import arrow from "@/public/arrow-30.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] w-full">
      <div className="max-w-[1440px] w-full mx-auto md:px-[60px] md:py-[60px] py-10 px-5 flex items-end justify-between leading-[100%] text-[#111111]">
        <p className="text-[14px]">© {new Date().getFullYear()} PRODUCT NAME</p>

        <div className="text-[16px] gap-y-4 flex items-end flex-col">
          <p className="text-[#777777] font-semibold">CONTACT</p>

          <Link href={"#"} className="flex items-center gap-2 cursor-pointer">
            <p>Twitter</p>
            <Image src={arrow} alt="arrow-icon" />
          </Link>

          <Link href={"#"} className="flex items-center gap-2 cursor-pointer">
            <p>IG</p>
            <Image src={arrow} alt="arrow-icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
