"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { shopSchema } from "@/lib/validation/shopSchema";

import FormField from "./FormField";
import FormActions from "./FormActions";
import HelperText from "./HelperText";
import SectionHeading from "./SectionHeader";

export default function SetupShopForm() {
  interface ShopValues {
    shopName: string;
    shopBio: string;
  }
  const router = useRouter();

  const formik = useFormik<ShopValues>({
    initialValues: { shopName: "", shopBio: "" },
    validationSchema: shopSchema,
    onSubmit: async (values) => {
      console.log(values);
      router.push("/setupShop/step-2");
    },
  });

  // console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
      <SectionHeading />

      <FormField
        id="shopName"
        label="Shop Name"
        placeholder="Enter your shop name"
        value={formik.values.shopName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.shopName}
        touched={formik.touched.shopName}
      />

      <FormField
        id="shopBio"
        label="Shop Bio"
        placeholder="What is your shop about"
        value={formik.values.shopBio}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.shopBio}
        touched={formik.touched.shopBio}
        isTextarea
      />

      <HelperText />

      <FormActions isSubmitting={formik.isSubmitting} />
    </form>
  );
}
