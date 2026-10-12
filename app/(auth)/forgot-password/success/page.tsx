"use client";

import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <div className="min-h-[90vh] bg-white flex flex-col leading-[100%] items-center justify-center">
      <main className="flex-1 flex items-center justify-center px-4 py-8 max-w-[640px] w-full">
        <div className="flex flex-col items-center gap-6">
          <div className="w-25 h-25 bg-[#E5E5E5] rounded-3xl flex items-center justify-center">
            <img
              src="/remark.png"
              alt="Shop Ready Icon"
              className="w-[57px] h-[46px]"
            />
          </div>

          <h1 className="text-[24px] md:text-[32px] font-semibold text-[#111111] uppercase text-center">
            Your password has been reset
          </h1>

          <p className="text-[16px] text-[#777777] text-center">
            You can now log in with your new password.
          </p>

          <hr className="w-full border-[#E5E5E5]" />

          <div className="flex gap-3 text-[14px] font-semibold">
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="px-[53px] py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
