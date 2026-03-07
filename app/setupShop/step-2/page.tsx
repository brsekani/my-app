"use client";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionHeading from "@/app/_component/setup-shop-step2/SectionHeading";
import FormActions from "@/app/_component/setup-shop-step2/FormActions";
import StepIndicator from "@/app/_component/setup-shop-step2/StepIndicator";
import ShopBadge from "@/app/_component/setup-shop-step2/ShopBadge";
import WhatsAppField from "@/app/_component/setup-shop-step2/WhatsAppField";
import { useState } from "react";
import ConfirmModal from "@/app/_component/setup-shop-step2/ConfirmModal";

interface WhatsAppValues {
  whatsapp: string;
}

const whatsappSchema = Yup.object({
  whatsapp: Yup.string()
    .matches(/^\d{7,15}$/, "Enter a valid phone number")
    .required("WhatsApp number is required"),
});

export default function SetupShopStep2Page() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(
    values: WhatsAppValues,
    actions: FormikHelpers<WhatsAppValues>,
  ) {
    setShowModal(true);
    actions.setSubmitting(false);
  }

  async function handleConfirm() {
    setShowModal(false);
    console.log("WhatsApp values:", `+234${values.whatsapp}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/shop-ready");
  }

  function handleEdit() {
    setShowModal(false);
  }

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit: formikSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik<WhatsAppValues>({
    initialValues: { whatsapp: "" },
    validationSchema: whatsappSchema,
    onSubmit: handleSubmit,
  });

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

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-lg flex flex-col items-center gap-5">
          <ShopBadge />
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase text-center">
            Set Up Your Shop
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Add details customers need to trust your shop.
          </p>
          <StepIndicator currentStep={2} />
          <hr className="w-full border-gray-200" />

          <form onSubmit={formikSubmit} className="w-full flex flex-col gap-4">
            <SectionHeading />
            <WhatsAppField
              value={values.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.whatsapp}
              touched={touched.whatsapp}
            />
            <FormActions isSubmitting={isSubmitting} />
          </form>
        </div>
      </main>

      {showModal && (
        <ConfirmModal
          phoneNumber={`+234 ${values.whatsapp}`}
          onEdit={handleEdit}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
