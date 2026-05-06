"use client";
import Link from "next/link";

export default function FormActions({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <div className="flex gap-6 pt-1 justify-center leading-[100%] text-[14px]">
      <Link
        href="/verifyEmail"
        className="px-[37.5px] py-2.5 rounded-full border border-[#111111] font-semibold text-[#111111] hover:bg-gray-50 transition-colors"
      >
        Back
      </Link>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-[67px] py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] border border-[#5fc23e] font-bold text-[#111111] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
