"use client";

import Image, { StaticImageData } from "next/image";
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from "react-icons/fi";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastBadgeProps {
  image?: string | StaticImageData;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

const variants = {
  success: {
    border: "border-[#D8F0C8]",
    bg: "bg-[#F7FDF3]",
    iconBg: "bg-[#E9F9DD]",
    icon: <FiCheck className="text-[#68DB25]" size={18} />,
  },
  error: {
    border: "border-[#FFD6D6]",
    bg: "bg-[#FFF7F7]",
    iconBg: "bg-[#FFECEC]",
    icon: <FiX className="text-[#EF4444]" size={18} />,
  },
  warning: {
    border: "border-[#FFE8C2]",
    bg: "bg-[#FFFBF3]",
    iconBg: "bg-[#FFF1D6]",
    icon: <FiAlertTriangle className="text-[#F59E0B]" size={18} />,
  },
  info: {
    border: "border-[#D7E8FF]",
    bg: "bg-[#F5F9FF]",
    iconBg: "bg-[#EAF3FF]",
    icon: <FiInfo className="text-[#3B82F6]" size={18} />,
  },
};

export default function ToastBadge({
  image,
  title,
  description,
  variant = "success",
}: ToastBadgeProps) {
  const style = variants[variant];

  return (
    <div
      className={`flex items-center gap-3 rounded-full border px-4 py-2 w-fit shadow-lg ${style.border} ${style.bg}`}
    >
      <div
        className={`flex h-fit w-fit items-center justify-center rounded-full p-1 ${style.iconBg}`}
      >
        {image ? (
          <Image src={image} alt={title ?? "toast"} width={1} height={1} />
        ) : (
          style.icon
        )}
      </div>

      <div>
        {/* {title && (
          <h4 className="text-[14px] font-semibold text-[#111111]">{title}</h4>
        )} */}

        {description && (
          <p className="mt-0.5 text-[12px] text-[#777777]">{description}</p>
        )}
      </div>
    </div>
  );
}
