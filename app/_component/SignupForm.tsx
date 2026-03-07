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
    router.push("/verifyEmail?email=" + encodeURIComponent(values.email));
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
      className=" w-[50%] rounded-b mb-3 px-4 pt-3 pb-5 space-y-2"
    >
      <label
        htmlFor="firstName"
        className="block text-sm font-medium text-gray-700"
      >
        First Name
      </label>
      <input
        value={values.firstName}
        onChange={handleChange}
        id="firstName"
        type="text"
        placeholder="Enter your first name"
        onBlur={handleBlur}
        className={`w-full focus:outline-none focus:ring-2 focus:ring-[#1bc8c8]/40 placeholder:text-[12px] text-[14px] text-[#111111]  font-normal placeholder:text-[#6B6B6B] border rounded-md px-3 py-2 ${errors.firstName && touched.firstName ? "border-red-500" : ""}`}
      />

      {errors.firstName && touched.firstName && (
        <p className="text-red-500 text-xs ">{errors.firstName}</p>
      )}

      <label
        htmlFor="lastName"
        className="block text-sm font-medium text-gray-700"
      >
        Last Name
      </label>
      <input
        id="lastName"
        value={values.lastName}
        onChange={handleChange}
        type="text"
        placeholder="Enter your last name"
        onBlur={handleBlur}
        className={`w-full focus:outline-none focus:ring-2 focus:ring-[#1bc8c8]/40 placeholder:text-[12px] text-[14px] text-[#111111]  font-normal placeholder:text-[#6B6B6B] border rounded-md px-3 py-2 ${errors.lastName && touched.lastName ? "border-red-500" : ""}`}
      />

      {errors.lastName && touched.lastName && (
        <p className="text-red-500 text-xs ">{errors.lastName}</p>
      )}

      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email Address
      </label>
      <input
        id="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter your Email Address"
        onBlur={handleBlur}
        className={`w-full border focus:outline-none focus:ring-2 focus:ring-[#1bc8c8]/40 placeholder:text-[12px] text-[14px] text-[#111111]  font-normal placeholder:text-[#6B6B6B] rounded-md px-3 py-2 ${errors.email && touched.email ? "border-red-500" : ""}`}
      />

      {errors.email && touched.email && (
        <p className="text-red-500 text-xs ">{errors.email}</p>
      )}

      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Enter password"
        onBlur={handleBlur}
        className={`w-full border focus:outline-none focus:ring-2 focus:ring-[#1bc8c8]/40 placeholder:text-[12px] text-[14px] text-[#111111]  font-normal placeholder:text-[#6B6B6B] rounded-md px-3 py-2 ${errors.password && touched.password ? "border-red-500" : ""}`}
      />

      {errors.password && touched.password && (
        <p className="text-red-500 text-xs ">{errors.password}</p>
      )}

      <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
        onBlur={handleBlur}
        className={`w-full focus:outline-none focus:ring-2 focus:ring-[#1bc8c8]/40 placeholder:text-[12px] text-[14px] text-[#111111]  font-normal placeholder:text-[#6B6B6B] border  rounded-md px-3 py-2 ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}`}
      />
      {errors.confirmPassword && touched.confirmPassword && (
        <p className="text-red-500 text-xs ">{errors.confirmPassword}</p>
      )}

      <div className="pt-1 flex justify-center items-center">
        <button
          disabled={isSubmitting}
          type="submit"
          className=" w-[20%] text-center bg-[#7ed957] hover:bg-[#5fc23e] transition-colors text-white font-bold text-sm tracking-wide py-3 rounded-full border border-[#5fc23e]"
        >
          {isSubmitting ? "Sending..." : "Continue"}
        </button>
      </div>

      <p className="text-center text-sm pt-1">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
