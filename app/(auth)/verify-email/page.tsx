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
    router.push("/setupShop");
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
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4">
        <Link
          href="/"
          className="inline-block bg-[#1a3a4a] text-white text-xs font-semibold px-4 py-2 rounded-full"
        >
          LOGO
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center px-6 gap-5">
          <Badge imageUrl={sms} text={"OTP SENT"} />

          <h1 className="font-black tracking-tight text-[32px] text-gray-900 uppercase gap-[24px]">
            Verify Your Email
          </h1>

          <p className="text-sm text-gray-500 text-center">
            We sent a 6-digit code to{" "}
            <span className="text-gray-800 font-medium">{email}</span>
          </p>

          <hr className="w-full border-gray-200" />

          <p className="text-sm text-gray-600">Enter the code sent below</p>

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
                className={`w-11 h-11 text-center text-lg font-semibold rounded-lg border-2 bg-gray-100 focus:outline-none transition-colors
                  ${error ? "border-red-400 bg-red-50" : digit ? "border-[#1bc8c8] bg-white" : "border-transparent focus:border-[#1bc8c8]"}`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-xs -mt-2">{error}</p>}

          {resendSuccess && (
            <p className="text-green-500 text-xs -mt-2">
              A new code has been sent!
            </p>
          )}

          <p className="text-sm text-gray-500">
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

          <div className="flex gap-3 pt-1">
            <Link
              href="/"
              className="px-8 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </Link>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="px-8 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] border border-[#5fc23e] text-sm font-bold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify"}
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
