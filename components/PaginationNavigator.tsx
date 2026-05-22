// components/PaginationNavigator.tsx

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import arrowRight from "@/assets/svgs/arrow-right.svg";

interface PaginationNavigatorProps {
  totalPages: number;
  loading?: boolean;
}

export default function PaginationNavigator({
  totalPages,
  loading = false,
}: PaginationNavigatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[1440px] flex justify-center px-4">
      <div className="text-[14px] text-[#111111] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] w-fit py-2 bg-[#FFFFFF] flex items-center gap-2 rounded-[100px] border border-[#E5E5E5]">
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={isFirstPage || loading}
          className="flex items-center gap-2 px-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Image src={arrowLeft} alt="arrow-icon" />
          <p>Previous</p>
        </button>

        <div className="flex items-center">
          <div className="px-[12.5px] text-[12px]">{currentPage}</div>
          <div className="px-1.5">of</div>
          <div className="px-[12.5px] text-[12px]">{totalPages}</div>
        </div>

        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={isLastPage || loading}
          className="flex items-center gap-2 px-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <p>Next</p>
          <Image src={arrowRight} alt="arrow-icon" />
        </button>
      </div>
    </div>
  );
}
