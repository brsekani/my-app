"use client";

import Badge from "@/components/Badge";
import shoppingIcon from "@/assets/svgs/shopping-cart.svg";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { useRequestPasswordResetMutation } from "@/redux/api/passwordResetApi";
import { STORAGE_KEYS } from "@/constants/storageKeys";

export default function Page() {
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();
  const router = useRouter();

  const {
    values,
    handleBlur,
    handleChange,
    isSubmitting,
    touched,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await requestPasswordReset(values).unwrap();

        sessionStorage.setItem(
          STORAGE_KEYS.passwordReset.pendingToken,
          response.data.pending_token,
        );

        showToast.success(response.message);

        router.push("/forgot-password/verify-email");
      } catch (error: any) {
        showToast.error(
          error?.data?.message || "Unable to request password reset.",
        );

        console.error(error);
      }
    },
  });

  return (
    <main className="w-full h-[90vh] flex items-center justify-center py-10 px-5">
      <section className="w-full h-full flex flex-col md:max-w-[640px] items-center justify-center ">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-6">
          <Badge imageUrl={shoppingIcon} text={"RESET YOUR PASSWORD"} />

          <h2 className="text-black  flex items-center justify-center font-semibold  md:text-[32px] text-[24px] leading-[100%] tracking-normal">
            FORGOT YOUR PASSWORD?
          </h2>

          <p className="text-[#777777] text-[16px] leading-[100%] tracking-normal text-center">
            Enter your email address to reset your password.
          </p>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 border-t w-full  border-[#e5e5e5]" />
            <span className="text-[14px] leading-[100%] text-[#111111] uppercase">
              OR
            </span>
            <div className="flex-1 border-t w-2xs  border-[#e5e5e5]" />
          </div>

          <p className="text-[#111111] text-[14px] leading-[100%] font-medium text-start w-full">
            We will send a secure code to this email address
          </p>

          <form
            onSubmit={handleSubmit}
            className=" max-w-[640px] w-full space-y-6 leading-[100%]"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] text-[#111111]">
                Email Address
              </label>
              <div className="space-y-0.5">
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter your Email Address"
                  onBlur={handleBlur}
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200
  ${
    errors.email && touched.email
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-none focus:ring-1 focus:ring-[#A7E981]"
  }`}
                />

                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs ">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-1 w-full justify-center">
              <Link
                href="/create-account"
                aria-disabled={isLoading}
                tabIndex={isLoading ? -1 : 0}
                onClick={(event) => {
                  if (isLoading) {
                    event.preventDefault();
                  }
                }}
                className={`px-8.5 py-2.5 rounded-full border border-[#111111] text-[14px] font-semibold text-[#111111] transition-colors ${
                  isLoading
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "hover:bg-gray-50"
                }`}
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8.5 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] text-[14px] text-[#111111] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending Reset Code" : "Send Reset Code"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
