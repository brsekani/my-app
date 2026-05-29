"use client";

import { useRef, useState, useEffect } from "react";

import back from "@/assets/svgs/back.svg";
import removeImage from "@/assets/svgs/remove-image.svg";

import Image, { StaticImageData } from "next/image";

import testImage from "@/assets/Images/test-image.jpg";
import testImage2 from "@/assets/Images/test-image-2.png";

import { FormikProvider, useFormik } from "formik";

import { productSchema } from "@/schemas";

import CustomAmountInput from "@/components/CustomAmountInput";

import pictureIcon from "@/assets/svgs/picture.svg";
import addIcon from "@/assets/svgs/add.svg";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/setup-shop-step2/ConfirmModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";

export default function Page() {
  const existingProduct = {
    productName: "Wireless Headphones",
    description:
      "Premium noise-cancelling wireless headphones with long battery life.",
    price: {
      currency: "NGN",
      amount: "45,000",
    },
    images: [testImage, testImage2],
  };

  const existingImages = existingProduct?.images || [];

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [previewImages, setPreviewImages] = useState<any[]>(existingImages);

  const [selectedImage, setSelectedImage] = useState<any>(
    existingImages[0] || null,
  );

  const formik = useFormik({
    initialValues: {
      images: existingImages as (File | string | StaticImageData)[],
      productName: existingProduct.productName || "",
      description: existingProduct.description || "",
      price: {
        currency: existingProduct.price.currency || "NGN",
        amount: existingProduct.price.amount || "",
      },
    },

    validationSchema: productSchema,

    onSubmit: (values, { resetForm }) => {
      console.log("FORM DATA:", values);

      resetForm({
        values,
      });

      setIsEdit(false);
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    dirty,
  } = formik;

  useEffect(() => {
    if (!selectedImage && previewImages.length > 0) {
      setSelectedImage(previewImages[0]);
    }
  }, [previewImages, selectedImage]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const totalImages = previewImages.length + files.length;

    if (totalImages > 3) return;

    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setFieldValue("images", [...values.images, ...files]);

    setPreviewImages((prev) => [...prev, ...previewUrls]);

    if (!selectedImage) {
      setSelectedImage(previewUrls[0]);
    }
  };

  const handleRemove = (index: number) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    const updatedImages = values.images.filter((_, i) => i !== index);

    setPreviewImages(updatedPreviews);

    setFieldValue("images", updatedImages);

    if (selectedImage === previewImages[index]) {
      setSelectedImage(updatedPreviews[0] || null);
    }
  };

  return (
    <FormikProvider value={formik}>
      <div className="leading-[100%] space-y-6">
        <div className="flex items-center gap-2">
          <Image src={back} alt="back" />

          <p className="text-[16px] font-medium text-[#111111] underline">
            Back
          </p>
        </div>

        <hr className="w-full border-[#E5E5E5]" />

        <div className="grid md:grid-cols-[25.69%_74.31%] grid-rows-1 md:gap-[1.67%] gap-6">
          <div className="md:hidden flex justify-end text-[14px] font-semibold text-[#111111]">
            <div className="flex items-center gap-[25.5px]">
              {isEdit ? (
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="text-[#111111] underline cursor-pointer"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className="text-[#E32B2B] underline cursor-pointer"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Product
                </button>
              )}

              {isEdit ? (
                <button
                  type="submit"
                  form="product-form"
                  disabled={!dirty || !isEdit}
                  className="px-[33px] py-1.5 border-[#111111] border rounded-[100px] disabled:opacity-50"
                >
                  Update Product
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="px-[33px] py-1.5 border-[#111111] border rounded-[100px]"
                >
                  Edit Product
                </button>
              )}
            </div>
          </div>
          {/* LEFT */}
          <div className="w-full space-y-3">
            {/* MAIN IMAGE */}
            {/* MAIN IMAGE */}
            <div
              onClick={() => {
                if (isEdit && !selectedImage) {
                  handleClick();
                }
              }}
              className="relative w-full h-[370px] overflow-hidden rounded-[8px] border border-[#E5E5E5] bg-[#FAFAFA]"
            >
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="product-image"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
                  <Image
                    src={pictureIcon}
                    alt="picture-icon"
                    className="w-10 h-10 opacity-70"
                  />

                  <div className="flex items-center gap-1">
                    <Image src={addIcon} alt="add-icon" className="w-3 h-3" />

                    <p className="text-[#777777] text-[11px] sm:text-[12px]">
                      Add Image
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-[2%]">
              {previewImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-[32%] min-h-20 h-full aspect-square overflow-hidden rounded-[8px] border transition-all ${
                    selectedImage === image
                      ? "border-[#68DB25]"
                      : "border-[#E5E5E5]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`preview-${index}`}
                    fill
                    className="object-cover"
                  />

                  {isEdit && (
                    <div
                      // type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(index);
                      }}
                      className="absolute top-1 right-1 z-10 flex items-center justify-center rounded-full bg-white shadow-md p-1"
                    >
                      <Image
                        src={removeImage}
                        alt="remove"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                  )}
                </button>
              ))}

              {isEdit && previewImages.length < 3 && (
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-[32%] h-full min-h-20 aspect-square border border-dashed border-[#E5E5E5] rounded-[8px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#FAFAFA] transition-all"
                >
                  <Image
                    src={pictureIcon}
                    alt="picture-icon"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  />

                  <div className="flex items-center gap-1">
                    <Image src={addIcon} alt="add-icon" className="w-3 h-3" />

                    <p className="text-[#777777] text-[11px] sm:text-[12px]">
                      Add Image
                    </p>
                  </div>
                </button>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleUpload}
            />

            {errors.images && touched.images && (
              <p className="text-red-500 text-xs">{errors.images as string}</p>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <div className="md:flex hidden justify-end text-[14px] font-semibold text-[#111111]">
              <div className="flex items-center gap-[25.5px]">
                {isEdit ? (
                  <button
                    type="button"
                    onClick={() => setIsEdit(false)}
                    className="text-[#111111] underline cursor-pointer"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-[#E32B2B] underline cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Product
                  </button>
                )}

                {isEdit ? (
                  <button
                    type="submit"
                    form="product-form"
                    disabled={!dirty || !isEdit}
                    className="px-[33px] py-1.5 border-[#111111] border rounded-[100px] disabled:opacity-50"
                  >
                    Update Product
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEdit(true)}
                    className="px-[33px] py-1.5 border-[#111111] border rounded-[100px]"
                  >
                    Edit Product
                  </button>
                )}
              </div>
            </div>

            <form
              id="product-form"
              onSubmit={formik.handleSubmit}
              className="w-full flex-1 flex flex-col gap-6"
            >
              {/* PRODUCT NAME */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#111111]">
                  Product Name
                </label>

                <div className="space-y-0.5">
                  <input
                    disabled={!isEdit}
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter product name"
                    className={`h-[45px] w-full bg-[#F5F5F5] disabled:bg-[#F8F8F8] disabled:text-[#B0B0B0] disabled:border-[#E5E5E5] disabled:cursor-not-allowed rounded-sm px-[14px] text-[14px] outline-none border transition-all duration-200 ${
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
                disabled={!isEdit}
              />

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#111111]">
                  Description
                </label>

                <div className="space-y-0">
                  <textarea
                    disabled={!isEdit}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Describe your product"
                    className={`w-full bg-[#F5F5F5] disabled:bg-[#F8F8F8] disabled:text-[#B0B0B0] disabled:border-[#E5E5E5] disabled:cursor-not-allowed rounded px-[14px] py-3 text-[14px] outline-none border resize-none transition-all duration-200 h-[121px] ${
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
            </form>
          </div>
        </div>
      </div>

      <Modal
        closeOnOverlayClick={false}
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        width="w-[640px]"
      >
        <DeleteProductModal
          phoneNumber={"0923232323"}
          onEdit={() => setShowDeleteModal(false)}
          onConfirm={() => {}}
        />
      </Modal>
    </FormikProvider>
  );
}
