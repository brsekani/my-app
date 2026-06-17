"use client";

import Image from "next/image";
import testImage from "@/assets/Images/test-image.jpg";
import testImage2 from "@/assets/Images/test-image-2.png";
import Modal from "../Modal";
import ViewProductImage from "./ViewProductImage";
import { useState } from "react";

interface ViewProductDetailsProps {
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    image: any;
  };
  onClose: () => void;
  onConfirm: () => void;
}

export default function ViewProductDetails({
  product,
  onClose,
  onConfirm,
}: ViewProductDetailsProps) {
  const [openImages, setOpenImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const previewImages = Array.isArray(product.image)
    ? product.image
    : [product.image];

  return (
    <div className="bg-[#FFFFFF] rounded w-full p-6 leading-[100%] space-y-6">
      <div className="h-10 flex items-start justify-between border-b border-[#E5E5E5]">
        <h2 className="text-[18px] font-semibold text-gray-900 uppercase tracking-wide">
          {product?.name}
        </h2>

        <button
          onClick={onClose}
          className="text-[#111111] transition-colors w-[24px] h-[24px] cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="flex gap-[2%] max-h-[188px] h-full">
        {product?.image?.map((image: any, index: number) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setSelectedImageIndex(index);
              setOpenImages(true);
            }}
            // onClick={() => setSelectedImage(image)}
            className={`relative w-[32%] min-h-20 h-full aspect-square overflow-hidden rounded-[8px] border transition-all`}
          >
            <Image
              src={image}
              alt={`preview-${index}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="space-y-1.5 text-[14px]">
        <p className="text-[#111111] font-semibold md:text-[18px] text-[16px]">
          ₦28,000
        </p>

        <h3 className="text-[#111111]">Classic Blue Denim Jacket</h3>

        <p className=" text-[#777777]">
          Timeless blue denim jacket made from durable cotton fabric with a
          comfortable inner lining. Features front button closure and two chest
          pockets. Available in sizes S, M, L, and XL. Length: 24 inches
          (Medium). Perfect for casual outings and layering.
        </p>
      </div>

      <div className="flex gap-3 justify-center text-[14px] font-semibold text-[#111111]">
        <button
          onClick={onClose}
          className="px-[40.5px] py-2.5 rounded-full border border-[#111111] hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4.5 py-2.5 rounded-full bg-[#68DB25] hover:bg-[#68DB01] text-[#111111] transition-colors"
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
          onConfirm={() => {}}
        />
      </Modal>
    </div>
  );
}
