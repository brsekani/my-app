"use client";
import Link from "next/link";

export default function FormActions({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <div className="flex gap-3 pt-1 justify-center">
      <Link
        href="/verifyEmail"
        className="px-8 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Back
      </Link>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] border border-[#5fc23e] text-sm font-bold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
