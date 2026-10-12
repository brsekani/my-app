"use client";

import Badge from "@/components/Badge";
import shoppingIcon from "@/assets/svgs/shopping-cart.svg";
import eyeOpenIcon from "@/assets/svgs/eye-open.svg";
import Image from "next/image";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/schemas";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { useConfirmPasswordResetMutation } from "@/redux/api/passwordResetApi";
import { STORAGE_KEYS } from "@/constants/storageKeys";

export default function Page() {
  const router = useRouter();

  const [confirmPasswordReset, { isLoading }] =
    useConfirmPasswordResetMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, handleBlur, handleChange, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },

      validationSchema: resetPasswordSchema,

      onSubmit: async (values) => {
        const resetToken = sessionStorage.getItem(
          STORAGE_KEYS.passwordReset.pendingToken,
        );

        if (!resetToken) {
          showToast.error(
            "Your password reset session has expired. Please request a new reset code.",
          );

          router.replace("/forgot-password/success");
          return;
        }

        try {
          const response = await confirmPasswordReset({
            reset_token: resetToken,
            password: values.password,
            password_confirmation: values.confirmPassword,
          }).unwrap();

          console.log("Password reset response:", response);

          // Clear the temporary reset token after successful reset
          sessionStorage.removeItem(STORAGE_KEYS.passwordReset.pendingToken);
          sessionStorage.removeItem(STORAGE_KEYS.passwordReset.pendingToken);

          showToast.success(response.message || "Password successfully reset!");

          router.replace("/login");
        } catch (error: any) {
          console.error("Password reset error:", error);

          const message = error?.data?.message;

          if (message === "Invalid or expired token.") {
            sessionStorage.removeItem(STORAGE_KEYS.passwordReset.pendingToken);
            sessionStorage.removeItem(STORAGE_KEYS.passwordReset.pendingToken);

            showToast.error(
              "Your password reset session has expired. Please request a new code.",
            );

            router.replace("/forgot-password");
            return;
          }

          showToast.error(
            message || "Unable to reset password. Please try again.",
          );
        }
      },
    });

  return (
    <main className="w-full h-[90vh] flex items-center justify-center py-10 px-5">
      <section className="w-full h-full flex flex-col md:max-w-[640px] items-center justify-center">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-6">
          <Badge imageUrl={shoppingIcon} text="RESET YOUR PASSWORD" />

          <h2 className="text-black flex items-center justify-center font-semibold md:text-[32px] text-[24px] leading-[100%] tracking-normal">
            CREATE A NEW PASSWORD
          </h2>

          <p className="text-[#777777] text-[16px] leading-[100%] tracking-normal text-center">
            Create a new password to secure your store
          </p>

          <div className="w-full border-t border-[#e5e5e5] my-2" />

          {/* Password Requirements */}
          <ul className="w-full text-[#111111] text-[14px] space-y-2 text-start list-disc list-inside">
            <li>Password must be at least 8 characters</li>
            <li>Password must contain at least one special character</li>
            <li>Password must contain at least one number</li>
            <li>Password must contain at least one uppercase letter</li>
          </ul>

          <form
            onSubmit={handleSubmit}
            className="max-w-[640px] w-full space-y-6 leading-[100%] pt-2"
          >
            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[14px] text-[#111111]">
                New Password
              </label>

              <div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] pr-12 text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200 ${
                      errors.password && touched.password
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-none focus:ring-1 focus:ring-[#7ed957]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <Image src={eyeOpenIcon} alt="" width={20} height={20} />
                  </button>
                </div>

                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-[14px] text-[#111111]"
              >
                Confirm New Password
              </label>

              <div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Re-enter new password"
                    autoComplete="new-password"
                    className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] pr-12 text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-none focus:ring-1 focus:ring-[#7ed957]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    <Image src={eyeOpenIcon} alt="" width={20} height={20} />
                  </button>
                </div>

                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3 w-full justify-center">
              <Link
                href="/login"
                className="px-8.5 py-2.5 rounded-full border border-[#111111] text-[14px] font-semibold text-[#111111] hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8.5 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] text-[14px] text-[#111111] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving Password..." : "Save Password"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
