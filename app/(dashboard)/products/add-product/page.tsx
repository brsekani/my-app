"use client";

import { useRef } from "react";
import { useFormik, FormikProvider } from "formik";
import Image from "next/image";

import Badge from "@/components/Badge";
import shoppingIcon from "@/assets/svgs/shopping-cart.svg";
import pictureIcon from "@/assets/svgs/picture.svg";
import addIcon from "@/assets/svgs/add.svg";
import removeImage from "@/assets/svgs/remove-image.svg";
import CustomAmountInput from "@/components/CustomAmountInput";
import Link from "next/link";
import { productSchema } from "@/schemas";
import { useRouter } from "next/navigation";

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      images: [] as File[],
      productName: "",
      description: "",
      price: {
        currency: "NGN",
        amount: "",
      },
    },

    validationSchema: productSchema,

    onSubmit: (values) => {
      console.log("FORM DATA:", values);

      router.push("/products/add-product/success");
    },
  });

  const { values, handleChange, handleBlur, errors, touched } = formik;

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const fileArray = Array.from(files);

    const updatedImages = [...values.images, ...fileArray].slice(0, 3);

    formik.setFieldValue("images", updatedImages);
  };

  return (
    <FormikProvider value={formik}>
      <div className="max-w-[640px] w-full mx-auto flex items-center justify-center min-h-[90vh] py-10">
        <div className="flex items-center justify-center gap-6 flex-col w-full">
          <Badge imageUrl={shoppingIcon} text={"ADD YOUR PRODUCT"} />

          <h1 className="text-[24px] md:text-[32px] font-semibold text-[#111111] uppercase text-center">
            Add a product
          </h1>

          <p className="text-[16px] text-[#777777] text-center">
            Add details so customers can view and order it.
          </p>

          <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
            {/* IMAGE SECTION */}
            <div className="border-y border-[#E5E5E5] py-6 space-y-6">
              <div className="text-[14px]">
                <p className="font-medium text-[#111111] uppercase">
                  ADD IMAGE(S)
                </p>

                <p className="text-[#777777] mt-1">
                  Upload up to 3 images (JPG, PNG, WEBP only)
                </p>
              </div>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                multiple
                ref={inputRef}
                onChange={handleChangeImage}
                className="hidden"
              />

              <div className="space-y-0.5">
                <div className="flex gap-3 flex-wrap">
                  {values.images.map((file, index) => {
                    const preview = URL.createObjectURL(file);

                    return (
                      <div
                        key={index}
                        className="w-[calc((100%-24px)/3)] aspect-square max-w-[120px] max-h-[120px] min-w-[90px] min-h-[90px] border border-[#E5E5E5] rounded-[6px] overflow-hidden relative"
                      >
                        <img
                          src={preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const updated = values.images.filter(
                              (_, i) => i !== index,
                            );

                            formik.setFieldValue("images", updated);
                          }}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                        >
                          <Image
                            src={removeImage}
                            alt="remove"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                    );
                  })}

                  {values.images.length < 3 && (
                    <div
                      onClick={handleClick}
                      className="w-[calc((100%-24px)/3)] aspect-square max-w-[120px] max-h-[120px] min-w-[90px] min-h-[90px] border border-[#E5E5E5] rounded-[6px] flex flex-col items-center justify-center gap-2 cursor-pointer"
                    >
                      <Image src={pictureIcon} alt="picture-icon" />

                      <div className="flex items-center gap-1">
                        <Image src={addIcon} alt="add-icon" />

                        <p className="text-[#777777] text-[12px]">Add Image</p>
                      </div>
                    </div>
                  )}
                </div>
                {errors.images && touched.images && (
                  <p className="text-red-500 text-xs">
                    {errors.images as string}
                  </p>
                )}
              </div>
            </div>

            {/* PRODUCT NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#111111]">Product Name</label>

              <div className="space-y-0.5">
                <input
                  name="productName"
                  value={values.productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter product name"
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] outline-none border transition-all duration-200
      ${
        errors.productName && touched.productName
          ? "border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
      }`}
                />

                {errors.productName && touched.productName && (
                  <p className="text-red-500 text-xs">{errors.productName}</p>
                )}
              </div>
            </div>

            {/* PRICE */}
            <CustomAmountInput name="price" label="Price" disabled={false} />

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#111111]">Description</label>

              <div className="space-y-0">
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describe your product"
                  className={`w-full bg-[#F5F5F5] rounded px-[14px] py-3 text-[14px] outline-none border resize-none transition-all duration-200 h-[121px]
      ${
        errors.description && touched.description
          ? "border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
      }`}
                />

                {errors.description && touched.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-1 w-full justify-center">
              <Link
                href="/create-account"
                className="px-8.5 py-2.5 rounded-full border border-[#111111] text-[14px] font-semibold text-[#111111] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-8.5 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] text-[14px] text-[#111111] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}
