import { Sign } from "crypto";
import Link from "next/link";
import SignupForm from "../_components/SignupForm";

export default function CreateAccount() {
  return (
    <main>
      <nav className="py-[20px] px-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="py-[14px] px-[18px] w-[100px] h-[39px] flex justify-center items-center gap-4 rounded-full bg-[#004466] text-white"
        >
          Login
        </Link>

        {/* Back link */}
        <Link
          href="/"
          className="text-sm text-gray-500 flex items-center gap-2"
        >
          <img
            src="/Curved arrow.png"
            alt="Curve arrow"
            width={24}
            height={24}
          />
          <span className="font-semibold text-[16px] leading-[100%] underline text-black">
            Back to Homepage
          </span>
        </Link>
      </nav>

      {/* PAGE */}

      <section className="w-full h-fit flex flex-col items-center justify-center">
        {/* main header */}
        <div className="w-60% h-fit flex flex-col items-center justify-center gap-4 mb-4">
          <div className="h-[30px] w-[181px] border-[#e5e5e5] border-1 py-[8px] px-[16px] flex items-center gap-2 rounded-[24px]">
            <img
              src="/Shopping Cart.png"
              alt="Shop Icon"
              width={24}
              height={48}
            />
            <span className="font-medium text-[10px] leading-[100%] tracking-normal whitespace-nowrap">
              CREATE YOUR FREE SHOP
            </span>
          </div>
          <h2 className="h-[38] w-[202] text-black  flex items-center justify-center font-semibold  text-[24px] leading-[100%] tracking-normal">
            GET STARTED
          </h2>

          <p className="text-[#777777] text-[12px] font-semibold leading-[100%] tracking-normal">
            Setup your online shop and start sharing your products
          </p>
          <button className="flex items-center gap-2 py-[8px] px-[16px] border-[#e5e5e5] border-1 rounded-[24px]">
            <span className="font-medium text-[12px] leading-[100%] text-[#777777]">
              Continue with Google
            </span>
            <img
              src="/Group.png"
              alt="Google Group Icon"
              width={16}
              height={16}
            />
          </button>
        </div>

        {/* OR divider */}

        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 border-t w-2xs  border-[#e5e5e5]" />
          <span className="text-xs text-muted text-[#111111] font-medium tracking-widest uppercase">
            OR
          </span>
          <div className="flex-1 border-t w-2xs  border-[#e5e5e5]" />
        </div>

        {/* Form */}
        <SignupForm />
      </section>
    </main>
  );
}
