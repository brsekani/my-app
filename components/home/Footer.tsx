import arrow from "@/public/arrow-30.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] w-full">
      <div className="max-w-360 w-full mx-auto md:px-[60px] md:py-0 py-10 px-5 flex flex-col md:flex-row gap-7 md:items-end items-start justify-between leading-[100%] text-[#111111]">
        <p className="text-[14px]">© {new Date().getFullYear()} PRODUCT NAME</p>

        <div className="flex md:items-center items-start md:gap-56 gap-7 flex-col md:flex-row">
          <div className="text-[16px] gap-y-4 flex md:items-end items-start flex-col">
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

          <div className="text-[16px] gap-y-4 flex md:items-end items-start flex-col">
            <p className="text-[#777777] font-semibold">LEGAL</p>

            <Link
              href={"/privacy-policy"}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Privacy Policy</p>
              <Image src={arrow} alt="arrow-icon" />
            </Link>

            <Link href={"#"} className="flex items-center gap-2 cursor-pointer">
              <p>Terms of Service</p>
              <Image src={arrow} alt="arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
