import Badge from "@/components/Badge";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";
import shoppingIocn from "@/assets/svgs/shopping-cart.svg";
import googleIcon from "@/assets/svgs/Group.svg";
import Image from "next/image";

export default function CreateAccount() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <section className=" w-full h-fit flex flex-col md:max-w-md max-w-sm items-center justify-center ">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-4 mb-4 ">
          <Badge imageUrl={shoppingIocn} text={"CREATE YOUR FREE SHOP"} />
          <h2 className="h-[38] w-[202] text-black  flex items-center justify-center font-semibold  text-[24px] leading-[100%] tracking-normal">
            GET STARTED
          </h2>

          <p className="text-[#777777] text-[12px] font-semibold leading-[100%] tracking-normal text-center ">
            Setup your online shop and start sharing your products
          </p>
          <button className="flex items-center gap-2 py-[8px] px-[16px] border-[#e5e5e5] border-1 rounded-[24px]">
            <span className="font-medium text-[12px] leading-[100%] text-[#777777]">
              Continue with Google
            </span>
            <Image
              src={googleIcon}
              alt="Google Group Icon"
              width={16}
              height={16}
            />
          </button>
        </div>

        <div className="flex items-center gap-3 py-2 md:w-full w-2xs">
          <div className="flex-1 border-t w-2xs  border-[#e5e5e5]" />
          <span className="text-xs text-muted text-[#111111] font-medium tracking-widest uppercase">
            OR
          </span>
          <div className="flex-1 border-t w-2xs  border-[#e5e5e5]" />
        </div>

        <SignupForm />
      </section>
    </main>
  );
}
