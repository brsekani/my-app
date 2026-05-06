"use client";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionHeading from "@/components/setup-shop-step2/SectionHeading";
import FormActions from "@/components/setup-shop-step2/FormActions";
import ShopBadge from "@/components/setup-shop-step2/ShopBadge";
import WhatsAppField from "@/components/setup-shop-step2/WhatsAppField";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/setup-shop-step2/ConfirmModal";
import StepIndicator from "@/components/setup-shop/StepIndicator";
import { Formik, Form } from "formik";
import { whatsappSchema } from "@/schemas";
import Modal from "@/components/Modal";
import { useShopStore } from "@/store/shopStore";

interface WhatsAppValues {
  whatsapp: string;
}

export default function SetupShopStep2Page() {
  const { shopName, shopBio, whatsapp, setShopData, hasHydrated } =
    useShopStore();
  const resetShop = useShopStore((state) => state.resetShop);

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState<WhatsAppValues | null>(null);

  async function handleSubmit(values: WhatsAppValues) {
    setShopData({ whatsapp: values.whatsapp }); // ✅ save to store
    setFormValues(values);
    setShowModal(true);
  }

  async function handleConfirm() {
    if (!formValues) return;

    setShowModal(false);

    console.log("FINAL DATA:", {
      shopName,
      shopBio,
      whatsapp: formValues.whatsapp,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/setup-shop/step-2/shop-ready");
  }

  useEffect(() => {
    if (!hasHydrated) return;

    const hasStep1Data =
      shopName?.trim().length > 0 && shopBio?.trim().length > 0;

    if (!hasStep1Data) {
      router.replace("/setup-shop");
    }
  }, [hasHydrated, shopName, shopBio, router]);

  return (
    <div className="min-h-[90vh] bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-[640px] flex flex-col items-center gap-6">
          <ShopBadge />

          <h1 className="font-semibold text-center text-2xl sm:text-[32px] text-[#111111]">
            Set Up Your Shop
          </h1>

          <p className="text-[16px] text-[#777777] text-center">
            Add details customers need to trust your shop.
          </p>

          <StepIndicator currentStep={2} />

          <Formik
            initialValues={{ whatsapp: whatsapp || "" }}
            enableReinitialize
            validationSchema={whatsappSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="w-full flex flex-col gap-6">
                <SectionHeading
                  title="Enter WhatsApp Number"
                  description="Customers will contact you through this WhatsApp number."
                />

                {/* ❌ REMOVE value/onChange props */}
                <WhatsAppField />

                <FormActions isSubmitting={isSubmitting} />

                <Modal
                  closeOnOverlayClick={false}
                  open={showModal}
                  onClose={() => setShowModal(false)}
                  width="w-[640px]"
                >
                  <ConfirmModal
                    phoneNumber={values.whatsapp}
                    onEdit={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                  />
                </Modal>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
