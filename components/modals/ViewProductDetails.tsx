"use client";

import Image from "next/image";
import Modal from "../Modal";
import ViewProductImage from "./ViewProductImage";
import { useState } from "react";
import type { StoreTheme } from "@/types/store-theme";
import { useStoreTheme } from "@/hooks/useStoreTheme";

interface ViewProductDetailsProps {
  // product: {
  //   id: number;
  //   name: string;
  //   price: string | number;
  //   description: string;
  //   image: any | any[];
  // };
  product: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ViewProductDetails({
  product,

  onClose,
  onConfirm,
}: ViewProductDetailsProps) {
  const { storeTheme, themeLoaded } = useStoreTheme();
  const [openImages, setOpenImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const previewImages = Array.isArray(product.image)
    ? product.image
    : [product.image];

  const formattedPrice =
    typeof product.price === "number"
      ? `₦${product.price.toLocaleString()}`
      : product.price;

  return (
    <div
      className="w-full space-y-6 rounded p-6 leading-[100%]"
      style={{
        backgroundColor: storeTheme?.backgroundColor,
      }}
    >
      <div className="flex h-10 items-start justify-between border-b border-black/10">
        <h2 className="text-[18px] font-semibold uppercase tracking-wide text-[#111111]">
          {product.name}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="h-6 w-6 cursor-pointer text-[#111111] transition-opacity hover:opacity-60"
        >
          ✕
        </button>
      </div>

      <div className="flex max-h-[188px] gap-[2%]">
        {previewImages.slice(0, 3).map((image: any, index: number) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setSelectedImageIndex(index);
              setOpenImages(true);
            }}
            className="relative aspect-square min-h-20 w-[32%] overflow-hidden rounded-lg border transition-all hover:opacity-90"
            style={{
              borderColor:
                selectedImageIndex === index
                  ? storeTheme.brandColor
                  : "rgba(0,0,0,0.1)",
              borderWidth: selectedImageIndex === index ? "2px" : "1px",
            }}
          >
            <Image
              src={image}
              alt={`${product.name} preview ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 30vw, 180px"
            />
          </button>
        ))}
      </div>

      <div className="space-y-2 text-[14px]">
        <p
          className="text-[16px] font-semibold md:text-[18px]"
          style={{
            color: storeTheme.brandColor,
          }}
        >
          {formattedPrice}
        </p>

        <h3 className="font-semibold text-[#111111]">{product.name}</h3>

        <p className="leading-6 text-[#777777]">{product.description}</p>
      </div>

      <div className="flex justify-center gap-3 text-[14px] font-semibold">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border px-[40.5px] py-2.5 transition-colors hover:bg-black/5"
          style={{
            borderColor: storeTheme.brandColor,
            color: storeTheme.brandColor,
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full px-5 py-2.5 text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: storeTheme.brandColor,
          }}
        >
          Order on WhatsApp
        </button>
      </div>

      <Modal
        closeOnOverlayClick={false}
        open={openImages}
        onClose={() => setOpenImages(false)}
        width="w-[640px]"
      >
        <ViewProductImage
          images={previewImages}
          initialIndex={selectedImageIndex}
          onClose={() => setOpenImages(false)}
          onConfirm={onConfirm}
        />
      </Modal>
    </div>
  );
}
