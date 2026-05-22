"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/Badge";
import sms from "@/assets/svgs/sms-notification.svg";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "your email";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError("");
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex((v) => !v);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  // ✅ handleVerify restored as a proper function
  const handleVerify = async () => {
    const token = otp.join("");
    if (token.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    setLoading(false);
    console.log("OTP verified for:", email, "token:", token);
    router.push("/setup-shop");
  };

  // ✅ handleResend restored as a proper function
  const handleResend = async () => {
    if (!canResend) return;
    setResending(true);
    setResendSuccess(false);
    setError("");
    setResending(false);
    console.log("Resend OTP for:", email);
    setResendSuccess(true);
    setOtp(["", "", "", "", "", ""]);
    setCountdown(59);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const formattedCountdown = `00:${String(countdown).padStart(2, "0")}`;

  return (
    <div className="min-h-[90vh] bg-white flex flex-col px-4 py-6 leading-[100%]">
      <main className="flex-1 flex items-center justify-center">
        <div className=" flex flex-col items-center px-5 gap-6 w-full max-w-[640px]">
          <Badge imageUrl={sms} text={"OTP SENT"} />

          <h1 className="font-semibold text-center text-gray-900 uppercase gap-6 text-[24px] md:text-[32px]">
            ENTER THE CODE
          </h1>

          <p className="text-[16px] text-[#777777] text-center">
            We sent a 6-digit code to the email address you provided {email}
          </p>

          <hr className="w-full border-[#E5E5E5]" />

          <p className="text-[14px] text-[#111111]">
            Enter the code sent below
          </p>

          <div className="flex gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`md:text-[20px] text-[14px] gap-2 sm:gap-3 w-[calc((100%-40px)/6)] h-[47px] md:w-15 md:h-15 text-center text-lg font-semibold rounded-lg border-2 bg-[#F5F5F5] focus:outline-none transition-colors
                  ${error ? "border-red-400 bg-red-50" : digit ? "border-[#68DB25] bg-white" : "border-transparent focus:border-[#68DB25]"}`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-xs -mt-2">{error}</p>}

          {resendSuccess && (
            <p className="text-green-500 text-xs -mt-2">
              A new code has been sent!
            </p>
          )}

          <p className="text-[14px] text-[#6B6B6B]">
            {canResend ? (
              <>
                Didn&apos;t receive a code?{" "}
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="font-semibold text-gray-800 hover:underline disabled:opacity-50"
                >
                  {resending ? "Resending..." : "Resend code"}
                </button>
              </>
            ) : (
              <>
                Resend code in...{" "}
                <span className="font-semibold text-gray-800">
                  {formattedCountdown}
                </span>
              </>
            )}
          </p>

          <div className="flex gap-3 pt-1 w-full justify-center">
            <Link
              href="/create-account"
              className="px-8.5 py-2.5 rounded-full border border-[#111111] text-[14px] font-semibold text-[#111111] hover:bg-gray-50 transition-colors"
            >
              Back
            </Link>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="px-8.5 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] text-[14px] text-[#111111] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Confirming..." : "Confirm"}
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
