"use client";

export interface Pagination {
  current_page: number;
  first_page: number;
  last_page: number;
  next_page: number | null;
  previous_page: number | null;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

interface PaginationNavigatorProps {
  pagination?: Pagination;
  loading?: boolean;
}

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import arrowRight from "@/assets/svgs/arrow-right.svg";

export default function PaginationNavigator({
  pagination,
  loading = false,
}: PaginationNavigatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pagination || pagination.last_page <= 1) {
    return null;
  }

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-360 flex justify-center px-4">
      <div className="text-[14px] text-[#111111] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] w-fit py-2 bg-white flex items-center gap-2 rounded-full border border-[#E5E5E5]">
        <button
          disabled={!pagination.previous_page || loading}
          onClick={() => updatePage(pagination.previous_page!)}
          className="flex items-center gap-2 px-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Image src={arrowLeft} alt="Previous" />
          <span>Previous</span>
        </button>

        <div className="flex items-center">
          <span className="px-[12.5px] text-[12px]">
            {pagination.current_page}
          </span>

          <span className="px-1.5">of</span>

          <span className="px-[12.5px] text-[12px]">
            {pagination.last_page}
          </span>
        </div>

        <button
          disabled={!pagination.next_page || loading}
          onClick={() => updatePage(pagination.next_page!)}
          className="flex items-center gap-2 px-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <Image src={arrowRight} alt="Next" />
        </button>
      </div>
    </div>
  );
}
