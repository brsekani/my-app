"use client";

import { useRef, useState, useEffect } from "react";

import back from "@/assets/svgs/back.svg";
import removeImage from "@/assets/svgs/remove-image.svg";

import Image from "next/image";

import { FormikProvider, useFormik } from "formik";

import { productSchema } from "@/schemas";

import CustomAmountInput from "@/components/CustomAmountInput";

import pictureIcon from "@/assets/svgs/picture.svg";
import nothingHere from "@/assets/svgs/nothing-here.svg";
import addIcon from "@/assets/svgs/add.svg";
import Modal from "@/components/Modal";

import DeleteProductModal from "@/components/modals/DeleteProductModal";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { useParams, useRouter } from "next/navigation";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import EmptyState from "@/components/EmptyState";
import { generateProductDescription } from "@/utils/generateProductDescription";
import { useGetCustomerStoreQuery } from "@/redux/api/storeApi";
import { getCurrencyInfo } from "@/utils/currency";

type ProductPhoto = string | File | null;

function ProductImage({
  image,
  alt,
  className,
}: {
  image: ProductPhoto;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setSrc(null);
      return;
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setSrc(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setSrc(image);
  }, [image]);

  if (!src) return null;

  return <Image src={src} alt={alt} fill className={className} />;
}

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const {
    data: userData,
    isLoading: userDataLoading,
    isError,
  } = useGetCustomerStoreQuery();

  const currency = userData?.data?.store?.currency ?? "NGN";

  const { code, symbol } = getCurrencyInfo(currency);

  const existingProduct = data?.data?.product;
  const existingImages: ProductPhoto[] =
    existingProduct?.photos?.map((photo: string) => photo || null) ?? [];

  console.log(existingImages);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [previewImages, setPreviewImages] = useState<ProductPhoto[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProductPhoto>(null);

  const activeImageCount = previewImages.filter(Boolean).length;
  console.log(existingProduct?.price);

  console.log("SUBMIT STARTED");
  console.log("isUpdating before request:", isUpdating);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      images: existingImages,
      productName: existingProduct?.name || "",
      description: existingProduct?.description || "",
      stockQuantity: existingProduct?.stock_quantity || 1,
      price: existingProduct?.price || "",
    },

    validationSchema: productSchema,

    onSubmit: async (values, { resetForm }) => {
      console.log("SUBMIT STARTED");
      console.log("isUpdating before request:", isUpdating);

      try {
        const formData = new FormData();

        formData.append("name", values.productName);
        formData.append("description", values.description);
        formData.append("price", String(values.price).replace(/,/g, ""));

        // dummy values for now
        formData.append("compare_at_price", "0");
        formData.append("stock_quantity", String(values.stockQuantity));
        // formData.append("status", "DRAFT");

        // Only upload NEW images
        values.images.forEach((image, index) => {
          if (image === null) {
            formData.append(`photos[${index}]`, "");
            return;
          }

          if (image instanceof File) {
            formData.append(`photos[${index}]`, image);
          }
        });

        await updateProduct({
          id,
          formData,
        }).unwrap();

        resetForm({ values });
        setIsEdit(false);
      } catch (error) {
        console.error(error);
      }
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

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const activeImageCount = previewImages.filter(Boolean).length;

    if (activeImageCount + files.length > 3) {
      e.target.value = "";
      return;
    }

    const updatedImages = [...previewImages];

    files.forEach((file) => {
      const emptyIndex = updatedImages.findIndex((image) => image === null);

      if (emptyIndex !== -1) {
        updatedImages[emptyIndex] = file;
      } else if (updatedImages.length < 3) {
        updatedImages.push(file);
      }
    });

    setPreviewImages(updatedImages);
    setFieldValue("images", updatedImages);

    if (!selectedImage) {
      setSelectedImage(updatedImages.find(Boolean) ?? null);
    }

    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const updatedImages = [...previewImages];

    const removedImage = updatedImages[index];

    updatedImages[index] = null;

    setPreviewImages(updatedImages);
    setFieldValue("images", updatedImages);

    if (selectedImage === removedImage) {
      setSelectedImage(updatedImages.find(Boolean) ?? null);
    }
  };

  const handleCancelEdit = () => {
    const photos: ProductPhoto[] =
      existingProduct?.photos?.map((photo: string) => photo || null) ?? [];

    setPreviewImages(photos);
    setSelectedImage(photos.find(Boolean) ?? null);

    formik.resetForm();

    setIsEdit(false);
  };

  const handleGenerateDescription = () => {
    if (!values.productName.trim()) return;

    const description = generateProductDescription(values.productName);

    formik.setFieldValue("description", description);
  };

  useEffect(() => {
    if (!existingProduct) return;

    const photos: ProductPhoto[] = (existingProduct.photos ?? []).map(
      (photo) => photo || null,
    );

    setPreviewImages(photos);
    setSelectedImage(photos.find(Boolean) ?? null);
  }, [existingProduct]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !existingProduct) {
    return (
      <EmptyState
        icon={nothingHere}
        title="Product not found."
        buttonText="Back to Products"
        onClick={() => router.push("/dashboard")}
      />
    );
  }

  console.log(formik);

  return (
    <FormikProvider value={formik}>
      <div className="leading-[100%] space-y-6 pb-5">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[16px] font-medium text-[#111111] underline"
        >
          <Image src={back} alt="" />
          <span>Back</span>
        </button>

        <hr className="w-full border-[#E5E5E5]" />

        <div className="grid md:grid-cols-[25.69%_74.31%] grid-rows-1 md:gap-[1.67%] gap-6">
          <div className="md:hidden flex justify-end text-[14px] font-semibold text-[#111111]">
            <div className="flex items-center gap-[25.5px]">
              {isEdit ? (
                <button
                  type="button"
                  onClick={handleCancelEdit}
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
                  {isUpdating ? "Updating..." : "Update Product"}
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
            <div
              onClick={() => {
                if (isEdit && !selectedImage) {
                  handleClick();
                }
              }}
              className="relative w-full h-[370px] overflow-hidden rounded-[8px] border border-[#E5E5E5] bg-[#FAFAFA]"
            >
              {selectedImage ? (
                <ProductImage
                  image={selectedImage}
                  alt="product-image"
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
              {previewImages.map((image, index) => {
                if (image === null || image === "" || image === undefined) {
                  return null;
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`relative w-[32%] min-h-20 aspect-square overflow-hidden rounded-[8px] border transition-all ${
                      selectedImage === image
                        ? "border-[#68DB25]"
                        : "border-[#E5E5E5]"
                    }`}
                  >
                    <ProductImage
                      image={image}
                      alt={`preview-${index}`}
                      className="object-cover"
                    />
                    {isEdit && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(index);
                        }}
                        className="absolute top-1 right-1 z-10 flex items-center justify-center rounded-full bg-white p-1 shadow-md"
                      >
                        <Image
                          src={removeImage}
                          alt="remove"
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                      </div>
                    )}
                  </button>
                );
              })}

              {isEdit && activeImageCount < 3 && (
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
                mode="amount"
                currencyCode={code}
                currencySymbol={symbol}
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
                  placeholder={"e.g. 25"}
                  value={values.stockQuantity}
                  disabled={!isEdit}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Allow empty while typing, or positive whole numbers only
                    if (value === "" || /^[1-9][0-9]*$/.test(value)) {
                      formik.setFieldValue("stockQuantity", value);
                    }
                  }}
                  maxLength={10}
                  onBlur={handleBlur}
                  className="w-full bg-[#F5F5F5] rounded px-[14px] py-3 text-[14px] outline-none border border-transparent focus:ring-1 focus:ring-[#A7E981] disabled:opacity-50"
                />

                {errors.stockQuantity && touched.stockQuantity && (
                  <p className="text-red-500 text-xs">{errors.stockQuantity}</p>
                )}
              </div>

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

                <div className="w-full flex justify-end -mt-1">
                  {values.productName.trim() && isEdit && (
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
          loading={isDeleting}
          onEdit={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            try {
              await deleteProduct(id).unwrap();

              router.push("/dashboard");
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </Modal>
    </FormikProvider>
  );
}
