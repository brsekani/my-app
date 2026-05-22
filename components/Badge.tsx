import Image, { StaticImageData } from "next/image";
import React from "react";

interface BadgeProps {
  text: string;
  imageUrl: string | StaticImageData;
}

export default function Badge({ text, imageUrl }: BadgeProps) {
  return (
    <div className="border-[#E5E5E5] border bg-[#F5F5F5] rounded-[24px] flex items-center gap-1 pr-4 pl-2 py-2 w-fit">
      <Image
        src={imageUrl}
        alt="Shop Icon"
        width={14}
        height={14}
        className="text-[#7ed957] text-xs"
      />
      <span className="font-medium text-[#111111] font-teachers text-[12px] leading-[100%]">
        {text}
      </span>
    </div>
  );
}
