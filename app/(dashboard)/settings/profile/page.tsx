"use client";

import Modal from "@/components/Modal";
import ConfrimPhoneNumberChange from "@/components/settings/ConfrimPhoneNumberChange";
import WhatsAppField from "@/components/setup-shop-step2/WhatsAppField";
import FormField from "@/components/setup-shop/FormField";
import { profileSchema } from "@/schemas";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import info from "@/assets/svgs/info.svg";
import Image from "next/image";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const userData = {
    firstName: "Temidayo",
    lastName: "Lawal",
    email: "temidayo@example.com",
    whatsapp: "+2348012345678",
    shopName: "Temi Gadgets",
    shopBio:
      "We sell quality phones, accessories, smart devices, and electronics at affordable prices with nationwide delivery.",
  };

  const originalWhatsapp = userData.whatsapp;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      whatsapp: userData?.whatsapp || "",
      shopName: userData?.shopName || "",
      shopBio: userData?.shopBio || "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      const phoneChanged = values.whatsapp !== originalWhatsapp;

      if (phoneChanged) {
        setPendingValues(values);
        setShowModal(true);
        return;
      }

      saveProfile(values);
    },
  });

  const saveProfile = async (values: any) => {
    console.log("Saving profile:", values);

    // API call here
  };

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;

  return (
    <FormikProvider value={formik}>
      <div className="leading-[100%] space-y-6 w-full pb-5">
        <h6 className="text-[14px] font-medium">EDIT PROFILE</h6>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[14px] text-[#111111]">First Name</label>

              <div className="space-y-0.5">
                <input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter your full name"
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] outline-none border transition-all duration-200 ${
                    errors.firstName && touched.firstName
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                  }`}
                />

                {errors.firstName && touched.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[14px] text-[#111111]">Last Name</label>

              <div className="space-y-0.5">
                <input
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter your full name"
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] outline-none border transition-all duration-200 ${
                    errors.lastName && touched.lastName
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                  }`}
                />

                {errors.lastName && touched.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] text-[#111111]">Email</label>

            <div className="space-y-0.5">
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter your full name"
                className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] outline-none border transition-all duration-200 ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                }`}
              />

              {errors.email && touched.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
          </div>

          <WhatsAppField />

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] text-[#111111]">Shop Name</label>

            <div className="space-y-0.5">
              <input
                name="shopName"
                value={values.shopName}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter your full name"
                className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] outline-none border transition-all duration-200 ${
                  errors.shopName && touched.shopName
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                }`}
              />

              {errors.shopName && touched.shopName && (
                <p className="text-red-500 text-xs">{errors.shopName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] text-[#111111]">Shop Bio</label>

            <div className="space-y-0.5">
              <textarea
                name="shopBio"
                value={values.shopBio}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                rows={3}
                className={`w-full bg-[#F5F5F5] rounded-sm p-[14px] text-[14px] outline-none border transition-all duration-200 resize-none ${
                  errors.shopBio && touched.shopBio
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                }`}
              />

              {errors.shopBio && touched.shopBio && (
                <p className="text-red-500 text-xs">{errors.shopBio}</p>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Image src={info} alt="info-icon" />
              <p className="text-[14px] text-[#777777]">
                This helps customers understand what you sell.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 w-full md:w-fit rounded-full bg-[#7ED957] font-semibold text-[14px] text-[#111111]/50"
          >
            Save Changes
          </button>
        </form>
      </div>

      <Modal
        closeOnOverlayClick={false}
        open={showModal}
        onClose={() => setShowModal(false)}
        width="w-[640px]"
      >
        <ConfrimPhoneNumberChange
          phoneNumber={values.whatsapp}
          onEdit={() => setShowModal(false)}
          onConfirm={async () => {
            if (!pendingValues) return;

            await saveProfile(pendingValues);

            setShowModal(false);
            setPendingValues(null);
          }}
        />
      </Modal>
    </FormikProvider>
  );
}
