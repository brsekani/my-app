import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="md:w-[251.2px] min-w-[166px] p-2 border border-[#E5E5E5] rounded-[8px] space-y-3 animate-pulse">
      <div className="w-full h-[235px] rounded-[4px] bg-gray-200" />

      <div className="space-y-2">
        <div className="h-5 w-20 rounded bg-gray-200" />

        <div className="h-4 w-3/4 rounded bg-gray-200" />

        <div className="space-y-1">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
