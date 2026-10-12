"use client";

import Badge from "@/components/Badge";
import shoppingIcon from "@/assets/svgs/shopping-cart.svg";
import googleIcon from "@/assets/svgs/google.svg";
import eyeOpenIcon from "@/assets/svgs/eye-open.svg";
import Image from "next/image";
import { useFormik } from "formik";
import { loginSchema } from "@/schemas";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useLoginCustomerMutation,
  useSocialLoginMutation,
} from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginCustomer, { isLoading }] = useLoginCustomerMutation();

  const [socialLogin, { isLoading: isLoadingSocialLogin }] =
    useSocialLoginMutation();

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const firebaseIdToken = await result.user.getIdToken();
      console.log(firebaseIdToken);

      const response = await socialLogin({
        provider: "GOOGLE",
        access_token: firebaseIdToken,
      }).unwrap();

      window.location.assign("/");

      console.log("Lumished social login:", response);

      // Continue with your normal authentication flow here.
      // response.data.token = Lumished Sanctum token
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

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
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await loginCustomer({
          email: values.email,
          password: values.password,
        }).unwrap();

        console.log("Login successful:", response);
        showToast.success(response?.message || "Login successful");

        actions.resetForm();

        router.push("/dashboard");
      } catch (error: any) {
        console.error("Login failed:", error);
        showToast.error(error?.data?.message || "Login error");

        // if (error?.status === 401) {
        //   actions.setFieldError("email", "Invalid email or password.");
        //   actions.setFieldError("password", "Invalid email or password.");
        // }

        // if (error?.status === 423) {
        //   actions.setStatus(
        //     "Your account has been locked. Please try again in one hour.",
        //   );
        // }

        // if (error?.data?.errors) {
        //   Object.entries(error.data.errors).forEach(([field, messages]) => {
        //     actions.setFieldError(field, (messages as string[])[0]);
        //   });
        // }

        // if (!error?.status) {
        //   actions.setStatus(
        //     "Unable to connect to the server. Please try again.",
        //   );
        // }
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <main className="w-full h-[90vh] flex items-center justify-center py-10 px-5">
      <section className="w-full h-full flex flex-col md:max-w-[640px] items-center justify-center ">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-6">
          <Badge imageUrl={shoppingIcon} text={"Access your store"} />

          <h2 className="text-black  flex items-center justify-center font-semibold  md:text-[32px] text-[24px] leading-[100%] tracking-normal">
            WELCOME BACK
          </h2>

          <p className="text-[#777777] text-[16px] leading-[100%] tracking-normal text-center">
            Log in to access your store and manage your products.
          </p>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoadingSocialLogin || isLoading}
            className="flex items-center gap-2 py-[5.5px] pl-[14px] pr-[6px] border-[#e5e5e5] border-1 rounded-[24px]"
          >
            <span className="font-medium text-[12px] leading-[100%] text-[#777777] uppercase">
              {isLoadingSocialLogin ? "Connecting..." : "Continue with Google"}
            </span>

            <div className="w-[28px] h-[28px] bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <Image
                src={googleIcon}
                alt="Google Group Icon"
                width={16.24}
                height={16.19}
              />
            </div>
          </button>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 border-t w-full  border-[#e5e5e5]" />
            <span className="text-[14px] leading-[100%] text-[#111111] uppercase">
              OR
            </span>
            <div className="flex-1 border-t w-2xs  border-[#e5e5e5]" />
          </div>

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

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[14px] text-[#111111]"
                >
                  Password
                </label>

                <Link
                  href={"/forgot-password"}
                  className="text-[14px] leading-[100%] font-semibold text-[#111111] underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="space-y-0.5">
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    onBlur={handleBlur}
                    className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200 pr-9
  ${
    errors.password && touched.password
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-none focus:ring-1 focus:ring-[#A7E981]"
  }`}
                  />

                  <Image
                    src={eyeOpenIcon}
                    onClick={() => setShowPassword((p) => !p)}
                    alt="eye-open"
                    className="absolute top-4 right-[14px] cursor-pointer"
                  />
                </div>

                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center w-full gap-6">
              <button
                disabled={isSubmitting}
                type="submit"
                className=" text-[14px] px-[23.5px] md:w-fit w-full py-2.5 text-center bg-[#A7E981] hover:bg-[#5fc23e] transition-colors text-[#111111]/50 font-semibold rounded-full"
              >
                {isSubmitting ? "loging..." : "Login"}
              </button>
            </div>

            <p className="text-center text-[14px] text-[#777777]">
              Don’t have an account?{" "}
              <Link
                href="/create-account"
                className="font-semibold hover:underline text-[#111111]"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
