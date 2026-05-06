"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { shopSchema } from "@/lib/validation/shopSchema";

import FormField from "./FormField";
import FormActions from "./FormActions";
import HelperText from "./HelperText";
import SectionHeading from "./SectionHeader";
import { useShopStore } from "@/store/shopStore";

export default function SetupShopForm() {
  interface ShopValues {
    shopName: string;
    shopBio: string;
  }
  const router = useRouter();
  const { shopName, shopBio, setShopData } = useShopStore();

  const formik = useFormik<ShopValues>({
    initialValues: { shopName: shopName || "", shopBio: shopBio || "" },
    enableReinitialize: true,
    validationSchema: shopSchema,
    onSubmit: async (values) => {
      setShopData(values); // 👈 save to global store
      router.push("/setup-shop/step-2");
    },
  });

  // console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
      <SectionHeading
        title="Shop Information"
        description="Add details customers need to trust your shop."
      />

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
