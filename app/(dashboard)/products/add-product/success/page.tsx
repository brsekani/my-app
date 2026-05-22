"use client";

import { useShopStore } from "@/store/shopStore";
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {
  const resetShop = useShopStore((state) => state.resetShop);

  useEffect(() => {
    resetShop(); // ✅ clear when flow is DONE
  }, []);

  return (
    <div className="min-h-[90vh] bg-white flex flex-col leading-[100%] items-center justify-center">
      <main className="flex-1 flex items-center justify-center px-4 py-8 max-w-[640px] w-full">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-25 h-25 bg-[#E5E5E5] rounded-3xl flex items-center justify-center">
            <img
              src="/remark.png"
              alt="Shop Ready Icon"
              className="w-[57px] h-[46px]"
            />
          </div>

          <h1 className="text-[24px] md:text-[32px] font-semibold text-[#111111] uppercase text-center">
            Product is live
          </h1>

          <p className="text-[16px] text-[#777777] text-center">
            Customers can now view it in your store.
          </p>

          <hr className="w-full border-[#E5E5E5]" />

          <div className="flex gap-3 text-[14px] font-semibold w-full items-center justify-center">
            <Link
              href="/dashboard"
              className="md:px-4.5 py-2.5 md:w-fit w-full text-center rounded-full border border-[#111111] text-[#111111] hover:bg-gray-50 transition-colors"
            >
              Share Product
            </Link>
            <Link
              href="/dashboard/add-product"
              className="md:px-[53px] md:w-fit w-full text-center  py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] transition-colors"
            >
              Go To dashboard
            </Link>
          </div>

          <Link
            href={"/products/add-product"}
            className="text-[14px] font-semibold underline text-[#111111] cursor-pointer"
          >
            Add Another Product
          </Link>
        </div>
      </main>
    </div>
  );
}
