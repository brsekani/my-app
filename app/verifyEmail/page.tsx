"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link
          href="/"
          className="inline-block bg-[#1a3a4a] text-white text-xs font-semibold px-4 py-2 rounded-full"
        >
          LOGO
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center px-6 gap-5">
          {/* OTP Sent badge */}
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1">
            <span className="text-[#7ed957] text-xs">✉</span>
            <span className="text-xs font-medium text-gray-600 tracking-wide uppercase">
              OTP Sent
            </span>
          </div>

          {/* Title */}
          <h1 className=" font-black tracking-tight text-[32px] text-gray-900 uppercase">
            Verify Your Email
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 text-center">
            We sent a 6-digit code to{" "}
            <span className="text-gray-800 font-medium">{email}</span>
          </p>

          <hr className="w-full border-gray-200" />

          <p className="text-sm text-gray-600">Enter the code sent below</p>

          {/* OTP Inputs — static UI only */}
          <div className="flex gap-3">
            {Array(6)
              .fill("")
              .map((_, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-11 h-11 text-center text-lg font-semibold rounded-lg border-2 border-transparent bg-gray-100 focus:outline-none focus:border-[#1bc8c8] transition-colors"
                />
              ))}
          </div>

          {/* Resend timer — static */}
          <p className="text-sm text-gray-500">
            Resend code in...{" "}
            <span className="font-semibold text-gray-800">00:59</span>
          </p>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <Link
              href="/"
              className="px-8 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </Link>
            <button className="px-8 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] border border-[#5fc23e] text-sm font-bold text-white transition-colors">
              Verify
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
