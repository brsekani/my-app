"use client";

import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import Image from "next/image";

import eyeOpen from "@/assets/svgs/eye-open.svg";
import eyeClose from "@/assets/svgs/eye-close.svg";
import { changePasswordSchema } from "@/schemas";
import PasswordToggleIcon from "@/components/settings/PasswordToggleIcon";

export default function Page() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: changePasswordSchema,

    onSubmit: async (values) => {
      console.log("CHANGE PASSWORD:", values);

      // API call here
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <div className="leading-[100%] space-y-6 w-full py-5">
        <h6 className="text-[14px] font-medium">CHANGE PASSWORD</h6>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* CURRENT PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#111111]">
              Current Password
            </label>

            <div className="space-y-0.5">
              <div className="relative">
                <input
                  name="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm pl-[14px] pr-12 text-[14px] outline-none border transition-all duration-200 ${
                    errors.currentPassword && touched.currentPassword
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                  }`}
                />

                <PasswordToggleIcon
                  show={showCurrentPassword}
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                />
              </div>

              {errors.currentPassword && touched.currentPassword && (
                <p className="text-red-500 text-xs">{errors.currentPassword}</p>
              )}
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#111111]">New Password</label>

            <div className="space-y-0.5">
              <div className="relative">
                <input
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm pl-[14px] pr-12 text-[14px] outline-none border transition-all duration-200 ${
                    errors.newPassword && touched.newPassword
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                  }`}
                />

                <PasswordToggleIcon
                  show={showNewPassword}
                  onClick={() => setShowNewPassword((prev) => !prev)}
                />
              </div>

              {errors.newPassword && touched.newPassword && (
                <p className="text-red-500 text-xs">{errors.newPassword}</p>
              )}
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#111111]">
              Confirm Password
            </label>

            <div className="space-y-0.5">
              <div className="relative">
                <input
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm pl-[14px] pr-12 text-[14px] outline-none border transition-all duration-200 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                  }`}
                />

                <PasswordToggleIcon
                  show={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              </div>

              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 w-full md:w-fit rounded-full bg-[#7ED957] text-[#111111] font-semibold text-[14px] disabled:opacity-50"
          >
            Change Password
          </button>
        </form>
      </div>
    </FormikProvider>
  );
}
