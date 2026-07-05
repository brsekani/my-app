"use client";

import { useShopStore } from "@/store/shopStore";
import Link from "next/link";
import { useEffect } from "react";

export default function ShopReadyPage() {
  const resetShop = useShopStore((state) => state.resetShop);

  useEffect(() => {
    resetShop(); // ✅ clear when flow is DONE
  }, []);

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
            Your Shop Is Ready
          </h1>

          <p className="text-[16px] text-[#777777] text-center">
            Now let&apos;s add your first product so customers can start
            ordering.
          </p>

          <hr className="w-full border-[#E5E5E5]" />

          <div className="flex gap-3 text-[14px] font-semibold">
            <Link
              href="/dashboard"
              className="px-4.5 py-2.5 rounded-full border border-[#111111] text-[#111111] hover:bg-gray-50 transition-colors"
            >
              Go To Dashboard
            </Link>
            <Link
              href="/dashboard?add-product=true"
              className="px-[53px] py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] transition-colors"
            >
              Add Product
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
