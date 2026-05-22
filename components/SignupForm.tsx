"use client";
import { useFormik, FormikHelpers } from "formik";
import Link from "next/link";
import { basicSchema } from "../schemas";
import { useRouter } from "next/navigation";

interface SignupValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();

  const onSubmit = async (
    values: SignupValues,
    actions: FormikHelpers<SignupValues>,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Signup values:", values);

    actions.resetForm();
    router.push(
      "/create-account/verify-email?email=" + encodeURIComponent(values.email),
    );
  };

  const {
    values,
    handleBlur,
    handleChange,
    isSubmitting,
    touched,
    handleSubmit,
    errors,
  } = useFormik<SignupValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-[640px] w-full space-y-6 leading-[100%]"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-[14px] text-[#111111]">
          First Name
        </label>
        <div className="space-y-0.5">
          <input
            value={values.firstName}
            onChange={handleChange}
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            onBlur={handleBlur}
            className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200
  ${
    errors.firstName && touched.firstName
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-none focus:ring-1 focus:ring-[#A7E981]"
  }`}
          />

          {errors.firstName && touched.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="text-[14px] text-[#111111]">
          Last Name
        </label>
        <div className="space-y-0.5">
          <input
            id="lastName"
            value={values.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Enter your last name"
            onBlur={handleBlur}
            className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200
  ${
    errors.lastName && touched.lastName
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-none focus:ring-1 focus:ring-[#A7E981]"
  }`}
          />
          {errors.lastName && touched.lastName && (
            <p className="text-red-500 text-xs ">{errors.lastName}</p>
          )}
        </div>
      </div>

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
        <label htmlFor="password" className="text-[14px] text-[#111111]">
          Password
        </label>

        <div className="space-y-0.5">
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter password"
            onBlur={handleBlur}
            className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200
  ${
    errors.password && touched.password
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-none focus:ring-1 focus:ring-[#A7E981]"
  }`}
          />

          {errors.password && touched.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-[14px] text-[#111111]">
          Confirm Password
        </label>
        <div className="space-y-1">
          <input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            onBlur={handleBlur}
            className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] text-[#111111] placeholder:text-[#6B6B6B] outline-none border transition-all duration-200
  ${
    errors.confirmPassword && touched.confirmPassword
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-none focus:ring-1 focus:ring-[#A7E981]"
  }`}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs ">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full gap-6">
        <button
          disabled={isSubmitting}
          type="submit"
          className=" text-[14px] px-[23.5px] md:w-fit w-full py-2.5 text-center bg-[#A7E981] hover:bg-[#5fc23e] transition-colors text-[#111111]/50 font-semibold rounded-full"
        >
          {isSubmitting ? "Sending..." : "Continue"}
        </button>
      </div>

      <p className="text-center text-[14px] text-[#777777]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold hover:underline text-[#111111]"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
