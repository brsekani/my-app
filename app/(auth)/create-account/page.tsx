import Badge from "@/components/Badge";
import SignupForm from "@/components/SignupForm";
import shoppingIcon from "@/assets/svgs/shopping-cart.svg";
import googleIcon from "@/assets/svgs/google.svg";
import Image from "next/image";

export default function CreateAccount() {
  return (
    <main className="w-full h-full flex items-center justify-center py-10 px-5">
      <section className="w-full h-fit flex flex-col md:max-w-[640px] items-center justify-center ">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-6">
          <Badge imageUrl={shoppingIcon} text={"CREATE YOUR FREE SHOP"} />

          <h2 className="text-black  flex items-center justify-center font-semibold  md:text-[32px] text-[24px] leading-[100%] tracking-normal">
            GET STARTED
          </h2>

          <p className="text-[#777777] text-[16px] leading-[100%] tracking-normal text-center">
            Setup your online shop and start sharing your products
          </p>

          <button className="flex items-center gap-2 py-[5.5px] pl-[14px] pr-[6px] border-[#e5e5e5] border-1 rounded-[24px]">
            <span className="font-medium text-[12px] leading-[100%] text-[#777777] uppercase">
              Continue with Google
            </span>
            <div className="w-[28px] h-[28px] bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <Image
                src={googleIcon}
                alt="Google Group Icon"
                width={16.24}
                height={16.19}
              />
            </div>
          </button>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 border-t w-full  border-[#e5e5e5]" />
            <span className="text-[14px] leading-[100%] text-[#111111] uppercase">
              OR
            </span>
            <div className="flex-1 border-t w-2xs  border-[#e5e5e5]" />
          </div>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
