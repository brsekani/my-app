"use client";

import Image from "next/image";
import close from "@/assets/svgs/close.svg";
import { FormikProvider, useFormik } from "formik";
import { useRef } from "react";

import Badge from "@/components/Badge";
import shoppingIcon from "@/assets/svgs/shopping-cart.svg";
import pictureIcon from "@/assets/svgs/picture.svg";
import addIcon from "@/assets/svgs/add.svg";
import removeImage from "@/assets/svgs/remove-image.svg";
import CustomAmountInput from "@/components/CustomAmountInput";
import Link from "next/link";
import { productSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/redux/api/productApi";
import { generateProductDescription } from "@/utils/generateProductDescription";

type AddProductDrawerProps = {
  onClose: () => void;
};

export default function AddProductDrawer({ onClose }: AddProductDrawerProps) {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      images: [] as File[],
      productName: "",
      description: "",
      stockQuantity: "1",
      unlimitedStock: false,
      price: "",
    },

    validationSchema: productSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.productName);
        formData.append("description", values.description);
        formData.append(
          "price",
          String(Number(values.price.replace(/,/g, ""))),
        );

        formData.append("compare_at_price", "0");
        formData.append("stock_quantity", values.stockQuantity);
        formData.append("status", "PUBLISHED");

        // Category IDs
        // formData.append(
        //   "category_ids[]",
        //   "01953801-abcd-1234-5678-1234567890ab",
        // );

        // Main image
        if (values.images.length > 0) {
          formData.append("photo", values.images[0]);
        }

        // Additional images
        values.images.forEach((file) => {
          formData.append("photos[]", file);
        });

        const response = await createProduct(formData).unwrap();

        console.log(response);

        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  console.log(formik);

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

  const handleGenerateDescription = () => {
    if (!values.productName.trim()) return;

    const description = generateProductDescription(values.productName);

    formik.setFieldValue("description", description);
  };

  return (
    <FormikProvider value={formik}>
      <div className="bg-[#FFFFFF] h-full flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[#E5E5E5] shrink-0">
          <h6 className="text-[18px] font-semibold text-[#111111] uppercase">
            Add a product
          </h6>

          <Image
            src={close}
            onClick={() => onClose()}
            width={24}
            height={14}
            alt="close-icon"
            className="cursor-pointer"
          />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-6">
          <form
            id="add-product-form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 py-6"
          >
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

            <p className="text-[14px] text-[#111111] font-medium">
              PRODUCT DETAILS
            </p>

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
                  className={`h-[45px] w-full bg-[#F5F5F5] rounded-sm px-[14px] text-[14px] outline-none border transition-all duration-200 ${
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
            <CustomAmountInput
              name="price"
              label="Price"
              disabled={false}
              mode={"amount"}
              max={100_000_000}
            />

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[14px] text-[#111111]">
                  Stock available
                </label>
              </div>

              <input
                type="text"
                name="stockQuantity"
                inputMode="numeric"
                pattern="[1-9][0-9]*"
                disabled={values.unlimitedStock}
                placeholder={values.unlimitedStock ? "Unlimited" : "e.g. 25"}
                value={values.stockQuantity}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow empty while typing, or positive whole numbers only
                  if (value === "" || /^[1-9][0-9]*$/.test(value)) {
                    formik.setFieldValue("stockQuantity", value);
                  }
                }}
                onBlur={handleBlur}
                className="w-full bg-[#F5F5F5] rounded px-[14px] py-3 text-[14px] outline-none border border-transparent focus:ring-1 focus:ring-[#A7E981] disabled:opacity-50"
              />

              {errors.stockQuantity &&
                touched.stockQuantity &&
                !values.unlimitedStock && (
                  <p className="text-red-500 text-xs">{errors.stockQuantity}</p>
                )}
            </div>

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
                  className={`w-full bg-[#F5F5F5] rounded px-[14px] py-3 text-[14px] outline-none border resize-none transition-all duration-200 h-[121px] ${
                    errors.description && touched.description
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
                  }`}
                />

                {errors.description && touched.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
              </div>

              <div className="w-full flex justify-end -mt-1">
                {values.productName.trim() && (
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    className="group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-medium text-[#111111] bg-[#7ed957] hover:bg-[#5fc23e] active:scale-[0.98] transition-all duration-200"
                  >
                    <span className="text-[13px] transition-transform duration-200 group-hover:rotate-12">
                      ✨
                    </span>
                    <span>Generate description</span>
                  </button>
                )}
              </div>
            </div>

            {/* Prevent last field from being hidden behind footer */}
            <div className="h-10" />
          </form>
        </div>

        {/* FOOTER */}
        <div className="shrink-0 border-t border-[#E5E5E5] bg-white p-6">
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-8.5 py-2.5 rounded-full border border-[#111111] text-[14px] font-semibold text-[#111111] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="add-product-form"
              className="px-8.5 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] text-[14px] text-[#111111] font-semibold transition-colors"
            >
              {isLoading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </FormikProvider>
  );
}
